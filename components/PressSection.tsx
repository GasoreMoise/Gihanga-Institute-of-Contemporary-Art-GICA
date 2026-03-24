'use client';

import { useRef, useState } from 'react';
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

    const pressAgencies: PressAgency[] = [
        { id: 1, name: "Ministry of Youth", title: "Minister of State Sandrine Umutoni attends opening of Gihanga Institute of Contemporary Art", url: "https://www.moya.gov.rw/1/updates/news-details/minister-of-state-sandrine-umutoni-attends-opening-of-gihanga-institute-of-contemporary-art", logo: "/images/press/logo-miniyouth.webp" },
        { id: 2, name: "The Art Newspaper", title: "Rwanda boosts culture infrastructure with new non-profit contemporary art centre", url: "https://www.theartnewspaper.com/2025/12/23/rwanda-boosts-culture-infrastructure-with-new-non-profit-contemporary-art-centre", logo: "/images/press/logo-artnewspaper.webp" },
        { id: 3, name: "Nataal", title: "GICA RWANDA", url: "https://nataal.com/gica-rwanda", logo: "/images/press/logo-nataal.webp" },
        { id: 4, name: "The New Times", title: "Major boost for creatives as new contemporary art space opens", url: "https://www.newtimes.co.rw/article/32155/entertainment/art/major-boost-for-creatives-as-new-contemporary-art-space-opens", logo: "/images/press/logo-newtimes.webp" },
        { id: 5, name: "Africans column", title: "GICA: The Cultural Beacon Set to Redefine Rwanda's Contemporary Art Scene", url: "https://africanscolumn.com/gica-the-cultural-beacon-set-to-redefine-rwandas-contemporary-art-scene/", logo: "/images/press/logo-africanscolumn.webp" },
        { id: 6, name: "Igihe", title: "Rwanda's first non-profit contemporary art institute opens in Kigali", url: "https://en.igihe.com/arts-culture/article/rwanda-s-first-non-profit-contemporary-art-institute-opens-in-kigali-photos", logo: "/images/press/logo-igihe.webp" },
        { id: 7, name: "World African Artists", title: "Unity Through Artistic Exchange", url: "#", logo: "/images/press/logo-waau.webp" },
        { id: 8, name: "KT Press", title: "Rwandans in the arts birth a new centre for creativity", url: "https://www.ktpress.rw/2025/12/rwandans-in-the-arts-birth-a-new-centre-for-creativity/", logo: "/images/press/logo-ktpress.webp" },
        { id: 9, name: "IL GIORNALE DEL L'ARTE", title: "In Ruanda e nato il primo centro non profit dedicato all'arte contemporanea", url: "https://www.ilgiornaledellarte.com/Articolo/In-Ruanda-e-nato-il-primo-centro-non-profit-dedicato-allarte-contemporanea", logo: "/images/press/logo-giornale.webp" },
    ];

    useGSAP(() => {
        const headerSplit = new SplitText(".press-title", { type: "chars" });
        gsap.from(headerSplit.chars, {
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
            y: 20,
            opacity: 0,
            stagger: 0.02,
            duration: 1,
            ease: "expo.out"
        });

        gsap.from(".logo-item", {
            scrollTrigger: { trigger: ".press-grid", start: "top 75%" },
            y: 30,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "power3.out"
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full bg-white pt-12 md:pt-12 pb-32 md:pb-44 px-6 md:px-12 lg:px-40 flex flex-col items-center">
            <div className="overflow-hidden mb-32 md:mb-40 text-center">
                <h2 className="press-title text-black font-sabon text-[15px] tracking-[0.8em] uppercase font-bold">
                    Press
                </h2>
                <div className="mt-4 w-12 h-[1px] bg-black/10 mx-auto" />
            </div>

            {/* Grid with larger row gaps to prevent overlapping */}
            <div className="press-grid w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-56 md:gap-y-64">
                {pressAgencies.map((agency) => (
                    <div
                        key={agency.id}
                        className="logo-item relative flex flex-col items-center group"
                        onMouseEnter={() => setHoveredId(agency.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {/* Logo: Original color preserved, no filters */}
                        <div className="h-10 md:h-12 w-full flex justify-center items-center transition-transform duration-500 ease-out group-hover:scale-105">
                            <img
                                src={agency.logo}
                                alt={agency.name}
                                className="h-full w-auto object-contain grayscale-0 brightness-100"
                            />
                        </div>

                        {/* Article Reveal: Now with Higher Z-Index and adjusted y-offset */}
                        <AnimatePresence>
                            {hoveredId === agency.id && (
                                <motion.a
                                    href={agency.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 30 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full z-[100] bg-[#11212B] px-6 py-8 w-[280px] md:w-[320px] text-center shadow-2xl"
                                >
                                    <span className="text-[9px] text-white/40 uppercase tracking-[0.4em] block mb-4 font-bold">
                                        Featured Article
                                    </span>

                                    <h4 className="text-[0.85rem] font-sabon text-white leading-relaxed italic px-2">
                                        "{agency.title}"
                                    </h4>

                                    <div className="mt-6 flex items-center justify-center gap-3">
                                        <span className="text-[9px] text-white/60 uppercase tracking-widest">
                                            View Story
                                        </span>
                                        <div className="w-6 h-[1px] bg-white/20" />
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