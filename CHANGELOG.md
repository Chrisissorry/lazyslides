# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-06

### Added

- Eleventy plugin with Reveal.js 5 integration
- 17 slide templates: title, section, content, center, hero, metrics, comparison, columns, quote, image-overlay, code, timeline, funnel, split, split-wide, table, agenda
- Tailwind CSS 4 design system with semantic color tokens
- CLI commands: `init`, `validate`, `renumber`, `pdf`
- Project scaffolding via `lazyslides init`
- YAML validation with detailed error messages
- Nested list support (map syntax) in content, split, and split-wide templates
- Image lightbox via GLightbox
- Section progress dots for navigation
- Speaker notes support on all templates
- Reference/citation support with single and multiple references
- Theme system with CSS custom property overrides
- Virtual layouts and Nunjucks search paths for zero-config user experience
- Claude Code integration with `/new-presentation` slash command
- PDF export via DeckTape
