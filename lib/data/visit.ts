export const visitData = {
  title: 'Visit Us',
  openingTitle: 'Opening Hours',
  openingNote: 'Forthcoming – Opening Winter 2025',
  emailLabel: 'Email',
  email: 'contact@gica.art',
  socialLabel: 'Social Media',
  social: '@gica.kigali',
  address: 'KN 14 St 28, Kimihurura , Kigali , Rwanda',
  image: {
    src: '/images/visit-background.jpg', // You will upload this
    alt: 'Exterior view of the institute',
    width: 1200,
    height: 1600
  }
};

export async function getVisitData() {
  return visitData;
}


