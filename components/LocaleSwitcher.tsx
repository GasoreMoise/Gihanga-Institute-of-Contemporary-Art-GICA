'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') as any);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          locale === 'en'
            ? 'bg-neutral-900 text-white'
            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('rw')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          locale === 'rw'
            ? 'bg-neutral-900 text-white'
            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
        }`}
      >
        KIN
      </button>
    </div>
  );
}
