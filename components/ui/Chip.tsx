import { cn } from '@/lib/cn';

/** Rounded chip used in the "Who it's for" grid and tag rows. */
export function Chip({
  children,
  className,
  size = 'md',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-ink/10 bg-white/70 font-medium text-ink transition-[background-color,border-color,transform] duration-300 ease-expo',
        size === 'md' && 'px-5 py-2.5 text-[15px] hover:-translate-y-0.5 hover:border-terracotta/60 hover:bg-peach-soft',
        size === 'sm' && 'px-3 py-1 text-xs',
        className,
      )}
    >
      {children}
    </span>
  );
}
