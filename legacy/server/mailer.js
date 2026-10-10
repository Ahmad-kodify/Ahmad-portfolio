import nodemailer from 'nodemailer';
import { escapeHtml } from './sanitize.js';

/**
 * Mail is entirely optional: when SMTP env vars are missing the app still works
 * and simply logs that the notification was skipped. Sending never blocks or
 * fails an API response.
 */
let transporter = null;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
} else {
  console.warn('[mailer] SMTP not configured — notification emails are disabled.');
}

const FROM = process.env.MAIL_FROM || process.env.SMTP_USER;
const OWNER = process.env.OWNER_EMAIL;
const SITE_NAME = process.env.SITE_NAME || 'Muhammad Ahmad — Portfolio';
const ADMIN_URL = process.env.ADMIN_URL || 'http://localhost:4000/admin';

function send(options) {
  if (!transporter || !FROM) return;
  transporter.sendMail({ from: FROM, ...options }).catch((error) => {
    console.error('[mailer] Failed to send email:', error.message);
  });
}

/** Alert for the site owner whenever new feedback lands in the pending queue. */
export function notifyOwnerOfNewFeedback({ id, clientName, clientEmail, feedback }) {
  if (!OWNER) return;

  send({
    to: OWNER,
    replyTo: clientEmail || undefined,
    subject: `New testimonial pending review — ${clientName}`,
    text: `${clientName} left feedback on ${SITE_NAME}.\n\n"${feedback}"\n\nReply-to: ${clientEmail || 'not provided'}\nReview it: ${ADMIN_URL}\n(reference #${id})`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;color:#1A1A1A">
        <p style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#6E6D6A;margin:0 0 12px">
          New testimonial &middot; pending review
        </p>
        <h2 style="margin:0 0 4px;font-size:20px">${escapeHtml(clientName)}</h2>
        <p style="margin:0 0 16px;font-size:13px;color:#6E6D6A">
          ${clientEmail ? escapeHtml(clientEmail) : 'No email provided'}
        </p>
        <blockquote style="margin:0 0 20px;padding:14px 18px;border-left:3px solid #C9A875;background:#F5F3EE;white-space:pre-wrap">
          ${escapeHtml(feedback)}
        </blockquote>
        <a href="${escapeHtml(ADMIN_URL)}"
           style="display:inline-block;padding:10px 18px;border-radius:10px;background:#1A1A1A;color:#fff;text-decoration:none;font-size:13px">
          Review in admin
        </a>
        <p style="margin-top:20px;font-size:11px;color:#7A7A7A">Reference #${id}</p>
      </div>`,
  });
}

/** Thank-you note, sent only when the visitor chose to share an email. */
export function sendThankYouToClient({ clientName, clientEmail, feedback }) {
  if (!clientEmail) return;

  send({
    to: clientEmail,
    subject: `Thank you for your feedback, ${clientName}`,
    text: `Hi ${clientName},\n\nThank you for taking the time to share your experience — it genuinely means a lot.\n\nYour feedback:\n"${feedback}"\n\nIt has been submitted for review and will appear on the site once approved.\n\n— ${SITE_NAME}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;color:#1A1A1A">
        <h2 style="margin:0 0 12px;font-size:20px">Thank you, ${escapeHtml(clientName)}</h2>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#6E6D6A">
          Thank you for taking the time to share your experience — it genuinely means a lot.
        </p>
        <blockquote style="margin:0 0 20px;padding:14px 18px;border-left:3px solid #C9A875;background:#F5F3EE;white-space:pre-wrap">
          ${escapeHtml(feedback)}
        </blockquote>
        <p style="margin:0;font-size:13px;color:#6E6D6A">
          Your testimonial has been submitted for review and will appear on the site once approved.
        </p>
        <p style="margin-top:24px;font-size:13px;color:#1A1A1A">— ${escapeHtml(SITE_NAME)}</p>
      </div>`,
  });
}

/** Alert for the site owner whenever the contact form is submitted. */
export function notifyOwnerOfContactMessage({ id, name, email, service, businessCategory, message }) {
  if (!OWNER) return;

  send({
    to: OWNER,
    replyTo: email,
    subject: `New enquiry — ${service} (${name})`,
    text: `New contact message on ${SITE_NAME}.\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nBusiness category: ${businessCategory}\n\nMessage:\n${message}\n\nOpen the admin: ${ADMIN_URL}\n(reference #${id})`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;color:#1A1A1A">
        <p style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#6E6D6A;margin:0 0 12px">
          New contact enquiry
        </p>
        <h2 style="margin:0 0 14px;font-size:20px">${escapeHtml(name)}</h2>
        <table style="width:100%;border-collapse:collapse;font-size:13px;margin:0 0 18px">
          <tr>
            <td style="padding:6px 0;color:#7A7A7A;width:150px">Email</td>
            <td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}" style="color:#1A1A1A">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#7A7A7A">Service</td>
            <td style="padding:6px 0">${escapeHtml(service)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#7A7A7A">Business category</td>
            <td style="padding:6px 0">${escapeHtml(businessCategory)}</td>
          </tr>
        </table>
        <blockquote style="margin:0 0 20px;padding:14px 18px;border-left:3px solid #C9A875;background:#F5F3EE;white-space:pre-wrap">
          ${escapeHtml(message)}
        </blockquote>
        <a href="${escapeHtml(ADMIN_URL)}"
           style="display:inline-block;padding:10px 18px;border-radius:10px;background:#1A1A1A;color:#fff;text-decoration:none;font-size:13px">
          Open in admin
        </a>
        <p style="margin-top:20px;font-size:11px;color:#7A7A7A">Reference #${id}</p>
      </div>`,
  });
}

/** Confirmation sent straight back to whoever filled in the contact form. */
export function sendContactAutoReply({ name, email, service, message }) {
  if (!email) return;

  send({
    to: email,
    subject: 'Thanks for reaching out — I have your message',
    text: `Hi ${name},\n\nThank you for getting in touch about ${service}. Your message has arrived and I usually reply within 24 hours.\n\nWhat you sent:\n"${message}"\n\n— ${SITE_NAME}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;color:#1A1A1A">
        <h2 style="margin:0 0 12px;font-size:20px">Thanks for reaching out, ${escapeHtml(name)}</h2>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#6E6D6A">
          Your message about <strong style="color:#1A1A1A">${escapeHtml(service)}</strong> has arrived.
          I usually reply within 24 hours.
        </p>
        <blockquote style="margin:0 0 20px;padding:14px 18px;border-left:3px solid #C9A875;background:#F5F3EE;white-space:pre-wrap">
          ${escapeHtml(message)}
        </blockquote>
        <p style="margin-top:24px;font-size:13px;color:#1A1A1A">— ${escapeHtml(SITE_NAME)}</p>
      </div>`,
  });
}
