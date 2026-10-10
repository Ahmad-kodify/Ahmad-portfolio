import { STAGGER } from '@/lib/motion';
import { PillTag } from '../ui/PillTag';
import { Reveal } from '../ui/Reveal';
import { Stat } from '../ui/Stat';

const stats = [
  { value: 4, label: 'Countries', detail: 'UK, US, Canada and Saudi Arabia' },
  { value: 7, label: 'Live systems in production', detail: 'Websites, platforms and internal tools' },
  { value: 14, label: 'Days to a first version', detail: 'For a website with lead capture' },
  { value: 1, label: 'Dashboard for the whole business', detail: 'One login. Everything connected.' },
];

/** The single dark section on the Home page. */
export function StatsBand() {
  return (
    <section aria-labelledby="proof-heading" className="relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(240,237,232,0.9) 1.1px, transparent 1.7px)',
          backgroundSize: '26px 26px',
          opacity: 0.07,
        }}
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-72 h-[44rem] w-[44rem] text-terracotta opacity-20"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="400" cy="400" r="398" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="400" cy="400" r="320" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="400" cy="400" r="242" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      <div className="container-x relative py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <PillTag>Proof</PillTag>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="proof-heading"
                className="mt-5 text-[2.15rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl"
              >
                Real systems. <span className="text-terracotta">Real businesses.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-cream/60">
                Numbers from work we&apos;ve shipped, not a pitch deck.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * STAGGER}>
                <Stat value={s.value} label={s.label} detail={s.detail} delay={i * 0.12} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
