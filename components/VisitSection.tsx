'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface VisitSectionProps {
  title: string;
  openingTitle: string;
  openingNote: string;
  emailLabel: string;
  email: string;
  socialLabel: string;
  social: string;
  address: string;
  image: { src: string; alt: string; width: number; height: number };
}

export default function VisitSection({
  title,
  openingTitle,
  openingNote,
  emailLabel,
  email,
  socialLabel,
  social,
  address,
  image
}: VisitSectionProps) {
  const [bgLoaded, setBgLoaded] = useState(false);
  const instagramHandle = social?.trim().replace(/^@/, '');
  return (
    <section id="visit" className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-10 py-16">
        <div className="flex flex-col md:flex-row items-start gap-16">
          {/* Left: Tall image */}
          <motion.div
            className="relative w-full md:basis-[52%] md:flex-none h-[55vh] md:h-[82vh] lg:h-[85vh]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={false}
              loading="lazy"
              className="object-cover"
              quality={75}
              sizes="(max-width: 768px) 100vw, 52vw"
              onLoad={() => setBgLoaded(true)}
            />
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-50px' }}
            className="flex-1 h-[78vh] md:h-[82vh] lg:h-[85vh] flex flex-col"
          >
            <h2 className="text-[#1A2B40] font-sabon text-3xl md:text-4xl lg:text-5xl mb-10">{title}</h2>

            {/* Middle content */}
            <div className="text-[#1A2B40] font-sabon space-y-10">
              {/* Opening hours */}
              <div>
                <p className="mb-1">{openingTitle}</p>
                <p className="opacity-80">{openingNote}</p>
              </div>

              {/* Email + Social two columns */}
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <p className="mb-1">{emailLabel}</p>
                  <p className="opacity-80">
                    <a href={`mailto:${email}`} className="hover:opacity-80 cursor-pointer">
                      {email}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="mb-1">{socialLabel}</p>
                  <p className="opacity-80">
                    <a
                      href={`https://instagram.com/${instagramHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 cursor-pointer"
                    >
                      {social}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom address */}
            <div className="mt-auto pt-10">
              <p className="text-[#1A2B40] font-sabon opacity-80">{address}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


