'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Sensitivity threshold for the shrink effect
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') as any);
  };

  const navItems = [
    { href: `/${locale}#about` as any, label: 'About' },
    { href: `/${locale}/visit` as any, label: 'Visitor Guide' },
    { href: `/${locale}/book` as any, label: 'Book Your Visit' },
    { href: `/${locale}/support` as any, label: 'Support GICA' },
    { href: `/${locale}#contact` as any, label: 'Contact' }
  ];

  const isWhitePage = pathname.includes('/exhibitions');
  const shouldBeBlack = scrolled || isOpen || isWhitePage;
  const activeColorClass = shouldBeBlack ? "text-black" : "text-white";
  const activeIconClass = shouldBeBlack ? "#000000" : "#ffffff";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] px-6 md:px-12 transition-all duration-700 ease-in-out
          ${scrolled
            ? 'py-3 bg-white/10 backdrop-blur-xl border-b border-black/5'
            : 'py-8 md:py-12 bg-transparent'
          }`}
      >
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">

          <Link href={`/${locale}`} className="pointer-events-auto">
            <img
              src={shouldBeBlack ? "/logos/logo1.svg" : "/logos/logo1.svg"}
              alt="GICA"
              /* LOGO SCALING: 
                 Transitions from h-12 to h-8 (mobile) 
                 and h-16 to h-10 (desktop)
              */
              className={`w-auto transition-all duration-700 ease-in-out object-contain
                ${scrolled
                  ? 'h-8 md:h-10'
                  : 'h-12 md:h-16'
                }`}
            />
          </Link>

          <div className="flex items-center gap-6 md:gap-10 pointer-events-auto">

            {/* EN / KIN Toggle */}
            <div className={`flex items-center font-sabon text-sm md:text-lg tracking-widest transition-colors duration-500 ${activeColorClass}`}>
              <button
                onClick={() => switchLocale('en')}
                className={`${locale === 'en' ? 'opacity-100 font-bold' : 'opacity-40'} hover:opacity-100 transition-opacity`}
              >
                EN
              </button>
              <span className="mx-2 opacity-30">/</span>
              <button
                onClick={() => switchLocale('rw')}
                className={`${locale === 'rw' ? 'opacity-100 font-bold' : 'opacity-40'} hover:opacity-100 transition-opacity`}
              >
                KIN
              </button>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-8 h-8 flex items-center justify-center focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 0, backgroundColor: "#000000", width: "100%" } : { rotate: 0, y: -8, backgroundColor: activeIconClass, width: "100%" }}
                className="absolute h-[1px] left-0 transition-all duration-500"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0, backgroundColor: activeIconClass, width: "70%" }}
                className="absolute h-[1px] right-0 transition-all duration-500"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: 0, backgroundColor: "#000000", width: "100%" } : { rotate: 0, y: 8, backgroundColor: activeIconClass, width: "40%" }}
                className="absolute h-[1px] right-0 transition-all duration-500"
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] bg-[#FDFBF7] flex flex-col items-center justify-center font-sabon"
          >
            <nav className="flex flex-col items-center space-y-10 md:space-y-14 text-black">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.8, ease: "circOut" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="italic text-3xl md:text-5xl tracking-[0.05em] hover:text-black/40 transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}