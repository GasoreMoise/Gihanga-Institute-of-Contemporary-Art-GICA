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
  artworkCaption?: {
    artist: string;
    title: string;
    year: number;
    gallery: string;
    medium?: string;
    dimensions?: string;
  };
}

export default function ExhibitionSection({
  title,
  artists,
  dates,
  image,
  artworkCaption
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

          {/* Exhibition Dates 
          <motion.p 
            className="text-[#1A2B40] text-sm md:text-base font-sabon leading-relaxed text-center lg:text-left lg:ml-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {dates}
          </motion.p>

          */}
          
          {/* Selected Artists */}
          <motion.p 
            className="text-[#1A2B40] text-base md:text-lg font-sabon leading-relaxed text-left lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('exhibitions.selectedArtists')}: {artists}
          </motion.p>
          

          

        </motion.div>
      </div>
      
      {/* Right Section - Artwork */}
      <div className="flex-1 md:max-w-[70%] lg:max-w-[55%] mr-0 md:ml-36 lg:mr-10 flex flex-col -mt-10 md:mt-8 lg:mt-36">
        <motion.div
          className="w-full flex flex-col"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Artwork Image */}
          <div className="relative h-64 md:h-80 lg:h-100">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="w-full h-full object-cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
          
          {/* Artwork Caption - Below the image with #FAF6ED background */}
          {artworkCaption && (
            <motion.div
              className="px-8 py-2"
              style={{ backgroundColor: '#FAF6ED' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-500 text-sm md:text-sm font-sabon leading-relaxed">
                <span className="text-gray-700 font-medium">
                  {artworkCaption.artist}, {artworkCaption.title}, {artworkCaption.year}.
                </span>
                <br />
                {' '}Courtesy of the artist and {artworkCaption.gallery}.
              </p>

            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
