export const visitData = {
  title: 'Visit',
  openingTitle: 'Opening Hours',
  openingHours: {
    days: 'Tuesday - Sunday',
    hours: '11am - 5pm'
  },
  emailLabel: 'Email',
  email: 'contact@gica.art',
  socialLabel: 'Social Media',
  social: '@gica.kigali',
  phoneLabel: 'Phone Number',
  phoneNumber: '0780064161', // Pristine default reference
  address: 'KN 14 St 28, Kimihurura, Kigali, Rwanda',
  image: {
    src: '/images/visit-background.webp',
    alt: 'Exterior view of the institute',
    width: 1200,
    height: 1600
  }
};

export async function getVisitData(locale: string = 'en') {
  if (locale === 'rw') {
    return {
      title: 'Dusure',
      openingTitle: 'Amasaha yo gufungura',
      openingNote: 'Turafungura vuba',
      openingHours: {
        days: 'Kuwa kabiri - Ku cyumweru',
        hours: '11am - 5pm'
      },
      emailLabel: 'Imeli',
      email: visitData.email,
      socialLabel: 'Imbuga nkoranyambaga',
      social: visitData.social,
      // CRITICAL FIX: Include the reference key here so the 'rw' layout can read it!
      phoneNumber: visitData.phoneNumber, 
      address: 'KN 14 ST 28, Kimihurura, Kigali, Rwanda',
      image: visitData.image
    };
  }
  return visitData;
}