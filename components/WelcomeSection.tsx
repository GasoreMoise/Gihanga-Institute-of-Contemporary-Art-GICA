'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function WelcomeSection() {
  const t = useTranslations('landing');
  
  return (
    <motion.section 
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/welcome-background.webp" // You'll upload this
          alt="GICA Welcome - Interior space with modern architecture"
          fill
          priority={false}
          loading="lazy"
          className="object-cover"
          quality={75}
        />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Logo - Independently positioned */}
      <motion.div 
        className="absolute top-10 left-0 right-0 flex justify-center z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <img
          src="/logos/logo2.svg"
          alt="GICA Logo"
          className="w-24 h-24 md:w-32 md:h-32"
        />
      </motion.div>
      
      {/* Opening Date - Independently positioned */}
      <motion.div 
        className="absolute top-3/4 left-0 right-0 flex justify-center z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="border border-white/60 px-4 py-2 md:px-6 md:py-3">
          <p className="text-white text-lg md:text-xl font-sabon font-normal">
            {t('welcome.subtitle')}
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}
