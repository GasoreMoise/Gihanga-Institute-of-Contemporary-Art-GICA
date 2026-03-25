'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

// Exhibition data - ensure paths match your public folder
const exhibitions = [
    {
        slug: 'inuma-a-bird-shall-carry-the-voice',
        title: 'INUMA : A BIRD SHALL CARRY THE VOICE',
        period: '21 Dec 2025 - 19 March 2026',
        image: '/images/hero-exhibitions.webp', // Ensure this path is correct
        artists: [
            'Saana Gateja',
            'Innocent Nkurunziza',
            'Feline Ntabangana',
            'Francis Offman',
            'Kaneza Schaal',
            'Christian Nyampeta',
            'Cedric Mizero'
        ],
        curator: 'Kami Gahiga'
    }
];

export default function ExhibitionsPage() {
    const locale = useLocale();

    return (
        <main className="h-screen w-screen bg-white flex items-center justify-center font-sabon overflow-hidden selection:bg-black selection:text-white pt-24 md:pt-32">
            <div className="relative max-w-[1400px] w-full h-full flex flex-col items-center justify-center px-6 md:px-20 lg:px-32">

                {exhibitions.map((exh) => (
                    <div key={exh.slug} className="relative w-full h-[70vh] flex flex-col items-center justify-center">

                        {/* 1. The CENTER: The Main Exhibition Image container */}
                        <div className="relative w-full h-full max-w-4xl mx-auto flex flex-col items-center justify-center">

                            {/* Absolutly positioned Sidebar container (Pinned to the right of the image space) */}
                            <div className="absolute top-0 right-8 h-full w-[20%] hidden lg:flex flex-col justify-start z-20 translate-x-[110%] py-2">

                                {/* Float: Artists list at the top */}
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-[9px] tracking-[0.3em] text-neutral-300 uppercase font-bold border-b border-neutral-100 pb-2">
                                        Artists
                                    </h3>
                                    <ul className="space-y-1.5">
                                        {exh.artists.map((artist) => (
                                            <li key={artist} className="text-xs md:text-[13px] tracking-wide text-neutral-700 leading-relaxed">
                                                {artist}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Fix: Curator name pinned to the bottom of the sidebar height */}
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                    className="space-y-2 mt-auto"
                                >
                                    <h3 className="text-[9px] tracking-[0.3em] text-neutral-300 uppercase font-bold">
                                        Curated by
                                    </h3>
                                    <p className="text-xs md:text-[10px] font-bold tracking-widest text-black uppercase">
                                        {exh.curator}
                                    </p>
                                </motion.div>

                            </div>

                            {/* The clickable Image and Title block */}
                            <div className="relative w-full h-full flex flex-col items-center -mt-20 z-10">
                                <Link href={`/${locale}/exhibitions/${exh.slug}` as any} className="w-full h-full">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative mx-auto w-[300px] md:w-[500px] h-[350px] md:h-[350px] overflow-hidden bg-neutral-50 group cursor-crosshair"
                                    >
                                        <Image
                                            src={exh.image}
                                            alt={exh.title}
                                            fill
                                            priority
                                            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                                        />
                                    </motion.div>
                                </Link>

                                {/* Minimal Metadata - Pinned below the image */}
                                <div className="relative mt-8 text-center max-w-2xl mx-auto z-10">
                                    <motion.h2
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="text-sm md:text-base lg:text-lg font-bold tracking-[0.12em] uppercase mb-3 leading-tight text-black"
                                    >
                                        {exh.title}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        className="text-xs md:text-xs tracking-[0.25em] text-neutral-500 uppercase italic"
                                    >
                                        {/*exh.period */}
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