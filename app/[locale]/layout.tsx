import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Nav from '@/components/Nav';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

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
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params correctly for Next.js 15
  const { locale } = await params;
  const messages = await getMessages();

  return (
    // suppressHydrationWarning is critical here
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-neutral-900 antialiased p-0 m-0">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Nav />
          {/* Ensure main is relative so it doesn't collapse */}
          <main className="relative">{children}</main>
          <SpeedInsights />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}