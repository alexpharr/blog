import { getCollection, type CollectionEntry } from 'astro:content';
import { WORDS_PER_MINUTE } from '../consts';

export type Post = CollectionEntry<'blog'>;

/**
 * All posts, newest first. Drafts are included while running `astro dev`
 * and left out of production builds.
 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function postUrl(post: Post): string {
  return `/blog/${post.id}/`;
}

/** The design shows dates as ISO 8601 (YYYY-MM-DD). */
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function readingMinutes(markdown: string | undefined): number {
  const text = (markdown ?? '')
    .replace(/```[\s\S]*?```/g, ' ') // code blocks are scanned, not read
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[#>*_`|[\]()-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function tagUrl(tag: string): string {
  return `/tags/${tagSlug(tag)}/`;
}

/** Map of tag slug → { label, posts }, posts newest first. */
export function groupByTag(posts: Post[]): Map<string, { label: string; posts: Post[] }> {
  const tags = new Map<string, { label: string; posts: Post[] }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      const entry = tags.get(slug) ?? { label: tag, posts: [] };
      entry.posts.push(post);
      tags.set(slug, entry);
    }
  }
  return tags;
}

/** [year, posts] pairs, newest year first. Expects posts sorted newest first. */
export function groupByYear(posts: Post[]): Array<[number, Post[]]> {
  const years = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.pubDate.getUTCFullYear();
    years.set(year, [...(years.get(year) ?? []), post]);
  }
  return [...years.entries()];
}

const NUMBER_WORDS = [
  'No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve',
];

/** "Ten posts, newest first." — as written in the design's archive. */
export function postCountLabel(count: number): string {
  const number = NUMBER_WORDS[count] ?? String(count);
  return `${number} ${count === 1 ? 'post' : 'posts'}, newest first.`;
}
