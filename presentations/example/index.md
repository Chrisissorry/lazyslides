---
title: lazyslides
description: AI-Native Presentations from Structured Data
theme: default
transition: slide
progress: true
slideNumber: true

slides:

# =============================================================================
# SECTION 1: OPENING
# =============================================================================

# Slide 1: Title
- template: title
  title: lazyslides
  subtitle: "AI-Native Presentations from Structured Data"
  author: "Chris Tietz"
  notes: |
    - Welcome — this presentation is built entirely in YAML
    - Every slide you see uses a different template from the engine
    - The presentation IS the demo

# Slide 2: Agenda
- template: agenda
  title: Agenda
  sections:
    - title: "The Problem"
      slide: 3
    - title: "How It Works"
      slide: 9
    - title: "The Agentic Workflow"
      slide: 18
    - title: "What's Next"
      slide: 24
  notes: |
    - Four sections covering why, what, how, and where we're headed
    - Click any section to jump directly there
    - This slide itself uses the agenda template — clickable table of contents

# =============================================================================
# SECTION 2: THE PROBLEM
# =============================================================================

# Slide 3: Section Divider
- template: section
  title: The Problem
  subtitle: "Creating presentations is painful and slow"
  notes: |
    - Let's start with the pain that everyone in this room knows
    - We've all been there — 2am tweaking slide layouts

# Slide 4: Death by PowerPoint
- template: content
  title: "Death by PowerPoint — and AI hasn't fixed it"
  lead: "People tried ChatGPT, Gamma, and Manus. The pain just moved."
  items:
    - "<strong>Generic, bloated output</strong> — AI dumps walls of text onto slides with no visual hierarchy"
    - "<strong>All-or-nothing generation</strong> — change one slide and you regenerate the entire deck"
    - "<strong>No version control</strong> — still binary PPTX files you can't diff, merge, or review"
    - "<strong>Broken exports</strong> — Gamma to PowerPoint mangles layouts, fonts, and sizing"
    - "<strong>Black-box styling</strong> — can't set precise fonts, colors, or spacing; stuck with what the AI picks"
  notes: |
    - This reframes the problem — it's not just PowerPoint anymore
    - People moved to ChatGPT/Gamma/Manus and found new frustrations
    - Reddit is full of complaints: generic content, too much text, broken PPTX exports
    - The root cause is the same — content and design are still entangled

# Slide 5: AI Presentation Tools vs. lazyslides
- template: comparison
  title: "AI Presentation Tools vs. lazyslides"
  left_header: "ChatGPT / Gamma / Manus"
  right_header: "lazyslides"
  highlight: right
  rows:
    - left: "Generates entire deck — all or nothing"
      right: "Edit one slide without touching the rest"
      right_icon: good
    - left: "Generic content, walls of text"
      right: "You control every word in YAML"
      right_icon: good
    - left: "PPTX export breaks layouts"
      right: "Renders natively in the browser"
      right_icon: good
    - left: "Black-box styling, no fine control"
      right: "Full design system with tokens"
      right_icon: good
    - left: "No version control or diffs"
      right: "Plain text — clean git history"
      right_icon: good
  notes: |
    - The comparison template highlights the contrast
    - Right column is highlighted by default — you can flip it with highlight: left
    - Key insight: YAML is what AI models read and write natively

# Slide 6: What if slides were just data?
- template: center
  title: "What if slides were just data?"
  text: "Pure YAML in, professional slides out."
  notes: |
    - This is the core idea — treat presentations as structured data
    - The center template puts one thought front and center
    - No distractions, just the message

# Slide 7: Personal Testimony
- template: quote
  quote: "I built a 16-slide investor pitch in under an hour. The same deck would have taken a full day in PowerPoint — and it wouldn't have looked this consistent."
  author: "Chris Tietz"
  author_title: "Creator, lazyslides"
  notes: |
    - Real experience from building the daemetric pitch deck
    - The quote template adds gravitas to testimonials
    - Notice the decorative quote marks and attribution styling

# Slide 8: Zero to Slides in Minutes
- template: hero
  title: "Zero to Slides in Minutes"
  color: "#1a1a2e"
  box_title: "The Agentic Workflow"
  box_items:
    - "<strong>1. Tell your topic</strong> — describe what you want to present"
    - "<strong>2. AI generates YAML</strong> — Claude maps content to templates"
    - "<strong>3. Engine renders</strong> — Eleventy builds production-ready slides"
  notes: |
    - The hero template creates dramatic, full-bleed impact
    - Using color fallback since no background image needed
    - The callout box provides structured detail over the dark background

# =============================================================================
# SECTION 3: HOW IT WORKS
# =============================================================================

# Slide 9: Section Divider
- template: section
  title: How It Works
  subtitle: "Architecture and template system"
  notes: |
    - Now let's look under the hood
    - Three layers that keep concerns cleanly separated

# Slide 10: Engine at a Glance
- template: metrics
  title: Engine at a Glance
  metrics:
    - value: "17"
      label: "Templates"
      context: "From title cards to funnels"
      color: mint
    - value: "0"
      label: "Lines of HTML"
      context: "Authors write pure YAML"
      color: coral
    - value: "960×540"
      label: "Canvas"
      context: "16:9 ratio, auto-scaled"
      color: icy
    - value: "<1 min"
      label: "Build Time"
      context: "Validate + Eleventy + Reveal.js"
      color: amber
  notes: |
    - The metrics template auto-detects 2, 3, or 4 cards
    - Each card can have its own color: mint, coral, icy, amber, or default mauve
    - The zero HTML stat is the key selling point — pure YAML authoring

# Slide 11: What a Slide Looks Like
- template: code
  title: What a Slide Looks Like
  language: yaml
  code: "slides:\n  - template: metrics\n    title: Engine at a Glance\n    metrics:\n      - value: \"17\"\n        label: Templates\n        color: mint\n      - value: \"0\"\n        label: Lines of HTML\n        color: coral"
  caption: "YAML that produces a metrics slide — no HTML needed"
  notes: |
    - This is the aha moment — the previous slide is just this YAML
    - The code template provides syntax highlighting for any language
    - Meta: this slide shows the code that makes the metrics slide work

# Slide 12: Three Layers
- template: content
  title: "Architecture: Three Layers"
  lead: "Clean separation of content, templates, and styling"
  items:
    - "<strong>Content layer</strong> — pure YAML in presentations/ folders":
        - "One index.md per presentation"
        - "No HTML, no Markdown body — just frontmatter"
    - "<strong>Template layer</strong> — 17 Nunjucks includes in _includes/slides/":
        - "Each template has a docblock with YAML schema"
        - "Nunjucks templating maps YAML fields to HTML"
    - "<strong>Style layer</strong> — Tailwind CSS + theme files":
        - "Design tokens in src/styles.css @theme block"
        - "One CSS file per brand theme"
  notes: |
    - This architecture means you can change any layer independently
    - Content authors never see HTML — templates never touch styling
    - Nested lists use the map syntax — this slide demonstrates it

# Slide 13: Template Reference
- template: table
  title: Template Reference
  columns:
    - Template
    - Best For
    - Key Fields
  rows:
    - ["title", "Opening and closing slides", "subtitle, author, logo"]
    - ["section", "Chapter dividers", "subtitle"]
    - ["agenda", "Clickable table of contents", "sections (title + slide)"]
    - ["content", "Bullet points, main content", "items, lead, ordered_items"]
    - ["center", "Single statement or image", "text, image"]
    - ["hero", "Full-bleed dramatic impact", "image/color, box_items"]
    - ["metrics", "2-4 key statistics", "metrics (value, label, color)"]
    - ["comparison", "Before/after, A vs B", "rows, highlight"]
  reference: "8 of 17 templates shown — continued on next slide"
  notes: |
    - The table template supports up to 6 columns and 8 rows
    - Every template you've seen so far is listed here
    - This is the table template in action — auto-styled with alternating rows

# Slide 14: Templates (continued)
- template: columns
  title: "Templates (continued)"
  left_title: "Layout Templates"
  left_items:
    - "<strong>columns</strong> — side-by-side content"
    - "<strong>split</strong> — 1/3 image + 2/3 content"
    - "<strong>split-wide</strong> — 1/3 content + 2/3 image"
    - "<strong>code</strong> — syntax-highlighted snippets"
    - "<strong>table</strong> — data with headers"
  right_title: "Visualization Templates"
  right_items:
    - "<strong>timeline</strong> — horizontal event sequence"
    - "<strong>funnel</strong> — progressive narrowing stages"
    - "<strong>quote</strong> — testimonial with attribution"
    - "<strong>image-overlay</strong> — background image + text box"
  notes: |
    - The columns template splits content into two equal halves
    - Between the table on the previous slide and this one, all 17 templates are listed
    - Layout vs visualization is a useful mental model for template selection

# Slide 15: Theming System
- template: split
  title: Theming System
  image: images/theming.jpg
  image_alt: "Abstract landscape representing visual themes"
  items:
    - "<strong>One CSS file per brand</strong> — drop in a theme, everything adapts"
    - "<strong>Themeable properties:</strong>":
        - "Fonts (heading + body)"
        - "Color palette (primary + semantic)"
        - "Logo and footer branding"
        - "Background patterns"
    - "<strong>Design tokens</strong> — all spacing, typography, and colors defined in @theme"
    - "<strong>Default theme</strong> — neutral starter for new projects"
  notes: |
    - The split template shows 1/3 image + 2/3 content
    - Works without an image too — the content expands
    - Theming is just CSS custom properties — no template changes needed

# Slide 16: Presenter Features
- template: split-wide
  title: Presenter Features
  image: images/dashboard-example.png
  image_alt: "Example presentation rendered by the engine"
  items:
    - "<strong>Speaker notes</strong> — press S for presenter view with notes, timer, and next-slide preview"
    - "<strong>PDF export</strong> — one-command export via Puppeteer and DeckTape at 1920x1080"
    - "<strong>Image lightbox</strong> — click any image to view fullscreen via GLightbox"
    - "<strong>Keyboard navigation</strong> — arrow keys, Escape for overview, F for fullscreen"
  notes: |
    - The split-wide template is the inverse of split — 1/3 content, 2/3 image
    - Press S right now to see these speaker notes in action
    - PDF export runs bin/export-pdf.sh — handles validation, build, and export

# Slide 17: Why YAML + AI Works
- template: content
  title: Why YAML + AI Works
  items:
    - "<strong>Structured data AI reads/writes natively</strong> — no pixel coordinates, no XML namespaces"
    - "<strong>Clean git diffs</strong> — review slide changes line by line in pull requests"
    - "<strong>Atomic per-slide edits</strong> — change one slide without touching the rest"
    - "<strong>Validation catches errors before the audience</strong> — schema checks run on every build"
    - "<strong>Composable</strong> — copy slides between decks, merge presentations, build libraries"
  notes: |
    - This is the philosophical core of the project
    - AI models produce better YAML than they produce PowerPoint XML
    - Git diffs mean you can code-review presentations like code

# =============================================================================
# SECTION 4: THE AGENTIC WORKFLOW
# =============================================================================

# Slide 18: Section Divider
- template: section
  title: The Agentic Workflow
  subtitle: "Claude Code as presentation co-pilot"
  notes: |
    - This section covers the AI-powered creation workflow
    - Claude Code has full context about the engine via CLAUDE.md

# Slide 19: From Topic to Slides
- template: timeline
  title: From Topic to Slides
  events:
    - date: "Step 1"
      title: "Research"
      text: "Gather data, quotes, and structure"
    - date: "Step 2"
      title: "Outline"
      text: "Define sections, key messages, slide count"
    - date: "Step 3"
      title: "Template Mapping"
      text: "Match each slide to the right template"
    - date: "Step 4"
      title: "YAML Generation"
      text: "AI writes the full index.md"
    - date: "Step 5"
      title: "Validate & Build"
      text: "Schema check, Eleventy build, preview"
  notes: |
    - The timeline template shows horizontal progression with alternating cards
    - Each step can be done by the AI agent with human review
    - The whole flow typically takes under 10 minutes for a 20-slide deck

# Slide 20: Claude Code Integration
- template: content
  title: Claude Code Integration
  lead: "CLAUDE.md gives the AI full context about the engine"
  items:
    - "<strong>/new-presentation</strong> — slash command that walks through the full creation workflow"
    - "<strong>CLAUDE.md context</strong> — architecture, templates, YAML syntax, validation rules"
    - "<strong>Pre-approved build commands</strong> — pnpm dev runs without confirmation"
    - "Planned slash commands:":
        - "/add-slide — insert a new slide at any position"
        - "/retheme — switch a presentation's visual theme"
        - "/export-pdf — generate PDF from the command line"
  notes: |
    - Claude Code reads CLAUDE.md automatically for project context
    - The new-presentation command follows a 7-step agentic workflow
    - Slash commands give natural-language access to engine operations

# Slide 21: Idea to Delivered Deck
- template: funnel
  title: Idea to Delivered Deck
  stages:
    - label: "Topic"
      text: "A rough idea or brief from the speaker"
    - label: "Research"
      text: "Data, quotes, competitive landscape"
    - label: "Outline"
      text: "Sections, slide titles, key messages"
    - label: "YAML Slides"
      text: "Template-mapped, validated presentation"
    - label: "Polished Deck"
      text: "Themed, reviewed, ready to present"
  notes: |
    - The funnel template shows progressive narrowing from broad to specific
    - Each stage reduces ambiguity — from vague topic to pixel-perfect slides
    - Best with 3-7 stages for visual clarity

# Slide 22: Build Pipeline
- template: image-overlay
  image: images/pipeline.jpg
  position: bottom-left
  title: Build Pipeline
  items:
    - "validate-presentations.js checks YAML schema"
    - "Eleventy compiles YAML to Reveal.js HTML"
    - "Tailwind processes design tokens"
    - "Reveal.js renders interactive slides"
  notes: |
    - The image-overlay template places a text box over a background image
    - Four positions available: top-left, top-right, bottom-left, bottom-right
    - The arrow image reinforces the directional flow of the pipeline

# Slide 23: Open Core Model
- template: columns
  title: Open Core Model
  left_title: "Free & Open Source"
  left_items:
    - "Engine and all 17 templates"
    - "Default starter theme"
    - "Claude Code integration"
    - "PDF export"
    - "MIT License"
  right_title: "Commercial Potential"
  right_items:
    - "Premium brand themes"
    - "Hosted presentation service"
    - "Team collaboration features"
    - "Priority support"
    - "Custom template development"
  notes: |
    - Open core means the engine is always free
    - Revenue comes from themes, hosting, and services
    - MIT license means no restrictions on commercial use

# =============================================================================
# SECTION 5: WHAT'S NEXT
# =============================================================================

# Slide 24: Section Divider
- template: section
  title: "What's Next"
  subtitle: "Open source roadmap and vision"
  notes: |
    - Final section — where we're headed
    - The engine is functional today, but the roadmap is ambitious

# Slide 25: License Landscape
- template: table
  title: License Landscape
  columns:
    - Dependency
    - License
    - Implication
  rows:
    - ["Eleventy 3.x", "MIT", "No restrictions"]
    - ["Reveal.js 5.1.0", "MIT", "No restrictions"]
    - ["Tailwind CSS 4.x", "MIT", "No restrictions"]
    - ["GLightbox 3.3.1", "MIT", "No restrictions"]
    - ["highlight.js", "BSD 3-Clause", "Attribution required"]
    - ["Puppeteer / DeckTape", "Apache 2.0 / MIT", "No restrictions"]
    - ["Google Fonts", "OFL", "Free for any use"]
  reference: "All permissive — MIT recommended for the project"
  notes: |
    - Every single dependency uses a permissive license
    - No GPL, no copyleft — MIT is the clear choice
    - The table template auto-styles with alternating row colors

# Slide 26: Distribution Roadmap
- template: content
  title: Distribution Roadmap
  ordered_items:
    - "<strong>GitHub template repo</strong> — click 'Use this template' to get started (fastest path)"
    - "<strong>Upstream update guide</strong> — documentation for pulling engine updates into forks"
    - "<strong>npm package</strong> — install via package.json, cleanest separation of engine and content"
    - "<strong>Full CLI tool</strong> — lazyslides new, lazyslides build, lazyslides export"
  notes: |
    - Start simple, evolve the distribution model
    - GitHub template repo is the MVP — works today
    - npm package is the long-term goal for clean engine/content separation

# Slide 27: Feature Roadmap
- template: content
  title: Feature Roadmap
  lead: "Web-based integrations and export formats"
  items:
    - "<strong>Unsplash integration</strong> — search and insert background images directly from YAML"
    - "<strong>Slido / Mentimeter integration</strong> — live polls and Q&A embedded in slides without switching tools"
    - "<strong>PPTX export</strong> — native PowerPoint file generation for teams that require it"
    - "<strong>Google Slides export</strong> — direct export to Google Workspace for collaboration"
  notes: |
    - These features extend the engine beyond standalone presentations
    - Unsplash solves the "I need a background image" problem
    - PPTX and Google Slides export meet enterprise requirements

# Slide 28: Why Open Source
- template: metrics
  title: Why Open Source
  metrics:
    - value: "100%"
      label: "Permissive"
      context: "Every dependency, MIT compatible"
      color: mint
    - value: "$0"
      label: "Cost to Start"
      context: "Free forever for individual use"
      color: coral
    - value: "5 min"
      label: "Topic to Slides"
      context: "With the agentic workflow"
      color: icy
    - value: "17"
      label: "Templates"
      context: "Reusable across every deck"
      color: amber
  notes: |
    - These four numbers tell the story
    - Open source means the community can contribute templates
    - The 5-minute claim is real — this deck was generated by AI

# Slide 29: Closing
- template: title
  title: lazyslides
  subtitle: "YAML in. Slides out."
  author: "Chris Tietz — github.com/chris-tietz/lazyslides"
  logo: false
  notes: |
    - Thank you for watching
    - Every slide in this deck was authored in pure YAML
    - The presentation is the proof — 29 slides, 17 templates, zero HTML
---
