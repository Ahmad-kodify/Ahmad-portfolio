'use client';

import { motion } from 'framer-motion';
import { EASE, REVEAL_DURATION, viewportOnce } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  /** Seconds. Stagger siblings by ~0.08. */
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'span';
}

/** Fade-up reveal on scroll. Wrap any block. */
export function Reveal({ children, delay = 0, y = 26, className, as = 'div' }: RevealProps) {
  const initial = { opacity: 0, y };
  const whileInView = { opacity: 1, y: 0 };
  const transition = { duration: REVEAL_DURATION, ease: EASE, delay };

  if (as === 'li') {
    return (
      <motion.li className={className} initial={initial} whileInView={whileInView} viewport={viewportOnce} transition={transition}>
        {children}
      </motion.li>
    );
  }
  if (as === 'span') {
    return (
      <motion.span className={className} initial={initial} whileInView={whileInView} viewport={viewportOnce} transition={transition}>
        {children}
      </motion.span>
    );
  }
  return (
    <motion.div className={className} initial={initial} whileInView={whileInView} viewport={viewportOnce} transition={transition}>
      {children}
    </motion.div>
  );
}
