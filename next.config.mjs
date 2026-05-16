import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' }
    ],
    dangerouslyAllowSVG: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Fixed: Removed the accidental duplicate trailing comma here
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://cdn.sanity.io",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://*.sanity.io https://vitals.vercel-insights.com https://va.vercel-scripts.com",

              // CRITICAL FIX: Explicitly grant media permissions to allow your video to play from Vercel Blob
              "media-src 'self' blob: https://6kf3phgbvin96dfd.private.blob.vercel-storage.com https://*.vercel-storage.com",

              // Cleaned: Securely locked down frames since we are streaming locally instead of using YouTube
              "frame-src 'none'",
              "worker-src 'self' blob:",
              "object-src 'none'",
            ].join('; ')
          }
        ]
      }
    ];
  }
};

export default withNextIntl(nextConfig);