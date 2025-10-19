'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <motion.section 
      className="relative h-screen w-full bg-[#11212B] flex items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-6 -mt-20">
        <motion.h2 
          className="text-white text-4xl md:text-5xl font-sabon font-normal text-center mb-28"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          About
        </motion.h2>
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-white text-lg md:text-xl font-sabon font-normal leading-relaxed text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Gihanga Institute of Contemporary Art is a forthcoming non-profit centre for the arts co-founded by Kaneza Schaal and Kami Gahiga that will be home to a library, exhibitions, platforms for performance, a screening room, studio, and art residency. Designed by Rwandan architect Amin Gafaranga, the 777 sqm structure is dedicated to supporting Rwandan and regional artists through thoughtful exhibitions, shared spaces for making, and commitment to intellectual and artistic exchange.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}
