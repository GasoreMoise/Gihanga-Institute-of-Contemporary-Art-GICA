import { createTranslator } from 'next-intl';
import { headers } from 'next/headers';
import { defaultLocale } from './config';

export async function getTranslations(namespace?: string) {
  const h = headers();
  const locale = h.get('x-next-intl-locale') || defaultLocale;
  const messages = (await import(`./messages/${locale}.json`)).default;
  return createTranslator({ locale, messages, namespace });
}


