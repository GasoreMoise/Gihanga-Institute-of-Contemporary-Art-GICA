'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import Footer from '@/components/Footer';

const talkContent = {
    title: "CULTURE, PHILOSOPHY, AND SPACE",
    subtitle: "A conversation on architecture, theatre and art",
    date: "Thursday, 22 January 2025",
    headerImage: "/images/art/hero-bg.webp",
    mainImage: "/images/art/audience.webp",
    paragraphs: [
        "The GICA brought together a distinguished panel — including Carole Karemera, Christian Benimana from Mass Design, Alex Ndibwami, Andrew Todd, and Lisa Katangali, Curatorial Coordinator of the Pan-African Biennale — for a rich dialogue exploring the intersection of local architecture practice and contemporary African arts.",
        "This conversation illuminated how these elements manifest in sectors like theatre and creative mediums, addressing the challenges encountered in these fields while seeking optimal approaches to designing public spaces and structures.",
        "Key insights emerged on the need to revive traditional practices and enhance them, as well as to address existing gaps within community creative spaces. The discussion emphasized the importance of recognizing and reinventing what African cultures have contributed and can further offer to this domain."
    ],
    gallery: [
        "/images/art/gallery-1.webp", "/images/art/gallery-2.webp",
        "/images/art/gallery-3.webp", "/images/art/gallery-4.webp",
        "/images/art/gallery-5.webp", "/images/art/gallery-6.webp",
        "/images/art/gallery-7.webp", "/images/art/gallery-8.webp",
        "/images/art/gallery-9.webp", "/images/art/gallery-10.webp",
        "/images/art/gallery-11.webp", "/images/art/gallery-12.webp"
    ]
};

export default function TalkDetailPage() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Handle Keyboard Navigation (Esc to close, Left/Right to navigate)
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
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % talkContent.gallery.length : null));
    };

    const handlePrev = () => {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + talkContent.gallery.length) % talkContent.gallery.length : null));
    };

    return (
        <main className="min-h-screen bg-white font-sabon selection:bg-black selection:text-white text-black">

            {/* 1. HERO HEADER */}
            <section className="relative w-full h-[100vh] overflow-hidden flex items-center justify-center text-white text-center">
                <Image src={talkContent.headerImage} alt="Header" fill className="object-cover brightness-50" priority />
                <div className="relative z-10 px-6">
                    <h1 className="text-xl md:text-3xl font-bold tracking-[0.3em] uppercase mb-4">{talkContent.title}</h1>
                    <p className="text-sm md:text-lg tracking-[0.2em] italic font-light mb-2">{talkContent.subtitle}</p>
                    <p className="text-[10px] tracking-[0.4em] uppercase opacity-70">{talkContent.date}</p>
                </div>
            </section>

            {/* 2. BODY CONTENT */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-20 lg:px-32 py-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start mb-32">
                    <div className="md:col-span-5">
                        <div className="relative aspect-[4/5] w-full shadow-lg">
                            <Image src={talkContent.mainImage} alt="Audience" fill unoptimized className="object-cover" />
                        </div>
                    </div>
                    <div className="md:col-span-7 space-y-8 text-sm md:text-[16px] leading-[1.9] text-neutral-800 text-justify">
                        {talkContent.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                </div>

                {/* 3. PHOTO GALLERY WITH LIGHTBOX TRIGGER */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-40">
                    {talkContent.gallery.map((img, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="relative aspect-[3/2] overflow-hidden bg-neutral-100 shadow-sm cursor-zoom-in"
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
                        {/* UI Controls */}
                        <button
                            onClick={() => setSelectedIndex(null)}
                            className="absolute top-10 right-10 z-[110] text-2xl font-light hover:rotate-90 transition-transform duration-500 p-4"
                        >
                            ✕
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Navigation Buttons */}
                            <button onClick={handlePrev} className="absolute left-0 md:left-10 z-[110] p-4 text-black/30 hover:text-black transition-colors">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={handleNext} className="absolute right-0 md:right-10 z-[110] p-4 text-black/30 hover:text-black transition-colors">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
                            </button>

                            {/* Zoomed Image */}
                            <motion.div
                                key={selectedIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative w-full h-full max-w-5xl max-h-[80vh]"
                            >
                                <Image
                                    src={talkContent.gallery[selectedIndex]}
                                    alt="Zoomed"
                                    fill
                                    unoptimized
                                    className="object-contain"
                                />
                            </motion.div>
                        </div>

                        {/* Image Counter */}
                        <div className="absolute bottom-10 text-[10px] tracking-[0.4em] uppercase font-bold text-neutral-400">
                            {selectedIndex + 1} / {talkContent.gallery.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 5. FOOTER SECTIONS */}
            <div className="relative z-10 w-full bg-[#0a1116] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <ContactStayInTouch
                    title="Stay in Touch"
                    subtitle="For any enquiries, thoughts and ideas please do not hesitate to reach out to us"
                    backgroundImage={{ src: "/images/art/talkscontact-bg.webp", alt: "GICA Talks" }}
                />
                <Footer />
            </div>
        </main>
    );
}