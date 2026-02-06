# Create Outline

You are helping the user create a structured outline before generating presentation YAML.

## Step 1: Gather Context

Ask the user for:
1. **Topic** — what is the presentation about?
2. **Audience** — who will watch this?
3. **Purpose** — inform, persuade, teach, pitch, report?
4. **Duration** — how long is the talk? (affects slide count: ~1 slide per minute)
5. **Speaker** — name and relevant background

## Step 2: Check for Existing Research

Look for a `research.md` file in the target presentation folder. If it exists, use the findings to inform the outline. If not, proceed with the user's input.

## Step 3: Draft Section Structure

Based on the purpose, propose a structure:

**Pitch:** Problem → Solution → Evidence → Differentiation → Ask
**Teaching:** Context → Concepts → Examples → Practice → Summary
**Report:** Overview → Findings → Analysis → Recommendations → Next Steps
**Persuasion:** Status Quo → Problem → Vision → Proof → Call to Action

Present the proposed sections and iterate with the user.

## Step 4: Detail Each Slide

For each slide in the outline, specify:
- **Title** — clear, concise slide title
- **Template** — which LazySlides template to use
- **Key point** — the one takeaway from this slide
- **Content sketch** — bullet points, data, or narrative
- **Notes sketch** — what the speaker should say

Read the docblock in `_includes/slides/{template}.njk` to verify field names.

## Step 5: Save Outline

Save as `outline.md` in the presentation folder:

```markdown
# [Presentation Title]

## Metadata
- **Audience:** [description]
- **Purpose:** [goal]
- **Speaker:** [name and background]
- **Duration:** [estimated time]
- **Slide count:** [estimated number]

## Key Messages
1. [message 1]
2. [message 2]
3. [message 3]

## Outline

### Section 1: [Name]

#### Slide 1.1: [Title]
- **Template:** [template]
- **Key point:** [takeaway]
- **Content:** [sketch]
- **Notes:** [speaker notes]

#### Slide 1.2: [Title]
...
```

## Step 6: Next Steps

Offer to generate the full presentation YAML from this outline — this follows the same flow as `/new-presentation` Step 5 onward.
