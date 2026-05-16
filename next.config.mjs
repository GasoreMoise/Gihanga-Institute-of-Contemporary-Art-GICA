import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' }
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
              // 1. Allow scripts required to initialize the interactive YouTube player
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com https://www.youtube.com https://s.ytimg.com",
              "style-src 'self' 'unsafe-inline'",
              // 2. Allow cover images from YouTube's image CDN
              "img-src 'self' data: blob: https://cdn.sanity.io https://img.youtube.com https://i.ytimg.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://*.sanity.io https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              // 3. THE CRITICAL FIX: Explicitly allow the browser to embed the sandbox video frame
              "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com",
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