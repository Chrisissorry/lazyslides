# LazySlides Visual Enhancement Plan

## Context

LazySlides produces clean, well-structured presentations but lacks the visual dynamism users expect from modern slide decks. Competing presentations on Dribbble feature full-bleed backgrounds, element-level animations, smooth morphing transitions, and rich motion design. Meanwhile, Reveal.js 5.1.0 (already vendored) ships with powerful features — fragments, auto-animate, per-slide transitions, video backgrounds — that LazySlides doesn't fully expose through YAML.

**Key architectural decision**: Drop the card/theater model and go full-viewport like standard Reveal.js. This unlocks built-in themes, full-bleed backgrounds, and ecosystem compatibility. The card look becomes an optional theme.

This plan covers **8 workstreams** organized into **3 implementation sprints**, all backward-compatible with existing presentations.

---

## Sprint 1: Foundations (Card Removal + Animations)

### 1A. Drop Card/Theater Model → Full-Viewport Slides

The card model is ~20 lines of CSS that block Reveal.js themes, full-bleed backgrounds, and `data-background-*` attributes. Removing it is the single highest-impact change.

**Remove from `src/styles.css`** (lines 140-172):
- Delete `.reveal-viewport { background: transparent !important; }` (line 140-142)
- Delete `.reveal .slides > section` card styling: `background: #ffffff`, `border-radius: 6px`, `border`, `box-shadow` (lines 154-172)
- Change `--r-background-color: transparent` to `--r-background-color: var(--color-background)` (line 120) — let themes control the slide background

**Adjust Reveal.js variable mappings** in `.reveal {}` block (lines 118-137):
- Keep `--r-main-color`, `--r-heading-color`, `--r-link-color` mappings
- Let `--r-background-color` be overridable by Reveal.js themes: set a default but don't force `transparent`

**Footer adjustment**:
- The footer lives *inside* `<section>` — it survives card removal unchanged
- Remove `border-radius: 0 0 6px 6px` from `.slide-footer` (line 1647)
- Footer still shows: slide number | logo + brand | sources

**Other hardcoded whites to audit** in `src/styles.css`:
- `.slide-table tr:nth-child(even) td { background: white }` → use `var(--color-background)` or `var(--r-background-color)`
- Timeline dots `background: white` → use `var(--color-background)`
- Various component backgrounds should use semantic variables

**Create `assets/css/themes/card.css`** — an optional theme that restores the card look:
```css
/* Card theme - restores the card/theater aesthetic */
.reveal .slides > section,
.reveal .slides > section > section {
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid var(--color-slate-200);
  box-shadow: 0 2px 3px -1px rgba(0,0,0,0.07), 0 5px 10px -3px rgba(0,0,0,0.05);
}
.reveal-viewport { background: transparent !important; }
html, body { background: linear-gradient(...); }
```

**Files**: `src/styles.css` (remove card styling, adjust variable mappings, audit hardcoded whites), create `assets/css/themes/card.css`
**Complexity**: Medium (wide surface area but each change is small)

---

### 1B. Shared Section Attributes Macro

Every template has an opening `<section class="slide-xxx">` tag. Create a reusable Nunjucks macro that emits all `data-*` attributes to avoid modifying all 17 templates repeatedly.

**Create** `_includes/slides/_section-attrs.njk`:
```nunjucks
{% macro sectionAttrs(slide) %}
  {%- if slide.transition %} data-transition="{{ slide.transition }}"{% endif %}
  {%- if slide.transition_speed %} data-transition-speed="{{ slide.transition_speed }}"{% endif %}
  {%- if slide.auto_animate %} data-auto-animate{% endif %}
  {%- if slide.auto_animate_easing %} data-auto-animate-easing="{{ slide.auto_animate_easing }}"{% endif %}
  {%- if slide.auto_animate_duration %} data-auto-animate-duration="{{ slide.auto_animate_duration }}"{% endif %}
  {%- if slide.background_color %} data-background-color="{{ slide.background_color }}"{% endif %}
  {%- if slide.background_gradient %} data-background="{{ slide.background_gradient }}"{% endif %}
  {%- if slide.background_image %} data-background-image="{{ slide.background_image }}"{% endif %}
  {%- if slide.background_video %} data-background-video="{{ slide.background_video }}"{% endif %}
{%- endmacro %}
```

Update all 17 templates:
```nunjucks
{% from "slides/_section-attrs.njk" import sectionAttrs %}
<section class="slide-content"{{ sectionAttrs(slide) }}>
```

**Files**: Create `_includes/slides/_section-attrs.njk`, modify all 17 `_includes/slides/*.njk` templates
**Complexity**: Low (mechanical)

---

### 1C. Fragment Animations (Progressive Disclosure)

Bullets appearing one-by-one is the #1 most-requested presentation feature. Reveal.js already has `fragments: true` enabled — we just need to emit the CSS classes.

**YAML schema additions**:
```yaml
# Slide-level: all items animate with the same effect
- template: content
  title: Key Points
  fragment: fade-up
  items:
    - "First point"
    - "Second point"

# Item-level: individual items can specify their own effect
- template: content
  title: Key Points
  items:
    - text: "Appears with fade-up"
      fragment: fade-up
    - text: "Appears with grow"
      fragment: grow
    - "No animation (plain string, no fragment)"
```

Valid values: `fade-in`, `fade-out`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `fade-in-then-out`, `fade-in-then-semi-out`, `grow`, `shrink`, `strike`, `highlight-red`, `highlight-green`, `highlight-blue`

**Template changes**:
- `_nested-list.njk` — Add `fragment_type` parameter to `renderItems` macro; emit `class="fragment <type>"` on `<li>` elements
- `metrics.njk`, `timeline.njk`, `funnel.njk`, `comparison.njk`, `columns.njk` — Each repeated element gets fragment class
- `content.njk`, `split.njk`, `split-wide.njk` — Pass `slide.fragment` to `renderItems`

**Files**: `_includes/slides/_nested-list.njk` (core), 8+ templates, `lib/validate.js`, `CLAUDE.md`
**Complexity**: Low

---

### 1D. Per-Slide Transitions

```yaml
- template: hero
  title: "Big Reveal"
  transition: zoom          # overrides global transition
  transition_speed: slow    # optional: default, fast, slow
```

Valid values: `none`, `fade`, `slide`, `convex`, `concave`, `zoom`

Already handled by `_section-attrs.njk` macro from 1B.

**Files**: `lib/validate.js`, `CLAUDE.md`
**Complexity**: Low (free after 1B)

---

### 1E. Auto-Animate (Morphing Between Slides)

Reveal.js auto-animate morphs matching elements between consecutive slides by text content, image `src`, or explicit `data-id`.

**YAML schema additions**:
```yaml
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

Optional: `auto_animate_easing`, `auto_animate_duration`

**Template changes**:
- `_section-attrs.njk` handles `<section>` attributes
- `_nested-list.njk` — emit `data-id` on `<li>` when items have `data_id`
- CSS in `src/styles.css` for auto-animate overflow handling

**Files**: `_nested-list.njk`, `src/styles.css`, `lib/validate.js`, `CLAUDE.md`
**Complexity**: Medium

---

## Sprint 2: Themes & Design Guidance

### 2A. Theme System: Reveal.js Built-in + Custom LazySlides Themes

With the card model gone, Reveal.js built-in themes work out of the box. We ship both.

**Reveal.js built-in themes** (13, already vendored in `assets/reveal.js/dist/theme/`):
`black`, `black-contrast`, `blood`, `beige`, `dracula`, `moon`, `night`, `serif`, `simple`, `solarized`, `white`, `white-contrast`

**Theme loading architecture**: Need to decide how Reveal.js themes interact with LazySlides themes:
- **Reveal.js themes** set `--r-*` variables (background, text, heading, link colors, fonts)
- **LazySlides custom themes** set `--color-*` variables (primary scale, semantic colors, footer)
- A user could use a Reveal.js theme as the base and a LazySlides theme for component-level customization, or use just one

**Implementation approach**:
- `theme:` in frontmatter loads from `assets/css/themes/` (LazySlides themes, including `card`)
- Add `reveal_theme:` in frontmatter to load a Reveal.js built-in theme from `assets/reveal.js/dist/theme/`
- Both can be combined: `reveal_theme: moon` + `theme: corporate` (Reveal.js sets the base, LazySlides theme adds brand colors)
- `_layouts/presentation.njk` needs a second `<link>` for the Reveal.js theme

**Update `_layouts/presentation.njk`**:
```html
<!-- Reveal.js base theme (optional) -->
{% if reveal_theme %}
<link rel="stylesheet" href="/assets/reveal.js/dist/theme/{{ reveal_theme }}.css">
{% endif %}
<!-- LazySlides theme (always loaded) -->
<link rel="stylesheet" href="/assets/css/themes/{{ theme | default('default') }}.css">
```

**CSS variable bridge**: Ensure LazySlides templates read from `--r-*` where Reveal.js themes set them, so built-in themes actually affect appearance:
```css
/* In src/styles.css, map our variables to fall back to Reveal.js theme values */
.reveal {
  --color-background: var(--r-background-color, #ffffff);
  --color-text: var(--r-main-color, var(--color-slate-700));
  --color-text-heading: var(--r-heading-color, var(--color-slate-800));
}
```

**Custom LazySlides themes** (new):
| Theme | Description |
|-------|-------------|
| `default` | (updated) Clean white, mauve primary — now without card styling |
| `card` | Restores card/theater look from before |
| `midnight` | Dark navy, light text, deep indigo primary |
| `forest` | Deep greens, warm earth tones |
| `corporate` | Charcoal/slate, minimal, professional |
| `sunset` | Warm coral/amber, warm gradient background |

**Prerequisite**: Make `src/styles.css` fully themeable — replace remaining hardcoded colors with CSS custom properties (audit from 1A).

**Files**: `_layouts/presentation.njk`, `src/styles.css` (variable bridge), create 5 new theme files in `assets/css/themes/`, update `CLAUDE.md`, update `.claude/commands/add-theme.md`
**Complexity**: Medium

---

### 2B. LazySlides Design Skill (`.claude/skills/`)

Adapted from Anthropic's frontend design skill. Skills auto-activate based on context — when Claude works on presentations, it automatically loads the design principles without users needing to invoke a slash command.

**Create** `.claude/skills/presentation-design/SKILL.md`:

```yaml
---
name: presentation-design
description: >
  Apply when creating, refining, or reviewing LazySlides presentations.
  Guides visual hierarchy, template selection, content density, motion
  strategy, and theme usage for distinctive, professional slide decks.
---
```

**Skill content sections**:

1. **Design thinking process** — Before generating YAML, choose an aesthetic direction: minimal/clean, bold/dramatic, warm/inviting, corporate/professional, editorial/magazine. Pick a matching theme and transition style.

2. **Visual hierarchy** — Dramatic title slides, section dividers as breathing room, one idea per slide. Title → Section → Evidence → Conclusion arc.

3. **Template selection strategy** — Never 3+ of the same template in a row. Alternate text-heavy (content, columns) with visual (hero, metrics, split). Emotional arc: open with impact → build with evidence → close with aspiration.

4. **Content density rules** — Headlines 2-6 words, max 12 words per bullet, 3-5 bullets per slide, 3 metrics for visual balance, code blocks max 10 lines.

5. **Motion & animation strategy**:
   - Use `fragment` for: argument building, metric reveals, comparison reveals
   - Do NOT fragment: every slide, decorative purposes, simple lists
   - Use `auto_animate` for: before/after comparisons, progressive detail
   - Per-slide `transition: zoom` only for dramatic reveals; `fade` for smooth narrative

6. **Theme & color usage** — Metric colors tell a story (mint=positive, coral=negative, icy=neutral). Hero `color` matches theme. Comparison `highlight` matches the recommendation. Suggest a `reveal_theme` + `theme` combo based on the audience.

7. **Anti-patterns to flag** — Wall of text (>100 words), template monotony, missing section dividers in decks >8 slides, generic titles.

**Supporting files**:
- `examples/good-deck-structure.yaml` — Annotated ideal deck
- `examples/anti-patterns.yaml` — Common mistakes

**Integration**: Update `.claude/commands/refine-slides.md` to add a "Design Quality" check in its structural analysis step.

**Files**: Create `.claude/skills/presentation-design/SKILL.md`, example files, update `refine-slides.md`
**Complexity**: Medium (content-heavy, no code changes)

---

## Sprint 3: Backgrounds & Plugins

### 3A. Enhanced Backgrounds

With the card model removed, `data-background-*` works as Reveal.js intended — full-viewport.

**YAML schema additions**:
```yaml
# Full-bleed background image (Reveal.js native)
- template: content
  title: Key Points
  background_image: "/assets/images/photo.jpg"

# Gradient background
- template: section
  background_gradient: "linear-gradient(to bottom, #283e51, #0a2342)"

# Video background
- template: hero
  background_video: "videos/intro.mp4"
  background_video_loop: true
  background_video_muted: true

# Solid color background
- template: section
  background_color: "#1a1a2e"
```

Already handled by `_section-attrs.njk` macro.

**Note**: This is separate from the existing `hero` template's `image` field (which uses inline CSS). Both approaches now work — `image` puts the image inside the slide content area, `background_image` fills the full viewport behind it.

**Files**: `_section-attrs.njk` (extend), `index.js` (passthrough for video files), `lib/validate.js`, `CLAUDE.md`
**Complexity**: Medium

---

### 3B. Additional Reveal.js Plugins

Currently loaded: Highlight, Markdown, Notes (3 of 6)

**Add always-on** (lightweight, zero config):
- **Zoom** — Alt+Click to magnify any element
- **Search** — Ctrl+F to find text across slides

**Add opt-in** (conditional loading):
- **Math (KaTeX)** — `math: true` in frontmatter enables LaTeX: `$E = mc^2$`

**Files**: Vendor plugin files into `assets/reveal.js/plugin/{math,zoom,search}/`, modify `_layouts/presentation.njk`, `index.js` (passthrough), `CLAUDE.md`
**Complexity**: Low-Medium

---

## Summary: Priority & Sequencing

| Sprint | Workstream | Impact | Effort | Key Files |
|--------|-----------|--------|--------|-----------|
| 1 | **Drop card model** | **CRITICAL** | Medium | `src/styles.css`, `card.css` (new) |
| 1 | Section attrs macro | Foundation | Low | `_section-attrs.njk` (new), 17 templates |
| 1 | Fragment animations | **HIGH** | Low | `_nested-list.njk`, 8 templates |
| 1 | Per-slide transitions | Medium | Low | (covered by macro) |
| 1 | Auto-animate | **HIGH** | Medium | `_nested-list.njk`, `src/styles.css` |
| 2 | Theme system (Reveal.js + custom) | **HIGH** | Medium | `presentation.njk`, `src/styles.css`, 5 theme files |
| 2 | Design skill | **HIGH** | Medium | `.claude/skills/presentation-design/SKILL.md` (new) |
| 3 | Enhanced backgrounds | Medium | Medium | `_section-attrs.njk`, `index.js` |
| 3 | Additional plugins | Medium | Low | `presentation.njk`, plugin files |

---

## Verification

After each sprint:
1. Run `pnpm run validate` on existing presentations (must pass unchanged)
2. Run `pnpm run dev` and verify existing presentations render correctly (will look different without cards — this is expected)
3. Test `theme: card` restores the old card look
4. Create a test presentation using new YAML fields (fragments, transitions, auto-animate)
5. Preview in browser — verify animations work, transitions fire
6. Test `reveal_theme: moon` and `reveal_theme: dracula` — built-in themes should apply
7. Test each custom LazySlides theme
8. Test the design skill auto-activates when creating/refining a presentation
