import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * Contact form endpoint.
 *
 * ── HOW TO WIRE DELIVERY ────────────────────────────────────────────────
 * Set SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / CONTACT_TO in your
 * environment (see .env.example) and every submission is emailed.
 * Without SMTP_HOST the submission is logged to the server console so the
 * site still works in development and on first deploy.
 *
 * To use a different provider (Resend, Postmark, a CRM webhook…) replace the
 * `deliver()` function below — everything else stays the same.
 * ────────────────────────────────────────────────────────────────────────
 */

export const runtime = 'nodejs';

const NEEDS = new Set(['Website', 'Full business system', 'Custom software or SaaS', 'Not sure yet']);

interface Payload {
  name: string;
  email: string;
  business: string;
  need: string;
  message: string;
}

// Best-effort rate limit per IP (resets on cold start — fine for a contact form).
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 6;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

/** Coerce to a trimmed string, dropping control characters (newlines and tabs are kept). */
function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  let out = '';
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    const isControl = (code < 32 && code !== 9 && code !== 10 && code !== 13) || code === 127;
    if (!isControl) out += ch;
  }
  return out.trim().slice(0, max);
}

function escapeHtml(s: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return s.replace(/[&<>"']/g, (c) => map[c]);
}

async function deliver(p: Payload): Promise<void> {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.info('[contact] SMTP not configured — submission logged only:', p);
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });

  const to = process.env.CONTACT_TO ?? 'hello@arkar.co.uk';
  const from = process.env.MAIL_FROM ?? process.env.SMTP_USER ?? to;

  const rows: Array<[string, string]> = [
    ['Name', p.name],
    ['Email', p.email],
    ['Business', p.business || '—'],
    ['Need', p.need],
    ['Message', p.message],
  ];

  await transporter.sendMail({
    from: `Arkar website <${from}>`,
    to,
    replyTo: p.email,
    subject: `New enquiry — ${p.need} — ${p.name}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n\n'),
    html: `<table style="font-family:Poppins,Arial,sans-serif;font-size:15px;color:#0F0F0F">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 16px 6px 0;color:#8C8A86;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
      )
      .join('')}</table>`,
  });
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  // Honeypot: answer 200 so bots cannot tell they were filtered.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const payload: Payload = {
    name: clean(body.name, 100),
    email: clean(body.email, 200).toLowerCase(),
    business: clean(body.business, 120),
    need: clean(body.need, 60),
    message: clean(body.message, 3000),
  };

  const fields: Record<string, string> = {};
  if (payload.name.length < 2) fields.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) fields.email = 'Please enter a valid email.';
  if (!NEEDS.has(payload.need)) fields.need = 'Pick the closest option.';
  if (payload.message.length < 10) fields.message = 'A sentence or two is enough.';
  if (Object.keys(fields).length) {
    return NextResponse.json({ error: 'Please check the form.', fields }, { status: 400 });
  }

  try {
    await deliver(payload);
  } catch (err) {
    console.error('[contact] delivery failed', err);
    return NextResponse.json({ error: 'Could not send right now.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
