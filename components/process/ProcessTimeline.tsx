'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import type { ProcessStep } from '@/lib/process';
import { EASE, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { StepNode } from '../ProcessStepper';
import { Photo } from '../ui/Photo';

/** Expanded vertical process with a line that draws in as you scroll. */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 75%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute bottom-6 left-6 top-6 w-px bg-ink/10">
        <motion.div className="h-full w-full origin-top bg-terracotta" style={{ scaleY: progress }} />
      </div>

      <ol className="space-y-20 md:space-y-28">
        {steps.map((s, i) => (
          <li key={s.id} id={s.id} className="relative pl-[4.5rem] md:pl-24">
            <div className="absolute left-0 top-0">
              <StepNode number={s.number} progress={progress} index={i} total={steps.length} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">Step {s.number}</p>
              <h2 className="mt-2 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl">
                {s.title}
              </h2>
              <p className="lead-bar mt-6 max-w-2xl text-[17px] leading-relaxed text-body sm:text-lg">{s.happens}</p>
            </motion.div>

            <div className={cn('mt-8 grid gap-5 md:grid-cols-2', s.photo && 'lg:grid-cols-3')}>
              {s.photo && (
                <motion.div
                  className="group relative min-h-[240px] md:col-span-2 lg:col-span-1"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <Photo photo={s.photo} className="h-full min-h-[240px]" sizes="(min-width: 1024px) 30vw, 100vw" />
                </motion.div>
              )}
              <motion.div
                className="rounded-[1.5rem] bg-white p-7 shadow-card ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-lift"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">What you get</p>
                <p className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">{s.get}</p>
              </motion.div>
              <motion.div
                className="rounded-[1.5rem] bg-white p-7 shadow-card ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-lift"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">How long</p>
                <p className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-ink">{s.duration}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{s.durationLabel}</p>
              </motion.div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
