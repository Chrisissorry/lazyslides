# Add Slide

You are helping the user add a new slide to an existing presentation.

## Step 1: Identify Target Presentation

List the presentation folders in `presentations/` (excluding `_template`). Ask the user which presentation they want to add a slide to. If there's only one, confirm it.

## Step 2: Show Current Slides

Read the presentation's `index.md` and display a numbered list of existing slides:

```
1. [title] Opening Slide
2. [content] Key Points
3. [metrics] Results
```

Ask the user where to insert the new slide (after which slide number, or at the end).

## Step 3: Choose Template

Ask the user which template to use. Show this reference:

| Template | Best For |
|----------|----------|
| `title` | Opening slide with logo, title, subtitle, author |
| `section` | Section divider for organizing chapters |
| `content` | Standard bullet points with optional lead text |
| `center` | Single statement or image, centered |
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

## Step 4: Gather Content

Based on the chosen template, read the docblock in `_includes/slides/{template}.njk` for the exact field reference. Ask the user for:
- Required fields (marked with * in the docblock)
- Optional fields they want to include
- Speaker notes (optional)

## Step 5: Generate and Insert

1. Generate the YAML for the new slide
2. Insert it at the correct position in the `slides:` array
3. Run `pnpm run renumber` to update slide comments
4. Run `pnpm run validate` to verify

## Step 6: Preview

Suggest the user run `pnpm run dev` to preview the result.
