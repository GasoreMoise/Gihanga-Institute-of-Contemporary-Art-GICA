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

      // Success!
      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      
      // Reset success message after 5 seconds
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

      // Success!
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      
      // Reset success message after 3 seconds
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
          <form onSubmit={handleContactSubmit} className="space-y-10 w-[620px] max-w-full mx-auto">
            <div>
              <label className="block text-white font-sabon text-sm mb-2">{t('contact.name')}</label>
              <input 
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-[620px] max-w-full bg-transparent text-white border-0 border-b border-white/70 rounded-none focus:outline-none focus:ring-0 focus:border-white/90 py-2" 
              />
            </div>
            <div>
              <label className="block text-white font-sabon text-sm mb-2">{t('contact.email')}</label>
              <input 
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="w-[620px] max-w-full bg-transparent text-white border-0 border-b border-white/70 rounded-none focus:outline-none focus:ring-0 focus:border-white/90 py-2" 
              />
            </div>
            <div>
              <label className="block text-white font-sabon text-sm mb-2">{t('contact.message')}</label>
              <textarea 
                rows={4} 
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
                className="w-[620px] max-w-full bg-transparent text-white border-0 border-b border-white/70 rounded-none focus:outline-none focus:ring-0 focus:border-white/90 py-2 resize-none" 
              />
            </div>
            
            {/* Success/Error Messages */}
            {contactSuccess && (
              <motion.div 
                className="text-green-300 text-center font-sabon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Message sent successfully!
              </motion.div>
            )}
            {contactError && (
              <motion.div 
                className="text-red-300 text-center font-sabon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {contactError}
              </motion.div>
            )}
            
            <div className="flex justify-center pt-2">
              <button 
                type="submit" 
                disabled={contactLoading}
                className="border border-white text-white px-10 py-2 font-sabon hover:bg-white hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contactLoading ? 'Sending...' : t('contact.send')}
              </button>
            </div>
          </form>

          {/* Newsletter Subscription */}
          <div className="mt-20 flex flex-col items-center">
            <motion.p
              className="text-white font-sabon text-center text-xl md:text-xl lg:text-2xl mb-12"
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
                disabled={newsletterLoading}
                onClick={handleNewsletterSubmit}
                className="bg-white text-black px-10 py-2.5 font-sabon hover:bg-gray-100 transition-all duration-300 whitespace-nowrap flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {newsletterLoading ? 'Subscribing...' : t('contact.newsletterSubscribe')}
              </button>
            </motion.div>
            
            {/* Newsletter Success/Error Messages */}
            <div className="mt-4 text-center">
              {newsletterSuccess && (
                <motion.div 
                  className="text-green-300 font-sabon text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Successfully subscribed!
                </motion.div>
              )}
              {newsletterError && (
                <motion.div 
                  className="text-red-300 font-sabon text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {newsletterError}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


