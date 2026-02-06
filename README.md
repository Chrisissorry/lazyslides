# LazySlides

[![npm version](https://img.shields.io/npm/v/lazyslides)](https://www.npmjs.com/package/lazyslides)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen)](https://nodejs.org)

**AI-native presentations from YAML.** Write slides in pure YAML, get polished presentations powered by [Reveal.js](https://revealjs.com) and [Tailwind CSS](https://tailwindcss.com).

## Get Started with Claude Code

LazySlides is built for the agentic workflow. Create entire presentations with [Claude Code](https://claude.ai/code) — no drag-and-drop, no design decisions, just content.

```bash
pnpm dlx lazyslides init my-deck
cd my-deck && pnpm install
```

Open the project with Claude Code and use the `/new-presentation` command:

```
> /new-presentation
```

Claude will:
1. Gather your topic, audience, and goals
2. Create a structured outline
3. Map each slide to the optimal template
4. Generate complete YAML
5. Validate and suggest a preview

The project includes a `CLAUDE.md` with the full template schema, so Claude knows every field of every template.

### More commands

| Command | Description |
|---------|-------------|
| `/new-presentation` | Create a complete presentation from scratch |
| `/add-slide` | Add a slide to an existing deck |
| `/research-topic` | Research a topic for data-driven slides |
| `/create-outline` | Plan structure before generating YAML |
| `/refine-slides` | Review and improve an existing presentation |
| `/validate` | Check YAML and fix issues |

## Manual Quick Start

Prefer working without AI? LazySlides works great on its own:

```bash
pnpm dlx lazyslides init my-deck
cd my-deck
pnpm install
pnpm run dev
```

Open [localhost:8080/presentations/my-first-deck/](http://localhost:8080/presentations/my-first-deck/) to see the starter deck. Edit `presentations/my-first-deck/index.md` to start building.

## Features

- **17 slide templates** — title, section, content, metrics, comparison, split, quote, timeline, funnel, table, code, and more
- **Pure YAML authoring** — no HTML, no Markdown, just structured data
- **Tailwind CSS 4 design system** — design tokens, semantic colors, consistent typography
- **Reveal.js 5** — keyboard navigation, speaker notes (press S), fullscreen, PDF export
- **Theme system** — swap colors and fonts with a single CSS file
- **Image lightbox** — click any image for fullscreen view via GLightbox
- **Section progress dots** — visual navigation for long presentations
- **PDF export** — one command via DeckTape
- **Validation** — catches YAML errors before build
- **Claude Code integration** — 6 slash commands for AI-assisted authoring

## How It Works

```
presentations/my-deck/index.md (YAML)
    → lazyslides templates (in node_modules)
    → Eleventy + Reveal.js
    → _site/ (static HTML)
```

### Write a presentation

```yaml
---
title: My Presentation
slides:
  - template: title
    title: Hello World
    subtitle: My first LazySlides deck

  - template: content
    title: Key Points
    items:
      - First point
      - "Nested items:":
          - Sub-point one
          - Sub-point two

  - template: metrics
    title: Results
    metrics:
      - value: "42%"
        label: Growth
        color: mint
---
```

## Templates

| Template | Description |
|----------|-------------|
| `title` | Opening slide with logo, title, subtitle, author |
| `section` | Chapter divider for organizing sections |
| `content` | Standard bullet points with optional nested lists |
| `center` | Centered statement or image |
| `hero` | Full-bleed background image with text overlay |
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
| `image-overlay` | Full image with positioned text box |
| `agenda` | Clickable table of contents |

## Theming

Drop a CSS file into `themes/` to override the default theme:

```css
:root {
  --color-primary-500: #your-brand-color;
  --footer-brand-name: 'Your Brand';
}
```

Then set `theme: your-theme-name` in presentation frontmatter.

## Commands & CLI

### npm scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start dev server with hot reload |
| `pnpm run build` | Production build to `_site/` |
| `pnpm run validate` | Validate all presentation YAML |
| `pnpm run renumber` | Renumber slide comments |
| `pnpm run pdf` | Export all presentations to PDF |

### CLI

```bash
lazyslides init [dir]       # Scaffold a new project
lazyslides validate         # Validate presentation YAML
lazyslides renumber [file]  # Renumber slide comments
lazyslides pdf [name]       # Export to PDF
```

## Updating

To get the latest templates, styles, and features:

```bash
pnpm update lazyslides
```

Your content stays untouched — only the engine updates.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on adding templates, creating themes, and submitting PRs. AI-assisted contributions are welcome — see [AGENTS.md](AGENTS.md) for agent-specific rules.

## License

MIT
