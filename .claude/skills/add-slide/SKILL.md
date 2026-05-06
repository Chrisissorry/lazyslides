---
name: add-slide
description: >
  Guides adding a new slide to an existing LazySlides presentation —
  picks template, gathers content, inserts at the right position, and validates.
when_to_use: >
  Use when the user wants to add, insert, or append a slide to an existing presentation.
allowed-tools:
  - Read
  - Edit
  - Bash
user-invocable: true
effort: medium
---

# Add Slide

You are helping the user add a new slide to an existing presentation.

## Step 1: Identify Target Presentation

List the presentation folders in `presentations/` (excluding `_template`). Ask the user which presentation they want to add a slide to. If there's only one, confirm it.

## Step 2: Show Current Slides

Read the presentation's `index.md` and display a numbered list of existing slides:

```
1. [title] Opening Slide
2. [content] Key Points
3. [metrics] Results
```

Ask the user where to insert the new slide (after which slide number, or at the end).

## Step 3: Choose Template

Ask the user which template to use. Show this reference:

| Template | Best For |
|----------|----------|
| `title` | Opening slide with logo, title, subtitle, author |
| `section` | Section divider for organizing chapters |
| `content` | Standard bullet points with optional lead text |
| `center` | Image or statement centered **inside** the slide — correct choice for image-only slides |
| `hero` | Full-browser-background image (bleeds outside slide) with headline text — **NOT for image-only slides** |
| `metrics` | 2-4 key statistics with colored cards |
| `comparison` | Before/after two-column table |
| `columns` | Side-by-side content columns |
| `split` | 1/3 image + 2/3 content |
| `split-wide` | 1/3 content + 2/3 image |
| `quote` | Testimonial with attribution |
| `timeline` | Horizontal timeline with events |
| `funnel` | Progressive narrowing funnel |
| `table` | Data table with headers |
| `code` | Code snippet with syntax highlighting |
| `image-overlay` | Full-browser-background image (bleeds outside slide) with positioned text box — **NOT for image-only slides** |
| `agenda` | Clickable table of contents |
| `diagram` | D2 diagram compiled to inline SVG |

## Step 3b: Image Placement and Sourcing (image slides only)

If the chosen template involves an image (`center`, `hero`, `image-overlay`, `split`, `split-wide`), work through these two decisions before writing any YAML.

### Decision 1 — Image placement

Ask the user:

> "Should this image fill the entire browser behind the slide (dramatic full-bleed effect), or display inside the slide as content?"

| Intent | Template | How it works |
|--------|----------|--------------|
| Image inside the slide | `center` with `image:` | Renders as `<img>` constrained to slide dimensions |
| Image + text side by side | `split` or `split-wide` | `<img>` in a panel |
| Full-browser background with text on top | `hero` or `image-overlay` | Reveal.js `data-background-image` — fills the whole browser window, not just the slide area |

> **Warning:** `hero` and `image-overlay` set the image as a browser-wide background via Reveal.js `data-background-image`. In windowed or embedded mode the image bleeds outside the slide frame into white space. Only use these when you deliberately want that effect.

### Decision 2 — Image sourcing

Ask the user:

> "Will you supply the image file, or should I search for one?"

- **User supplies:** Leave a `# TODO: add image` comment in the YAML where the `image:` field goes. Do NOT create any placeholder file. Do not put anything in `image:` yet.
- **Claude searches:** Search Wikimedia Commons (or similar public domain sources) for a suitable photo. Download the actual file directly into `images/` inside the presentation folder before writing the YAML. Confirm the file is a valid, non-zero-byte image before referencing it.

### Dev server / passthrough copy rules

> **Never** create placeholder image files with `touch` or any other method that produces 0-byte files. The Eleventy dev server passthrough-copies files at startup — empty files get written to `_site` and the watcher will not update them when real images arrive later.
>
> Always download or copy real image files before starting the dev server, or restart the dev server after adding images.
>
> After adding images, verify `_site/presentations/{name}/images/` contains non-zero files (`ls -lh`). If files are 0 bytes, restart the dev server.

## Step 4: Gather Content

Based on the chosen template, read the docblock in `_includes/slides/{template}.njk` for the exact field reference. Ask the user for:
- Required fields (marked with * in the docblock)
- Optional fields they want to include
- Speaker notes (optional)

## Step 5: Generate and Insert

1. Generate the YAML for the new slide
2. Insert it at the correct position in the `slides:` array
3. Run `pnpm run renumber` to update slide comments
4. Run `pnpm run validate` to verify

## Step 6: Preview

Suggest the user run `pnpm run dev` to preview the result.
