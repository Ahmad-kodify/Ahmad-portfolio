import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { db } from '../db.js';
import { clean, isValidEmail } from '../sanitize.js';
import { notifyOwnerOfContactMessage, sendContactAutoReply } from '../mailer.js';

const NAME_MIN = 2;
const NAME_MAX = 100;
const CHOICE_MAX = 120;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 6,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again later.' },
});

router.post('/', contactLimiter, (req, res) => {
  const body = req.body ?? {};

  // Honeypot — answer 200 so bots cannot tell they were filtered.
  if (clean(body.website)) return res.status(200).json({ ok: true });

  const name = clean(body.name);
  const email = clean(body.email).toLowerCase();
  const service = clean(body.service);
  const businessCategory = clean(body.businessCategory);
  const message = clean(body.message);

  const fields = {};
  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    fields.name = 'Please enter your name.';
  }
  if (!isValidEmail(email)) {
    fields.email = 'Please enter a valid email address.';
  }
  if (!service || service.length > CHOICE_MAX) {
    fields.service = 'Please select a service.';
  }
  if (!businessCategory || businessCategory.length > CHOICE_MAX) {
    fields.businessCategory = 'Please select a business category.';
  }
  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    fields.message = `Please describe your project (${MESSAGE_MIN}-${MESSAGE_MAX} characters).`;
  }
  if (Object.keys(fields).length > 0) {
    return res.status(400).json({ error: 'Please check the form.', fields });
  }

  const result = db
    .prepare(
      `INSERT INTO contact_messages (name, email, service, business_category, message, status)
       VALUES (?, ?, ?, ?, ?, 'new')`,
    )
    .run(name, email, service, businessCategory, message);

  const payload = {
    id: Number(result.lastInsertRowid),
    name,
    email,
    service,
    businessCategory,
    message,
  };

  // Fire and forget — mail problems must never fail the visitor's submission.
  notifyOwnerOfContactMessage(payload);
  sendContactAutoReply(payload);

  res.status(201).json({ ok: true });
});

export default router;
