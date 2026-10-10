/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Contact form dropdown options — edit freely.
 *  `value` is what gets stored/emailed, `label` is what the visitor sees.
 *  Keep `value` stable once a form has been submitted with it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * The submitted record stores the `label` text, so editing this file never
 * needs a matching server change and old submissions keep the wording the
 * visitor actually saw.
 */

/** Placeholder set — swap these for the services you actually offer. */
export const services: SelectOption[] = [
  { value: 'web-application', label: 'Web Application Development' },
  { value: 'saas-platform', label: 'SaaS Platform Development' },
  { value: 'frontend-development', label: 'Frontend Development (React / Next.js)' },
  { value: 'backend-api', label: 'Backend & API Development' },
  { value: 'ecommerce', label: 'E-Commerce Store' },
  { value: 'landing-page', label: 'Landing Page / Marketing Site' },
  { value: 'ui-implementation', label: 'UI / Design Implementation' },
  { value: 'performance-audit', label: 'Performance & Code Audit' },
  { value: 'maintenance', label: 'Maintenance & Support' },
  { value: 'consultation', label: 'Technical Consultation' },
  { value: 'full-time-role', label: 'Full-Time Role Opportunity' },
  { value: 'other', label: 'Something Else' },
];

/** Placeholder set — swap these for the industries you want to track. */
export const businessCategories: SelectOption[] = [
  { value: 'startup', label: 'Startup' },
  { value: 'agency', label: 'Agency / Studio' },
  { value: 'ecommerce', label: 'E-Commerce & Retail' },
  { value: 'saas', label: 'SaaS & Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education & E-Learning' },
  { value: 'finance', label: 'Finance & Fintech' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'travel', label: 'Travel & Hospitality' },
  { value: 'nonprofit', label: 'Non-Profit' },
  { value: 'personal', label: 'Personal / Portfolio' },
  { value: 'other', label: 'Other' },
];
