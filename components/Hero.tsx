'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
  
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
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
        <header className="flex justify-between items-start px-10 md:px-12 py-5 md:py-7">
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
                className="w-24 h-24"
                initial={{ scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1 }}
              />
            </motion.div>
          </motion.div>
          
          {/* Navigation */}
          <motion.div 
            className="flex items-center space-x-6 mt-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.button 
              className="text-white text-lg font-sabon font-normal cursor-pointer hover:text-gray-300 transition-colors"
              whileHover={{ scale: 1.1, color: "#f3f4f6" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={toggleLanguage}
            >
              <span className={isEnglish ? 'underline' : ''}>EN</span>
              <span className="mx-1">/</span>
              <span className={!isEnglish ? 'underline' : ''}>KIN</span>
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
                className="w-10 h-10"
              />
            </motion.button>
          </motion.div>
        </header>
        
        {/* Bottom Section with Tagline */}
        <div className="flex-1 flex items-end pb-10 px-6 md:px-8">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Scroll indicator arrow */}
            <motion.div
              className="flex-shrink-0 cursor-pointer"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.2, y: 0 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg 
                className="w-5 h-5 text-white" 
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
              className="text-white tracking-wider text-lg md:text-3xl font-sabon font-normal max-w-4xl leading-relaxed cursor-default"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              {isEnglish 
                ? (subtitle || "A living space for art, research and collective imagination")
                : (subtitle || "Umunsi w'ubuzima bw'ubuhanzi, ubushakashatsi n'ibitekerezo by'umuryango")
              }
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


