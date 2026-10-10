import 'dotenv/config';
import { db } from '../db.js';
import { hashPassword } from '../auth.js';

/**
 * Creates (or updates the password of) the admin account.
 *
 *   npm run admin:create -- admin@example.com "a-strong-password"
 *
 * Falls back to ADMIN_EMAIL / ADMIN_PASSWORD from .env when no arguments are
 * given, so the account can also be provisioned on a server without a TTY.
 */
const email = (process.argv[2] || process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const password = process.argv[3] || process.env.ADMIN_PASSWORD || '';

if (!email || !password) {
  console.error('Usage: npm run admin:create -- <email> <password>');
  console.error('   or: set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
  process.exit(1);
}

if (password.length < 10) {
  console.error('Password must be at least 10 characters.');
  process.exit(1);
}

const hash = await hashPassword(password);

db.prepare(
  `INSERT INTO admin_users (email, password_hash) VALUES (?, ?)
   ON CONFLICT (email) DO UPDATE SET password_hash = excluded.password_hash`,
).run(email, hash);

console.log(`Admin account ready: ${email}`);
