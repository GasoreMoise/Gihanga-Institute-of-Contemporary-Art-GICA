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

  useGSAP(() => {
    // Create a master timeline for the entire section
    const masterTl = gsap.timeline({ paused: true });

    // Text masking animations for all split-mask texts
    const textElements = gsap.utils.toArray('.split-mask') as HTMLElement[];
    
    textElements.forEach((el) => {
      // Use double SplitText layer for masking. 
      // The outer lines act as overflow-hidden clipping masks.
      // The inner lines are the targets that animate up from below.
      const splitOuter = new SplitText(el, { type: "lines", linesClass: "mask-outer overflow-hidden w-full" });
      const splitInner = new SplitText(splitOuter.lines, { type: "lines", linesClass: "mask-inner w-full" });

      // GSAP SplitText breaks native text-justify because it isolates each line into its own block.
      // To restore paragraph justification visually, we force 'text-align-last: justify' on every
      // line except the absolute last line in the paragraph block.
      splitInner.lines.forEach((lineElement, i) => {
        const line = lineElement as HTMLElement;
        if (i < splitInner.lines.length - 1) {
          line.style.textAlign = "justify";
          line.style.textAlignLast = "justify";
        }
      });

      // Animate the inner lines sliding into their outer masks at timeline start
      masterTl.from(splitInner.lines, {
        yPercent: 120,
        autoAlpha: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.05
      }, 0);
    });

    // Fade in the SVG icon and title concurrently
    masterTl.from('.fade-in-element', {
      autoAlpha: 0,
      y: 30,
      duration: 1.5,
      ease: "power3.out"
    }, 0);

    // Initial load: if this slider is the first active one, or reached natively before JS hijacks, we might want to play it!
    // But VerticalSlider manages this by immediately dispatching slideEnter on load.
    
    // Hook into the vertical slider's custom events to trigger the animation perfectly
    const elSection = containerRef.current;
    if (!elSection) return;

    const handleSlideEnter = () => masterTl.restart();
    elSection.addEventListener('slideEnter', handleSlideEnter);

    return () => {
      elSection.removeEventListener('slideEnter', handleSlideEnter);
    };
  }, { scope: containerRef });

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
        <div className="w-full text-white text-opacity-90 font-sabon text-sm md:text-lg lg:text-xl xl:text-lg leading-relaxed lg:leading-[1.6] text-justify split-mask">
          {t('about.body')}
        </div>

        {/* Mission (Right aligned) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          <div className="col-span-1 md:col-span-6 hidden md:block"></div>
          <div className="col-span-1 md:col-span-6 text-white text-opacity-80 font-sabon text-xs md:text-sm lg:text-base leading-relaxed lg:leading-loose tracking-wide text-justify split-mask md:pl-10">
            {t('about.mission')}
          </div>
        </div>

        {/* Gihanga (Left aligned) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          <div className="col-span-1 md:col-span-6 text-white text-opacity-80 font-sabon text-xs md:text-sm lg:text-base leading-relaxed lg:leading-loose tracking-wide text-justify split-mask md:pr-10">
            {t('about.gihanga')}
          </div>
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
            <div className="text-white text-opacity-80 font-sabon text-[0.65rem] md:text-xs lg:text-sm leading-relaxed tracking-wide text-justify split-mask pt-2 md:pt-0">
              {t('about.symbol')}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
