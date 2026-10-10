import type { Service } from '@/lib/services';
import { cn } from '@/lib/cn';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { ServiceIcon } from '../ui/ServiceIcon';
import { ServiceMock } from './ServiceMock';

/** Full service block on /services: text one side, code-drawn module the other. */
export function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, '0');

  return (
    <article
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className="container-x grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-12"
    >
      <div className={cn('lg:col-span-5', flip && 'lg:order-2')}>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-peach-soft to-white shadow-inset ring-1 ring-ink/5">
              <ServiceIcon id={service.id} className="h-8 w-8" />
            </span>
            <span className="text-sm font-bold tabular-nums text-muted">{number}</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id={`${service.id}-title`} className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[2.6rem]">
            {service.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="lead-bar mt-6 text-[17px] leading-relaxed text-body">{service.description}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <ul className="mt-7 space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] font-medium text-ink">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-terracotta text-white">
                  <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 10.5l3 3 7-7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.32}>
          <div className="mt-9">
            <Button href="/contact" variant="outline">
              Start with this
            </Button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.12} className={cn('lg:col-span-7', flip && 'lg:order-1')}>
        <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-cream shadow-card ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-lift sm:aspect-[16/11]">
          <div aria-hidden className="dot-grid absolute inset-0" />
          <div className="absolute inset-0">
            <ServiceMock id={service.id} />
          </div>
        </div>
      </Reveal>
    </article>
  );
}
