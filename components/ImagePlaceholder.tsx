import { generateBlurDataURL } from '@/lib/images';

interface ImagePlaceholderProps {
  width: number;
  height: number;
  className?: string;
  children?: React.ReactNode;
}

export default function ImagePlaceholder({ 
  width, 
  height, 
  className = '', 
  children 
}: ImagePlaceholderProps) {
  const blurDataURL = generateBlurDataURL(width, height);
  
  return (
    <div 
      className={`relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${blurDataURL})`,
          filter: 'blur(20px)',
          transform: 'scale(1.1)'
        }}
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        {children || (
          <div className="text-neutral-400 text-sm">
            {width} × {height}
          </div>
        )}
      </div>
    </div>
  );
}
