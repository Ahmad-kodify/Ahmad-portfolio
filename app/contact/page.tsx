import type { Metadata } from 'next';
import { mailUrl, site, telUrl, whatsappUrl } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';
import { Band } from '@/components/ui/Band';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Tell us what to build. Send a few lines about your business and we'll reply within one working day with what to build first. Email, phone or WhatsApp.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — Arkar',
    description: 'Tell us what to build. We reply within one working day.',
    url: '/contact',
  },
};

const next = [
  'We reply within one working day.',
  'A free 20-minute call to map how your business runs.',
  'A one-page plan and a fixed price for phase one.',
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title={
          <>
            Tell us <Band>what to build</Band>.
          </>
        }
        sub="Send a few lines about your business. We'll reply within one working day with what to build first."
      />

      <section aria-label="Contact" className="container-x pb-24 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <aside className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-[2rem] bg-ink p-8 text-cream shadow-lift md:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">Direct</p>
                <ul className="mt-5 space-y-4 text-lg font-semibold">
                  <li>
                    <a href={mailUrl} className="link-draw">
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <a href={telUrl} className="link-draw">
                      {site.phone.display}
                    </a>
                  </li>
                </ul>
                <div className="mt-7">
                  <Button href={whatsappUrl} variant="light" arrow={false}>
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 1.8a8.2 8.2 0 11-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0112 3.8zm-3.1 4.3c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.3.2-.6.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6z" />
                    </svg>
                    WhatsApp us
                  </Button>
                </div>
                <p className="mt-8 text-sm leading-relaxed text-cream/60">
                  Pre-filled message: &ldquo;{site.whatsapp.message}&rdquo;
                </p>
                <p className="mt-8 border-t border-white/10 pt-6 text-base font-semibold tracking-[-0.01em]">
                  {site.positioning.lead} — <span className="text-terracotta">{site.positioning.tail}</span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-ink/5 md:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">What happens next</p>
                <ol className="mt-5 space-y-4">
                  {next.map((n, i) => (
                    <li key={n} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-peach-soft text-xs font-extrabold text-terracotta">
                        {i + 1}
                      </span>
                      <p className="text-[15px] font-medium leading-relaxed text-ink">{n}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
