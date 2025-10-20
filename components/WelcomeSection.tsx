'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WelcomeSection() {
  return (
    <motion.section 
      className="relative h-screen w-full overflow-hidden"
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
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Logo - Centered at top */}
        <motion.div 
          className="absolute top-8 left-100 transform -translate-x-1/2"
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
          className="text-white text-5xl md:text-7xl font-sabon font-normal text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Welcome
        </motion.h2>
        
        {/* Opening Date - Positioned lower */}
        <motion.div 
          className="absolute bottom-20 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="border border-white/60 px-8 py-4">
            <p className="text-white text-lg md:text-xl font-sabon font-normal text-center">
              Opening Winter 2025
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
