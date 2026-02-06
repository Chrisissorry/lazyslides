# AGENTS.md

Instructions for AI agents working with this codebase.

## Overview

LazySlides is a YAML-driven presentation system. Agents must produce **YAML content**, never raw HTML or Markdown slides. The rendering pipeline is:

```
YAML frontmatter → Nunjucks templates → Reveal.js HTML
```

All slide content lives in `presentations/*/index.md` as YAML frontmatter between `---` fences.

## YAML Authoring Rules

1. **Always quote strings** that contain colons, HTML entities, or special YAML characters
2. **Nested lists** use the map syntax — the parent string must end with a colon and be quoted:
   ```yaml
   items:
     - "Parent item:":
         - "Child 1"
         - "Child 2"
   ```
3. **Only use valid templates**: `title`, `section`, `content`, `center`, `hero`, `metrics`, `comparison`, `columns`, `quote`, `image-overlay`, `code`, `timeline`, `funnel`, `split`, `split-wide`, `table`, `agenda`
4. **Image paths** are relative to the presentation folder (e.g., `images/photo.jpg`)
5. **Do NOT add** `layout: presentation` — it is set automatically by `presentations/presentations.json`
6. **Read the template docblock** in `_includes/slides/{template}.njk` before generating slide YAML to verify field names and required fields
7. **Run validation** after generating or modifying YAML: `pnpm run validate`

## Multi-Agent Safety

- **No branch switching** — stay on the current branch
- **No force operations** — no `git push --force`, `git reset --hard`, or `git clean`
- **No package modifications** — do not add/remove/update dependencies without explicit user approval
- **Preserve user content** — never delete or overwrite presentation files without confirmation
- **No npm publish** — never run `pnpm publish` or `npm publish`

## Code Contribution Rules

When modifying the LazySlides engine (not presentation content):

1. **Template structure** — follow the pattern in existing templates:
   - Docblock comment at top with field descriptions
   - `<section class="slide-{name}">` wrapper
   - `<div class="slide-body">` → `<div class="slide-header">` pattern
   - Footer include at bottom
   - Speaker notes `<aside>` support
2. **New templates** must be added to `VALID_TEMPLATES` in `lib/validate.js`
3. **ESM only** — all code uses ES modules (`import`/`export`), no CommonJS
4. **No new dependencies** without discussion — Reveal.js and GLightbox are vendored, not npm deps
5. **CSS changes** go in `src/styles.css` using Tailwind CSS 4 syntax and existing design tokens

## Testing & Validation

- **Always validate** before committing presentation changes: `pnpm run validate`
- **Always build** before committing engine changes: `pnpm run build`
- **Visual verify** after CSS or template changes — run `pnpm run dev` and check affected slides
- Validation checks: YAML syntax, required fields, valid template names, comparison structure, image paths

## PR & Commit Standards

- **Commit format**: `type: description` (e.g., `feat: add waterfall template`)
  - `feat` — new feature
  - `fix` — bug fix
  - `docs` — documentation only
  - `style` — CSS/visual changes
  - `refactor` — code restructuring
  - `chore` — tooling, config, dependencies
- **Include screenshots** for any visual changes (templates, CSS, themes)
- **Update README.md** template table if adding new templates
- **Update CLAUDE.md** schema reference if adding new template fields
