'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/all';

if (typeof window !== "undefined") {
    gsap.registerPlugin(TextPlugin);
}

const steps = [
    { id: 'date', label: 'Select a Date', instruction: 'When would you like to visit the institute?' },
    { id: 'time', label: 'Choose a Slot', instruction: 'At what hour shall we expect you?' },
    { id: 'party', label: 'Number of Guests', instruction: 'How many individuals will be joining us?' },
    { id: 'details', label: 'Personal Details', instruction: 'How may we address you?' },
    { id: 'confirm', label: 'Finalize', instruction: 'Review your invitation to GICA' }
];

const timeSlots = ["10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];

export default function BookVisit() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({ date: '', time: '', guests: 1, name: '', email: '' });
    const instructionRef = useRef(null);

    useGSAP(() => {
        gsap.to(instructionRef.current, {
            duration: 0.8,
            text: steps[currentStep].instruction,
            ease: "power2.inOut",
        });
    }, [currentStep]);

    const handleNext = () => currentStep < steps.length - 1 && setCurrentStep(c => c + 1);
    const handleBack = () => currentStep > 0 && setCurrentStep(c => c - 1);

    return (
        <main className="min-h-screen bg-[#FDFBF7] font-sabon text-black overflow-hidden flex flex-col md:flex-row">

            {/* LEFT SIDE: THE ATMOSPHERE */}
            <section className="relative w-full md:w-1/2 h-[30vh] md:h-screen overflow-hidden border-r border-black/5">
                <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2 }} className="absolute inset-0">
                    <Image src="/images/gateja.webp" alt="GICA" fill className="object-cover brightness-[0.7] grayscale-[0.2]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1116]/60 via-transparent to-transparent" />
                </motion.div>
                <div className="absolute bottom-12 left-12 z-20 text-white hidden md:block">
                    <h1 className="text-4xl lg:text-3xl font-bold tracking-[0.2em] uppercase italic mb-2">Book Your Visit</h1>
                </div>
            </section>

            {/* RIGHT SIDE: THE INTERACTIVE JOURNEY */}
            <section className="w-full md:w-1/2 min-h-[70vh] md:h-screen flex flex-col justify-center px-8 md:px-20 lg:px-32 py-20 bg-white relative">

                {/* Progress Tracker */}
                <div className="absolute top-12 left-8 md:left-20 flex gap-3">
                    {steps.map((_, i) => (
                        <div key={i} className={`h-[1px] transition-all duration-700 ${i <= currentStep ? 'w-10 bg-black' : 'w-3 bg-black/10'}`} />
                    ))}
                </div>

                {/* Header Logic */}
                <div className="mb-12">
                    <p className="text-[9px] tracking-[0.4em] uppercase text-neutral-400 mb-3 font-bold">Step 0{currentStep + 1}</p>
                    <h2 ref={instructionRef} className="text-2xl md:text-3xl lg:text-4xl italic font-normal leading-tight h-24"></h2>
                </div>

                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="space-y-10"
                        >
                            {/* STEP 0: DATE */}
                            {currentStep === 0 && (
                                <input
                                    type="date"
                                    className="w-full bg-transparent border-b border-black/10 py-6 text-2xl focus:border-black outline-none transition-colors cursor-crosshair"
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            )}

                            {/* STEP 1: TIME SLOTS */}
                            {currentStep === 1 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {timeSlots.map((slot, index) => (
                                        <motion.button
                                            key={slot}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => { setFormData({ ...formData, time: slot }); handleNext(); }}
                                            className={`py-4 border text-xs tracking-widest uppercase transition-all duration-500 
                        ${formData.time === slot ? 'bg-black text-white border-black' : 'border-black/5 hover:border-black/40'}`}
                                        >
                                            {slot}
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* STEP 2: GUESTS */}
                            {currentStep === 2 && (
                                <div className="flex items-center gap-16">
                                    <button onClick={() => setFormData({ ...formData, guests: Math.max(1, formData.guests - 1) })} className="text-5xl font-extralight hover:opacity-30 transition-opacity">-</button>
                                    <span className="text-7xl font-light tracking-tighter">{formData.guests}</span>
                                    <button onClick={() => setFormData({ ...formData, guests: formData.guests + 1 })} className="text-5xl font-extralight hover:opacity-30 transition-opacity">+</button>
                                </div>
                            )}

                            {/* STEP 3: PERSONAL DETAILS */}
                            {currentStep === 3 && (
                                <div className="space-y-10">
                                    <input placeholder="Full Name" className="w-full bg-transparent border-b border-black/10 py-4 text-xl focus:border-black outline-none" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    <input placeholder="Email Address" className="w-full bg-transparent border-b border-black/10 py-4 text-xl focus:border-black outline-none" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                            )}

                            {/* STEP 4: REVIEW & CONFIRM */}
                            {currentStep === 4 && (
                                <div className="space-y-8">
                                    <div className="space-y-2 border-l-2 border-black pl-6 italic">
                                        <p className="text-3xl text-black">A gathering for {formData.guests}.</p>
                                        <p className="text-xl text-neutral-500">{formData.date} at {formData.time}</p>
                                        <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest pt-4">Registered to: {formData.name}</p>
                                    </div>
                                    <button className="w-full py-6 bg-black text-white text-[10px] tracking-[0.6em] uppercase hover:bg-neutral-800 transition-all shadow-xl">
                                        Confirm Intention
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* NAV CONTROLS */}
                <div className="mt-16 flex justify-between items-center">
                    <button onClick={handleBack} className={`text-[9px] tracking-[0.4em] uppercase transition-all border-b border-transparent hover:border-black ${currentStep === 0 ? 'opacity-0' : 'opacity-100'}`}>Back</button>
                    {currentStep !== 1 && currentStep < 4 && (
                        <button onClick={handleNext} className="group flex items-center gap-6 text-[9px] tracking-[0.4em] uppercase font-bold">
                            Continue
                            <div className="w-8 h-[1px] bg-black origin-left group-hover:scale-x-150 transition-transform duration-500" />
                        </button>
                    )}
                </div>
            </section>
        </main>
    );
}