import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const REQUIRED_FIELDS = ["title", "slides"];
const VALID_TEMPLATES = [
  "title", "section", "content", "metrics", "comparison", "columns",
  "three-columns", "quote", "center", "hero", "image-overlay", "code",
  "timeline", "funnel", "split", "split-wide", "table", "agenda",
];
const VALID_TRANSITIONS = [
  "none", "fade", "slide", "convex", "concave", "zoom",
];
const VALID_FRAGMENTS = [
  "fade-in", "fade-out", "fade-up", "fade-down", "fade-left", "fade-right",
  "fade-in-then-out", "fade-in-then-semi-out", "grow", "shrink", "strike",
  "highlight-red", "highlight-green", "highlight-blue",
  "highlight-current-red", "highlight-current-green", "highlight-current-blue",
  "current-visible", "semi-fade-out",
];
const VALID_THEMES = [
  "default", "card", "midnight", "forest", "corporate", "sunset",
];

function findPresentations(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === "_template") continue;
    const indexPath = path.join(dir, entry.name, "index.md");
    if (fs.existsSync(indexPath)) {
      results.push(indexPath);
    }
  }
  return results;
}

/**
 * Validate all presentation YAML files.
 * @param {object} [opts]
 * @param {string} [opts.cwd] - working directory (defaults to process.cwd())
 * @param {boolean} [opts.renumber] - run renumber before validating
 * @returns {{ errors: string[], warnings: string[], validated: number }}
 */
export async function run(opts = {}) {
  const cwd = opts.cwd || process.cwd();
  const presentationsDir = path.join(cwd, "presentations");

  if (opts.renumber) {
    const { run: renumber } = await import("./renumber.js");
    await renumber({ cwd });
  }

  const errors = [];
  const warnings = [];
  let validated = 0;

  const files = findPresentations(presentationsDir);

  for (const file of files) {
    console.log(`Validating: ${file}`);
    validated++;

    try {
      const content = fs.readFileSync(file, "utf-8");

      // Check: Comment-hidden slide detection
      content.split("\n").forEach((line, idx) => {
        if (/#.*-\s*template:/.test(line)) {
          warnings.push(`${file}:${idx + 1}: Possible slide definition hidden in comment`);
        }
      });

      // Extract front matter
      const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
      if (!match) {
        errors.push(`${file}: No valid YAML front matter found`);
        continue;
      }

      const data = yaml.load(match[1]);

      // Check required fields
      for (const field of REQUIRED_FIELDS) {
        if (!(field in data)) {
          errors.push(`${file}: Missing required field '${field}'`);
        }
      }

      // Validate slides array
      if (data.slides) {
        if (!Array.isArray(data.slides)) {
          errors.push(`${file}: 'slides' must be an array`);
          continue;
        }

        const sections = [];

        data.slides.forEach((slide, idx) => {
          const slideNum = idx + 1;

          if (!slide.template) {
            errors.push(`${file}: Slide ${slideNum} missing 'template' field`);
            return;
          }

          if (!VALID_TEMPLATES.includes(slide.template)) {
            warnings.push(`${file}: Slide ${slideNum} has unknown template '${slide.template}'`);
          }

          if (slide.template === "section") {
            sections.push({ title: slide.title, start: slideNum });
          }

          if (!slide.title && !["quote"].includes(slide.template)) {
            warnings.push(`${file}: Slide ${slideNum} (${slide.template}) missing 'title'`);
          }

          // Comparison template structure validation
          if (slide.template === "comparison") {
            if (!slide.rows) {
              errors.push(`${file}: Slide ${slideNum} (comparison) missing 'rows:' - comparison template requires rows format`);
            }
            if ((slide.left && typeof slide.left === "object") || (slide.right && typeof slide.right === "object")) {
              errors.push(`${file}: Slide ${slideNum} (comparison) uses wrong format - use 'rows:' with left/right pairs, not nested left:/right: objects`);
            }
          }

          // Image path validation
          if (slide.image) {
            const imagePath = slide.image;
            const isExternalUrl = /^https?:\/\//.test(imagePath);
            if (!isExternalUrl) {
              if (imagePath.includes("../")) {
                warnings.push(`${file}: Slide ${slideNum} image path contains '../'`);
              }
              const presentationDir = path.dirname(file);
              const fullImagePath = path.join(presentationDir, imagePath);
              if (!fs.existsSync(fullImagePath)) {
                errors.push(`${file}: Slide ${slideNum} missing image '${imagePath}'`);
              } else {
                // Warn if image is in a directory that isn't passthrough-copied
                const imageDir = imagePath.split("/")[0];
                const passthroughDirs = ["assets", "images", "videos"];
                if (imageDir && !passthroughDirs.includes(imageDir)) {
                  warnings.push(`${file}: Slide ${slideNum} image in '${imageDir}/' — only ${passthroughDirs.join(", ")} directories are copied to build output`);
                }
              }
            }
          }

          // Transition validation
          if (slide.transition && !VALID_TRANSITIONS.includes(slide.transition)) {
            warnings.push(`${file}: Slide ${slideNum} has unknown transition '${slide.transition}' (valid: ${VALID_TRANSITIONS.join(", ")})`);
          }
          if (slide.transition_speed && !["default", "fast", "slow"].includes(slide.transition_speed)) {
            warnings.push(`${file}: Slide ${slideNum} has unknown transition_speed '${slide.transition_speed}' (valid: default, fast, slow)`);
          }

          // Fragment validation
          if (slide.fragment && !VALID_FRAGMENTS.includes(slide.fragment)) {
            warnings.push(`${file}: Slide ${slideNum} has unknown fragment '${slide.fragment}' (valid: ${VALID_FRAGMENTS.join(", ")})`);
          }

          // Item-level fragment validation
          if (slide.items && Array.isArray(slide.items)) {
            slide.items.forEach((item, itemIdx) => {
              if (item && typeof item === "object" && item.fragment) {
                if (!VALID_FRAGMENTS.includes(item.fragment)) {
                  warnings.push(`${file}: Slide ${slideNum}, item ${itemIdx + 1} has unknown fragment '${item.fragment}'`);
                }
              }
            });
          }
        });

        // Expected slide count
        if (data.expected_slides && data.slides.length !== data.expected_slides) {
          warnings.push(`${file}: Expected ${data.expected_slides} slides, found ${data.slides.length}`);
        }

        // Frontmatter theme validation
        if (data.theme && !VALID_THEMES.includes(data.theme)) {
          warnings.push(`${file}: Unknown theme '${data.theme}' (valid: ${VALID_THEMES.join(", ")})`);
        }

        // Frontmatter global transition validation
        if (data.transition && !VALID_TRANSITIONS.includes(data.transition)) {
          warnings.push(`${file}: Unknown global transition '${data.transition}' (valid: ${VALID_TRANSITIONS.join(", ")})`);
        }

        // Section index output
        if (sections.length > 0) {
          console.log("");
          console.log("  SECTIONS:");
          console.log("  " + "\u2500".repeat(50));

          sections.forEach((section, idx) => {
            const endSlide = idx + 1 < sections.length
              ? sections[idx + 1].start - 1
              : data.slides.length;

            const title = section.title || "(untitled section)";
            const range = `[slides ${section.start}-${endSlide}]`;
            console.log(`  ${title.padEnd(42)} ${range}`);
          });
        }

        // Slide listing output
        console.log("");
        console.log("  SLIDES:");
        console.log("  " + "\u2500".repeat(50));

        data.slides.forEach((slide, idx) => {
          const slideNum = idx + 1;
          const template = slide.template || "???";
          let title = slide.title || slide.text || slide.headline || "(no title)";
          if (title.length > 48) title = title.substring(0, 45) + "...";
          console.log(`  ${String(slideNum).padStart(3)}. [${template}] ${title}`);
        });

        console.log("");
        console.log(`  \u2713 ${data.slides.length} slides validated`);
      }
    } catch (e) {
      if (e.name === "YAMLException") {
        errors.push(`${file}: YAML syntax error - ${e.message}`);
      } else {
        errors.push(`${file}: ${e.constructor.name} - ${e.message}`);
      }
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`Validation complete: ${validated} presentation(s)`);

  if (warnings.length > 0) {
    console.log(`\n\u26A0\uFE0F  Warnings (${warnings.length}):`);
    warnings.forEach((w) => console.log(`   ${w}`));
  }

  if (errors.length > 0) {
    console.log(`\n\u274C Errors (${errors.length}):`);
    errors.forEach((e) => console.log(`   ${e}`));
    console.log("\nBuild may fail or skip files with errors!");
  } else {
    console.log("\n\u2705 All presentations valid");
  }

  return { errors, warnings, validated };
}
