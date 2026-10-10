# Arkar — Software Studio

> From first lead to repeat customer — one system.

Marketing site for **Arkar**, built with Next.js (App Router), Tailwind CSS v4 and Framer Motion. Six pages, shared layout, premium scroll and hover interactions, ready to deploy to **arkar.co.uk** on Vercel.

## Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

Other scripts:

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run build`     | Production build (also type-checks)            |
| `npm start`         | Serve the production build                     |
| `npm run lint`      | ESLint (next/core-web-vitals + TypeScript)     |
| `npm run typecheck` | `tsc --noEmit`                                 |
| `npm run images`    | Convert screenshots in `tmp-images/` to WebP   |

Requires Node 20.9+.

## Deploy to Vercel

1. Push this repo to GitHub and import it in Vercel. Framework preset: **Next.js** (auto-detected, no config needed).
2. Add environment variables (see below). At minimum set `NEXT_PUBLIC_SITE_URL=https://arkar.co.uk`.
3. Add the domain `arkar.co.uk` (and `www.arkar.co.uk`) in **Project → Settings → Domains** and point DNS at Vercel.

## Contact form — plug in delivery

The form on `/contact` posts to `app/api/contact/route.ts`. It validates, rate-limits and filters bots, then calls `deliver()`.

- **Email via SMTP (built in):** set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` and `CONTACT_TO` (copy `.env.example` to `.env.local`). Every submission is emailed to `CONTACT_TO` with the sender as reply-to.
- **No SMTP configured:** submissions are logged to the server console and the visitor still sees the success state, so nothing breaks on first deploy.
- **Different provider (Resend, Postmark, a CRM webhook):** replace the body of `deliver()` in `app/api/contact/route.ts`. Nothing else changes.

## Project screenshots

Screenshots live in `public/work/<id>.webp` and are referenced from `lib/projects.ts`.

1. Drop a full-size PNG/JPG into `tmp-images/` (git-ignored), named after the project `id` — e.g. `tmp-images/schuul.png`.
2. Run `npm run images` → writes an optimised 1600px WebP to `public/work/`.
3. Set `screenshot: '/work/schuul.webp'` on that project in `lib/projects.ts`.

Projects without a `screenshot` render a code-drawn visual (`components/work/ProjectVisual.tsx`).

## Photos

Human/workspace photography lives in `public/photos/` and is catalogued in `lib/photos.ts` (source URL, search term and alt text per image). They are real Unsplash photos used as atmosphere and to represent industries served — never as "our team" or as named clients. To replace one with your own photo: drop a ~1600px WebP into `public/photos/`, point that entry's `src` at it and update the `alt`. The `<Photo />` component (`components/ui/Photo.tsx`) applies the rounded-corner, shadow and warm-wash treatment everywhere.

## Where things live

```
app/                      Routes (one folder per page) + API route, sitemap, robots, OG image, icons
  layout.tsx              Shared layout: Poppins, nav, footer, backdrop, cursor, smooth scroll
  page.tsx                Home
  services/ how-it-works/ work/ about/ contact/
components/
  ui/                     PillTag, SectionHeading, Band/Accent, Button (magnetic), Reveal, Stat, Chip, Cursor…
  home/                   Home page sections
  services/ work/ process/ about/
  Nav.tsx Footer.tsx CTABand.tsx ServiceCard.tsx ProcessStepper.tsx Faq.tsx ContactForm.tsx
lib/
  site.ts                 Name, domain, email, phone, WhatsApp, nav — edit contact details here
  services.ts projects.ts process.ts faq.ts      All site copy
  motion.ts               Shared easing / stagger constants
```

All copy is in `lib/*.ts` and the page/section components — no CMS required.

## Brand

Cream `#F0EDE8` · Ink `#0F0F0F` · Terracotta `#E8602C` · Body `#464442` · Muted `#8C8A86` · Peach `#F8C9AE`. Poppins throughout. Tokens are declared once in `app/globals.css` (`@theme`).

## Legacy

The previous Vite/Express portfolio was moved to `legacy/` for reference. It is excluded from the build and can be deleted whenever you like:

```bash
git rm -r legacy && git commit -m "Remove legacy portfolio"
```
