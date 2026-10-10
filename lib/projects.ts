/**
 * Shipped work. Screenshots live in `public/work/<id>.webp` — see
 * `scripts/optimize-screenshots.mjs` for how to add or replace one.
 * Projects without a screenshot render a code-drawn visual instead
 * (see `components/work/ProjectVisual.tsx`).
 */

export interface Project {
  id: string;
  /** Headline shown on the card. */
  title: string;
  /** Client or product name, shown small above the title. */
  client: string;
  location?: string;
  /** One line under the title. */
  description: string;
  tags: string[];
  live: boolean;
  url?: string;
  screenshot?: string;
  /** Case notes — Problem → What we built → Result. */
  problem: string;
  built: string;
  result: string;
  /** Shown on the Home page grid. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'sabbak',
    title: 'Bilingual services website, Riyadh',
    client: 'Sabbak Kahrabai',
    location: 'Riyadh, Saudi Arabia',
    description: 'Arabic/English site with WhatsApp booking and local SEO that brings in leads.',
    tags: ['Next.js', 'SEO', 'RTL'],
    live: true,
    url: 'https://www.sabbakkahrabai.com',
    screenshot: '/work/sabbak-ar.webp',
    problem:
      'A plumbing and electrical company with no online presence. Customers found competitors first and booked by phone, if at all.',
    built:
      'A bilingual Arabic/English site with full RTL layout, service-area pages and WhatsApp booking on every page. Local SEO for the jobs they want.',
    result:
      'Enquiries arrive on WhatsApp with the service and area already filled in. The site brings in leads through search.',
    featured: true,
  },
  {
    id: 'schuul',
    title: 'Online tutoring marketplace',
    client: 'Schuul',
    description: 'Booking engine, Stripe payments, tutor and student dashboards.',
    tags: ['Laravel', 'Stripe', 'Next.js'],
    live: false,
    problem:
      'Tutors and students were matching over messages and paying by bank transfer. No availability, no protection, no way to scale.',
    built:
      'A marketplace with a booking engine, real-time scheduling, Stripe Connect payouts and separate tutor, student and admin dashboards.',
    result:
      'Bookings, payments and lessons run through one platform. Tutors are paid automatically and admins see everything.',
    featured: true,
  },
  {
    id: 'simplifyapps',
    title: 'ERP & HRMS platform',
    client: 'SimplifyApps',
    description: 'Bookings, Odoo integration, real-time modules, role-based dashboards.',
    tags: ['Laravel', 'MySQL', 'WebSockets'],
    live: true,
    url: 'https://simplifyapps.io',
    screenshot: '/work/simplifyapps.webp',
    problem:
      'Operations spread across spreadsheets and disconnected tools. Bookings, HR and reporting never agreed with each other.',
    built:
      'An ERP and HRMS platform with bookings, Odoo integration, real-time modules over WebSockets and role-based dashboards for every team.',
    result:
      'One source of truth for the business. Managers see live numbers instead of end-of-month reports.',
    featured: true,
  },
  {
    id: 'tayfa',
    title: 'Multi-vendor e-commerce platform',
    client: 'Tayfa',
    location: 'Pakistan',
    description: 'Admin and seller dashboards, full order lifecycle.',
    tags: ['Node.js', 'Express', 'React'],
    live: true,
    url: 'https://tayfa.pk',
    screenshot: '/work/tayfa.webp',
    problem:
      'Many sellers, one storefront, and orders managed by hand. Stock and payouts lived in chat threads.',
    built:
      'A multi-vendor platform with admin and seller dashboards, product management and the full order lifecycle from checkout to delivery.',
    result:
      'Sellers manage their own stock and orders. The owner sees every sale in one place.',
    featured: true,
  },
  {
    id: 'airdynamic',
    title: 'Commercial HVAC company website',
    client: 'Air Dynamic Solutions',
    location: 'Toronto, Canada',
    description: 'Service pages built for search, with hosting and updates since launch.',
    tags: ['WordPress', 'SEO', 'Maintenance'],
    live: true,
    url: 'https://airdynamicsolutions.com',
    screenshot: '/work/airdynamic.webp',
    problem:
      'A commercial HVAC-R company serving hotel brands, with a website that did not reflect the scale of the work.',
    built:
      'A full company site with service pages structured for search, plus hosting, monitoring and ongoing updates since launch.',
    result:
      'New service pages ship as the business grows. The site has stayed fast, secure and online.',
  },
  {
    id: 'bcfl',
    title: 'Luxury travel enquiry site',
    client: 'Business Class For Less',
    location: 'Miami, USA',
    description: 'Custom multi-city flight enquiry form that captures the right details first time.',
    tags: ['WordPress', 'Custom forms', 'Maintenance'],
    live: true,
    url: 'https://businessclassforless.com',
    screenshot: '/work/bcfl.webp',
    problem:
      'A travel concierge selling discounted business-class flights needed enquiries that arrived complete, not half-answered.',
    built:
      'A site with a custom multi-city enquiry form: passengers, cabin class and dates captured up front. Ongoing maintenance.',
    result:
      'Every enquiry arrives ready to quote. Fewer back-and-forth emails before a sale.',
  },
  {
    id: 'arascow',
    title: 'Marketing agency brand sites',
    client: 'Arascow',
    location: 'London, UK',
    description: 'UK and international sites with growth-focused landing pages.',
    tags: ['WordPress', 'Landing pages', 'Maintenance'],
    live: true,
    url: 'https://arascow.co.uk',
    screenshot: '/work/arascow.webp',
    problem:
      'A London SEO and PPC agency, and Google Partner, needed sites that matched the standard it sells to its own clients.',
    built:
      'Company sites for the UK and international brands, with landing pages built for campaigns. Built and maintained on an ongoing basis.',
    result:
      'Two consistent brand sites, updated as campaigns change, without waiting on a developer.',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
