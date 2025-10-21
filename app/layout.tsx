import type { Metadata, Viewport } from 'next';
import './globals.css';
import './fonts.css';

export const viewport: Viewport = {
  themeColor: [
    { color: '#0b0b0b' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gica.art'),
  title: 'GICA',
  description:
    'A living space for art, research, and collective imagination in Kigali, Rwanda.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
