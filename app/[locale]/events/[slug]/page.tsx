'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import Footer from '@/components/Footer';

const eventContent = {
    title: "ZEITZ MOCAA ART TOUR DINNER",
    headerImage: "/images/events/header.webp",
    mainImage: "/images/events/zeitz-hero.webp",
    paragraphs: [
        "The GICA was honored to host a special dinner for the Zeitz MOCAA Art Tour; an initiative initially envisioned by the late Koyo Kouoh to engage art collectors with the multitude of art scenes across the continent.",
        "Energy in motion. The Dawidi Band punctuated the evening with a performance that moved from intimate acoustic moments to ecstatic crescendos, celebrating the spirit of the Zeitz MOCAA initiative."
    ],
    gallery: [
        "/images/events/gallery-1.webp", "/images/events/gallery-2.webp",
        "/images/events/gallery-3.webp", "/images/events/gallery-4.webp",
        "/images/events/gallery-5.webp", "/images/events/gallery-6.webp",
        "/images/events/gallery-7.webp", "/images/events/gallery-8.webp",
        "/images/events/gallery-9.webp", "/images/events/gallery-10.webp",
        "/images/events/gallery-11.webp", "/images/events/gallery-12.webp"
    ]
};

export default function EventDetailPage() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Navigation logic (Escape to close, Arrows to cycle)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') setSelectedIndex(null);
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex]);

    const handleNext = () => {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % eventContent.gallery.length : null));
    };

    const handlePrev = () => {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + eventContent.gallery.length) % eventContent.gallery.length : null));
    };

    return (
        <main className="min-h-screen bg-white font-sabon selection:bg-black selection:text-white text-black">

            {/* 1. HERO HEADER */}
            <section className="relative w-full h-[100vh] overflow-hidden flex items-center justify-center text-white text-center">
                <Image src={eventContent.headerImage} alt="Header" fill className="object-cover brightness-50" priority />
                <div className="relative z-10 px-6">
                    <h1 className="text-xl md:text-3xl font-bold tracking-[0.3em] uppercase mb-4">{eventContent.title}</h1>
                </div>
            </section>

            {/* 2. BODY CONTENT (Split Layout) */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-20 lg:px-32 py-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start mb-32">
                    <div className="md:col-span-5">
                        <div className="relative aspect-[4/5] w-full shadow-lg">
                            <Image src={eventContent.mainImage} alt="Dinner Event" fill unoptimized className="object-cover" />
                        </div>
                    </div>
                    <div className="md:col-span-7 space-y-8 text-sm md:text-[16px] leading-[1.9] text-neutral-800 text-justify">
                        {eventContent.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                </div>

                {/* 3. PHOTO GALLERY WITH LIGHTBOX TRIGGER */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-40">
                    {eventContent.gallery.map((img, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="relative aspect-[3/3] overflow-hidden bg-neutral-100 shadow-sm cursor-zoom-in"
                            onClick={() => setSelectedIndex(i)}
                        >
                            <Image src={img} alt={`Gallery ${i}`} fill unoptimized className="object-cover" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 4. LIGHTBOX OVERLAY */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-4 md:p-10"
                    >
                        <button
                            onClick={() => setSelectedIndex(null)}
                            className="absolute top-10 right-10 z-[110] text-2xl font-light hover:rotate-90 transition-transform duration-500 p-4"
                        >
                            ✕
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center">
                            <button onClick={handlePrev} className="absolute left-0 md:left-10 z-[110] p-4 text-black/30 hover:text-black transition-colors">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={handleNext} className="absolute right-0 md:right-10 z-[110] p-4 text-black/30 hover:text-black transition-colors">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
                            </button>

                            <motion.div
                                key={selectedIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="relative w-full h-full max-w-5xl max-h-[80vh]"
                            >
                                <Image
                                    src={eventContent.gallery[selectedIndex]}
                                    alt="Zoomed"
                                    fill
                                    unoptimized
                                    className="object-contain"
                                />
                            </motion.div>
                        </div>

                        <div className="absolute bottom-10 text-[10px] tracking-[0.4em] uppercase font-bold text-neutral-400">
                            {selectedIndex + 1} / {eventContent.gallery.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 5. FOOTER SECTIONS */}
            <div className="relative z-10 w-full bg-[#0a1116] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <ContactStayInTouch
                    title="Stay In Touch"
                    subtitle="For any enquiries, thoughts and ideas please do not hesistate to reach out to us."
                    backgroundImage={{ src: "/images/events/contact.webp", alt: "GICA Events" }}
                />
                <Footer />
            </div>
        </main>
    );
}