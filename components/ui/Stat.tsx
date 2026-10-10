'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

interface StatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  detail?: string;
  delay?: number;
  tone?: 'dark' | 'light';
}

/** Count-up number that animates the first time it scrolls into view. */
export function Stat({ value, suffix, prefix, label, detail, delay = 0, tone = 'dark' }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.8,
      delay,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce, delay]);

  // Reduced motion: show the final number immediately, no counting.
  const shown = reduce ? value : n;
  const dark = tone === 'dark';

  return (
    <div ref={ref}>
      <p
        className={cn(
          'text-6xl font-extrabold leading-none tracking-[-0.04em] tabular-nums sm:text-7xl',
          dark ? 'text-cream' : 'text-ink',
        )}
      >
        {prefix}
        {shown}
        {suffix && <span className="text-terracotta">{suffix}</span>}
      </p>
      <p className={cn('mt-4 text-base font-semibold', dark ? 'text-cream' : 'text-ink')}>{label}</p>
      {detail && (
        <p className={cn('mt-1 text-sm leading-relaxed', dark ? 'text-cream/55' : 'text-muted')}>{detail}</p>
      )}
    </div>
  );
}
