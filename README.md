# GICA Website

Stack: Next.js 14, TypeScript, Tailwind, Sanity v3, next-intl, Vercel.

## Getting Started
1. Copy env: `cp .env.example .env.local` and fill values
2. Install: `npm ci`
3. Dev server: `npm run dev` → http://localhost:3000/en

## Scripts
- dev, build, start, typecheck, lint, test, e2e, cms:dev

## Architecture
- App Router with per-locale segment `[locale]`
- Sanity for content; GROQ in `lib/queries.ts`
- Images via next/image + Sanity CDN

## Deployment
- Vercel recommended. Configure env vars and domains.
