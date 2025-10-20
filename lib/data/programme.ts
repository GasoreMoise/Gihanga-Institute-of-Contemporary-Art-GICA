// Centralized programme data - single source of truth
export const currentProgramme = {
  title: "Programme",
  description: "Our programme includes contemporary theatre, performance, screenings, and educational events. Details coming soon.",
  // Menu items shown on the right column (matches reference UI)
  menuItems: [
    { label: "The Koyo Kouoh Library" },
    { label: "Exhibitions" },
    { label: "Performances" },
    { label: "Screenings" },
    { label: "Events & Workshops" }
  ],
  backgroundImage: {
    src: "/images/programme-background.jpg", // You'll upload this
    alt: "GICA Programme - Contemporary arts and cultural events",
    width: 1920,
    height: 1080
  }
};

// In a real app, this would come from your CMS
export async function getCurrentProgramme() {
  return currentProgramme;
}
