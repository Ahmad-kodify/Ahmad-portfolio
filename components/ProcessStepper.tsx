'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import type { ProcessStep } from '@/lib/process';
import { EASE, viewportOnce } from '@/lib/motion';

export function StepNode({ number, progress, index, total }: { number: string; progress: MotionValue<number>; index: number; total: number }) {
  const start = index / total;
  const fill = useTransform(progress, [start, start + 0.12], [0, 1]);
  return (
    <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-extrabold text-terracotta shadow-card ring-1 ring-ink/10">
      <motion.span className="absolute inset-0 rounded-full bg-terracotta" style={{ opacity: fill }} />
      <motion.span className="relative" style={{ color: useTransform(fill, [0, 1], ['#E8602C', '#FFFFFF']) }}>
        {number}
      </motion.span>
    </span>
  );
}

/**
 * Three-step process with a connecting line that draws in as you scroll.
 * Horizontal on desktop, vertical on mobile.
 */
export function ProcessStepper({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className="relative">
      {/* Desktop track */}
      <div aria-hidden className="absolute left-6 right-6 top-6 hidden h-px bg-ink/10 md:block">
        <motion.div className="h-full origin-left bg-terracotta" style={{ scaleX: progress }} />
      </div>
      {/* Mobile track */}
      <div aria-hidden className="absolute bottom-6 left-6 top-6 w-px bg-ink/10 md:hidden">
        <motion.div className="h-full w-full origin-top bg-terracotta" style={{ scaleY: progress }} />
      </div>

      <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
        {steps.map((s, i) => (
          <motion.li
            key={s.id}
            className="relative pl-[4.25rem] md:pl-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
          >
            <div className="absolute left-0 top-0 md:relative">
              <StepNode number={s.number} progress={progress} index={i} total={steps.length} />
            </div>
            <h3 className="mt-0 text-2xl font-bold tracking-[-0.02em] text-ink md:mt-7">{s.title}</h3>
            <p className="mt-2.5 max-w-xs leading-relaxed text-body">{s.summary}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
