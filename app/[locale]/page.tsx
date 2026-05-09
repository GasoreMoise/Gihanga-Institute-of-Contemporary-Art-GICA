import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import QuotesSection from '@/components/QuotesSection';
import PartnersSection from '@/components/PartnersSection';
import PressSection from '@/components/PressSection';
import VisitSection from '@/components/VisitSection';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import Footer from '@/components/Footer';
import { getVisitData } from '@/lib/data/visit';
import { getContactContent } from '@/lib/data/contact';

export default async function Page() {
  const t = await getTranslations('landing');
  const h = await headers();
  const locale = h.get('x-next-intl-locale') || 'en';

  const visit = await getVisitData(locale);
  const contact = await getContactContent(locale);

  // MANUALLY ADD VIDEO PATHS TO THE SCREENINGS SLIDE
  const slides = [
    { title: '', image: { src: '/images/hero-background.webp', alt: 'GICA' }, href: '/' },
    { title: t('hero.slides.exhibitions'), image: { src: '/images/hero-exhibitions.webp', alt: 'Exhibitions' }, href: '/exhibitions' },
    {
      title: t('hero.slides.screenings'),
      image: { src: '/images/hero-screenings.webp', alt: 'Screenings' },
      // These keys MUST exist for the Hero component to render videos
      leftVideo: '/videos/screening-left.webm',
      rightVideo: '/videos/screening-right.webm',
      href: '/programme/screenings'
    },
    { title: t('hero.slides.talks'), image: { src: '/images/hero-talks.webp', alt: 'Talks' }, href: '/programme/talks' },
    { title: t('hero.slides.library'), image: { src: '/images/hero-library.webp', alt: 'The Koyo Kouoh Library' }, href: '/library' },
    { title: t('hero.slides.events'), image: { src: '/images/hero-events.webp', alt: 'Events' }, href: '/programme/events' }
  ];

  return (
    <main className="w-full relative overflow-x-hidden bg-[#0A1116]">
      <Hero
        tagline={t('hero.subtitle')}
        slides={slides}
      />

      <div className="relative z-10 w-full bg-[#0a1116] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <AboutSection />
        <QuotesSection />
        <PartnersSection />
        <PressSection />
        <VisitSection
          title={visit.title}
          openingTitle={visit.openingTitle}
          openingNote={visit.openingNote}
          openingHours={visit.openingHours}
          emailLabel={visit.emailLabel}
          email={visit.email}
          socialLabel={visit.socialLabel}
          social={visit.social}
          address={visit.address}
          image={visit.image}
        />

        <ContactStayInTouch
          title={contact.title}
          subtitle={contact.subtitle}
          // Fix: Passing an object instead of a string
          backgroundImage={{
            src: "/images/homecontact-bg.webp",
            alt: "Contact Background"
          }}
        />

        <Footer />
      </div>
    </main>
  );
}