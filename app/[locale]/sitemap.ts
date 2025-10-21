import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.gica.art/en', changeFrequency: 'weekly', priority: 1 },
    { url: 'https://www.gica.art/rw', changeFrequency: 'weekly', priority: 1 }
  ];
}


