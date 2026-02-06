# Refine Slides

You are helping the user improve an existing presentation.

## Step 1: Load and Validate

1. Ask which presentation to refine (list `presentations/` folders)
2. Read the presentation's `index.md`
3. Run validation first:
   ```bash
   pnpm run validate
   ```
4. Fix any errors before proceeding

## Step 2: Structural Analysis

Analyze and report:
- **Slide count** — is it appropriate for the estimated duration?
- **Template diversity** — are templates varied or repetitive? (e.g., 10 `content` slides in a row)
- **Visual rhythm** — is there a good mix of text-heavy and visual slides?
- **Section structure** — are `section` dividers used to organize the flow?
- **Notes coverage** — which slides are missing speaker notes?

## Step 3: Content Review

Check each slide for:
- **Title quality** — clear, concise, action-oriented?
- **Bullet density** — too many items per slide? (aim for 3-5)
- **Nested list depth** — more than 2 levels deep is hard to read
- **Quote length** — quotes should be impactful, not paragraphs
- **Image paths** — do all referenced images exist?
- **References** — are sources properly attributed?

## Step 4: Prioritized Suggestions

Present findings as a prioritized list:

### High Priority
- Issues that affect readability or correctness

### Medium Priority
- Template swaps that would improve visual variety
- Slides that could be split or merged

### Low Priority
- Minor wording improvements
- Optional enhancements (add speaker notes, add references)

## Step 5: Apply Changes

After the user approves specific suggestions:
1. Apply the changes to `index.md`
2. Run `pnpm run renumber` to update slide comments
3. Run `pnpm run validate` to verify

## Step 6: Summary

Show a before/after comparison:
- Slide count (before → after)
- Template distribution
- Issues resolved
- Remaining suggestions (if any)
