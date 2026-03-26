'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import Footer from '@/components/Footer';

const screeningContent = {
    title: "A Long Trailer for a Film About Lovers in a Dangerous Spacetime",
    year: "2021",
    format: "Film",
    duration: "40.3 Minutes",
    mainImage: "/images/artists/christian.webp",
    description: [
        "A playlist of music videos and conversations about “what we keep after everything has been washed away”—through serial catastrophes such as floods and hurricanes, and human-made disasters” (Ntone Edjabe). The songs, dances and movements in this and the forthcoming film are monuments, repository sites, or resting grounds for cultural memory.",
        "The playlist preludes Lovers in a Dangerous Spacetime, a forthcoming anthology film; a cinematic gathering of impossible loves whose frequencies surpass the limits of time and the bounds of space. The forthcoming film is made in episodes that include scenes produced in Lubumbashi, Leipzig, New York, Kampala and Kigali, rendered in fictions, songs, music videos, 3D animations, and archival recordings. Together, the scenes dramatise a montage of the diasporic: a planetary condition applicable also to those who remain in their native lands, whereby the existing ways of life are converted through forceful spiritual displacement and intense environmental transformations.",
        "A Long Trailer is co-directed with Shariffa Chelimo Ali. Featuring Hannah Black, Sasha Bonét, Alexis Kagame, Cécile Kayirebwa, Miriam Makeba, Natacha Nsahimana, Olu Oguibe, Emmanuel Olunkwa, and more."
    ],
    locationDate: "GICA Screening , Kigali | 21 December 2025"
};

export default function ScreeningDetailPage() {
    return (
        <main className="min-h-screen bg-white font-sabon selection:bg-black selection:text-white pt-32 text-black">

            <div className="max-w-[1400px] mx-auto px-6 md:px-20 lg:px-32 mb-40">
                {/* 1. EDITORIAL HEADER & METADATA */}
                <header className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 items-start">
                    <div className="md:col-span-4">
                        <h1 className="text-sm md:text-xl font-bold leading-tight tracking-wide uppercase max-w-xs">
                            {screeningContent.title}
                        </h1>
                    </div>

                    <div className="md:col-span-8 grid grid-cols-3 gap-4 border-t border-neutral-100 pt-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold text-black">
                        <div>{screeningContent.year}</div>
                        <div>{screeningContent.format}</div>
                        <div>{screeningContent.duration}</div>
                    </div>
                </header>

                {/* 2. CINEMATIC STILL & DESCRIPTION GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="md:col-span-6"
                    >
                        <div className="relative aspect-[4/3] w-full shadow-lg">
                            <Image
                                src={screeningContent.mainImage}
                                alt="Screening Still"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <div className="md:col-span-6 space-y-10">
                        <div className="space-y-8 text-sm md:text-[15px] leading-[1.9] text-neutral-800 text-justify">
                            {screeningContent.description.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        {/* Location and Date stamp */}
                        <div className="pt-10 text-right">
                            <p className="text-[11px] md:text-xs tracking-[0.2em] font-medium uppercase text-neutral-900">
                                {screeningContent.locationDate}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. INTEGRATED CONTACT SECTION (Unique Background) */}
            <div className="relative z-10 w-full bg-[#0a1116] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <ContactStayInTouch
                    title="Stay in Touch"
                    subtitle="For any enquiries, thoughts and ideas please do not hesitate to reach out to us"
                    backgroundImage={{
                        src: "/images/screeningscontact-bg.webp",
                        alt: "GICA Screening Contact"
                    }}
                />

                {/* 4. INTEGRATED FOOTER */}
                <Footer />
            </div>
        </main>
    );
}