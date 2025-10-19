import { redirect } from 'next/navigation';

export default async function ExhibitionsPage() {
  // Temporarily redirect to landing page
  redirect('/en');
}
