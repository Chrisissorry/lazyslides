import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { renumberFile, run } from "../lib/renumber.js";

function makeTmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "ls-renum-"));
}

describe("renumberFile", () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = makeTmpDir();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("renumbers misnumbered slide comments", () => {
    const file = path.join(tmpDir, "index.md");
    fs.writeFileSync(file, `---
title: Test
slides:
# Slide 5: Opening
- template: title
  title: Hello
# Slide 9: Body
- template: content
  title: Body
---
`);
    renumberFile(file);
    const content = fs.readFileSync(file, "utf-8");
    expect(content).toContain("# Slide 1: Opening");
    expect(content).toContain("# Slide 2: Body");
    expect(content).not.toContain("# Slide 5");
    expect(content).not.toContain("# Slide 9");
  });

  it("adds missing comments", () => {
    const file = path.join(tmpDir, "index.md");
    fs.writeFileSync(file, `---
title: Test
slides:
- template: title
  title: Hello
- template: content
  title: Body
---
`);
    renumberFile(file);
    const content = fs.readFileSync(file, "utf-8");
    expect(content).toContain("# Slide 1:");
    expect(content).toContain("# Slide 2:");
  });

  it("makes no changes when already correct", () => {
    const file = path.join(tmpDir, "index.md");
    const original = `---
title: Test
slides:
# Slide 1: Hello
- template: title
  title: Hello
# Slide 2: Body
- template: content
  title: Body
---
`;
    fs.writeFileSync(file, original);
    const changed = renumberFile(file);
    expect(changed).toBe(false);
    expect(fs.readFileSync(file, "utf-8")).toBe(original);
  });
});

describe("run", () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = makeTmpDir();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("processes presentations directory", async () => {
    const pDir = path.join(tmpDir, "presentations", "deck");
    fs.mkdirSync(pDir, { recursive: true });
    fs.writeFileSync(path.join(pDir, "index.md"), `---
title: Test
slides:
- template: title
  title: Hello
---
`);
    await run({ cwd: tmpDir });
    const content = fs.readFileSync(path.join(pDir, "index.md"), "utf-8");
    expect(content).toContain("# Slide 1:");
  });

  it("throws on missing file when explicit files given", async () => {
    await expect(run({ files: ["/nonexistent/path.md"] })).rejects.toThrow("File not found");
  });
});
