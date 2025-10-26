// Example usage for ExhibitionSection with artwork caption
// This shows how to implement the Ocula-style caption format

export const exhibitionDataExample = {
  title: "A bird shall carry the voice",
  artists: "Saana Gateja, Francis Offman, Kaneza Schaal, Cedric Mizero, Christian Nyampeta, Innocent Nkurunziza, Feline Ntabangena",
  dates: "19 December - 19 March 2025",
  image: {
    src: "/images/exhibition-artwork.jpg",
    alt: "Mixed media artwork by Francis Offman",
    width: 800,
    height: 600
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

// Usage in your page component:
/*
import ExhibitionSection from '@/components/ExhibitionSection';

<ExhibitionSection
  title={exhibitionDataExample.title}
  artists={exhibitionDataExample.artists}
  dates={exhibitionDataExample.dates}
  image={exhibitionDataExample.image}
  artworkCaption={exhibitionDataExample.artworkCaption}
/>
*/

// The caption will render as:
// "Francis Offman, Untitled 2024. Courtesy the artist and P240 gallery."
// With medium and dimensions shown below in smaller gray text.

// For future artworks, simply follow this format:
export const futureArtworkExample = {
  artist: "Artist Name",
  title: "Artwork Title",
  year: 2024,
  gallery: "Gallery Name",
  medium: "oil on canvas", // optional
  dimensions: "150 x 200 cm" // optional
};
