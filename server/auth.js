import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db.js';

const COOKIE_NAME = 'portfolio_admin';
const TOKEN_TTL = '8h';
const IS_PROD = process.env.NODE_ENV === 'production';

/** Fail loudly in production rather than signing tokens with a guessable key. */
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    if (IS_PROD) throw new Error('JWT_SECRET must be set to at least 32 characters');
    return 'dev-only-insecure-secret-change-me-in-production';
  }
  return secret;
}

export function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export function findAdminByEmail(email) {
  return db
    .prepare('SELECT id, email, password_hash FROM admin_users WHERE email = ?')
    .get(String(email).trim().toLowerCase());
}

export async function verifyCredentials(email, password) {
  const admin = findAdminByEmail(email);
  // Always run a hash comparison so a missing account and a wrong password
  // take a similar amount of time.
  const hash = admin?.password_hash ?? '$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv';
  const ok = await bcrypt.compare(String(password), hash);
  return ok && admin ? { id: admin.id, email: admin.email } : null;
}

export function issueSession(res, admin) {
  const token = jwt.sign({ sub: admin.id, email: admin.email }, getSecret(), {
    expiresIn: TOKEN_TTL,
  });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: IS_PROD,
    maxAge: 8 * 60 * 60 * 1000,
    path: '/',
  });
}

export function clearSession(res) {
  res.clearCookie(COOKIE_NAME, { path: '/', sameSite: 'strict', secure: IS_PROD });
}

/** Gate for every admin API route — the token never leaves the httpOnly cookie. */
export function requireAdmin(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'Not authenticated.' });

  try {
    const payload = jwt.verify(token, getSecret());
    req.admin = { id: payload.sub, email: payload.email };
    next();
  } catch {
    clearSession(res);
    res.status(401).json({ error: 'Session expired. Please sign in again.' });
  }
}
