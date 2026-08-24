import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { db } from '../db.js';
import { notifyOwnerOfNewFeedback, sendThankYouToClient } from '../mailer.js';
import { clean, isValidEmail } from '../sanitize.js';

export const NAME_MIN = 2;
export const NAME_MAX = 100;
export const FEEDBACK_MIN = 10;
export const FEEDBACK_MAX = 1000;

const router = Router();

/** Six submissions per hour per IP is generous for a real client, useless for a bot. */
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 6,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please try again later.' },
});

// Public list — approved testimonials only. Nothing else ever leaves the server.
router.get('/', (_req, res) => {
  const rows = db
    .prepare(
      `SELECT id, client_name, feedback, created_at
         FROM testimonials
        WHERE status = 'approved'
        ORDER BY created_at DESC`,
    )
    .all();

  res.json({
    testimonials: rows.map((row) => ({
      id: row.id,
      name: row.client_name,
      feedback: row.feedback,
      createdAt: row.created_at,
    })),
  });
});

// Public submission — always lands as `pending`.
router.post('/', submitLimiter, (req, res) => {
  const body = req.body ?? {};

  // Honeypot: a real visitor never sees or fills this field. Answer 200 so bots
  // cannot tell they were caught.
  if (clean(body.website)) {
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name);
  const feedback = clean(body.feedback);
  const email = clean(body.email).toLowerCase();

  const fields = {};
  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    fields.name = `Please enter your name (${NAME_MIN}-${NAME_MAX} characters).`;
  }
  if (feedback.length < FEEDBACK_MIN || feedback.length > FEEDBACK_MAX) {
    fields.feedback = `Please enter valid feedback (${FEEDBACK_MIN}-${FEEDBACK_MAX} characters).`;
  }
  if (email && !isValidEmail(email)) {
    fields.email = 'Please enter a valid email address, or leave it blank.';
  }
  if (Object.keys(fields).length > 0) {
    return res.status(400).json({ error: 'Please check the form.', fields });
  }

  const result = db
    .prepare(
      `INSERT INTO testimonials (client_name, client_email, feedback, status)
       VALUES (?, ?, ?, 'pending')`,
    )
    .run(name, email || null, feedback);

  const payload = {
    id: Number(result.lastInsertRowid),
    clientName: name,
    clientEmail: email || null,
    feedback,
  };

  // Fire and forget — a mail outage must never fail the visitor's submission.
  notifyOwnerOfNewFeedback(payload);
  sendThankYouToClient(payload);

  res.status(201).json({ ok: true });
});

export default router;
