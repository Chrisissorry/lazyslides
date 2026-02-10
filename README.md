# LazySlides

[![npm version](https://img.shields.io/npm/v/lazyslides)](https://www.npmjs.com/package/lazyslides)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen)](https://nodejs.org)

Build things, not slides. For people who are too lazy to build Powerpoints and still have to... somehow. 

Leverage your favorite AI agent to build simple, yet meaningful slide decks. 

Built on [Eleventy](https://www.11ty.dev/), [Reveal.js](https://revealjs.com), and [Tailwind CSS](https://tailwindcss.com).

[Live demo](https://chrisissorry.github.io/lazyslides/presentations/example/)

## Why

AI tools like ChatGPT, Gamma, and Manus generate entire slide decks — but the output is generic, you can't edit one slide without regenerating the whole thing, and exports to PowerPoint break layouts. The underlying problem hasn't changed: content and design are still tangled together.

LazySlides separates them. You write slides as structured YAML — the format AI models read and write natively. The engine handles all rendering and styling. This means:

- **Edit one slide without touching the rest** — each slide is an independent YAML block
- **You control every word** — no AI-generated filler text, no walls of bullets
- **Clean git diffs** — review slide changes line by line in pull requests
- **Validation catches errors before your audience does** — schema checks run on every build
- **Composable** — copy slides between decks, merge presentations, build libraries

## Features

- **17 slide templates** — title, content, metrics, comparison, timeline, funnel, code, and more
- **Speaker view** — press S for notes, timer, and next-slide preview
- **Section progress bar** — visual progress dots with section markers; click to jump between sections
- **Source references** — attach citations to any slide, rendered as linked footnotes
- **Image lightbox** — click any image to view fullscreen via GLightbox
- **Syntax highlighting** — code slides with language-aware highlighting
- **PDF export** — one command via DeckTape at 1920x1080
- **Themeable** — swap colors, fonts, and branding with a single CSS file
- **Extensible** — add custom slide templates to your project as needed
- **Validation** — schema checks catch YAML errors before your audience does
- **Keyboard navigation** — arrow keys, Escape for overview, F for fullscreen

## Workflow

Research a topic, outline the structure, generate YAML, iterate. Any AI tool can handle steps 1-3 — LazySlides ships with slash commands for Claude Code to handle it, but the outline format is plain markdown that works in Claude Desktop, ChatGPT, or any other tool.

1. **Research** — gather data, quotes, and examples
2. **Outline** — structure sections and slides in `outline.md`
3. **Draft** — convert the outline into YAML slides (AI does this in seconds)
4. **Iterate** — preview, refine content, re-validate

You focus on what your presentation content. The engine ties it to themed slides. 

## Setup

Requires Node.js 22+ and pnpm.

```bash
pnpm dlx lazyslides init my-deck
cd my-deck
pnpm install
pnpm run dev
```

Open [localhost:8080/presentations/my-first-deck/](http://localhost:8080/presentations/my-first-deck/) — the starter deck created by `init`. Edit `presentations/my-first-deck/index.md` to make it yours.

## Outline format

Each project includes `presentations/_template/outline.md`:

```markdown
# Introducing LazySlides

## Metadata
- **Audience:** Developers, technical founders, presentation-heavy professionals
- **Purpose:** Show how YAML + AI replaces manual slide design
- **Speaker:** Chrisissorry, creator of LazySlides
- **Duration:** 20 minutes

## Key Messages
1. Presentations are broken — manual layout and proprietary formats waste hours
2. YAML + templates = separation of concerns
3. AI writes structured YAML natively, enabling fast generation

## Outline

### Section 1: The Problem
Purpose: Establish that current tools (including AI ones) don't fix the core issue

#### Slide 1.1: Death by PowerPoint
- **Key point:** AI tools moved the pain, didn't remove it
- **Template:** content
- **Notes:** Generic output, all-or-nothing generation, broken exports

#### Slide 1.2: What if slides were just data?
- **Key point:** Pure YAML in, professional slides out
- **Template:** center
```

The scaffold includes a blank version at `presentations/_template/outline.md`. Feed it to any AI tool along with your source material (meeting notes, research, a brief) and it produces a structured outline ready for YAML generation.

## Writing slides

Each presentation is a single `index.md` with YAML frontmatter. No HTML, no Markdown body — just structured data:

```yaml
---
title: My Presentation
slides:
  - template: title
    title: Hello World
    subtitle: My first deck

  - template: content
    title: Key Points
    items:
      - First point
      - Second point

  - template: metrics
    title: Results
    metrics:
      - value: "42%"
        label: Growth
        color: mint
---
```

Supporting files (outlines, notes, PDFs, images) go alongside `index.md` in the same folder — only `index.md` is processed as a presentation.

## Templates

17 built-in templates cover common slide patterns:

| Template | Description |
|----------|-------------|
| `title` | Opening slide with logo, title, subtitle, author |
| `section` | Chapter divider |
| `content` | Bullet points, supports nested lists |
| `center` | Centered statement or image |
| `hero` | Full-bleed background image with text overlay |
| `metrics` | Key statistics with colored cards |
| `comparison` | Two-column comparison table |
| `columns` | Side-by-side content |
| `split` | 1/3 image + 2/3 content |
| `split-wide` | 1/3 content + 2/3 image |
| `quote` | Quotation with attribution |
| `timeline` | Horizontal timeline |
| `funnel` | Progressive narrowing stages |
| `table` | Data table |
| `code` | Code snippet with syntax highlighting |
| `image-overlay` | Full image with positioned text box |
| `agenda` | Clickable table of contents |

See `CLAUDE.md` for the full field reference for each template.

## Slash commands (Claude Code)

The scaffolded project includes Claude Code slash commands for the full workflow:

| Command | What it does |
|---------|-------------|
| `/new-presentation` | Create a presentation from scratch |
| `/add-slide` | Add a slide to an existing deck |
| `/research-topic` | Research a topic for data-driven slides |
| `/create-outline` | Plan structure before writing YAML |
| `/refine-slides` | Improve an existing presentation |
| `/validate` | Check YAML and fix issues |

The project ships a `CLAUDE.md` with the complete template schema, so Claude Code knows every field of every template.

## Commands

```bash
pnpm run dev          # Dev server with hot reload
pnpm run build        # Production build to _site/
pnpm run validate     # Validate presentation YAML
pnpm run renumber     # Renumber slide comments
pnpm run pdf          # Export to PDF via DeckTape
```

## Theming

Drop a CSS file into `themes/` to override design tokens:

```css
:root {
  --color-primary-500: #your-brand-color;
  --footer-brand-name: 'Your Brand';
}
```

Set `theme: your-theme-name` in presentation frontmatter.

## Updating

```bash
pnpm update lazyslides
```

Content stays untouched — only the engine updates.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). AI-assisted contributions welcome — see [AGENTS.md](AGENTS.md).

## License

MIT
