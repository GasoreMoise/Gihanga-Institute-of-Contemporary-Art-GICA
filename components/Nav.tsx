'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
    { href: `/${locale}/#about`, label: 'About' },
    { href: `/${locale}/team`, label: 'Team' },
    { href: `/${locale}/#visit`, label: 'Visit' },
    { href: `/${locale}/membership`, label: 'Membership' },
    { href: `/${locale}/support`, label: 'Support' },
    { href: `/${locale}/#contact`, label: 'Contact' }
  ];

  const isWhitePage = pathname.includes('/exhibitions') || pathname.includes('/library') ||
    pathname.includes('/events') || pathname.includes('/visit') ||
    pathname.includes('/book') || pathname.includes('/talks');

  const shouldBeBlack = scrolled || isOpen || isWhitePage;
  const activeColorClass = shouldBeBlack ? "text-black" : "text-white";

  const charVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.03 * i }
    })
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[200] px-6 md:px-12 transition-all duration-700 ${scrolled ? 'py-3 bg-white/10 backdrop-blur-xl border-b border-black/5' : 'py-8 md:py-12 bg-transparent'}`}>
        <div className="max-w-[1600px] mx-auto flex justify-between items-center relative">

          <Link
            href={`/${locale}`}
            className="pointer-events-auto relative flex items-center justify-center cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative flex items-center justify-center">
              <motion.img
                src={shouldBeBlack ? "/logos/logo3.svg" : "/logos/logo1.svg"}
                alt="GICA Logo"
                animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.8 : 1 }}
                className={`w-auto object-contain transition-all duration-700 ${scrolled ? 'h-8 md:h-10' : 'h-12 md:h-16'}`}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 2.2 : 0.5,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <img
                  src="/logos/crane.png"
                  alt="GICA Crane"
                  className={`w-auto object-contain transition-all duration-700 ${scrolled ? 'h-8 md:h-10' : 'h-12 md:h-16'} ${shouldBeBlack ? 'brightness-0' : 'brightness-111'}`}
                />
              </motion.div>
            </div>
          </Link>

          <div className="flex items-center gap-6 md:gap-10 pointer-events-auto relative z-[210]">
            <div className={`flex items-center font-sabon text-sm md:text-lg tracking-widest transition-colors duration-500 ${activeColorClass}`}>
              <button onClick={() => switchLocale('en')} className="opacity-40 hover:opacity-100 cursor-pointer p-2">EN</button>
              <span className="opacity-30">/</span>
              <button onClick={() => switchLocale('rw')} className="opacity-40 hover:opacity-100 cursor-pointer p-2">KIN</button>
            </div>

            {/* MAIN TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-10 h-10 flex items-center justify-center focus:outline-none cursor-pointer group transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              style={{ zIndex: 300 }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.span
                  animate={{ y: -6, backgroundColor: shouldBeBlack ? "#000000" : "#ffffff" }}
                  className="absolute h-[1.5px] w-full transition-all duration-500"
                />
                <motion.span
                  animate={{ opacity: 1, backgroundColor: shouldBeBlack ? "#000000" : "#ffffff" }}
                  className="absolute h-[1.5px] w-[70%] right-0 transition-all duration-500"
                />
                <motion.span
                  animate={{ y: 6, backgroundColor: shouldBeBlack ? "#000000" : "#ffffff" }}
                  className="absolute h-[1.5px] w-[40%] right-0 transition-all duration-500"
                />
              </div>
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
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[250] bg-[#FDFBF7] flex flex-col items-center justify-center font-sabon pointer-events-auto"
          >
            {/* CLEAN CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 md:top-12 right-6 md:right-12 group flex items-center gap-4 cursor-pointer z-[300] p-4"
              aria-label="Close menu"
            >
              <span className="text-[9px] tracking-[0.5em] uppercase font-bold opacity-0 group-hover:opacity-60 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">Close</span>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute w-full h-[1.5px] bg-black rotate-45" />
                <div className="absolute w-full h-[1.5px] bg-black -rotate-45" />
              </div>
            </button>

            <nav className="flex flex-col items-center space-y-3 md:space-y-4 text-black relative z-[260]">
              {navItems.map((item, index) => (
                <div key={item.label} className="overflow-hidden py-1">
                  <Link
                    href={item.href as any}
                    onClick={(e) => {
                      setIsOpen(false);
                      const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
                      if (item.href.includes('#') && isHome) {
                        e.preventDefault();
                        const id = item.href.split('#')[1];
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group relative block text-center cursor-pointer px-8"
                  >
                    <div className="relative flex overflow-hidden italic text-2xl md:text-3xl tracking-[0.08em] hover:text-black/40 transition-colors duration-500 p-2">
                      {item.label.split("").map((char, i) => (
                        <motion.span
                          key={i}
                          custom={i + index * 5}
                          variants={charVariants}
                          initial="initial"
                          animate="animate"
                          className="inline-block"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </div>
                    <motion.div
                      className="h-[1px] bg-black/10 w-0 group-hover:w-full transition-all duration-700 ease-out mx-auto"
                    />
                  </Link>
                </div>
              ))}
            </nav>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pointer-events-none opacity-[0.015]">
              <img src="/logos/crane.png" alt="" className="w-full h-auto max-w-[60%] grayscale" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}