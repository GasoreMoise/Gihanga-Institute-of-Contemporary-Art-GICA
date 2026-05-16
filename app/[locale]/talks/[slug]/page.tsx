'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import Footer from '@/components/Footer';

const talkContent = {
    title: "CULTURE, PHILOSOPHY, AND SPACE",
    subtitle: "A conversation on architecture, theatre and art",
    date: "Thursday, 22 January 2025",
    headerImage: "/images/art/hero-bg.webp",
    videoImage: "/images/hero-talks.webp",
    videoUrl: "https://6kf3phgbvin96dfd.private.blob.vercel-storage.com/Culture,%20Philosophy,%20And%20Space%20%20A%20Conversation%20On%20Architecture,%20Theatre,%20And%20Art.mp4?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfNktGM3BoZ0JWaW45NmRGRCIsIm93bmVySWQiOiJ0ZWFtX1lVT2NOc29RZmxDOThPSGVnSlgwOXhZSCIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzc4OTgzOTk5NTk5LCJpYXQiOjE3Nzg5NDA3OTk4MTd9.9CjrtbmKyYixyCf9MmSLvCWR_ttDLrGXX7u6l4e2NYc&vercel-blob-signature=993BMxkIWko_RJq70B8N-tV-fPTwPhJOQhTAmUP-ybA",
    paragraphs: [
        "GICA brought together a distinguished panel — including Carole Karemera, Christian Benimana from Mass Design, Alex Ndibwami, Andrew Todd, and Lisa Katangali, Curatorial Coordinator of the Pan-African Biennale — for a rich dialogue exploring the intersection of local architecture practice and contemporary African arts.",
        "This conversation illuminated how these elements manifest in sectors like theatre and creative mediums, addressing the challenges encountered in these fields while seeking optimal approaches to designing public spaces and structures.",
        "Key insights emerged on the need to revive traditional practices and enhance them, as well as to address existing gaps within community creative spaces. The discussion emphasized the importance of recognizing and reinventing what African cultures have contributed and can further offer to this domain."
    ],
    gallery: [
        "/images/art/gallery-3.webp", "/images/art/gallery-4.webp",
        "/images/art/gallery-5.webp", "/images/art/gallery-6.webp",
        "/images/art/gallery-9.webp", "/images/art/gallery-10.webp",
        "/images/art/gallery-11.webp", "/images/art/gallery-12.webp"
    ]
};

export default function TalkDetailPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Guard against Next.js 15 layout hydration shifts
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setHasPlayed(true);
        }
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % talkContent.gallery.length : null));
    };

    const handlePrev = () => {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + talkContent.gallery.length) % talkContent.gallery.length : null));
    };

    // Global keyboard navigation listener for the photo grid lightbox
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

    if (!isMounted) {
        return <div className="min-h-screen bg-white" />;
    }

    return (
        <main className="min-h-screen bg-white font-sabon selection:bg-black selection:text-white text-black">

            {/* 1. HERO HEADER */}
            <section className="relative w-full h-[100vh] overflow-hidden flex items-center justify-center text-white text-center">
                <Image
                    src={talkContent.headerImage}
                    alt={talkContent.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover brightness-50"
                />
                <div className="relative z-10 px-6">
                    <h1 className="text-xl md:text-3xl font-bold tracking-[0.3em] uppercase mb-4">{talkContent.title}</h1>
                    <p className="text-sm md:text-lg tracking-[0.2em] italic font-light mb-2">{talkContent.subtitle}</p>
                    <p className="text-[10px] tracking-[0.4em] uppercase opacity-70">{talkContent.date}</p>
                </div>
            </section>

            {/* 2. BODY CONTENT */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-20 lg:px-32 py-14">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start mb-32">

                    {/* NATIVE HIGH-PERFORMANCE STREAMING VIDEO CONTAINER WITH INSTITUTIONAL OVERLAY */}
                    <div className="md:col-span-7 w-full">
                        <div className="relative h-[300px] md:h-[450px] w-full shadow-2xl bg-black overflow-hidden group">

                            {/* Institutional Play Interface Overlay */}
                            <AnimatePresence>
                                {!hasPlayed && (
                                    <motion.div
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        onClick={handlePlayVideo}
                                        className="absolute inset-0 z-20 cursor-pointer flex flex-col items-center justify-center"
                                    >

                                        {/* Centered Play Button Element */}
                                        <div className="relative z-30 w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out shadow-xl">
                                            <Play fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 ml-1" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Underlying Streaming Media Architecture */}
                            <video
                                ref={videoRef}
                                controls={hasPlayed} // Only display controls after the container is launched
                                preload="metadata"
                                playsInline
                                controlsList="nodownload"
                                className="w-full h-full object-cover"
                                onPlay={() => setHasPlayed(true)}
                            >
                                <source src={talkContent.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                            <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-neutral-400">
                                Conversation Recording
                            </span>
                        </div>
                    </div>

                    {/* TEXT CONTENT COLUMN */}
                    <div className="md:col-span-5 space-y-4 text-sm md:text-[16px] leading-[1.9] text-neutral-800 text-justify font-light">
                        {talkContent.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                </div>

                {/* 3. PHOTO GALLERY */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-40">
                    {talkContent.gallery.map((img, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="relative aspect-[5/4] overflow-hidden bg-neutral-100 shadow-sm cursor-zoom-in border border-neutral-100"
                            onClick={() => setSelectedIndex(i)}
                        >
                            <Image
                                src={img}
                                alt={`Gallery item ${i + 1}`}
                                fill
                                unoptimized
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover"
                            />
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
                            className="absolute top-12 right-12 z-[110] text-2xl font-light p-4 hover:rotate-90 transition-transform duration-300"
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
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-full max-w-5xl max-h-[80vh]"
                            >
                                <Image
                                    src={talkContent.gallery[selectedIndex]}
                                    alt="Detailed exhibition archive preview"
                                    fill
                                    unoptimized
                                    className="object-contain"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 5. FOOTER ARCHITECTURE */}
            <div className="relative z-10 w-full bg-[#0a1116] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <ContactStayInTouch
                    title="Stay in Touch"
                    subtitle="For any enquiries, thoughts and ideas please do not hesitate to reach out to us"
                    backgroundImage={{ src: "/images/art/talkscontact-bg.webp", alt: "GICA Talks Structural Background" }}
                />
                <Footer />
            </div>
        </main>
    );
}