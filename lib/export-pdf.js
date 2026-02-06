import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";

const PORT = 4100;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const OUTPUT_DIR = "_pdfs";
const TIMEOUT_SECONDS = 30;

let serverProcess = null;

function cleanup() {
  if (serverProcess) {
    console.log("\n  Stopping server...");
    serverProcess.kill();
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
        if (elapsed >= TIMEOUT_SECONDS) {
          clearInterval(interval);
          reject(new Error(`Server failed to start within ${TIMEOUT_SECONDS}s`));
        }
      });
      req.end();
    }, 1000);
  });
}

function runDecktape(name) {
  const url = `${BASE_URL}/presentations/${name}/?pdf`;
  const output = path.join(OUTPUT_DIR, `${name}.pdf`);

  console.log(`  → Exporting: ${name}`);
  try {
    execSync(
      `npx decktape reveal --size 1920x1080 --pause 1000 --load-pause 2000 "${url}" "${output}"`,
      { stdio: ["ignore", "pipe", "pipe"] }
    );
    console.log(`  \u2713 ${output}`);
    return true;
  } catch {
    console.log(`  \u2717 Failed: ${name}`);
    return false;
  }
}

function getAvailablePresentations(cwd) {
  const dir = path.join(cwd, "presentations");
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "_template")
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

  if (requestedName) {
    if (!available.includes(requestedName)) {
      console.error(`Presentation not found: ${requestedName}`);
      console.error("   Available presentations:");
      for (const name of available) {
        console.error(`     - ${name}`);
      }
      process.exit(1);
    }
  }

  const presentations = requestedName ? [requestedName] : available;

  // Build the site
  console.log("Building site...");
  execSync("pnpm run build", { stdio: "inherit", cwd });

  // Start server
  console.log(`\nStarting server on port ${PORT}...`);
  serverProcess = spawn("npx", ["eleventy", "--serve", "--port", String(PORT)], {
    stdio: "ignore",
    cwd,
  });

  process.on("exit", cleanup);
  process.on("SIGINT", () => { cleanup(); process.exit(1); });
  process.on("SIGTERM", () => { cleanup(); process.exit(1); });

  // Wait for server
  console.log("Waiting for server...");
  await waitForServer();
  console.log("Server ready");

  // Create output directory
  fs.mkdirSync(path.join(cwd, OUTPUT_DIR), { recursive: true });

  // Export presentations
  let success = 0;
  let failure = 0;
  console.log(`\nExporting ${presentations.length} presentation(s) to PDF...\n`);

  for (const name of presentations) {
    if (runDecktape(name)) {
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
  if (failure > 0) {
    process.exit(1);
  }
}
