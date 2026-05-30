'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer, TextPlugin, ScrollTrigger } from 'gsap/all';
import { motion, useMotionValue, useSpring } from 'framer-motion';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Observer, TextPlugin, ScrollTrigger);
}

type Slide = {
  title: string;
  image: { src: string; alt: string };
  leftVideo?: string;
  rightVideo?: string;
  href?: string;
};

export default function Hero({ id, tagline, slides }: { id?: string; tagline: string; slides: Slide[]; }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const taglineRef = useRef<HTMLDivElement>(null);

  const t = useTranslations('landing.hero');
  const locale = useLocale();

  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndexTyping, setCurrentIndexTyping] = useState(0);
  const [particlePositions, setParticlePositions] = useState<Array<{ initialX: number; initialY: number; targetX: number; targetY: number }>>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const activeIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (currentIndex > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndexTyping < tagline.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + tagline[currentIndexTyping]);
        setCurrentIndexTyping(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndexTyping, tagline]);

  useEffect(() => {
    const positions = Array.from({ length: 6 }, () => ({
      initialX: Math.random() * 200 - 100,
      initialY: Math.random() * 100 - 50,
      targetX: Math.random() * 400 - 200,
      targetY: Math.random() * 200 - 100,
    }));
    setParticlePositions(positions);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!taglineRef.current) return;
    const rect = taglineRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) * 0.1);
    mouseY.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  useGSAP(() => {
    if (slides.length === 0) return;
    gsap.set(slidesRef.current, {
      autoAlpha: i => i === activeIndexRef.current ? 1 : 0,
      zIndex: i => i === activeIndexRef.current ? 1 : 0,
      xPercent: 0
    });
    gsap.set(titlesRef.current, {
      autoAlpha: i => i === activeIndexRef.current ? 1 : 0,
      x: i => i === activeIndexRef.current ? 0 : 50,
      y: 0
    });

    const gotoSlide = (index: number, direction: number) => {
      if (index < 0) index = 0;
      if (index >= slides.length) index = slides.length - 1;

      if (isAnimating.current || index === activeIndexRef.current) return;
      isAnimating.current = true;

      const isNext = direction === 1;
      const dX = isNext ? 100 : -100;
      const parallaxX = isNext ? -15 : 15;

      const nextSlide = slidesRef.current[index];
      const currentSlide = slidesRef.current[activeIndexRef.current];
      const nextTitle = titlesRef.current[index];
      const currentTitle = titlesRef.current[activeIndexRef.current];

      activeIndexRef.current = index;
      setCurrentIndex(index);

      gsap.set(currentSlide, { zIndex: 0 });
      gsap.set(nextSlide, { autoAlpha: 1, zIndex: 1, xPercent: dX });
      gsap.set(nextTitle, { autoAlpha: 0, x: isNext ? 100 : -100 });

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power2.inOut" },
        onComplete: () => {
          gsap.set(currentSlide, { autoAlpha: 0 });
          isAnimating.current = false;
        }
      });

      tl.to(currentSlide, { xPercent: parallaxX }, 0)
        .to(nextSlide, { xPercent: 0 }, 0)
        .to(currentTitle, { autoAlpha: 0, x: isNext ? -50 : 50, duration: 0.6 }, 0)
        .to(nextTitle, { autoAlpha: 1, x: 0, duration: 1 }, 0.25);
    };

    const nextSlide = () => {
      if (activeIndexRef.current > 0 && activeIndexRef.current < slides.length - 1) {
        gotoSlide(activeIndexRef.current + 1, 1);
      }
    };
    const prevSlide = () => {
      if (activeIndexRef.current > 1) {
        gotoSlide(activeIndexRef.current - 1, -1);
      }
    };

    const observer = Observer.create({
      target: containerRef.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onLeft: () => !isAnimating.current && activeIndexRef.current > 0 && nextSlide(),
      onRight: () => !isAnimating.current && activeIndexRef.current > 0 && prevSlide(),
      onUp: () => !isAnimating.current && activeIndexRef.current > 0 && nextSlide(),
      onDown: () => !isAnimating.current && activeIndexRef.current > 0 && prevSlide(),
      tolerance: 30,
      preventDefault: false
    });

    const nextBtn = document.getElementById('hero-next');
    const prevBtn = document.getElementById('hero-prev');
    if (nextBtn) nextBtn.onclick = nextSlide;
    if (prevBtn) prevBtn.onclick = prevSlide;

    (window as any).triggerHeroEnter = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => { gotoSlide(1, 1); }, 300);
    };
    (window as any).triggerHeroBack = () => {
      gotoSlide(0, -1);
    };

    return () => observer.kill();
  }, { scope: containerRef, dependencies: [slides] });

  return (
    <section id={id || "hero"} ref={containerRef} className="font-sabon relative h-[100dvh] w-full overflow-hidden bg-[#0a1116] snap-start touch-pan-y select-none isolate">
      {slides.map((slide, i) => (
        <div key={`slide-${i}`} ref={el => { slidesRef.current[i] = el; }} className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform overflow-hidden">

          {slide.leftVideo && slide.rightVideo && (
            <div className="absolute inset-0 flex justify-between pointer-events-none z-0">
              <div className="relative w-[25%] h-full opacity-60">
                <video src={slide.leftVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#0A1116]/80 to-transparent" />
              </div>
              <div className="relative w-[25%] h-full opacity-60">
                <video src={slide.rightVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1116]/80 to-transparent" />
              </div>
            </div>
          )}

          <div className={`relative h-full flex items-center justify-center transition-all duration-1000 brightness-75 z-10 ${slide.leftVideo ? 'w-full md:w-[50%]' : 'w-full'}`}>
            <Image src={slide.image.src} alt={slide.image.alt} fill priority={i === 0} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1116] via-transparent to-transparent opacity-80" />
            {slide.leftVideo && <div className="absolute inset-0 shadow-[0_0_80px_rgba(0,0,0,1)] pointer-events-none" />}
          </div>
        </div>
      ))}

      <div className="absolute inset-0 z-30 flex flex-col pointer-events-none">

        {/* LOCALIZED ENTRY COVERS FOR SLIDE 0 */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${currentIndex === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <h1 className="font-sabon text-white text-3xl md:text-3xl lg:text-5xl font-normal text-center drop-shadow-xl px-4 max-w-5xl leading-tight">
            {t('institutionName')}<br />{t('institutionSubName')}
          </h1>
          <h2 className="font-sabon text-white text-md md:text-xl lg:text-xl tracking-[0.2em] uppercase mt-6 mb-16 text-center drop-shadow-lg">
            {t('locationCity')}
          </h2>
          <button
            onClick={() => (window as any).triggerHeroEnter && (window as any).triggerHeroEnter()}
            className="font-sabon italic text-white text-xl md:text-lg hover:text-white/70 transition-colors pointer-events-auto flex items-center space-x-2 drop-shadow-lg group relative z-50 cursor-pointer"
          >
            <span>Enter</span>
            <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Dynamic Slide Titles for Slide 1+ */}
        <div className={`flex-1 relative w-full pointer-events-none mt-32 md:mt-40 px-6 md:px-16 transition-opacity duration-700 ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'}`}>
          {slides.map((slide, i) => {
            const currentTitleLower = slide.title.toLowerCase().trim();

            // PULL SYSTEM: Extract active translations straight out of next-intl schema values
            const libraryMatch = t('slides.library').toLowerCase().trim();
            const exhibitionsMatch = t('slides.exhibitions').toLowerCase().trim();
            const screeningsMatch = t('slides.screenings').toLowerCase().trim();
            const talksMatch = t('slides.talks').toLowerCase().trim();
            const eventsMatch = t('slides.events').toLowerCase().trim();

            // FALLBACK PAIRING: Keeps standard routing intact if dictionary fails to mount
            let linkHref = "";
            if (currentTitleLower === libraryMatch || currentTitleLower === "the koyo kouoh library") {
              linkHref = `/${locale}/library`;
            } else if (currentTitleLower === exhibitionsMatch || currentTitleLower === "exhibitions") {
              linkHref = `/${locale}/exhibitions`;
            } else if (currentTitleLower === screeningsMatch || currentTitleLower === "screenings") {
              linkHref = `/${locale}/screenings`;
            } else if (currentTitleLower === talksMatch || currentTitleLower === "talks") {
              linkHref = `/${locale}/talks`;
            } else if (currentTitleLower === eventsMatch || currentTitleLower === "events") {
              linkHref = `/${locale}/events`;
            }

            return (
              <h1 key={`title-${i}`} ref={el => { titlesRef.current[i] = el; }} className="font-sabon absolute right-12 text-white text-xl md:text-2xl font-normal tracking-[0.05em] text-right invisible drop-shadow-2xl italic">
                {linkHref ? (
                  <Link 
                    href={linkHref as any} 
                    className="pointer-events-auto hover:text-white/70 transition-colors cursor-pointer relative z-[999] inline-block"
                  >
                    {slide.title}
                  </Link>
                ) : (
                  slide.title
                )}
              </h1>
            );
          })}
        </div>

        {/* Tagline (Visible only on Slide 0) */}
        <div className={`flex justify-between items-end pb-6 md:pb-16 px-6 md:px-10 lg:px-16 w-full transition-opacity duration-700 ${currentIndex === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <motion.div
            className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-4 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              className="flex-shrink-0 cursor-pointer order-2 md:order-1 mt-4 md:mt-0 pointer-events-auto"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.2, y: 0 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <motion.svg
                className="w-4 h-4 md:w-5 md:h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </motion.svg>
            </motion.div>

            <motion.div
              ref={taglineRef}
              className="relative cursor-pointer order-1 md:order-2 pointer-events-auto"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{ x: springX, y: springY }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/2 to-white/5 rounded-lg blur-lg"
                animate={{ opacity: isHovered ? 0.6 : 0, scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.4 }}
              />

              <motion.div
                className="relative z-10 text-white tracking-wider text-lg md:text-xl lg:text-2xl xl:text-2xl font-sabon font-normal max-w-full md:max-w-4xl lg:max-w-6xl xl:max-w-9xl leading-relaxed text-left md:text-left drop-shadow-md"
                animate={{
                  textShadow: isHovered ? "0 0 15px rgba(255, 255, 255, 0.4)" : "0 0 0px rgba(255, 255, 255, 0)",
                  filter: isHovered ? "brightness(1.1)" : "brightness(1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="relative">
                  {displayText}
                  {currentIndexTyping < tagline.length && (
                    <motion.span
                      className="inline-block w-0.5 h-6 md:h-8 bg-white ml-1"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </span>

                {isHovered && particlePositions.length > 0 && (
                  <>
                    {particlePositions.map((pos, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{ x: pos.initialX, y: pos.initialY, opacity: 0, scale: 0 }}
                        animate={{ x: pos.targetX, y: pos.targetY, opacity: [0, 1, 0], scale: [0, 1, 0] }}
                        transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Back to Main Page Button */}
        <div className={`absolute bottom-12 md:bottom-20 left-0 right-0 flex justify-center pointer-events-none transition-opacity duration-700 z-50 ${currentIndex === slides.length - 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}>
          <button
            onClick={() => (window as any).triggerHeroBack && (window as any).triggerHeroBack()}
            className="font-sabon text-white tracking-wider text-lg md:text-xl border border-white/30 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 drop-shadow-lg relative z-50 pointer-events-auto cursor-pointer"
          >
            Back to Main Page
          </button>
        </div>

        {/* Left/Right Navigation Arrows */}
        <button id="hero-prev" className={`absolute left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white p-4 transition-all duration-500 ${currentIndex <= 1 ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 pointer-events-auto scale-100 cursor-pointer'}`}>
          <svg className="w-10 h-10 stroke-[1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button id="hero-next" className={`absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white p-4 transition-all duration-500 ${currentIndex === 0 || currentIndex === slides.length - 1 ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 pointer-events-auto scale-100 cursor-pointer'}`}>
          <svg className="w-10 h-10 stroke-[1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}