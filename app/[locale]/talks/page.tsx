'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

const talks = [
    {
        slug: 'culture-philosophy-and-space',
        title: 'CULTURE, PHILOSOPHY, AND SPACE',
        period: 'Thursday, 22 January 2025',
        image: '/images/hero-talks.webp',
        speakers: [
            'Carole Karemera',
            'Christian Benimana',
            'Alex Ndibwami',
            'Andrew Todd',
            'Lisa Katangali'
        ],
        presentedBy: 'GICA'
    }
];

export default function TalksPrePage() {
    const locale = useLocale();

    return (
        <main className="h-screen w-screen bg-white flex items-center justify-center font-sabon overflow-hidden selection:bg-black selection:text-white pt-24 md:pt-32 text-black">
            <div className="relative max-w-[1400px] w-full h-full flex flex-col items-center justify-center px-6 md:px-20 lg:px-32">
                {talks.map((talk) => (
                    <div key={talk.slug} className="relative w-full h-[70vh] flex flex-col items-center justify-center">

                        {/* Sidebar (Pinned Right) */}
                        <div className="absolute top-0 right-16 h-full w-[20%] hidden lg:flex flex-col justify-start z-20 translate-x-[110%] py-2">
                            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="space-y-6">
                                <h3 className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold border-b border-neutral-100 pb-2">Speakers</h3>
                                <ul className="space-y-1.5">
                                    {talk.speakers.map((speaker) => (
                                        <li key={speaker} className="text-xs md:text-[13px] tracking-wide text-neutral-700 leading-relaxed">{speaker}</li>
                                    ))}
                                </ul>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="space-y-2 mt-auto">
                                <h3 className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold">Presented by</h3>
                                <p className="text-xs md:text-[10px] font-bold tracking-widest text-black uppercase">{talk.presentedBy}</p>
                            </motion.div>
                        </div>

                        {/* Central Block */}
                        <div className="relative w-full h-full flex flex-col items-center -mt-20 z-10">
                            <Link href={`/${locale}/talks/${talk.slug}` as any} className="w-full h-full">
                                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="relative mx-auto w-[300px] md:w-[500px] h-[350px] md:h-[350px] overflow-hidden bg-neutral-50 group cursor-pointer shadow-sm">
                                    <Image src={talk.image} alt={talk.title} fill priority className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
                                </motion.div>
                            </Link>
                            <div className="relative mt-8 text-center max-w-2xl mx-auto z-10 px-4">
                                <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-sm md:text-base lg:text-lg font-bold tracking-[0.12em] uppercase mb-3 text-black">
                                    {talk.title}
                                </motion.h2>
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xs tracking-[0.25em] text-neutral-500 uppercase italic">
                                    {talk.period}
                                </motion.p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </main>
    );
}