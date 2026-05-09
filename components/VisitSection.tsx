'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  Clock,
  MapPin,
  Mail,
  ArrowRight
} from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface VisitSectionProps {
  title: string;
  openingHours?: { days: string; hours: string };
  address: string;
  addressDetails: string;
  email: string;
  social: string;
  bookingTitle: string;
  faqs?: FAQ[];
  guidelinesTitle: string;
  guidelinesNote: string;
}

export default function VisitSection({
  title,
  openingHours,
  address,
  addressDetails,
  email,
  social,
  bookingTitle,
  faqs = [],
  guidelinesTitle,
  guidelinesNote
}: VisitSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const locale = useLocale();

  // HARDCODED FAQS: To ensure they are always visible regardless of parent props
  const defaultFaqs: FAQ[] = [
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

  // Use passed faqs if they exist, otherwise use the institutional defaults
  const activeFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section id="visit" className="w-full bg-[#FAF6ED] text-[#0A1116] selection:bg-black selection:text-white">

      {/* 1. HERO BRANDING HEADER */}
      <div className="relative w-full h-[80vh] md:h-[100vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/visit-hero.webp"
          alt="GICA Building Exterior"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white font-sabon text-4xl md:text-7xl lg:text-8xl mb-4"
          >
            Visit GICA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/80 font-sabon text-sm md:text-xl italic max-w-xl mx-auto"
          >
            Plan your visit and experience contemporary art in Kigali.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="h-[1px] w-12 bg-white/40 mx-auto mt-8"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 md:py-16">

        {/* 2. CORE INFO GRID */}
        <div className="text-center mb-16">
          <h2 className="font-sabon text-3xl md:text-4xl mb-4">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-20 border-y border-black/5 py-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <Clock className="w-6 h-6 stroke-[1px] opacity-40" />
            <h3 className="uppercase tracking-[0.3em] text-[10px] font-bold opacity-40">Opening Hours</h3>
            <p className="font-sabon text-sm leading-relaxed">
              {openingHours?.days}<br />{openingHours?.hours}
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 md:border-x md:border-black/5 px-4">
            <MapPin className="w-6 h-6 stroke-[1px] opacity-40" />
            <h3 className="uppercase tracking-[0.3em] text-[10px] font-bold opacity-40">Location</h3>
            <p className="font-sabon text-sm leading-relaxed">
              {address}<br />{addressDetails}
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <Mail className="w-6 h-6 stroke-[1px] opacity-40" />
            <h3 className="uppercase tracking-[0.3em] text-[10px] font-bold opacity-40">Contact</h3>
            <div className="font-sabon text-sm leading-relaxed">
              <a href={`mailto:${email}`} className="block hover:opacity-50 transition-opacity">{email}</a>
              <a href={`https://instagram.com/${social?.replace('@', '')}`} target="_blank" className="block hover:opacity-50 transition-opacity">{social}</a>
            </div>
          </div>
        </div>

        {/* 3. BOOKING CTA BLOCK */}
        <div className="bg-black/[0.02] p-8 md:p-16 mb-32 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-sabon text-2xl md:text-4xl mb-4">Book Your Visit</h3>
            <p className="font-sabon text-sm md:text-md text-justify opacity-60 leading-relaxed">
              We highly encourage you to book your visit in advance to ensure a smooth experience
              and avoid waiting in line. Walk-ins are welcome, subject to capacity.
            </p>
          </div>
          <div className="text-center md:text-right flex-shrink-0">
            <Link
              href={`/${locale}/book` as any}
              className="inline-flex items-center gap-4 bg-[#B59A7D] text-white px-8 py-4 font-sabon group hover:bg-[#A3886B] transition-colors"
            >
              Book Your Visit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="mt-4 text-left space-y-1">
              <p className="text-[12px] opacity-40 italic text-center">Takes less than 1 minute.<br /> Group visits are welcome.</p>
            </div>
          </div>
        </div>

        {/* 4. FAQs SECTION - NOW LOADED WITH INSTITUTIONAL DATA */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 gap-8">
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight font-sabon text-black">FAQs</h2>
          </div>

          <div className="space-y-2">
            {activeFaqs.map((faq, index) => (
              <div key={index} className="border-b border-black/5 last:border-none">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full py-10 flex justify-between items-center group text-left transition-all"
                >
                  <span className="flex items-baseline gap-6">
                    <span className="text-[10px] font-bold text-black/20">{(index + 1).toString().padStart(2, '0')}.</span>
                    <span className="text-md md:text-lg font-normal group-hover:pl-4 transition-all duration-500 ease-out italic font-sabon text-black">
                      {faq.question}
                    </span>
                  </span>

                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className="absolute w-full h-[1px] bg-black/60" />
                    <motion.div
                      animate={{ rotate: openFaq === index ? 0 : 90 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute w-full h-[1px] bg-black/60"
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
                        <p className="text-sm md:text-lg text-black/60 max-w-2xl leading-relaxed bg-black/[0.01] p-8 border-l-2 border-[#B59A7D] italic font-sabon">
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

        {/* 5. VISITOR GUIDELINES LINK */}
        <div className="bg-black/[0.02] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-black/[0.03]">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-sabon text-2xl md:text-4xl mb-4">Visitor Guidelines</h3>
            <p className="font-sabon text-sm md:text-md text-justify opacity-60 leading-relaxed">
              For detailed information about visitor conduct and institutional policies, please refer to our <Link href={`/${locale}/visit` as any} className="underline underline-offset-4 hover:opacity-50 transition-opacity">Codes of Conduct</Link>.
            </p>
          </div>
          <div className="w-32 md:w-40 align-center ml-auto mr-auto opacity-85">
            <Image src="/logos/crane.png" alt="GICA Symbol" width={200} height={200} />
          </div>
        </div>

      </div>
    </section>
  );
}