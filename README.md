# LazySlides

[![npm version](https://img.shields.io/npm/v/lazyslides)](https://www.npmjs.com/package/lazyslides)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen)](https://nodejs.org)

An [Eleventy](https://www.11ty.dev/) plugin for building [Reveal.js](https://revealjs.com) presentations from YAML. Styled with [Tailwind CSS](https://tailwindcss.com).

[Live demo](https://chrisissorry.github.io/lazyslides/)

## Workflow

LazySlides separates content from design. You focus on what your presentation says — the engine handles how it looks.

A typical workflow:

1. **Research** — gather data, quotes, and examples (use an AI tool or do it manually)
2. **Outline** — structure sections and slides in `outline.md` (plain markdown, works with any tool)
3. **Draft** — convert the outline into YAML slides
4. **Iterate** — preview, refine content, re-validate

AI tools like Claude Code, Claude Desktop, or ChatGPT speed up steps 1-3 significantly. Claude Code has built-in slash commands for the full workflow (see below), but the outline format is plain markdown that works anywhere.

## Setup

Requires Node.js 22+ and pnpm.

```bash
pnpm dlx lazyslides init my-deck
cd my-deck
pnpm install
pnpm run dev
```

Open [localhost:8080/presentations/my-first-deck/](http://localhost:8080/presentations/my-first-deck/) — this is the starter deck created by `init`. Edit `presentations/my-first-deck/index.md` to make it yours.

## Outline format

Each project includes a `presentations/_template/outline.md` with this structure:

```markdown
# Presentation Title

## Metadata
- **Audience:** [description]
- **Purpose:** [goal]
- **Speaker:** [name and background]
- **Duration:** [estimated time]

## Key Messages
1. [message 1]
2. [message 2]
3. [message 3]

## Outline

### Section 1: [Section Name]
Purpose: [why this section exists]

#### Slide 1.1: [Slide Title]
- **Key point:** [main takeaway]
- **Template:** [template name]
- **Notes:** [what to say]
```

This is plain markdown — you can fill it out manually, paste it into any AI chat, or use `/create-outline` in Claude Code. The outline drives the YAML generation step.

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

The project also ships a `CLAUDE.md` with the complete template schema, so Claude Code knows every field of every template.

## Writing slides

Each presentation is a single `index.md` file with YAML frontmatter:

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

You can put any supporting files (outlines, notes, PDFs, images) alongside `index.md` in the same folder — only `index.md` is processed as a presentation.

## Templates

17 built-in templates:

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
