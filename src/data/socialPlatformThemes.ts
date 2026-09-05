import { Instagram, Facebook, Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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

export const INSTAGRAM_GRADIENT =
  'bg-[linear-gradient(90deg,#833AB4_0%,#C13584_35%,#E1306C_60%,#F56040_82%,#FCAF45_100%)]';

export const platformThemes: Record<SocialPlatform, PlatformTheme> = {
  linkedin: {
    icon: Linkedin,
    accentBar: 'bg-[#0A66C2]',
    avatarRing: 'ring-2 ring-[#0A66C2]/25',
    cta: 'bg-[#0A66C2] text-white hover:bg-[#08529c]',
    badge: 'text-[#0A66C2]',
    iconActive: 'text-[#0A66C2]',
  },
  facebook: {
    icon: Facebook,
    accentBar: 'bg-[#1877F2]',
    avatarRing: 'ring-2 ring-[#1877F2]/25',
    cta: 'bg-[#1877F2] text-white hover:bg-[#1361c9]',
    badge: 'text-[#1877F2]',
    iconActive: 'text-[#1877F2]',
  },
  instagram: {
    icon: Instagram,
    accentBar: INSTAGRAM_GRADIENT,
    avatarRing: 'ring-2 ring-[#C13584]/30',
    cta: `${INSTAGRAM_GRADIENT} text-white hover:opacity-90`,
    badge: 'text-[#C13584]',
    iconActive: 'text-[#C13584]',
  },
};
