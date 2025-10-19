import { redirect } from 'next/navigation';

export default async function VisitPage() {
  // Temporarily redirect to landing page
  redirect('/en');
}
