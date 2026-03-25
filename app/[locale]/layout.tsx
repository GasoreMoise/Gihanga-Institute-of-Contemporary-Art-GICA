import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Nav from '@/components/Nav'; // Double-check this filename!
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

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
  description: 'A living space for art, research, and collective imagination in Kigali, Rwanda.',
  // ... rest of your metadata
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Updated for Next.js 15 async params if applicable
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      {/* Added font-sabon here to ensure it wraps everything */}
      <body className="antialiased font-sabon">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Nav />
          <main>{children}</main>
          <SpeedInsights />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}