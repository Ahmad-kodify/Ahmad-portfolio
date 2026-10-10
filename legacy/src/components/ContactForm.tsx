import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import CtaButton from './CtaButton';
import { ApiError, submitContactMessage } from '../lib/api';
import { businessCategories, services } from '../data/contactOptions';

const NAME_MAX = 100;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;

const EMPTY_FORM = {
  name: '',
  email: '',
  service: '',
  businessCategory: '',
  message: '',
};

type FormState = typeof EMPTY_FORM;

/**
 * Public enquiry form. Mirrors the server-side rules in server/routes/contact.js
 * — the server revalidates everything regardless of what arrives here.
 */
export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [website, setWebsite] = useState(''); // honeypot
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
  }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.service) next.service = 'Please select a service.';
    if (!form.businessCategory) next.businessCategory = 'Please select a business category.';
    const message = form.message.trim();
    if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
      next.message = `Please describe your project (${MESSAGE_MIN}-${MESSAGE_MAX} characters).`;
    }
    return next;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isSubmitting || isSent) return; // guards against double submits

    const found = validate();
    setErrors(found);
    setFormError('');
    if (Object.keys(found).length > 0) return;

    setIsSubmitting(true);
    try {
      await submitContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        service: form.service,
        businessCategory: form.businessCategory,
        message: form.message.trim(),
        website,
      });
      setIsSent(true);
      setForm(EMPTY_FORM);
    } catch (caught) {
      if (caught instanceof ApiError && caught.fields) {
        setErrors(caught.fields as Partial<Record<keyof FormState, string>>);
      }
      setFormError(
        caught instanceof ApiError ? caught.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldBase =
    'w-full rounded-xl border bg-white px-4 py-3 text-sm text-primary-text placeholder-muted-text transition-colors focus:outline-none focus:ring-0';

  const fieldClass = (key: keyof FormState) =>
    `${fieldBase} ${errors[key] ? 'border-accent/40 focus:border-accent' : 'border-borders focus:border-primary-text'}`;

  const labelClass = 'mb-2 block text-[10px] uppercase tracking-wider font-semibold text-muted-text';

  if (isSent) {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center px-4 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-primary-text">
          <Check size={24} strokeWidth={2.4} />
        </div>
        <h3 className="font-editorial text-2xl font-semibold text-primary-text">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-secondary-text">
          Thanks for reaching out — a confirmation is on its way to your inbox. I usually reply
          within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setIsSent(false)}
          className="mt-7 rounded-xl border border-borders px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-text transition-colors hover:border-primary-text hover:bg-hover-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-text/30 focus-visible:ring-offset-2 cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Form header */}
      <div className="border-b border-borders pb-5">
        <h3 className="font-editorial text-xl font-semibold text-primary-text">Send a Message</h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-text">
          Expected response: within 24 hours
        </p>
      </div>

      {/* Name + email */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Your Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={NAME_MAX}
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            placeholder="e.g. John Doe"
            className={fieldClass('name')}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-xs text-accent">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            placeholder="e.g. john@example.com"
            className={fieldClass('email')}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-xs text-accent">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Service + business category */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-service" className={labelClass}>
            Service Required
          </label>
          <div className="relative">
            <select
              id="contact-service"
              name="service"
              required
              value={form.service}
              onChange={(event) => update('service', event.target.value)}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? 'contact-service-error' : undefined}
              className={`${fieldClass('service')} cursor-pointer appearance-none pr-10 ${
                form.service ? '' : 'text-muted-text'
              }`}
            >
              <option value="">Select a service</option>
              {services.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-text"
            />
          </div>
          {errors.service && (
            <p id="contact-service-error" className="mt-1.5 text-xs text-accent">
              {errors.service}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-category" className={labelClass}>
            Business Category
          </label>
          <div className="relative">
            <select
              id="contact-category"
              name="businessCategory"
              required
              value={form.businessCategory}
              onChange={(event) => update('businessCategory', event.target.value)}
              aria-invalid={Boolean(errors.businessCategory)}
              aria-describedby={errors.businessCategory ? 'contact-category-error' : undefined}
              className={`${fieldClass('businessCategory')} cursor-pointer appearance-none pr-10 ${
                form.businessCategory ? '' : 'text-muted-text'
              }`}
            >
              <option value="">Select a category</option>
              {businessCategories.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-text"
            />
          </div>
          {errors.businessCategory && (
            <p id="contact-category-error" className="mt-1.5 text-xs text-accent">
              {errors.businessCategory}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Your Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={MESSAGE_MAX}
          value={form.message}
          onChange={(event) => update('message', event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          placeholder="Describe your project, role opportunity, or question..."
          className={`${fieldClass('message')} resize-none`}
        />
        <div className="mt-1.5 flex items-start justify-between gap-3">
          <p id="contact-message-error" className="text-xs text-accent">
            {errors.message}
          </p>
          <span className="shrink-0 text-[11px] text-muted-text">
            {form.message.trim().length}/{MESSAGE_MAX}
          </span>
        </div>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      {formError && (
        <p role="alert" className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
          {formError}
        </p>
      )}

      <div className="pt-1">
        <CtaButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </CtaButton>
      </div>
    </form>
  );
}
