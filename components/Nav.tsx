'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { contactLink, mailUrl, navLinks, site, telUrl, whatsappUrl } from '@/lib/site';
import { lenisRef } from '@/lib/lenis';
import { cn } from '@/lib/cn';
import { WolfMark } from './ui/WolfMark';

/** "Arkar." wordmark — ink on cream by default, white inside the dark nav pills. */
export function Wordmark({ className, tone = 'ink' }: { className?: string; tone?: 'ink' | 'light' }) {
  return (
    <span className={cn('font-extrabold tracking-[-0.04em]', tone === 'ink' ? 'text-ink' : 'text-white', className)}>
      Arkar<span className="text-terracotta">.</span>
    </span>
  );
}

/** Brand mark — the Arkar wolf, terracotta on the dark pill. */
function Mark() {
  return <WolfMark className="h-9 w-9 text-terracotta" />;
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

/**
 * One navbar, three dark pills: logo (left), links (center), Contact (right).
 * All three are docked to the top edge on load and detach together on scroll,
 * becoming fully-rounded, blurred floating pills. A soft highlight slides
 * between links on hover. Mobile: logo pill + round toggle, right-hand drawer.
 */
export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 20));

  // Close the drawer on navigation (state adjusted during render, per React docs).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Freeze the page behind the drawer.
  useEffect(() => {
    if (open) {
      lenisRef.current?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));
  const highlighted = hovered ?? navLinks.find((l) => isActive(l.href))?.href ?? null;

  // Shared shell for all three pills — same colour, same docked → floating transition.
  const pill = cn(
    'flex items-center p-2 text-white transition-all duration-500',
    scrolled
      ? 'mt-2 rounded-full bg-ink/95 shadow-[0_16px_40px_-12px_rgb(15_15_15_/_0.45)] ring-1 ring-white/10 backdrop-blur-md'
      : 'mt-0 rounded-b-[22px] rounded-t-none bg-ink shadow-[0_18px_36px_-16px_rgb(15_15_15_/_0.45)]',
  );

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-start px-5 sm:px-8 lg:px-16"
      >
        {/* Left — logo pill */}
        <div className="justify-self-start">
          <Link href="/" aria-label="Arkar — home" className={cn(pill, 'gap-2.5 pr-4 transition-opacity hover:opacity-90')}>
            <Mark />
            <Wordmark tone="light" className="text-[17px] leading-none" />
          </Link>
        </div>

        {/* Center — links pill (desktop) */}
        <nav aria-label="Primary" className={cn(pill, 'hidden gap-1 md:flex')} onMouseLeave={() => setHovered(null)}>
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                onMouseEnter={() => setHovered(l.href)}
                className={cn(
                  'relative px-3.5 py-2 text-[13.5px] font-medium tracking-wide transition-colors duration-300',
                  active || hovered === l.href ? 'text-white' : 'text-white/65 hover:text-white',
                )}
              >
                {highlighted === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{l.label}</span>
                {active && <span aria-hidden className="absolute -bottom-px left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-terracotta" />}
              </Link>
            );
          })}
        </nav>
        {/* Keeps the grid's middle column in place on mobile where the links are hidden */}
        <div className="md:hidden" aria-hidden />

        {/* Right — Contact pill (desktop) / toggle pill (mobile) */}
        <div className="justify-self-end">
          <div className={cn(pill, 'hidden md:flex')}>
            <Link
              href={contactLink.href}
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white py-1.5 pl-4 pr-1.5 text-[13px] font-semibold text-ink transition-colors duration-300 hover:bg-cream"
            >
              {contactLink.label}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-terracotta text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          <div className={cn(pill, 'md:hidden')}>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden"
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              key="drawer"
              data-lenis-prevent
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col overflow-y-auto border-l border-line bg-cream p-8 shadow-xl md:hidden"
            >
              <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
              <div className="relative mb-8 flex items-center justify-between">
                <span className="flex items-center gap-2.5">
                  <WolfMark className="h-8 w-8 text-terracotta" />
                  <Wordmark className="text-2xl leading-none" />
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink"
                >
                  <span className="sr-only">Close menu</span>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Mobile" className="relative flex flex-col gap-1">
                {[{ label: 'Home', href: '/' }, ...navLinks].map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={l.href}
                      aria-current={isActive(l.href) ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between border-b border-line py-3.5 text-lg font-semibold',
                        isActive(l.href) ? 'text-terracotta' : 'text-ink',
                      )}
                    >
                      {l.label}
                      <ArrowUpRight className="h-4 w-4 text-terracotta" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="relative mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <Link
                  href={contactLink.href}
                  className="group flex items-center justify-between rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-[14px] font-semibold text-white"
                >
                  {contactLink.label}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>

              <div className="relative mt-auto space-y-2 pt-10 text-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">{site.tagline}</p>
                <a href={mailUrl} className="block font-medium text-ink">
                  {site.email}
                </a>
                <a href={telUrl} className="block font-medium text-ink">
                  {site.phone.display}
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block font-medium text-ink">
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
