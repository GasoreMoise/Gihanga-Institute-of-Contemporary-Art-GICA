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
          src="/images/welcome-background.jpg" // You'll upload this
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
      
      {/* Content Container - Now a flex column for vertical stacking */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-28 md:space-y-40">
        {/* Logo - Centered at top */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <img
            src="/logos/logo2.svg"
            alt="GICA Logo"
            className="w-20 h-20 md:w-24 md:h-24"
          />
        </motion.div>
        
        {/* Welcome Text - Perfectly centered */}
        <motion.h2 
          className="text-white text-4xl md:text-6xl lg:text-7xl font-sabon font-normal"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {t('welcome.title')}
        </motion.h2>
        
        {/* Opening Date - Positioned lower */}
        <motion.div 
          className="flex flex-col items-center"
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
      </div>
    </motion.section>
  );
}
