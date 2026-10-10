/**
 * Single source of truth for studio identity, contact details and navigation.
 * Every component reads from here — change a value once and it updates everywhere.
 */

export const site = {
  name: 'Arkar',
  domain: 'arkar.co.uk',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arkar.co.uk',
  title: 'Arkar — Software Studio | From first lead to repeat customer',
  description:
    'Arkar is a software studio. We build the system that runs your business: website, bookings, customer records and automatic follow-ups in one place. Custom software and SaaS when you need it.',
  tagline: 'From first lead to repeat customer — one system.',
  positioning: {
    lead: 'From first lead to repeat customer',
    tail: 'one system.',
  },
  email: 'hello@arkar.co.uk',
  phone: {
    e164: '+923196522386',
    display: '+92 319 6522386',
  },
  whatsapp: {
    number: '923196522386',
    message: "Hi Arkar, I'd like to talk about a project",
  },
  countries: ['United Kingdom', 'United States', 'Canada', 'Saudi Arabia'],
  year: 2026,
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
  site.whatsapp.message,
)}`;

export const telUrl = `tel:${site.phone.e164}`;
export const mailUrl = `mailto:${site.email}`;

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
];

export const contactLink: NavLink = { label: 'Contact', href: '/contact' };
