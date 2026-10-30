---
title: Line height is not a style choice
description: Line spacing decides whether long text is comfortable to read. Here are the values this blog uses, and why they differ by role.
pubDate: 2026-09-30
tags: [typography, accessibility]
draft: false
---

Line height usually gets set once, early, and never looked at again. That is a shame, because it does more for reading comfort than almost any other setting on the page — and the right value is not the same for every kind of text.

## What the guidelines say

The Web Content Accessibility Guidelines treat spacing as something readers must be able to change. [Success criterion 1.4.12, Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), asks that nothing breaks when a reader sets:

1. line height to at least 1.5 times the font size,
2. space after paragraphs to at least 2 times the font size,
3. letter spacing to 0.12 times the font size, and
4. word spacing to 0.16 times the font size.

That criterion is about not getting in the way of the reader’s own settings. The stricter [1.4.8, Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) goes further and asks for line spacing of at least one and a half within paragraphs by default.

## The values used here

Body text gets the most room. Headings are short, so they get less: a heading set with body spacing falls apart into separate lines.

| Text          | Size | Line height | Why                                  |
| ------------- | ---- | ----------- | ------------------------------------ |
| Body          | 19px | 1.65        | Long lines of reading, often on a phone |
| Sub-headings  | 22px | 1.3         | One or two lines; should hold together |
| Post titles   | 34px | 1.2         | Large type needs less relative space |
| Code blocks   | 14px | 1.6         | Scanned line by line, not read        |
| Captions      | 15px | 1.65        | Inherits the body rhythm              |

### Unitless, always

Write line height without a unit: `line-height: 1.65`, not `line-height: 1.65em`. A unitless value is inherited as a ratio, so a smaller caption inside a paragraph gets spacing that fits its own size. With a unit, the computed length is inherited instead, and small text ends up floating in space meant for something larger.

## A quick test

Read a full paragraph on your phone at arm’s length. If your eye has to hunt for the start of the next line, the spacing is too tight. If the paragraph starts to look like a list of separate sentences, it is too loose. Somewhere between 1.5 and 1.7 is usually right for body text.
