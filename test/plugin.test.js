import { describe, it, expect, beforeEach } from "vitest";
import lazyslides from "../index.js";

function createMockConfig() {
  const calls = {
    filters: {},
    templates: {},
    passthroughCopies: [],
    globalData: {},
    ignores: new Set(),
    amendLibraryCalls: [],
  };

  const config = {
    addFilter(name, fn) {
      calls.filters[name] = fn;
    },
    amendLibrary(engine, fn) {
      calls.amendLibraryCalls.push({ engine, fn });
    },
    addPassthroughCopy(mapping) {
      calls.passthroughCopies.push(mapping);
    },
    addGlobalData(key, value) {
      calls.globalData[key] = value;
    },
    addTemplate(name, content) {
      calls.templates[name] = content;
    },
    ignores: {
      add(pattern) {
        calls.ignores.add(pattern);
      },
    },
  };

  return { config, calls };
}

describe("plugin registration", () => {
  let config, calls;

  beforeEach(() => {
    ({ config, calls } = createMockConfig());
    lazyslides(config);
  });

  it("registers resolveImage filter", () => {
    expect(calls.filters.resolveImage).toBeDefined();
  });

  it("registers isMapping filter", () => {
    expect(calls.filters.isMapping).toBeDefined();
  });

  it("calls amendLibrary for njk", () => {
    expect(calls.amendLibraryCalls.length).toBeGreaterThan(0);
    expect(calls.amendLibraryCalls[0].engine).toBe("njk");
  });

  it("adds virtual templates for _layouts/*.njk", () => {
    const layoutKeys = Object.keys(calls.templates).filter((k) => k.startsWith("_layouts/"));
    expect(layoutKeys.length).toBeGreaterThan(0);
    expect(layoutKeys).toContain("_layouts/presentation.njk");
    expect(layoutKeys).toContain("_layouts/default.njk");
  });

  it("adds passthrough copy for assets", () => {
    expect(calls.passthroughCopies.length).toBeGreaterThan(0);
    const assetCopy = calls.passthroughCopies.find((c) => {
      const key = typeof c === "object" ? Object.keys(c)[0] : c;
      return key.includes("reveal.js");
    });
    expect(assetCopy).toBeDefined();
  });

  it("adds site global data", () => {
    expect(calls.globalData.site).toBeDefined();
    expect(calls.globalData.site.title).toBeDefined();
  });
});

describe("resolveImage filter", () => {
  let resolveImage;

  beforeEach(() => {
    const { config, calls } = createMockConfig();
    lazyslides(config);
    resolveImage = calls.filters.resolveImage;
  });

  it("prepends ../ to relative paths", () => {
    expect(resolveImage("images/photo.jpg")).toBe("../images/photo.jpg");
  });

  it("leaves absolute paths unchanged", () => {
    expect(resolveImage("/assets/img.png")).toBe("/assets/img.png");
  });

  it("leaves URLs unchanged", () => {
    expect(resolveImage("https://example.com/img.png")).toBe("https://example.com/img.png");
  });

  it("returns null for null input", () => {
    expect(resolveImage(null)).toBeNull();
  });

  it("returns undefined for undefined input", () => {
    expect(resolveImage(undefined)).toBeUndefined();
  });
});

describe("isMapping filter", () => {
  let isMapping;

  beforeEach(() => {
    const { config, calls } = createMockConfig();
    lazyslides(config);
    isMapping = calls.filters.isMapping;
  });

  it("returns true for objects", () => {
    expect(isMapping({ key: "value" })).toBe(true);
  });

  it("returns false for arrays", () => {
    expect(isMapping([1, 2, 3])).toBe(false);
  });

  it("returns false for strings", () => {
    expect(isMapping("hello")).toBe(false);
  });

  it("returns false for null", () => {
    expect(isMapping(null)).toBe(false);
  });
});
