'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FaqItem } from '@/lib/faq';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

/** Accessible accordion. One item open at a time. */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-[1.5rem] bg-white shadow-card ring-1 ring-ink/5">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        return (
          <div key={item.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-cream/60 md:px-8 md:py-6"
            >
              <span className={cn('text-[17px] font-semibold tracking-[-0.01em] md:text-lg', isOpen ? 'text-terracotta' : 'text-ink')}>
                {item.q}
              </span>
              <motion.span
                aria-hidden
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors',
                  isOpen ? 'border-terracotta bg-terracotta text-white' : 'border-ink/15 text-ink',
                )}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 leading-relaxed text-body md:px-8 md:pb-7">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
