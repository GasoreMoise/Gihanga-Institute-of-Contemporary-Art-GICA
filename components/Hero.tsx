'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer, TextPlugin, ScrollTrigger } from 'gsap/all';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Observer, TextPlugin, ScrollTrigger);
}

type Slide = {
  title: string;
  image: { src: string; alt: string };
};

export default function Hero({
  tagline,
  slides,
  programmeData
}: {
  tagline: string;
  slides: Slide[];
  programmeData?: {
    title: string;
    description: string;
    menuItems: { label: string }[];
    backgroundImage: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  };
}) {
  const [isProgrammeOpen, setIsProgrammeOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const isAnimating = useRef(false);

  const switchLocale = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') as any);
  };

  useGSAP(() => {
    // Typewriter effect for tagline on initial load
    if (taglineRef.current) {
      gsap.set(taglineRef.current, { text: "" });
      gsap.to(taglineRef.current, {
        text: tagline,
        duration: Math.min(tagline.length * 0.05, 3),
        ease: "none",
        delay: 0.5
      });
    }

    // Gentle bounce animation for the chevron
    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1.2
      });
    }
  }, { scope: containerRef, dependencies: [] });

  useGSAP(() => {
    if (slides.length === 0) return;

    // Initial setup: position slides and titles
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
      const nextIndex = gsap.utils.wrap(0, slides.length, index);
      if (isAnimating.current || nextIndex === activeIndexRef.current) return;
      isAnimating.current = true;
      
      const isNext = direction === 1;
      const dX = isNext ? 100 : -100;
      const parallaxX = isNext ? -15 : 15;
      
      const nextSlide = slidesRef.current[nextIndex];
      const currentSlide = slidesRef.current[activeIndexRef.current];

      const nextTitle = titlesRef.current[nextIndex];
      const currentTitle = titlesRef.current[activeIndexRef.current];

      activeIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex); // Update React state for UI (arrows, etc.)

      // Prepare next slide position: stacked visually on top of current
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
        .to(currentTitle, { autoAlpha: 0, x: isNext ? -50 : 50, duration: 0.6, ease: "power1.in" }, 0)
        .to(nextTitle, { autoAlpha: 1, x: 0, duration: 1, ease: "power2.out" }, 0.25);
    };

    const nextSlide = () => gotoSlide(activeIndexRef.current + 1, 1);
    const prevSlide = () => gotoSlide(activeIndexRef.current - 1, -1);

    const observer = Observer.create({
      target: containerRef.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onLeft: () => !isAnimating.current && nextSlide(),
      onRight: () => !isAnimating.current && prevSlide(),
      tolerance: 30, // Increase slightly so light taps don't trigger it
      preventDefault: false // Let the browser handle vertical scrolling pan-y
    });

    // Cleanup navigation links for buttons
    const nextBtn = document.getElementById('hero-next');
    const prevBtn = document.getElementById('hero-prev');
    if (nextBtn) nextBtn.onclick = nextSlide;
    if (prevBtn) prevBtn.onclick = prevSlide;

    // Pin the hero section during native vertical scrolling so the next section visually slides "over" it (Curtain Wipe effect)
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=100%", // Maintain pin for exactly one screen height so the slide over completes
      pin: true,
      pinSpacing: false, // Prevents pushing lower content down, allowing it to slide over perfectly
    });

  }, { scope: containerRef, dependencies: [] });

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden bg-[#0b0b0b] snap-start touch-pan-y select-none cursor-grab active:cursor-grabbing"
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={`slide-${i}`}
          ref={el => { slidesRef.current[i] = el; }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            priority={i === 0}
            className="object-cover"
          />
          {/* Subtle gradient to ensure white text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </div>
      ))}

      {/* Interface Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">

        {/* Header with Logo and Navigation */}
        <header className="flex justify-between items-start px-6 md:px-10 lg:px-12 py-4 md:py-5 lg:py-7 pointer-events-auto">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 mb-2 cursor-pointer transition-transform hover:scale-105 duration-500">
            <img src="/logos/logo4.svg" alt="GICA Logo" className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 drop-shadow-lg" />
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-8 md:space-x-12 lg:space-x-20 mt-2 md:mt-3 lg:mt-5">
            <button
              className="text-white text-lg md:text-xl font-sabon font-normal cursor-pointer hover:text-gray-300 transition-colors drop-shadow-md"
              onClick={() => {
                const next = locale === 'en' ? 'rw' : 'en';
                switchLocale(next);
              }}
            >
              <span className={locale === 'en' ? 'opacity-100' : 'opacity-60'}>EN</span>
              <span className="mx-1 opacity-60">/</span>
              <span className={locale === 'rw' ? 'opacity-100' : 'opacity-60'}>KIN</span>
            </button>
            <button
              className="text-white hover:text-gray-300 transition-transform hover:scale-105 duration-300 drop-shadow-md"
              onClick={() => setIsProgrammeOpen(true)}
            >
              <img src="/logos/navbar.svg" alt="Navigation Menu" className="w-12 h-12 md:w-14 lg:w-16" />
            </button>
          </div>
        </header>

        {/* Dynamic Slide Titles (Right-aligned, matching wireframe) */}
        <div className="flex-1 relative w-full pointer-events-none">
          {slides.map((slide, i) => (
            <h1
              key={`title-${i}`}
              ref={el => { titlesRef.current[i] = el; }}
              className="absolute right-6 md:right-16 lg:right-16 -top-4 md:-top-12 text-white text-lg md:text-2xl lg:text-2xl xl:text-2xl font-sabon font-normal tracking-wide text-right invisible drop-shadow-2xl"
            >
              {slide.title}
            </h1>
          ))}
        </div>

        {/* Footer info (Tagline with Chevron) */}
        <div className="flex justify-between items-end pb-36 md:pb-12 px-6 md:px-10 lg:px-16 pointer-events-auto w-full">
          <div className="group flex items-center space-x-4 md:space-x-6 cursor-pointer opacity-90 hover:opacity-100 transition-opacity duration-500 max-w-full">
            <div ref={chevronRef} className="flex-shrink-0" id="about-chevron" title="Scroll to About" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              <svg className="w-6 h-6 md:w-8 md:h-8 text-white stroke-[2.5] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <p ref={taglineRef} className="text-white font-sabon text-xl md:text-2xl lg:text-3xl tracking-wide max-w-[85vw] md:max-w-none md:whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-md leading-relaxed transition-all duration-700 ease-out group-hover:tracking-wider group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
              {tagline}
            </p>
          </div>
        </div>

        {/* Left/Right Arrows for Desktop/Tablet */}
        <button
          id="hero-prev"
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-white p-4 pointer-events-auto transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-110`}
          aria-label="Previous slide"
        >
          <svg className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          id="hero-next"
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-white p-4 pointer-events-auto transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-110`}
          aria-label="Next slide"
        >
          <svg className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Programme Modal */}
      {programmeData && isProgrammeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md pointer-events-auto" onClick={() => setIsProgrammeOpen(false)}>
          <div className="absolute inset-0">
            <Image
              src={programmeData.backgroundImage.src}
              alt={programmeData.backgroundImage.alt}
              fill
              className="object-cover opacity-50"
              quality={75}
            />
          </div>

          <button
            className="absolute top-6 right-6 z-50 text-white hover:text-gray-300 transition-transform hover:scale-110 p-2"
            onClick={(e) => { e.stopPropagation(); setIsProgrammeOpen(false); }}
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 text-white px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-sabon mb-6">{programmeData.title}</h2>
              <p className="text-lg md:text-xl text-gray-200 font-sabon max-w-md">{programmeData.description}</p>
            </div>
            <div className="flex flex-col justify-center items-start md:items-end">
              <ul className="space-y-6 md:space-y-10">
                {programmeData.menuItems.map((item, idx) => (
                  <li key={idx}>
                    <button
                      className="text-2xl md:text-3xl lg:text-4xl origin-right font-sabon hover:text-gray-300 hover:scale-105 transition-all duration-300"
                      onClick={() => setIsProgrammeOpen(false)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
