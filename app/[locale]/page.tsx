import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import WelcomeSection from '@/components/WelcomeSection';
import ExhibitionSection from '@/components/ExhibitionSection';
import VisitSection from '@/components/VisitSection';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import NewsletterModal from '@/components/NewsletterModal';
import { getCurrentExhibition } from '@/lib/data/exhibitions';
import { getCurrentProgramme } from '@/lib/data/programme';
import { getVisitData } from '@/lib/data/visit';
import { getContactContent } from '@/lib/data/contact';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';

export default async function Page() {
  const t = await getTranslations('landing');
  const h = await headers();
  const locale = h.get('x-next-intl-locale') || 'en';
  const currentExhibition = await getCurrentExhibition(locale);
  const currentProgramme = await getCurrentProgramme(locale);
  const visit = await getVisitData(locale);
  const contact = await getContactContent(locale);

  return (
    <>
      <Hero 
        tagline={t('hero.subtitle')}
        slides={[
          { title: '', image: { src: '/images/hero-background.webp', alt: 'GICA' } },
          { title: t('hero.slides.exhibitions'), image: { src: '/images/hero-exhibitions.webp', alt: 'Exhibitions' } },
          { title: t('hero.slides.screenings'), image: { src: '/images/hero-screenings.webp', alt: 'Screenings' } },
          { title: t('hero.slides.talks'), image: { src: '/images/hero-talks.webp', alt: 'Talks' } },
          { title: t('hero.slides.library'), image: { src: '/images/hero-library.webp', alt: 'The Koyo Kouoh Library' } },
          { title: t('hero.slides.events'), image: { src: '/images/hero-events.webp', alt: 'Events' } }
        ]}
        programmeData={{
          title: currentProgramme.title,
          description: currentProgramme.description,
          menuItems: currentProgramme.menuItems,
          backgroundImage: currentProgramme.backgroundImage
        }}
      />
      <NewsletterModal />
      <AboutSection />
      <WelcomeSection />
      <ExhibitionSection
        title={currentExhibition.title}
        artists={currentExhibition.artists}
        dates={currentExhibition.dates}
        image={currentExhibition.image}
        artworkCaption={currentExhibition.artworkCaption}
      />
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
        backgroundImage={contact.backgroundImage}
      />
      <Footer />
    </>
  );
}


