/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Projects shown in the Featured Projects section — edit freely.
 *  App projects render hand-built React mockups inside the monitor frame
 *  (keyed by `id` in Projects.tsx); client websites render `screenshot`
 *  images instead. Drop the screenshot files into `public/` with the exact
 *  names referenced below (ads.png, arascow.png, bcfl.png, sabbak.png).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectData {
  id: string;
  category: string;
  name: string;
  badge: string | null;
  description: string;
  liveUrl: string;
  /** Address shown in the monitor frame's browser bar. */
  mockupUrl: string;
  /** Screenshot paths — when present they render as a carousel in the monitor frame. */
  screenshots?: string[];
  /** Small location line under the category pill, e.g. "🇨🇦 Toronto, Canada". */
  country?: string;
  /** Tech chips row. Keep these accurate — never label a WordPress site as React. */
  tech?: string[];
  /** When present these replace the default View Project / Live Preview buttons. */
  links?: ProjectLink[];
}

export const projects: ProjectData[] = [
  {
    id: 'simplifyapps',
    category: 'Enterprise Software',
    name: 'SimplifyApps ERP',
    badge: 'Featured',
    description: 'A complete enterprise resource planning platform built for real business operations. Covers inventory, HR, sales, and reporting modules.',
    liveUrl: 'https://simplifyapps.io',
    mockupUrl: 'simplifyapps.io',
    screenshots: ['/simplifyapps.png'],
    links: [{ label: 'Visit Site', url: 'https://simplifyapps.io' }],
  },
  {
    id: 'tayfa',
    category: 'E-Commerce',
    name: 'Tayfa.pk',
    badge: 'Live',
    description: 'A full-stack multi-vendor e-commerce platform handling real transactions for real customers built with Laravel and React.',
    liveUrl: 'https://tayfa.pk',
    mockupUrl: 'tayfa.pk/shop',
  },
  {
    id: 'schuul',
    category: 'EdTech',
    name: 'Schuul.com',
    badge: null,
    description: 'A live tutoring marketplace with Stripe Connect, real-time scheduling, and multi-role user management.',
    liveUrl: '#',
    mockupUrl: 'schuul.com/tutors',
  },
  {
    id: 'airdynamic',
    category: 'Client Website',
    name: 'Air Dynamic Solutions',
    badge: 'Live',
    description: 'Commercial HVAC-R and facility management company serving brands like Marriott and Hilton. I built the full site and have managed hosting, updates, and new service pages since launch.',
    liveUrl: 'https://airdynamicsolutions.com',
    mockupUrl: 'airdynamicsolutions.com',
    screenshots: ['/ads.png'],
    country: '🇨🇦 Toronto, Canada',
    tech: ['WordPress', 'Elementor', 'SEO', 'Hosting & Maintenance'],
    links: [{ label: 'Visit Site', url: 'https://airdynamicsolutions.com' }],
  },
  {
    id: 'arascow',
    category: 'Client Website',
    name: 'Arascow.co.uk',
    badge: 'Live',
    description: 'UK site of Arascow — SEO, PPC and digital marketing agency and certified Google Partner in London. I built the site and maintain it on an ongoing basis.',
    liveUrl: 'https://arascow.co.uk',
    mockupUrl: 'arascow.co.uk',
    screenshots: ['/arascow.png'],
    country: '🇬🇧 London, UK',
    tech: ['WordPress', 'Elementor', 'SEO', 'Ongoing Maintenance'],
    links: [{ label: 'Visit Site', url: 'https://arascow.co.uk' }],
  },
  {
    id: 'arascow-com',
    category: 'Client Website',
    name: 'Arascow.com',
    badge: 'Live',
    description: "Arascow's international site with its own design and growth-focused landing pages. Built and maintained by me alongside the UK site.",
    liveUrl: 'https://arascow.com',
    mockupUrl: 'arascow.com',
    screenshots: ['/arascow-com.png'],
    country: '🇬🇧 London, UK',
    tech: ['WordPress', 'Elementor', 'Landing Pages', 'Ongoing Maintenance'],
    links: [{ label: 'Visit Site', url: 'https://arascow.com' }],
  },
  {
    id: 'bcfl',
    category: 'Client Website',
    name: 'Business Class For Less (BCFL)',
    badge: 'Live',
    description: 'Luxury travel concierge selling discounted business-class flights with 120+ airline partners. I built the site including a custom multi-city flight enquiry form with passenger and cabin-class selection, and handle ongoing maintenance.',
    liveUrl: 'https://businessclassforless.com',
    mockupUrl: 'businessclassforless.com',
    screenshots: ['/bcfl.png'],
    country: '🇺🇸 Miami, USA',
    tech: ['WordPress', 'Elementor', 'Custom Booking Form', 'Ongoing Maintenance'],
    links: [{ label: 'Visit Site', url: 'https://businessclassforless.com' }],
  },
  {
    id: 'sabbak',
    category: 'Client Website',
    name: 'Sabbak Kahrabai',
    badge: 'Live',
    description: 'Plumbing and electrical services company in Riyadh. I designed and built a fully bilingual Arabic/English site with complete RTL layout support, WhatsApp booking flows, and service-area pages.',
    liveUrl: 'https://www.sabbakkahrabai.com',
    mockupUrl: 'sabbakkahrabai.com',
    screenshots: ['/sabbak.png'],
    country: '🇸🇦 Riyadh, Saudi Arabia',
    tech: ['Custom Build', 'Bilingual AR/EN', 'RTL Layout', 'SEO'],
    links: [{ label: 'Visit Site', url: 'https://www.sabbakkahrabai.com' }],
  },
  {
    id: 'numdesk',
    category: 'Company Website',
    name: 'NumDesk.com',
    badge: 'Live',
    description: 'Official website of NumDesk Pvt Ltd — the software company where I engineer enterprise ERP and HRMS products as a Junior Software Engineer.',
    liveUrl: 'https://numdesk.com',
    mockupUrl: 'numdesk.com',
    screenshots: ['/numdesk.png'],
    country: '🇵🇰 Pakistan',
    links: [{ label: 'Visit Site', url: 'https://numdesk.com' }],
  },
];
