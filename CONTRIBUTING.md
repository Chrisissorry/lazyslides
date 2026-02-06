# Contributing to LazySlides

## Adding a New Slide Template

1. Create `_includes/slides/your-template.njk`
2. Add a docblock comment at the top describing the template, required/optional fields, and an example
3. Add the template name to `VALID_TEMPLATES` in `lib/validate.js`
4. Add CSS styles in `src/styles.css` under a new section
5. Add an example slide to `presentations/example/index.md`
6. Update the template list in `README.md`

### Template structure

```nunjucks
{# TEMPLATE: your-template — Short description. #}
<section class="slide-your-template">
  <div class="slide-body">
    <div class="slide-header">
      <h2>{{ slide.title }}</h2>
    </div>
    {# Your template content here #}
    {% if slide.notes %}<aside class="notes">{{ slide.notes }}</aside>{% endif %}
  </div>
  {% set reference = slide.reference %}
  {% set reference_link = slide.reference_link %}
  {% set references = slide.references %}
  {% include "slides/footer.njk" %}
</section>
```

## Creating a Theme

Themes are CSS files that override the design tokens (primary color scale, fonts, footer branding). To create a custom theme:

1. Create a new CSS file in your project (e.g. `themes/your-theme.css`)
2. Override the CSS custom properties from `src/styles.css`
3. Reference in presentations with `theme: your-theme`

## Development

```bash
pnpm install
pnpm run dev      # Start dev server
pnpm run validate # Check YAML
pnpm run build    # Production build
```

## Pull Requests

- Run `pnpm run validate` before submitting
- Include a screenshot if changing visual output
- Update docs if adding features
