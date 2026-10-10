import type { Metadata } from 'next';
import { services } from '@/lib/services';
import { processSteps } from '@/lib/process';
import { PageHero } from '@/components/PageHero';
import { ServiceBlock } from '@/components/services/ServiceBlock';
import { ProcessStepper } from '@/components/ProcessStepper';
import { CTABand } from '@/components/CTABand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accent, Band } from '@/components/ui/Band';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Websites that convert, booking and lead capture, customer records, automatic follow-ups, custom software and integrations. Everything a business needs, under one roof.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services — Arkar',
    description: 'Everything a business needs, under one roof. Six connected parts, one login.',
    url: '/services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything a business needs, <Band>under one roof</Band>.
          </>
        }
        sub="Start with what's losing you customers today. Add the rest as you grow. Every part talks to the others."
      />

      <div className="divide-y divide-line">
        {services.map((s, i) => (
          <ServiceBlock key={s.id} service={s} index={i} />
        ))}
      </div>

      <section aria-labelledby="how-recap-heading" className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              id="how-recap-heading"
              eyebrow="How we work"
              title={
                <>
                  <Accent>Three steps.</Accent> <Band>A working system.</Band>
                </>
              }
              sub="Whatever you start with, the process is the same."
              bar
            />
          </div>
          <div className="lg:col-span-8 lg:pt-4">
            <ProcessStepper steps={processSteps} />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
