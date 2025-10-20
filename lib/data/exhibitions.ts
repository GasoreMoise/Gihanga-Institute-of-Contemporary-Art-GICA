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
  }
};

// In a real app, this would come from your CMS
export async function getCurrentExhibition() {
  return currentExhibition;
}
