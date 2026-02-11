import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const pkgRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * LazySlides Eleventy plugin.
 *
 * Registers layouts, templates, assets, filters, and a virtual
 * presentations index page so that a user project only needs a
 * six-line eleventy.config.js to get the full engine.
 */
export default function lazyslides(eleventyConfig, options = {}) {
  // ---------------------------------------------------------------
  // 1. Filters & Nunjucks test (unchanged logic from .eleventy.js)
  // ---------------------------------------------------------------
  eleventyConfig.addFilter("resolveImage", (src) => {
    return src;
  });

  eleventyConfig.addFilter("isMapping", (val) => {
    return val !== null && typeof val === "object" && !Array.isArray(val);
  });

  // ---------------------------------------------------------------
  // 2. Nunjucks search paths — makes {% include "slides/…" %} and
  //    layout: presentation.njk resolve to files inside the package.
  //    User-local paths are searched first (Eleventy default) so
  //    users can override any template.
  // ---------------------------------------------------------------
  eleventyConfig.amendLibrary("njk", (env) => {
    // Disable autoescape so YAML values containing HTML (e.g. <strong>)
    // render correctly instead of being entity-escaped.
    env.opts.autoescape = false;

    // Register the "mapping" test
    env.addTest("mapping", (val) => {
      return val !== null && typeof val === "object" && !Array.isArray(val);
    });

    // Add package paths *after* the user's local paths
    env.loaders[0].searchPaths.push(path.join(pkgRoot, "_includes"));
    env.loaders[0].searchPaths.push(path.join(pkgRoot, "_layouts"));
  });

  // ---------------------------------------------------------------
  // 3. Passthrough copies — map engine assets to output
  // ---------------------------------------------------------------
  const realPkgRoot = fs.realpathSync(pkgRoot);

  eleventyConfig.addPassthroughCopy({
    [path.join(realPkgRoot, "assets/reveal.js")]: "assets/reveal.js",
  });
  eleventyConfig.addPassthroughCopy({
    [path.join(realPkgRoot, "assets/css/themes")]: "assets/css/themes",
  });
  eleventyConfig.addPassthroughCopy({
    [path.join(realPkgRoot, "assets/css/vendor")]: "assets/css/vendor",
  });
  eleventyConfig.addPassthroughCopy({
    [path.join(realPkgRoot, "assets/js/vendor")]: "assets/js/vendor",
  });

  // User's local theme overrides
  eleventyConfig.addPassthroughCopy({
    "themes/": "assets/css/themes/",
  });

  // Per-presentation assets, images, and videos
  eleventyConfig.addPassthroughCopy("presentations/*/assets");
  eleventyConfig.addPassthroughCopy("presentations/*/images");
  eleventyConfig.addPassthroughCopy("presentations/*/videos");

  // ---------------------------------------------------------------
  // 3b. Collection — only index.md files are presentations
  // ---------------------------------------------------------------
  eleventyConfig.addCollection("presentations", (collectionApi) => {
    return collectionApi.getFilteredByGlob("presentations/*/index.md");
  });

  // ---------------------------------------------------------------
  // 4. Global data — site.title with option override
  // ---------------------------------------------------------------
  const siteData = JSON.parse(
    fs.readFileSync(path.join(realPkgRoot, "data/site.json"), "utf-8")
  );
  eleventyConfig.addGlobalData("site", {
    title: options.siteTitle || siteData.title,
    ...options.siteData,
  });

  // ---------------------------------------------------------------
  // 5. Virtual layouts — loaded from the package so users don't
  //    need _layouts/ locally (but can override by creating one)
  // ---------------------------------------------------------------
  const layoutsDir = path.join(realPkgRoot, "_layouts");
  for (const file of fs.readdirSync(layoutsDir)) {
    if (!file.endsWith(".njk")) continue;
    const content = fs.readFileSync(path.join(layoutsDir, file), "utf-8");
    eleventyConfig.addTemplate(`_layouts/${file}`, content);
  }

  // ---------------------------------------------------------------
  // 6. Virtual template — presentations index page
  // ---------------------------------------------------------------
  eleventyConfig.addTemplate("presentations-index.njk", `---
layout: default.njk
title: Presentations
permalink: /presentations/
---

<div class="text-center mb-8 pb-6 border-b border-slate-200">
  <h1 class="font-serif text-3xl font-bold text-slate-900 mb-2">LazySlides</h1>
  <p class="text-slate-500">AI-native presentations from YAML. Powered by Eleventy + Reveal.js + Tailwind CSS.</p>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
  {% for presentation in collections.presentations %}
  {% set theme = presentation.data.theme | default("default") %}
  {% if theme == "midnight" %}{% set themeColor = "#6366f1" %}{% set themeBg = "#eef2ff" %}{% set themeText = "#4338ca" %}
  {% elif theme == "sunset" %}{% set themeColor = "#f97316" %}{% set themeBg = "#fff7ed" %}{% set themeText = "#c2410c" %}
  {% elif theme == "forest" %}{% set themeColor = "#22c55e" %}{% set themeBg = "#f0fdf4" %}{% set themeText = "#15803d" %}
  {% elif theme == "corporate" %}{% set themeColor = "#64748b" %}{% set themeBg = "#f8fafc" %}{% set themeText = "#334155" %}
  {% elif theme == "card" %}{% set themeColor = "#0ea5e9" %}{% set themeBg = "#f0f9ff" %}{% set themeText = "#0369a1" %}
  {% else %}{% set themeColor = "#0ea5e9" %}{% set themeBg = "#f0f9ff" %}{% set themeText = "#0369a1" %}
  {% endif %}
  <a href="{{ presentation.url | url }}" class="block rounded-lg border border-slate-200 bg-white no-underline transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden" style="border-top: 3px solid {{ themeColor }};">
    <div class="p-5">
      <h2 class="font-serif text-lg font-semibold text-slate-900 mb-1 mt-0">{{ presentation.data.title }}</h2>
      {% if presentation.data.description %}
      <p class="text-sm text-slate-500 mb-4 mt-0">{{ presentation.data.description }}</p>
      {% endif %}
      <div class="flex items-center gap-3 mt-auto">
        <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" style="background: {{ themeBg }}; color: {{ themeText }};">{{ theme }}</span>
        <span class="text-xs text-slate-400">{{ presentation.data.slides | length }} slides</span>
      </div>
    </div>
  </a>
  {% endfor %}
</div>
`);

  // ---------------------------------------------------------------
  // 6b. Virtual template — root redirect to presentations index
  // ---------------------------------------------------------------
  eleventyConfig.addTemplate("root-redirect.njk", `---
permalink: /index.html
eleventyExcludeFromCollections: true
---
<!DOCTYPE html>
<html>
<head><meta http-equiv="refresh" content="0; url={{ '/presentations/' | url }}"></head>
<body></body>
</html>
`);

  // ---------------------------------------------------------------
  // 7. Ignores
  // ---------------------------------------------------------------
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("CONTRIBUTING.md");
  eleventyConfig.ignores.add("CLAUDE.md");
  eleventyConfig.ignores.add("LICENSE");
  eleventyConfig.ignores.add(".claude/**");
  eleventyConfig.ignores.add("presentations/_template/**");
  eleventyConfig.ignores.add("pages/**");
  eleventyConfig.ignores.add("scaffold/**");
  eleventyConfig.ignores.add("docs/**");
  eleventyConfig.ignores.add("bin/**");
}
