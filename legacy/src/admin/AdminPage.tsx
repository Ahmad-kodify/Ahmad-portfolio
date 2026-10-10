import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminLogout, adminMe } from '../lib/api';
import AdminLogin from './AdminLogin';
import TestimonialModeration from './TestimonialModeration';
import ContactInbox from './ContactInbox';

/** Admin modules. Future ones (projects, experience, ...) get added here. */
const MODULES = [
  { key: 'messages', label: 'Messages', render: () => <ContactInbox /> },
  { key: 'testimonials', label: 'Testimonials', render: () => <TestimonialModeration /> },
] as const;

type ModuleKey = (typeof MODULES)[number]['key'];

/**
 * Admin shell: auth gate plus the module area. Adding a future module means
 * adding a nav entry here — the session handling below stays untouched.
 */
export default function AdminPage() {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [activeModule, setActiveModule] = useState<ModuleKey>('messages');

  useEffect(() => {
    let cancelled = false;

    adminMe()
      .then((data) => {
        if (!cancelled) setAdminEmail(data.admin.email);
      })
      .catch(() => undefined) // 401 simply means "show the login screen"
      .finally(() => {
        if (!cancelled) setIsChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = useCallback(async () => {
    await adminLogout().catch(() => undefined);
    setAdminEmail(null);
  }, []);

  useEffect(() => {
    document.title = 'Portfolio Admin';
  }, []);

  if (isChecking) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-primary-bg">
        <p className="text-sm text-secondary-text">Loading...</p>
      </main>
    );
  }

  if (!adminEmail) {
    return <AdminLogin onSignedIn={setAdminEmail} />;
  }

  return (
    <div className="min-h-dvh bg-primary-bg font-sans">
      <header className="border-b border-borders bg-surface">
        <div className="luxury-container flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="flex items-baseline gap-3">
            <Link
              to="/"
              className="text-lg font-bold tracking-tight font-editorial text-primary-text hover:opacity-85"
            >
              MA<span className="text-accent">/</span>
            </Link>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-text">Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-[12px] text-secondary-text sm:inline">{adminEmail}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-borders px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-primary-text transition-colors hover:border-primary-text hover:bg-hover-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-text/30 focus-visible:ring-offset-2 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Module switcher */}
      <nav aria-label="Admin sections" className="border-b border-borders bg-surface/60">
        <div className="luxury-container flex gap-1 overflow-x-auto">
          {MODULES.map((module) => {
            const isActive = activeModule === module.key;
            return (
              <button
                key={module.key}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveModule(module.key)}
                className={`-mb-px shrink-0 border-b-2 px-4 py-3 text-[12px] font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-text/30 cursor-pointer ${
                  isActive
                    ? 'border-primary-text text-primary-text'
                    : 'border-transparent text-secondary-text hover:text-primary-text'
                }`}
              >
                {module.label}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="luxury-container py-10">
        {MODULES.find((module) => module.key === activeModule)?.render()}
      </main>
    </div>
  );
}
