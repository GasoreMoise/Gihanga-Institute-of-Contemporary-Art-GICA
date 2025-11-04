'use client';

import { motion } from 'framer-motion';
import { contributors, foundingBenefactor } from '@/lib/data/contributors';

export default function ContributorsSection() {
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
          We would like to thank the following individuals and organizations who have supported us along the way, which has helped us build and provide a solid foundation for artistic experiment
        </motion.p>

        {/* Fit all contributors within viewport height on most screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 md:gap-y-8">
          {contributors.map((c) => (
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
                {c.links && (
                  <span className="inline-flex items-center gap-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
                    {c.links.linkedin && (
                      <a
                        href={c.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-neutral-700 hover:text-neutral-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                    {c.links.portfolio && (
                      <a
                        href={c.links.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Portfolio"
                        className="text-neutral-700 hover:text-neutral-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5"><path d="M14 3h7v7h-2V6.414l-7.293 7.293-1.414-1.414L17.586 5H14V3z"/><path d="M5 5h6v2H7v10h10v-4h2v6H5V5z"/></svg>
                      </a>
                    )}
                    {c.links.email && (
                      <a
                        href={c.links.email}
                        aria-label="Email"
                        className="text-neutral-700 hover:text-neutral-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.236l7.386 6.33a1 1 0 001.228 0L20 8.236V18H4z"/></svg>
                      </a>
                    )}
                  </span>
                )}
              </div>
              <p className="text-neutral-700 font-sabon text-base md:text-lg">{c.role}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Founding Benefactor */}
        <div className="mt-12 md:mt-16">
          <h3 className="font-sabon text-xl md:text-2xl mb-2">{foundingBenefactor.heading}</h3>
          <p className="font-sabon text-base md:text-lg text-neutral-700 max-w-3xl">{foundingBenefactor.body}</p>
        </div>
      </div>
    </section>
  );
}


