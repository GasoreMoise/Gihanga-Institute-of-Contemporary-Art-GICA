import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Prose from '@/components/Prose';
import ImageSmart from '@/components/ImageSmart';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import AboutSection from '@/components/AboutSection';
import WelcomeSection from '@/components/WelcomeSection';
import ExhibitionSection from '@/components/ExhibitionSection';
import ProgrammeSection from '@/components/ProgrammeSection';
import VisitSection from '@/components/VisitSection';
import ContactStayInTouch from '@/components/ContactStayInTouch';
import { getCurrentExhibition } from '@/lib/data/exhibitions';
import { getCurrentProgramme } from '@/lib/data/programme';
import { getVisitData } from '@/lib/data/visit';
import { getContactContent } from '@/lib/data/contact';
// import { getLandingContent } from '@/lib/queries';
// import { createClient } from '@/lib/sanity';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('landing');
  const currentExhibition = await getCurrentExhibition();
  const currentProgramme = await getCurrentProgramme();
  const visit = await getVisitData();
  const contact = await getContactContent();
  // const client = createClient();
  // const data = await getLandingContent(client);

  return (
    <>
      <Hero 
        title={t('hero.title')} 
        subtitle={t('hero.subtitle')}
        image={{
          src: '/images/hero-background.jpg', // You'll upload this
          width: 1920,
          height: 1080,
          blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
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
      <ProgrammeSection
        title={currentProgramme.title}
        description={currentProgramme.description}
        menuItems={currentProgramme.menuItems}
        backgroundImage={currentProgramme.backgroundImage}
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


