// Utility functions for image optimization

export function generateBlurDataURL(width: number, height: number): string {
  // Generate a simple blur placeholder
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a simple gradient blur
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

export function getOptimizedImageProps(
  src: string,
  width: number,
  height: number,
  alt: string
) {
  return {
    src,
    alt,
    width,
    height,
    priority: true,
    quality: 85,
    sizes: '100vw',
    placeholder: 'blur' as const,
    blurDataURL: generateBlurDataURL(width, height),
  };
}

// Hero image optimization
export function getHeroImageProps(src: string, width: number, height: number) {
  return getOptimizedImageProps(
    src,
    width,
    height,
    'GICA - A living space for art, research and collective imagination'
  );
}
