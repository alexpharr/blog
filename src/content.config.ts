import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      heroImage: z
        .object({
          src: image(),
          alt: z.string().min(1, 'heroImage.alt is required'),
        })
        .optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
