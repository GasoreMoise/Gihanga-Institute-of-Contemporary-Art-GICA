import { redirect } from 'next/navigation';

export default async function ProgrammePage() {
  // Temporarily redirect to landing page
  redirect('/en');
}
