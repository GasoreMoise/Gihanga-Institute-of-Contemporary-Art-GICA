'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BookVisit() {
    const [isMounted, setIsMounted] = useState(false);

    // Dynamic layout override hook to temporarily suppress global navigation layout elements
    useEffect(() => {
        setIsMounted(true);

        // Target the main header or navbar element in your global layout
        // Update the selector if your navbar uses a different ID or distinct tag wrapper
        const globalNavbar = document.querySelector('header') || document.querySelector('.global-nav');

        if (globalNavbar) {
            globalNavbar.classList.add('hidden');
        }

        // Cleanup function: Restores the navbar visibility instantly when navigating away from /visit
        return () => {
            if (globalNavbar) {
                globalNavbar.classList.remove('hidden');
            }
        };
    }, []);

    if (!isMounted) {
        return <div className="min-h-screen bg-[#FDFBF7]" />;
    }

    return (
        <main className="min-h-screen bg-[#FDFBF7] font-sabon text-black overflow-hidden flex flex-col md:flex-row">

            {/* LEFT SIDE: THE ATMOSPHERE */}
            <section className="relative w-full md:w-1/2 h-[40vh] md:h-screen overflow-hidden border-r border-black/5">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/images/gateja.webp"
                        alt="GICA Architecture and Space"
                        fill
                        priority
                        className="object-cover brightness-[0.6] grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1116]/40 via-transparent to-transparent" />
                </motion.div>
                <div className="absolute bottom-12 left-12 z-20 text-white hidden md:block">
                    <h1 className="text-3xl font-normal tracking-[0.2em] uppercase max-w-sm leading-relaxed">
                        Book Your Visit
                    </h1>
                </div>
            </section>

            {/* RIGHT SIDE: THE INSTITUTIONAL COMING SOON CURATION */}
            <section className="w-full md:w-1/2 min-h-[60vh] md:h-screen flex flex-col justify-between px-8 md:px-20 lg:px-28 py-16 bg-white relative">

                {/* Central Editorial Content Layout */}
                <div className="max-w-xl my-auto py-12 space-y-8">
                    <div className="space-y-3">
                        <h2 className="text-lg md:text-2xl lg:text-4xl font-light tracking-tight italic leading-[1.15] text-neutral-900">
                            Booking Platform Coming Soon
                        </h2>
                    </div>

                    <div className="w-12 h-[1px] bg-black/20" />

                    <p className="text-sm md:text-base leading-[1.85] text-neutral-600 text-justify font-light">
                        We are currently fine-tuning our dynamic invitation framework to provide a seamless scheduling journey for researchers, artists, and the public. Once launched, you will be able to programmatically secure tailored time blocks, organize group-gatherings, and view current exhibition hours seamlessly.
                    </p>

                    {/* Minimalist Return Prompt Alternative Indicator */}
                    <div className="pt-4">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-medium">
                            For urgent administrative or curatorial visit requests, please reach out via our primary contact directory.
                        </p>
                    </div>
                </div>

            </section>
        </main>
    );
}