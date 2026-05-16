'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const footerRef = useRef<HTMLElement>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(".footer-anim-item", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    });
  }, { scope: footerRef });

  const socialLinks = [
    {
      name: 'X',
      url: 'https://x.com/GICA_Kigali',
      icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/gica.kigali/',
      icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.848 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.62 6.777 6.98 6.977 1.28.057 1.688.072 4.948.072s3.667-.015 4.947-.072c4.351-.2 6.77-2.618 6.97-6.977.058-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.2-4.353-2.619-6.777-6.977-6.977C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@gica.kigali', // Standard structural institutional path
      icon: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    }
  ];

  // Updated layout alignment matching your precise order specifications
  const gicaLinks = [
    { name: 'About', path: `/${locale}/#about` },
    { name: 'Visit GICA', path: `/${locale}/#visit` },
    { name: 'Memberships', path: `/${locale}/memberships` },
    { name: 'Support Us', path: `/${locale}/support` },
    { name: 'Contact', path: `/${locale}/#contact` },
    { name: 'Press', path: `/${locale}/#press` },
  ];

  const progLinks = [
    { name: 'Library', path: `/${locale}/library` },
    { name: 'Exhibitions', path: `/${locale}/exhibitions` },
    { name: 'Screenings', path: `/${locale}/screenings` },
    { name: 'Talks', path: `/${locale}/talks` },
    { name: 'Events', path: `/${locale}/events` }
  ];

  return (
    <footer ref={footerRef} className="bg-[#11212B] text-white pt-20 pb-10 border-t border-white/5 w-full">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-3 gap-8 items-start mb-20">

          {/* LEFT COLUMN: GICA STRUCTURAL NAV */}
          <nav className="footer-anim-item flex flex-col space-y-8">
            <h3 className="font-sabon text-2xl tracking-wide opacity-90">GICA</h3>
            <ul className="flex flex-col space-y-3 text-white/50 text-base font-sabon">
              {gicaLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path as any} className="hover:text-white transition-all duration-300 hover:pl-2">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CENTER COLUMN: IDENTITY & SOCIALS */}
          <div className="footer-anim-item flex flex-col items-center">
            <div className="mb-10 w-48">
              <img src="/logos/logo1.svg" alt="GICA Logo" className="w-full h-auto" />
            </div>
            <p className="text-white/40 text-sm font-sabon tracking-[0.2em] uppercase">
              © {currentYear} . All rights reserved.
            </p>
            <div className="flex items-center gap-8 mt-12">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-all transform hover:-translate-y-1"
                  title={social.name}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">{social.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: PROGRAMME LINKS */}
          <nav className="footer-anim-item flex flex-col items-end space-y-8">
            <h3 className="font-sabon text-3xl tracking-wide opacity-90">Programme</h3>
            <ul className="flex flex-col items-end space-y-5 text-white/40 text-base font-sabon">
              {progLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.path as any} className="hover:text-white transition-all duration-300 hover:pr-2">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center pt-6 pb-4">
          <div className="mb-12 footer-anim-item">
            <img src="/logos/logo1.svg" alt="GICA Logo" className="w-48 h-auto" />
          </div>

          <div className="grid grid-cols-2 w-full gap-x-10 mb-16 footer-anim-item">
            {/* MOBILE LEFT COLUMN */}
            <nav className="flex flex-col space-y-5">
              <h4 className="font-sabon text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold border-b border-white/5 pb-2">GICA</h4>
              <ul className="flex flex-col space-y-3 text-white/60 text-xs font-sabon italic">
                {gicaLinks.map(link => (
                  <li key={link.name}>
                    <Link href={link.path as any}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* MOBILE RIGHT COLUMN */}
            <nav className="flex flex-col space-y-5 text-right">
              <h4 className="font-sabon text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold border-b border-white/5 pb-2">Programme</h4>
              <ul className="flex flex-col space-y-3 text-white/60 text-xs font-sabon italic">
                {progLinks.map(item => (
                  <li key={item.name}>
                    <Link href={item.path as any}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* MOBILE BOTTOM BAR */}
          <div className="w-full flex flex-col items-center gap-8 border-t border-white/5 pt-10 footer-anim-item">
            <div className="flex gap-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">{social.icon}</svg>
                </a>
              ))}
            </div>
            <p className="text-white/20 text-[9px] tracking-[0.4em] uppercase font-bold font-sabon mb-2">
              © {currentYear} . GICA RWANDA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}