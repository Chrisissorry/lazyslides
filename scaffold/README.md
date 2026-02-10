# {{name}}

A presentation project built with [LazySlides](https://github.com/chris-tietz/lazyslides).

## Quick Start

```bash
pnpm install
pnpm run dev
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Development server with hot reload |
| `pnpm run build` | Production build |
| `pnpm run validate` | Validate presentation YAML |
| `pnpm run renumber` | Renumber slide comments |
| `pnpm run pdf` | Export to PDF |

## Creating Presentations

Add a new folder under `presentations/` with an `index.md` file containing your slides in YAML format. See `presentations/_template/index.md` for a starter template.

## Customization

- **Themes** — Drop CSS files into `themes/` to override the default theme
- **Styles** — Add custom CSS to `src/styles.css`
- **Templates** — Run `/add-template` in Claude Code to create custom slide templates
