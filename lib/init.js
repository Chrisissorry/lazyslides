import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const scaffoldDir = path.join(pkgRoot, "scaffold");

/**
 * Copy a directory recursively.
 */
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Scaffold a new LazySlides project.
 * @param {object} opts
 * @param {string} opts.dir - target directory path
 */
export async function run(opts) {
  const targetDir = path.resolve(opts.dir);
  const projectName = path.basename(targetDir);

  // Check if directory already has files
  if (fs.existsSync(targetDir)) {
    const existing = fs.readdirSync(targetDir);
    if (existing.length > 0) {
      console.error(`Error: Directory "${targetDir}" is not empty.`);
      process.exit(1);
    }
  }

  fs.mkdirSync(targetDir, { recursive: true });

  console.log(`\nCreating a new LazySlides project in ${targetDir}\n`);

  // 1. Copy scaffold/eleventy.config.js
  fs.copyFileSync(
    path.join(scaffoldDir, "eleventy.config.js"),
    path.join(targetDir, "eleventy.config.js")
  );
  console.log("  Created eleventy.config.js");

  // 2. Create src/styles.css from scaffold
  fs.mkdirSync(path.join(targetDir, "src"), { recursive: true });
  fs.copyFileSync(
    path.join(scaffoldDir, "styles.css"),
    path.join(targetDir, "src", "styles.css")
  );
  console.log("  Created src/styles.css");

  // 3. Create presentations/ with template and starter deck
  const presentationsDir = path.join(targetDir, "presentations");
  fs.mkdirSync(presentationsDir, { recursive: true });

  // presentations.json
  fs.copyFileSync(
    path.join(scaffoldDir, "presentations.json"),
    path.join(presentationsDir, "presentations.json")
  );
  console.log("  Created presentations/presentations.json");

  // _template/
  copyDir(
    path.join(scaffoldDir, "_template"),
    path.join(presentationsDir, "_template")
  );
  console.log("  Created presentations/_template/");

  // my-first-deck/
  copyDir(
    path.join(scaffoldDir, "my-first-deck"),
    path.join(presentationsDir, "my-first-deck")
  );
  console.log("  Created presentations/my-first-deck/");

  // 4. Create themes/ directory (empty, for user overrides)
  fs.mkdirSync(path.join(targetDir, "themes"), { recursive: true });
  // Add a .gitkeep so git tracks the empty directory
  fs.writeFileSync(path.join(targetDir, "themes", ".gitkeep"), "");
  console.log("  Created themes/");

  // 5. package.json from template
  const pkgTemplate = fs.readFileSync(
    path.join(scaffoldDir, "package.json.tmpl"),
    "utf-8"
  );
  const pkgContent = pkgTemplate.replace(/\{\{name\}\}/g, projectName);
  fs.writeFileSync(path.join(targetDir, "package.json"), pkgContent);
  console.log("  Created package.json");

  // 6. Rename-on-copy files (.gitignore, .nvmrc)
  fs.copyFileSync(
    path.join(scaffoldDir, "gitignore"),
    path.join(targetDir, ".gitignore")
  );
  console.log("  Created .gitignore");

  fs.copyFileSync(
    path.join(scaffoldDir, "nvmrc"),
    path.join(targetDir, ".nvmrc")
  );
  console.log("  Created .nvmrc");

  // 7. README.md
  const readmeTemplate = fs.readFileSync(
    path.join(scaffoldDir, "README.md"),
    "utf-8"
  );
  const readmeContent = readmeTemplate.replace(/\{\{name\}\}/g, projectName);
  fs.writeFileSync(path.join(targetDir, "README.md"), readmeContent);
  console.log("  Created README.md");

  // 8. CLAUDE.md (Claude Code integration)
  fs.copyFileSync(
    path.join(scaffoldDir, "CLAUDE.md"),
    path.join(targetDir, "CLAUDE.md")
  );
  console.log("  Created CLAUDE.md");

  // 9. .claude/ directory (commands + settings)
  const claudeDir = path.join(targetDir, ".claude");
  fs.mkdirSync(path.join(claudeDir, "commands"), { recursive: true });
  fs.copyFileSync(
    path.join(scaffoldDir, "claude-commands", "new-presentation.md"),
    path.join(claudeDir, "commands", "new-presentation.md")
  );
  fs.copyFileSync(
    path.join(scaffoldDir, "claude-settings.json"),
    path.join(claudeDir, "settings.json")
  );
  console.log("  Created .claude/ (Claude Code integration)");

  // Done!
  console.log(`
Done! To get started:

  cd ${projectName}
  pnpm install
  pnpm run dev
`);
}
