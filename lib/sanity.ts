import { createClient as createSanityClient } from '@sanity/client';
import { createClient as createNextSanityClient } from 'next-sanity';

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-10-01',
  useCdn: true
};

export function createClient() {
  return createNextSanityClient(sanityConfig);
}

export function createPreviewClient() {
  return createSanityClient({
    ...sanityConfig,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN
  });
}


