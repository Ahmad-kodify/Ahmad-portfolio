import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { ApiError, submitTestimonial } from '../lib/api';

const NAME_MIN = 2;
const NAME_MAX = 100;
const FEEDBACK_MIN = 10;
const FEEDBACK_MAX = 1000;

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Accessible feedback dialog. Mirrors the server-side validation rules. */
export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Reset to a clean form every time the dialog opens.
  useEffect(() => {
    if (!isOpen) return;
    setName('');
    setFeedback('');
    setEmail('');
    setWebsite('');
    setFieldErrors({});
    setFormError('');
    setIsSubmitting(false);
    setIsDone(false);

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 60);

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen]);

  // Escape closes; Tab is trapped inside the dialog.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  function validate() {
    const errors: Record<string, string> = {};
    const trimmedName = name.trim();
    const trimmedFeedback = feedback.trim();

    if (trimmedName.length < NAME_MIN || trimmedName.length > NAME_MAX) {
      errors.name = 'Please enter your name.';
    }
    if (trimmedFeedback.length < FEEDBACK_MIN || trimmedFeedback.length > FEEDBACK_MAX) {
      errors.feedback = `Please enter valid feedback (${FEEDBACK_MIN}-${FEEDBACK_MAX} characters).`;
    }
    return errors;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isSubmitting) return; // guards against double submits

    const errors = validate();
    setFieldErrors(errors);
    setFormError('');
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      await submitTestimonial({
        name: name.trim(),
        feedback: feedback.trim(),
        email: email.trim() || undefined,
        website,
      });
      setIsDone(true);
    } catch (error) {
      if (error instanceof ApiError && error.fields) setFieldErrors(error.fields);
      setFormError(
        error instanceof ApiError ? error.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const panelMotion = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
      };

  const inputClass =
    'w-full rounded-xl border border-borders bg-white px-4 py-3 text-sm text-primary-text placeholder-stone-300 transition-colors focus:border-primary-text focus:outline-none focus:ring-0';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary-text/40 backdrop-blur-[2px]"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
            {...panelMotion}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[calc(100dvh-3rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-borders bg-surface p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.28)] sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close feedback form"
              className="absolute right-4 top-4 rounded-full p-1.5 text-secondary-text transition-colors hover:bg-hover-bg hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-text/30 cursor-pointer"
            >
              <X size={18} />
            </button>

            {isDone ? (
              <div role="status" className="py-6 text-center">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-primary-text">
                  <Check size={22} strokeWidth={2.4} />
                </div>
                <h3
                  id="feedback-modal-title"
                  className="font-editorial text-xl font-semibold text-primary-text"
                >
                  Thank you for your feedback!
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm font-light leading-relaxed text-secondary-text">
                  Your testimonial has been submitted for review.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 rounded-xl bg-primary-text px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-bg transition-colors hover:bg-accent hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-text/30 focus-visible:ring-offset-2 cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3
                  id="feedback-modal-title"
                  className="font-editorial text-xl font-semibold text-primary-text sm:text-2xl"
                >
                  Share Your Experience
                </h3>
                <p className="mt-1.5 text-sm font-light text-secondary-text">
                  Just your name and a few words — that's all.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="feedback-name"
                      className="mb-1.5 block text-[10px] uppercase tracking-wider text-muted-text"
                    >
                      Your Name
                    </label>
                    <input
                      ref={firstFieldRef}
                      id="feedback-name"
                      name="name"
                      type="text"
                      required
                      maxLength={NAME_MAX}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? 'feedback-name-error' : undefined}
                      placeholder="John Smith"
                      className={inputClass}
                    />
                    {fieldErrors.name && (
                      <p id="feedback-name-error" className="mt-1.5 text-xs text-red-600">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="feedback-message"
                      className="mb-1.5 block text-[10px] uppercase tracking-wider text-muted-text"
                    >
                      Your Feedback
                    </label>
                    <textarea
                      id="feedback-message"
                      name="feedback"
                      required
                      rows={5}
                      maxLength={FEEDBACK_MAX}
                      value={feedback}
                      onChange={(event) => setFeedback(event.target.value)}
                      aria-invalid={Boolean(fieldErrors.feedback)}
                      aria-describedby={fieldErrors.feedback ? 'feedback-message-error' : undefined}
                      placeholder="Working together was a great experience..."
                      className={`${inputClass} resize-none`}
                    />
                    <div className="mt-1.5 flex items-start justify-between gap-3">
                      <p
                        id="feedback-message-error"
                        className={`text-xs ${fieldErrors.feedback ? 'text-red-600' : 'sr-only'}`}
                      >
                        {fieldErrors.feedback}
                      </p>
                      <span className="shrink-0 text-[11px] text-muted-text">
                        {feedback.trim().length}/{FEEDBACK_MAX}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="feedback-email"
                      className="mb-1.5 block text-[10px] uppercase tracking-wider text-muted-text"
                    >
                      Email <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="feedback-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby="feedback-email-hint"
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                    <p id="feedback-email-hint" className="mt-1.5 text-[11px] text-muted-text">
                      {fieldErrors.email || 'Only used to send you a thank-you note. Never published.'}
                    </p>
                  </div>

                  {/* Honeypot — hidden from people, irresistible to bots. */}
                  <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                    <label htmlFor="feedback-website">Website</label>
                    <input
                      id="feedback-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-sm text-red-600">
                      {formError}
                    </p>
                  )}

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center rounded-xl bg-primary-text px-7 py-3 text-xs font-semibold uppercase tracking-wider text-primary-bg transition-colors hover:bg-accent hover:text-primary-text disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-text/30 focus-visible:ring-offset-2 cursor-pointer"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
