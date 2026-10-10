'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import Lenis from 'lenis';
import { lenisRef } from '@/lib/lenis';

/**
 * Global client-side providers:
 *  - MotionConfig honours `prefers-reduced-motion` for every Framer animation.
 *  - Lenis gives buttery smooth scrolling (skipped for reduced-motion users).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      // Smooth-scroll in-page anchor links (`<a href="#section">`), offset for the sticky nav.
      anchors: { offset: -88 },
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New page → start at the top (unless the URL targets an anchor).
  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
