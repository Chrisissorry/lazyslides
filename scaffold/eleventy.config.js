import lazyslides from "lazyslides";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(lazyslides);

  return {
    dir: { input: ".", layouts: "_layouts", output: "_site" },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk"
  };
};
