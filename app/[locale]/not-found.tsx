import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg mb-8">Page not found</p>
        <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
          Return home
        </Link>
      </div>
    </div>
  );
}
