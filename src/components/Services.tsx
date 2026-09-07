import { useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRight, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import type { Service } from '../data/services';

/**
 * "What I do" grid between the hero and Projects. Card design copies the
 * provided sample: a paint-cloud masked photo over a contrasting cloud
 * backdrop, bold title, muted description, filled-circle check line, and a
 * round corner CTA — cycling dark / gold / light variants in the site's
 * palette. Content lives in `src/data/services.ts`.
 */

/** Puffy multi-lobe "paint cloud" used to mask the photos, like the sample. */
const CLOUD_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><path fill="black" d="M44 110C18 110 4 92 8 74 2 60 14 44 30 44 30 22 52 8 72 14 82 2 104 0 118 10 132 0 156 4 164 20 184 20 198 38 192 56 200 72 190 92 172 96 168 112 148 118 134 110 120 122 96 122 84 112 70 122 52 120 44 110Z"/></svg>';

const cloudMask: CSSProperties = {
  WebkitMaskImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(CLOUD_SVG)}")`,
  maskImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(CLOUD_SVG)}")`,
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
};

/* One uniform card treatment — white surface, ink title, muted copy.
   Accent appears only on the arrow CTA and the hover border. */
const CARD_STYLES = {
  card: 'bg-surface text-primary-text border border-borders shadow-soft hover:border-accent/60',
  title: 'text-primary-text',
  description: 'text-secondary-text',
  backdrop: 'bg-primary-text/10',
  arrow: 'bg-accent text-white group-hover:bg-primary-text',
};

export default function Services() {
  return (
    <section id="services" className="border-t border-borders bg-primary-bg relative pt-20 lg:pt-28 pb-10 scroll-mt-24">
      <div className="luxury-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 space-y-4"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">
            WHAT I DO
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter text-primary-text font-editorial">
            Services
          </h2>
          <p className="text-[15px] sm:text-[16px] text-secondary-text max-w-xl font-light">
            From first idea to live product — and everything needed to keep it running.
          </p>
        </motion.div>

        {/* Rows of 4 / 3 / 2 equally-sized cards, each row centred.
            Cards keep the same width in every row (1/4 of the row on desktop). */}
        <div className="flex flex-col gap-5">
          {[services.slice(0, 4), services.slice(4, 7), services.slice(7, 9)].map((row, rowIndex) => {
            const offset = [0, 4, 7][rowIndex];
            return (
              <div key={rowIndex} className="flex flex-wrap justify-center gap-5">
                {row.map((service, i) => (
                  <ServiceCard key={service.id} service={service} index={offset + i} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const styles = CARD_STYLES;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col rounded-[26px] p-6 pb-8 transition-all duration-300 w-full md:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] ${styles.card}`}
    >
      <ServiceImage service={service} backdrop={styles.backdrop} flip={index % 2 === 1} />

      <h3 className={`mt-5 font-editorial text-[21px] font-semibold tracking-tight leading-snug ${styles.title}`}>
        {service.title}
      </h3>
      <p className={`mt-2 pr-2 text-[14px] font-light leading-relaxed ${styles.description}`}>
        {service.description}
      </p>

      {/* Carved corner scoop, exactly like the sample: one SVG path in the page
          background colour — concave S-curve in from the card's right edge, a
          soft rounded inner corner, and a concave S-curve out along the bottom
          edge — with the round CTA nested inside the scoop. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 110 90"
        className="absolute bottom-0 right-0 h-[64px] w-[78px] text-primary-bg"
        fill="currentColor"
      >
        <path d="M110 0 C110 16 100 24 84 24 L52 24 C36 24 26 34 26 50 L26 64 C26 80 16 90 0 90 L110 90 Z" />
      </svg>
      <a
        href="#contact"
        aria-label={`Discuss ${service.title} — go to contact section`}
        className={`absolute bottom-[7px] right-[7px] z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${styles.arrow}`}
      >
        <ArrowUpRight
          size={15}
          strokeWidth={2.4}
          className="transition-transform duration-300 group-hover:rotate-45"
        />
      </a>
    </motion.article>
  );
}

/**
 * The sample's layered artwork: a contrasting painted cloud sits slightly
 * offset behind the photo, and the photo itself is masked into the same
 * cloud shape. Alternate cards flip the cloud for variety.
 */
function ServiceImage({
  service,
  backdrop,
  flip,
}: {
  service: Service;
  backdrop: string;
  flip: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-40 w-full select-none">
      {/* Scaled up visually without growing the card's layout box. Inline
          transform because Tailwind has no negative arbitrary scale-x, and the
          class approach left images mirrored. */}
      <div
        className="absolute inset-0"
        style={{ transform: flip ? 'scale(-1.15, 1.15)' : 'scale(1.15)' }}
      >
        {/* Backdrop cloud, nudged up-left like the sample's paint splash */}
        <div
          aria-hidden="true"
          className={`absolute -top-2 left-0 right-4 bottom-2 ${backdrop}`}
          style={cloudMask}
        />
        {/* Photo cloud */}
        <div className="absolute top-1 left-4 right-0 bottom-0" style={cloudMask}>
          {hasError ? (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center bg-primary-text/10 text-current/40"
            >
              <ImageIcon size={28} strokeWidth={1.5} className={flip ? '-scale-x-100' : ''} />
            </div>
          ) : (
            <img
              src={service.image}
              alt={service.alt}
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
              onError={() => setHasError(true)}
              className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                flip ? '-scale-x-100' : ''
              }`}
            />
          )}
        </div>
      </div>

      {/* Real-project screenshots are labelled as my own shipped work. */}
      {service.myWork && !hasError && (
        <span className="absolute left-1 top-0 z-10 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-text shadow-md ring-1 ring-black/5">
          My live work
        </span>
      )}
    </div>
  );
}
