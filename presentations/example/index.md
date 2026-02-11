---
title: LazySlides
description: A Template Showcase
theme: default
transition: slide
progress: true
slideNumber: true

slides:

# =============================================================================
# OPENING
# =============================================================================

# Slide 1: Title
- template: title
  title: LazySlides
  subtitle: "A Template Showcase"
  author: "Built with LazySlides"
  notes: |
    Welcome to the LazySlides capabilities showcase.
    Every slide in this deck uses a different template — and each slide's content
    explains the template it's built with.
    The presentation IS the documentation.

# Slide 2: Press S for Speaker Notes
- template: center
  title: "Press S for Speaker Notes"
  text: "Every slide has authoring tips in the notes. This is the center template — one focused idea, no distractions."
  background_color: "#f0f9ff"
  notes: |
    You're looking at the center template right now.
    It puts a single statement front and center — no bullets, no columns, just the message.
    Use it for pivotal moments, questions, or impactful statements.
    Press Escape for the slide overview grid.

# Slide 3: What You Will See
- template: agenda
  title: "What You Will See"
  auto_generate: true
  notes: |
    The agenda template with auto_generate: true builds this list automatically
    from every section slide in the deck. Click any section to jump directly there.
    You can also define sections manually with a sections array.

# =============================================================================
# SECTION 1: FOUNDATIONS
# =============================================================================

# Slide 4: Section — Foundations
- template: section
  title: Foundations
  subtitle: "The building blocks of every deck"
  transition: fade
  background_gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)"
  notes: |
    Section slides divide your deck into chapters.
    They hide the footer by default to create a clean break.
    Add transition: fade for a smooth entry, and a gradient for visual polish.

# Slide 5: The Content Template
- template: content
  title: The Content Template
  lead: "Your workhorse for structured information"
  fragment: fade-up
  items:
    - "The <strong>lead</strong> field adds an intro paragraph above the bullets"
    - "Use <strong>items</strong> for bullet lists or <strong>ordered_items</strong> for numbered lists"
    - "Nested lists use map syntax:":
        - "Parent string ends with a colon"
        - "Children are indented underneath"
    - "Add <strong>fragment: fade-up</strong> to reveal items one by one"
    - "The <strong>text</strong> field adds a standalone paragraph without bullets"
  notes: |
    The content template is the most versatile — use it for any structured information.
    This slide demonstrates lead text, a nested list, and fragment animation.
    Keep bullets to 3-5 per slide for readability.

# Slide 6: The Metrics Template
- template: metrics
  title: The Metrics Template
  fragment: fade-in
  metrics:
    - value: "17"
      label: "Templates"
      context: "Slide types in the engine"
      color: mint
    - value: "6"
      label: "Themes"
      context: "Visual identities included"
      color: coral
    - value: "960×540"
      label: "Canvas"
      context: "16:9 ratio, auto-scaled"
      color: icy
    - value: "18"
      label: "Fragment Effects"
      context: "Animation options per item"
      color: amber
  notes: |
    The metrics template displays 2-4 statistic cards in a row.
    Each card takes value, label, and optional context text.
    Colors: mint, coral, icy, amber, or default mauve.
    These are real LazySlides engine stats.

# Slide 7: The Table Template
- template: table
  title: The Table Template
  columns:
    - Field
    - Type
    - Purpose
  rows:
    - ["columns", "Array of strings", "Defines the column headers you see above"]
    - ["rows", "Array of arrays", "Each inner array is one row of cell values"]
    - ["title", "String", "The slide heading — required on every table slide"]
    - ["reference", "String", "Attribution line below the table"]
  reference: "This table describes its own fields"
  notes: |
    The table template renders data with styled headers and alternating row shading.
    Each row is a simple array of strings — no complex objects needed.
    Best for 3-6 columns and up to 8 rows. Keep cell text short.

# Slide 8: Quote
- template: quote
  transition: fade
  quote: "The best slides feel effortless. That only happens when the tooling disappears and the content speaks for itself."
  author: "Design Principle"
  author_title: "LazySlides Philosophy"
  notes: |
    The quote template adds decorative quotation marks and styled attribution.
    It needs no title — the quote IS the content.
    Use it for testimonials, design principles, or memorable statements.
    The fade transition gives it a calm, considered entrance.

# =============================================================================
# SECTION 2: LAYOUTS
# =============================================================================

# Slide 9: Section — Layouts
- template: section
  title: Layouts
  subtitle: "Templates that arrange content spatially"
  transition: fade
  background_gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)"
  notes: |
    This section covers templates that divide the slide into distinct spatial zones.
    Split, split-wide, columns, and comparison each divide space differently.
    Choosing the right layout makes content easier to scan.

# Slide 10: The Split Template
- template: split
  title: The Split Template
  fragment: fade-up
  image: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=640&h=1080&fit=crop&q=80&auto=format"
  image_alt: "Colorful paint wall in shallow focus"
  reference: "Photo by Robert Katzki on Unsplash"
  reference_link: "https://unsplash.com/@ro_ka?utm_source=lazyslides&utm_medium=referral"
  items:
    - "1/3 image panel + 2/3 content panel"
    - "Image fills its panel with <strong>object-fit: cover</strong> — edges may crop"
    - "Click any image to view fullscreen via lightbox"
    - "Supports nested lists, fragments, and references"
  notes: |
    Split gives you a portrait-oriented image alongside your content.
    Best with images at least 640×1080 (2x for retina).
    The image is cropped from center, so keep the subject centered.

# Slide 11: The Split-Wide Template
- template: split-wide
  title: The Split-Wide Template
  image: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=1280&h=1080&fit=crop&q=80&auto=format"
  image_alt: "Speaker presenting on stage at a conference"
  reference: "Photo by Product School on Unsplash"
  reference_link: "https://unsplash.com/@productschool?utm_source=lazyslides&utm_medium=referral"
  items:
    - "Inverted layout: 1/3 content + 2/3 image"
    - "Best for landscape photos and screenshots"
    - "Recommended image size: 1280×1080 or larger"
    - "Same fields as split — title, text, items, image"
  notes: |
    Split-wide is the mirror image of split — the image takes the larger panel.
    Great for screenshots, dashboards, or landscape photography.
    The content panel sits on the left with a narrower width.

# Slide 12: The Columns Template
- template: columns
  title: The Columns Template
  fragment: fade-in
  left_title: "When to Use"
  left_items:
    - "Two equal content panels side by side"
    - "Each column has its own title, text, and items"
    - "Great for contrasting or parallel ideas"
  right_title: "Key Details"
  right_items:
    - "Both columns animate together with fragment"
    - "Text-only — no images in this template"
    - "Keep content balanced between sides"
  notes: |
    The columns template creates two equal halves — perfect for comparisons,
    pros/cons, or any two parallel topics. Each side gets its own title and bullets.
    Keep the content roughly equal in length for visual balance.

# Slide 13: The Comparison Template
- template: comparison
  title: The Comparison Template
  fragment: fade-up
  left_header: "Columns Template"
  right_header: "Comparison Template"
  highlight: right
  rows:
    - left: "Equal halves layout"
      right: "Row-by-row table layout"
    - left: "Free-form content per side"
      right: "Structured left/right cells"
    - left: "No icons"
      right: "Good/bad icon marks"
      right_icon: true
    - left: "Best for parallel topics"
      right: "Best for evaluations"
      right_icon: true
  notes: |
    The comparison template structures content as rows with left/right cells.
    Use highlight: left or right to emphasize the winning column.
    Add left_icon/right_icon: true for checkmark indicators.
    This slide compares itself to the columns template — meta!

# =============================================================================
# SECTION 3: VISUAL IMPACT
# =============================================================================

# Slide 14: Section — Visual Impact
- template: section
  title: Visual Impact
  subtitle: "Templates that command attention"
  transition: fade
  background_gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)"
  notes: |
    These templates use bold visuals — full-bleed images, gradients, and overlays.
    Use them for dramatic moments, chapter openers, or hero statements.
    A little goes a long way — mix with quieter slides for contrast.

# Slide 15: The Hero Template
- template: hero
  title: The Hero Template
  transition: zoom
  background_gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)"
  box_title: "Full-Bleed Impact"
  box_items:
    - "Dark overlay with a bold headline"
    - "Optional text box for structured details"
    - "Use <strong>image</strong> for photos or <strong>background_gradient</strong> for color"
  notes: |
    The hero template fills the entire viewport with an image or gradient.
    The box overlay provides readable content over dark backgrounds.
    Use transition: zoom sparingly — it's dramatic but can feel heavy.
    Limit to 1-2 zoom transitions per deck.

# Slide 16: The Image-Overlay Template
- template: image-overlay
  image: "https://images.unsplash.com/photo-1576400883215-7083980b6193?w=1920&h=1080&fit=crop&q=80&auto=format"
  position: bottom-left
  title: The Image-Overlay Template
  reference: "Photo by Cristiano Firmani on Unsplash"
  reference_link: "https://unsplash.com/@cristianofirmani?utm_source=lazyslides&utm_medium=referral"
  items:
    - "Background image fills the viewport"
    - "Text box can be placed in four positions"
    - "Supports title, text, and items in the overlay"
  notes: |
    Image-overlay places a semi-transparent text box over a full-bleed photo.
    Set position to top-left, top-right, bottom-left, or bottom-right.
    The image should be at least 1920×1080 for sharp results.

# Slide 17: Center with Backgrounds
- template: center
  title: "Center with Backgrounds"
  text: "Add background_color or background_gradient to any template for visual variety. This slide demonstrates both the center template and background enhancements."
  transition: fade
  background_gradient: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)"
  notes: |
    Background properties work on every template, not just hero and image-overlay.
    Use background_color for solid fills, background_gradient for gradients,
    or background_image to put any photo behind any slide type.
    Keep gradients subtle on text-heavy slides for readability.

# Slide 18: The Code Template
- template: code
  title: The Code Template
  language: yaml
  code: "- template: code\n  title: The Code Template\n  language: yaml\n  code: \"...\"\n  caption: \"This slide's own YAML\""
  caption: "This slide's own YAML — a self-referential code block"
  notes: |
    The code template provides syntax highlighting for any language.
    Set language to yaml, javascript, python, bash, or any Highlight.js language.
    The caption field adds a description below the code block.
    This slide shows its own YAML — it's code all the way down.

# =============================================================================
# SECTION 4: FLOW & MOTION
# =============================================================================

# Slide 19: Section — Flow & Motion
- template: section
  title: "Flow & Motion"
  subtitle: "Templates that show process and progression"
  transition: fade
  background_gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)"
  notes: |
    These templates visualize sequences, processes, and progressive narrowing.
    Timeline for events, funnel for stages, and auto-animate for morphing code.

# Slide 20: The Timeline Template
- template: timeline
  title: The Timeline Template
  fragment: fade-in
  events:
    - date: "Step 1"
      title: "Define"
      text: "Set date, title, and text for each event"
    - date: "Step 2"
      title: "Populate"
      text: "Add 3-5 events for visual balance"
    - date: "Step 3"
      title: "Animate"
      text: "Optional fragment for progressive reveal"
    - date: "Step 4"
      title: "Present"
      text: "Cards alternate above and below the line"
  notes: |
    The timeline template arranges events horizontally with alternating card positions.
    Each event has a date badge, title, and description text.
    Best with 3-5 events — more than that gets crowded.

# Slide 21: The Funnel Template
- template: funnel
  title: The Funnel Template
  fragment: fade-up
  stages:
    - label: "YAML Input"
      text: "Author writes structured slide data"
    - label: "Validation"
      text: "Schema checks catch errors before build"
    - label: "Template Engine"
      text: "Nunjucks maps fields to HTML"
    - label: "Reveal.js Output"
      text: "Interactive, themed presentation"
  notes: |
    The funnel template shows progressive narrowing from broad to specific.
    Each stage gets a label and optional description text.
    This slide traces the LazySlides build pipeline as its example content.
    Best with 3-5 stages for visual clarity.

# Slide 22: Auto-Animate in Action (Step 1)
- template: code
  title: "Auto-Animate in Action"
  auto_animate: true
  language: yaml
  code: "- template: content\n  title: My Slide"
  caption: "Start simple — auto-animate morphs matching elements"
  notes: |
    Auto-animate is a Reveal.js feature that morphs matching DOM elements
    between consecutive slides. Both slides need auto_animate: true.
    Watch the code block expand smoothly on the next slide.

# Slide 23: Auto-Animate in Action (Step 2)
- template: code
  title: "Auto-Animate in Action"
  auto_animate: true
  language: yaml
  code: "- template: content\n  title: My Slide\n  lead: \"An introductory paragraph\"\n  fragment: fade-up\n  items:\n    - \"First insight\"\n    - \"Second insight\""
  caption: "Fields added — the code block expanded with a smooth morph"
  notes: |
    The title stayed still while the code block grew — that's auto-animate.
    Any matching elements (same tag, same position) morph automatically.
    Use it for progressive code reveals, expanding diagrams, or step-by-step builds.

# =============================================================================
# CLOSING
# =============================================================================

# Slide 24: Tips for Great Decks
- template: content
  title: Tips for Great Decks
  lead: "Design principles baked into the engine"
  fragment: fade-up
  items:
    - "One idea per slide — if you need a second point, make a second slide"
    - "Add section dividers every 4-7 slides to create rhythm and breathing room"
    - "Mix template types — alternate between text, visual, and data slides"
    - "Use fragments on fewer than half your slides — too much animation fatigues the audience"
    - "Write speaker notes on every slide — they help you rehearse and help others present your deck"
  notes: |
    These guidelines are baked into the LazySlides design skill.
    The engine validates structure, but good content still requires human judgment.
    When in doubt, simplify — fewer words, more white space, clearer hierarchy.

# Slide 25: Closing
- template: title
  title: LazySlides
  subtitle: "YAML In. Slides Out."
  transition: fade
  transition_speed: slow
  author: "github.com/Chrisissorry/lazyslides"
  logo: false
  notes: |
    Thank you for exploring the showcase.
    Every slide was authored in pure YAML — no HTML, no drag-and-drop.
    25 slides, 17 templates, 5 sections, zero lines of HTML.
---
