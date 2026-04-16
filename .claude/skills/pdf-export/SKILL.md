---
name: pdf-export
description: >
  How to export a LazySlides presentation to PDF in the
  /Users/john_cusack/Documents/projects/presentations project.
  Covers the command, pipeline, known hang causes, how to verify the pipeline
  with the test fixture, and debugging steps when export fails.
  Use whenever the user asks to "export", "make", "generate", or "create"
  a PDF of a presentation, or when PDF export fails or hangs.
---

# LazySlides PDF Export

## Command

From `/Users/john_cusack/Documents/projects/presentations/`:

```bash
pnpm run pdf <presentation-name>   # single presentation
pnpm run pdf                       # all presentations (skips _-prefixed dirs)
```

Output lands in `_pdfs/<presentation-name>.pdf`.

## Pipeline (what the script actually does)

Source: `/Users/john_cusack/projects/lazyslides/lib/export-pdf.js` (editable; lazyslides is a linked/installed local package).

1. `pnpm run build` — validate, build CSS, run eleventy. Builds **all** presentations, not just the requested one.
2. Spawn `npx eleventy --serve --port 4100` as a child.
3. Poll `http://127.0.0.1:4100/` until the server responds (60s timeout).
4. For each target presentation: `npx decktape reveal --size 1920x1080 --pause 1000 --load-pause 2000 http://127.0.0.1:4100/presentations/<name>/?pdf _pdfs/<name>.pdf`.
5. Kill the server, print summary.

## Known gotcha: eleventy doesn't always exit cleanly

After writing files, the eleventy build process sometimes stays alive with 0% CPU — a lingering async handle (d2 WASM worker, chokidar, etc.) keeps the event loop open. This used to hang the export forever because `execSync` blocked waiting for the child.

**The hardened script handles this** via an idle-timeout: if the build child emits no stdout for 15s, we force-kill and proceed. You'll see:

```
Build child idle for 15s — assuming done and force-exiting.
```

That line is expected and harmless. The `_site/` has already been written.

## Verifying the pipeline is healthy

There's a one-slide smoke-test presentation at `presentations/_test-pdf/`. To confirm the export pipeline works in isolation (no d2, no real content):

```bash
pnpm run pdf _test-pdf
```

If that produces `_pdfs/_test-pdf.pdf`, the pipeline is fine. Any subsequent failure on a real deck is deck-specific — check that deck's content, images, or diagrams.

## Debugging a failure

1. **Nothing visible happens**: In the hardened script, decktape's stdout is inherited — you should see `Printing slide 1/N…` live. If you don't, the build or server-start phase stalled. Read the printed output carefully; the build log is now inline.
2. **Process leftovers**: `ps aux | grep -E "lazyslides|eleventy|decktape" | grep -v grep` — kill anything stale before retrying.
3. **Port 4100 in use**: `lsof -nP -iTCP:4100`. Kill the holder.
4. **Do NOT run `pnpm run dev` first** — `pdf` spawns its own server on a different port (4100 vs 8080), but leftover dev-server processes can confuse things.
5. **Decktape fails with a clear exit code** — the script now surfaces it. Common causes: the slide HTML didn't render, an image URL is unreachable, or a d2 diagram failed.

## What the script used to do wrong (pre-fix)

- `execSync("pnpm run build", stdio: "inherit")` blocked forever when eleventy didn't exit.
- `spawn("npx", ["eleventy", "--serve"], stdio: "ignore")` hid all server startup errors.
- `execSync("npx decktape ...", stdio: ["ignore","pipe","pipe"])` in a `try { ... } catch {}` — silent failures, no per-slide progress.

All three are fixed in current `lib/export-pdf.js`. Don't reintroduce them.

## Files

- Consumer script: `package.json` → `"pdf": "lazyslides pdf"` in `/Users/john_cusack/Documents/projects/presentations/package.json`
- Export logic: `/Users/john_cusack/projects/lazyslides/lib/export-pdf.js`
- Smoke-test fixture: `/Users/john_cusack/Documents/projects/presentations/presentations/_test-pdf/index.md`
- Output directory: `/Users/john_cusack/Documents/projects/presentations/_pdfs/`
