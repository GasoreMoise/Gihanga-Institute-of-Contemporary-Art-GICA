'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/all';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Observer);
}

export default function VerticalSlider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const isAnimating = useRef(false);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Convert React children pseudo-array to actual DOM element array
    const sections = gsap.utils.toArray(containerRef.current.children) as HTMLElement[];
    
    if (sections.length === 0) return;

    // Set initial layout state: all sections stacked on top of each other
    gsap.set(sections, { 
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      autoAlpha: 0,
      zIndex: 1
    });

    // Make the first section visible immediately
    gsap.set(sections[0], { autoAlpha: 1, zIndex: 2 });

    const gotoSection = (index: number, direction: number) => {
      if (index < 0 || index >= sections.length) return;
      isAnimating.current = true;

      const currentSection = sections[activeIndexRef.current];
      const nextSection = sections[index];

      activeIndexRef.current = index;

      // Position the next section out of view based on direction
      // If sweeping UP (direction=1), new slide comes from bottom (+100%)
      // If sweeping DOWN (direction=-1), new slide comes from top (-100%)
      gsap.set(nextSection, { autoAlpha: 1, zIndex: 3, yPercent: direction * 100 });
      gsap.set(currentSection, { zIndex: 2 });

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power2.inOut" },
        onStart: () => {
          currentSection.dispatchEvent(new CustomEvent('slideLeave'));
          nextSection.dispatchEvent(new CustomEvent('slideEnter'));
        },
        onComplete: () => {
          gsap.set(currentSection, { autoAlpha: 0 });
          isAnimating.current = false;
        }
      });

      // Animate current sliding out slightly for parallax, and next sliding in perfectly
      tl.to(currentSection, { yPercent: -direction * 50 }, 0)
        .to(nextSection, { yPercent: 0 }, 0);
    };

    const nextSection = () => gotoSection(activeIndexRef.current + 1, 1);
    const prevSection = () => gotoSection(activeIndexRef.current - 1, -1);

    // Global Observer listening to window scrolling/swiping intent
    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      // onUp: user sweeps up/scrolls mouse wheel down -> trigger next slide
      onUp: () => !isAnimating.current && nextSection(),
      // onDown: user sweeps down/scrolls mouse wheel up -> trigger prev slide
      onDown: () => !isAnimating.current && prevSection(),
      tolerance: 30, // threshold to prevent hyper-sensitivity
      preventDefault: true // Locks native vertical scroll
    });

    // If an element uses scrollIntoView (e.g. Chevron scroll to #about), hook it up to gotoSection
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'about') {
        // Assume about is at index 1 for now based on children array.
        // It's safer to just lookup the child index mechanically:
        const aboutIndex = sections.findIndex(el => el.id === 'about' || el.querySelector('#about'));
        if (aboutIndex !== -1 && aboutIndex > activeIndexRef.current && !isAnimating.current) {
          gotoSection(aboutIndex, 1);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Override exact chevron click directly if it has an ID, instead of relying solely on hash
    const aboutChevron = document.getElementById('about-chevron');
    if (aboutChevron) {
        aboutChevron.onclick = (e) => {
            e.preventDefault();
            const aboutIndex = sections.findIndex(el => el.id === 'about' || el.querySelector('#about'));
            if (aboutIndex !== -1 && aboutIndex > activeIndexRef.current && !isAnimating.current) {
                gotoSection(aboutIndex, 1);
            }
        };
    }

    return () => {
        observer.kill();
        window.removeEventListener('hashchange', handleHashChange);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0A1116] touch-none select-none">
      {children}
    </div>
  );
}
