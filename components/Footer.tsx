'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  
  return (
    <footer className="bg-[#0f2430] text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12 py-12 md:py-16">
        {/* Mobile: Single column layout */}
        <div className="flex flex-col items-center text-center space-y-8 md:hidden">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center gap-4">
            <img src="/logos/logo1.svg" alt="GICA" className="w-24 h-auto" />
            <div className="text-white/80 text-sm font-sabon">
              © {new Date().getFullYear()} GICA. All rights reserved.
            </div>
          </div>
          
          {/* Navigation links */}
          <div className="flex flex-col items-center w-full space-y-8">
            {/* Home section */}
            <div className="w-full max-w-sm">
              <h4 className="font-sabon text-base text-white mb-3 text-center">{t('home')}</h4>
              <div className="grid grid-cols-2 gap-4 text-sm font-sabon text-white/80">
                <a href="#about" className="hover:opacity-80">{t('about')}</a>
                <a href="#programme" className="hover:opacity-80">{t('programme')}</a>
                <a href="#visit" className="hover:opacity-80">{t('visit')}</a>
                <a href="#contact" className="hover:opacity-80">{t('contact')}</a>
              </div>
            </div>

            {/* Programme section */}
            <div className="w-full max-w-sm">
              <h4 className="font-sabon text-base text-white mb-3 text-center">{t('programme')}</h4>
              <div className="grid grid-cols-2 gap-4 text-sm font-sabon text-white/80">
                <a href="#" className="hover:opacity-80">Library</a>
                <a href="#exhibitions" className="hover:opacity-80">{t('exhibitions')}</a>
                <a href="#" className="hover:opacity-80">{t('screenings')}</a>
                <a href="#" className="hover:opacity-80">{t('performances')}</a>
                <a href="#" className="hover:opacity-80">{t('events')}</a>
                <a href="#" className="hover:opacity-80">{t('talks')}</a>
                <a href="#" className="hover:opacity-80">{t('workshops')}</a>
              </div>
            </div>
          </div>
          
          {/* Social media */}
          <div className="flex items-center gap-6 text-white/80">
            <a href="https://www.linkedin.com/in/gihanga-institute-of-contemporary-art-gica-23704b391" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://x.com/GICA_Kigali" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.instagram.com/gica.kigali/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM17.5 6a1 1 0 110 2 1 1 0 010-2z"/></svg>
            </a>
          </div>
        </div>

        {/* Desktop: Three column layout */}
        <div className="hidden md:grid grid-cols-3 gap-12 items-start">
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
              © {new Date().getFullYear()} GICA. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <a href="https://www.linkedin.com/in/gihanga-institute-of-contemporary-art-gica-23704b391" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
               <a href="https://x.com/GICA_Kigali" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:opacity-80">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
               <a href="https://www.instagram.com/gica.kigali/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM17.5 6a1 1 0 110 2 1 1 0 010-2z"/></svg>
              </a>
            </div>
          </div>

          {/* Right column */}
          <nav className="space-y-4 text-right ml-auto mr-16">
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
      </div>
    </footer>
  );
}


