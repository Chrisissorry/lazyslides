import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

describe("build smoke test", () => {
  it("produces expected output files", () => {
    execSync("pnpm run build", { cwd: root, stdio: "pipe", timeout: 25_000 });

    const expected = [
      "_site/presentations/example/index.html",
      "_site/presentations/index.html",
      "_site/assets/reveal.js/dist/reveal.js",
    ];

    for (const file of expected) {
      const full = path.join(root, file);
      expect(fs.existsSync(full), `missing: ${file}`).toBe(true);
    }
  });
});
