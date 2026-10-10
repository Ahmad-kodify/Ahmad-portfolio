/**
 * Real stock photography used as atmosphere and to represent the kinds of
 * businesses Arkar serves. Nothing here is presented as Arkar staff or as a
 * named client — keep it that way.
 *
 * Source: Unsplash (free for commercial use under the Unsplash License).
 * Each entry records the original photo URL and the search term it was found
 * with, so the owner can swap in their OWN real photos later:
 *   1. Drop a photo in `public/photos/` (WebP, ~1600px wide).
 *   2. Point `src` at it and update `alt`.
 */

export interface Photo {
  src: string;
  alt: string;
  /** Original Unsplash page — for reference and credit. */
  source: string;
  /** Search term / mood the photo was chosen for. */
  query: string;
  credit?: string;
}

export const photos = {
  hero: {
    src: '/photos/hero.webp',
    alt: 'Person working on a laptop at a wooden table in a bright brick-walled office',
    source: 'https://unsplash.com/photos/1551836022-d5d88e9218df',
    query: 'person working laptop candid',
  },
  gap: {
    src: '/photos/gap.webp',
    alt: 'Cafe owner taking a card payment at the counter',
    source: 'https://unsplash.com/photos/1556740738-b6a63e27c4df',
    query: 'small business owner counter',
  },
  discover: {
    src: '/photos/discover.webp',
    alt: 'Small team gathered around a laptop, talking through ideas',
    source: 'https://unsplash.com/photos/1543269865-cbf427effbad',
    query: 'two people laptop meeting',
  },
  workspace: {
    src: '/photos/workspace.webp',
    alt: 'Desk with a laptop and monitor beside a window in natural light',
    source: 'https://unsplash.com/photos/1499951360447-b19be8fe80f5',
    query: 'modern workspace desk',
  },
  cafe: {
    src: '/photos/cafe.webp',
    alt: 'Barista smiling behind a coffee shop counter',
    source: 'https://unsplash.com/photos/1507914372368-b2b085b925a1',
    query: 'cafe owner counter',
  },
  clinic: {
    src: '/photos/clinic.webp',
    alt: 'Dentist showing a patient an image on a screen',
    source: 'https://unsplash.com/photos/1606811841689-23dfddce3e95',
    query: 'dental clinic patient',
  },
  salon: {
    src: '/photos/salon.webp',
    alt: "Hairdresser blow-drying a client's hair in a bright salon",
    source: 'https://unsplash.com/photos/1562322140-8baeececf3df',
    query: 'salon owner',
  },
  realestate: {
    src: '/photos/realestate.webp',
    alt: 'Modern house with its lights on at dusk',
    source: 'https://unsplash.com/photos/1600585154340-be6161a56a0c',
    query: 'real estate home exterior',
  },
  trades: {
    src: '/photos/trades.webp',
    alt: 'Electrician working on a wall panel',
    source: 'https://unsplash.com/photos/1621905251189-08b45d6a269e',
    query: 'tradesperson working',
  },
  startup: {
    src: '/photos/startup.webp',
    alt: 'Team working on laptops around a shared wooden table',
    source: 'https://unsplash.com/photos/1522071820081-009f0129c71c',
    query: 'startup team laptops',
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
