'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProgrammeSectionProps {
  title: string;
  description: string;
  menuItems: { label: string }[];
  backgroundImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export default function ProgrammeSection({
  title,
  description,
  menuItems,
  backgroundImage
}: ProgrammeSectionProps) {
  return (
    <motion.section 
      id="programme"
      className="relative w-full min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          fill
          priority={false}
          loading="lazy"
          className="object-cover"
          quality={75}
        />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content Container - 2 columns: left title, right vertical menu */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 lg:px-16 py-12 md:py-16">
        {/* Left: Title */}
        <div className="flex items-center justify-center md:justify-start">
          <motion.h2 
            className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sabon font-normal text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {title}
          </motion.h2>
        </div>
        {/* Right: Vertical Menu */}
        <div className="flex items-center justify-center md:justify-start">
          <motion.ul 
            className="space-y-8 md:space-y-12 lg:space-y-20 text-center md:text-left md:ml-40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <button className="text-white text-lg md:text-xl lg:text-xl font-sabon hover:opacity-80 transition-opacity">
                  {item.label}
                </button>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.section>
  );
}
