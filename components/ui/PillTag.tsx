import { cn } from '@/lib/cn';

interface PillTagProps {
  children: React.ReactNode;
  className?: string;
  /** Gentle pulse — on by default for section eyebrows. */
  pulse?: boolean;
  tone?: 'terracotta' | 'ink' | 'light';
}

/** Orange pill eyebrow used above every section headline. */
export function PillTag({ children, className, pulse = true, tone = 'terracotta' }: PillTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]',
        tone === 'terracotta' && 'bg-terracotta text-white',
        tone === 'ink' && 'bg-ink text-cream',
        tone === 'light' && 'bg-white/10 text-cream ring-1 ring-white/20',
        pulse && tone === 'terracotta' && 'pill-pulse',
        className,
      )}
    >
      {children}
    </span>
  );
}
