'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const FINE = '(pointer: fine)';
const REDUCE = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const fine = window.matchMedia(FINE);
  const reduce = window.matchMedia(REDUCE);
  fine.addEventListener('change', onChange);
  reduce.addEventListener('change', onChange);
  return () => {
    fine.removeEventListener('change', onChange);
    reduce.removeEventListener('change', onChange);
  };
}
const getSnapshot = () => window.matchMedia(FINE).matches && !window.matchMedia(REDUCE).matches;
const getServerSnapshot = () => false;

/**
 * Custom cursor accent: a small terracotta dot with a trailing ring that
 * grows over interactive elements. Only active on fine pointers with motion
 * allowed; the native cursor stays on form fields.
 */
export function Cursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 1200, damping: 60, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1200, damping: 60, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('custom-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const field = target.closest('input, textarea, select');
      const interactive = target.closest('a, button, [role="button"], label, summary, [data-cursor]');
      setHidden(Boolean(field));
      setHover(Boolean(interactive) && !field);
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over, { passive: true });
    root.addEventListener('mouseleave', leave);
    root.addEventListener('mouseenter', enter);

    return () => {
      root.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      root.removeEventListener('mouseleave', leave);
      root.removeEventListener('mouseenter', enter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-terracotta"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: hover ? 0 : 1, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] -ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-terracotta"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hover ? 1.6 : 1,
          opacity: hidden ? 0 : hover ? 1 : 0.45,
          backgroundColor: hover ? 'rgba(232,96,44,0.14)' : 'rgba(232,96,44,0)',
        }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      />
    </>
  );
}
