import Link from 'next/link';
import { processSteps } from '@/lib/process';
import { ProcessStepper } from '../ProcessStepper';
import { Accent, Band } from '../ui/Band';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="container-x py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionHeading
            id="how-heading"
            eyebrow="How it works"
            title={
              <>
                <Accent>Three steps.</Accent> <Band>A working system.</Band>
              </>
            }
            sub="No long proposals. A free call, a fixed price, and a first version in weeks."
            bar
          />
          <Reveal delay={0.24} className="mt-8">
            <Link href="/how-it-works" className="link-draw text-sm font-semibold text-ink">
              See the full process
            </Link>
          </Reveal>
        </div>
        <div className="lg:col-span-8 lg:pt-4">
          <ProcessStepper steps={processSteps} />
        </div>
      </div>
    </section>
  );
}
