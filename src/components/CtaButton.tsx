import { ArrowUpRight } from 'lucide-react';
import type { ElementType, ReactNode } from 'react';

type CtaVariant = 'solid' | 'outline';
type CtaSize = 'sm' | 'md';

type CtaButtonProps = {
  children: ReactNode;
  /** Renders an <a> when provided, otherwise a <button>. */
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  target?: string;
  rel?: string;
  variant?: CtaVariant;
  size?: CtaSize;
  /** Swap the arrow for another glyph (e.g. a check on a sent form). */
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
};

/**
 * Shell + pill + circular arrow CTA used across the whole site:
 * an outlined capsule that holds a filled label pill and a matching
 * round icon button, both reacting to a single hover.
 */
export default function CtaButton({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  target,
  rel,
  variant = 'solid',
  size = 'md',
  icon,
  fullWidth = false,
  className = '',
  ...rest
}: CtaButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';

  const shell = [
    'group relative isolate items-center rounded-full border',
    fullWidth ? 'flex w-full justify-between' : 'inline-flex',
    'border-borders bg-white/70 backdrop-blur-sm shadow-soft',
    'transition-all duration-300 hover:border-primary-text/25',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-text/30 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-bg',
    disabled ? 'opacity-60 pointer-events-none' : 'cursor-pointer',
    size === 'sm' ? 'gap-1 p-1' : 'gap-1.5 p-1.5',
    className,
  ].join(' ');

  const label = [
    'inline-flex items-center justify-center rounded-full font-semibold tracking-wide whitespace-nowrap',
    'transition-colors duration-300',
    size === 'sm' ? 'px-4 py-1.5 text-[12px]' : 'px-7 py-3.5 text-[13px]',
    fullWidth ? 'flex-1' : '',
    variant === 'solid'
      ? 'bg-primary-text text-white group-hover:bg-accent group-hover:text-primary-text'
      : 'bg-transparent text-primary-text group-hover:bg-hover-bg',
  ].join(' ');

  const circle = [
    'shrink-0 inline-flex items-center justify-center rounded-full',
    'transition-all duration-300',
    icon ? '' : 'group-hover:rotate-45',
    size === 'sm' ? 'h-7 w-7' : 'h-11 w-11',
    variant === 'solid'
      ? 'bg-primary-text text-white group-hover:bg-accent group-hover:text-primary-text'
      : 'border border-borders text-primary-text group-hover:border-primary-text',
  ].join(' ');

  return (
    <Tag
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={shell}
      {...(href ? {} : { type, disabled })}
      {...rest}
    >
      <span className={label}>{children}</span>
      <span className={circle} aria-hidden="true">
        {icon ?? <ArrowUpRight size={size === 'sm' ? 14 : 17} strokeWidth={2.4} />}
      </span>
    </Tag>
  );
}
