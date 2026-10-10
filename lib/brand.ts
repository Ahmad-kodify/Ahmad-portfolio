/**
 * Arkar wolf mark — an original geometric wolf head drawn on a 100×100 grid.
 * Front-facing (leadership, protection), broad muzzle, ruff spikes, with the
 * eyes and nose as negative space so the mark works in one colour anywhere.
 *
 * Used by <WolfMark /> on the site, the favicon/apple icon and the OG image.
 * Tune the shape here and every usage updates.
 */

/** Head silhouette (outer outline). */
export const WOLF_OUTLINE =
  'M12 8 L31 28 L50 23 L69 28 L88 8 L81 36 L93 50 L77 60 L70 76 L62 90 L54 97 L46 97 L38 90 L30 76 L23 60 L7 50 L19 36 Z';

/** Two slanted eyes. */
export const WOLF_EYES = 'M24 47 L41 43 L41 50 L29 54 Z M76 47 L59 43 L59 50 L71 54 Z';

/** Nose. */
export const WOLF_NOSE = 'M43 80 L57 80 L50 89 Z';

/** Single path with eyes + nose cut out (use with fill-rule="evenodd"). */
export const WOLF_PATH = `${WOLF_OUTLINE} ${WOLF_EYES} ${WOLF_NOSE}`;
