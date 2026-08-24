import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

/**
 * SQLite lives on disk next to the project by default. Point DATABASE_FILE at a
 * persistent volume in production so moderation survives redeploys.
 */
const DB_FILE = resolve(process.env.DATABASE_FILE || './data/portfolio.db');

mkdirSync(dirname(DB_FILE), { recursive: true });

export const db = new DatabaseSync(DB_FILE);

db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA foreign_keys = ON');

/**
 * Schema is created on boot — no separate migration step to run. New tables for
 * future admin modules (projects, experience, ...) just get added here.
 */
db.exec(`
  CREATE TABLE IF NOT EXISTS testimonials (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name  TEXT NOT NULL,
    client_email TEXT,
    feedback     TEXT NOT NULL,
    status       TEXT NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at   TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_testimonials_status
    ON testimonials (status, created_at DESC);

  CREATE TABLE IF NOT EXISTS contact_messages (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    name              TEXT NOT NULL,
    email             TEXT NOT NULL,
    service           TEXT NOT NULL,
    business_category TEXT NOT NULL,
    message           TEXT NOT NULL,
    status            TEXT NOT NULL DEFAULT 'new'
                      CHECK (status IN ('new', 'read', 'archived')),
    created_at        TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_contact_messages_status
    ON contact_messages (status, created_at DESC);

  CREATE TABLE IF NOT EXISTS admin_users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    email         TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at    TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export const TESTIMONIAL_STATUSES = ['pending', 'approved', 'rejected'];
export const MESSAGE_STATUSES = ['new', 'read', 'archived'];
