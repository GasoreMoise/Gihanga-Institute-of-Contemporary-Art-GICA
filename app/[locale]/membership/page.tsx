'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

/* Existing membership structural data preserved for future programmatic use
  const membershipTiers = [
      {
          slug: 'individual-patron',
          title: 'INDIVIDUAL PATRON MEMBERSHIP',
          period: 'Annual Ledger',
          image: '/images/membership/patron-bg.webp',
          curator: 'GICA Curation'
      }
  ];
*/

export default function MembershipsPrePage() {
    const locale = useLocale();

    // TEMPORARY "COMING SOON" HOLDING VIEW
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
                        Membership at GICA
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
                        Our tiered community membership programme is coming soon. Join our mailing list to be notified when enrollment options go live.
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

