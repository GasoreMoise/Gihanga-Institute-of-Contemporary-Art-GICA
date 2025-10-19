import { draftMode } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 });
  }
  draftMode().enable();
  const redirect = searchParams.get('redirect') || '/';
  return Response.redirect(new URL(redirect, request.url));
}


