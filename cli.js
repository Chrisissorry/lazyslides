#!/usr/bin/env node

const args = process.argv.slice(2);
const command = args[0];

const HELP = `
Usage: lazyslides <command> [options]

Commands:
  init [dir]       Scaffold a new LazySlides project
  validate         Validate presentation YAML files
  renumber [file]  Renumber slide comments
  pdf [name]       Export presentations to PDF

Options:
  --help           Show this help message
  --version        Show version number
`;

async function main() {
  if (!command || command === "--help" || command === "-h") {
    console.log(HELP.trim());
    process.exit(0);
  }

  if (command === "--version" || command === "-v") {
    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);
    const pkg = require("./package.json");
    console.log(pkg.version);
    process.exit(0);
  }

  switch (command) {
    case "init": {
      const dir = args[1];
      if (!dir) {
        console.error("Error: Please specify a project directory.\n");
        console.error("  lazyslides init my-deck");
        process.exit(1);
      }
      const { run } = await import("./lib/init.js");
      await run({ dir });
      break;
    }

    case "validate": {
      const { run } = await import("./lib/validate.js");
      const result = await run({
        renumber: args.includes("--renumber"),
      });
      if (result.errors.length > 0) process.exit(1);
      break;
    }

    case "renumber": {
      const { run } = await import("./lib/renumber.js");
      const files = args.slice(1).filter((a) => !a.startsWith("--"));
      await run({ files: files.length > 0 ? files : undefined });
      break;
    }

    case "pdf": {
      const { run } = await import("./lib/export-pdf.js");
      const name = args[1];
      await run({ name });
      break;
    }

    default:
      console.error(`Unknown command: ${command}\n`);
      console.log(HELP.trim());
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
