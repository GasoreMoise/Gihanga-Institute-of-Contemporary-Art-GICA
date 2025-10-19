import Image from 'next/image';
import { imageSizes, getResponsiveImageSizes } from '@/lib/images';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  blurDataURL?: string;
  className?: string;
  sizes?: string;
  quality?: number;
}

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  priority = false,
  blurDataURL,
  className = '',
  sizes,
  quality = 75
}: ResponsiveImageProps) {
  const responsiveSizes = sizes || getResponsiveImageSizes([640, 768, 1024, 1280, 1536]);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      quality={quality}
      sizes={responsiveSizes}
      className={`w-full h-auto ${className}`}
    />
  );
}

// Pre-configured image components for common use cases
export function HeroImage(props: Omit<ResponsiveImageProps, 'priority' | 'quality'>) {
  return (
    <ResponsiveImage
      {...props}
      priority
      quality={imageSizes.hero.quality}
    />
  );
}

export function GalleryImage(props: Omit<ResponsiveImageProps, 'quality'>) {
  return (
    <ResponsiveImage
      {...props}
      quality={imageSizes.gallery.quality}
    />
  );
}

export function ThumbnailImage(props: Omit<ResponsiveImageProps, 'quality'>) {
  return (
    <ResponsiveImage
      {...props}
      quality={imageSizes.thumbnail.quality}
    />
  );
}
