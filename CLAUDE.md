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
theme: default               # LazySlides theme name
transition: slide            # global transition: none, fade, slide, convex, concave, zoom
progress: true
slideNumber: true
show_footer: true            # show footer on slides (default: true, set false to hide globally)
math: true                   # enable KaTeX math rendering (opt-in)
slides:                      # required — array of slide objects
  - template: content        # required on every slide
    title: Slide Title
    # ... template-specific fields
    hide_footer: true        # optional — hide footer on this slide (default: false)
    notes: |                 # optional speaker notes (all templates)
      What to say during this slide
---
```

**Do NOT include** `layout: presentation` — it is set automatically.

Optional footer overrides (presentation-level, not per-slide):

```yaml
footer_brand: "Custom Name"   # override footer brand name for this presentation
footer_logo: false             # hide the default logo icon in footer
```

### Universal Slide Fields (all templates)

These fields can be added to any slide:

```yaml
- template: content
  title: My Slide
  transition: zoom           # per-slide transition override
  transition_speed: slow     # default, fast, slow
  fragment: fade-up          # animate all items progressively
  auto_animate: true         # morph matching elements from previous slide
  auto_animate_easing: ease  # auto-animate easing function
  auto_animate_duration: 0.5 # auto-animate duration in seconds
  background_color: "#1a1a2e"  # solid background color
  background_gradient: "linear-gradient(to bottom, #283e51, #0a2342)"
  background_image: "/assets/images/photo.jpg"  # full-bleed background
  background_video: "videos/intro.mp4"          # video background
  background_video_loop: true
  background_video_muted: true
  notes: |
    Speaker notes
```

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
- `show_footer` — show footer on this slide (default: hidden)

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
- `show_footer` — show footer on this slide (default: hidden)

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

#### `three-columns` — Three equal-width columns
- `title`* — slide title
- `col1_title` / `col1_text` / `col1_items`
- `col2_title` / `col2_text` / `col2_items`
- `col3_title` / `col3_text` / `col3_items`
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
- `auto_generate` — build agenda automatically from `section` slides (default: false)
- `sections` — manual array of section objects (ignored when `auto_generate` is true):
  - `title`* — section name
  - `slide`* — 0-based slide index to link to
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

### Fragment animations (progressive disclosure)
```yaml
# Slide-level: all items animate with the same effect
- template: content
  title: Key Points
  fragment: fade-up
  items:
    - "First point"
    - "Second point"

# Item-level: individual items with different effects
- template: content
  title: Key Points
  items:
    - text: "Appears with fade-up"
      fragment: fade-up
    - text: "Appears with grow"
      fragment: grow
    - "No animation (plain string)"
```

Valid fragment values: `fade-in`, `fade-out`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `fade-in-then-out`, `fade-in-then-semi-out`, `grow`, `shrink`, `strike`, `highlight-red`, `highlight-green`, `highlight-blue`, `highlight-current-red`, `highlight-current-green`, `highlight-current-blue`, `current-visible`, `semi-fade-out`

### Auto-animate (morphing between slides)
```yaml
# Consecutive slides with auto_animate morph matching elements
- template: content
  title: "Step 1"
  auto_animate: true
  items:
    - text: "First point"
      data_id: "point-1"

- template: content
  title: "Step 2"
  auto_animate: true
  items:
    - text: "First point (unchanged)"
      data_id: "point-1"
    - text: "New point appears"
      data_id: "point-2"
```

### Background enhancements
```yaml
# Any template can have a full-bleed background
- template: content
  title: Key Points
  background_image: "/assets/images/photo.jpg"

# Gradient backgrounds for section dividers
- template: section
  title: Chapter 2
  background_gradient: "linear-gradient(to bottom, #283e51, #0a2342)"

# Video backgrounds
- template: hero
  title: Welcome
  background_video: "videos/intro.mp4"
  background_video_loop: true
  background_video_muted: true
```

### Image lightbox
Images in `center`, `split`, and `split-wide` templates automatically get lightbox functionality via GLightbox. Click any image to view fullscreen.

### Image guidelines

Images in `split` and `split-wide` templates fill their panel edge-to-edge using `object-fit: cover` — the image is scaled to fill the entire area and cropped from center if the aspect ratio doesn't match.

**Recommended dimensions** (2x for retina):

| Template | Panel size | Recommended image |
|----------|-----------|-------------------|
| `split` (1/3 image) | 320×540 | 640×1080 or larger, portrait/square |
| `split-wide` (2/3 image) | 640×540 | 1280×1080 or larger, landscape |
| `hero` background | 960×540 | 1920×1080 or larger |
| `image-overlay` | 960×540 | 1920×1080 or larger |
| `center` (contained) | varies | any; displayed with `object-fit: contain` |

**How images are handled per template:**
- **`split` / `split-wide`**: Image fills the panel, cropped from center. Use high-res photos or screenshots that look good when edges are trimmed.
- **`center`**: Image is contained (never cropped), centered on the slide. Aspect ratio is preserved.
- **`hero`**: Image is set via `background_image` or `color` as a Reveal.js data attribute, filling the full viewport.
- **`image-overlay`**: Same as hero — full-viewport background.

**Tips:**
- Place images in `presentations/{name}/assets/` or a shared `assets/images/` directory
- Use absolute paths from the site root: `/presentations/my-deck/assets/photo.jpg`
- Screenshots of UIs work well in `split-wide` (landscape) — use high resolution
- Photos work well in `split` (portrait crop) — ensure the subject is centered

## Design System

- **Dimensions:** 960x540 (16:9) — Reveal.js scales to fit viewport
- **Typography:** Source Serif 4 for headings, Plus Jakarta Sans for body
- **Colors:** Primary is mauve (purple), semantic colors: `mint`, `coral`, `amber`, `icy`
- **Spacing:** 40px slide padding, design tokens in `src/styles.css` `@theme` block
- **Footer branding:** Override `--footer-brand-name` and `--footer-logo-url` in a theme CSS file
- **Slides:** Full-viewport (no card frame by default). Use `theme: card` to restore the card/theater look.

### Themes

| Theme | Description |
|-------|-------------|
| `default` | Clean white, sky blue primary |
| `card` | Restores card/theater aesthetic with shadow and border-radius |
| `midnight` | Dark navy, light text, deep indigo primary |
| `forest` | Deep greens, warm earth tones |
| `corporate` | Charcoal/slate, minimal, professional |
| `sunset` | Warm coral/amber tones |

### Plugins

Always loaded: Highlight, Markdown, Notes, Zoom (Alt+Click), Search (Ctrl+F)
Opt-in: Math/KaTeX (`math: true` in frontmatter) — enables LaTeX: `$E = mc^2$`

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
| `/add-template` | Create a custom slide template |
| `/add-theme` | Create a custom CSS theme |

## Package Architecture

This repo is both the npm package source and a development environment:

- **`index.js`** — Eleventy plugin entry point (registers filters, templates, layouts, assets)
- **`cli.js`** — Unified CLI (`lazyslides init|validate|renumber|pdf`)
- **`lib/`** — CLI module implementations (init, validate, renumber, export-pdf)
- **`scaffold/`** — Template files copied by `lazyslides init`
- **`_includes/slides/`** — 18 slide templates + footer + nested list macro + section attrs macro
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
- Template names match the 18 valid types
- Comparison structure validation
- Image path existence
- Theme name (valid LazySlides themes: default, card, midnight, forest, corporate, sunset)
- Global and per-slide transition values (valid: `none`, `fade`, `slide`, `convex`, `concave`, `zoom`)
- Slide-level and item-level fragment values (valid: `fade-in`, `fade-up`, `grow`, etc.)
- Transition speed (valid: `default`, `fast`, `slow`)
