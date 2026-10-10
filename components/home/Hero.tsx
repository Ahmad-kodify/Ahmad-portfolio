import { Accent, Band } from '../ui/Band';
import { Button } from '../ui/Button';
import { PillTag } from '../ui/PillTag';
import { Reveal } from '../ui/Reveal';
import { SystemFlow } from './SystemFlow';

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <PillTag>Software studio</PillTag>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              id="hero-heading"
              className="mt-6 text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.4rem] xl:text-[5.2rem]"
            >
              From first lead to <Accent>repeat customer</Accent>. <Band>One system.</Band>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead-bar mt-8 max-w-xl text-[17px] leading-relaxed text-body sm:text-lg">
              We build the software that runs your business — website, bookings, customer records, and
              automatic follow-ups, all in one place.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/contact" size="lg" magnetic>
                Start a project
              </Button>
              <Button href="#services" variant="outline" size="lg">
                See what we build
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mt-10 text-sm text-muted">
              Building for businesses in the <span className="font-semibold text-ink">UK</span>,{' '}
              <span className="font-semibold text-ink">US</span>,{' '}
              <span className="font-semibold text-ink">Canada</span> and{' '}
              <span className="font-semibold text-ink">Saudi Arabia</span>.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <SystemFlow />
        </div>
      </div>
    </section>
  );
}
