/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Clients section content — edit freely.
 *  Cards render in array order in the 2×2 grid (1 column on mobile).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ClientStat {
  value: string;
  label: string;
}

export interface Client {
  id: string;
  flag: string;
  name: string;
  /** One line about their business. */
  business: string;
  /** One line about my role on the engagement. */
  role: string;
  /** Short display form of the link, e.g. "arascow.co.uk". */
  linkLabel: string;
  url: string;
}

export const clientStats: ClientStat[] = [
  { value: '4', label: 'Clients' },
  { value: '4', label: 'Countries' },
  { value: '6', label: 'Live Sites in Production' },
];

export const clients: Client[] = [
  {
    id: 'airdynamic',
    flag: '🇨🇦',
    name: 'Air Dynamic Solutions',
    business: 'Commercial HVAC & facility management, Toronto.',
    role: 'Full site build; hosting, updates and new pages since launch.',
    linkLabel: 'airdynamicsolutions.com',
    url: 'https://airdynamicsolutions.com',
  },
  {
    id: 'arascow',
    flag: '🇬🇧',
    name: 'Arascow',
    business: 'SEO & digital marketing agency, London. Google Partner.',
    role: 'Built and maintain both company sites (.co.uk and .com).',
    linkLabel: 'arascow.co.uk',
    url: 'https://arascow.co.uk',
  },
  {
    id: 'bcfl',
    flag: '🇺🇸',
    name: 'Business Class For Less',
    business: 'Luxury travel concierge, Miami.',
    role: 'Site build with custom flight enquiry form; ongoing maintenance.',
    linkLabel: 'businessclassforless.com',
    url: 'https://businessclassforless.com',
  },
  {
    id: 'sabbak',
    flag: '🇸🇦',
    name: 'Sabbak Kahrabai',
    business: 'Plumbing & electrical services, Riyadh.',
    role: 'Bilingual Arabic/English site with full RTL support.',
    linkLabel: 'sabbakkahrabai.com',
    url: 'https://www.sabbakkahrabai.com',
  },
];
