import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { db, TESTIMONIAL_STATUSES } from '../db.js';
import { clearSession, issueSession, requireAdmin, verifyCredentials } from '../auth.js';
import adminMessagesRouter from './adminMessages.js';

const router = Router();

/** Slow brute-force attempts on the only public admin endpoint. */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { error: 'Too many sign-in attempts. Please try again later.' },
});

// ---------------------------------------------------------------- session ---

router.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const admin = await verifyCredentials(email, password);
  if (!admin) return res.status(401).json({ error: 'Invalid email or password.' });

  issueSession(res, admin);
  res.json({ admin: { email: admin.email } });
});

router.post('/logout', (_req, res) => {
  clearSession(res);
  res.json({ ok: true });
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ admin: { email: req.admin.email } });
});

// ----------------------------------------------------------- testimonials ---
// Everything below this line requires a valid admin session.
router.use(requireAdmin);

// Contact inbox module.
router.use('/messages', adminMessagesRouter);

router.get('/testimonials', (req, res) => {
  const status = String(req.query.status || 'pending');
  if (!TESTIMONIAL_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Unknown status filter.' });
  }

  const rows = db
    .prepare(
      `SELECT id, client_name, client_email, feedback, status, created_at
         FROM testimonials
        WHERE status = ?
        ORDER BY created_at DESC`,
    )
    .all(status);

  res.json({
    testimonials: rows.map((row) => ({
      id: row.id,
      name: row.client_name,
      email: row.client_email,
      feedback: row.feedback,
      status: row.status,
      createdAt: row.created_at,
    })),
    counts: countsByStatus(),
  });
});

router.patch('/testimonials/:id', (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body ?? {};

  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid testimonial id.' });
  if (!TESTIMONIAL_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Status must be pending, approved or rejected.' });
  }

  const result = db
    .prepare(
      `UPDATE testimonials
          SET status = ?, updated_at = datetime('now')
        WHERE id = ?`,
    )
    .run(status, id);

  if (result.changes === 0) return res.status(404).json({ error: 'Testimonial not found.' });
  res.json({ ok: true, id, status, counts: countsByStatus() });
});

router.delete('/testimonials/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid testimonial id.' });

  const result = db.prepare('DELETE FROM testimonials WHERE id = ?').run(id);
  if (result.changes === 0) return res.status(404).json({ error: 'Testimonial not found.' });

  res.json({ ok: true, id, counts: countsByStatus() });
});

/** Tab badge counts, returned alongside every mutation so the UI stays in sync. */
function countsByStatus() {
  const rows = db.prepare('SELECT status, COUNT(*) AS total FROM testimonials GROUP BY status').all();
  const counts = { pending: 0, approved: 0, rejected: 0 };
  for (const row of rows) counts[row.status] = row.total;
  return counts;
}

export default router;
