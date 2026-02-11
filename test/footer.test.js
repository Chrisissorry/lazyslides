import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const htmlPath = path.join(root, "_site/presentations/example/index.html");

/**
 * Parse the built HTML into per-slide sections and return an array of
 * { classes: string, hasFooter: boolean } objects.
 */
function parseSlides(html) {
  // Reveal.js slides are <section class="slide-*">…</section> at the top level
  // We use a simple regex to split them — good enough for testing.
  const sectionRegex = /<section\s+class="(slide-[^"]*)"[^>]*>([\s\S]*?)<\/section>/g;
  const slides = [];
  let match;
  while ((match = sectionRegex.exec(html)) !== null) {
    slides.push({
      classes: match[1],
      hasFooter: match[2].includes('class="slide-footer"'),
    });
  }
  return slides;
}

describe("footer visibility", () => {
  let html;
  let slides;

  beforeAll(() => {
    execSync("pnpm run build", { cwd: root, stdio: "pipe", timeout: 25_000 });
    html = fs.readFileSync(htmlPath, "utf-8");
    slides = parseSlides(html);
  });

  it("parses slides from example presentation", () => {
    expect(slides.length).toBeGreaterThan(0);
  });

  it("hides footer on section slides by default", () => {
    const sectionSlides = slides.filter((s) => s.classes.includes("slide-section"));
    expect(sectionSlides.length).toBeGreaterThan(0);
    for (const slide of sectionSlides) {
      expect(slide.hasFooter, `section slide should not have footer`).toBe(false);
    }
  });

  it("hides footer on hero slides by default", () => {
    const heroSlides = slides.filter((s) => s.classes.includes("slide-hero"));
    expect(heroSlides.length).toBeGreaterThan(0);
    for (const slide of heroSlides) {
      expect(slide.hasFooter, `hero slide should not have footer`).toBe(false);
    }
  });

  it("shows footer on content slides by default", () => {
    const contentSlides = slides.filter((s) => s.classes === "slide-content");
    expect(contentSlides.length).toBeGreaterThan(0);
    for (const slide of contentSlides) {
      expect(slide.hasFooter, `content slide should have footer`).toBe(true);
    }
  });

  it("shows footer on other regular template slides", () => {
    const regularTypes = [
      "slide-metrics",
      "slide-comparison",
      "slide-columns",
      "slide-code",
      "slide-timeline",
      "slide-funnel",
      "slide-split ",  // trailing space to avoid matching split-wide
      "slide-split-wide",
      "slide-table",
      "slide-quote",
      "slide-agenda",
      "slide-center",
      "slide-image-overlay",
      "slide-three-columns",
    ];

    for (const type of regularTypes) {
      const trimmed = type.trim();
      const matching = slides.filter((s) =>
        trimmed === "slide-split"
          ? s.classes === "slide-split"
          : s.classes.includes(trimmed)
      );
      // Only check types that exist in the example presentation
      for (const slide of matching) {
        expect(slide.hasFooter, `${trimmed} slide should have footer`).toBe(true);
      }
    }
  });

  it("title slides have no footer (never included)", () => {
    const titleSlides = slides.filter((s) => s.classes === "slide-title");
    expect(titleSlides.length).toBeGreaterThan(0);
    for (const slide of titleSlides) {
      expect(slide.hasFooter, `title slide should not have footer`).toBe(false);
    }
  });

  it("global_footer defaults to true in the layout", () => {
    // The presentation layout should set global_footer from show_footer frontmatter,
    // defaulting to true. Verify by checking that regular slides have footers
    // (which means global_footer was truthy).
    const contentSlides = slides.filter((s) => s.classes === "slide-content");
    expect(contentSlides.length).toBeGreaterThan(0);
    expect(contentSlides.every((s) => s.hasFooter)).toBe(true);
  });
});
