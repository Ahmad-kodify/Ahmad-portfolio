import Image from 'next/image';
import type { Photo as PhotoData } from '@/lib/photos';
import { cn } from '@/lib/cn';

interface PhotoProps {
  photo: PhotoData;
  /** Must set an aspect ratio or explicit height, e.g. `aspect-[4/3]`. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Light cream wash so photos sit in the palette. */
  overlay?: boolean;
  /** Gentle zoom when a parent `.group` is hovered. */
  zoom?: boolean;
  rounded?: string;
  children?: React.ReactNode;
}

/**
 * Brand-treated photograph: rounded corners, soft shadow, warm cream wash,
 * lazy-loaded and optimised through next/image.
 * Source URL and search term live on the photo entry in lib/photos.ts.
 */
export function Photo({
  photo,
  className,
  sizes = '(min-width: 1024px) 40vw, 100vw',
  priority = false,
  overlay = true,
  zoom = true,
  rounded = 'rounded-[1.5rem]',
  children,
}: PhotoProps) {
  return (
    <figure className={cn('relative overflow-hidden bg-cream shadow-card ring-1 ring-ink/5', rounded, className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', zoom && 'transition-transform duration-700 ease-expo group-hover:scale-[1.03]')}
      />
      {overlay && <div aria-hidden className="pointer-events-none absolute inset-0 bg-cream/10" />}
      {children}
    </figure>
  );
}
