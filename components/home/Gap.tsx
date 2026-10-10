import { STAGGER } from '@/lib/motion';
import { photos } from '@/lib/photos';
import { Band } from '../ui/Band';
import { Photo } from '../ui/Photo';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const gaps = [
  {
    text: 'A lead comes in and gets forgotten.',
    glyph: (
      <>
        <path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
        <circle cx="19" cy="6" r="3" fill="currentColor" />
      </>
    ),
  },
  {
    text: 'A customer buys once, never hears from you again.',
    glyph: (
      <>
        <path d="M6 4h12v16l-3-2-3 2-3-2-3 2V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
        <path d="M9 9h6M9 12.5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    text: "Your data lives in three tools that don't talk.",
    glyph: (
      <>
        <rect x="3" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <rect x="14" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <rect x="8.5" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path d="M10.5 7.5h3M6.5 11.5l3 3M17.5 11.5l-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="1.5 2" />
      </>
    ),
  },
];

export function Gap() {
  return (
    <section aria-labelledby="gap-heading" className="container-x py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeading
            id="gap-heading"
            eyebrow="The gap"
            title={
              <>
                Most businesses don&apos;t <Band>lose customers</Band> because the work is bad.
              </>
            }
            sub={
              <span className="text-xl font-semibold leading-snug text-terracotta sm:text-2xl">
                They lose them because there&apos;s no system.
              </span>
            }
          />
        </div>

        {/* Real photo of a busy small business (Unsplash — see lib/photos.ts `gap`). Represents the kind of business we mean, not a client. */}
        <Reveal delay={0.16} className="lg:col-span-5">
          <div className="group relative">
            <Photo photo={photos.gap} className="aspect-[16/10] lg:aspect-[4/3]" sizes="(min-width: 1024px) 34vw, 100vw">
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/90 px-3 py-1.5 text-[11px] font-semibold text-cream backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                Busy counter. Missed enquiry.
              </span>
            </Photo>
          </div>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {gaps.map((g, i) => (
          <Reveal as="li" key={g.text} delay={i * STAGGER} className="h-full">
            <div className="group flex h-full flex-col rounded-[1.5rem] bg-white p-7 shadow-card ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-lift md:p-8">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-peach-soft text-terracotta transition-transform duration-500 ease-expo group-hover:-rotate-6 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                    {g.glyph}
                  </svg>
                </span>
                <span className="text-sm font-bold tabular-nums text-muted">0{i + 1}</span>
              </div>
              <p className="mt-8 text-xl font-semibold leading-snug tracking-[-0.01em] text-ink">{g.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
