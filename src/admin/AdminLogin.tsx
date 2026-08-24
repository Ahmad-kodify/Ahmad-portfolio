import { useState } from 'react';
import { ApiError, adminLogin } from '../lib/api';

interface AdminLoginProps {
  onSignedIn: (email: string) => void;
}

export default function AdminLogin({ onSignedIn }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isSubmitting) return;

    setError('');
    setIsSubmitting(true);
    try {
      const data = await adminLogin(email.trim(), password);
      onSignedIn(data.admin.email);
    } catch (caught) {
      setError(
        caught instanceof ApiError ? caught.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    'w-full rounded-xl border border-borders bg-white px-4 py-3 text-sm text-primary-text placeholder-stone-300 transition-colors focus:border-primary-text focus:outline-none';

  return (
    <main className="flex min-h-dvh items-center justify-center bg-primary-bg px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-borders bg-surface p-8 shadow-soft">
        <span className="text-xl font-bold tracking-tight font-editorial text-primary-text">
          MA<span className="text-accent">/</span>
        </span>
        <h1 className="mt-4 font-editorial text-2xl font-semibold text-primary-text">
          Portfolio Admin
        </h1>
        <p className="mt-1.5 text-sm font-light text-secondary-text">
          Sign in to moderate testimonials.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-1.5 block text-[10px] uppercase tracking-wider text-muted-text"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-[10px] uppercase tracking-wider text-muted-text"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary-text px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary-bg transition-colors hover:bg-accent hover:text-primary-text disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-text/30 focus-visible:ring-offset-2 cursor-pointer"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}
