'use client';

import { useRef, useState, useEffect } from 'react';
import { useMessages } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion'; // Explicitly imported
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

    useEffect(() => { setMounted(true); }, []);

    const { contextSafe } = useGSAP({ scope: sectionRef });

    const handleTransition = contextSafe((nextIndex: number) => {
        const tl = gsap.timeline();

        // 1. OUTRO: Smooth fade and slight lift
        tl.to([quoteTextRef.current, metaRef.current], {
            autoAlpha: 0,
            y: -10,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
                if (splitRef.current) splitRef.current.revert();
                setIndex(nextIndex);
            }
        });

        // 2. INTRO: Staggered "ink-bleed" reveal
        tl.fromTo([quoteTextRef.current, metaRef.current],
            { autoAlpha: 0, y: 15 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "expo.out",
                onStart: () => {
                    if (quoteTextRef.current) {
                        splitRef.current = new SplitText(quoteTextRef.current, { type: "words,chars" });
                        gsap.from(splitRef.current.chars, {
                            opacity: 0,
                            duration: 0.6,
                            stagger: 0.008,
                            ease: "power2.out"
                        });
                    }
                }
            }
        );
    });

    if (!mounted || quotes.length === 0) return null;

    return (
        <section
            id="quotes"
            ref={sectionRef}
            className="relative h-screen w-full bg-[#FAF6ED] flex flex-col items-center justify-center overflow-hidden snap-start"
        >
            {/* AMBIENT BACKGROUND: Gentle pulse for institutional depth */}
            <div className="absolute inset-0 flex justify-between items-center px-10 pointer-events-none select-none">
                <motion.span
                    animate={{ opacity: [0.02, 0.04, 0.02] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-[25vw] font-serif text-[#0A1116]"
                >
                    &ldquo;
                </motion.span>
                <motion.span
                    animate={{ opacity: [0.02, 0.04, 0.02] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="text-[25vw] font-serif text-[#0A1116]"
                >
                    &rdquo;
                </motion.span>
            </div>

            <div className="max-w-3xl w-full relative z-10 px-8 flex flex-col items-center text-center -mt-16">
                {/* FONT REDUCTION: 
                  Institutional Standard sizes: text-lg (Mobile) to text-2xl (Desktop)
                */}
                <h2
                    ref={quoteTextRef}
                    className="text-[#0A1116] font-sabon text-xl md:text-2xl lg:text-3xl italic font-light mb-12 leading-[1.6] tracking-normal"
                    style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
                >
                    {quotes[index].text}
                </h2>

                <div ref={metaRef} className="flex flex-col items-center">
                    <div className="h-[1px] w-8 bg-black/10 mb-8" />
                    <p className="text-[#0A1116] font-sabon tracking-[0.4em] text-[12px] md:text-[15px] uppercase font-bold">
                        {quotes[index].author}
                    </p>
                    <p className="text-[#0A1116]/40 font-sabon text-[9px] md:text-[12px] uppercase tracking-[0.25em] mt-2">
                        {quotes[index].company}
                    </p>
                </div>
            </div>

            {/* NAVIGATION: Minimal and functional */}
            <div className="absolute bottom-16 flex items-center justify-between w-full max-w-[280px] md:max-w-[340px]">
                <button
                    onClick={() => handleTransition((index - 1 + quotes.length) % quotes.length)}
                    className="group p-4 cursor-pointer transition-transform active:scale-95"
                    aria-label="Previous"
                >
                    <svg className="w-6 h-6 text-black/30 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="flex flex-col items-center gap-3 mt-6">
                    <span className="text-[9px] font-bold tracking-[0.3em] text-black/40 uppercase">
                        {index + 1} / {quotes.length}
                    </span>
                    <div className="w-[1px] h-4 bg-black/5" />
                </div>

                <button
                    onClick={() => handleTransition((index + 1) % quotes.length)}
                    className="group p-4 cursor-pointer transition-transform active:scale-95"
                    aria-label="Next"
                >
                    <svg className="w-6 h-6 text-black/30 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    );
}