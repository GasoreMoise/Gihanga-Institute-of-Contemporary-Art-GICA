import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gica.art';
  
  return [
    // Main pages
    { 
      url: `${baseUrl}/en`, 
      changeFrequency: 'weekly', 
      priority: 1,
      lastModified: new Date()
    },
    { 
      url: `${baseUrl}/rw`, 
      changeFrequency: 'weekly', 
      priority: 1,
      lastModified: new Date()
    },
    // Add more pages as you create them
    // { url: `${baseUrl}/en/exhibitions`, changeFrequency: 'weekly', priority: 0.8 },
    // { url: `${baseUrl}/en/programme`, changeFrequency: 'weekly', priority: 0.8 },
  ];
}


