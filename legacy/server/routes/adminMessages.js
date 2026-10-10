import { Router } from 'express';
import { db, MESSAGE_STATUSES } from '../db.js';

/**
 * Contact-inbox module of the admin API. Mounted under /api/admin/messages,
 * behind the same session gate as every other admin route.
 */
const router = Router();

router.get('/', (req, res) => {
  const status = String(req.query.status || 'new');
  if (!MESSAGE_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Unknown status filter.' });
  }

  const rows = db
    .prepare(
      `SELECT id, name, email, service, business_category, message, status, created_at
         FROM contact_messages
        WHERE status = ?
        ORDER BY created_at DESC`,
    )
    .all(status);

  res.json({
    messages: rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      service: row.service,
      businessCategory: row.business_category,
      message: row.message,
      status: row.status,
      createdAt: row.created_at,
    })),
    counts: messageCounts(),
  });
});

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body ?? {};

  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid message id.' });
  if (!MESSAGE_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Status must be new, read or archived.' });
  }

  const result = db
    .prepare(
      `UPDATE contact_messages
          SET status = ?, updated_at = datetime('now')
        WHERE id = ?`,
    )
    .run(status, id);

  if (result.changes === 0) return res.status(404).json({ error: 'Message not found.' });
  res.json({ ok: true, id, status, counts: messageCounts() });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid message id.' });

  const result = db.prepare('DELETE FROM contact_messages WHERE id = ?').run(id);
  if (result.changes === 0) return res.status(404).json({ error: 'Message not found.' });

  res.json({ ok: true, id, counts: messageCounts() });
});

/** Tab badge counts, returned with every mutation so the UI stays in sync. */
function messageCounts() {
  const rows = db
    .prepare('SELECT status, COUNT(*) AS total FROM contact_messages GROUP BY status')
    .all();
  const counts = { new: 0, read: 0, archived: 0 };
  for (const row of rows) counts[row.status] = row.total;
  return counts;
}

export default router;
