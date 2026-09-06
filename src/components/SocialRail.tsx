import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { socialProfiles } from '../data/socialProfiles';
import type { SocialPlatform, SocialProfile } from '../data/socialProfiles';
import SocialProfileCard from './SocialProfileCard';
import { platformThemes } from '../data/socialPlatformThemes';

/** Grace period so the card survives the cursor travelling icon -> card. */
const CLOSE_DELAY = 140;
/** Card width (px) used to decide whether the popover still fits on screen. */
const CARD_WIDTH = 320;

type Placement = 'right' | 'center';

/**
 * Vertical social rail with hover/focus/tap driven profile previews.
 * Only one preview is ever open — `activePlatform` is a single value.
 */
export default function SocialRail() {
  const [activePlatform, setActivePlatform] = useState<SocialPlatform | null>(null);
  const [placement, setPlacement] = useState<Placement>('right');
  const [isTouch, setIsTouch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mirrors the navbar: docked to the top edge at rest, floating pill on scroll.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pointer capability decides the whole interaction model (hover vs tap).
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setIsTouch(!query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // Fall back to a centred card when the rail is too close to the right edge.
  useEffect(() => {
    const measure = () => {
      const rect = railRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPlacement(rect.right + 12 + CARD_WIDTH + 16 <= window.innerWidth ? 'right' : 'center');
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const open = useCallback(
    (platform: SocialPlatform) => {
      clearCloseTimer();
      setActivePlatform(platform);
    },
    [clearCloseTimer],
  );

  const close = useCallback(() => {
    clearCloseTimer();
    setActivePlatform(null);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setActivePlatform(null), CLOSE_DELAY);
  }, [clearCloseTimer]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  // Escape always closes; a pointer press outside the rail and card closes too.
  useEffect(() => {
    if (!activePlatform) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (railRef.current?.contains(target)) return;
      if (target.closest?.('[data-social-preview]')) return;
      close();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [activePlatform, close]);

  const motionProps = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.12 },
      }
    : {
        initial: { opacity: 0, x: -8, scale: 0.98 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: -8, scale: 0.98 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      };

  const activeProfile = socialProfiles.find((item) => item.platform === activePlatform) ?? null;

  return (
    <>
      <motion.div
        ref={railRef}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={`fixed left-0 top-1/3 z-50 hidden sm:flex flex-col items-center gap-1.5 p-2 text-white select-none transition-all duration-500 ${
          isScrolled
            ? 'ml-1.5 rounded-full bg-primary-text/95 backdrop-blur-md ring-1 ring-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.45)]'
            : 'ml-0 rounded-l-none rounded-r-[20px] bg-primary-text shadow-[0_18px_36px_-16px_rgba(0,0,0,0.45)]'
        }`}
      >
        {socialProfiles.map((data) => (
          <SocialRailItem
            key={data.platform}
            data={data}
            isActive={activePlatform === data.platform}
            isTouch={isTouch}
            placement={placement}
            motionProps={motionProps}
            onOpen={() => open(data.platform)}
            onScheduleClose={scheduleClose}
            onCancelClose={clearCloseTimer}
            onClose={close}
          />
        ))}
      </motion.div>

      {/* Centred variant for viewports where the right side has no room left. */}
      <AnimatePresence>
        {placement === 'center' && activeProfile && (
          <motion.div
            key={activeProfile.platform}
            data-social-preview
            {...motionProps}
            className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-6"
          >
            <SocialProfileCard data={activeProfile} onClose={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface SocialRailItemProps {
  data: SocialProfile;
  isActive: boolean;
  isTouch: boolean;
  placement: Placement;
  motionProps: Record<string, unknown>;
  onOpen: () => void;
  onScheduleClose: () => void;
  onCancelClose: () => void;
  onClose: () => void;
}

function SocialRailItem({
  data,
  isActive,
  isTouch,
  placement,
  motionProps,
  onOpen,
  onScheduleClose,
  onCancelClose,
  onClose,
}: SocialRailItemProps) {
  const theme = platformThemes[data.platform];
  const Icon = theme.icon;
  const panelId = `social-preview-${data.platform}`;

  const triggerClass = [
    'block rounded-full p-2 transition-colors duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
    isActive ? `bg-white/10 ${theme.iconActive}` : 'text-white/60 hover:text-white hover:bg-white/10',
  ].join(' ');

  return (
    <div
      className="relative"
      onMouseEnter={isTouch ? undefined : onOpen}
      onMouseLeave={isTouch ? undefined : onScheduleClose}
      onFocus={onOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onClose();
      }}
    >
      {isTouch ? (
        <button
          type="button"
          onClick={() => (isActive ? onClose() : onOpen())}
          aria-label={`Open ${data.label} profile preview`}
          aria-expanded={isActive}
          aria-controls={panelId}
          className={`${triggerClass} cursor-pointer`}
        >
          <Icon size={18} />
        </button>
      ) : (
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${data.label} profile preview`}
          aria-expanded={isActive}
          aria-controls={panelId}
          className={triggerClass}
        >
          <Icon size={18} />
        </a>
      )}

      <AnimatePresence>
        {isActive && placement === 'right' && (
          <motion.div
            id={panelId}
            data-social-preview
            {...motionProps}
            // `pl-3` is the invisible bridge that keeps hover alive across the gap.
            className="absolute top-0 left-full z-40 pl-3"
            onMouseEnter={isTouch ? undefined : onCancelClose}
            onMouseLeave={isTouch ? undefined : onScheduleClose}
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -left-[5px] top-3 h-2.5 w-2.5 rotate-45 border-b border-l border-borders bg-surface"
              />
              <SocialProfileCard data={data} onClose={isTouch ? onClose : undefined} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
