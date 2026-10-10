export interface FaqItem {
  q: string;
  a: string;
}

export const faq: FaqItem[] = [
  {
    q: 'How do you price a project?',
    a: 'Fixed price, agreed before we start. You know the number on day one and it does not move unless the scope does. Ongoing work after launch is a simple monthly plan.',
  },
  {
    q: 'How long does it take?',
    a: 'A website with lead capture: about two weeks. A full system with customer records and follow-ups: four to eight weeks. Custom software is scoped on the discovery call, with dates in writing.',
  },
  {
    q: 'We already have a website. Do we start over?',
    a: 'Not unless it is holding you back. Often we keep your site and build the system behind it: bookings, customer records and follow-ups. We will tell you honestly on the call.',
  },
  {
    q: 'Do you maintain it after launch?',
    a: 'Yes. Hosting, updates, monitoring and small changes are covered by a monthly plan. You can pause it whenever you like, and you always own the code.',
  },
  {
    q: 'Do you build custom software, or only websites?',
    a: 'Both. A website is the front door. Behind it we build CRMs, internal tools, customer portals, integrations and full SaaS products.',
  },
];
