export default {
  layout: "presentation.njk",
  eleventyComputed: {
    permalink(data) {
      if (data.page.filePathStem.endsWith("/index")) {
        return `/presentations/${data.page.fileSlug}/`;
      }
      return false;
    },
  },
};
