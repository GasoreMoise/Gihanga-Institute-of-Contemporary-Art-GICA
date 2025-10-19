export const imageSizes = {
  hero: {
    width: 2400,
    height: 1350,
    quality: 80
  },
  gallery: {
    width: 1200,
    height: 800,
    quality: 75
  },
  thumbnail: {
    width: 600,
    height: 400,
    quality: 70
  },
  avatar: {
    width: 200,
    height: 200,
    quality: 80
  }
} as const;

export function getImageUrl(src: string, width: number, height: number, quality = 75) {
  // For Sanity images, this would be handled by @sanity/image-url
  // For now, return the original src
  return src;
}

export function generateBlurDataURL(width: number, height: number) {
  // Server-side safe blur data URL generation
  if (typeof window === 'undefined') {
    // Return a simple base64 encoded 1x1 pixel for SSR
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=';
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, width, height);
  }
  return canvas.toDataURL();
}

export function getSanityImageUrl(
  asset: { _ref: string },
  width: number,
  height: number,
  quality = 75
) {
  // This would be implemented with @sanity/image-url when Sanity is integrated
  // For now, return a placeholder
  return `https://via.placeholder.com/${width}x${height}?text=Image+${width}x${height}`;
}

export function getResponsiveImageSizes(breakpoints: number[]) {
  return breakpoints.map(bp => `(max-width: ${bp}px) ${bp}px`).join(', ') + ', 100vw';
}
