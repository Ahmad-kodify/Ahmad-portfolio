/** Shared animation constants so every reveal feels like one system. */

export const EASE = [0.16, 1, 0.3, 1] as const;

export const REVEAL_DURATION = 0.8;

/** Stagger between sibling reveals (~80ms). */
export const STAGGER = 0.08;

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const;
