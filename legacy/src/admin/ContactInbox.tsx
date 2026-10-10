import { useCallback, useEffect, useState } from 'react';
import { Archive, MailOpen, Trash2, Undo2 } from 'lucide-react';
import {
  ApiError,
  adminDeleteMessage,
  adminListMessages,
  adminSetMessageStatus,
} from '../lib/api';
import type { ContactMessage, MessageCounts, MessageStatus } from '../lib/api';

const TABS: { key: MessageStatus; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'read', label: 'Read' },
  { key: 'archived', label: 'Archived' },
];

const EMPTY_STATE: Record<MessageStatus, string> = {
  new: 'No new messages.',
  read: 'No messages marked as read.',
  archived: 'No archived messages.',
};

function formatDate(value: string) {
  const parsed = new Date(value.replace(' ', 'T') + 'Z');
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Contact-form inbox module of the admin panel. */
export default function ContactInbox() {
  const [tab, setTab] = useState<MessageStatus>('new');
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [counts, setCounts] = useState<MessageCounts>({ new: 0, read: 0, archived: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState<Record<number, string>>({});

  const load = useCallback(async (status: MessageStatus) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await adminListMessages(status);
      setItems(data.messages);
      setCounts(data.counts);
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : 'Unable to load messages.');
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
    action: () => Promise<{ counts: MessageCounts }>,
  ) {
    if (busy[id]) return;
    setBusy((current) => ({ ...current, [id]: label }));
    setError('');
    try {
      const data = await action();
      setCounts(data.counts);
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? `${caught.message} Please try again.`
          : 'Unable to update message. Please try again.',
      );
    } finally {
      setBusy((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
    }
  }

  const setStatus = (id: number, status: MessageStatus, label: string) =>
    runAction(id, label, () => adminSetMessageStatus(id, status));

  const buttonBase =
    'inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer';
  const subtleButton = `${buttonBase} border border-borders bg-surface text-secondary-text hover:border-primary-text hover:text-primary-text focus-visible:ring-primary-text/30`;

  return (
    <section>
      <h2 className="font-editorial text-xl font-semibold text-primary-text">Contact Messages</h2>

      <div role="tablist" aria-label="Message status" className="mt-5 flex flex-wrap gap-2">
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

      <div className="mt-6" aria-busy={isLoading}>
        {isLoading ? (
          <p className="text-sm text-secondary-text">Loading...</p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-borders bg-surface px-6 py-14 text-center">
            <p className="text-sm text-secondary-text">{EMPTY_STATE[tab]}</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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

                <a
                  href={`mailto:${item.email}`}
                  className="mt-0.5 self-start text-[12px] text-secondary-text underline-offset-2 hover:text-primary-text hover:underline"
                >
                  {item.email}
                </a>

                <dl className="mt-3.5 grid grid-cols-1 gap-2 rounded-xl bg-primary-bg/60 p-3.5 text-[12px] sm:grid-cols-2">
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-muted-text">Service</dt>
                    <dd className="mt-0.5 font-medium text-primary-text">{item.service}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-muted-text">
                      Business Category
                    </dt>
                    <dd className="mt-0.5 font-medium text-primary-text">{item.businessCategory}</dd>
                  </div>
                </dl>

                <p className="mt-3.5 flex-1 whitespace-pre-line text-[13.5px] font-light leading-relaxed text-secondary-text">
                  {item.message}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-borders/70 pt-4">
                  {tab === 'new' && (
                    <button
                      type="button"
                      disabled={Boolean(busy[item.id])}
                      onClick={() => setStatus(item.id, 'read', 'Marking...')}
                      className={`${buttonBase} bg-primary-text text-primary-bg hover:bg-accent hover:text-primary-text focus-visible:ring-primary-text/30`}
                    >
                      <MailOpen size={13} strokeWidth={2.4} />
                      {busy[item.id] === 'Marking...' ? 'Marking...' : 'Mark as Read'}
                    </button>
                  )}

                  {tab !== 'archived' && (
                    <button
                      type="button"
                      disabled={Boolean(busy[item.id])}
                      onClick={() => setStatus(item.id, 'archived', 'Archiving...')}
                      className={subtleButton}
                    >
                      <Archive size={13} strokeWidth={2.4} />
                      {busy[item.id] === 'Archiving...' ? 'Archiving...' : 'Archive'}
                    </button>
                  )}

                  {tab === 'archived' && (
                    <>
                      <button
                        type="button"
                        disabled={Boolean(busy[item.id])}
                        onClick={() => setStatus(item.id, 'new', 'Restoring...')}
                        className={subtleButton}
                      >
                        <Undo2 size={13} strokeWidth={2.4} />
                        {busy[item.id] === 'Restoring...' ? 'Restoring...' : 'Restore'}
                      </button>
                      <button
                        type="button"
                        disabled={Boolean(busy[item.id])}
                        onClick={() =>
                          runAction(item.id, 'Deleting...', () => adminDeleteMessage(item.id))
                        }
                        className={`${buttonBase} border border-red-200 bg-white text-red-600 hover:border-red-500 hover:bg-red-50 focus-visible:ring-red-500/30`}
                      >
                        <Trash2 size={13} strokeWidth={2.4} />
                        {busy[item.id] === 'Deleting...' ? 'Deleting...' : 'Delete'}
                      </button>
                    </>
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
