# Create New Presentation

You are helping the user create a new presentation in this Eleventy + Reveal.js presentation system.

## Step 1: Gather Basic Information

Ask the user for:
1. **Presentation name** (required) - will be used for folder name (kebab-case)
2. **Presentation date** (optional) - format: MMYYYY (e.g., 032026 for March 2026)

Create the folder at `presentations/{name}-{date}/` or `presentations/{name}/` if no date provided.

## Step 2: Check for Outline

Ask the user if they have an `outline.md` file to supply.

### If NO outline exists:

Help them create one by gathering:

1. **Audience** - Who will be watching this presentation?
2. **Purpose** - What's the goal? (inform, persuade, teach, pitch, etc.)
3. **Speaker background** - What gives the speaker credibility on this topic?
4. **Key points** - What are the 3-5 main messages they want to convey?
5. **Desired structure** - Do they have a mental model? (problem/solution, journey, comparison, etc.)
6. **Time constraint** - How long is the presentation? (affects slide count)

Use this information to draft an `outline.md` in the presentation folder with this structure:

```markdown
# [Presentation Title]

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
- **Notes:** [what to say]
- **Visual idea:** [optional visualization concept]

#### Slide 1.2: [Slide Title]
...

### Section 2: [Section Name]
...
```

### If outline IS supplied:

Review it and confirm:
- Does it have clear sections?
- Does each slide have a key point?
- Is there enough detail to select templates?

If not, iterate with the user to fill in gaps.

## Step 3: Map Slides to Templates

Review each slide in the outline and propose a template. The available templates are in `_includes/slides/`:

| Template | Best For |
|----------|----------|
| `title` | Opening slide with logo, title, subtitle, author |
| `section` | Section dividers within the presentation |
| `agenda` | Table of contents with clickable section links |
| `content` | Standard bullet points with optional lead text |
| `center` | Single impactful statement, centered |
| `hero` | Full-bleed background image with big text |
| `metrics` | 2-4 key statistics with colored cards |
| `comparison` | Before/after or two-column comparison table |
| `columns` | Side-by-side content columns |
| `split` | 1/3 image + 2/3 content layout |
| `split-wide` | 1/3 content + 2/3 image layout |
| `quote` | Testimonial or quotation with attribution |
| `timeline` | Horizontal timeline with events |
| `funnel` | Sales/conversion funnel visualization |
| `table` | Data table with headers |
| `code` | Code snippet with syntax highlighting |
| `image-overlay` | Image with text overlay |

Read each template file's docblock comment for exact YAML structure and options.

Present your template recommendations to the user in a table:

```
| Slide | Title | Proposed Template | Rationale |
|-------|-------|-------------------|-----------|
| 1.1   | ...   | title             | Opening   |
```

Iterate until the user approves. Then update `outline.md` with a `template:` field for each slide.

## Step 4: Research & Enrichment (Optional)

If the user wants, help enrich the outline with:
- Statistics and citations
- Industry data
- Competitor analysis
- Supporting examples

Add references to the outline as you find them.

## Step 5: Create index.md

Once the outline is finalized, create `presentations/{folder}/index.md` with the full YAML frontmatter.

### Required frontmatter structure:

```yaml
---
title: [Presentation Title]
description: [Subtitle or tagline]
author: [Speaker Name]
theme: default
transition: slide
progress: true
slideNumber: true
show_footer: true
slides:
# Slide 1: [Title]
- template: [template_name]
  title: [slide title]
  # ... template-specific fields from docblock
  notes: |
    [speaker notes from outline]
---
```

Note: Do NOT include `layout: presentation` — this is set automatically by the directory data file.

### For each slide:

1. Read the template docblock in `_includes/slides/{template}.njk`
2. Map outline content to the template's required/optional fields
3. Add speaker notes from the outline
4. Add references if provided

### Image handling:

- Create an `images/` folder in the presentation directory
- If visuals are specified in outline, note them in the YAML
- If NO visuals are specified but the template needs an image (hero, split), create a placeholder:
  - Create placeholder file: `images/placeholder-{slide-number}.jpg`
  - Add a comment in the YAML: `# TODO: Replace placeholder image`
  - Note in the slide's notes what kind of image would work

## Step 6: Validate

After creating `index.md`, run the validation:

```bash
pnpm run validate
```

Fix any errors before finishing.

## Step 7: Preview

Suggest the user run:

```bash
pnpm run dev
```

Then navigate to the presentation URL to preview.

---

## Template Quick Reference

When creating slides, always read the full docblock in the template file. Here are the key patterns:

### Nested lists (content, split, split-wide templates):
```yaml
items:
  - "Regular item"
  - "Parent with children:":
      - "Child 1"
      - "Child 2"
```

### References:
```yaml
reference: "Source Name 2025"
reference_link: "https://..."
# OR for multiple:
references:
  - name: "Source 1"
    link: "https://..."
  - name: "Source 2"
    link: "https://..."
```

### Metrics colors:
`mint`, `coral`, `icy`, `amber` (or omit for default mauve)

### Comparison highlight:
`highlight: left` | `highlight: right` (default) | `highlight: none`

### Hero backgrounds:
```yaml
image: images/background.jpg
# OR
color: "#1a1a2e"
```
