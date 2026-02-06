---
title: "lazyslides"
author: "Chrisissorry"
date: 2026-02-05
status: complete
---

# Presentation Outline

## Metadata
- **Purpose**: Introduce lazyslides as an AI-native, YAML-driven presentation engine. The presentation *is* the demo — every template appears naturally as part of the narrative.
- **Audience**: Developers, technical founders, and presentation-heavy professionals
- **Duration**: ~20 minutes
- **Format**: Product showcase / meta-presentation (the deck demonstrates itself)

## Key Messages
1. **Presentations are broken** — manual layout, proprietary formats, and designer-dependency waste hours
2. **YAML + templates = separation of concerns** — content authors focus on content, the engine handles design
3. **AI-native by design** — structured YAML is what LLMs read and write best, enabling agentic workflows
4. **17 templates cover 95% of slides** — from title cards to funnels, no HTML required
5. **100% open source** — MIT-licensed stack, zero vendor lock-in, free to start

## Slides

### Section 1: Opening
- [x] **Slide 1: Title**
  - Type: `title`
  - Content: lazyslides branding, subtitle "AI-Native Presentations from Structured Data", author Chrisissorry

- [x] **Slide 2: Agenda**
  - Type: `agenda`
  - Content: Four clickable sections — The Problem, How It Works, The Agentic Workflow, What's Next

### Section 2: The Problem
- [x] **Slide 3: Section Divider**
  - Type: `section`
  - Content: "The Problem" / "Creating presentations is painful and slow"

- [x] **Slide 4: Death by PowerPoint**
  - Type: `content`
  - Points: Manual layout, no version control, proprietary formats, design inconsistency, content+styling entangled

- [x] **Slide 5: Traditional vs. YAML-Driven**
  - Type: `comparison`
  - Left: Traditional (manual, binary, designer-dependent, AI-hostile)
  - Right: YAML-driven (templates, plain text, design system, AI-native)

- [x] **Slide 6: What if slides were just data?**
  - Type: `center`
  - Content: Centered provocative question

- [x] **Slide 7: Personal Testimony**
  - Type: `quote`
  - Quote from Chris about building the daemetric pitch in under an hour vs a full day in PowerPoint

- [x] **Slide 8: Zero to Slides in Minutes**
  - Type: `hero`
  - Dark background, callout box with 3-step agentic workflow

### Section 3: The Solution — How It Works
- [x] **Slide 9: Section Divider**
  - Type: `section`
  - Content: "How It Works" / "Architecture and template system"

- [x] **Slide 10: Engine at a Glance**
  - Type: `metrics`
  - Cards: 17 templates / 0 lines of HTML / 960x540 canvas / <1min build

- [x] **Slide 11: What a Slide Looks Like**
  - Type: `code`
  - YAML example of a metrics slide — the "aha" moment

- [x] **Slide 12: Three Layers**
  - Type: `content`
  - Architecture: Content (YAML) -> Template (Nunjucks) -> Style (Tailwind + theme)

- [x] **Slide 13: Template Reference**
  - Type: `table`
  - First 8 templates with "Best For" and "Key Fields" columns

- [x] **Slide 14: Templates (continued)**
  - Type: `columns`
  - Left: Layout templates / Right: Visualization templates

- [x] **Slide 15: Theming System**
  - Type: `split`
  - One CSS file per brand, themeable properties

- [x] **Slide 16: Presenter Features**
  - Type: `split-wide`
  - Speaker notes, PDF export, image lightbox, keyboard nav

- [x] **Slide 17: Why YAML + AI Works**
  - Type: `content`
  - Structured data, clean diffs, atomic edits, validation

### Section 4: The Agentic Workflow
- [x] **Slide 18: Section Divider**
  - Type: `section`
  - Content: "The Agentic Workflow" / "Claude Code as presentation co-pilot"

- [x] **Slide 19: From Topic to Slides**
  - Type: `timeline`
  - 5 events: Research -> Outline -> Template Mapping -> YAML Generation -> Validate & Build

- [x] **Slide 20: Claude Code Integration**
  - Type: `content`
  - Slash commands, CLAUDE.md context, pre-approved build commands

- [x] **Slide 21: Idea to Delivered Deck**
  - Type: `funnel`
  - 5 stages: Topic -> Research -> Outline -> YAML Slides -> Polished Deck

- [x] **Slide 22: Build Pipeline**
  - Type: `image-overlay`
  - Text overlay: validation -> Eleventy build -> Reveal.js render

- [x] **Slide 23: Open Core Model**
  - Type: `columns`
  - Left: Free/OSS / Right: Commercial potential

### Section 5: What's Next
- [x] **Slide 24: Section Divider**
  - Type: `section`
  - Content: "What's Next" / "Open source roadmap and vision"

- [x] **Slide 25: License Landscape**
  - Type: `table`
  - Dependency/License/Implication for the Eleventy-based stack

- [x] **Slide 26: Distribution Roadmap**
  - Type: `content`
  - Ordered: GitHub template -> upstream guide -> npm package -> full CLI

- [x] **Slide 27: Feature Roadmap**
  - Type: `content`
  - Unsplash, Slido/Mentimeter, PPTX export, Google Slides export

- [x] **Slide 28: Why Open Source**
  - Type: `metrics`
  - Cards: 100% permissive / $0 cost / 5 min / 17 templates

- [x] **Slide 29: Closing**
  - Type: `title`
  - lazyslides closing, contact info, logo: false

## Template Coverage
All 17 templates used: title(1,29), agenda(2), section(3,9,18,24), content(4,12,17,20,26,27),
center(6), comparison(5), hero(8), quote(7), metrics(10,28), code(11), table(13,25),
columns(14,23), split(15), split-wide(16), timeline(19), funnel(21), image-overlay(22)
