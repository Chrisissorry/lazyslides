# Add Template

You are helping the user create a custom slide template for their LazySlides project.

## Step 1: Gather Requirements

Ask the user:
- What should the template do? (purpose, layout idea)
- What content fields does it need? (titles, text, images, lists, etc.)
- Any specific layout or styling requirements?

## Step 2: Choose a Name

Help the user pick a kebab-case name for the template (e.g. `icon-grid`, `two-images`, `photo-grid`). The name must not conflict with the 17 built-in templates: `title`, `section`, `content`, `center`, `hero`, `metrics`, `comparison`, `columns`, `quote`, `image-overlay`, `code`, `timeline`, `funnel`, `split`, `split-wide`, `table`, `agenda`.

## Step 3: Pick a Starting Point

Read the existing templates in `_includes/slides/` and suggest the closest built-in template as a base to adapt from. Show the user the docblock and structure of the suggested template. They can also choose to start from scratch.

## Step 4: Create the Template File

Generate `_includes/slides/<name>.njk` following the standard pattern:

```nunjucks
{#
  TEMPLATE: <name> — <short description>

  Fields:
    - field_name* — description (required)
    - field_name — description (optional)

  Usage:
    - template: <name>
      field_name: "value"
#}

<section class="slide-<name>">
  <div class="slide-body">
    {% if slide.title %}
    <div class="slide-header">
      <h2>{{ slide.title }}</h2>
    </div>
    {% endif %}

    <div class="slide-content">
      {# Template-specific content here #}
    </div>
  </div>

  {% if slide.notes %}
  <aside class="notes">{{ slide.notes }}</aside>
  {% endif %}

  {% include "slides/_footer.njk" %}
</section>
```

Key conventions to follow:
- Wrap everything in `<section class="slide-<name>">`
- Use `slide-body` > `slide-header` + `slide-content` structure
- Access slide data via `slide.fieldName`
- Include speaker notes block and footer include
- Use existing CSS utility classes from the design system where possible

## Step 5: Add CSS

If the template needs custom styles, add them to `src/styles.css`. Place them after the existing slide template styles. Use the `.slide-<name>` class as the scope. Follow the existing spacing, font, and color conventions from the design system.

## Step 6: Test It

1. Add a test slide to an existing presentation using `template: <name>` with sample data
2. Run `pnpm run validate` — the validator will warn about an unknown template name (this is expected for custom templates)
3. Run `pnpm run dev` to preview the result in the browser
4. Iterate on the template and styles until it looks right
