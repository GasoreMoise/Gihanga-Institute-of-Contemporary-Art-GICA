import type { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: 'GICA',
  description: 'Gihanga Institute of Contemporary Art',
  openGraph: {
    type: 'website',
    images: [{ url: '/og/og-default.jpg', width: 1200, height: 630 }]
  },
  twitter: { card: 'summary_large_image' }
};

export function generateMetadata({
  title,
  description,
  image
}: {
  title?: string;
  description?: string;
  image?: string;
}): Metadata {
  return {
    title: title ? `${title} | GICA` : 'GICA',
    description: description || 'Gihanga Institute of Contemporary Art',
    openGraph: {
      title: title || 'GICA',
      description: description || 'Gihanga Institute of Contemporary Art',
      images: image ? [{ url: image }] : [{ url: '/og/og-default.jpg', width: 1200, height: 630 }]
    }
  };
}
