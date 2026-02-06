import fs from "node:fs";
import path from "node:path";

function extractSlideTitle(lines, templateIdx) {
  let title = null;
  let subtitle = null;
  let templateType = null;

  const templateMatch = lines[templateIdx].match(/template:\s*(\w+)/);
  if (templateMatch) templateType = templateMatch[1];

  for (let idx = templateIdx + 1; idx < lines.length; idx++) {
    const line = lines[idx];
    if (/^\s*-\s*template:/.test(line)) break;

    const titleMatch = line.match(/^\s+title:\s*(.+)$/);
    if (titleMatch) {
      title = titleMatch[1].trim();
      if ((title.startsWith('"') && title.endsWith('"')) || (title.startsWith("'") && title.endsWith("'"))) {
        title = title.slice(1, -1);
      }
      title = title.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    }

    const subtitleMatch = line.match(/^\s+subtitle:\s*(.+)$/);
    if (subtitleMatch) {
      subtitle = subtitleMatch[1].trim();
      if ((subtitle.startsWith('"') && subtitle.endsWith('"')) || (subtitle.startsWith("'") && subtitle.endsWith("'"))) {
        subtitle = subtitle.slice(1, -1);
      }
    }
  }

  if (templateType === "section" && title && subtitle) {
    return `${title} \u2014 ${subtitle}`;
  }
  return title || "Untitled";
}

export function renumberFile(file) {
  let lines = fs.readFileSync(file, "utf-8").split("\n");

  // First pass: find all template line positions and their slide numbers
  let templateLines = {};
  let slideCounter = 0;

  lines.forEach((line, idx) => {
    if (/^\s*-\s*template:/.test(line)) {
      slideCounter++;
      templateLines[idx] = slideCounter;
    }
  });

  if (slideCounter === 0) {
    console.log(`  No slides found in ${file}`);
    return false;
  }

  // Second pass: find which slides have comments
  const slidesWithComments = {};
  lines.forEach((line, idx) => {
    if (/^(\s*#\s*Slide)\s*(\d*):\s*(.*)$/.test(line)) {
      for (let futureIdx = idx + 1; futureIdx < lines.length; futureIdx++) {
        if (templateLines[futureIdx] !== undefined) {
          slidesWithComments[futureIdx] = idx;
          break;
        }
      }
    }
  });

  // Third pass: add missing comments (work backwards to preserve line indices)
  let insertions = 0;
  const sortedKeys = Object.keys(templateLines).map(Number).sort((a, b) => b - a);

  for (const templateIdx of sortedKeys) {
    const slideNum = templateLines[templateIdx];
    if (slidesWithComments[templateIdx] === undefined) {
      const title = extractSlideTitle(lines, templateIdx);
      const comment = `# Slide ${slideNum}: ${title}`;
      lines.splice(templateIdx, 0, comment);
      insertions++;
      console.log(`  Added: # Slide ${slideNum}: ${title}`);
    }
  }

  // Fourth pass: rebuild templateLines if insertions happened
  if (insertions > 0) {
    templateLines = {};
    slideCounter = 0;
    lines.forEach((line, idx) => {
      if (/^\s*-\s*template:/.test(line)) {
        slideCounter++;
        templateLines[idx] = slideCounter;
      }
    });
  }

  // Fifth pass: renumber all comments
  let changes = 0;
  lines.forEach((line, idx) => {
    const match = line.match(/^(\s*#\s*Slide)\s*(\d*):\s*(.*)$/);
    if (match) {
      const prefix = match[1];
      const oldNum = match[2];
      const rest = match[3];

      let nextSlideNum = null;
      for (let futureIdx = idx + 1; futureIdx < lines.length; futureIdx++) {
        if (templateLines[futureIdx] !== undefined) {
          nextSlideNum = templateLines[futureIdx];
          break;
        }
      }

      if (nextSlideNum !== null) {
        const newLine = `${prefix} ${nextSlideNum}: ${rest}`;
        if (lines[idx] !== newLine) {
          console.log(`  Line ${idx + 1}: '# Slide ${oldNum}:' -> '# Slide ${nextSlideNum}:'`);
          lines[idx] = newLine;
          changes++;
        }
      }
    }
  });

  if (changes > 0 || insertions > 0) {
    fs.writeFileSync(file, lines.join("\n"));
    console.log(`  \u2713 Updated ${file}: ${insertions} comment(s) added, ${changes} renumbered`);
    return true;
  } else {
    console.log(`  No changes needed in ${file}`);
    return false;
  }
}

/**
 * Renumber slide comments in presentation YAML files.
 * @param {object} [opts]
 * @param {string} [opts.cwd] - working directory (defaults to process.cwd())
 * @param {string[]} [opts.files] - specific files to process
 */
export async function run(opts = {}) {
  const cwd = opts.cwd || process.cwd();

  if (opts.files && opts.files.length > 0) {
    for (const file of opts.files) {
      if (!fs.existsSync(file)) {
        throw new Error(`File not found: ${file}`);
      }
      console.log(`Renumbering: ${file}`);
      renumberFile(file);
    }
    return;
  }

  const dir = path.join(cwd, "presentations");
  if (!fs.existsSync(dir)) {
    console.log(`No presentations directory found at ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== "_template")
    .map((e) => path.join(dir, e.name, "index.md"))
    .filter((f) => fs.existsSync(f));

  if (files.length === 0) {
    console.log(`No presentation files found in ${dir}`);
    return;
  }

  let totalUpdated = 0;
  for (const file of files) {
    console.log(`Renumbering: ${file}`);
    if (renumberFile(file)) totalUpdated++;
  }

  console.log("\n" + "=".repeat(50));
  console.log(`Renumbering complete: ${files.length} file(s) processed, ${totalUpdated} updated`);
}
