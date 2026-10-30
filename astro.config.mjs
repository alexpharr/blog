// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { proseHastPlugin } from './src/lib/prose-hast-plugin.mjs';

// Fonts are self-hosted from src/assets/fonts. The files are pre-subset
// (Latin, Latin Extended-A and common punctuation); see README.md.
const serifFallbacks = ['Georgia', 'Times New Roman', 'serif'];
const monoFallbacks = ['ui-monospace', 'Menlo', 'Consolas', 'monospace'];

export default defineConfig({
  // TODO: replace with your production URL. Used for canonical links,
  // Open Graph URLs, the sitemap and the RSS feed.
  site: 'https://example.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },

  integrations: [sitemap()],

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Source Serif 4',
      cssVariable: '--font-source-serif',
      fallbacks: serifFallbacks,
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/SourceSerif4-Roman-subset.woff2'],
            weight: '400 600',
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/SourceSerif4-Italic-subset.woff2'],
            weight: '400 600',
            style: 'italic',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      fallbacks: monoFallbacks,
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/IBMPlexMono-Regular-subset.woff2'],
            weight: '400',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],

  markdown: {
    // The design shows code as plain monospace on a pale ground, so no
    // syntax highlighting (and no highlighter CSS).
    syntaxHighlight: false,
    processor: satteri({
      features: {
        gfm: {
          footnotes: {
            backContent: '↑',
            backLabel: 'Back to text',
          },
        },
      },
      hastPlugins: [proseHastPlugin],
    }),
  },
});
