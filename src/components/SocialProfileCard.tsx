import { ArrowUpRight, X } from 'lucide-react';
import { profile } from '../data/socialProfiles';
import type { SocialProfile } from '../data/socialProfiles';
import { platformThemes, INSTAGRAM_GRADIENT } from '../data/socialPlatformThemes';
import type { PlatformTheme } from '../data/socialPlatformThemes';
/** Photo when one is configured, otherwise a monogram in the site's ink tone. */
function Avatar({ data, theme }: { data: SocialProfile; theme: PlatformTheme }) {
  const src = data.image || profile.image;
  const gradientRing = data.platform === 'instagram';

  return (
    <div
      className={`shrink-0 rounded-full p-[2px] ${
        gradientRing ? INSTAGRAM_GRADIENT : 'bg-transparent'
      }`}
    >
      {src ? (
        <img
          src={src}
          alt={`${data.name} profile photo`}
          loading="lazy"
          decoding="async"
          width={52}
          height={52}
          className={`h-13 w-13 rounded-full object-cover bg-white ${
            gradientRing ? 'ring-2 ring-white' : theme.avatarRing
          }`}
        />
      ) : (
        <div
          aria-hidden="true"
          className={`h-13 w-13 rounded-full bg-primary-text text-white font-editorial text-[17px] font-semibold flex items-center justify-center ${
            gradientRing ? 'ring-2 ring-white' : theme.avatarRing
          }`}
        >
          {profile.initials}
        </div>
      )}
    </div>
  );
}

interface SocialProfileCardProps {
  data: SocialProfile;
  /** Rendered on touch/mobile where the card is dismissed by tapping ×. */
  onClose?: () => void;
}

/**
 * Presentational preview card. It carries no positioning or open/close logic —
 * `SocialRail` owns that and simply mounts this inside its popover.
 */
export default function SocialProfileCard({ data, onClose }: SocialProfileCardProps) {
  const theme = platformThemes[data.platform];
  const Icon = theme.icon;

  return (
    <div className="w-[min(20rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-borders bg-surface shadow-[0_12px_32px_-12px_rgba(15,15,15,0.18)]">
      {/* Platform accent strip */}
      <div className={`h-1 w-full ${theme.accentBar}`} />

      <div className="p-5">
        {/* Platform badge + optional close affordance */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold ${theme.badge}`}
          >
            <Icon size={13} strokeWidth={2.2} />
            {data.label}
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label={`Close ${data.label} profile preview`}
              className="-mr-1 -mt-1 rounded-full p-1 text-secondary-text hover:text-primary-text hover:bg-hover-bg transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Identity */}
        <div className="mt-3.5 flex items-center gap-3.5">
          <Avatar data={data} theme={theme} />
          <div className="min-w-0">
            <p className="font-editorial text-[15px] font-semibold leading-tight text-primary-text truncate">
              {data.name}
            </p>
            <p className="mt-0.5 text-[12px] text-secondary-text truncate">{data.username}</p>
          </div>
        </div>

        <p className="mt-3 text-[12.5px] font-medium text-primary-text leading-snug">{data.role}</p>

        {data.tags && data.tags.length > 0 && (
          <p className="mt-1.5 text-[11.5px] text-muted-text">{data.tags.join(' • ')}</p>
        )}

        <p className="mt-2.5 text-[12.5px] font-light leading-relaxed text-secondary-text">
          {data.bio}
        </p>

        {data.meta && (
          <p className="mt-2 text-[11px] uppercase tracking-wider text-muted-text">{data.meta}</p>
        )}

        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-[12px] font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-text/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${theme.cta}`}
        >
          {data.ctaLabel}
          <ArrowUpRight size={14} strokeWidth={2.4} />
        </a>
      </div>
    </div>
  );
}
