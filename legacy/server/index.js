import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import testimonialsRouter from './routes/testimonials.js';
import contactRouter from './routes/contact.js';
import adminRouter from './routes/admin.js';

const app = express();
const PORT = Number(process.env.PORT || 4000);

// Behind a reverse proxy (Render, Fly, Nginx) so rate limiting sees real client IPs.
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(express.json({ limit: '32kb' }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/admin', adminRouter);

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

// In production the same process serves the built SPA, so /admin resolves on a
// hard refresh without extra host configuration.
const distDir = resolve('./dist');
if (existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/.*/, (_req, res) => res.sendFile(resolve(distDir, 'index.html')));
}

// Final safety net — never leak stack traces to the client.
app.use((error, _req, res, _next) => {
  console.error('[api]', error);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});
