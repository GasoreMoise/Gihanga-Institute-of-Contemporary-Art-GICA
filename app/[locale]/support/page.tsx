'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import Footer from '@/components/Footer';

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const supportingWays = [
    {
        title: "Friends of GICA",
        description: "Supports the development of the Koyo Kouoh Reference Library and GICA's public workshops for students and emerging practitioners.",
        benefit: "Acknowledgement in GICA's annual report and invitations to selected programmes.",
        icon: (
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[0.5px] fill-none stroke-[#B59A7D]">
                <path d="M30 80 L30 30 Q50 10 70 30 L70 80 M20 80 L80 80 M40 80 L40 50 M60 80 L60 50" />
            </svg>
        )
    },
    {
        title: "Patron's Circle",
        description: "Supports GICA's artist-in-residence programme and the development of associated public presentations.",
        benefit: "Invitation to annual gatherings and recognition across exhibitions and programmes.",
        icon: (
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[0.5px] fill-none stroke-[#B59A7D]">
                <path d="M20 80 L20 40 L50 20 L80 40 L80 80 Z M20 45 L80 45 M35 80 L35 45 M65 80 L65 45" />
            </svg>
        )
    },
    {
        title: "Programme Circle",
        description: "Supports a full annual cycle of exhibitions, research, and educational programmes.",
        benefit: "Recognition across exhibitions, publications, and digital platforms, as well as invitations to previews and dedicated visits.",
        icon: (
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[0.5px] fill-none stroke-[#B59A7D]">
                <path d="M25 80 L25 40 C25 15 75 15 75 40 L75 80 M20 80 L80 80" />
                <rect x="40" y="45" width="20" height="35" />
            </svg>
        )
    },
    {
        title: "Founding Benefactor",
        description: "A transformational contribution supporting GICA's long-term development, infrastructure, and institutional vision.",
        benefit: "Recognition at an institutional level, with the possibility of association with major commissions or spaces within the institute.",
        icon: (
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[0.5px] fill-none stroke-[#B59A7D]">
                <circle cx="50" cy="50" r="15" />
                {[...Array(24)].map((_, i) => (
                    <line key={i} x1="50" y1="50" x2={50 + 35 * Math.cos(i * 15 * Math.PI / 180)} y2={50 + 35 * Math.sin(i * 15 * Math.PI / 180)} />
                ))}
            </svg>
        )
    }
];

export default function SupportPage() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".support-item", {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".support-list",
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="bg-[#FAF6ED] font-sabon text-[#0A1116] selection:bg-black selection:text-white">

            {/* 1. HERO HEADER */}
            <section className="relative h-[80vh] md:h-[100vh] w-full flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/support-hero-3.webp" // Use the night view image from your wireframe
                    alt="GICA at night"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="relative z-10 text-center text-white px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl lg:text-8xl tracking-tight mb-6"
                    >
                        Support GICA
                    </motion.h1>
                    <p className="text-sm md:text-xl italic opacity-80 max-w-xl mx-auto">
                        To support GICA is to take part in the building of a cultural institution.
                    </p>
                </div>
            </section>

            {/* 2. INTRO TEXT */}
            <section className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-left">
                <div className="space-y-12">
                    <p className="text-md md:text-lg leading-relaxed opacity-80">
                        GICA is sustained through the generosity of individuals and partners who believe in the role of art as a space for thought, exchange, and possibility.
                    </p>
                    <p className="text-md md:text-lg leading-relaxed opacity-80">
                        As a young institution, its exhibitions, public programmes, and library are built gradually — through attention, collaboration, and support.
                    </p>
                    <div className="h-[1px] w-20 bg-black/10 mx-auto md:mx-0" />
                </div>
            </section>

            {/* 3. WAYS OF SUPPORTING */}
            <section className="max-w-4xl mx-auto px-6 pb-20">
                <h2 className="text-2xl md:text-3xl mb-20">Ways of Supporting</h2>

                <div className="support-list divide-y divide-black/5 border-t border-black/15">
                    {supportingWays.map((way, idx) => (
                        <div key={idx} className="support-item group grid grid-cols-1 md:grid-cols-12 py-12 md:py-16 gap-8 md:gap-4 items-start transition-colors hover:bg-black/[0.01]">
                            <div className="md:col-span-2 flex justify-center md:justify-start">
                                <div className="w-16 h-16 md:w-20 md:h-20 opacity-100 group-hover:opacity-100 transition-opacity">
                                    {way.icon}
                                </div>
                            </div>
                            <div className="md:col-span-5 space-y-4">
                                <h3 className="text-xl md:text-2xl italic">{way.title}</h3>
                                <p className="text-sm opacity-60 leading-relaxed pr-8">{way.description}</p>
                            </div>
                            <div className="md:col-span-5 md:border-l border-black/15 md:pl-12 pt-4 md:pt-0">
                                <p className="text-sm italic opacity-60 leading-relaxed">
                                    {way.benefit}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* 4. YOUTH PROGRAMME (Highlighted Section) */}
                    <div className="support-item bg-black/[0.03] -mx-6 px-6 md:mx-0 md:px-0 grid grid-cols-1 md:grid-cols-12 py-16 md:py-24 pb-10 gap-8 md:gap-4 items-center">
                        <div className="md:col-span-2 flex justify-center md:justify-start md:pl-12">
                            <div className="w-20 h-20 opacity-60">
                                <svg viewBox="0 0 100 100" className="w-full h-full stroke-[0.5px] fill-none stroke-[#B59A7D]">
                                    <circle cx="35" cy="40" r="10" />
                                    <circle cx="65" cy="40" r="10" />
                                    <path d="M20 80 Q50 60 80 80" />
                                </svg>
                            </div>
                        </div>
                        <div className="md:col-span-9 space-y-6 md:pl-8">
                            <h3 className="text-2xl md:text-3xl italic">Youth Programme Support</h3>
                            <div className="space-y-4 text-sm md:text-base opacity-70 leading-relaxed max-w-3xl">
                                <p>GICA is developing a programme dedicated to young audiences in Rwanda, including workshops, guided visits, and educational encounters with artists.</p>
                                <p>Support for this initiative enables access to art for the next generation — creating spaces for learning, reflection, and critical engagement.</p>
                            </div>
                        </div>
                    </div>

                    {/* 5. CONTACT CTA */}
                    <div className="grid grid-cols-1 md:grid-cols-12 py-16 gap-8 items-center border-b border-black/5">
                        <div className="md:col-span-2 flex justify-center md:justify-start">
                            <div className="w-16 h-16 opacity-100">
                                <svg viewBox="0 0 100 100" className="w-full h-full stroke-[0.5px] fill-none stroke-[#B59A7D]">
                                    <rect x="20" y="30" width="60" height="40" />
                                    <path d="M20 30 L50 55 L80 30" />
                                </svg>
                            </div>
                        </div>
                        <div className="md:col-span-5 text-sm md:text-base opacity-70">
                            For further information on supporting GICA, or to discuss a contribution, please contact:
                            <a href="mailto:administration@gica.art" className="block font-bold mt-2 hover:opacity-50 transition-opacity">administration@gica.art</a>
                        </div>
                        <div className="md:col-span-5 md:border-l border-black/5 md:pl-12 text-lg italic opacity-50">
                            We would be glad to speak with you directly.
                        </div>
                    </div>
                </div>
            </section>

            {/* UNIFIED FOOTER SECTIONS */}
            <div className="relative z-20 w-full bg-[#0a1116] shadow-[0_-20px_80px_rgba(0,0,0,0.15)]">
                <ContactStayInTouch
                    title="Stay In Touch"
                    subtitle="For any enquiries, thoughts, and ideas please do not hesitate to reach out to us."
                    backgroundImage={{
                        src: "/images/support-hero-4.webp",
                        alt: "Support Contact Background"
                    }}
                />
                <Footer />
            </div>
        </main>
    );
}