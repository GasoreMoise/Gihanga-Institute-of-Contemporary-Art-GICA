'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ContactStayInTouchProps {
  id?: string;
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

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          type: 'contact'
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to send message');
      }

      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');

      setTimeout(() => setContactSuccess(false), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setContactError('Failed to send message. Please try again.');
      setTimeout(() => setContactError(''), 5000);
    } finally {
      setContactLoading(false);
    }
  };

  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterError('Please enter a valid email address');
      setTimeout(() => setNewsletterError(''), 3000);
      return;
    }

    setNewsletterLoading(true);
    setNewsletterError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newsletterEmail,
          type: 'newsletter'
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setNewsletterSuccess(true);
      setNewsletterEmail('');

      setTimeout(() => setNewsletterSuccess(false), 3000);
    } catch (error) {
      console.error('Newsletter error:', error);
      setNewsletterError('Failed to subscribe. Please try again.');
      setTimeout(() => setNewsletterError(''), 3000);
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 overflow-hidden"
      suppressHydrationWarning
    >
      {/* Background - Fully Dynamic */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          fill
          priority
          className="object-cover"
          quality={85}
          onLoad={() => setBgLoaded(true)}
        />
        {/* Cinematic Gradient Overlay for legibility */}
        <div className={`absolute inset-0 transition-opacity duration-1000 bg-black/60 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[700px] px-6 mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            className="text-white font-sabon text-5xl md:text-7xl mb-4 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-white/80 font-sabon italic text-sm md:text-base max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Form Styling: NO BOXES, JUST UNDERLINES */}
        <form onSubmit={handleContactSubmit} className="space-y-12 w-full" autoComplete="off">

          <div className="relative flex flex-col md:flex-row md:items-end gap-2 md:gap-8 border-b border-white/30 pb-2 focus-within:border-white transition-colors duration-500">
            <label className="text-white font-sabon italic text-sm md:min-w-[80px] opacity-70">
              {t('contact.name')}
            </label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full bg-transparent text-white font-sabon text-lg focus:outline-none placeholder-white/20 border-none ring-0 focus:ring-0"
            />
          </div>

          <div className="relative flex flex-col md:flex-row md:items-end gap-2 md:gap-8 border-b border-white/30 pb-2 focus-within:border-white transition-colors duration-500">
            <label className="text-white font-sabon italic text-sm md:min-w-[80px] opacity-70">
              {t('contact.email')}
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
              className="w-full bg-transparent text-white font-sabon text-lg focus:outline-none placeholder-white/20 border-none ring-0 focus:ring-0"
            />
          </div>

          <div className="relative flex flex-col md:flex-row md:items-end gap-2 md:gap-8 border-b border-white/30 pb-2 focus-within:border-white transition-colors duration-500">
            <label className="text-white font-sabon italic text-sm md:min-w-[80px] opacity-70">
              {t('contact.message')}
            </label>
            <textarea
              rows={1}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              required
              className="w-full bg-transparent text-white font-sabon text-lg focus:outline-none py-1 resize-none overflow-hidden border-none ring-0 focus:ring-0"
            />
          </div>

          <div className="h-6">
            {contactSuccess && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-300 text-center font-sabon text-sm font-bold tracking-widest uppercase">Success</motion.p>}
            {contactError && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center font-sabon text-sm">{contactError}</motion.p>}
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={contactLoading}
              className="border border-white/40 text-white px-16 py-3 font-sabon text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 disabled:opacity-50"
            >
              {contactLoading ? '...' : t('contact.send')}
            </button>
          </div>
        </form>

        {/* Newsletter Section */}
        <div className="mt-32 pt-20 border-t border-white/10 flex flex-col items-center">
          <motion.p className="text-white font-sabon text-center text-xl md:text-2xl mb-12 tracking-wide" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {t('contact.newsletter')}
          </motion.p>

          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            <input
              type="email"
              placeholder={t('contact.email')}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full bg-transparent text-white border-b border-white/30 focus:border-white rounded-none focus:outline-none py-3 font-sabon text-base placeholder-white/30 transition-colors"
            />
            <button
              type="button"
              disabled={newsletterLoading}
              onClick={handleNewsletterSubmit}
              className="w-full md:w-auto bg-white text-black px-12 py-3 font-sabon text-[10px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-all duration-500"
            >
              {newsletterLoading ? '...' : t('contact.newsletterSubscribe')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}