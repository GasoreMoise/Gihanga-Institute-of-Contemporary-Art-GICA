'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ContactStayInTouchProps {
  title: string;
  subtitle: string;
  backgroundImage: { src: string; alt: string };
}

export default function ContactStayInTouch({
  title,
  subtitle,
  backgroundImage
}: ContactStayInTouchProps) {
  const t = useTranslations('landing');
  const [bgLoaded, setBgLoaded] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  return (
    <section id="contact" className="relative w-full min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          fill
          priority={false}
          loading="lazy"
          className="object-cover"
          quality={75}
          sizes="100vw"
          onLoad={() => setBgLoaded(true)}
        />
        <div className={`absolute inset-0 ${bgLoaded ? 'bg-black/50' : 'bg-black/0'}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto px-6 py-20 md:py-28">
        <motion.h2
          className="text-white font-sabon text-5xl md:text-6xl text-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-white/90 font-sabon text-center text-sm md:text-base mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>

        {/* Form styled like reference */}
        <div className="backdrop-blur-[1px]">
          <form className="space-y-10 w-[620px] max-w-full mx-auto">
            <div>
              <label className="block text-white font-sabon text-sm mb-2">{t('contact.name')}</label>
              <input className="w-[620px] max-w-full bg-transparent text-white border-0 border-b border-white/70 rounded-none focus:outline-none focus:ring-0 focus:border-white/90 py-2" />
            </div>
            <div>
              <label className="block text-white font-sabon text-sm mb-2">{t('contact.email')}</label>
              <input className="w-[620px] max-w-full bg-transparent text-white border-0 border-b border-white/70 rounded-none focus:outline-none focus:ring-0 focus:border-white/90 py-2" />
            </div>
            <div>
              <label className="block text-white font-sabon text-sm mb-2">{t('contact.message')}</label>
              <textarea rows={4} className="w-[620px] max-w-full bg-transparent text-white border-0 border-b border-white/70 rounded-none focus:outline-none focus:ring-0 focus:border-white/90 py-2 resize-none" />
            </div>
            <div className="flex justify-center pt-2">
              <button type="button" className="border border-white text-white px-10 py-2 font-sabon hover:bg-white hover:text-black transition">{t('contact.send')}</button>
            </div>
          </form>

          {/* Newsletter Subscription */}
          <div className="mt-20 flex flex-col items-center">
            <motion.p
              className="text-white font-sabon text-center text-xl md:text-2xl lg:text-3xl mb-12"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t('contact.newsletter')}
            </motion.p>
            <motion.div 
              className="flex flex-row items-center gap-4 w-[620px] max-w-full"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <input 
                type="email"
                placeholder={t('contact.email')}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-transparent text-white border-0 border-b-2 border-white rounded-none focus:outline-none focus:ring-0 focus:border-white py-2.5 font-sabon placeholder-white/50 text-base"
              />
              <button 
                type="button" 
                className="bg-white text-black px-10 py-2.5 font-sabon hover:bg-gray-100 transition-all duration-300 whitespace-nowrap flex-shrink-0"
                onClick={() => {
                  if (newsletterEmail) {
                    // Handle newsletter subscription logic here
                    console.log('Subscribing:', newsletterEmail);
                    setNewsletterEmail('');
                  }
                }}
              >
                {t('contact.newsletterSubscribe')}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


