import { groq } from 'next-sanity';
import { type SanityClient } from '@sanity/client';

export async function getLandingContent(client: SanityClient) {
  const q = groq`{
    "heroImage": *[_type=="media" && defined(file.asset)][0]{
      "src": file.asset->url, "width": 2400, "height": 1350
    },
    "aboutHtml": "Coming soon",
    "welcomeHtml": "Coming soon",
    "exhibitions": *[_type=="exhibition" && locale==$locale]|order(startDate desc)[0..5]{
      title, slug, cover{asset->{url}}, startDate, endDate
    }
  }`;
  const locale = 'en';
  return client.fetch(q, { locale });
}


