import { STAGGER } from '@/lib/motion';
import { photos, type Photo as PhotoData } from '@/lib/photos';
import { Accent, Band } from '../ui/Band';
import { Photo } from '../ui/Photo';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

/**
 * Industries Arkar serves. Photos are real stock (Unsplash — see lib/photos.ts)
 * and stand for the type of business, never for a specific client.
 */
const audiences: Array<{ label: string; photo: PhotoData }> = [
  { label: 'Service businesses', photo: photos.cafe },
  { label: 'Clinics & Dental', photo: photos.clinic },
  { label: 'Salons & Spas', photo: photos.salon },
  { label: 'Real Estate', photo: photos.realestate },
  { label: 'Trades (HVAC / Plumbing / Electrical)', photo: photos.trades },
  { label: 'Startups needing custom software', photo: photos.startup },
];

export function WhoItsFor() {
  return (
    <section aria-labelledby="who-heading" className="container-x py-20 md:py-28">
      <SectionHeading
        id="who-heading"
        align="center"
        eyebrow="Who it's for"
        title={
          <>
            Built for businesses whose <Band>customers come back</Band>.
          </>
        }
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((a, i) => (
          <Reveal as="li" key={a.label} delay={i * STAGGER} className="h-full">
            <div className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-card ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-lift">
              <Photo photo={a.photo} className="aspect-[4/3]" rounded="rounded-none" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw" />
              <p className="px-5 py-4 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink">{a.label}</p>
            </div>
          </Reveal>
        ))}

        <Reveal as="li" delay={6 * STAGGER} className="h-full sm:col-span-2">
          <div className="flex h-full flex-col justify-center rounded-[1.5rem] bg-ink p-7 text-cream shadow-card md:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">And</p>
            <p className="mt-3 text-2xl font-extrabold leading-tight tracking-[-0.02em]">Any business whose customers come back.</p>
            <p className="mt-3 text-[15px] leading-relaxed text-cream/60">
              If a customer could book you twice, a system pays for itself.
            </p>
          </div>
        </Reveal>
      </ul>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed text-body sm:text-xl">
          If your customers come back, you don&apos;t need another website.{' '}
          <Accent className="font-semibold">You need a system that remembers them.</Accent>
        </p>
      </Reveal>
    </section>
  );
}
