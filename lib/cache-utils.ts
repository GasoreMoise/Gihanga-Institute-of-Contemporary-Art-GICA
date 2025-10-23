/**
 * Cache utilities for handling image cache busting and optimization
 */

// Add cache busting query parameter for development
export function getCacheBustedUrl(url: string, isDev: boolean = false): string {
  if (isDev && process.env.NODE_ENV === 'development') {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${Date.now()}`;
  }
  return url;
}

// Generate optimized image props with proper caching
export function getOptimizedImageProps(
  src: string,
  width: number,
  height: number,
  alt: string,
  options: {
    priority?: boolean;
    quality?: number;
    loading?: 'lazy' | 'eager';
  } = {}
) {
  const {
    priority = false,
    quality = 75,
    loading = 'lazy'
  } = options;

  return {
    src: getCacheBustedUrl(src),
    alt,
    width,
    height,
    priority,
    quality,
    loading,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    placeholder: 'blur' as const,
    blurDataURL: generateBlurDataURL(width, height),
  };
}

// Generate blur data URL for placeholder
function generateBlurDataURL(width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create a simple gradient blur
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

// Cache invalidation for production deployments
export function getImageVersion(): string {
  // Use build time or deployment hash for cache busting in production
  if (process.env.NODE_ENV === 'production') {
    return process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) || 'v1';
  }
  return `dev-${Date.now()}`;
}
