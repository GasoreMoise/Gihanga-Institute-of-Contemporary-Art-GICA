'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  
  return (
    <footer className="bg-[#0f2430] text-white">
      <div className="mx-auto max-w-7xl px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Left column */}
        <nav className="space-y-4 ml-16">
          <h3 className="font-sabon text-lg">{t('home')}</h3>
          <ul className="space-y-3 text-white/80 text-sm font-sabon">
            <li><a href="#about" className="hover:opacity-80">{t('about')}</a></li>
            <li><a href="#programme" className="hover:opacity-80">{t('programme')}</a></li>
            <li><a href="#visit" className="hover:opacity-80">{t('visit')}</a></li>
            <li><a href="#contact" className="hover:opacity-80">{t('contact')}</a></li>
          </ul>
        </nav>

        {/* Center logo and copyright */}
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <img src="/logos/logo1.svg" alt="GICA" className="w-36 h-auto" />
          </div>
          <div className="text-white/80 text-sm font-sabon">
            © {new Date().getFullYear()} . All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-white/80">
            <a href="#" aria-label="Facebook" className="hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0114.3 6h2.7v3h-2c-.8 0-1.5.7-1.5 1.5V12H17l-.5 3h-3v7A10 10 0 0022 12z"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.46 6c-.77.34-1.6.57-2.46.67a4.26 4.26 0 001.87-2.35 8.5 8.5 0 01-2.7 1.03 4.24 4.24 0 00-7.22 3.87A12.04 12.04 0 013 5.15a4.24 4.24 0 001.31 5.66 4.2 4.2 0 01-1.92-.53v.05a4.24 4.24 0 003.4 4.16 4.26 4.26 0 01-1.9.07 4.24 4.24 0 003.96 2.94A8.5 8.5 0 012 19.54 12.02 12.02 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68v-.53A8.36 8.36 0 0022.46 6z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM17.5 6a1 1 0 110 2 1 1 0 010-2z"/></svg>
            </a>
          </div>
        </div>

        {/* Right column */}
        <nav className="space-y-4 md:text-right md:ml-auto mr-16">
          <h3 className="font-sabon text-lg">{t('programme')}</h3>
          <ul className="space-y-3 text-white/80 text-sm font-sabon">
            <li><a href="#" className="hover:opacity-80">Library</a></li>
            <li><a href="#exhibitions" className="hover:opacity-80">{t('exhibitions')}</a></li>
            <li><a href="#" className="hover:opacity-80">{t('screenings')}</a></li>
            <li><a href="#" className="hover:opacity-80">{t('performances')}</a></li>
            <li><a href="#" className="hover:opacity-80">{t('events')}</a></li>
            <li><a href="#" className="hover:opacity-80">{t('talks')}</a></li>
            <li><a href="#" className="hover:opacity-80">{t('workshops')}</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}


