import type Lenis from 'lenis';

/**
 * Shared handle to the Lenis instance so components (e.g. the mobile menu)
 * can pause and resume smooth scrolling without prop drilling.
 */
export const lenisRef: { current: Lenis | null } = { current: null };
