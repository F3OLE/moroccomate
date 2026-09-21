import type { MetadataRoute } from 'next';
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
  { path: '/itinerary', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/early-access', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/partners', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/feedback', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
