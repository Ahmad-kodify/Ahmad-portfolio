'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Magnetic } from './Magnetic';

type Variant = 'primary' | 'outline' | 'dark' | 'light' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  /** Cursor-follow effect for primary CTAs. */
  magnetic?: boolean;
  /** Show the trailing arrow. */
  arrow?: boolean;
  external?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-expo select-none disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-terracotta text-white shadow-pill hover:bg-terracotta-deep hover:shadow-[0_12px_28px_-10px_rgb(232_96_44_/_0.6)] active:scale-[0.98]',
  outline:
    'border border-ink/80 text-ink hover:bg-ink hover:text-cream hover:border-ink active:scale-[0.98]',
  dark: 'bg-ink text-cream hover:bg-terracotta active:scale-[0.98]',
  light: 'bg-cream text-ink hover:bg-white active:scale-[0.98]',
  ghost: 'text-ink hover:text-terracotta',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
};

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="h-[1.05em] w-[1.05em] shrink-0 transition-transform duration-300 ease-expo group-hover/btn:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h11" />
      <path d="M11 5l5 5-5 5" />
    </svg>
  );
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  arrow = true,
  external,
  type = 'button',
  disabled,
  onClick,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );

  let el: React.ReactNode;
  if (href && (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'))) {
    el = (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        {content}
      </a>
    );
  } else if (href && href.startsWith('#')) {
    // Plain anchor so Lenis can smooth-scroll it.
    el = (
      <a href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </a>
    );
  } else if (href) {
    el = (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  } else {
    el = (
      <button type={type} className={classes} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </button>
    );
  }

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
