import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Array<[string, number]> = [
    ['/', 1],
    ['/services', 0.9],
    ['/how-it-works', 0.8],
    ['/work', 0.8],
    ['/about', 0.6],
    ['/contact', 0.9],
  ];
  return routes.map(([path, priority]) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority,
  }));
}
