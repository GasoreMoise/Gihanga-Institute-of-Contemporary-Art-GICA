'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function Hero({
  title,
  subtitle,
  image,
  programmeData
}: {
  title: string;
  subtitle?: string;
  image?: { src: string; width: number; height: number; blurDataURL?: string };
  programmeData?: {
    title: string;
    description: string;
    menuItems: { label: string }[];
    backgroundImage: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  };
}) {
  const [isEnglish, setIsEnglish] = useState(true);
  const [isProgrammeOpen, setIsProgrammeOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [bgLoaded, setBgLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [particlePositions, setParticlePositions] = useState<Array<{ initialX: number; initialY: number; targetX: number; targetY: number }>>([]);
  
  // Motion values for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  const taglineRef = useRef<HTMLDivElement>(null);

  // Get the full tagline text
  const fullText = title || (locale === 'en'
    ? (subtitle || "A living space for art, research and collective imagination")
    : (subtitle || "Umunsi w'ubuzima bw'ubuhanzi, ubushakashatsi n'ibitekerezo by'umuryango"));

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Adjust speed here
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Reset typewriter when locale changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [locale]);

  // Generate particle positions only on client side to avoid hydration mismatch
  useEffect(() => {
    const positions = Array.from({ length: 6 }, () => ({
      initialX: Math.random() * 200 - 100,
      initialY: Math.random() * 100 - 50,
      targetX: Math.random() * 400 - 200,
      targetY: Math.random() * 200 - 100,
    }));
    setParticlePositions(positions);
  }, []);

  // Magnetic effect handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!taglineRef.current) return;
    const rect = taglineRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) * 0.1);
    mouseY.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const switchLocale = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') as any);
  };

  const openProgramme = () => {
    setIsProgrammeOpen(true);
  };

  const closeProgramme = () => {
    setIsProgrammeOpen(false);
  };
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      {image?.src && (
        <Image
          src={image.src}
          alt="GICA - A living space for art, research and collective imagination"
          width={image.width}
          height={image.height}
          priority
          fetchPriority="high"
          placeholder={image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={image.blurDataURL}
          sizes="100vw"
          quality={75}
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => setBgLoaded(true)}
        />
      )}
      
      {/* Dark overlay for better text readability */}
      <div className={`absolute inset-0 ${bgLoaded ? 'bg-black/40' : 'bg-black/0'}`} />
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        
        {/* Header with Logo and Navigation */}
        <header className="flex justify-between items-start px-6 md:px-10 lg:px-12 py-4 md:py-5 lg:py-7">
          {/* Logo Section */}
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="flex items-center space-x-3 mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src="/logos/logo4.svg"
                alt="GICA Logo"
                width={64}
                height={64}
                className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
                initial={{ scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1 }}
              />
            </motion.div>
          </motion.div>
          
          {/* Navigation */}
          <motion.div 
            className="flex items-center space-x-8 md:space-x-12 lg:space-x-20 mt-2 md:mt-3 lg:mt-5 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.button 
              className="text-white text-lg md:text-xl font-sabon font-normal cursor-pointer hover:text-gray-300 transition-colors"
              whileHover={{ scale: 1.1, color: "#f3f4f6" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                const next = locale === 'en' ? 'rw' : 'en';
                setIsEnglish(next === 'en');
                switchLocale(next);
              }}
            >
              <span className={locale === 'en' ? 'underline' : ''}>EN</span>
              <span className="mx-1">/</span>
              <span className={locale === 'rw' ? 'underline' : ''}>KIN</span>
            </motion.button>
            
            {/* Programme Navigation Button */}
            <motion.button 
              className="text-white hover:text-gray-300 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={openProgramme}
            >
              <img
                src="/logos/navbar.svg"
                alt="Navigation Menu"
                className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              />
            </motion.button>
          </motion.div>
        </header>
        
        {/* Bottom Section with Tagline */}
        <div className="flex-1 flex items-end pb-20 md:pb-10 lg:pb-14 px-4 md:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-4 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Scroll indicator arrow */}
            <motion.div
              className="flex-shrink-0 cursor-pointer order-2 md:order-1 mt-4 md:mt-0"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.2, y: 0 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg 
                className="w-4 h-4 md:w-5 md:h-5 text-white" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </motion.svg>
            </motion.div>
            
            {/* Interactive Tagline */}
            <motion.div
              ref={taglineRef}
              className="relative cursor-pointer order-1 md:order-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                x: springX,
                y: springY,
              }}
            >
              {/* Subtle background glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/2 to-white/5 rounded-lg blur-lg"
                animate={{
                  opacity: isHovered ? 0.6 : 0,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Main text */}
              <motion.div
                className="relative z-10 text-white tracking-wider text-xl md:text-xl lg:text-2xl xl:text-3xl font-sabon font-normal max-w-full md:max-w-4xl lg:max-w-6xl xl:max-w-9xl leading-relaxed text-left md:text-left"
                animate={{
                  textShadow: isHovered 
                    ? "0 0 15px rgba(255, 255, 255, 0.4)"
                    : "0 0 0px rgba(255, 255, 255, 0)",
                  filter: isHovered ? "brightness(1.1)" : "brightness(1)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Typewriter text with cursor */}
                <span className="relative">
                  {displayText}
                  {currentIndex < fullText.length && (
                    <motion.span
                      className="inline-block w-0.5 h-6 md:h-8 bg-white ml-1"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </span>
                
                {/* Particle effects on hover */}
                {isHovered && particlePositions.length > 0 && (
                  <>
                    {particlePositions.map((pos, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{ 
                          x: pos.initialX, 
                          y: pos.initialY,
                          opacity: 0,
                          scale: 0
                        }}
                        animate={{ 
                          x: pos.targetX,
                          y: pos.targetY,
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Programme Overlay - Full ProgrammeSection Layout */}
      {programmeData && isProgrammeOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={closeProgramme}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={programmeData.backgroundImage.src}
              alt={programmeData.backgroundImage.alt}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              quality={75}
            />
          </div>
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content Container - Exact same as ProgrammeSection */}
          <div 
            className="relative z-5 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-2 px-4 md:px-8 lg:px-16 py-24 md:py-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Title */}
            <div className="flex items-center justify-center md:justify-start">
              <motion.h2 
                className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sabon font-normal text-center md:text-left -mt-40 md:mt-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {programmeData.title}
              </motion.h2>
            </div>
            {/* Right: Vertical Menu */}
            <div className="flex items-center justify-center md:justify-start">
              <motion.ul 
                className="space-y-8 md:space-y-12 lg:space-y-20 text-center md:text-left md:ml-40 -mt-72 md:mt-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {programmeData.menuItems.map((item, idx) => (
                  <li key={idx}>
                    <button 
                      className="text-white text-lg md:text-xl lg:text-xl font-sabon hover:opacity-80 transition-opacity"
                      onClick={closeProgramme}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
          
          
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 z-50 text-white hover:text-gray-300 transition-colors p-2"
            onClick={closeProgramme}
          >
            <svg 
              className="w-8 h-8 md:w-10 md:h-10" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}


