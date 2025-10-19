import { redirect } from 'next/navigation';

export default async function ContributorsPage() {
  // Temporarily redirect to landing page
  redirect('/en');
}
