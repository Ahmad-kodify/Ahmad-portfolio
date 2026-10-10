import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { STAGGER } from '@/lib/motion';
import { photos } from '@/lib/photos';
import { Photo } from '@/components/ui/Photo';
import { PageHero } from '@/components/PageHero';
import { SystemMap } from '@/components/about/SystemMap';
import { CTABand } from '@/components/CTABand';
import { Accent, Band } from '@/components/ui/Band';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Chip } from '@/components/ui/Chip';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Arkar is a software studio built around one idea: software should run your business, not sit beside it. Systems over tools, honest advice, built for the long term.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — Arkar',
    description: 'A studio built around one idea. Software should run your business, not sit beside it.',
    url: '/about',
  },
};

const paragraphs = [
  "Most businesses don't have a software problem. They have a system problem. The website, the bookings, the customer list and the follow-ups all live in different places, and the gaps between them are where customers disappear. Arkar exists to close those gaps.",
  "We're honest about what you need. Sometimes it's a full custom build. Often it's a good website, a simple CRM and follow-ups that actually go out. We'll tell you which, and we'll tell you what to build first.",
  'We build for the long term. Clean code, clear documentation, and systems you can grow without starting over. Our clients are in the US, UK, Canada and Saudi Arabia, and most are still with us after launch.',
];

const values = [
  { title: 'Honesty', text: "We tell you when you don't need custom software." },
  { title: 'Systems thinking', text: 'We build the whole journey, not a piece of it.' },
  { title: 'Craft', text: 'Fast, clean, tested. The details are the product.' },
  { title: 'Long-term', text: 'We stay after launch. Your system grows with you.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The studio"
        title={
          <>
            A studio built around <Band>one idea</Band>.
          </>
        }
        sub={
          <span className="text-xl font-semibold leading-snug text-terracotta sm:text-2xl">
            Software should run your business, not sit beside it.
          </span>
        }
      />

      {/* One atmospheric workspace photo (Unsplash — see lib/photos.ts `workspace`).
          Deliberately no caption or names: it sets the mood, it is not a claim about our office. */}
      <section aria-label="Workspace" className="container-x pb-16 md:pb-24">
        <Reveal>
          <div className="group">
            <Photo photo={photos.workspace} className="aspect-[16/10] sm:aspect-[21/9]" sizes="(min-width: 1280px) 1200px, 100vw" />
          </div>
        </Reveal>
      </section>

      <section aria-label="Philosophy" className="container-x pb-20 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-6">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * STAGGER}>
                <p className="text-[17px] leading-relaxed text-body sm:text-lg">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-2 pt-2">
                {site.countries.map((c) => (
                  <Chip key={c} size="sm" className="bg-white">
                    {c}
                  </Chip>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <SystemMap />
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="container-x py-20 md:py-28">
        <SectionHeading
          id="values-heading"
          eyebrow="What we stand for"
          title={
            <>
              Four things we <Band>won&apos;t</Band> <Accent>compromise</Accent> on.
            </>
          }
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * STAGGER} className="h-full">
              <div className="flex h-full flex-col rounded-[1.5rem] bg-white p-7 shadow-card ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-lift">
                <span className="text-sm font-bold tabular-nums text-terracotta">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-bold tracking-[-0.02em] text-ink">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <CTABand
        title={
          <>
            Sound like the kind of <Band>studio</Band> you&apos;d <Accent>work with</Accent>?
          </>
        }
        sub="Tell us what you're working on. We'll show you what to build first."
      />
    </>
  );
}
