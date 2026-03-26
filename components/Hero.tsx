'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
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
  leftVideo?: string;
  rightVideo?: string;
};

export default function Hero({ id, tagline, slides }: { id?: string; tagline: string; slides: Slide[]; }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  const activeIndexRef = useRef(0);
  const isAnimating = useRef(false);
  const locale = useLocale();
  const sabonFont = '"Sabon Next LT", Sabon, serif';

  useGSAP(() => {
    if (taglineRef.current) {
      gsap.set(taglineRef.current, { text: "", fontFamily: sabonFont });
      gsap.to(taglineRef.current, {
        text: tagline,
        duration: Math.min(tagline.length * 0.05, 3),
        ease: "none",
        delay: 0.5,
        onComplete: () => {
          gsap.set(taglineRef.current, { clearProps: "all" });
          if (taglineRef.current) taglineRef.current.style.fontFamily = sabonFont;
        }
      });
    }
    if (chevronRef.current) {
      gsap.to(chevronRef.current, { y: 8, repeat: -1, yoyo: true, ease: "power1.inOut", duration: 1.2 });
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
  }, { scope: containerRef, dependencies: [slides] });

  return (
    <section id={id || "hero"} ref={containerRef} className="font-sabon relative h-screen w-full overflow-hidden bg-[#0a1116] snap-start touch-pan-y select-none isolate">
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

          <div className={`relative h-full flex items-center justify-center transition-all duration-1000 z-10 ${slide.leftVideo ? 'w-full md:w-[50%]' : 'w-full'}`}>
            <Image src={slide.image.src} alt={slide.image.alt} fill priority={i === 0} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1116] via-transparent to-transparent opacity-80" />
            {slide.leftVideo && <div className="absolute inset-0 shadow-[0_0_80px_rgba(0,0,0,1)] pointer-events-none" />}
          </div>
        </div>
      ))}

      <div className="absolute inset-0 z-30 flex flex-col pointer-events-none">
        <div className="flex-1 relative w-full pointer-events-none mt-32 md:mt-40 px-6 md:px-16">
          {slides.map((slide, i) => {
            const lowerTitle = slide.title.toLowerCase();
            const isExhibitionSlide = lowerTitle.includes('exhibition');
            const isScreeningSlide = lowerTitle.includes('screening');
            const isTalksSlide = lowerTitle.includes('talk');
            const isLibrarySlide = lowerTitle.includes('library');
            const isEventsSlide = lowerTitle.includes('events');

            let linkHref = "";
            if (isExhibitionSlide) linkHref = `/${locale}/exhibitions`;
            if (isScreeningSlide) linkHref = `/${locale}/screenings`;
            if (isTalksSlide) linkHref = `/${locale}/talks`;
            if (isLibrarySlide) linkHref = `/${locale}/library`;
            if (isEventsSlide) linkHref = `/${locale}/events`;

            return (
              <h1 key={`title-${i}`} ref={el => { titlesRef.current[i] = el; }} className="font-sabon absolute right-12 text-white text-xl md:text-2xl font-normal tracking-[0.05em] text-right invisible drop-shadow-2xl italic">
                {linkHref ? (
                  <Link href={linkHref as any} className="pointer-events-auto hover:text-white/70 transition-colors">{slide.title}</Link>
                ) : (
                  slide.title
                )}
              </h1>
            );
          })}
        </div>

        <div className="flex justify-between items-end pb-32 md:pb-12 px-6 md:px-10 lg:px-16 pointer-events-auto w-full">
          <div className="group flex items-center space-x-4 cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            <div ref={chevronRef} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
            </div>
            <p ref={taglineRef} className="font-sabon text-white text-lg md:text-2xl tracking-wide italic font-light drop-shadow-md leading-relaxed">{tagline}</p>
          </div>
        </div>

        <button id="hero-prev" className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white p-4 pointer-events-auto transition-all duration-500">
          <svg className="w-10 h-10 stroke-[1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button id="hero-next" className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white p-4 pointer-events-auto transition-all duration-500">
          <svg className="w-10 h-10 stroke-[1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}