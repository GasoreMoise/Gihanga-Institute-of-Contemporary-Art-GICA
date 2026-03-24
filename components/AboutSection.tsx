'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText, ScrollTrigger } from 'gsap/all';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
}

export default function AboutSection() {
  const t = useTranslations('landing');
  const containerRef = useRef<HTMLElement>(null);
  
  // Dedicated refs to fully isolate text nodes from React's Virtual DOM reconciliation engine
  const bodyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const gihangaRef = useRef<HTMLDivElement>(null);
  const symbolRef = useRef<HTMLDivElement>(null);

  // Capture translation strings safely as dependencies
  const bodyText = t('about.body');
  const missionText = t('about.mission');
  const gihangaText = t('about.gihanga');
  const symbolText = t('about.symbol');

  useGSAP(() => {
    // 1. Manually inject text outside of React's lifecycle.
    // This physically prevents React from throwing 'insertBefore' NotFoundErrors,
    // because React's Virtual DOM assumes these wrapper divs are eternally empty!
    if (bodyRef.current) bodyRef.current.innerHTML = bodyText;
    if (missionRef.current) missionRef.current.innerHTML = missionText;
    if (gihangaRef.current) gihangaRef.current.innerHTML = gihangaText;
    if (symbolRef.current) symbolRef.current.innerHTML = symbolText;

    const textElements = [
      bodyRef.current, 
      missionRef.current, 
      gihangaRef.current, 
      symbolRef.current
    ].filter(Boolean) as HTMLElement[];

    const splits: SplitText[] = [];
    
    textElements.forEach((el) => {
      // Natively split without double-spooling
      const split = new SplitText(el, { 
        type: "lines, words", 
        linesClass: "overflow-hidden w-full",
        wordsClass: "inline-block" 
      });

      splits.push(split);

      split.lines.forEach((lineElement) => {
        const line = lineElement as HTMLElement;
        line.style.textAlign = "justify";
        line.style.textAlignLast = "justify";
      });

      gsap.from(split.words, {
        yPercent: 120,
        autoAlpha: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        }
      });
    });

    gsap.from('.fade-in-element', {
      autoAlpha: 0,
      y: 30,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });
    
    // Unspool GSAP directly cleanly during unmount
    return () => {
      splits.forEach(s => s.revert());
    };

  }, { scope: containerRef, dependencies: [bodyText, missionText, gihangaText, symbolText] });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0a1116] flex flex-col items-center justify-center py-10 md:py-12 lg:py-16 px-6 md:px-12 lg:px-20 xl:px-32 snap-start"
    >
      <div className="w-full mx-auto flex flex-col justify-between h-full gap-8 md:gap-10 lg:gap-12">

        {/* Title */}
        <div className="text-center fade-in-element flex-shrink-0">
          <h2 className="text-white text-2xl md:text-3xl lg:text-3xl font-sabon font-normal tracking-wide">
            {t('about.title')}
          </h2>
        </div>

        {/* Main Body */}
        <div 
          ref={bodyRef}
          className="w-full text-white text-opacity-90 font-sabon text-sm md:text-lg lg:text-xl xl:text-lg leading-relaxed lg:leading-[1.6] text-justify"
        ></div>

        {/* Mission (Right aligned) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          <div className="col-span-1 md:col-span-6 hidden md:block"></div>
          <div 
            ref={missionRef}
            className="col-span-1 md:col-span-6 text-white text-opacity-80 font-sabon text-xs md:text-sm lg:text-base leading-relaxed lg:leading-loose tracking-wide text-justify md:pl-10"
          ></div>
        </div>

        {/* Gihanga (Left aligned) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          <div 
            ref={gihangaRef}
            className="col-span-1 md:col-span-6 text-white text-opacity-80 font-sabon text-xs md:text-sm lg:text-base leading-relaxed lg:leading-loose tracking-wide text-justify md:pr-10"
          ></div>
          <div className="col-span-1 md:col-span-6 hidden md:block"></div>
        </div>

        {/* Symbol (Right aligned) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-end mt-0 md:mt-2">
          <div className="col-span-1 md:col-span-6 hidden md:block"></div>
          <div className="col-span-1 md:col-span-6 flex flex-col md:flex-row items-center gap-6 md:pl-10">
            {/* Symbol Illustration */}
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 fade-in-element mix-blend-lighten">
              <img src="/images/about-logo.webp" alt="GICA Symbol" className="w-full h-full object-contain" />
            </div>
            <div 
              ref={symbolRef}
              className="text-white text-opacity-80 font-sabon text-[0.65rem] md:text-xs lg:text-sm leading-relaxed tracking-wide text-justify pt-2 md:pt-0"
            ></div>
          </div>
        </div>

      </div>
    </section>
  );
}
