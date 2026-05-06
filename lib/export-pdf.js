import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";

const PORT = 4100;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const OUTPUT_DIR = "_pdfs";
const SERVER_TIMEOUT_SECONDS = 60;
const BUILD_IDLE_TIMEOUT_MS = 15000;
const BUILD_HARD_TIMEOUT_MS = 180000;

let serverProcess = null;

function cleanup() {
  if (serverProcess) {
    console.log("\n  Stopping server...");
    try {
      serverProcess.kill("SIGTERM");
    } catch {}
    serverProcess = null;
  }
}

function waitForServer() {
  return new Promise((resolve, reject) => {
    let elapsed = 0;
    const interval = setInterval(() => {
      const req = http.get(BASE_URL, (res) => {
        res.resume();
        clearInterval(interval);
        resolve();
      });
      req.on("error", () => {
        elapsed++;
        if (elapsed >= SERVER_TIMEOUT_SECONDS) {
          clearInterval(interval);
          reject(new Error(`Server failed to start within ${SERVER_TIMEOUT_SECONDS}s`));
        }
      });
      req.end();
    }, 1000);
  });
}

/**
 * Run `pnpm run build`, but tolerate the eleventy child not exiting cleanly
 * (known issue: d2 WASM / chokidar handles can keep the event loop alive after
 * "Wrote N files"). We detect idle stdout and force-kill.
 */
function runBuild(cwd) {
  return new Promise((resolve, reject) => {
    // Pipe stdio so we can observe activity and reset the idle timer.
    const child = spawn("pnpm", ["run", "build"], {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let idleTimer = null;
    let hardTimer = null;
    let resolved = false;

    const done = (err) => {
      if (resolved) return;
      resolved = true;
      clearTimeout(idleTimer);
      clearTimeout(hardTimer);
      try { child.kill("SIGKILL"); } catch {}
      err ? reject(err) : resolve();
    };

    const bumpIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        console.log(`\n  Build child idle for ${BUILD_IDLE_TIMEOUT_MS / 1000}s — assuming done and force-exiting.`);
        done();
      }, BUILD_IDLE_TIMEOUT_MS);
    };

    child.stdout.on("data", (chunk) => {
      process.stdout.write(chunk);
      bumpIdle();
    });
    child.stderr.on("data", (chunk) => {
      process.stderr.write(chunk);
      bumpIdle();
    });

    bumpIdle();

    hardTimer = setTimeout(() => {
      done(new Error(`Build exceeded hard timeout ${BUILD_HARD_TIMEOUT_MS / 1000}s`));
    }, BUILD_HARD_TIMEOUT_MS);

    child.on("exit", (code) => {
      if (code === 0 || code === null) done();
      else done(new Error(`Build failed with exit code ${code}`));
    });
    child.on("error", (err) => done(err));
  });
}

function runDecktape(name, cwd) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}/presentations/${name}/?pdf`;
    const output = path.join(OUTPUT_DIR, `${name}.pdf`);

    console.log(`  → Exporting: ${name}`);
    console.log(`    URL:    ${url}`);
    console.log(`    Output: ${output}\n`);

    const child = spawn(
      "npx",
      [
        "decktape",
        "reveal",
        "--size", "1920x1080",
        "--pause", "1000",
        "--load-pause", "2000",
        url,
        output,
      ],
      { cwd, stdio: ["ignore", "inherit", "inherit"] }
    );

    child.on("exit", (code) => {
      if (code === 0) {
        console.log(`\n  \u2713 ${output}`);
        resolve(true);
      } else {
        console.log(`\n  \u2717 Failed: ${name} (decktape exit code ${code})`);
        resolve(false);
      }
    });
    child.on("error", (err) => {
      console.log(`\n  \u2717 Failed: ${name} (${err.message})`);
      resolve(false);
    });
  });
}

function getAvailablePresentations(cwd, { includeHidden = false } = {}) {
  const dir = path.join(cwd, "presentations");
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && (includeHidden || !d.name.startsWith("_")))
    .map((d) => d.name);
}

/**
 * Export presentations to PDF using DeckTape.
 * @param {object} [opts]
 * @param {string} [opts.cwd] - working directory (defaults to process.cwd())
 * @param {string} [opts.name] - specific presentation name to export
 */
export async function run(opts = {}) {
  const cwd = opts.cwd || process.cwd();
  const requestedName = opts.name;
  const available = getAvailablePresentations(cwd);
  const allForLookup = getAvailablePresentations(cwd, { includeHidden: true });

  if (requestedName) {
    if (!allForLookup.includes(requestedName)) {
      console.error(`Presentation not found: ${requestedName}`);
      console.error("   Available presentations:");
      for (const name of available) {
        console.error(`     - ${name}`);
      }
      process.exit(1);
    }
  }

  const presentations = requestedName ? [requestedName] : available;

  // Build the site (tolerate lingering child handles)
  console.log("Building site...");
  try {
    await runBuild(cwd);
  } catch (err) {
    console.error(`Build failed: ${err.message}`);
    process.exit(1);
  }

  // Start server
  console.log(`\nStarting server on port ${PORT}...`);
  serverProcess = spawn("npx", ["eleventy", "--serve", "--port", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    cwd,
  });
  serverProcess.stdout.on("data", () => {}); // drain
  serverProcess.stderr.on("data", (chunk) => {
    process.stderr.write(`[server] ${chunk}`);
  });

  process.on("exit", cleanup);
  process.on("SIGINT", () => { cleanup(); process.exit(1); });
  process.on("SIGTERM", () => { cleanup(); process.exit(1); });

  // Wait for server
  console.log("Waiting for server...");
  try {
    await waitForServer();
  } catch (err) {
    console.error(`\n${err.message}`);
    cleanup();
    process.exit(1);
  }
  console.log("Server ready");

  // Create output directory
  fs.mkdirSync(path.join(cwd, OUTPUT_DIR), { recursive: true });

  // Export presentations
  let success = 0;
  let failure = 0;
  console.log(`\nExporting ${presentations.length} presentation(s) to PDF...\n`);

  for (const name of presentations) {
    if (await runDecktape(name, cwd)) {
      success++;
    } else {
      failure++;
    }
    console.log();
  }

  cleanup();

  // Summary
  console.log("\u2501".repeat(30));
  console.log(`Exported: ${success}  Failed: ${failure}`);
  // Force exit to ensure all child processes (server, npx wrappers) are cleaned up.
  process.exit(failure > 0 ? 1 : 0);
}
