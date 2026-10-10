import { services } from '@/lib/services';
import { ServiceCard } from '../ServiceCard';
import { Accent, Band } from '../ui/Band';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function ServicesGrid() {
  return (
    <section id="services" aria-labelledby="services-heading" className="container-x py-20 md:py-28">
      <SectionHeading
        id="services-heading"
        eyebrow="What we build"
        title={
          <>
            Not just a website. <Band>The whole system.</Band>
          </>
        }
        sub="Six parts. One login. Start with what you need and add the rest as you grow."
        bar
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </div>

      <Reveal className="mt-14 text-center">
        <p className="text-xl font-semibold tracking-[-0.01em] text-ink sm:text-2xl">
          Everything connected. One login. <Accent>One dashboard.</Accent>
        </p>
      </Reveal>
    </section>
  );
}
