'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger, SplitText } from 'gsap/all';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import Footer from '@/components/Footer';

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

const guidelines = [
    {
        id: "01",
        title: "Preservation",
        subtitle: "Please Do Not Touch The Artworks",
        description: "Please keep a respectful distance from all artworks, frames, and display cases. Even gentle contact can affect the artworks."
    },
    {
        id: "02",
        title: "Presence",
        subtitle: "Silence Your Phones & Lower Your Voices",
        description: "We invite you to be present with the art and considerate of those around you. Please set phones to silent, take calls outside, and keep conversations at a courteous volume."
    },
    {
        id: "03",
        title: "Purity",
        subtitle: "No Food or Beverages in Exhibition Spaces",
        description: "To protect the artworks and maintain a clean environment, please enjoy food and drinks only in designated areas."
    },
    {
        id: "04",
        title: "Memory",
        subtitle: "Photography for Personal Use Only",
        description: "We encourage you to capture your experience at GICA. However, tripods, professional equipment, and commercial or promotional photography/videos are prohibited."
    },
    {
        id: "05",
        title: "Security",
        subtitle: "Bags Policy",
        description: "Large bags, backpacks, and umbrellas must be left at the reception. Small handbags and purses are welcome."
    },
    {
        id: "06",
        title: "Filming",
        subtitle: "Security & Filming Notice",
        description: "For the safety of our visitors, staff, and artworks, GICA uses security video monitoring throughout the premises. By entering, you acknowledge that video surveillance is in operation for security purposes."
    },
    {
        id: "07",
        title: "Animals",
        subtitle: "Pets",
        description: "Pets are not permitted inside GICA. Certified service animals are welcome."
    }
];

const faqs = [
    {
        question: "Is GICA entry free?",
        answer: "Yes. GICA is currently free to the public."
    },
    {
        question: "Do I need to book in advance?",
        answer: "No booking is required for general visits. Some talks, screenings, or workshops may require prior registration, which will be available via our website."
    },
    {
        question: "What are the opening hours?",
        answer: "Tuesday - Sunday. 11:00 AM - 5:00 PM (Closed on Mondays)"
    },
    {
        question: "Where is GICA located?",
        answer: "KN 14 St 28, Kimihurura, Kigali, Rwanda. Pedestrian access is via the small walkway facing the 14th Avenue. Parking access is available via Boho and 14th Avenue, only drop-off in front of GICA."
    },
    {
        question: "Is GICA accessible?",
        answer: "The ground floor is accessible. The first floor and lower ground floor are accessed via stairs. If you require accessibility support, please contact us in advance and we will do our best to accomodate your visit."
    }
];

export default function VisitorGuide() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useGSAP(() => {
        // 1. Reveal Title with SplitText
        const titleSplit = new SplitText(".hero-title", { type: "chars" });
        gsap.from(titleSplit.chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: 0.05,
            duration: 1.5,
            ease: "power4.out"
        });

        // 2. Parallax Background Scale
        gsap.to(".hero-bg", {
            scale: 1.2,
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // 3. Elegant Staggered Entry for Guidelines
        const items = gsap.utils.toArray('.guide-card');
        items.forEach((item: any) => {
            const q = gsap.utils.selector(item);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(item, { opacity: 0, y: 100, duration: 1.2, ease: "expo.out" })
                .from(q(".guide-number"), { scale: 0, opacity: 0, duration: 0.8 }, "-=0.8")
                .from(q(".guide-line"), { width: 0, duration: 1 }, "-=0.5");
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="bg-[#FDFBF7] font-sabon selection:bg-black selection:text-white overflow-x-hidden text-black">

            {/* 1. CINEMATIC HERO SECTION */}
            <section className="hero-section relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                <div className="hero-bg absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <Image
                        src="/images/visit-bg.webp"
                        alt="GICA Sanctuary"
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                </div>

                <div className="relative z-20 text-center text-white px-6">
                    <h1 className="hero-title text-3xl md:text-5xl font-bold tracking-[0.2em] mb-6 italic">
                        Codes Of Conduct
                    </h1>
                    <div className="w-20 h-[1px] bg-white/50 mx-auto mb-8" />
                    <p className="text-xs md:text-sm tracking-[0.5em] uppercase font-light opacity-80">
                        Guiding your experience within the GICA
                    </p>
                </div>

                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="absolute bottom-12 z-20 flex flex-col items-center gap-4"
                >
                    <span className="text-[9px] tracking-[0.4em] uppercase text-white/40">Scroll to Explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
                </motion.div>
            </section>

            {/* 2. THE EDITORIAL GUIDE */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-20 lg:px-32 py-40 md:py-64">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
                        <h2 className="text-[10px] tracking-[0.5em] uppercase font-bold text-neutral-300 mb-12">
                            Ethos
                        </h2>
                        <p className="text-2xl md:text-3xl leading-relaxed italic text-neutral-800">
                            "We believe that art is a collective responsibility. Your presence here is an act of care."
                        </p>
                    </div>

                    <div className="lg:col-span-8 space-y-48 md:space-y-72">
                        {guidelines.map((guide) => (
                            <div key={guide.id} className="guide-card relative flex flex-col md:flex-row gap-12 group">
                                <div className="guide-number text-4xl md:text-6xl font-bold text-neutral-500 absolute -left-2 md:-left-8 -top-6 md:-top-12 z-0 transition-colors group-hover:text-black">
                                    {guide.id}
                                </div>
                                <div className="relative z-10 flex-1">
                                    <div className="guide-line h-[1px] bg-black/10 w-full mb-12" />
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-8">
                                        <h3 className="text-xs tracking-[0.4em] uppercase text-neutral-400 font-bold">{guide.title}</h3>
                                        <h4 className="text-2xl md:text-4xl font-normal italic tracking-tight">{guide.subtitle}</h4>
                                    </div>
                                    <p className="text-sm md:text-lg leading-[1.8] text-neutral-600 text-justify max-w-2xl font-light">
                                        {guide.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. NOTICE BANNER */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-12">
                        <p className="text-neutral-900 text-sm tracking-[0.3em] uppercase max-w-lg mx-auto leading-loose">
                            To ensure a safe and welcoming environment for all, visitors who do not respect these guidelines may be asked to leave. Your cooperation helps us protect the institution, its artworks and our community.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 3. ASSISTANCE BANNER */}
            <section className="border-t border-neutral-100 py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-12">
                        <h2 className="text-3xl md:text-5xl tracking-tighter font-normal italic">Need assistance during your visit?</h2>
                        <p className="text-neutral-900 text-sm tracking-[0.3em] uppercase max-w-lg mx-auto leading-loose">
                            Our staff is here to make your visit enjoyable and enriching. If you are unsure about anything, please ask, we are happy to assist.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 4. FAQs SECTION (New Interactivity) */}
            <section className="bg-white py-40 px-6 md:px-20 lg:px-32 border-t border-neutral-100">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
                        <h2 className="text-3xl md:text-6xl font-normal tracking-tight">FAQs</h2>
                        <span className="text-[10px] tracking-[0.5em] uppercase text-neutral-400 font-bold">Information Hub</span>
                    </div>

                    <div className="space-y-2">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-neutral-100 last:border-none">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full py-10 flex justify-between items-center group text-left"
                                >
                                    <span className="flex items-baseline gap-6">
                                        <span className="text-[10px] font-bold text-neutral-300">{index + 1}.</span>
                                        <span className="text-lg md:text-2xl font-normal group-hover:pl-4 transition-all duration-500 ease-out italic">
                                            {faq.question}
                                        </span>
                                    </span>
                                    <div className="relative w-6 h-6 flex items-center justify-center">
                                        <div className="absolute w-full h-[1px] bg-black" />
                                        <motion.div
                                            animate={{ rotate: openFaq === index ? 0 : 90 }}
                                            className="absolute w-full h-[1px] bg-black"
                                        />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-12 pl-12 pr-6">
                                                <p className="text-sm md:text-lg text-neutral-500 max-w-2xl leading-relaxed bg-neutral-50 p-8 border-l-2 border-black italic">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. UNIFIED FOOTER SECTIONS */}
            <div className="relative z-20 w-full bg-[#0a1116] shadow-[0_-20px_80px_rgba(0,0,0,0.15)]">
                <ContactStayInTouch
                    title="Stay In Touch"
                    subtitle="For any enquiries, thoughts, and ideas please do not hesitate to reach out to us."
                    backgroundImage={{
                        src: "/images/visitcontact-bg.webp",
                        alt: "GICA Visit Inquiry"
                    }}
                />
                <Footer />
            </div>
        </main>
    );
}