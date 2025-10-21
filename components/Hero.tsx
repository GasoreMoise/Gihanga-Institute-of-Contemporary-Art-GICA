'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function Hero({
  title,
  subtitle,
  image
}: {
  title: string;
  subtitle?: string;
  image?: { src: string; width: number; height: number; blurDataURL?: string };
}) {
  const [isEnglish, setIsEnglish] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') as any);
  };
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      {image?.src && (
        <Image
          src={image.src}
          alt="GICA - A living space for art, research and collective imagination"
          width={image.width}
          height={image.height}
          priority
          placeholder={image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={image.blurDataURL}
          sizes="100vw"
          quality={85}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        
        {/* Header with Logo and Navigation */}
        <header className="flex justify-between items-start px-6 md:px-10 lg:px-12 py-4 md:py-5 lg:py-7">
          {/* Logo Section */}
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="flex items-center space-x-3 mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src="/logos/logo1.svg"
                alt="GICA Logo"
                width={64}
                height={64}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28"
                initial={{ scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1 }}
              />
            </motion.div>
          </motion.div>
          
          {/* Navigation */}
          <motion.div 
            className="flex items-center space-x-8 md:space-x-12 lg:space-x-20 mt-2 md:mt-3 lg:mt-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.button 
              className="text-white text-lg md:text-xl font-sabon font-normal cursor-pointer hover:text-gray-300 transition-colors"
              whileHover={{ scale: 1.1, color: "#f3f4f6" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                const next = locale === 'en' ? 'rw' : 'en';
                setIsEnglish(next === 'en');
                switchLocale(next);
              }}
            >
              <span className={locale === 'en' ? 'underline' : ''}>EN</span>
              <span className="mx-1">/</span>
              <span className={locale === 'rw' ? 'underline' : ''}>KIN</span>
            </motion.button>
            <motion.button 
              className="text-white hover:text-gray-300 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="/logos/navbar.svg"
                alt="Navigation Menu"
                className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              />
            </motion.button>
          </motion.div>
        </header>
        
        {/* Bottom Section with Tagline */}
        <div className="flex-1 flex items-end pb-6 md:pb-8 lg:pb-10 px-4 md:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-4 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Scroll indicator arrow */}
            <motion.div
              className="flex-shrink-0 cursor-pointer order-2 md:order-1"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.2, y: 0 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg 
                className="w-4 h-4 md:w-5 md:h-5 text-white" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </motion.svg>
            </motion.div>
            
            {/* Tagline */}
            <motion.p 
              className="text-white tracking-wider text-base md:text-lg lg:text-2xl xl:text-3xl font-sabon font-normal max-w-full md:max-w-4xl lg:max-w-6xl xl:max-w-9xl leading-relaxed cursor-default text-center md:text-left order-1 md:order-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              {title 
                || (locale === 'en'
                      ? (subtitle || "A living space for art, research and collective imagination")
                      : (subtitle || "Umunsi w'ubuzima bw'ubuhanzi, ubushakashatsi n'ibitekerezo by'umuryango")
                   )}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


