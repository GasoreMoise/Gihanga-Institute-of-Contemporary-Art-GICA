'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

type Contributor = {
  name: string;
  role: string;
  links?: { linkedin?: string; portfolio?: string; email?: string };
};

export default function ContributorsSection() {
  const t = useTranslations('contributors');
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const foundingBenefactor = {
    heading: t('benefactor.heading'),
    body: t('benefactor.body')
  };

  useEffect(() => {
    let isMounted = true;
    // Add timestamp to bust cache
    const timestamp = Date.now();
    fetch(`/api/contributors?t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    })
      .then((r) => r.json())
      .then((json) => {
        if (!isMounted) return;
        setContributors(json.contributors || []);
      })
      .catch((err) => {
        console.error('Failed to fetch contributors:', err);
        if (isMounted) setLoading(false);
      })
      .finally(() => isMounted && setLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <section id="contributors" className="relative w-full bg-white text-neutral-900 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          className="font-sabon text-base md:text-xl text-neutral-700 mb-10 md:mb-12 max-w-5xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('subtitle')}
        </motion.p>

        {/* Fit all contributors within viewport height on most screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 md:gap-y-8">
          {!loading && contributors.map((c) => (
            <motion.div
              key={c.name}
              className="space-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative inline-flex items-center gap-3 group">
                <h3 className="font-sabon text-xl md:text-2xl leading-snug cursor-default">
                  {c.name}
                </h3>
              </div>
              <p className="text-neutral-700 font-sabon text-base md:text-lg">{c.role}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Founding Benefactor */}
        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-sabon text-xl md:text-2xl mb-4">{foundingBenefactor.heading}</h3>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <p className="font-sabon text-base md:text-lg text-neutral-700 max-w-3xl flex-1">
              {foundingBenefactor.body}
            </p>
            <div className="flex-shrink-0">
              <img
                src="/logos/mellon.png"
                alt="Mellon Foundation"
                className="h-28 md:h-36 ml-16 md:ml-0 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


