---
name: presentation-design
description: >
  Apply when creating, refining, or reviewing LazySlides presentations.
  Guides visual hierarchy, template selection, content density, motion
  strategy, and theme usage for distinctive, professional slide decks.
---

# Presentation Design Skill

## 1. Design Thinking Process

Before generating YAML, choose an aesthetic direction based on the audience and content:

| Direction | Best For | Theme Combo | Transition |
|-----------|----------|-------------|------------|
| Minimal/Clean | Data-heavy, technical | `default` or `corporate` | `fade` |
| Bold/Dramatic | Keynotes, product launches | `midnight` or `theme: black` | `zoom` for reveals, `slide` elsewhere |
| Warm/Inviting | Training, culture, onboarding | `sunset` or `forest` | `slide` |
| Corporate/Professional | Board decks, strategy | `corporate` | `fade` |
| Editorial/Magazine | Thought leadership, creative | `default` | `convex` |

## 2. Visual Hierarchy

Structure every deck with this arc:

1. **Title slide** (template: `title`) — establish brand and topic
2. **Agenda** (template: `agenda`) — orient the audience (optional for <8 slides)
3. **Section dividers** (template: `section`) — breathing room between topics
4. **Evidence slides** — mix of `content`, `metrics`, `comparison`, `split`
5. **Summary/Close** — `center` with a key takeaway, or `title` reprise

Rules:
- One idea per slide
- Title slides should have 2-6 word headlines
- Section dividers every 4-7 slides in long decks (>12 slides)
- End with impact: a bold statement, a call to action, or a key metric

## 3. Template Selection Strategy

**Never use 3+ of the same template in a row.** Alternate between text-heavy and visual templates:

| Purpose | Template Options |
|---------|-----------------|
| Argument building | `content` with `fragment: fade-up` |
| Visual evidence | `split`, `split-wide`, `center` (with image) |
| Data points | `metrics`, `table`, `comparison` |
| Narrative flow | `timeline`, `funnel` |
| Impact statement | `quote`, `hero`, `center` (text only) |
| Code demonstration | `code` |
| Side-by-side comparison | `columns`, `comparison` |

**Emotional arc**: Open with impact (hero/title) -> build with evidence (content/metrics/comparison) -> close with aspiration (quote/center/hero)

## 4. Content Density Rules

| Element | Guideline |
|---------|-----------|
| Headlines | 2-6 words, action-oriented |
| Bullet text | Max 12 words per bullet |
| Bullets per slide | 3-5 items |
| Metrics | 3 for visual balance (2 or 4 acceptable) |
| Code blocks | Max 10 visible lines |
| Quote text | Max 2 sentences |
| Nested lists | Max 2 levels deep |

If a slide exceeds these limits, split it into two slides.

## 5. Motion & Animation Strategy

### Use fragments for:
- Argument building: reveal bullets one-by-one (`fragment: fade-up`)
- Metric reveals: show numbers progressively (`fragment: fade-in`)
- Comparison reveals: expose rows one at a time (`fragment: fade-up`)
- Progressive disclosure in training content

### Do NOT use fragments for:
- Every slide (causes pacing fatigue)
- Simple lists with <3 items
- Decorative purposes
- Section dividers or title slides

### Use auto-animate for:
- Before/after comparisons (matching `data_id` on items)
- Progressive detail — start simple, add complexity
- Code evolution — show how code changes step by step

### Per-slide transitions:
- `transition: zoom` — only for dramatic reveals (use sparingly, max 2 per deck)
- `transition: fade` — smooth narrative flow, section transitions
- `transition: none` — rapid-fire comparison between similar slides
- Default `slide` transition works well for most slides

## 6. Theme & Color Usage

### Metric colors tell a story:
- `mint` — positive outcomes, growth, success
- `coral` — negative outcomes, problems, risks
- `amber` — warnings, caveats, things to watch
- `icy` — neutral data, context, baseline

### Hero slides:
- `color` should match the theme's mood (dark for midnight, warm for sunset)
- Use `background_image` for photographic hero slides
- Use `background_gradient` for abstract/geometric backgrounds

### Comparison highlights:
- `highlight: right` (default) — right column is the recommendation
- `highlight: left` — left column is preferred
- `highlight: none` — neutral comparison

### Background enhancements:
- `background_color` on section dividers for visual separation
- `background_gradient` for mood transitions between sections
- `background_image` sparingly — max 2-3 per deck

## 7. Anti-Patterns to Flag

When reviewing presentations, flag these issues:

- **Wall of text**: Any slide with >100 words of body content
- **Template monotony**: 3+ consecutive slides with the same template
- **Missing section dividers**: Decks >8 slides without any `section` templates
- **Generic titles**: "Overview", "Details", "Summary" — titles should be specific
- **Orphaned sections**: A `section` divider followed by only 1 content slide
- **Fragment overuse**: More than 50% of slides using fragments
- **Metric overload**: More than 4 metrics on a single slide
- **Missing speaker notes**: Important slides without `notes:` field
- **Image-heavy without alt text**: `image` fields without `image_alt`
