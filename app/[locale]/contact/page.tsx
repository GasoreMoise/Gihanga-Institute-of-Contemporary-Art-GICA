import { redirect } from 'next/navigation';

export default async function ContactPage() {
  // Temporarily redirect to landing page
  redirect('/en');
}
