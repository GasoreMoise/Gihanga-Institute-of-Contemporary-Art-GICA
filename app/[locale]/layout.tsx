import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
// import { SpeedInsights } from '@vercel/speed-insights/next';
// import { Analytics } from '@vercel/analytics/react';
// import { ThemeProvider } from 'next-themes';
import Nav from '@/components/Nav';
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/logos/logo1.svg" type="image/svg+xml" />
        {/* Preload hero image for fastest first paint */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-background.webp"
          imageSrcSet="/images/hero-background.JPG 1920w"
          imageSizes="100vw"
          type="image/jpeg"
        />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* <Nav /> */}
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
          />
        </NextIntlClientProvider>
        {/* <SpeedInsights />
        <Analytics /> */}
      </body>
    </html>
  );
}


