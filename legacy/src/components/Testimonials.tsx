import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { fetchApprovedTestimonials } from '../lib/api';
import type { Testimonial } from '../lib/api';
import CtaButton from './CtaButton';
import FeedbackModal from './FeedbackModal';

/** "John Smith" -> "JS", "Ali" -> "A", "Sarah Jane Khan" -> "SK". */
function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchApprovedTestimonials()
      .then((data) => {
        if (!cancelled) setTestimonials(data.testimonials);
      })
      // A dead API must never break the page — the section simply shows its CTA.
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="testimonials" className="border-t border-borders bg-primary-bg/40 relative overflow-hidden">
      <div className="luxury-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">
            02 / TESTIMONIALS
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter text-primary-text leading-tight">
            Client Testimonials
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light leading-relaxed text-secondary-text">
            Kind words from people I've worked with.
          </p>
        </motion.div>

        {/* Cards */}
        {isLoading ? (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                aria-hidden="true"
                className="h-56 animate-pulse rounded-2xl border border-borders bg-white/60"
              />
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.figure
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index, 5) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col rounded-2xl border border-borders bg-surface p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:border-borders/100 hover:shadow-[0_14px_34px_-18px_rgba(15,15,15,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Quote size={20} className="text-accent" aria-hidden="true" />

                <blockquote className="mt-4 flex-1 text-[14.5px] font-light leading-relaxed text-secondary-text whitespace-pre-line">
                  {item.feedback}
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-borders/70 pt-5">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-text text-[12px] font-semibold text-white font-editorial"
                  >
                    {initialsOf(item.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-editorial text-[14px] font-semibold text-primary-text">
                      {item.name}
                    </span>
                    <span className="block text-[11px] uppercase tracking-wider text-muted-text">
                      Client
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        ) : null}

        {/* Leave feedback CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`${testimonials.length > 0 ? 'mt-14' : 'mt-12'} flex flex-col items-start gap-5 rounded-2xl border border-borders bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8`}
        >
          <div>
            <h3 className="font-editorial text-lg font-semibold text-primary-text sm:text-xl">
              Have we worked together?
            </h3>
            <p className="mt-1.5 text-sm font-light text-secondary-text">
              I'd love to hear about your experience.
            </p>
          </div>
          <CtaButton onClick={() => setIsModalOpen(true)} className="shrink-0">
            Leave Feedback
          </CtaButton>
        </motion.div>
      </div>

      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
