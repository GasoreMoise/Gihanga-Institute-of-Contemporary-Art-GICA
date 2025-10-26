'use client';

import { motion } from 'framer-motion';

interface ArtworkCaptionProps {
  artist: string;
  title: string;
  year: number;
  gallery: string;
  medium?: string;
  dimensions?: string;
  className?: string;
}

export default function ArtworkCaption({
  artist,
  title,
  year,
  gallery,
  medium,
  dimensions,
  className = ""
}: ArtworkCaptionProps) {
  return (
    <motion.div
      className={`bg-gray-300 px-4 py-3 md:py-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      viewport={{ once: true }}
    >
      <p className="text-gray-700 text-xs md:text-sm font-sabon leading-relaxed">
        <span className="text-gray-900 font-medium">
          {artist}, {title} {year}.
        </span>
        {' '}Courtesy the artist and {gallery}.
      </p>
      {(medium || dimensions) && (
        <p className="text-gray-600 text-xs mt-1 font-sabon">
          {medium && `${medium}`}
          {medium && dimensions && ', '}
          {dimensions && `${dimensions}`}
        </p>
      )}
    </motion.div>
  );
}