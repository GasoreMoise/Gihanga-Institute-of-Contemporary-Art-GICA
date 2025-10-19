import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Prose from '@/components/Prose';
import ImageSmart from '@/components/ImageSmart';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import AboutSection from '@/components/AboutSection';
import WelcomeSection from '@/components/WelcomeSection';
// import { getLandingContent } from '@/lib/queries';
// import { createClient } from '@/lib/sanity';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('landing');
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
      <Section title={t('exhibitions.title')}>
        <Prose>
          <p>Current and upcoming exhibitions will be displayed here. Check back soon for our inaugural programming.</p>
        </Prose>
      </Section>
      <Section title={t('programme.title')}>
        <Prose>
          <p>Our programme includes contemporary theatre, performance, screenings, and educational events. Details coming soon.</p>
        </Prose>
      </Section>
      <Section title={t('visit.title')}>
        <Prose>
          <h3>Location</h3>
          <p>Kigali, Rwanda</p>
          <h3>Hours</h3>
          <p>Tuesday - Sunday: 10:00 AM - 6:00 PM</p>
          <p>Monday: Closed</p>
          <h3>Admission</h3>
          <p>Free admission for all visitors</p>
        </Prose>
      </Section>
      <Section title={t('contact.title')}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Prose>
              <p>For inquiries, please contact us at info@gica.rw</p>
              <p>Or use the contact form to send us a message directly.</p>
            </Prose>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}


