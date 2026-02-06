# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in LazySlides, please report it responsibly:

1. **Do not** open a public GitHub issue
2. Open a [GitHub Security Advisory](https://github.com/Chrisissorry/lazyslides/security/advisories/new) with details of the vulnerability
3. Include steps to reproduce, impact assessment, and any suggested fixes

You can expect an initial response within 72 hours.

## Scope

LazySlides generates **static HTML presentations** from YAML input. Key security considerations:

- **YAML parsing** uses `js-yaml` with the default safe schema (`YAML.load`), which does not execute arbitrary code
- **Template rendering** uses Nunjucks with autoescaping for HTML output
- **No server-side runtime** — output is static HTML/CSS/JS served by any web server
- **No user authentication** — presentations are static files with no login or session management
- **Dependencies** are minimal (`js-yaml` at runtime, Eleventy/Tailwind/DeckTape as dev/peer dependencies)

## Out of Scope

- Vulnerabilities in Reveal.js, Eleventy, or other upstream dependencies (report those to their respective projects)
- Issues requiring physical access to the build machine
- Social engineering attacks
