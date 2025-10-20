'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();

  const navItems = [
    { href: `/${locale}#about` as const, label: 'About' },
    { href: `/${locale}#exhibitions` as const, label: 'Exhibitions' },
    { href: `/${locale}/programme` as const, label: 'Programme' },
    { href: `/${locale}/visit` as const, label: 'Visit' },
    { href: `/${locale}#contact` as const, label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-semibold">
            GICA
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <LocaleSwitcher />
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-neutral-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4">
              <LocaleSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
