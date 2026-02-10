# Add Theme

You are helping the user create a custom CSS theme for their LazySlides project.

## Step 1: Gather Brand Requirements

Ask the user:
- What brand or visual identity is this for?
- Primary accent color (hex code or description like "dark teal")
- Preferred fonts for headings and body text (or "keep defaults")
- Footer brand name and optional logo image
- Any other styling preferences (background gradient, etc.)

## Step 2: Choose a Theme Name

Help the user pick a kebab-case name (e.g. `acme-corp`, `dark-blue`, `conference-2026`). This becomes both the filename (`themes/<name>.css`) and the frontmatter value (`theme: <name>`).

## Step 3: Create the Theme File

Read `assets/css/themes/default.css` as the reference for all customizable properties. Create `themes/<name>.css` with the user's values. The theme can override any of these:

**Typography:**
- `--font-heading` — headings, quotes, metric values (default: Source Serif 4)
- `--font-body` — paragraphs, lists, labels, footer (default: Plus Jakarta Sans)
- Add `@import url(...)` at the top for Google Fonts if needed

**Primary color scale:**
- `--color-primary-50` through `--color-primary-700` — light tints to dark accents
- Generate a harmonious 7-step scale from the user's chosen color

**Footer branding:**
- `--footer-brand-name` — text shown in footer center
- `--footer-logo-url` — optional logo URL (e.g. `url('/assets/images/brands/logo.svg')`)

**Theater background:**
- `html, body { background: ... }` — gradient behind the slide cards

Only include properties the user wants to change — omitted properties inherit from `src/styles.css` defaults.

## Step 4: Apply the Theme

Update the target presentation's `index.md` frontmatter to use the new theme:

```yaml
theme: <name>
```

## Step 5: Preview

Run `pnpm run dev` and open the presentation in the browser to review. Iterate on colors, fonts, and spacing until the user is satisfied.
