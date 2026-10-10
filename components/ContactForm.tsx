'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { mailUrl, site, whatsappUrl } from '@/lib/site';
import { cn } from '@/lib/cn';
import { Button } from './ui/Button';

export const NEED_OPTIONS = ['Website', 'Full business system', 'Custom software or SaaS', 'Not sure yet'] as const;

type Fields = {
  name: string;
  email: string;
  business: string;
  need: string;
  message: string;
  website: string; // honeypot — real users never fill this
};

type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const initial: Fields = { name: '', email: '', business: '', need: '', message: '', website: '' };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email.';
  if (!f.need) e.need = 'Pick the closest option.';
  if (f.message.trim().length < 10) e.message = 'A sentence or two is enough.';
  return e;
}

const fieldBase =
  'w-full rounded-2xl border bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-4';

function fieldClass(hasError: boolean) {
  return cn(
    fieldBase,
    hasError
      ? 'border-terracotta focus:border-terracotta focus:ring-terracotta/15'
      : 'border-ink/10 hover:border-ink/25 focus:border-terracotta focus:ring-terracotta/10',
  );
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="relative rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-ink/5 sm:p-8 md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="py-10 text-center"
            role="status"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-white">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.02em] text-ink">Got it. Thank you.</h3>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-body">
              We&apos;ll reply within one working day with what to build first. Prefer to talk now?
            </p>
            <div className="mt-6">
              <Button href={whatsappUrl} variant="dark">
                WhatsApp us
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" error={errors.name} htmlFor="name">
                <input id="name" name="name" autoComplete="name" value={fields.name} onChange={set('name')} className={fieldClass(!!errors.name)} placeholder="Your name" />
              </Field>
              <Field label="Email" error={errors.email} htmlFor="email">
                <input id="email" name="email" type="email" autoComplete="email" value={fields.email} onChange={set('email')} className={fieldClass(!!errors.email)} placeholder="you@company.com" />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Business name" hint="Optional" htmlFor="business">
                <input id="business" name="business" autoComplete="organization" value={fields.business} onChange={set('business')} className={fieldClass(false)} placeholder="Company or trading name" />
              </Field>
              <Field label="What do you need?" error={errors.need} htmlFor="need">
                <div className="relative">
                  <select
                    id="need"
                    name="need"
                    value={fields.need}
                    onChange={set('need')}
                    className={cn(fieldClass(!!errors.need), 'appearance-none pr-11', !fields.need && 'text-muted/80')}
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    {NEED_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 8l5 5 5-5" />
                  </svg>
                </div>
              </Field>
            </div>

            <Field label="Message" error={errors.message} htmlFor="message">
              <textarea
                id="message"
                name="message"
                rows={5}
                value={fields.message}
                onChange={set('message')}
                className={cn(fieldClass(!!errors.message), 'resize-y')}
                placeholder="What does your business do, and where are customers slipping away?"
              />
            </Field>

            {/* Honeypot — hidden from people, visible to bots */}
            <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden>
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={set('website')} />
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" size="lg" magnetic disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send'}
              </Button>
              <p className="text-sm text-muted">
                Or email{' '}
                <a href={mailUrl} className="link-draw font-medium text-ink">
                  {site.email}
                </a>
              </p>
            </div>

            {status === 'error' && (
              <p role="alert" className="rounded-2xl bg-peach-soft px-4 py-3 text-sm text-ink">
                Something went wrong sending that. Please try again, or email us directly at{' '}
                <a href={mailUrl} className="font-semibold underline">
                  {site.email}
                </a>
                .
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between text-sm font-semibold text-ink">
        {label}
        {hint && <span className="text-xs font-medium text-muted">{hint}</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-xs font-medium text-terracotta"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
