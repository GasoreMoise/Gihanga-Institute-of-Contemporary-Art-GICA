'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import Footer from '@/components/Footer';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const teamData = [
    {
        category: "Leadership",
        members: [
            { name: "Kami Gahiga", role: "Co-Founding Director" },
            { name: "Kaneza Schaal", role: "Co-Founding Director" }
        ]
    },
    {
        category: "Programme & Research",
        members: [
            { name: "Christian Nyampeta", role: "Library & Film Custodian" },
            { name: "Dan Ngalamulume", role: "Programme Coordinator" }
        ]
    },
    {
        category: "Operations",
        members: [
            { name: "Fred Rwaka", role: "Lead Operations" },
            { name: "Denyse Niyonzima", role: "Administrator" }
        ]
    },
    {
        category: "Communications & Digital",
        members: [
            { name: "Iris Teta", role: "Communications Officer" },
            { name: "Moise NSHUTI GASORE", role: "Digital Platform & Documentation" }
        ]
    }
];

export default function TeamPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray('.team-section');

        sections.forEach((section: any) => {
            gsap.from(section.querySelectorAll('.member-item'), {
                y: 40,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="bg-[#FAF6ED] min-h-screen font-sabon text-[#1A1A1A] selection:bg-black selection:text-white">

            {/* HEADER SECTION */}
            <section className="pt-40 pb-8 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "circOut" }}
                >
                    <h1 className="text-3xl md:text-5xl font-normal mb-6 tracking-tight">Team</h1>
                    <div className="w-12 h-[1px] bg-black/20 mb-20" />
                </motion.div>
            </section>

            {/* TEAM LIST SECTION */}
            <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pb-40 md:pb-28">
                <div className="space-y-16 md:space-y-32">
                    {teamData.map((group) => (
                        <div key={group.category} className="team-section">
                            {/* Category Label */}
                            <h2 className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-black/30 mb-16 border-b border-black/5 pb-4">
                                {group.category}
                            </h2>

                            {/* Members Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 md:gap-y-32">
                                {group.members.map((member) => (
                                    <div key={member.name} className="member-item group">
                                        <h3 className="text-2xl md:text-3xl font-normal mb-2 transition-colors duration-500 group-hover:text-black/50">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm md:text-base italic text-black/40 font-light">
                                            {member.role}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FOOTER AREA */}
            <div className="relative z-20 w-full bg-[#0a1116] shadow-[0_-20px_80px_rgba(0,0,0,0.05)]">
                <ContactStayInTouch
                    title="Stay In Touch"
                    subtitle="Collaborate with us or join our community of thinkers and creators."
                    backgroundImage={{
                        src: "/images/visitcontact-bg.webp",
                        alt: "GICA Team Contact"
                    }}
                />
                <Footer />
            </div>
        </main>
    );
}