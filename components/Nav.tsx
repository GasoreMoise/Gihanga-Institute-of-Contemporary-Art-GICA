'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [kigaliHour, setKigaliHour] = useState(new Date().getUTCHours() + 2);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const updateKigaliTime = () => {
      const now = new Date();
      const kigaliTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Kigali',
        hour: 'numeric',
        hour12: false,
      }).format(now);
      setKigaliHour(parseInt(kigaliTime));
    };
    updateKigaliTime();
    const interval = setInterval(updateKigaliTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const craneClipPath = useMemo(() => {
    if (kigaliHour >= 0 && kigaliHour < 6) return 'polygon(0% 0%, 25% 0%, 25% 100%, 0% 100%)';
    if (kigaliHour >= 6 && kigaliHour < 12) return 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)';
    if (kigaliHour >= 12 && kigaliHour < 18) return 'polygon(0% 0%, 75% 0%, 75% 100%, 0% 100%)';
    return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  }, [kigaliHour]);

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
    { href: `/${locale}/visit`, label: 'Visitor Guide' },
    { href: `/${locale}/book`, label: 'Book Your Visit' },
    { href: `/${locale}/#contact`, label: 'Contact' }
  ];

  const isWhitePage = pathname.includes('/exhibitions') || pathname.includes('/library') ||
    pathname.includes('/events') || pathname.includes('/visit') ||
    pathname.includes('/book') || pathname.includes('/talks');

  const shouldBeBlack = scrolled || isOpen || isWhitePage;
  const activeColorClass = shouldBeBlack ? "text-black" : "text-white";
  const activeIconClass = shouldBeBlack ? "#000000" : "#ffffff";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 transition-all duration-700 ${scrolled ? 'py-3 bg-white/10 backdrop-blur-xl border-b border-black/5' : 'py-8 md:py-12 bg-transparent'}`}>
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">

          <Link
            href={`/${locale}`}
            className="pointer-events-auto relative flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative flex items-center justify-center">
              <motion.img
                src={shouldBeBlack ? "/logos/logo3.svg" : "/logos/logo1.svg"}
                alt="GICA Logo"
                animate={{
                  opacity: isHovered ? 0 : 1,
                  scale: isHovered ? 0.8 : 1
                }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className={`w-auto object-contain ${scrolled ? 'h-8 md:h-10' : 'h-12 md:h-16'}`}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 2.2 : 0.5,
                  clipPath: isHovered ? craneClipPath : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <img
                  src="/logos/crane.png"
                  alt="GICA Crane"
                  className={`w-auto object-contain ${scrolled ? 'h-8 md:h-10' : 'h-12 md:h-16'} ${shouldBeBlack ? 'brightness-0' : 'brightness-110'}`}
                />
              </motion.div>
            </div>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.6, y: 25 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute text-[7px] tracking-[0.5em] uppercase font-bold whitespace-nowrap ${activeColorClass}`}
                >
                  KGL {kigaliHour}:00
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          <div className="flex items-center gap-6 md:gap-10 pointer-events-auto relative z-[110]">
            <div className={`flex items-center font-sabon text-sm md:text-lg tracking-widest transition-colors duration-500 ${activeColorClass}`}>
              <button onClick={() => switchLocale('en')} className={`${locale === 'en' ? 'opacity-100 font-bold' : 'opacity-40'} hover:opacity-100 cursor-pointer`}>EN</button>
              <span className="mx-2 opacity-30">/</span>
              <button onClick={() => switchLocale('rw')} className={`${locale === 'rw' ? 'opacity-100 font-bold' : 'opacity-40'} hover:opacity-100 cursor-pointer`}>KIN</button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="relative w-8 h-8 flex items-center justify-center focus:outline-none cursor-pointer">
              <motion.span animate={isOpen ? { rotate: 45, y: 0, backgroundColor: "#000000", width: "100%" } : { rotate: 0, y: -8, backgroundColor: activeIconClass, width: "100%" }} className="absolute h-[1px] left-0 transition-all duration-500" />
              <motion.span animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0, backgroundColor: activeIconClass, width: "70%" }} className="absolute h-[1px] right-0 transition-all duration-500" />
              <motion.span animate={isOpen ? { rotate: -45, y: 0, backgroundColor: "#000000", width: "100%" } : { rotate: 0, y: 8, backgroundColor: activeIconClass, width: "40%" }} className="absolute h-[1px] right-0 transition-all duration-500" />
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
            className="fixed inset-0 z-[120] bg-[#FDFBF7] flex flex-col items-center justify-center font-sabon pointer-events-auto"
          >
            {/* CLOSE BUTTON INSIDE MENU */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 md:top-12 right-6 md:right-12 group flex items-center gap-4 cursor-pointer z-[130]"
            >
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">Close</span>
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute w-full h-[1px] bg-black rotate-45" />
                <div className="absolute w-full h-[1px] bg-black -rotate-45" />
              </div>
            </button>

            <nav className="flex flex-col items-center space-y-10 md:space-y-8 text-black relative z-[130]">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.8, ease: "circOut" }}
                  className="relative pointer-events-auto"
                  style={{ zIndex: 100 - index }}
                >
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
                    className="italic text-xl md:text-3xl tracking-[0.05em] hover:text-black/40 transition-all duration-300 block text-center p-6 cursor-pointer relative z-[200] pointer-events-auto"
                  >
                    <span className="pointer-events-none">{item.label}</span>
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