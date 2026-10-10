import type { Metadata } from 'next';
import { processSteps } from '@/lib/process';
import { faq } from '@/lib/faq';
import { PageHero } from '@/components/PageHero';
import { ProcessTimeline } from '@/components/process/ProcessTimeline';
import { Faq } from '@/components/Faq';
import { CTABand } from '@/components/CTABand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accent, Band } from '@/components/ui/Band';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Discover, build, grow. A free 20-minute call, a fixed price, a working first version in about two weeks, then ongoing improvement. Plus answers to the questions we get asked most.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How It Works — Arkar',
    description: 'From idea to a system that runs itself. Three steps, a fixed price, no surprises.',
    url: '/how-it-works',
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            From idea to a <Band>system that runs itself</Band>.
          </>
        }
        sub="No long proposals. No surprises. A clear plan, a fixed price and a working version in weeks."
      />

      <section aria-label="Process" className="container-x pb-20 md:pb-28">
        <ProcessTimeline steps={processSteps} />
      </section>

      <section aria-labelledby="faq-heading" className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              id="faq-heading"
              eyebrow="FAQ"
              title={
                <>
                  <Accent>Straight answers</Accent> to the questions we get <Band>most</Band>.
                </>
              }
              sub="Anything else, ask on the call. It's free."
              bar
            />
          </div>
          <Reveal delay={0.12} className="lg:col-span-8">
            <Faq items={faq} />
          </Reveal>
        </div>
      </section>

      <CTABand
        title={
          <>
            Ready for <Band>step one</Band>? It&apos;s a <Accent>free call</Accent>.
          </>
        }
        sub="Twenty minutes. We map how your business runs and tell you what to build first."
        cta={{ label: 'Book a call', href: '/contact' }}
      />
    </>
  );
}
