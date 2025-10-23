'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ExhibitionSectionProps {
  title: string;
  artists: string;
  dates: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export default function ExhibitionSection({
  title,
  artists,
  dates,
  image
}: ExhibitionSectionProps) {
  const t = useTranslations('landing');

  return (
    <motion.section 
      id="exhibitions"
      className="relative w-full min-h-screen bg-[#FAF6ED] flex flex-col lg:flex-row"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Left Section - Text Content */}
      <div className="flex-1 lg:max-w-[45%] px-4 md:px-8 lg:px-16 py-6 md:py-10 flex flex-col justify-center">
        <motion.div
          className="space-y-8 md:space-y-12 lg:space-y-24"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Main Title */}
          <h2 className="text-[#1A2B40] font-sabon text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight text-center lg:text-left">
            {title}
          </h2>
          
          {/* Selected Artists */}
          <motion.p 
            className="text-[#1A2B40] text-base md:text-lg font-sabon leading-relaxed text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('exhibitions.selectedArtists')}: {artists}
          </motion.p>
          
          {/* Exhibition Dates */}
          <motion.p 
            className="text-[#1A2B40] text-sm md:text-base font-sabon leading-relaxed text-center lg:text-left lg:ml-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {dates}
          </motion.p>
          

        </motion.div>
      </div>
      
      {/* Right Section - Artwork */}
      <div className="flex-1 lg:max-w-[55%] relative h-64 md:h-80 lg:h-auto mr-0 md:mr-6 lg:mr-10">
        <motion.div
          className="w-full h-full relative"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full h-full object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
