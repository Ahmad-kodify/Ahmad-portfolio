import Link from 'next/link';
import type { Service } from '@/lib/services';
import { STAGGER } from '@/lib/motion';
import { Reveal } from './ui/Reveal';
import { ServiceIcon } from './ui/ServiceIcon';

/** White rounded card with hover-lift and an animating icon tile. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal delay={index * STAGGER} className="h-full">
      <Link
        href={`/services#${service.id}`}
        className="group flex h-full flex-col rounded-[1.5rem] bg-white p-7 shadow-card ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-lift md:p-8"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-peach-soft to-white shadow-inset ring-1 ring-ink/5 transition-transform duration-500 ease-expo group-hover:-rotate-6 group-hover:scale-110">
          <ServiceIcon id={service.id} className="h-9 w-9" />
        </span>
        <h3 className="mt-7 text-xl font-bold tracking-[-0.02em] text-ink">{service.title}</h3>
        <p className="mt-2.5 leading-relaxed text-body">{service.short}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-terracotta">
          Learn more
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 10h11" />
            <path d="M11 5l5 5-5 5" />
          </svg>
        </span>
      </Link>
    </Reveal>
  );
}
