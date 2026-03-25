'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import Footer from '@/components/Footer';

const galleryData = [
    { id: 1, src: '/images/inuma/work1.webp', artist: 'Cedric Mizero', work: 'Rafia Sculpture Work, 2025', credit: 'Photo: Aniket Uke' },
    { id: 2, src: '/images/inuma/work2.webp', artist: 'Saana Gateja', work: 'Revival', credit: 'Photo: Aniket Uke' },
    { id: 3, src: '/images/inuma/work3.webp', artist: 'Christian Nyampeta (left) and Saana Gateja (right)', work: 'Installation View', credit: 'Photo: Aniket Uke' },
    { id: 4, src: '/images/inuma/work4.webp', artist: 'Christian Nyampeta', work: 'Installation View, 2025', credit: 'Photo: Aniket Uke' },
    { id: 5, src: '/images/inuma/work5.webp', artist: 'Francis Offman', work: 'Untitled, 2025', credit: 'Photo: Aniket Uke' },
    { id: 6, src: '/images/inuma/work6.webp', artist: 'Kaneza Schaal (left) and Francis Offman (right)', work: 'Installation View, 2025', credit: 'Photo: Aniket Uke' },
    { id: 7, src: '/images/inuma/work7.webp', artist: 'Francis Offman', work: 'Installation View, 2025', credit: 'Photo: Aniket Uke' },
    { id: 8, src: '/images/inuma/kaneza.webp', artist: 'Kaneza Schaal', work: 'Installation View, 2025', credit: 'Photo: Aniket Uke' },
    { id: 9, src: '/images/inuma/work8.webp', artist: 'Francis Offman', work: 'Installation View, 2025', credit: 'Photo: Aniket Uke' },
    { id: 10, src: '/images/inuma/work9.webp', artist: 'Francis Offman', work: 'Installation View, GICA Grand Opening, 2025', credit: 'Photo: Aniket Uke' },
    { id: 11, src: '/images/inuma/work10.webp', artist: 'Saana Gateja', work: 'Installation View, 2025', credit: 'Photo: Aniket Uke' },
    { id: 12, src: '/images/inuma/work11.webp', artist: 'Saana Gateja', work: 'Installation View, 2025', credit: 'Photo: Aniket Uke' },
    { id: 13, src: '/images/inuma/work12.webp', artist: 'Innocent Nkurunziza', work: 'Installation View, 2025', credit: 'Photo: Aniket Uke' },
    { id: 14, src: '/images/inuma/work13.webp', artist: 'Feline Ntabangana', work: 'Installation View, 2025', credit: 'Photo: Aniket Uke' },
];

const artistProfiles = [
    {
        name: 'Sanaa Gateja',
        img: '/images/artists/saana.webp',
        bio: "spent his early childhood in Rwanda before moving at the age of five to Kisoro, then part of the Kingdom of Rwanda. Kisoro sits within a landscape where lineages, culture and traditions moved freely between what are now Rwanda and Uganda. After studying interior design in Florence and jewellery at Goldsmiths in London, where Gateja first engaged with paper beads as a material of wartime resourcefulness, the artist returned to Uganda in 1990. There, he dedicated himself to teaching paper bead-making, generating sustainable economic opportunities for women and youth across the region. Gateja allows each material to retain its own narrative, weaving them into abstract, mosaic-like compositions that meditate on social, political, and environmental realities. He presents textile works that operate as communal archives and sculptural abstractions. These pieces articulate a profound connection to place and bridge ancestral craft with contemporary ecological consciousness, affirming art-making as an act of spiritual reclamation.",
        exhibitions: "Gateja’s work has been presented in Africa at Makerere Art Gallery, Makerere University (Kampala, Uganda); Afriart Gallery (Kampala, Uganda); and 50 Golborne (Shela, Kenya / London, United Kingdom). Internationally, his work has been shown at the 58th Carnegie International (Pittsburgh, United States, 2022–2023); Karma Gallery (New York, United States, solo exhibition, 2023); and institutions including the Museum of Art and Design (New York, United States), and the de Young Museum (San Francisco, United States). His work is held in public collections including the Kigali Genocide Memorial (Kigali, Rwanda); Uganda Museum (Kampala, Uganda); the Victoria and Albert Museum (London, United Kingdom); the Carnegie Museum of Art (Pittsburgh, United States); and the National Museum of Scotland (Edinburgh, United Kingdom). Sanaa Gateja represented the Ugandan Pavilion at the 60th Venice Biennale in 2024."
    },
    {
        name: 'Innocent Nkurunziza',
        img: '/images/artists/innocent.webp',
        bio: "is a Rwandan artist known for turning to earth, clay, bark cloth, mud and natural pigment as sites of expression. As with Sanaa Gateja, who was Nkurunziza’s mentor, barkcloth is the primary choice of support for his paintings, a natural and renewable material from the Moraceae tree which he processes into a soft, malleable material similar to canvas. His large abstract paintings train the gaze of the viewers into meditative states that seek to usher them into elevated states of consciousness. Nkurunziza’s abstract compositions are suffused in spiritual symbolism, anatomical motifs and references to the land. As the co-founder of Inema Arts Center and a catalyst of Rwanda’s artistic ecosystem, Nkurunziza’s work embodies both individual healing and community-building. In Inuma, his monumental works suggest that to create is to listen to the land and our immediate environment, allowing expression to emerge from soil and silence alike.",
        exhibitions: "Innocent Nkurunziza has exhibited his work internationally including the Biennale de Dakar in 2024. His work is part of prominent art collections including the Rubell Museum in Miami and the Melinda Gates Foundation."
    },
    {
        name: 'Feline Ntabangana',
        img: '/images/artists/feline.webp',
        bio: "is a multidisciplinary artist whose practice explores themes of gender, violence, resilience, and embodied memory. Her work carries the emotional weight of testimony, drawing from both personal and collective wounds to create spaces of transformation across multiple forms and materials. In Inuma, Ntabangana’s presentation aligns with an aesthetic of defiant softness, bold color, gesture, and movement, while maintaining a quiet and intimate presence. The artist invokes the body as a site of knowledge, repair, and renewal.",
        exhibitions: "“My work is inspired by the emotions, memories, and experiences that shape the human I am. I use movement, color, and intuition to create abstract paintings that express what words cannot always hold. Painting is both physical and emotional for me a way to release, remember, and be. Living between Kigali and New York, I return often to the body, to womanhood, and the quiet stories carry inside.”"
    },
    {
        name: 'Francis Offman',
        img: '/images/artists/francis.webp',
        bio: "is a Rwandan artist whose work is composed of unstretched canvases, salvaged textiles, coffee grounds and discarded printed matter. Offman’s aesthetic draws from Italian modernism and Rwandan oral traditions, creating visual palimpsests that hold memory, migration and colonial afterlives within their textures. In Inuma, Offman’s work speaks to the slow, devotional labor of assembling stories from fragments, donated found material and the ethical demand of confronting the layered and complex violences of the past.",
        exhibitions: "Francis Offman's solo and group exhibitions include Weaving Stories at Secession, Vienna (2025); Economics of Painting, Mead Gallery, Warwick Arts Centre, Coventry, UK (2024); Notes from the Heart, La Società delle Api, Monaco, MC (2024); uMoya: The Sacred Return of Lost Things at Tate Liverpool, part of the Liverpool Biennial, UK (2023); and Italian Painting Today at Triennale Milano, Italy (2023). His works are included in the collections of Frac Bretagne, Rennes, France; the Museo d'Arte Moderna di Bologna, Bologna, Italy; MACRO – Museum of Contemporary Art of Rome, Rome, Italy; Castello di Rivoli – Museo d'Arte Contemporanea, Turin, Italy; and the Hammer Museum, Los Angeles, US."
    },
    {
        name: 'Kaneza Schaal',
        img: '/images/artists/kaneza.webp',
        bio: "works in opera, film, and photography. Her practice centers on how ideas move between people in shared spaces. Schaal’s work investigates the conditions of gathering and how knowledge is transmitted, withheld, misread, and made visible. Her recent photographic project examines invisible technologies, secrets, and the fallacy of visibility as protection. Across media, she approaches form as a site of translation. Her work has shown in divergent contexts, from courtyards in Vietnam to rural auditoriums in the United Arab Emirates; Ubumuntu Arts Festival Kigali to Museum of Contemporary Art Chicago; Holland Festival to Walker Arts Center; and Cairo International Theater Festival to Contemporary Arts Center Cincinnati.",
        exhibitions: "Schaal is a Guggenheim Fellow and a recipient of the Doris Duke Artist Award, Herb Alpert Award in Theatre, United States Artists Fellowship, Soros Arts Migration and Public Space Fellowship, and Ford Foundation Art for Justice Bearing Witness Award. She directed the 2023 Pulitzer Prize winning opera Omar and wrote and directed BLKNWS: Terms & Conditions, named one of The New York Times’ Best Films of 2025. She has lectured at Princeton and Yale Universities, taught at Harvard University, and served as the Denzel Washington Endowed Chair in Theatre at Fordham University. Schaal is a co-founder of the Gihanga Institute of Contemporary Art in Kigali."
    },
    {
        name: 'Christian Nyampeta',
        img: '/images/artists/christian.webp',
        bio: "is a Rwandan artist known for moving-image works, sculptures, installations and publications. His research-driven practice operates at the intersection of conceptual art, pedagogy and institutional infrastructure. Nyampeta’s interest delves into epistemology and pedagogy with a deep engagement in how knowledge is produced and disseminated. One of the central concerns in his work is the question of how to live together. In Inuma, Nyampeta’s work reflects a commitment to the conditions under which art is made and shared, emphasizing the social and ethical designs that surround it.",
        exhibitions: "Nyampeta’s recent participation includes presentations at the Seoul Mediacity Biennale (2025); Göteborg International Biennial for Contemporary Art (2025); Shanghai Biennale (2023); Carnegie International, Pittsburgh; Istanbul Biennial; and Manifesta 14, Pristina (all in 2022). In 2019, Nyampeta was awarded the Art Prize Future of Europe by the Museum of Contemporary Art, Leipzig, and the European Union Prize at the Bamako Encounters – African Biennial of Photography. He was the convener of the Boda Boda Lounge 2022, a trans-African film and video art festival. In New York, Nyampeta convenes the African Film Institute at e-flux in Brooklyn."
    },
    {
        name: 'Cedric Mizero',
        img: '/images/artists/cedric.webp',
        bio: "is a multidisciplinary Rwandan artist whose work spans a wide range of media including photography, film, design and fashion. Mizero’s artistic practice is rooted in the exploration of personal and collective memories. He is deeply interested in the ways in which images can serve as a form of documentation and archive of cultural histories. In Inuma, Mizero’s work manifests into installations that function as both altars and archives. With weathered fabrics, repurposed materials and sensorial staging, Mizero redefines adornment as a form of rootedness and solemnity.",
        exhibitions: "The artist has gained international recognition for his innovative projects. In 2022, Bodies of Knowledge was showcased at SHOWstudio's immersive exhibition curated by Nick Knight and Emma Dabiri. The project challenged the conventional representations of the human body in visual culture. Together, these artists construct a topographical vision where voices are dispersed and carried across lands and generations, reminding us that silence is not absence."
    },
];

export default function ExhibitionDetailPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [expandedArtist, setExpandedArtist] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleNext = () => {
        const nextIndex = (activeIndex + 1) % galleryData.length;
        setActiveIndex(nextIndex);
        centerThumbnail(nextIndex);
    };

    const handlePrev = () => {
        const prevIndex = (activeIndex - 1 + galleryData.length) % galleryData.length;
        setActiveIndex(prevIndex);
        centerThumbnail(prevIndex);
    };

    const centerThumbnail = (index: number) => {
        if (scrollContainerRef.current) {
            const thumbElement = scrollContainerRef.current.children[index] as HTMLElement;
            if (thumbElement) {
                const containerWidth = scrollContainerRef.current.offsetWidth;
                const thumbOffset = thumbElement.offsetLeft;
                const thumbWidth = thumbElement.offsetWidth;
                scrollContainerRef.current.scrollTo({
                    left: thumbOffset - (containerWidth / 2) + (thumbWidth / 2),
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <main className="min-h-screen bg-white pt-24 font-sabon selection:bg-black selection:text-white">
            <div className="mx-auto max-w-4xl px-6">

                {/* 1. DYNAMIC VIEWPORT (Large Image) */}
                <section className="mb-4 group relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`image-${activeIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[1/1] md:aspect-[2/1] w-full bg-[#fcfcfc] overflow-hidden"
                        >
                            <Image
                                src={galleryData[activeIndex].src}
                                alt={galleryData[activeIndex].work}
                                fill
                                priority
                                unoptimized
                                className="object-contain p-2 md:p-6"
                            />

                            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                                <button onClick={handlePrev} className="p-4 text-black/30 hover:text-black transition-all">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button onClick={handleNext} className="p-4 text-black/30 hover:text-black transition-all">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-6 flex flex-col space-y-1 text-left px-1">
                        <p className="text-[12px] font-bold text-black tracking-[0.15em] uppercase italic">{galleryData[activeIndex].artist}</p>
                        <p className="text-[11px] text-neutral-500 tracking-[0.15em] uppercase font-medium">{galleryData[activeIndex].work}</p>
                        <p className="text-[10px] text-neutral-400 tracking-[0.2em] uppercase font-light">{galleryData[activeIndex].credit}</p>
                    </div>
                </section>

                {/* 2. NAVIGATION MENU */}
                <section className="relative flex items-center mb-32 group border-t border-neutral-100/50 pt-12">
                    <button onClick={handlePrev} className="flex-shrink-0 pr-4 text-black/20 hover:text-black transition-all">
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="flex flex-1 overflow-x-auto gap-4 px-2 no-scrollbar items-center h-[100px] md:h-[150px]"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {galleryData.map((img, i) => (
                            <button
                                key={img.id}
                                onClick={() => { setActiveIndex(i); centerThumbnail(i); }}
                                className={`relative h-full aspect-[3/4] md:aspect-[4/3] flex-shrink-0 transition-all duration-700 ${i === activeIndex ? 'opacity-100 scale-[1.02]' : 'opacity-40 grayscale hover:grayscale-0 hover:opacity-80'}`}
                            >
                                <Image src={img.src} alt="thumb" fill unoptimized className="object-cover" />
                            </button>
                        ))}
                    </div>

                    <button onClick={handleNext} className="flex-shrink-0 pl-4 text-black/20 hover:text-black transition-all">
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </section>

                {/* 3. DESCRIPTION */}
                <section className="mb-40 max-w-3xl mx-auto">
                    <h2 className="text-xl md:text-2xl font-bold tracking-[0.25em] uppercase mb-12 text-center leading-relaxed">INUMA : A BIRD SHALL CARRY THE VOICE</h2>
                    <div className="space-y-8 text-[15px] md:text-[17px] leading-[1.9] text-neutral-800 text-justify font-light">
                        <p>‘Inuma: A Bird Shall Carry the Voice’ presents works by Rwandan artists Francis Offman, Kaneza Schaal, Cedric Mizero, Sanaa Gateja, Innocent Nkurunziza, Féline Ntabangana, and Christian Nyampeta. Encompassing installation, painting, textiles, photography, performance, and film, the selected works carry textures, rhythms, and silences that extend across borders and generations.</p>
                        <p>The title of this exhibition finds inspiration from both scripture and visual form. Ecclesiastes 10:20 states: “Curse not the king, no, not even in thy thoughts; for a bird of the air shall carry the voice, and that which hath wings shall tell the matter.” This biblical forewarning acknowledges that no voice is ever fully confined. What is whispered may travel and what is pronounced in silence can resurface. The Inuma (Kinyarwanda for dove) becomes a metaphor for the quiet of flight and the strength of the message it bears, echoing the voices of the participating artists as they resonate from Kigali to Kampala, Bologna to Brussels, and New York.</p>
                    </div>
                </section>

                {/* 4. SELECTED ARTISTS GRID */}
                <section className="max-w-4xl mx-auto mb-32">
                    <h3 className="text-[11px] tracking-[0.4em] uppercase mb-24 text-neutral-400 font-bold border-b border-neutral-100 pb-4">Selected Artists</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-28 relative">
                        {artistProfiles.map((artist) => {
                            const isActive = expandedArtist === artist.name;
                            return (
                                <div key={artist.name} className="flex flex-col items-start group">
                                    <div className="relative w-full aspect-[4/5] mb-8">
                                        <div className="absolute inset-0 bg-black/20 translate-x-4 translate-y-4 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="relative w-full h-full overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100/50">
                                            <Image src={artist.img} alt={artist.name} fill unoptimized className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 px-1">
                                        <button
                                            onClick={() => setExpandedArtist(isActive ? null : artist.name)}
                                            className="w-6 h-6 flex items-center justify-center border border-neutral-200 rounded-full hover:border-black transition-all duration-300"
                                        >
                                            <motion.svg
                                                animate={{ rotate: isActive ? 180 : 0 }}
                                                className="w-3 h-3 text-black"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                            </motion.svg>
                                        </button>
                                        <span className="text-[13px] md:text-[14px] tracking-[0.2em] uppercase font-medium text-neutral-800">
                                            {artist.name}
                                        </span>
                                    </div>

                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                                className="fixed inset-0 z-[150] bg-white flex flex-col md:flex-row items-center justify-center overflow-hidden"
                                            >
                                                <button onClick={() => setExpandedArtist(null)} className="absolute top-10 right-5 z-[160] text-3xl font-light hover:rotate-90 transition-transform duration-500">✕</button>

                                                <div className="max-w-6xl w-full flex flex-col md:flex-row items-start px-10 gap-16 md:gap-24 overflow-y-auto max-h-screen py-20 no-scrollbar">
                                                    <div className="w-[280px] md:w-[320px] lg:w-[350px] flex-shrink-0 relative shadow-xl ml-auto md:ml-0 mr-auto md:mr-0">
                                                        <div className="aspect-[4/5] relative">
                                                            <Image src={artist.img} alt={artist.name} fill unoptimized className="object-cover" />
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 max-w-2xl font-sabon text-neutral-800 space-y-12 pb-10">
                                                        <p className="text-[15px] md:text-[17px] leading-[1.8] text-justify first-letter:text-6xl first-letter:font-bold first-letter:text-black first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                                                            {artist.bio}
                                                        </p>
                                                        {artist.exhibitions && (
                                                            <>
                                                                <hr className="border-neutral-100" />
                                                                <p className="text-[12px] md:text-[13px] leading-[1.8] text-neutral-600 font-light italic">
                                                                    {artist.exhibitions}
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            {/* INTEGRATED PRIOR DEVELOPED SECTIONS */}
            <div className="relative z-10 w-full bg-[#0a1116] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <ContactStayInTouch
                    title="Get In Touch"
                    subtitle="Visit us or enquire about the collection"
                    backgroundImage={{
                        src: "/images/contact-exhibitions.webp",
                        alt: "GICA Contact"
                    }}
                />
                <Footer />
            </div>
        </main>
    );
}