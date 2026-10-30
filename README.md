# Notes — a minimal Astro blog

A typography-first blog theme: one column, a serif text face, blue underlined
links, no client-side JavaScript. Built with Astro 7, fully static.

```sh
npm install
npm run dev       # http://localhost:4321 (drafts are visible here)
npm run build     # type-check (astro check) + static build into dist/
npm run preview   # serve dist/ locally
```

Before going live, set `site` in `astro.config.mjs` and the name, email and
intro text in `src/consts.ts`.

## Adding a post

Create a Markdown file in `src/content/blog/`. The file name becomes the URL
(`my-post.md` → `/blog/my-post/`).

```markdown
---
title: My new post
description: One sentence, used for search results, social cards and RSS.
pubDate: 2026-11-02
updatedDate: 2026-11-05        # optional
tags: [typography, web]        # optional; each tag gets a page at /tags/<tag>/
heroImage:                     # optional; shown under the title
  src: ./images/my-image.png
  alt: Describe what the image shows.
draft: true                    # optional; drafts show in `npm run dev` only
---

Text goes here.
```

Markdown notes:

- **Images**: put them next to the post (e.g. `src/content/blog/images/`) and
  use a relative path. They are optimised by `astro:assets` (WebP, width and
  height set). Give an image a title to turn it into a figure with a caption:
  `![Alt text](./images/pic.png "Caption shown under the image")`.
- **Footnotes**: `text[^1]` and, anywhere below, `[^1]: The note.`
- **Tables** scroll sideways on narrow screens instead of widening the page.
- Code blocks are plain monospace on purpose (no syntax highlighting).

The schema lives in `src/content.config.ts`; a post with a missing or
wrong-typed field fails the build with a clear error.

## Where things live

| What | Where |
| --- | --- |
| Design tokens (colours, fonts, type scale, spacing, radii, layout) | `src/styles/global.css` (`:root`) |
| Font files (self-hosted, pre-subset) and their licences | `src/assets/fonts/` |
| Font registration, Markdown setup | `astro.config.mjs` |
| Styles for rendered Markdown (`.prose`) | `src/layouts/PostLayout.astro` |
| Site name, author, email, intro, posts on home page | `src/consts.ts` |
| Post helpers (sorting, drafts, dates, tags, reading time) | `src/lib/posts.ts` |
| Figure/caption and table-wrapper Markdown plugin | `src/lib/prose-hast-plugin.mjs` |

Components only use `var(--…)` tokens. To restyle the site, change values in
`:root` in `global.css`.

### Fonts

Source Serif 4 (roman + italic) and IBM Plex Mono, both under the SIL Open
Font License. They are loaded through Astro's fonts API with the local
provider: Astro copies them into the build, writes `@font-face` with
`font-display: swap`, generates metric-matched fallback fonts to reduce
layout shift, and preloads the regular serif.

The files were reduced from the full fonts with `fonttools`:

- characters: Basic Latin, Latin-1, Latin Extended-A, common punctuation,
  arrows and € (enough for English and most Western/Central European text);
- Source Serif weight axis limited to 400–600 (the weights the design uses);
- Source Serif optical-size axis pinned to its default (20), which matches the
  19px body text. This cut the main font from ~145 KB to ~38 KB.

To support more characters, re-run `pyftsubset` on the full fonts from
[google/fonts](https://github.com/google/fonts) with a wider `--unicodes`
range.

## Deploying

`npm run build` writes a plain static site to `dist/`. Upload that folder to
any static host. Typical settings:

- **Netlify / Cloudflare Pages / Vercel**: build command `npm run build`,
  output directory `dist`, Node 22 or newer.
- **GitHub Pages**: use the official
  [`withastro/action`](https://github.com/withastro/action) workflow.
- **Any web server**: copy `dist/` to the web root. Configure the server to
  serve `404.html` for missing pages.

The build also produces `rss.xml` and `sitemap-index.xml`; both use the
`site` URL from `astro.config.mjs`.
