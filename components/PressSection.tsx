'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText, ScrollTrigger } from 'gsap/all';

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
}

interface PressAgency {
    id: number;
    name: string;
    title: string;
    url: string;
    logo: string;
}

export default function PressSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const pressAgencies: PressAgency[] = [
        { id: 1, name: "Ministry of Youth", title: "Minister of State Sandrine Umutoni attends opening of Gihanga Institute of Contemporary Art", url: "https://www.moya.gov.rw/1/updates/news-details/minister-of-state-sandrine-umutoni-attends-opening-of-gihanga-institute-of-contemporary-art", logo: "/images/press/logo-miniyouth.webp" },
        { id: 2, name: "The Art Newspaper", title: "Rwanda boosts culture infrastructure with new non-profit contemporary art centre", url: "https://www.theartnewspaper.com/2025/12/23/rwanda-boosts-culture-infrastructure-with-new-non-profit-contemporary-art-centre", logo: "/images/press/art-newspaper.webp" },
        { id: 3, name: "Nataal", title: "GICA RWANDA", url: "https://nataal.com/gica-rwanda", logo: "/images/press/nataal.webp" },
        { id: 4, name: "The New Times", title: "Major boost for creatives as new contemporary art space opens", url: "https://www.newtimes.co.rw/article/32155/entertainment/art/major-boost-for-creatives-as-new-contemporary-art-space-opens", logo: "/images/press/logo-newtimes.webp" },
        { id: 5, name: "Africans column", title: "GICA: The Cultural Beacon Set to Redefine Rwanda's Contemporary Art Scene", url: "https://africanscolumn.com/gica-the-cultural-beacon-set-to-redefine-rwandas-contemporary-art-scene/", logo: "/images/press/africans-column.webp" },
        { id: 6, name: "Igihe", title: "Rwanda's first non-profit contemporary art institute opens in Kigali", url: "https://en.igihe.com/arts-culture/article/rwanda-s-first-non-profit-contemporary-art-institute-opens-in-kigali-photos", logo: "/images/press/igihe.webp" },
        { id: 7, name: "World African Artists", title: "Unity Through Artistic Exchange", url: "#", logo: "/images/press/www.webp" },
        { id: 8, name: "KT Press", title: "Rwandans in the arts birth a new centre for creativity", url: "https://www.ktpress.rw/2025/12/rwandans-in-the-arts-birth-a-new-centre-for-creativity/", logo: "/images/press/kt-press.webp" },
        { id: 9, name: "IL GIORNALE DEL L'ARTE", title: "In Ruanda e nato il primo centro non profit dedicato all'arte contemporanea", url: "https://www.ilgiornaledellarte.com/Articolo/In-Ruanda-e-nato-il-primo-centro-non-profit-dedicato-allarte-contemporanea", logo: "/images/press/logo-giornale.webp" },
    ];

    useGSAP(() => {
        if (!mounted) return;
        const headerSplit = new SplitText(".press-title", { type: "chars" });
        gsap.from(headerSplit.chars, {
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
            y: 20,
            opacity: 0,
            stagger: 0.02,
            duration: 1,
            ease: "expo.out"
        });
        gsap.from(".logo-item", {
            scrollTrigger: { trigger: ".press-grid", start: "top 80%" },
            y: 40,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "power3.out"
        });
    }, { scope: sectionRef, dependencies: [mounted] });

    if (!mounted) return null;

    return (
        <section id="press" ref={sectionRef} className="w-full bg-white pt-24 md:pt-32 pb-64 px-6 md:px-12 lg:px-32 flex flex-col items-center overflow-visible">

            <div className="text-center mb-40 md:mb-56">
                <h2 className="press-title text-black font-sabon text-[13px] md:text-[15px] tracking-[0.8em] uppercase font-bold">
                    Press
                </h2>
                <div className="mt-6 w-12 h-[1px] bg-black/10 mx-auto" />
            </div>

            {/* GRID: col-2 mobile, col-3 desktop with strictly even vertical gaps */}
            <div className="press-grid w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 gap-x-12 md:gap-x-24 gap-y-48 md:gap-y-64">
                {pressAgencies.map((agency) => (
                    <div
                        key={agency.id}
                        className="logo-item relative flex flex-col items-center"
                        onMouseEnter={() => setHoveredId(agency.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onTouchStart={() => setHoveredId(agency.id)}
                    >
                        {/* 1. FIXED LOGO CONTAINER HEIGHT - Ensures perfect row alignment */}
                        <div className="h-14 md:h-20 w-full flex justify-center items-center px-4 group cursor-pointer transition-transform duration-500 hover:scale-105">
                            <img
                                src={agency.logo}
                                alt={agency.name}
                                className="max-h-full max-w-full w-auto object-contain pointer-events-none"
                            />
                        </div>

                        {/* 2. REFINED MODAL: Strictly narrower and lighter on mobile */}
                        <AnimatePresence>
                            {hoveredId === agency.id && (
                                <motion.a
                                    href={agency.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 15, scale: 1 }}
                                    exit={{ opacity: 0, y: 0, scale: 0.98 }}
                                    // w-[220px] on mobile creates a much more balanced look vs the logo width
                                    className="absolute top-full z-[200] bg-[#11212B] px-5 py-6 md:px-8 md:py-10 w-[220px] md:w-[340px] text-center shadow-2xl flex flex-col items-center"
                                >
                                    <span className="text-[7px] md:text-[9px] text-white/30 uppercase tracking-[0.4em] block mb-3 font-bold">
                                        Press Release
                                    </span>

                                    <h4 className="text-[0.65rem] md:text-[0.85rem] font-sabon text-white leading-relaxed italic mb-4">
                                        "{agency.title}"
                                    </h4>

                                    <div className="flex items-center justify-center gap-3">
                                        <span className="text-[7px] md:text-[9px] text-white/50 uppercase tracking-[0.2em]">
                                            Read Story
                                        </span>
                                        <div className="w-6 md:w-8 h-[1px] bg-white/20" />
                                    </div>
                                </motion.a>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}