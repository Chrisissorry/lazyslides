# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LazySlides is an npm package (`lazyslides`) that provides an Eleventy plugin + CLI for creating Reveal.js slide decks from pure YAML. Presentations are authored in YAML, rendered through Nunjucks templates, and styled with Tailwind CSS 4.x.

## Package Architecture

This repo is both the npm package source and a development environment:

- **`index.js`** — Eleventy plugin entry point (registers filters, templates, layouts, assets)
- **`cli.js`** — Unified CLI (`lazyslides init|validate|renumber|pdf`)
- **`lib/`** — CLI module implementations (init, validate, renumber, export-pdf)
- **`scaffold/`** — Template files copied by `lazyslides init`
- **`_includes/slides/`** — 17 slide templates + footer + nested list macro
- **`_layouts/`** — Reveal.js wrapper + index page layout (registered as virtual templates by plugin)
- **`assets/`** — Vendored Reveal.js, GLightbox, theme CSS
- **`src/styles.css`** — All design tokens and slide CSS (Tailwind CSS)
- **`data/site.json`** — Default site data
- **`presentations/`** — Example presentations (dev only, not published to npm)
- **`eleventy.config.js`** — Local dev config that uses the plugin from `./index.js`

## Build Commands

```bash
# Development server with hot reload
pnpm run dev

# Production build only
pnpm run build

# Validate presentation YAML
pnpm run validate

# Renumber slide comments
pnpm run renumber

# Export to PDF
pnpm run pdf
```

Validation runs automatically before dev and build commands.

**Requirements:** Node.js 22 (see `.nvmrc`), install deps with `pnpm install`

## User Workflow

```bash
pnpm dlx lazyslides init my-deck   # scaffold a new project
cd my-deck && pnpm install          # install engine
pnpm run dev                        # start building slides
pnpm update lazyslides              # get engine updates later
```

## Content Flow
```
presentations/*/index.md (YAML) → _includes/slides/*.njk (templates) → _layouts/presentation.njk (Reveal.js wrapper)
```

Templates and layouts resolve from node_modules/lazyslides/ via Nunjucks search paths and virtual templates. Users can override any template by creating it locally.

### Slide Templates
`title`, `section`, `content`, `center`, `hero`, `metrics`, `comparison`, `columns`, `quote`, `image-overlay`, `code`, `timeline`, `funnel`, `split`, `split-wide`, `table`, `agenda`

### Presentation YAML Structure
```yaml
---
title: Deck Title
slides:
  - template: content
    title: Slide Title
    items:
      - Bullet point
      - "Parent item:":            # Nested list syntax
          - "Child item 1"
          - "Child item 2"
    reference: "Citation"
    reference_link: "https://..."
---
```

Note: `layout: presentation` is NOT needed — it's set automatically by `presentations/presentations.json`.

### Nested Lists
Use the map syntax for sub-items (supported in `content`, `split`, and `split-wide` templates):
```yaml
items:
  - "Regular item"
  - "Parent:":
      - "Child 1"
      - "Child 2"
```

### Image Lightbox
Images in `center`, `split`, and `split-wide` templates automatically get lightbox functionality via GLightbox. Click any image to view fullscreen.

## Design System

- **Dimensions:** 960x540 (16:9) - matches design file, Reveal.js scales to fit viewport
- **Typography:** Source Serif 4 for headings, Plus Jakarta Sans for body
- **Colors:** Primary is mauve (purple), semantic colors for mint/coral/amber/icy
- **Spacing:** 40px slide padding, design tokens in `src/styles.css` `@theme` block

## Key Plugin Techniques

- **Nunjucks search paths**: `env.loaders[0].searchPaths.push()` adds package paths after user-local paths
- **Virtual layouts**: `addTemplate("_layouts/presentation.njk", content)` provides layouts without user needing `_layouts/`
- **Passthrough copy**: Maps absolute paths from package to output directory
- **Tailwind `@import`**: User's `src/styles.css` imports `lazyslides/styles.css`, `@source` resolves relative to the imported file

## Validation

`lib/validate.js` checks:
- Valid YAML syntax
- Required fields: `title`, `slides`
- Each slide has a `template` field
- Template names match the 17 valid types
- Comparison structure validation
- Image path existence
