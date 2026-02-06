# Research Topic

You are helping the user research a topic to build a data-driven presentation.

## Step 1: Gather Research Parameters

Ask the user for:
1. **Topic** — what is the presentation about?
2. **Angle** — what perspective or thesis? (e.g., "why companies should adopt X")
3. **Audience** — who will watch this? (affects depth and jargon level)
4. **Depth** — quick overview (5-10 data points) or deep dive (20+)?

## Step 2: Research

Search the web for:
- **Statistics** — recent numbers, percentages, growth rates
- **Quotes** — expert opinions, notable statements
- **Comparisons** — before/after, competitor analysis, benchmarks
- **Timelines** — key events, milestones, evolution
- **Case studies** — real-world examples with outcomes

Prioritize recent sources (last 2 years). Always capture the source name, URL, and date.

## Step 3: Organize Findings

Structure findings into categories:

```markdown
## Key Statistics
- [stat] — Source (Year)

## Notable Quotes
- "[quote]" — Author, Title (Source)

## Comparisons
- [comparison point] — Source

## Timeline / Milestones
- [date]: [event] — Source

## Case Studies
- [company/example]: [outcome] — Source
```

## Step 4: Save Research

Save the organized findings as `research.md` in the target presentation folder:
`presentations/{name}/research.md`

## Step 5: Suggest Template Mapping

For each finding, suggest which LazySlides template would best present it:

| Finding | Suggested Template | Rationale |
|---------|-------------------|-----------|
| Key statistic | `metrics` | Numeric data with colored cards |
| Quote | `quote` | Attribution and styling |
| Comparison | `comparison` | Side-by-side table |
| Timeline | `timeline` | Chronological events |
| Case study | `split` or `content` | Narrative with supporting image |

## Step 6: Next Steps

Offer the user:
- `/create-outline` to structure a full presentation from this research
- `/add-slide` to add individual data points to an existing deck
