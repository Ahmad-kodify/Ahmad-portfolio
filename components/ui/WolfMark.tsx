import { WOLF_PATH } from '@/lib/brand';
import { cn } from '@/lib/cn';

interface WolfMarkProps {
  className?: string;
  /** Accessible label; omit to render decoratively. */
  title?: string;
}

/**
 * The Arkar wolf mark. Fills with `currentColor`, so set the colour with a
 * text-* class (e.g. `text-terracotta`, `text-ink`). Eyes and nose are
 * transparent cut-outs, so it sits cleanly on any background.
 */
export function WolfMark({ className, title }: WolfMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn('shrink-0', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={WOLF_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
