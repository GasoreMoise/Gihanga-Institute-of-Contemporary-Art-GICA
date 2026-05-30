'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

const screenings = [
    {
        slug: 'a-long-trailer-for-a-film-about-lovers',
        title: 'A Long Trailer for a Film About Lovers in a Dangerous Spacetime',
        period: '21 December 2025',
        image: '/images/hero-screenings.webp',
        artists: [
            'Christian Nyampeta',
            'Shariffa Chelimo Ali',
            'Hannah Black',
            'Sasha Bonét',
            'Alexis Kagame',
            'Cécile Kayirebwa',
            'Miriam Makeba'
        ],
        curator: 'GICA'
    }
];

export default function ScreeningsPage() {
    const locale = useLocale();

    return (
        <main className="h-screen w-screen bg-white flex items-center justify-center font-sabon overflow-hidden selection:bg-black selection:text-white pt-24 md:pt-32">
            <div className="relative max-w-[1400px] w-full h-full flex flex-col items-center justify-center px-6 md:px-20 lg:px-32">

                {screenings.map((scr) => (
                    <div key={scr.slug} className="relative w-full h-[70vh] flex flex-col items-center justify-center">

                        {/* 1. The CENTER: The Main Screening Image container */}
                        <div className="relative w-full h-full max-w-4xl mx-auto flex flex-col items-center justify-center">

                            {/* Sidebar container (Pinned to the right of the image space) */}
                            <div className="absolute top-0 right-8 h-full w-[20%] hidden lg:flex flex-col justify-start z-20 translate-x-[110%] py-2">

                                {/* Artists/Collaborators list */}
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-[9px] tracking-[0.3em] text-neutral-300 uppercase font-bold border-b border-neutral-100 pb-2">
                                        Contributors
                                    </h3>
                                    <ul className="space-y-1.5">
                                        {scr.artists.map((artist) => (
                                            <li key={artist} className="text-xs md:text-[13px] tracking-wide text-neutral-700 leading-relaxed">
                                                {artist}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Curator/Organization info */}
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                    className="space-y-2 mt-auto"
                                >
                                    <h3 className="text-[9px] tracking-[0.3em] text-neutral-300 uppercase font-bold">
                                        Presented by
                                    </h3>
                                    <p className="text-xs md:text-[10px] font-bold tracking-widest text-black uppercase">
                                        {scr.curator}
                                    </p>
                                </motion.div>

                            </div>

                            {/* Clickable Image and Title block */}
                            <div className="relative w-full h-full flex flex-col items-center -mt-20 z-10">
                                <Link href={`/${locale}/screenings/${scr.slug}` as any} className="w-full h-full">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative mx-auto w-[300px] md:w-[500px] h-[350px] md:h-[350px] overflow-hidden bg-neutral-50 group cursor-pointer shadow-sm"
                                    >
                                        <Image
                                            src={scr.image}
                                            alt={scr.title}
                                            fill
                                            priority
                                            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                                        />
                                        {/* Play Indicator Overlay for Screenings */}
                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm">
                                                <svg className="w-5 h-5 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>

                                {/* Metadata - Pinned below the image */}
                                <div className="relative mt-8 text-center max-w-2xl mx-auto z-10 px-4">
                                    <motion.h2
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="text-sm md:text-base lg:text-lg font-bold tracking-[0.12em] uppercase mb-3 leading-tight text-black"
                                    >
                                        {scr.title}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        className="text-xs md:text-xs tracking-[0.25em] text-neutral-500 uppercase italic"
                                    >
                                        {scr.period}
                                    </motion.p>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}