---
title: Writing for one column
description: A single column takes away sidebars, callouts and pull quotes. What is left is the order of the sentences, which is where the work belongs.
pubDate: 2026-09-02
updatedDate: 2026-10-02
tags: [writing, web]
heroImage:
  src: ./images/one-column.png
  alt: A sketch of a web page with a single narrow column of text lines in the middle and wide empty margins on either side.
draft: false
---

A single column is a constraint on the writer as much as on the designer. There is no sidebar to park an aside in, no callout box for the important bit, no pull quote to rescue a paragraph nobody will read. Everything has to go somewhere in one line of reading.

## What disappears

When the layout gives you only one column, a few habits stop working:

- **Asides.** If it matters, it goes in the text. If it doesn’t, it goes.
- **Callouts and boxes.** These usually mean the paragraph before them did not say the thing clearly enough.
- **Navigation inside the post.** A short post does not need a table of contents. A long one might need to be two posts.
  - Footnotes are the exception: they keep a reference out of the way without hiding it.
  - Links are the other one, as long as the sentence still makes sense without clicking.

## What is left

What is left is order. The reader meets each sentence once, in the sequence you chose, so most of the editing is about that sequence:

1. Say what the post is about in the first paragraph.
2. Give each section one job, and name it in the heading.
3. End where the argument ends, not with a summary of it.

> A layout with nowhere to hide things is a good editor. It does not care how much work went into a paragraph, only whether it belongs.

## In practice

Posts here are plain Markdown files. The front matter carries the title, a one-line description and a few tags; everything below it is the post:

```markdown
---
title: Writing for one column
description: A single column takes away sidebars…
pubDate: 2026-09-02
tags: [writing, web]
---

A single column is a constraint on the writer…
```

The same file produces the page, the RSS entry and the description search engines show. There is no second place to keep in sync, which is most of what makes a [plain setup](https://docs.astro.build/en/guides/content-collections/) pleasant to write in.
