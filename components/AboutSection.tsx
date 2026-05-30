'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText, ScrollTrigger } from 'gsap/all';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
}

export default function AboutSection() {
  const t = useTranslations('landing');
  const containerRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const bodyText = t('about.body');

  useGSAP(() => {
    if (bodyRef.current) bodyRef.current.innerHTML = bodyText;

    // 1. Title Reveal
    gsap.from(".about-main-title", {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-main-title",
        start: "top 90%",
      }
    });

    // 2. Body Text Reveal
    const bodyLines = new SplitText(bodyRef.current, { type: "lines" });
    gsap.from(bodyLines.lines, {
      opacity: 0,
      y: 30,
      stagger: 0.05,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: bodyRef.current,
        start: "top 85%",
      }
    });

    // 3. Image & Block Reveals
    const revealItems = gsap.utils.toArray('.reveal-item');
    revealItems.forEach((item: any) => {
      gsap.from(item, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
        }
      });
    });

  }, { scope: containerRef, dependencies: [bodyText] });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0a1116] flex flex-col items-center py-16 md:py-16 lg:py-28 px-6 md:px-12 lg:px-20 text-white selection:bg-[#B59A7D] selection:text-black"
    >
      <div className="max-w-[1400px] w-full">

        {/* 1. SIMPLE PLAIN TITLE */}
        <div className="mb-16 md:mb-28">
          <h2 className="about-main-title font-sabon text-2xl md:text-4xl tracking-tight">
            About
          </h2>
          <div className="h-[1px] w-16 bg-white/20 mt-8" />
        </div>

        {/* 2. FOUNDING VISION: Readable Lead Paragraph */}
        <div className="mb-24 md:mb-32">
          <div
            ref={bodyRef}
            className="font-sabon text-lg md:text-xl lg:text-2xl text-white/90 font-light justify-center leading-relaxed md:leading-snug"
          ></div>
        </div>

        {/* 3. CENTER COMPOSITION: Mission, Heritage & Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start mb-20 md:mb-32">

          {/* GICA Detail Image */}
          <div className="reveal-item md:col-span-7 relative aspect-[4/5] md:aspect-[12/10] overflow-hidden transition-all duration-[1500ms]">
            <Image
              src="/images/about-main.webp"
              alt="GICA Detail"
              fill
              className="object-cover"
            />
          </div>

          {/* Mission & Heritage Aligned Besides Image */}
          <div className="md:col-span-5 space-y-20">
            <div className="reveal-item space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Mission & Vision</h3>
              <p className="font-sabon text-lg italic text-white/80 leading-relaxed">
                {t('about.mission')}
              </p>
            </div>

            <div className="reveal-item space-y-6">
              <p className="font-sabon text-base text-white/60 leading-relaxed text-justify">
                {t('about.gihanga')}
              </p>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM COMPOSITION: Symbolism & Texture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          <div className="reveal-item md:col-start-6 md:col-span-6 order-1 md:order-2">
            <div className="space-y-10">
              <p className="font-sabon text-sm md:text-md lg:text-lg font-light italic leading-snug text-white/90">
                {t('about.symbol')}
              </p>
            </div>
          </div>

          <div className="reveal-item md:col-span-4 order-2 md:order-1">
            <div className="relative h-24 md:h-32 w-48 md:w-64 ml-16 md:ml-0 transition-all duration-1000">
              <Image
                src="/logos/crane.png"
                alt="GICA Texture"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}