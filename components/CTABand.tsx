import { mailUrl, site, telUrl, whatsappUrl } from '@/lib/site';
import { Accent, Band } from './ui/Band';
import { Button } from './ui/Button';
import { PillTag } from './ui/PillTag';
import { Reveal } from './ui/Reveal';

interface CTABandProps {
  eyebrow?: string;
  title?: React.ReactNode;
  sub?: string;
  cta?: { label: string; href: string };
  /** Show email / phone / WhatsApp under the button. */
  contacts?: boolean;
}

/** Closing call-to-action used at the bottom of every page. */
export function CTABand({
  eyebrow = 'Next step',
  title = (
    <>
      Let&apos;s build the <Band>system</Band> your business is <Accent>missing</Accent>.
    </>
  ),
  sub = "Tell us what you're working on. We'll show you what to build first.",
  cta = { label: 'Start a project', href: '/contact' },
  contacts = true,
}: CTABandProps) {
  return (
    <section aria-labelledby="cta-heading" className="container-x py-20 md:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-white px-6 py-16 text-center shadow-card ring-1 ring-ink/5 sm:px-12 md:px-16 md:py-24">
          {/* Peach glow + arcs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-peach opacity-60 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-peach-soft opacity-70 blur-3xl"
          />
          <svg
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-40 h-[28rem] w-[28rem] text-terracotta opacity-[0.08]"
            viewBox="0 0 400 400"
            fill="none"
          >
            <circle cx="200" cy="200" r="198" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="200" cy="200" r="102" stroke="currentColor" strokeWidth="1.2" />
          </svg>

          <div className="relative mx-auto max-w-3xl">
            <PillTag>{eyebrow}</PillTag>
            <h2
              id="cta-heading"
              className="mt-6 text-[2.15rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl"
            >
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-body sm:text-lg">{sub}</p>
            <div className="mt-10">
              <Button href={cta.href} size="lg" magnetic>
                {cta.label}
              </Button>
            </div>

            {contacts && (
              <ul className="mt-10 flex flex-col items-center justify-center gap-3 text-sm font-medium text-ink/75 sm:flex-row sm:gap-8">
                <li>
                  <a href={mailUrl} className="link-draw hover:text-ink">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={telUrl} className="link-draw hover:text-ink">
                    {site.phone.display}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw hover:text-ink"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
