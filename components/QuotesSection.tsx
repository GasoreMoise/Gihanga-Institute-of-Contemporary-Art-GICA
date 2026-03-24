'use client';

import { useRef, useState, useEffect } from 'react';
import { useMessages } from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, SplitText);
}

export default function QuotesSection() {
    const messages = useMessages() as any;
    const quotes = messages?.landing?.quotes || [];

    const [index, setIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const quoteTextRef = useRef<HTMLHeadingElement>(null);
    const metaRef = useRef<HTMLDivElement>(null);
    const splitRef = useRef<SplitText | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { contextSafe } = useGSAP({ scope: sectionRef });

    const handleTransition = contextSafe((nextIndex: number) => {
        // CRITICAL: Revert any existing split immediately to restore the raw text node
        // This prevents the "disappearing text" issue during React re-renders.
        if (splitRef.current) {
            splitRef.current.revert();
            splitRef.current = null;
        }

        const tl = gsap.timeline();

        // 1. Exit Animation
        tl.to([quoteTextRef.current, metaRef.current], {
            autoAlpha: 0,
            y: -15,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setIndex(nextIndex);
            }
        });

        // 2. Entrance Animation
        tl.fromTo([quoteTextRef.current, metaRef.current],
            { autoAlpha: 0, y: 20 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "expo.out",
                onStart: () => {
                    // Re-split the new text only after it has been rendered by React
                    if (quoteTextRef.current) {
                        splitRef.current = new SplitText(quoteTextRef.current, { type: "chars" });
                        gsap.from(splitRef.current.chars, {
                            autoAlpha: 0,
                            y: 8,
                            stagger: 0.015,
                            duration: 0.7,
                            ease: "power2.out"
                        });
                    }
                }
            }
        );
    });

    const nextQuote = () => handleTransition((index + 1) % quotes.length);
    const prevQuote = () => handleTransition((index - 1 + quotes.length) % quotes.length);

    if (!mounted || quotes.length === 0) return null;

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full bg-[#FAF6ED] flex flex-col items-center justify-center overflow-hidden snap-start"
        >
            {/* Minimalist Edge Marks */}
            <div className="absolute inset-0 flex justify-between items-center px-6 md:px-12 pointer-events-none opacity-[0.05] select-none">
                <span className="text-[35vw] font-serif translate-y-1/16 md:-translate-y-0 -translate-x-1/4">&ldquo;</span>
                <span className="text-[35vw] font-serif translate-y-1/16 md:-translate-y-0 translate-x-1/4">&rdquo;</span>
            </div>

            <div className="max-w-4xl w-full relative z-10 px-6 flex flex-col items-center text-center">
                <h2
                    ref={quoteTextRef}
                    className="text-[#0A1116] font-sabon text-xl md:text-2xl lg:text-3xl italic font-light mb-16 leading-relaxed"
                >
                    {quotes[index].text}
                </h2>

                <div ref={metaRef} className="flex flex-col items-center">
                    <div className="h-[1px] w-6 bg-[#0A1116]/20 mb-6" />
                    <p className="text-[#0A1116] font-sabon tracking-[0.4em] text-[0.65rem] uppercase font-bold">
                        {quotes[index].author}
                    </p>
                    <p className="text-[#0A1116]/40 font-sabon text-[0.55rem] uppercase tracking-[0.2em] mt-2">
                        {quotes[index].company}
                    </p>
                </div>
            </div>

            {/* De-corporatized Navigation: No box, increased distance */}
            <div className="absolute bottom-16 flex items-center justify-between w-full max-w-[240px] md:max-w-[320px]">
                <button
                    onClick={prevQuote}
                    className="text-[#0A1116]/90 hover:text-[#0A1116] hover:scale-125 transition-all duration-300 p-2"
                    aria-label="Previous Quote"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Subtle visual center anchor */}
                <div className="w-1 h-1 rounded-full bg-[#0A1116]/10" />

                <button
                    onClick={nextQuote}
                    className="text-[#0A1116]/90 hover:text-[#0A1116] hover:scale-125 transition-all duration-300 p-2"
                    aria-label="Next Quote"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    );
}