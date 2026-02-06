# Open-Sourcing the Presentation Engine — Strategic Plan

> **Status note (Feb 2026):** The stack has migrated from Jekyll/Ruby to Eleventy/Node.js. Sections 1-6 retain original context. Section 7 has been replaced with the npm packaging plan. Section 8 is the detailed implementation plan.

## 1. License Landscape (Good News)

Every dependency in the stack uses a **permissive license**. No GPL or copyleft anywhere:

| Dependency | License | Implication |
|---|---|---|
| Eleventy 3.x | MIT | No restrictions |
| Reveal.js 5.1.0 (vendored) | MIT | No restrictions |
| Tailwind CSS 4.x | MIT | No restrictions |
| GLightbox 3.3.1 (vendored) | MIT | No restrictions |
| highlight.js (bundled in Reveal) | BSD 3-Clause | Attribution required |
| DeckTape (PDF export) | MIT | No restrictions |
| Google Fonts (Source Serif 4, Plus Jakarta Sans) | OFL | Free for any use |

**Bottom line:** MIT license for the open-source project. Simple, well-understood, maximally permissive.

If you want to commercialize later (premium themes, hosted version, etc.), MIT still works. You'd own your own code and can dual-license or build proprietary extensions on top.

---

## 2. Separating Engine from Content

This is the core architectural challenge. The current repo mixes three concerns:

```
ENGINE (reusable)              CONTENT (private)              BRANDING (per-user)
─────────────────              ─────────────────              ───────────────────
_layouts/                      presentations/*/               themes/*.css
_includes/slides/              presentation images            (logos, brand assets)
src/styles.css
bin/
.eleventy.js
```

### Chosen Approach: npm Package Distribution

**Decision: Skip the template repo, go straight to a single installable npm package.**

One package: **`lazyslides`** — the engine (Eleventy plugin + templates + assets + CLI + scaffolding)

Available on npm (verified Feb 2026).

This is the Node.js equivalent of the "Jekyll Theme Gem" approach — the cleanest separation where users only maintain their content and get engine updates via `pnpm update lazyslides`. A separate `create-lazyslides` scaffolding package was considered but rejected — one package is simpler to version, publish, and maintain. Scaffolding lives in the same package as `lazyslides init`.

### How It Works for the User

```bash
pnpm dlx lazyslides init my-deck   # scaffold a new project
cd my-deck
pnpm install                        # install engine + dependencies
pnpm run dev                        # start building slides
# ... later ...
pnpm update lazyslides              # get engine updates
```

The user's project is minimal:
```
my-deck/
  eleventy.config.js          ← 6 lines (imports plugin)
  src/styles.css              ← 3 lines (imports engine CSS + local @source)
  presentations/
    presentations.json        ← layout/tags/permalink config
    _template/index.md        ← blank starter
    my-first-deck/index.md    ← hello world presentation
  themes/                     ← optional custom themes
  package.json
```

Everything else — layouts, 17 slide templates, Reveal.js, GLightbox, design tokens, 2000 lines of CSS — lives in `node_modules/lazyslides/` and updates automatically.

### Previous Options Considered (and why not)

| Option | Verdict |
|---|---|
| Git Submodule | Too much friction — Eleventy doesn't understand the layout |
| Fork-Based | Doesn't solve separation — same problem with merge conflicts |
| Template Repo | No update mechanism — forks diverge over time |
| Two npm packages (`lazyslides` + `create-lazyslides`) | Unnecessary complexity — two things to version/publish for minimal UX gain |
| **Single npm package (`lazyslides`)** | **Chosen — cleanest separation, `pnpm update` for upgrades, `lazyslides init` for scaffolding** |

---

## 3. Launch Readiness Checklist

### Done

- [x] README.md — comprehensive with quick start, features, template reference
- [x] LICENSE (MIT)
- [x] CONTRIBUTING.md
- [x] Private content removed (only `_template/` and `example/` in presentations)
- [x] Brand themes removed (only `default.css`)
- [x] `.claude/settings.json` (non-local) with sensible defaults
- [x] GLightbox vendored (no more CDN dependency)
- [x] `/new-presentation` slash command cleaned up

### Remaining (addressed by npm packaging work)

- [ ] `--help` on CLI scripts → unified `lazyslides --help` CLI
- [ ] `.github/` templates (issue/PR templates)
- [ ] CI/CD (GitHub Actions)
- [ ] Additional slash commands (`create-outline`, `add-slide`, etc.)

### Deferred

- [ ] Docker support
- [ ] Template gallery (screenshots of all 17 templates)

---

## 4. Claude Code Integration — Slash Commands & Scripts

### Current State

- `.claude/commands/new-presentation.md` — core agentic workflow guide
- `.claude/settings.json` — pre-approves build/validate commands
- `CLAUDE.md` — project context for Claude Code

### Planned Slash Commands

| Command | Purpose |
|---|---|
| `new-presentation` | Already exists — create a full presentation |
| `add-slide` | Add a slide to an existing presentation |
| `validate` | Run validation and fix issues |
| `research-topic` | Research a topic via web search, create a context file |
| `create-outline` | Generate a presentation outline from a topic or brief |
| `refine-slides` | Review and improve existing slides |

These encode the **agentic presentation workflow** — the real value proposition beyond "Eleventy + Reveal.js."

---

## 5. Packaging & Commercialization Strategy

### The Value Proposition

1. **YAML-only content** — No HTML skills needed, structured data that AI can reliably generate
2. **Agentic workflow** — Claude Code slash commands that turn "research → outline → slides" into a guided process
3. **Iterability** — YAML diffs are clean, AI can modify individual slides without breaking anything
4. **Template system** — Consistent, professional output every time

### Open Source (Free)
- Engine: layouts, templates, build scripts, default theme
- Basic slash commands (new-presentation, validate)
- Documentation and example presentation

### Potential Commercial Extensions
- **Premium theme packs** — Corporate-grade themes, industry-specific designs
- **Advanced slash commands** — Research-to-deck pipeline, brand voice tuning, audience-aware content generation
- **Hosted service** — Upload YAML, get hosted presentation (like a "Vercel for slide decks")
- **Team features** — Shared template libraries, brand enforcement, review workflows
- **Analytics** — Presentation view tracking, engagement metrics

### License Approach for Dual Model
- MIT for the engine (maximizes adoption)
- Proprietary license for premium themes/commands
- Or: open-core model where advanced features live in a separate closed repo

---

## 6. Project Name

**`lazyslides`** — available on npm (verified Feb 2026).

---

## 7. Architecture: npm Package Design

### Repo Structure: Single Package (no monorepo needed)

```
lazyslides/                        (repo root, published as: lazyslides)
  package.json
  index.js                         (Eleventy plugin entry point)
  cli.js                           (unified CLI: lazyslides init|validate|renumber|pdf)
  lib/
    init.js                        (scaffolding logic)
    validate.js                    (YAML validation)
    renumber.js                    (slide comment renumbering)
    export-pdf.js                  (DeckTape PDF export)
  _layouts/
    presentation.njk               (Reveal.js wrapper — 240 lines)
    default.njk                    (simple HTML for index page)
  _includes/
    slides/                        (17 templates + footer + nested list macro)
  assets/
    reveal.js/                     (vendored Reveal.js 5.x)
    css/themes/default.css         (default theme)
    css/vendor/glightbox.min.css
    js/vendor/glightbox.min.js
  src/
    styles.css                     (design tokens + all slide CSS)
  scaffold/                        (template files copied by `lazyslides init`)
  data/
    site.json
  examples/                        (for development/testing, not published)
    presentations/example/index.md
  docs/
  .nvmrc
```

### Key Technical Mechanisms

**1. Nunjucks search paths** — how templates resolve from node_modules:
```js
eleventyConfig.amendLibrary("njk", (env) => {
  env.loaders[0].searchPaths.push(path.join(pkgRoot, "_includes"));
  env.loaders[0].searchPaths.push(path.join(pkgRoot, "_layouts"));
});
```
This makes `{% include "slides/content.njk" %}` and `layout: presentation.njk` find files inside `node_modules/lazyslides/`. User-local directories are searched first, enabling overrides.

**2. Passthrough copy mapping** — how assets get to the output:
```js
eleventyConfig.addPassthroughCopy({
  [path.join(pkgRoot, "assets/reveal.js")]: "assets/reveal.js"
});
```
Maps package files to `_site/` output. The root-absolute paths in layouts (`/assets/reveal.js/dist/reveal.css`) reference this output structure — no changes needed to template files.

**3. Tailwind CSS import chain** — how styling works across the package boundary:

Engine's `src/styles.css` (in npm package):
```css
@import "tailwindcss";
@source "../_includes/**/*.njk";     /* scans engine templates */
@source "../_layouts/**/*.njk";
@theme { /* all design tokens */ }
/* 1900+ lines of slide CSS */
```

User's `src/styles.css` (scaffolded, 3 lines):
```css
@import "lazyslides/styles.css";     /* pulls in engine CSS */
@source "../presentations/**/*.md";  /* scans user content */
```

Works because the engine's `package.json` exports `"./styles.css": "./src/styles.css"` and Tailwind v4 resolves `@source` relative to the imported file's location.

**4. Theme override system** — CSS cascade via passthrough copy order:
```js
// Engine themes first (defaults)
eleventyConfig.addPassthroughCopy({ [path.join(pkgRoot, "assets/css/themes")]: "assets/css/themes" });
// User themes second (overrides)
eleventyConfig.addPassthroughCopy({ "themes": "assets/css/themes" });
```

**5. Unified CLI** — single `lazyslides` binary with subcommands:
```
lazyslides init [dir]   → scaffold a new project
lazyslides validate     → YAML validation
lazyslides renumber     → renumber slide comments
lazyslides pdf [name]   → PDF export via DeckTape
lazyslides --help       → usage info
```

---

## 8. Implementation Plan

### Phase 1: Repo Restructuring

- Move `_data/site.json` → `data/site.json`
- Move `bin/*.js` → `lib/*.js` (refactored)
- Move `presentations/example/` → `examples/`
- Move `presentations/_template/` → `scaffold/`
- Create `scaffold/` template files for `lazyslides init`
- Update `package.json` with exports map, bin entry, peer deps, files array

### Phase 2: Engine Plugin + CLI

- Create `index.js` — Eleventy plugin registering filters, tests, search paths, passthrough copies, global data, virtual templates
- Modify `src/styles.css` — remove user-space `@source` directives
- Refactor bin scripts into `lib/` — ESM exports, `process.cwd()`-relative paths, `--help` support
- Create `cli.js` — unified CLI entry point
- Create `lib/init.js` — scaffolding logic
- Test with a local example project

### Phase 3: Integration Testing

- `node cli.js init test-project` → scaffold
- Install, validate, build → verify output
- Test theme overrides, CLI commands, PDF export
- Verify user template overrides work (local `_includes/` takes precedence)

### Phase 4: Documentation & Publishing

- Update README.md, CLAUDE.md, CONTRIBUTING.md
- Publish: `pnpm publish`

### What Does NOT Change

- YAML presentation format (100% backward compatible)
- All 17 slide template names and their YAML schemas
- Reveal.js configuration options in frontmatter
- Theme CSS custom property system
- Presentation URL structure (`/presentations/<name>/`)

### Technical Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Nunjucks search path API is undocumented | GOV.UK Eleventy plugin uses same pattern; pin `@11ty/eleventy ^3.0.0` |
| Tailwind `@source` in imported files from node_modules | Official Tailwind v4 pattern; test with pnpm's symlinked node_modules |
| pnpm symlinks confuse passthrough copy | Use `fs.realpathSync()` to resolve if needed |
| `addTemplate()` limitations for index page | Fallback: scaffold `pages/index.njk` as a file |
| DeckTape's heavy Puppeteer dependency | Optional — not included in scaffolded project by default |

### Verification

- `node cli.js init test-deck` → scaffolds correctly
- `cd test-deck && pnpm install && pnpm run dev` → serves at localhost
- `pnpm run validate` → passes on example presentation
- `pnpm run build` → `_site/` contains all expected assets
- `pnpm update lazyslides` → picks up engine changes without touching user content
