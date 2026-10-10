'use client';

import { motion } from 'framer-motion';
import { EASE, viewportOnce } from '@/lib/motion';

const nodes = ['Lead', 'Booking', 'Record', 'Follow-up', 'Repeat'];

/** The one idea, drawn: a loop from first lead to repeat customer. */
export function SystemMap() {
  return (
    <motion.div
      className="relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-card ring-1 ring-ink/5 sm:p-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div aria-hidden className="dot-grid absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-peach-soft blur-3xl" />

      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">The loop</p>
        <p className="mt-2 text-xl font-bold tracking-[-0.02em] text-ink">One customer. One system. Every time.</p>

        <svg viewBox="0 0 520 220" className="mt-8 h-auto w-full" role="img" aria-label="Lead to booking to record to follow-up to repeat customer, looping back to lead">
          {/* Track */}
          <path d="M40 60 H480" stroke="#0F0F0F" strokeOpacity="0.1" strokeWidth="2" />
          <path d="M480 60 C 520 60, 520 170, 480 170 H40 C 0 170, 0 60, 40 60" fill="none" stroke="#0F0F0F" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="4 6" />
          {/* Drawn line */}
          <motion.path
            d="M40 60 H480"
            stroke="#E8602C"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
          />
          <motion.path
            d="M480 60 C 520 60, 520 170, 480 170 H40 C 0 170, 0 60, 40 60"
            fill="none"
            stroke="#E8602C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 2, ease: EASE, delay: 1.6 }}
          />
          {nodes.map((n, i) => {
            const x = 40 + i * 110;
            const last = i === nodes.length - 1;
            return (
              <motion.g
                key={n}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 + i * 0.28 }}
                style={{ transformOrigin: `${x}px 60px` }}
              >
                <circle cx={x} cy={60} r={18} fill={last ? '#E8602C' : '#FFFFFF'} stroke={last ? '#E8602C' : '#0F0F0F'} strokeWidth="2" />
                <text x={x} y={64} textAnchor="middle" fontSize="11" fontWeight="800" fill={last ? '#FFFFFF' : '#0F0F0F'} fontFamily="inherit">
                  {i + 1}
                </text>
                <text x={x} y={104} textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F0F0F" fontFamily="inherit">
                  {n}
                </text>
              </motion.g>
            );
          })}
          <text x="260" y="196" textAnchor="middle" fontSize="12" fontWeight="600" fill="#8C8A86" fontFamily="inherit">
            …and back to the start, automatically
          </text>
        </svg>
      </div>
    </motion.div>
  );
}
