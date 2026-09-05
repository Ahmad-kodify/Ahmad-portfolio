/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDIT YOUR PROFILE INFORMATION HERE — this is the single source of truth.
 *  Name, bio, username, profile picture and every social URL used across the
 *  site (hero rail, footer, social preview cards) are read from this file.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Shared identity — reused by every platform card unless overridden below. */
export const profile = {
  fullName: 'Muhammad Ahmad',
  jobTitle: 'Full-Stack Software Engineer',
  email: 'ahmadkodify@gmail.com',
  /** E.164 form used for the tel: link. */
  phone: '+923196522386',
  /** Human readable form shown in the UI. */
  phoneDisplay: '+92 319 6522386',
  /**
   * Drop a square photo in `src/assets/` and import it here, e.g.
   *   import avatar from '../assets/avatar.jpg';
   *   image: avatar,
   * Leave it empty to fall back to the elegant monogram avatar.
   */
  image: '' as string,
  /** Fallback shown when `image` is empty. */
  initials: 'MA',
};

export type SocialPlatform = 'instagram' | 'facebook' | 'linkedin';

export interface SocialProfile {
  platform: SocialPlatform;
  /** Label used for icon/link accessibility copy. */
  label: string;
  name: string;
  /** Handle line shown under the name (@user, linkedin.com/in/..., etc). */
  username: string;
  role: string;
  bio: string;
  /** Optional chips rendered above the bio (skills, interests, focus areas). */
  tags?: string[];
  /** Optional small stat line, e.g. "500+ connections". */
  meta?: string;
  profileUrl: string;
  ctaLabel: string;
  image?: string;
}

export const socialProfiles: SocialProfile[] = [
  {
    platform: 'instagram',
    label: 'Instagram',
    name: profile.fullName,
    username: '@muhammad_.ahmad._',
    role: 'Software Engineer • SaaS Builder',
    bio: 'Building products, coding and sharing my journey behind the screen.',
    tags: ['Developer', 'Web', 'SaaS'],
    profileUrl: 'https://www.instagram.com/muhammad_.ahmad._/',
    ctaLabel: 'View Instagram',
  },
  {
    platform: 'facebook',
    label: 'Facebook',
    name: profile.fullName,
    username: 'Muhammad Ahmad',
    role: 'Software Engineer & Full-Stack Developer',
    bio: 'Building modern websites, SaaS products and web applications.',
    profileUrl: 'https://www.facebook.com/profile.php?id=100034652762963',
    ctaLabel: 'View Facebook Profile',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    name: profile.fullName,
    username: 'linkedin.com/in/binauf',
    role: profile.jobTitle,
    bio: 'I build scalable web applications and SaaS products for startups and businesses.',
    tags: ['Laravel', 'React', 'Next.js', 'TypeScript'],
    profileUrl: 'https://www.linkedin.com/in/binauf/',
    ctaLabel: 'View LinkedIn Profile',
  },
];

/** Convenience lookup for components that only need a single URL (e.g. Footer). */
export const socialUrls = socialProfiles.reduce(
  (acc, item) => ({ ...acc, [item.platform]: item.profileUrl }),
  {} as Record<SocialPlatform, string>,
);
