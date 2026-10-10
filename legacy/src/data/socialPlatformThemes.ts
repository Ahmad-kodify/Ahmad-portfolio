import { Instagram, Facebook, Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import UpworkIcon from '../components/icons/UpworkIcon';
import type { SocialPlatform } from './socialProfiles';

/**
 * Platform identity kept separate from card logic, so adding a network only
 * needs an entry here plus a record in `socialProfiles.ts`.
 */
export interface PlatformTheme {
  icon: LucideIcon;
  /** Thin accent strip across the top of the card. */
  accentBar: string;
  /** Ring drawn around the avatar. */
  avatarRing: string;
  /** Filled CTA at the bottom of the card. */
  cta: string;
  /** Colour used for the small platform badge label. */
  badge: string;
  /** Icon tint while the rail trigger is active. */
  iconActive: string;
}

export const INSTAGRAM_GRADIENT = 'bg-accent';

export const platformThemes: Record<SocialPlatform, PlatformTheme> = {
  linkedin: {
    icon: Linkedin,
    accentBar: 'bg-accent',
    avatarRing: 'ring-2 ring-accent/30',
    cta: 'bg-primary-text text-white hover:bg-accent',
    badge: 'text-accent',
    iconActive: 'text-accent',
  },
  facebook: {
    icon: Facebook,
    accentBar: 'bg-accent',
    avatarRing: 'ring-2 ring-accent/30',
    cta: 'bg-primary-text text-white hover:bg-accent',
    badge: 'text-accent',
    iconActive: 'text-accent',
  },
  instagram: {
    icon: Instagram,
    accentBar: INSTAGRAM_GRADIENT,
    avatarRing: 'ring-2 ring-accent/30',
    cta: 'bg-primary-text text-white hover:bg-accent',
    badge: 'text-accent',
    iconActive: 'text-accent',
  },
  upwork: {
    icon: UpworkIcon,
    accentBar: 'bg-accent',
    avatarRing: 'ring-2 ring-accent/30',
    cta: 'bg-primary-text text-white hover:bg-accent',
    badge: 'text-accent',
    iconActive: 'text-accent',
  },
};
