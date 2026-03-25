'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer, TextPlugin, ScrollTrigger } from 'gsap/all';

if (typeof window !== "undefined") {
  // Registering TextPlugin is vital for the typewriter effect
  gsap.registerPlugin(useGSAP, Observer, TextPlugin, ScrollTrigger);
}

type Slide = {
  title: string;
  image: { src: string; alt: string };
};

export default function Hero({
  id,
  tagline,
  slides,
}: {
  id?: string;
  tagline: string;
  slides: Slide[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const isAnimating = useRef(false);
  const locale = useLocale();

  // Define the font stack as a constant to ensure consistency
  const sabonFont = '"Sabon Next LT", Sabon, serif';

  useGSAP(() => {
    if (taglineRef.current) {
      // Set the font BEFORE the animation starts
      gsap.set(taglineRef.current, {
        text: "",
        fontFamily: sabonFont
      });

      gsap.to(taglineRef.current, {
        text: tagline,
        duration: Math.min(tagline.length * 0.05, 3),
        ease: "none",
        delay: 0.5,
        // onComplete ensures that GSAP doesn't leave any messy inline styles 
        // that might break the font family
        onComplete: () => {
          gsap.set(taglineRef.current, { clearProps: "all" });
          if (taglineRef.current) taglineRef.current.style.fontFamily = sabonFont;
        }
      });
    }

    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1.2
      });
    }
  }, { scope: containerRef });

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
      y: 0,
      fontFamily: sabonFont // Force it here too
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
      setCurrentIndex(nextIndex);

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

    const nextSlide = () => gotoSlide(activeIndexRef.current + 1, 1);
    const prevSlide = () => gotoSlide(activeIndexRef.current - 1, -1);

    Observer.create({
      target: containerRef.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onLeft: () => !isAnimating.current && nextSlide(),
      onRight: () => !isAnimating.current && prevSlide(),
      tolerance: 30,
      preventDefault: false
    });

    const nextBtn = document.getElementById('hero-next');
    const prevBtn = document.getElementById('hero-prev');
    if (nextBtn) nextBtn.onclick = nextSlide;
    if (prevBtn) prevBtn.onclick = prevSlide;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: false,
    });

  }, { scope: containerRef });

  return (
    <section
      id={id || "hero"}
      ref={containerRef}
      className="font-sabon relative h-screen w-full overflow-hidden bg-[#0b0b0b] snap-start touch-pan-y select-none cursor-grab active:cursor-grabbing isolate"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </div>
      ))}

      {/* Interface Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">

        {/* Dynamic Slide Titles */}
        <div className="flex-1 relative w-full pointer-events-none mt-32 md:mt-40 px-6 md:px-16">
          {slides.map((slide, i) => {
            // Check if this slide title refers to exhibitions
            const isExhibitionSlide = slide.title.toLowerCase().includes('exhibition');

            return (
              <h1
                key={`title-${i}`}
                ref={el => { titlesRef.current[i] = el; }}
                className="font-sabon absolute right-12 text-white text-xl md:text-2xl font-normal tracking-widest text-right invisible drop-shadow-2xl italic"
              >
                {isExhibitionSlide ? (
                  <Link
                    href={`/${locale}/exhibitions`}
                    className="pointer-events-auto hover:text-white/70 transition-colors decoration-white/30"
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

        {/* Footer info (Tagline with Chevron) */}
        <div className="flex justify-between items-end pb-32 md:pb-12 px-6 md:px-10 lg:px-16 pointer-events-auto w-full">
          <div
            className="group flex items-center space-x-2 md:space-x-6 cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div ref={chevronRef}>
              <svg className="w-6 h-6 md:w-8 md:h-8 text-white stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <p
              ref={taglineRef}
              className="font-sabon text-white text-xl md:text-3xl tracking-wide drop-shadow-md leading-relaxed italic"
            >
              {tagline}
            </p>
          </div>
        </div>

        {/* Arrows... */}
        <button id="hero-prev" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 pointer-events-auto transition-all duration-300 hover:scale-110">
          <svg className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button id="hero-next" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 pointer-events-auto transition-all duration-300 hover:scale-110">
          <svg className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}