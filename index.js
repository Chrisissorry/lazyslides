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
    if (!src || src.includes("://") || src.startsWith("/")) return src;
    return "../" + src;
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

  // Per-presentation images
  eleventyConfig.addPassthroughCopy("presentations/*/images");

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

<div style="text-align: center; margin-bottom: 2rem;">
  <h1 style="font-family: 'Source Serif 4', Georgia, serif; font-size: 2rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">LazySlides</h1>
  <p style="color: #64748b; font-size: 1rem;">AI-native presentations from YAML. Powered by Eleventy + Reveal.js + Tailwind CSS.</p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
  {% for presentation in collections.presentations %}
  <a href="{{ presentation.url }}" style="display: block; padding: 1.5rem; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; transition: all 0.2s ease; background: white;">
    <h2 style="font-family: 'Source Serif 4', Georgia, serif; font-size: 1.1rem; font-weight: 600; color: #0f172a; margin: 0 0 0.5rem 0;">{{ presentation.data.title }}</h2>
    {% if presentation.data.description %}
    <p style="font-size: 0.85rem; color: #64748b; margin: 0;">{{ presentation.data.description }}</p>
    {% endif %}
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
