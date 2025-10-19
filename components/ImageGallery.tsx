'use client';

import { useState } from 'react';
import ImageSmart from './ImageSmart';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  aspectRatio?: number;
  className?: string;
}

export default function ImageGallery({ images, aspectRatio = 16/9, className = '' }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images.length) return null;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="cursor-pointer overflow-hidden rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedIndex(index)}
        >
          <ImageSmart
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            aspect={aspectRatio}
            blurDataURL={image.blurDataURL}
            className="transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ImageSmart
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                width={images[selectedIndex].width}
                height={images[selectedIndex].height}
                className="max-h-[80vh] w-auto"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close gallery"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
