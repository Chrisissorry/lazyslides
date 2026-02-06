# Validate Presentations

You are helping the user validate their presentation YAML and fix any issues.

## Step 1: Run Validation

```bash
pnpm run validate
```

## Step 2: Interpret Results

Review the output and categorize issues:

### Errors (must fix)
- **No valid YAML front matter** — missing `---` fences or malformed YAML
- **Missing required field** — `title` or `slides` missing from frontmatter
- **Missing template field** — a slide is missing the `template:` key
- **Wrong comparison format** — comparison slides must use `rows:` with `left`/`right` pairs

### Warnings (should fix)
- **Unknown template** — template name doesn't match one of the 17 valid types
- **Missing title** — slide has no title (except `quote` which doesn't need one)
- **Missing image** — image path in YAML doesn't exist on disk
- **Hidden slide** — possible slide definition commented out
- **Slide count mismatch** — `expected_slides` doesn't match actual count

## Step 3: Propose Fixes

For each error:
1. Explain what's wrong in plain language
2. Show the problematic YAML
3. Propose the corrected YAML

For each warning:
1. Explain the risk
2. Suggest a fix or explain why it's safe to ignore

## Step 4: Apply Fixes

After the user approves, apply the fixes and re-run validation:

```bash
pnpm run validate
```

Repeat until all errors are resolved.
