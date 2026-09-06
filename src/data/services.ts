/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Services section content — edit freely.
 *  Drop real photos/screenshots into `public/services/` with the exact file
 *  names referenced below. Until a file exists the card shows a neutral
 *  placeholder block, so the section works before images are added.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  Car,
  ConciergeBell,
  Dumbbell,
  Factory,
  GraduationCap,
  HardHat,
  HeartPulse,
  Landmark,
  Megaphone,
  Plane,
  Rocket,
  Scale,
  Scissors,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Truck,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  /** Image path under public/, e.g. "/services/software.jpg". */
  image: string;
  /** Meaningful alt text describing the service imagery. */
  alt: string;
  /** True when the image is a screenshot of my own shipped work. */
  myWork?: boolean;
}

/** Industries rendered in the scrolling marquee below the Services grid. */
export interface Industry {
  name: string;
  icon: LucideIcon;
}

export const industries: Industry[] = [
  { name: 'E-commerce', icon: ShoppingCart },
  { name: 'Real Estate', icon: Building2 },
  { name: 'Automotive', icon: Car },
  { name: 'Healthcare', icon: HeartPulse },
  { name: 'Fashion', icon: Shirt },
  { name: 'Education', icon: GraduationCap },
  { name: 'Travel & Tourism', icon: Plane },
  { name: 'Restaurants & Food', icon: UtensilsCrossed },
  { name: 'HVAC & Home Services', icon: Wrench },
  { name: 'Marketing Agencies', icon: Megaphone },
  { name: 'Fitness & Wellness', icon: Dumbbell },
  { name: 'Finance', icon: Landmark },
  { name: 'Logistics', icon: Truck },
  { name: 'Legal', icon: Scale },
  { name: 'Construction', icon: HardHat },
  { name: 'Beauty & Salons', icon: Scissors },
  { name: 'Retail', icon: ShoppingBag },
  { name: 'SaaS & Tech Startups', icon: Rocket },
  { name: 'Hospitality', icon: ConciergeBell },
  { name: 'Manufacturing', icon: Factory },
];

export const services: Service[] = [
  {
    id: 'software',
    title: 'Software Development',
    description: 'Custom business software — ERP modules, dashboards, internal tools — built on Laravel and Node.js.',
    image: '/services/software.webp',
    alt: 'Developer workspace with application code on screen',
  },
  {
    id: 'saas',
    title: 'SaaS Development',
    description: 'Multi-user SaaS platforms with roles, subscriptions, and payments, designed to scale from day one.',
    image: '/services/saas.webp',
    alt: 'Analytics dashboard of a multi-user SaaS platform',
  },
  {
    id: 'website',
    title: 'Website Development',
    description: 'Fast, responsive business websites that are easy for owners to update and built to convert visitors.',
    image: '/services/website.webp',
    alt: 'Web design workspace with a business site in progress',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Development',
    description: 'Multi-vendor stores and checkout flows — product catalogues, order lifecycle, payments, and tracking.',
    image: '/services/ecommerce.webp',
    alt: 'Customer paying online with a card at checkout',
  },
  {
    id: 'api',
    title: 'API Development & Integration',
    description: 'REST APIs and third-party integrations — payment gateways, ERPs, tracking systems, webhooks.',
    image: '/services/api.webp',
    alt: 'Code editor showing backend and API integration work',
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Mobile-connected products built on web technology, sharing one backend with your web app.',
    image: '/services/mobile.webp',
    alt: 'Mobile app connected to a web platform backend',
  },
  {
    id: 'wordpress',
    title: 'WordPress Development',
    description: 'Business sites on WordPress with custom forms and layouts — delivered fast, easy to maintain.',
    image: '/services/wordpress.webp',
    alt: 'Laptop workspace for building a WordPress business site',
  },
  {
    id: 'seo',
    title: 'SEO & Local SEO',
    description: 'Technical SEO, on-page optimisation, and local visibility so the right customers actually find you.',
    image: '/services/seo.webp',
    alt: 'Laptop showing search and traffic analytics charts',
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    description: 'Ongoing updates, monitoring, backups, and fixes — your site stays fast, secure, and online.',
    image: '/services/maintenance.webp',
    alt: 'Developer monitoring code and updates on a laptop',
  },
];
