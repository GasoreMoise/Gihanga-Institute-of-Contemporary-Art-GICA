'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText, ScrollTrigger } from 'gsap/all';

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
}

export default function ContributorsSection() {
    const t = useTranslations('contributors');
    const sectionRef = useRef<HTMLElement>(null);

    const categories = [
        {
            title: "FOUNDING SUPPORTER",
            partners: [{ name: 'Mellon Foundation', src: '/images/logo-mellon.webp' }]
        },
        {
            title: "CULTURAL PARTNERS",
            partners: [
                { name: 'Rwanda Arts Initiative', src: '/images/logo-rwanda.webp' },
                { name: 'Ishyo Arts Centre', src: '/images/logo-ishyo.webp' }
            ]
        },
        {
            title: "TRAVEL PARTNER",
            partners: [{ name: 'RwandAir', src: '/images/logo-rwandair.webp' }]
        }
    ];

    useGSAP(() => {
        // 1. Initial Section Setup
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // 2. Main Title Sweep (Similar to About Section)
        const mainTitleSplit = new SplitText(".partners-main-title", { type: "lines", linesClass: "overflow-hidden" });
        const mainTitleInner = new SplitText(".partners-main-title", { type: "lines" });

        tl.from(mainTitleInner.lines, {
            yPercent: 100,
            duration: 1.2,
            ease: "expo.out",
        });

        // 3. Category Sweeps
        categories.forEach((_, idx) => {
            // Header Sweep
            const headerSplit = new SplitText(`.cat-header-${idx}`, { type: "lines", linesClass: "overflow-hidden" });
            const headerInner = new SplitText(`.cat-header-${idx}`, { type: "lines" });

            tl.from(headerInner.lines, {
                yPercent: 100,
                duration: 1,
                ease: "power3.out",
            }, "-=0.8")

                // Logo Masked Sweep & Unblur
                .from(`.logo-wrapper-${idx}`, {
                    xPercent: -105,
                    autoAlpha: 0,
                    stagger: 0.15,
                    duration: 1.5,
                    ease: "expo.out",
                    onStart: () => {
                        // Gradual unblur as they slide in
                        gsap.to(`.logo-img-${idx}`, { filter: "blur(0px)", duration: 1.5, ease: "power2.out" });
                    }
                }, "-=1");
        });

        // 4. Interactive Bottom Line "Drawing"
        tl.from(".bottom-line", {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1.5,
            ease: "power4.inOut"
        }, "-=1.2");

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white py-14 md:py-20 px-6 md:px-12 lg:px-32 flex flex-col items-center overflow-hidden"
        >
            {/* The "Sweep" Animated Main Title */}
            <h2 className="partners-main-title text-black font-sabon text-[0.65rem] md:text-[15px] tracking-[0.5em] uppercase font-bold mb-28 md:mb-40">
                PARTNERS
                <div className="mt-4 w-12 h-[1px] bg-black/10 mx-auto" />
            </h2>

            <div className="w-full max-w-5xl space-y-28 md:space-y-44">
                {categories.map((cat, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        {/* Masked Category Header */}
                        <div className="mb-16">
                            <h3 className={`cat-header-${idx} text-black/40 font-sabon text-[0.6rem] md:text-[0.65rem] tracking-[0.3em] uppercase font-bold`}>
                                {cat.title}
                            </h3>
                        </div>

                        {/* Logo Sweep Grid */}
                        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
                            {cat.partners.map((partner, i) => (
                                <div
                                    key={i}
                                    className="group relative flex justify-center items-center"
                                >
                                    {/* The "Sweep" Container */}
                                    <div className={`logo-wrapper-${idx} overflow-hidden p-2`}>
                                        <img
                                            src={partner.src}
                                            alt={partner.name}
                                            className={`logo-img-${idx} h-10 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-700 blur-md group-hover:scale-110`}
                                        />
                                    </div>

                                    {/* Interactive Label Reveal */}
                                    <span className="absolute -bottom-10 whitespace-nowrap text-[0.5rem] tracking-[0.25em] uppercase text-black/0 group-hover:text-black/40 transition-all duration-500 font-sabon font-bold">
                                        {partner.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


        </section>
    );
}