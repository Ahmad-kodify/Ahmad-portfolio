'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { photos } from '@/lib/photos';
import { Photo } from '../ui/Photo';

const cards = [
  {
    label: 'New lead',
    meta: 'via website · 2 min ago',
    title: 'Sarah M.',
    sub: 'Boiler service · SW19',
    tag: 'Auto-reply sent',
    glyph: (
      <path d="M4 7h16v10H4zM4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    label: 'Booking confirmed',
    meta: 'Thu · 10:30',
    title: 'Reminder scheduled',
    sub: 'WhatsApp · 24h before',
    glyph: (
      <>
        <rect x="4" y="6" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path d="M4 10h16M9 4v4M15 4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9.5 14.5l2 2 3.5-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: 'Customer record',
    meta: '3 jobs',
    title: '£1,240 lifetime',
    sub: 'Last visit · March',
    glyph: (
      <>
        <circle cx="12" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path d="M5.5 19c.8-3.2 3.4-4.8 6.5-4.8s5.7 1.6 6.5 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    label: 'Follow-up sent',
    meta: 'WhatsApp · automatic',
    title: '“Time for your annual service?”',
    sub: 'Rebooked in 2 hours',
    tag: 'Repeat customer',
    glyph: (
      <path d="M5 6.5A2.5 2.5 0 017.5 4h9A2.5 2.5 0 0119 6.5v7a2.5 2.5 0 01-2.5 2.5H10l-4 3.5V6.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    ),
  },
];

/** Hero visual: a real workspace photo with the customer journey as a live feed stacked over it. */
export function SystemFlow() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:max-w-lg">
      <div aria-hidden className="absolute inset-x-6 bottom-6 top-10 rounded-[3rem] bg-peach-soft/80 blur-2xl" />

      {/* Real photo (Unsplash — see lib/photos.ts `hero`; swap for your own workspace photo).
          Full-width block on mobile, tucked behind the feed on larger screens. */}
      <motion.div
        className="relative mb-4 w-full sm:absolute sm:left-0 sm:top-0 sm:mb-0 sm:w-[74%] sm:-rotate-2"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.25 }}
      >
        <Photo photo={photos.hero} className="aspect-[16/10] sm:aspect-[4/3]" sizes="(min-width: 1024px) 380px, 90vw" priority zoom={false} />
      </motion.div>

      {/* Connecting line — only visible in the gaps between cards */}
      <motion.div
        aria-hidden
        className="absolute bottom-16 left-[2.35rem] top-[60%] w-px origin-top border-l-2 border-dashed border-terracotta/45 sm:top-64"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.7 }}
      />

      <div className="relative space-y-3.5 pr-0 sm:pl-6 sm:pr-8 sm:pt-52">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            className="relative flex items-start gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink/5 sm:p-5"
            initial={{ opacity: 0, y: 28, x: 0 }}
            animate={{ opacity: 1, y: 0, x: i % 2 === 0 ? 0 : 14 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 + i * 0.16 }}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-peach-soft text-terracotta ring-1 ring-terracotta/10">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                {c.glyph}
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-terracotta">{c.label}</p>
                <p className="shrink-0 text-[11px] font-medium text-muted">{c.meta}</p>
              </div>
              <p className="mt-1 truncate text-[15px] font-bold tracking-[-0.01em] text-ink">{c.title}</p>
              <p className="text-[13px] text-body">{c.sub}</p>
              {c.tag && (
                <motion.span
                  className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold text-cream"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 1.1 + i * 0.16 }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                  {c.tag}
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Owner dashboard tile — floats above the stack, never over card text.
          The CSS float lives on the wrapper so it doesn't fight Framer's transform. */}
      <div className="float-slow absolute -top-14 right-0 hidden sm:block lg:-right-4">
        <motion.div
          className="w-44 rounded-2xl bg-ink p-4 text-cream shadow-lift"
          initial={{ opacity: 0, y: 20, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-terracotta">One dashboard</p>
          <dl className="mt-3 space-y-2 text-[12px]">
            {[
              ['Leads this week', '12'],
              ['Booked', '8'],
              ['Repeat rate', '64%'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <dt className="text-cream/60">{k}</dt>
                <dd className="font-bold tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex h-8 items-end gap-1" aria-hidden>
            {[35, 55, 45, 70, 60, 85, 100].map((h, i) => (
              <span key={i} className={`flex-1 rounded-sm ${i === 6 ? 'bg-terracotta' : 'bg-cream/25'}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
