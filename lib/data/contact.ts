export const contactContent = {
  title: 'Stay in Touch',
  subtitle:
    "For any enquiries, thoughts and ideas please do not hesitate to reach out to us.",
  backgroundImage: {
    src: '/images/contact-background.jpg', // You will upload this
    alt: 'Guests gathering inside the institute at night',
  }
};

export async function getContactContent() {
  return contactContent;
}


