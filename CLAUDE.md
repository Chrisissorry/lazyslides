# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LazySlides turns structured YAML into professional slide decks. Presentations are authored in YAML, rendered through Nunjucks templates into Reveal.js, and styled with Tailwind CSS 4.x. Distributed as an npm package (`lazyslides`) with an Eleventy plugin and CLI.

## Presentation Authoring Workflow

### Creating a new presentation

1. Start with an outline — fill in `presentations/_template/outline.md` or use `/create-outline`
2. Run `/new-presentation` — the slash command guides you through the full process
3. Or manually: create `presentations/{name}/index.md` with YAML frontmatter

### Adding slides

1. Run `/add-slide` — picks template, gathers content, inserts at the right position
2. Or manually: add a new `- template: ...` entry to the `slides:` array

### Editing slides

1. Read the presentation's `index.md`
2. Modify the YAML for the target slide
3. Run `pnpm run validate` to verify
4. Run `pnpm run dev` to preview

### Validating

```bash
pnpm run validate    # check all presentations
pnpm run renumber    # update slide comment numbers
```

## YAML Schema Reference

All presentations use this structure:

```yaml
---
title: Deck Title            # required
description: Subtitle
author: Speaker Name
theme: default
transition: slide
progress: true
slideNumber: true
show_footer: true
slides:                      # required — array of slide objects
  - template: content        # required on every slide
    title: Slide Title
    # ... template-specific fields
    notes: |                 # optional speaker notes (all templates)
      What to say during this slide
---
```

**Do NOT include** `layout: presentation` — it is set automatically.

### Template Fields

Fields marked with `*` are required.

#### `title` — Opening slide
- `title`* — presentation title
- `subtitle` — tagline or date
- `author` — speaker name
- `logo` — show logo (default: true)

#### `section` — Chapter divider
- `title`* — section name
- `subtitle` — section description

#### `content` — Standard bullets
- `title`* — slide title
- `lead` — intro paragraph above bullets
- `text` — body paragraph
- `items` — bullet list (supports nested lists)
- `ordered_items` — numbered list (supports nested lists)
- `reference` / `reference_link` — single source
- `references` — multiple sources (array of `{name, link}`)

#### `center` — Centered statement or image
- `title` — optional heading
- `text` — centered statement
- `image` — centered image path
- `image_alt` — alt text
- `reference` / `reference_link` / `references`

#### `hero` — Full-bleed background
- `title`* — big headline
- `text` — supporting text
- `image` — background image path
- `color` — hex fallback color (e.g., `"#1a1a2e"`)
- `box_title` — overlay box heading
- `box_text` — overlay box content
- `box_items` — overlay box bullet list
- `hide_footer` — hide footer on this slide

#### `metrics` — Key statistics
- `title`* — slide title
- `subtitle` — description
- `metrics`* — array of metric objects:
  - `value`* — the number/percentage
  - `label`* — what it measures
  - `context` — small text below label
  - `color` — `mint`, `coral`, `icy`, `amber` (default: mauve)
- `reference` / `reference_link` / `references`

#### `comparison` — Two-column table
- `title`* — slide title
- `left_header` — left column header
- `right_header` — right column header
- `rows`* — array of row objects:
  - `left` — left cell content
  - `right` — right cell content
  - `left_icon` — show icon in left cell (true/false)
  - `right_icon` — show icon in right cell (true/false)
- `highlight` — `left`, `right` (default), or `none`
- `reference` / `reference_link` / `references`

#### `columns` — Side-by-side content
- `title`* — slide title
- `left_title` / `left_text` / `left_items`
- `right_title` / `right_text` / `right_items`
- `reference` / `reference_link` / `references`

#### `quote` — Testimonial
- `quote`* — the quotation text
- `author` — who said it
- `author_title` — their role/title
- `reference` / `reference_link` / `references`

#### `image-overlay` — Image with text box
- `image`* — full background image path
- `title` — overlay heading
- `text` — overlay paragraph
- `items` — overlay bullet list
- `position` — text box position
- `reference` / `reference_link` / `references`

#### `code` — Code snippet
- `title`* — slide title
- `code`* — the code block (use `|` for multiline)
- `language` — syntax highlighting language
- `caption` — description below code
- `reference` / `reference_link` / `references`

#### `timeline` — Horizontal events
- `title`* — slide title
- `events`* — array of event objects:
  - `date` — when it happened
  - `title`* — event name
  - `text` — event description
- `reference` / `reference_link` / `references`

#### `funnel` — Progressive narrowing
- `title`* — slide title
- `stages`* — array of stage objects:
  - `label`* — stage name
  - `text` — stage description
- `reference` / `reference_link` / `references`

#### `split` — 1/3 image + 2/3 content
- `title`* — slide title
- `text` — body text
- `items` — bullet list (supports nested lists)
- `image`* — image path
- `image_alt` — alt text
- `reference` / `reference_link` / `references`

#### `split-wide` — 1/3 content + 2/3 image
- `title`* — slide title
- `text` — body text
- `items` — bullet list (supports nested lists)
- `image`* — image path
- `image_alt` — alt text
- `reference` / `reference_link` / `references`

#### `table` — Data table
- `title`* — slide title
- `columns`* — array of column header strings
- `rows`* — array of row arrays (each row is an array of cell strings)
- `reference` / `reference_link` / `references`

#### `agenda` — Clickable table of contents
- `title` — slide title (default: "Agenda")
- `sections`* — array of section objects:
  - `title`* — section name
  - `slide`* — slide number to link to
- `reference` / `reference_link` / `references`

## Common Patterns

### Nested lists
Supported in `content`, `split`, and `split-wide` templates:
```yaml
items:
  - "Regular item"
  - "Parent with children:":
      - "Child 1"
      - "Child 2"
```

### References
```yaml
# Single source
reference: "McKinsey Digital 2024"
reference_link: "https://..."

# Multiple sources
references:
  - name: "Source 1"
    link: "https://..."
  - name: "Source 2"
    link: "https://..."
```

### Speaker notes
```yaml
notes: |
  Key talking points for this slide.
  Press S in Reveal.js to open speaker view.
```

### Section comments
Use YAML comments to number and label slides:
```yaml
slides:
# Slide 1: Opening
- template: title
  title: My Talk

# Slide 2: Agenda
- template: agenda
```

### Image lightbox
Images in `center`, `split`, and `split-wide` templates automatically get lightbox functionality via GLightbox. Click any image to view fullscreen.

## Design System

- **Dimensions:** 960x540 (16:9) — Reveal.js scales to fit viewport
- **Typography:** Source Serif 4 for headings, Plus Jakarta Sans for body
- **Colors:** Primary is mauve (purple), semantic colors: `mint`, `coral`, `amber`, `icy`
- **Spacing:** 40px slide padding, design tokens in `src/styles.css` `@theme` block

## Rules for Claude

### DO
- Read the template docblock before generating YAML for unfamiliar templates
- Run `pnpm run validate` after any YAML changes
- Use the map syntax for nested lists (parent string ends with colon, quoted)
- Quote YAML strings containing colons, HTML, or special characters
- Keep bullet points to 3-5 per slide
- Use `section` templates to organize long presentations

### DON'T
- Add `layout: presentation` to frontmatter
- Use raw HTML in YAML values
- Create deeply nested lists (max 2 levels)
- Use template names not in the valid list
- Reference images that don't exist without marking them as TODOs
- Modify engine files when asked to edit presentation content

## Slash Commands

| Command | Description |
|---------|-------------|
| `/new-presentation` | Create a complete presentation from scratch |
| `/add-slide` | Add a slide to an existing presentation |
| `/validate` | Validate YAML and fix issues |
| `/research-topic` | Research a topic for data-driven slides |
| `/create-outline` | Create a structured outline before generating YAML |
| `/refine-slides` | Review and improve an existing presentation |

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
pnpm run dev          # Development server with hot reload
pnpm run build        # Production build
pnpm run validate     # Validate presentation YAML
pnpm run renumber     # Renumber slide comments
pnpm run pdf          # Export to PDF
```

Validation runs automatically before dev and build commands.

**Requirements:** Node.js 22 (see `.nvmrc`), install deps with `pnpm install`

## Git Workflow

- **`develop`** is the default branch; **`main`** is production
- Both branches have **branch protection** — never commit directly to them
- Always create a feature branch, push it, and open a PR:
  ```bash
  git checkout -b fix/short-description develop
  # ... make changes, commit ...
  git push -u origin fix/short-description
  gh pr create --base develop
  ```
- Branch naming: `fix/...`, `feat/...`, `ci/...`, `docs/...`
- CI runs on all PRs to `develop` and `main` — wait for it to pass
- Releases: PR from `develop` → `main`, then create a GitHub Release to trigger npm publish

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
