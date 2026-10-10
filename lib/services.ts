/**
 * The six things Arkar builds. `short` is used on the Home grid,
 * `description` + `includes` power the full blocks on /services.
 */

export type ServiceId =
  | 'websites'
  | 'bookings'
  | 'crm'
  | 'followups'
  | 'custom'
  | 'integrations';

export interface Service {
  id: ServiceId;
  title: string;
  short: string;
  description: string;
  includes: string[];
}

export const services: Service[] = [
  {
    id: 'websites',
    title: 'Websites that convert',
    short: 'Fast, modern, built to rank on Google and turn visitors into leads.',
    description:
      'Your website is the front door. We build it fast, make it rank, and give every visitor one clear next step. Then we wire it into the rest of your system, so an enquiry is never just an email.',
    includes: [
      'Custom design, built on Next.js',
      'Local SEO and Google Business setup',
      'Booking, quote and enquiry forms wired to your CRM',
      'Fast on mobile, tracked from day one',
    ],
  },
  {
    id: 'bookings',
    title: 'Booking & Lead Capture',
    short: 'Every enquiry captured. Nothing slips through.',
    description:
      'Every call, form, WhatsApp message and booking lands in one place. The lead gets an instant reply, you get a notification, and nothing waits in an inbox until it is too late.',
    includes: [
      'Online booking with live availability and reminders',
      'Web, WhatsApp and phone enquiries in one inbox',
      'Instant auto-reply and internal alerts',
      'Lead source tracking, so you know what works',
    ],
  },
  {
    id: 'crm',
    title: 'Customer Records (CRM)',
    short: 'Every customer, every job, every follow-up in one place.',
    description:
      'One record per customer: contact details, every job, every quote, every message. Your team sees the full history before they pick up the phone.',
    includes: [
      'Customer, job and quote history in one view',
      'Notes, tags and a status for every lead',
      'Team access with roles and permissions',
      'Import from spreadsheets or your old tool',
    ],
  },
  {
    id: 'followups',
    title: 'Automatic Follow-ups',
    short: 'WhatsApp and email reminders that bring customers back.',
    description:
      'Most repeat business is lost to silence. We set up the follow-ups that go out on their own: quote reminders, review requests, "time for your next visit" and win-back messages.',
    includes: [
      'WhatsApp, SMS and email sequences',
      'Triggered by real events: quote sent, job done, 90 days quiet',
      'Review requests that grow your Google rating',
      'Opt-outs and consent handled properly',
    ],
  },
  {
    id: 'custom',
    title: 'Custom Software & SaaS',
    short: 'When standard tools hit their ceiling, we build what fits.',
    description:
      'When off-the-shelf tools stop fitting, we build what does. Internal tools, customer portals, marketplaces and full SaaS products, designed around how you actually work.',
    includes: [
      'Laravel and Next.js, built to scale',
      'Stripe payments and multi-role dashboards',
      'APIs, integrations and real-time features',
      'Ongoing development after launch',
    ],
  },
  {
    id: 'integrations',
    title: 'Integrations & Dashboards',
    short: 'Connect your tools. See the whole business at a glance.',
    description:
      'Your accounting, calendar, payments and marketing tools already hold the data. We connect them and put the numbers that matter on one screen.',
    includes: [
      'Connect Stripe, Xero, Google, Odoo and more',
      'One owner dashboard: leads, jobs, revenue, follow-ups',
      'Automated reports by email or WhatsApp',
      'Alerts when something needs attention',
    ],
  },
];

export const audiences: string[] = [
  'Service businesses',
  'Clinics & Dental',
  'Salons & Spas',
  'Real Estate',
  'Trades (HVAC / Plumbing / Electrical)',
  'Startups needing custom software',
  'Any business whose customers come back',
];
