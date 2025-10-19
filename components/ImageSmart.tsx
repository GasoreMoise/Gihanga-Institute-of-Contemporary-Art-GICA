import Image, { ImageProps } from 'next/image';

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  src: string;
  alt: string;
  aspect?: number; // width/height
  blurDataURL?: string;
};

export default function ImageSmart({ src, alt, aspect, blurDataURL, ...rest }: Props) {
  const style = aspect ? { aspectRatio: String(aspect) } : undefined;
  return (
    <div style={style} className="relative overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 50vw"
        {...rest}
        className="h-full w-full object-cover"
      />
    </div>
  );
}


