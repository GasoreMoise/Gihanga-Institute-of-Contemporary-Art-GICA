export const contactContent = {
  title: 'Stay in Touch',
  subtitle:
    "For any enquiries, thoughts and ideas please do not hesitate to reach out to us.",
  backgroundImage: {
    src: '/images/homecontact-bg.webp', // You will upload this
    alt: 'Guests gathering inside the institute at night',
  }
};

export async function getContactContent(locale: string = 'en') {
  if (locale === 'rw') {
    return {
      title: 'Twandikire',
      subtitle: 'Ku kibazo cyangwa icyifuzo icyo ari cyo cyose, watwandikira',
      backgroundImage: contactContent.backgroundImage
    };
  }
  return contactContent;
}


