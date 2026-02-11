import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { run } from "../lib/validate.js";

function makeTmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "ls-validate-"));
}

function writePresentation(dir, name, content) {
  const pDir = path.join(dir, "presentations", name);
  fs.mkdirSync(pDir, { recursive: true });
  fs.writeFileSync(path.join(pDir, "index.md"), content);
}

describe("validate", () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = makeTmpDir();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("passes for a valid presentation", async () => {
    writePresentation(tmpDir, "good", `---
title: Test Deck
slides:
- template: title
  title: Hello
- template: content
  title: Body
  items:
    - Point one
---
`);
    const result = await run({ cwd: tmpDir });
    expect(result.errors).toHaveLength(0);
    expect(result.validated).toBe(1);
  });

  it("errors on missing front matter", async () => {
    writePresentation(tmpDir, "bad", "No front matter here\n");
    const result = await run({ cwd: tmpDir });
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toContain("No valid YAML front matter");
  });

  it("errors on missing title", async () => {
    writePresentation(tmpDir, "notitle", `---
slides:
- template: content
  title: Slide
---
`);
    const result = await run({ cwd: tmpDir });
    expect(result.errors).toContainEqual(expect.stringContaining("Missing required field 'title'"));
  });

  it("errors on missing slides", async () => {
    writePresentation(tmpDir, "noslides", `---
title: Deck Without Slides
---
`);
    const result = await run({ cwd: tmpDir });
    expect(result.errors).toContainEqual(expect.stringContaining("Missing required field 'slides'"));
  });

  it("errors when a slide is missing template", async () => {
    writePresentation(tmpDir, "notemplate", `---
title: Test
slides:
- title: Missing Template
---
`);
    const result = await run({ cwd: tmpDir });
    expect(result.errors).toContainEqual(expect.stringContaining("missing 'template' field"));
  });

  it("warns on unknown template name", async () => {
    writePresentation(tmpDir, "unknown", `---
title: Test
slides:
- template: nonexistent
  title: Bad Template
---
`);
    const result = await run({ cwd: tmpDir });
    expect(result.warnings).toContainEqual(expect.stringContaining("unknown template 'nonexistent'"));
  });

  it("errors on invalid YAML syntax", async () => {
    writePresentation(tmpDir, "badsyntax", `---
title: Test
slides:
  - template: content
    items:
      bad: [unclosed
---
`);
    const result = await run({ cwd: tmpDir });
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toMatch(/YAML syntax error|YAMLException/);
  });

  it("errors on comparison without rows", async () => {
    writePresentation(tmpDir, "badcomp", `---
title: Test
slides:
- template: comparison
  title: Compare
---
`);
    const result = await run({ cwd: tmpDir });
    expect(result.errors).toContainEqual(expect.stringContaining("missing 'rows:'"));
  });

  it("passes when referenced image exists", async () => {
    writePresentation(tmpDir, "hasimage", `---
title: Test
slides:
- template: split
  title: With Image
  image: images/photo.jpg
---
`);
    const imgDir = path.join(tmpDir, "presentations", "hasimage", "images");
    fs.mkdirSync(imgDir, { recursive: true });
    fs.writeFileSync(path.join(imgDir, "photo.jpg"), "fake-image-data");
    const result = await run({ cwd: tmpDir });
    expect(result.errors).toHaveLength(0);
  });

  it("errors on missing image file", async () => {
    writePresentation(tmpDir, "noimage", `---
title: Test
slides:
- template: split
  title: Missing Image
  image: images/missing.jpg
---
`);
    const result = await run({ cwd: tmpDir });
    expect(result.errors).toContainEqual(expect.stringContaining("missing image 'images/missing.jpg'"));
  });

  it("accepts three-columns as a valid template", async () => {
    writePresentation(tmpDir, "threecol", `---
title: Test
slides:
- template: three-columns
  title: Three Cols
---
`);
    const result = await run({ cwd: tmpDir });
    expect(result.errors).toHaveLength(0);
    expect(result.warnings.filter(w => w.includes("unknown template"))).toHaveLength(0);
  });

  it("warns when image is in a non-passthrough directory", async () => {
    writePresentation(tmpDir, "baddir", `---
title: Test
slides:
- template: split
  title: Bad Dir
  image: photos/pic.jpg
---
`);
    const imgDir = path.join(tmpDir, "presentations", "baddir", "photos");
    fs.mkdirSync(imgDir, { recursive: true });
    fs.writeFileSync(path.join(imgDir, "pic.jpg"), "fake");
    const result = await run({ cwd: tmpDir });
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toContainEqual(expect.stringContaining("only assets, images, videos"));
  });

  it("warns on commented-out slide definition", async () => {
    writePresentation(tmpDir, "commented", `---
title: Test
slides:
- template: content
  title: Real slide
#  - template: content
#    title: Hidden slide
---
`);
    const result = await run({ cwd: tmpDir });
    expect(result.warnings).toContainEqual(expect.stringContaining("hidden in comment"));
  });
});
