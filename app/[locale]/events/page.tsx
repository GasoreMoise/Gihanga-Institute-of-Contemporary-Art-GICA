'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

/* Existing events data preserved for future use
  const events = [
      {
          slug: 'zeitz-mocaa-art-tour-dinner',
          title: 'ZEITZ MOCAA ART TOUR DINNER',
          period: 'November 2025',
          image: '/images/dinner/hero-bg.webp',
          curator: 'GICA'
      }
  ];
*/

export default function EventsPrePage() {
    const locale = useLocale();

    // TEMPORARY "COMING SOON" VIEW
    return (
        <main className="h-screen w-screen bg-[#0A1116] flex items-center justify-center font-sabon overflow-hidden selection:bg-[#B59A7D] selection:text-black text-white">

            {/* Background Emblem Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <img src="/logos/crane.png" alt="" className="w-full h-auto max-w-4xl transition-opacity duration-1000" />
            </div>

            <div className="relative z-10 text-center space-y-12 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl italic tracking-tight leading-none drop-shadow-2xl">
                        Events at GICA
                    </h1>
                    <div className="h-[1px] w-24 bg-[#B59A7D] mx-auto mt-10 opacity-40" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="space-y-6"
                >
                    <p className="text-xs md:text-sm tracking-[0.6em] uppercase font-bold text-[#B59A7D]">
                        Coming Soon
                    </p>
                    <p className="text-sm md:text-lg italic opacity-50 max-w-lg mx-auto leading-relaxed">
                        Our upcoming programme of events is currently being curated. Join our newsletter to receive news and information about our events.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="pt-8"
                >
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center gap-4 text-[10px] tracking-[0.5em] uppercase font-bold opacity-40 hover:opacity-100 transition-all group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                        Return
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Vignette */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#0A1116] pointer-events-none opacity-60" />
        </main>
    );
}

/* ORIGINAL PAGE CONTENT (Commented out for future restoration)
  -----------------------------------------------------------
  return (
        <main className="h-screen w-screen bg-white flex items-center justify-center font-sabon overflow-hidden selection:bg-black selection:text-white pt-24 md:pt-32 text-black">
            <div className="relative max-w-[1400px] w-full h-full flex flex-col items-center justify-center px-6 md:px-20 lg:px-32">
                {events.map((event) => (
                    <div key={event.slug} className="relative w-full h-[70vh] flex flex-col items-center justify-center">
                        <div className="absolute top-0 right-8 h-full w-[20%] hidden lg:flex flex-col justify-start z-20 translate-x-[110%] py-2">
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="space-y-2 mt-auto"
                            >
                                <h3 className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-bold">Organized by</h3>
                                <p className="text-xs md:text-[10px] font-bold tracking-widest text-black uppercase">{event.curator}</p>
                            </motion.div>
                        </div>
                        <div className="relative w-full h-full flex flex-col items-center -mt-20 z-10">
                            <Link href={`/${locale}/events/${event.slug}` as any} className="w-full h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative mx-auto w-[300px] md:w-[500px] h-[350px] md:h-[350px] overflow-hidden bg-neutral-50 group cursor-pointer shadow-sm"
                                >
                                    <Image src={event.image} alt={event.title} fill priority className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
                                </motion.div>
                            </Link>
                            <div className="relative mt-8 text-center max-w-2xl mx-auto z-10 px-4">
                                <motion.h2 className="text-sm md:text-base lg:text-lg font-bold tracking-[0.12em] uppercase mb-3 leading-tight text-black">{event.title}</motion.h2>
                                <motion.p className="text-xs tracking-[0.25em] text-neutral-500 uppercase italic">{event.period}</motion.p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
*/