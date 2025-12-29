import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

import { orgJsonLd } from '@/lib/seo/jsonld';
import '../globals.css';
import '../fonts.css';

export const viewport: Viewport = {
  themeColor: [
    { color: '#0b0b0b' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gica.art'),
  title: {
    default: 'GICA',
    template: '%s | GICA',
  },
  description:
    'A living space for art, research, and collective imagination in Kigali, Rwanda.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }
    ]
  },
  openGraph: {
    type: 'website',
    url: 'https://www.gica.art',
    title: 'GICA',
    siteName: 'GICA',
    images: [
      { url: '/og/og-default.jpg', width: 1200, height: 630, alt: 'GICA' }
    ]
  },
  twitter: { card: 'summary_large_image', site: '@gica', creator: '@gica' },
  alternates: { canonical: 'https://www.gica.art' }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* <Nav /> */}
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
          />
      <SpeedInsights />
      <Analytics />
        </NextIntlClientProvider>
  );
}


