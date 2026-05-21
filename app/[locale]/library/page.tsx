'use client';

import { useRef, useEffect, useState } from 'react';
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
        image: '/images/library/place.webp',
        list: [
            'Gatherings',
            'Meetings',
            'Discussions',
            'Recordings and more',
        ]
    },
    {
        id: 'collection',
        title: 'Collection',
        image: '/images/library/collection.webp',
        list: [
            'Comprehensive library of books grown organically through the GICA’s activities, focusing on Africana visual cultures including visual arts, photography, architecture, design fashion, and emergent cultures.',
            'Library of publishers on the continent (Chimurenga, Keleketla, Manufactoriel)',
            'Library of international publishers focusing on Africana visual arts',
            'Library of Rwandan, East African, and African cultures, histories, religions, societies, traditions, in collaboration with leading institutions.'
        ]
    },
    {
        id: 'archive',
        title: 'Archive',
        image: '/images/library/archive.webp',
        list: [
            'A collection of material from regional artists and initiatives, establishing frameworks to preserve, nurture, and present their work.'
        ]
    },
    {
        id: 'network',
        title: 'Network',
        image: '/images/library/network.webp',
        list: [
            'Regional',
            'International',
            'Transnational',
        ]
    },
    {
        id: 'community',
        title: 'Community',
        image: '/images/library/community.webp',
        list: [
            'Engagements',
            'Exchange programmes',
        ]
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
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useGSAP(() => {
        if (!isMounted) return;

        const cards = gsap.utils.toArray<HTMLElement>('.library-card');

        cards.forEach((card, i) => {
            ScrollTrigger.create({
                trigger: card,
                start: "top top",
                pin: true,
                pinSpacing: false,
                end: () => `+=${window.innerHeight}`,
                id: `card-${i}`,
                invalidateOnRefresh: true,
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, { scope: containerRef, dependencies: [isMounted] });

    const handleNavClick = (index: number) => {
        const scrollTarget = (index + 1) * window.innerHeight;

        gsap.to(window, {
            duration: 1.8,
            scrollTo: { y: scrollTarget, autoKill: false },
            ease: "power4.inOut"
        });
    };

    if (!isMounted) {
        return <div className="min-h-screen bg-white" />;
    }

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
                        sizes="100vw"
                        className="object-cover brightness-[0.5]"
                        priority
                    />
                </div>

                <div className="relative z-10 w-full">
                    <h1 className="text-[1.8rem] md:text-[2.2rem] lg:text-[2.2rem] leading-[1.2] tracking-tight font-normal max-w-6xl">
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
                        style={{ zIndex: i + 20 }}
                    >
                        <div className="card-content-wrapper absolute inset-0 w-full h-full flex items-end pb-24 px-6 md:px-15 lg:px-20">
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={section.image}
                                    alt={section.title}
                                    fill
                                    unoptimized
                                    sizes="100vw"
                                    className="object-cover brightness-[0.4]"
                                />
                            </div>

                            <div className="relative z-10 max-w-4xl w-full">
                                <h2 className="text-4xl md:text-4xl font-bold tracking-tight mb-6">{section.title}</h2>

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
                        </div>
                    </section>
                ))}
            </div>

            {/* 3. FINAL CONTACT & FOOTER */}
            <div className="relative z-[100] w-full bg-[#0a1116]">
                <ContactStayInTouch
                    title="Stay in Touch"
                    subtitle="For any enquiries, thoughts and ideas please do not hesitate to reach out to us."
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