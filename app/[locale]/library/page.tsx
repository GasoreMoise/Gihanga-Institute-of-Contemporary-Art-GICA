'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import Footer from '@/components/Footer';

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);
}

const librarySections = [
    {
        id: 'place',
        title: 'Place',
        subtitle: 'A warm welcoming and nourishing environment for gatherings, meetings, discussions, recordings and more.',
        image: '/images/library/place.webp',
    },
    {
        id: 'collection',
        title: 'Collection',
        subtitle: 'Comprehensive library of books grown organically through the GICA’s activities, focusing on Africana visual cultures including visual arts, photography, architecture, design fashion, and emergent cultures.',
        image: '/images/library/collection.webp',
        details: [
            'Library of publishers on the continent (Chimurenga, Keleketla, Manufactoriel)',
            'Library of international publishers focusing on Africana visual arts',
            'Library of Rwandan, East African, and African cultures, histories, religions, societies, traditions, in collaboration with leading institutions.'
        ]
    },
    {
        id: 'archive',
        title: 'Archive',
        subtitle: 'Collection of material from historically Rwandan and East African artists, initiatives, establishing frameworks to preserve, nurture, and present these artists’ work.',
        image: '/images/library/archive.webp',
    },
    {
        id: 'network',
        title: 'Network',
        subtitle: 'Regional, international and transnational interlibrary program of exchange through materials and programme.',
        image: '/images/library/network.webp',
    },
    {
        id: 'community',
        title: 'Community',
        subtitle: 'Engagement and exchange programme with local institutions and initiatives in arts and culture.',
        image: '/images/library/community.webp',
    },
    {
        id: 'people',
        title: 'People',
        subtitle: 'Community-focused exchange with emphasis on Elder, dignitaries, and storytellers.',
        image: '/images/library/people.webp',
    },
    {
        id: 'classroom',
        title: 'Classroom',
        image: '/images/library/classroom.webp',
        list: [
            'Reading Groups',
            'Book launch & presentations',
            'Artists and curators as libraries',
            'Libraries by Artists',
            'African journals and magazines'
        ]
    }
];

export default function LibraryPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();

    useGSAP(() => {
        // We select ALL cards including the first "Hub" card
        const cards = gsap.utils.toArray<HTMLElement>('.library-card');

        cards.forEach((card, i) => {
            ScrollTrigger.create({
                trigger: card,
                start: "top top",
                pin: true,
                pinSpacing: false,
                // Each card pins for 100% of the viewport height
                end: () => `+=${window.innerHeight}`,
                id: `card-${i}`,
                invalidateOnRefresh: true,
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, { scope: containerRef });

    const handleNavClick = (index: number) => {
        // Since the Hub is index 0, "Place" is index 1, "Collection" is index 2...
        // The scroll target is simply index * viewport height
        const scrollTarget = (index + 1) * window.innerHeight;

        gsap.to(window, {
            duration: 1.8,
            scrollTo: { y: scrollTarget, autoKill: false },
            ease: "power4.inOut"
        });
    };

    return (
        <main ref={containerRef} className="bg-white font-sabon selection:bg-black selection:text-white overflow-x-hidden">

            {/* 1. THE HUB (Card Index 0) */}
            <section className="library-card relative h-screen w-full overflow-hidden flex items-end pb-24 px-6 md:px-15 lg:px-20 text-white z-[10]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/library/hero-bg.webp"
                        alt="Library Hub"
                        fill
                        unoptimized
                        className="object-cover brightness-[0.5]"
                        priority
                    />
                </div>

                <div className="relative z-10 w-full">
                    <h1 className="text-[2.2rem] md:text-[2.5rem] lg:text-[2.5rem] leading-[1.2] tracking-tight font-normal max-w-6xl">
                        Library as a{" "}
                        <span className="inline-flex flex-wrap gap-x-4">
                            {librarySections.map((s, i) => (
                                <span key={s.id} className="inline-block">
                                    <button
                                        onClick={() => handleNavClick(i)}
                                        className="underline decoration-2 decoration-white/30 hover:decoration-white transition-all cursor-pointer whitespace-nowrap"
                                    >
                                        {s.title}
                                    </button>
                                    {i < librarySections.length - 1 ? "," : ""}
                                </span>
                            ))}
                        </span>
                    </h1>
                </div>
            </section>

            {/* 2. THE STACKED CONTENT CARDS (Cards Index 1 to N) */}
            <div className="relative w-full">
                {librarySections.map((section, i) => (
                    <section
                        id={section.id}
                        key={section.id}
                        className="library-card relative h-screen w-full overflow-hidden flex items-end pb-24 px-6 md:px-15 lg:px-20 text-white"
                        style={{ zIndex: i + 20 }} // Start z-index higher than the hub
                    >
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={section.image}
                                alt={section.title}
                                fill
                                unoptimized
                                className="object-cover brightness-[0.4]"
                            />
                        </div>

                        <div className="relative z-10 max-w-4xl">
                            <h2 className="text-4xl md:text-4xl font-bold tracking-tight mb-6">{section.title}</h2>

                            {section.subtitle && (
                                <p className="text-lg md:text-2xl leading-relaxed font-light mb-8 max-w-3xl italic opacity-90">
                                    {section.subtitle}
                                </p>
                            )}

                            {section.details && (
                                <div className="space-y-4 text-sm md:text-lg opacity-80 font-light max-w-2xl">
                                    {section.details.map((detail, index) => (
                                        <p key={index}>{detail}</p>
                                    ))}
                                </div>
                            )}

                            {section.list && (
                                <ul className="space-y-3 text-lg md:text-2xl font-light italic opacity-90">
                                    {section.list.map((item, index) => (
                                        <li key={index} className="flex items-center gap-4">
                                            <span className="w-1.5 h-1.5 bg-white rounded-full opacity-40" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>
                ))}
            </div>

            {/* 3. FINAL CONTACT & FOOTER */}
            <div className="relative z-[100] w-full bg-[#0a1116]">
                <ContactStayInTouch
                    title="Stay in Touch"
                    subtitle="For any enquiries, thoughts and ideas please do not hesistate to reach out to us."
                    backgroundImage={{
                        src: "/images/library/contact.webp",
                        alt: "GICA Library Contact"
                    }}
                />
                <Footer />
            </div>
        </main>
    );
}