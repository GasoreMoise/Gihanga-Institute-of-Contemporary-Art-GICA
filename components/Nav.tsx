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

  // Time-based quadrant reveal for the semi-circle Crane
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
    { href: `/${locale}/support`, label: 'Support GICA' },
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

          {/* DYNAMIC LOGO SWAP CONTAINER */}
          <Link
            href={`/${locale}`}
            className="pointer-events-auto relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative flex items-center justify-center">

              {/* 1. BASE LOGO: Disappears on hover */}
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

              {/* 2. CRANE HEAD: Appears and Zooms on hover */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 2.2 : 0.5, // Maximum zoom applied here
                  clipPath: isHovered ? craneClipPath : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <img
                  src="/logos/crane.png"
                  alt="GICA Crane"
                  className={`w-auto object-contain ${scrolled ? 'h-8 md:h-10' : 'h-12 md:h-16'} ${shouldBeBlack ? 'brightness-0' : 'brightness-110'}`}
                />
              </motion.div>
            </div>

            {/* Time Indicator */}
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
              <button onClick={() => switchLocale('en')} className={`${locale === 'en' ? 'opacity-100 font-bold' : 'opacity-40'} hover:opacity-100`}>EN</button>
              <span className="mx-2 opacity-30">/</span>
              <button onClick={() => switchLocale('rw')} className={`${locale === 'rw' ? 'opacity-100 font-bold' : 'opacity-40'} hover:opacity-100`}>KIN</button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="relative w-8 h-8 flex items-center justify-center focus:outline-none">
              <motion.span animate={isOpen ? { rotate: 45, y: 0, backgroundColor: "#000000", width: "100%" } : { rotate: 0, y: -8, backgroundColor: activeIconClass, width: "100%" }} className="absolute h-[1px] left-0 transition-all duration-500" />
              <motion.span animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0, backgroundColor: activeIconClass, width: "70%" }} className="absolute h-[1px] right-0 transition-all duration-500" />
              <motion.span animate={isOpen ? { rotate: -45, y: 0, backgroundColor: "#000000", width: "100%" } : { rotate: 0, y: 8, backgroundColor: activeIconClass, width: "40%" }} className="absolute h-[1px] right-0 transition-all duration-500" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-[#FDFBF7] flex flex-col items-center justify-center font-sabon pointer-events-auto"
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
                    href={item.href as any}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (item.href.includes('#') && pathname === `/${locale}`) {
                        e.preventDefault();
                        const id = item.href.split('#')[1];
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="italic text-xl md:text-3xl tracking-[0.05em] hover:text-black/40 transition-all duration-300 block text-center p-2 relative z-[100]"
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