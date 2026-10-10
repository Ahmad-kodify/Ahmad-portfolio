import { cn } from '@/lib/cn';
import { PillTag } from './PillTag';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  size?: 'display' | 'lg' | 'md';
  /** Terracotta left bar beside the supporting line. */
  bar?: boolean;
  className?: string;
  id?: string;
}

const sizes = {
  display:
    'text-[2.65rem] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.25rem] tracking-[-0.035em]',
  lg: 'text-[2.15rem] leading-[1.05] sm:text-5xl lg:text-6xl tracking-[-0.03em]',
  md: 'text-3xl leading-[1.08] sm:text-4xl lg:text-5xl tracking-[-0.025em]',
};

/**
 * Eyebrow pill + headline + supporting line.
 * Compose the headline with <Band> and <Accent> from ./Band.
 */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'left',
  as: Tag = 'h2',
  size = 'lg',
  bar = false,
  className,
  id,
}: SectionHeadingProps) {
  const center = align === 'center';
  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal>
          <PillTag>{eyebrow}</PillTag>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <Tag id={id} className={cn('mt-5 font-extrabold text-ink', sizes[size])}>
          {title}
        </Tag>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <div
            className={cn(
              'mt-6 text-[17px] leading-relaxed text-body sm:text-lg',
              bar && !center && 'lead-bar',
              center && 'mx-auto max-w-2xl',
            )}
          >
            {sub}
          </div>
        </Reveal>
      )}
    </div>
  );
}
