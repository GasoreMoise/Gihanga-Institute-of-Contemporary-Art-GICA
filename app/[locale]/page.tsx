import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import WelcomeSection from '@/components/WelcomeSection';
import ExhibitionSection from '@/components/ExhibitionSection';
import VisitSection from '@/components/VisitSection';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import { getCurrentExhibition } from '@/lib/data/exhibitions';
import { getCurrentProgramme } from '@/lib/data/programme';
import { getVisitData } from '@/lib/data/visit';
import { getContactContent } from '@/lib/data/contact';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';

export default async function Page() {
  const t = await getTranslations('landing');
  const h = headers();
  const locale = h.get('x-next-intl-locale') || 'en';
  const currentExhibition = await getCurrentExhibition(locale);
  const currentProgramme = await getCurrentProgramme(locale);
  const visit = await getVisitData(locale);
  const contact = await getContactContent(locale);

  return (
    <>
      <Hero 
        title={t('hero.title')} 
        subtitle={t('hero.subtitle')}
        image={{
          src: '/images/hero-background.webp', // You'll upload this
          width: 1920,
          height: 1080,
          blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
        }}
        programmeData={{
          title: currentProgramme.title,
          description: currentProgramme.description,
          menuItems: currentProgramme.menuItems,
          backgroundImage: currentProgramme.backgroundImage
        }}
      />
      <AboutSection />
      <WelcomeSection />
      <ExhibitionSection
        title={currentExhibition.title}
        artists={currentExhibition.artists}
        dates={currentExhibition.dates}
        image={currentExhibition.image}
      />
      <VisitSection
        title={visit.title}
        openingTitle={visit.openingTitle}
        openingNote={visit.openingNote}
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


