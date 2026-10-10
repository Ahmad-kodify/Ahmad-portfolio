import Link from 'next/link';
import { contactLink, mailUrl, navLinks, site, telUrl, whatsappUrl } from '@/lib/site';
import { Wordmark } from './Nav';
import { WolfMark } from './ui/WolfMark';

const pages = [{ label: 'Home', href: '/' }, ...navLinks, contactLink];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-line">
      <div className="container-x pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href="/" aria-label="Arkar — home" className="inline-flex items-center gap-3 text-3xl leading-none">
              <WolfMark className="h-10 w-10 text-ink" />
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-sm text-lg font-semibold leading-snug tracking-[-0.01em] text-ink">
              {site.positioning.lead} — <span className="text-terracotta">{site.positioning.tail}</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              A software studio building complete business systems for clients in the UK, US, Canada
              and Saudi Arabia.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">Pages</p>
            <ul className="mt-5 space-y-3">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="link-draw text-[15px] font-medium text-ink/80 hover:text-ink">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">Contact</p>
            <ul className="mt-5 space-y-3 text-[15px] font-medium">
              <li>
                <a href={mailUrl} className="link-draw text-ink/80 hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={telUrl} className="link-draw text-ink/80 hover:text-ink">
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-ink/80 hover:text-ink"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Free 20-minute discovery call. Reply within one working day.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© {site.year} Arkar. All rights reserved.</p>
          <p className="font-medium text-ink/70">{site.domain}</p>
        </div>
      </div>

      {/* Oversized wordmark — pure texture */}
      <div aria-hidden className="pointer-events-none select-none">
        <p className="-mb-[0.22em] text-center text-[26vw] font-extrabold leading-none tracking-[-0.06em] text-ink/[0.035] md:text-[20vw]">
          Arkar
        </p>
      </div>
    </footer>
  );
}
