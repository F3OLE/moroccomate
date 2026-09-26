import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/blog';
import { SITE_URL } from '@/lib/seo';

type ChangeFreq = MetadataRoute.Sitemap[number]['changeFrequency'];

const pages: {
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
}[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/discover', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/experiences', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/plan', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/marrakech', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/casablanca', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/rabat', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/tangier', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/itinerary', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/early-access', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/partners', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/feedback', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/credits', changeFrequency: 'monthly', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = pages.map(
    ({ path, changeFrequency, priority }) => ({
      url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })
  );

  const postEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...postEntries];
}
