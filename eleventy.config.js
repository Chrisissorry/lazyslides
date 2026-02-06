// Local development config — uses the plugin from this repo
import lazyslides from "./index.js";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(lazyslides);
  eleventyConfig.ignores.add(".github/**");

  return {
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
    dir: { input: ".", layouts: "_layouts", output: "_site" },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk"
  };
};
