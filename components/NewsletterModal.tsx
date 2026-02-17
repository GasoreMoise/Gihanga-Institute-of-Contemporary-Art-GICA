'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function NewsletterModal() {
  const t = useTranslations('landing');

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Ensure we're on the client
    setMounted(true);

    // For now: always show the modal after a short delay on the client.
    // This avoids any localStorage / browser-specific issues that were
    // preventing it from opening on some mobile setups.
    const timer = setTimeout(() => {
      setOpen(true);
    }, 7500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setTimeout(() => setError(''), 2500);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'newsletter' })
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      setSuccess(true);
      setEmail('');
      try {
        localStorage.setItem('newsletter-subscribed', 'true');
      } catch (err) {
        console.warn('[NewsletterModal] Failed to save subscription:', err);
      }
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Newsletter error:', err);
      setError('Failed to subscribe. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4 md:pb-6 pointer-events-none"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ position: 'fixed' }}
        >
          <motion.div
            className="relative max-w-4xl mx-auto bg-white/95 backdrop-blur-md border border-neutral-200/70 shadow-lg shadow-black/5 rounded-lg overflow-hidden pointer-events-auto"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Subtle top accent */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#0f2430]/35 to-transparent" />
            
            {/* Close button - top right */}
            <button
              aria-label="Close"
              onClick={handleDismiss}
              className="absolute top-3 right-3 md:top-1 md:right-2 text-neutral-400 hover:text-neutral-700 transition-colors p-1.5 rounded-full hover:bg-neutral-100 z-10"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-4 md:p-6 pr-12 md:pr-14">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-sabon text-lg md:text-xl text-neutral-900 leading-tight mb-1.5">
                    {t('contact.newsletter')}
                  </h3>
                  <p className="text-neutral-600 text-sm md:text-base font-sabon leading-relaxed">
                    Stay updated with our programmes, exhibitions, and other news.
                  </p>
                </div>

                {/* Form */}
                {!success ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 md:gap-3 flex-shrink-0">
                    <div className="flex-1 min-w-0">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('contact.email')}
                        className="w-full bg-white border border-neutral-300 rounded-sm px-4 py-2.5 text-sm md:text-base font-sabon text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#0f2430] focus:ring-1 focus:ring-[#0f2430]/20 transition"
                      />
                      {error && (
                        <p className="text-red-600 text-xs mt-1.5 font-sabon">{error}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#0f2430] text-white px-6 py-2.5 rounded-sm font-sabon text-sm md:text-base hover:bg-[#152f41] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0"
                    >
                      {loading ? '...' : t('contact.newsletterSubscribe')}
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 text-sm md:text-base font-sabon flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Subscribed!</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

