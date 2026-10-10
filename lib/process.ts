/**
 * The three-step process. `summary` is used on Home and the Services recap,
 * the longer fields power the full sections on /how-it-works.
 */

import { photos, type Photo } from './photos';

export interface ProcessStep {
  id: 'discover' | 'build' | 'grow';
  number: string;
  title: string;
  summary: string;
  happens: string;
  get: string;
  duration: string;
  durationLabel: string;
  /** Optional real photo shown beside the step on /how-it-works. */
  photo?: Photo;
}

export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    summary: 'A free call. We map how your business runs and where customers slip away.',
    happens:
      'A free 20-minute call. We walk through how a customer finds you, books you, pays you and hears from you again. We look for the gaps.',
    get: 'A one-page system map: what to build first, what can wait, and a fixed price for phase one.',
    duration: 'One call',
    durationLabel: 'Your plan within 2 working days',
    // Real candid of people talking over a laptop (Unsplash — see lib/photos.ts `discover`).
    photo: photos.discover,
  },
  {
    id: 'build',
    number: '02',
    title: 'Build',
    summary: 'A clear plan, a fixed price, a working first version, fast.',
    happens:
      'We design and build the first version in short cycles. You see progress every week on a live link, not in slides.',
    get: 'A working system: website, bookings, customer records and follow-ups, connected and tested with your real data.',
    duration: '2 weeks',
    durationLabel: 'For a website with lead capture. Full systems: 4–8 weeks, agreed up front',
  },
  {
    id: 'grow',
    number: '03',
    title: 'Grow',
    summary: 'We track the customer journey, refine, and add as you scale.',
    happens:
      'We watch the numbers: where leads come from, where they drop, who comes back. Then we refine, automate more and add what you need next.',
    get: 'Monthly improvements, monitoring and support. One partner who already knows your system.',
    duration: 'Ongoing',
    durationLabel: 'Month to month. Pause any time',
  },
];
