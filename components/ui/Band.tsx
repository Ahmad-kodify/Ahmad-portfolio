'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/cn';

/** Peach highlight band that draws in behind a key phrase when scrolled into view. */
export function Band({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // `once` latches, so the band never un-draws.
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <span ref={ref} className={cn('band', inView && 'is-in', className)}>
      {children}
    </span>
  );
}

/** Terracotta accent — use on exactly one phrase per headline. */
export function Accent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('text-terracotta', className)}>{children}</span>;
}
