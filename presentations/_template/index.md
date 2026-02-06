---
title: Presentation Title
description: Brief description
transition: slide

slides:
  - template: title
    title: Presentation Title
    subtitle: Subtitle or tagline
    author: Your Name

  - template: section
    title: Section One

  - template: content
    title: Content Slide
    text: Introduction to your topic
    items:
      - First key point
      - Second key point
      - Third key point

  - template: center
    title: Big Statement
    text: A powerful quote or impactful statement.

  - template: comparison
    title: Before vs After
    rows:
      - left: Old way
        right: New way
      - left: "✗ Problem"
        right: "✓ Solution"

  - template: hero
    title: Hero Title
    image: images/hero.jpg
    text: Overlay text on full-bleed image

  - template: image-overlay
    title: Context
    image: images/diagram.png
    position: bottom-left
    text: Explanation of what the image shows.

  - template: section
    title: Section Two

  - template: metrics
    title: Key Metrics
    metrics:
      - value: "42%"
        label: Metric One
      - value: "3x"
        label: Metric Two

  - template: columns
    title: Two Columns
    left_title: Left Side
    left_text: Content for the left column.
    right_title: Right Side
    right_text: Content for the right column.

  - template: code
    title: Code Example
    language: python
    code: |
      def hello(name):
          return f"Hello, {name}!"

  - template: quote
    quote: Your favorite quote here.
    author: Attribution

  - template: title
    title: Thank You!
    subtitle: Questions?
---
