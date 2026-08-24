import { useCallback, useEffect, useState } from 'react';
import { Check, Trash2, X } from 'lucide-react';
import {
  ApiError,
  adminDeleteTestimonial,
  adminListTestimonials,
  adminSetStatus,
} from '../lib/api';
import type { AdminTestimonial, StatusCounts, TestimonialStatus } from '../lib/api';

const TABS: { key: TestimonialStatus; label: string }[] = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
];

const EMPTY_STATE: Record<TestimonialStatus, string> = {
  pending: 'No pending testimonials.',
  approved: 'No approved testimonials yet.',
  rejected: 'No rejected testimonials.',
};

function formatDate(value: string) {
  const parsed = new Date(value.replace(' ', 'T') + 'Z');
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * The one admin module that exists today. Future modules (projects, experience)
 * can slot in beside it as sibling components under the same shell.
 */
export default function TestimonialModeration() {
  const [tab, setTab] = useState<TestimonialStatus>('pending');
  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [counts, setCounts] = useState<StatusCounts>({ pending: 0, approved: 0, rejected: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  /** id -> in-flight action label, so each card can show its own busy state. */
  const [busy, setBusy] = useState<Record<number, string>>({});

  const load = useCallback(async (status: TestimonialStatus) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await adminListTestimonials(status);
      setItems(data.testimonials);
      setCounts(data.counts);
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'Unable to load testimonials.');
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load(tab);
  }, [tab, load]);

  async function runAction(
    id: number,
    label: string,
    action: () => Promise<{ counts: StatusCounts }>,
  ) {
    if (busy[id]) return;
    setBusy((current) => ({ ...current, [id]: label }));
    setError('');
    try {
      const data = await action();
      setCounts(data.counts);
      // The row no longer belongs in the active tab.
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? `${caught.message} Please try again.`
          : 'Unable to update testimonial. Please try again.',
      );
    } finally {
      setBusy((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
    }
  }

  const setStatus = (id: number, status: TestimonialStatus, label: string) =>
    runAction(id, label, () => adminSetStatus(id, status));

  const remove = (id: number) =>
    runAction(id, 'Deleting...', () => adminDeleteTestimonial(id));

  const buttonBase =
    'inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer';

  return (
    <section>
      <h2 className="font-editorial text-xl font-semibold text-primary-text">Testimonials</h2>

      {/* Tabs */}
      <div role="tablist" aria-label="Testimonial status" className="mt-5 flex flex-wrap gap-2">
        {TABS.map((item) => {
          const isActive = tab === item.key;
          return (
            <button
              key={item.key}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setTab(item.key)}
              className={`rounded-xl border px-4 py-2 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-text/30 focus-visible:ring-offset-2 cursor-pointer ${
                isActive
                  ? 'border-primary-text bg-primary-text text-primary-bg'
                  : 'border-borders bg-surface text-secondary-text hover:border-primary-text hover:text-primary-text'
              }`}
            >
              {item.label}
              <span className={`ml-2 text-[11px] ${isActive ? 'opacity-70' : 'text-muted-text'}`}>
                {counts[item.key]}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* List */}
      <div className="mt-6" aria-busy={isLoading}>
        {isLoading ? (
          <p className="text-sm text-secondary-text">Loading...</p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-borders bg-surface px-6 py-14 text-center">
            <p className="text-sm text-secondary-text">{EMPTY_STATE[tab]}</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col rounded-2xl border border-borders bg-surface p-5 shadow-soft"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-editorial text-[15px] font-semibold text-primary-text">
                    {item.name}
                  </h3>
                  <span className="text-[11px] uppercase tracking-wider text-muted-text">
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                {item.email && (
                  <a
                    href={`mailto:${item.email}`}
                    className="mt-0.5 text-[12px] text-secondary-text underline-offset-2 hover:text-primary-text hover:underline"
                  >
                    {item.email}
                  </a>
                )}

                <p className="mt-3 flex-1 whitespace-pre-line text-[13.5px] font-light leading-relaxed text-secondary-text">
                  {item.feedback}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-borders/70 pt-4">
                  {tab !== 'approved' && (
                    <button
                      type="button"
                      disabled={Boolean(busy[item.id])}
                      onClick={() => setStatus(item.id, 'approved', 'Approving...')}
                      className={`${buttonBase} bg-primary-text text-primary-bg hover:bg-accent hover:text-primary-text focus-visible:ring-primary-text/30`}
                    >
                      <Check size={13} strokeWidth={2.6} />
                      {busy[item.id] === 'Approving...' ? 'Approving...' : 'Approve'}
                    </button>
                  )}

                  {tab === 'pending' && (
                    <button
                      type="button"
                      disabled={Boolean(busy[item.id])}
                      onClick={() => setStatus(item.id, 'rejected', 'Rejecting...')}
                      className={`${buttonBase} border border-borders bg-surface text-secondary-text hover:border-primary-text hover:text-primary-text focus-visible:ring-primary-text/30`}
                    >
                      <X size={13} strokeWidth={2.6} />
                      {busy[item.id] === 'Rejecting...' ? 'Rejecting...' : 'Reject'}
                    </button>
                  )}

                  {tab === 'approved' && (
                    <button
                      type="button"
                      disabled={Boolean(busy[item.id])}
                      onClick={() => setStatus(item.id, 'rejected', 'Removing...')}
                      className={`${buttonBase} border border-borders bg-surface text-secondary-text hover:border-primary-text hover:text-primary-text focus-visible:ring-primary-text/30`}
                    >
                      <X size={13} strokeWidth={2.6} />
                      {busy[item.id] === 'Removing...' ? 'Removing...' : 'Remove From Public'}
                    </button>
                  )}

                  {tab === 'rejected' && (
                    <button
                      type="button"
                      disabled={Boolean(busy[item.id])}
                      onClick={() => remove(item.id)}
                      className={`${buttonBase} border border-red-200 bg-white text-red-600 hover:border-red-500 hover:bg-red-50 focus-visible:ring-red-500/30`}
                    >
                      <Trash2 size={13} strokeWidth={2.4} />
                      {busy[item.id] === 'Deleting...' ? 'Deleting...' : 'Delete'}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
