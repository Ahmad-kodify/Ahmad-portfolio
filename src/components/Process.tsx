import { motion } from 'framer-motion';

/**
 * Client process, laid out like the reference: three gradient-bordered cards
 * in a staircase arrangement, each with a floating circular icon badge, and
 * curved connectors flowing card to card on desktop.
 */

interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  photo: string;
  photoAlt: string;
  /** Staircase offset + badge placement per card. */
  cardOffset: string;
  badgePosition: string;
}

const steps: ProcessStep[] = [
  {
    num: '01',
    title: 'I understand your business',
    desc: 'We start with a simple conversation. I learn how your business works, what you sell, who your customers are, and what others in your market are doing.',
    photo: '/process/understand.jpg',
    photoAlt: 'Talking through business goals in a meeting',
    cardOffset: 'lg:mt-10',
    badgePosition: '-top-12 left-8',
  },
  {
    num: '02',
    title: 'You receive a clear plan',
    desc: 'You get an easy plan in plain words: what we should build, how it will help your business, how long it will take, and what it will cost.',
    photo: '/process/plan.jpg',
    photoAlt: 'A clear project plan being sketched out',
    cardOffset: 'lg:mt-24',
    badgePosition: '-bottom-12 left-1/2 -translate-x-1/2',
  },
  {
    num: '03',
    title: 'I build it and stay with you',
    desc: 'I build your website or software and keep you updated at every step. After launch, updates, fixes and support continue, so everything runs smoothly.',
    photo: '/process/build.jpg',
    photoAlt: 'Code being written to build the product',
    cardOffset: 'lg:mt-0',
    badgePosition: '-top-12 left-1/2 -translate-x-1/2',
  },
];

export default function Process() {
  return (
    <section id="process" className="border-t border-borders bg-white relative overflow-hidden py-20 lg:py-28 scroll-mt-24">
      <div className="luxury-container">
        {/* Centred header + plain-words intro, like the reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-16 max-w-3xl space-y-4 text-center"
        >
          <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-accent">
            04 / PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter text-primary-text leading-tight font-editorial">
            How I Work With Clients
          </h2>
          <p className="text-[15px] sm:text-[16px] text-secondary-text font-light leading-relaxed">
            We talk about your goals, I study your business and your competitors, and I explain
            everything in simple words with a clear plan and honest pricing. In short, here is
            what we do:
          </p>
        </motion.div>

        {/* Staircase cards with connector curves (desktop) */}
        <div className="relative lg:pt-14 lg:pb-16">
          {/* Connector: card 1 (mid) down to card 2 (low) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 90 50"
            fill="none"
            className="pointer-events-none absolute left-[29.5%] top-[54%] hidden w-[7%] lg:block text-accent"
          >
            <path d="M6 10 C36 10 54 40 84 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="6" cy="10" r="4" fill="currentColor" />
            <circle cx="84" cy="40" r="4" fill="currentColor" />
          </svg>
          {/* Connector: card 2 (low) up to card 3 (high) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 90 50"
            fill="none"
            className="pointer-events-none absolute left-[63%] top-[46%] hidden w-[7%] lg:block text-accent"
          >
            <path d="M6 40 C36 40 54 10 84 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="6" cy="40" r="4" fill="currentColor" />
            <circle cx="84" cy="10" r="4" fill="currentColor" />
          </svg>

          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <ProcessCard key={step.num} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`relative mt-12 ${step.cardOffset}`}
    >
      {/* Floating circular icon badge */}
      <div className={`absolute z-10 ${step.badgePosition}`}>
        <div className="rounded-full bg-gradient-to-br from-accent to-accent/50 p-[3px] shadow-[0_10px_30px_-10px_rgba(232,96,44,0.4)]">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-white p-1">
            <img
              src={step.photo}
              alt={step.photoAlt}
              width={160}
              height={160}
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Gradient-bordered card with a soft glow */}
      <div className="rounded-[28px] bg-gradient-to-br from-accent via-accent/70 to-accent/40 p-[3px] shadow-[0_18px_50px_-18px_rgba(232,96,44,0.35)] transition-transform duration-300 hover:-translate-y-1">
        <div className="rounded-[25px] bg-white p-7 pt-9">
          <span className="text-[15px] font-bold tracking-wide text-accent">{step.num}</span>
          <h3 className="mt-2 text-[22px] font-bold leading-snug tracking-tight text-primary-text">
            {step.title}
          </h3>
          <p className="mt-3 text-[14px] font-light leading-relaxed text-secondary-text">
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
