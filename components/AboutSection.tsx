'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('landing');
  return (
    <motion.section 
      className="relative min-h-screen w-full bg-[#11212B] flex items-center justify-center py-12 md:py-16 lg:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.h2 
          className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-sabon font-normal text-center mb-8 md:mb-12 lg:mb-16 xl:mb-28"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('about.title')}
        </motion.h2>
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-white text-sm md:text-base lg:text-lg xl:text-xl font-sabon font-normal leading-relaxed text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {t('about.body')}
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}
