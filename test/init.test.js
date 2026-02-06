import { describe, it, expect, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { run } from "../lib/init.js";

function makeTmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "ls-init-"));
}

describe("init", () => {
  const dirs = [];

  afterEach(() => {
    for (const d of dirs) {
      fs.rmSync(d, { recursive: true, force: true });
    }
    dirs.length = 0;
  });

  it("scaffolds all expected files", async () => {
    const tmp = makeTmpDir();
    const target = path.join(tmp, "my-project");
    dirs.push(tmp);

    await run({ dir: target });

    const expected = [
      "eleventy.config.js",
      "src/styles.css",
      "presentations/presentations.11tydata.js",
      "presentations/_template/index.md",
      "presentations/my-first-deck/index.md",
      "themes/.gitkeep",
      "package.json",
      ".gitignore",
      ".nvmrc",
      "README.md",
      "CLAUDE.md",
      ".claude/commands/new-presentation.md",
      ".claude/settings.json",
    ];

    for (const file of expected) {
      expect(fs.existsSync(path.join(target, file)), `missing: ${file}`).toBe(true);
    }
  });

  it("writes project name into package.json", async () => {
    const tmp = makeTmpDir();
    const target = path.join(tmp, "cool-deck");
    dirs.push(tmp);

    await run({ dir: target });

    const pkg = JSON.parse(fs.readFileSync(path.join(target, "package.json"), "utf-8"));
    expect(pkg.name).toBe("cool-deck");
  });

  it("throws on non-empty directory", async () => {
    const tmp = makeTmpDir();
    const target = path.join(tmp, "occupied");
    dirs.push(tmp);

    fs.mkdirSync(target, { recursive: true });
    fs.writeFileSync(path.join(target, "existing.txt"), "data");

    await expect(run({ dir: target })).rejects.toThrow("not empty");
  });
});
