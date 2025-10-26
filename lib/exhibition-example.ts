// Example usage for ExhibitionSection with artwork caption
// This shows how to implement the Ocula-style caption format

export const exhibitionData = {
  title: "Current Exhibition",
  artists: "Francis Offman, Jane Doe, John Smith",
  dates: "January 15 - March 30, 2024",
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
<ExhibitionSection
  title={exhibitionData.title}
  artists={exhibitionData.artists}
  dates={exhibitionData.dates}
  image={exhibitionData.image}
  artworkCaption={exhibitionData.artworkCaption}
/>
*/

// For future artworks, simply follow this format:
export const futureArtworkExample = {
  artist: "Artist Name",
  title: "Artwork Title",
  year: 2024,
  gallery: "Gallery Name",
  medium: "oil on canvas", // optional
  dimensions: "150 x 200 cm" // optional
};

// The caption will automatically render as:
// "Artist Name, Artwork Title 2024. Courtesy the artist and Gallery Name."
// With medium and dimensions shown below in smaller gray text if provided.
