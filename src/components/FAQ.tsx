import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is your primary technology stack?',
      a: 'I specialize in the MERN Stack (MongoDB, Express.js, React.js, Node.js) and Next.js, combined with TypeScript for compile-time safety and Tailwind CSS for responsive, modern interfaces.',
    },
    {
      q: 'Do you collaborate with teams and clients globally?',
      a: 'Yes. I work remote-first, collaborating with global startups and product teams across time zones using Git, Slack, Zoom, and agile project trackers.',
    },
    {
      q: 'How do you approach website performance optimization?',
      a: 'I focus on client-side caching, static site generation (SSG), modern media compression, database queries optimization, and script deferring to secure 90+ scorelines on Lighthouse audits.',
    },
    {
      q: 'Can you assist in migrating legacy systems?',
      a: 'Yes. I specialize in refactoring old frontend codebases and PHP/Inertia scripts into scalable, clean React/Next.js systems while maintaining existing database consistency.',
    },
    {
      q: 'How can we initiate a project alignment call?',
      a: 'Simply fill out the message form in the Contact section or email me directly at ahmads.contacts@gmail.com. I usually respond within 24 hours to schedule a short discovery call.',
    },
  ];

  return (
    <section id="faq" className="border-t border-borders bg-white relative overflow-hidden">
      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">
              07 / RESOURCES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter text-primary-text leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[14px] text-secondary-text max-w-sm leading-relaxed font-light">
              Quick answers about my coding processes, stack parameters, and collaboration models.
            </p>
          </motion.div>

          {/* Right Column: Expandable Accordions */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-borders rounded-2xl bg-primary-bg/25 overflow-hidden transition-all duration-300 hover:border-accent hover:bg-white shadow-soft"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left p-6 sm:p-8 flex justify-between items-center gap-4 text-primary-text focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-semibold leading-snug">
                      {faq.q}
                    </span>
                    <span className="shrink-0 w-8 h-8 border border-borders flex items-center justify-center rounded-xl bg-white text-secondary-text transition-transform duration-300">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-sm text-secondary-text leading-relaxed font-light border-t border-borders/40 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
