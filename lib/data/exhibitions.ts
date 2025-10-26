// Centralized exhibition data - single source of truth
export const currentExhibition = {
  title: "A bird shall carry the voice",
  artists: "Saana Gateja, Francis Offman, Kaneza Schaal, Cedric Mizero, Christian Nyampeta, Innocent Nkurunziza, Feline Ntabangena",
  dates: "19 December - 19 March 2025",
  image: {
    src: "/images/Francis.webp",
    alt: "A bird shall carry the voice - Exhibition artwork",
    width: 800,
    height: 1000
  },
  artworkCaption: {
    artist: "Francis Offman",
    title: "Untitled",
    year: 2024,
    gallery: "P240 gallery",
    medium: "acrylic, ink, paper, fabric, coffee grounds, 100% cotton gauze, Bolognese plaster on hemp",
    dimensions: "202 x 305 cm"
  }
};

// In a real app, this would come from your CMS
export async function getCurrentExhibition(locale: string = 'en') {
  if (locale === 'rw') {
    return {
      title: "A bird shall carry the voice", // Same title in both languages
      artists: "Saana Gateja, Francis Offman, Kaneza Schaal, Cedric Mizero, Christian Nyampeta, Innocent Nkurunziza, Feline Ntabagena",
      dates: "19 Ukuboza - 19 Werurwe 2025",
      image: currentExhibition.image,
      artworkCaption: currentExhibition.artworkCaption
    };
  }
  return currentExhibition;
}
