/**
 * Shared color tokens — v1.9.36 (audit-2 F4: Ghibli warm unified).
 *
 * v1.9.28 introduced tokens.ts with Duolingo-bright greens/reds across
 * ClozeUI / EndOverlay / ModeMenu, but TapInputUI + GameHUD already used
 * an OLIVE/TERRACOTTA palette aligned with Pickup's Ghibli brand. Result:
 * "correct green" was bright #58cc02 in 4-MC but olive #7d9a4f in
 * tap-pairs and progress bar — same screen, two greens.
 *
 * v1.9.36 commits to Ghibli warm everywhere. Olive replaces bright green,
 * terracotta replaces hot red. Lighter tints adjusted to match. ClozeUI /
 * EndOverlay / ModeMenu inherit through their tokens.ts import. UX feels
 * calmer, after-work-decompression-aligned.
 */

// Correct-answer / success / progress
export const COLOR_GREEN = '#7d9a4f';        // olive (was Duo bright #58cc02)
export const COLOR_GREEN_DARK = '#5e7a36';
export const COLOR_GREEN_TINT = '#dde6c8';

// Wrong-answer / error
export const COLOR_RED = '#c84a3a';          // terracotta (was Duo hot #ff4b4b)
export const COLOR_RED_DARK = '#7a2a20';
export const COLOR_RED_TINT = '#f5dad4';

// Cream-paper surface palette
export const COLOR_BORDER = '#ead9bb';
export const COLOR_BORDER_DARK = '#d4c098';
export const COLOR_CREAM = '#fef8ed';

// Text
export const COLOR_TEXT_DARK = '#3d2817';
export const COLOR_TEXT_MUTED = '#8b6f4a';

// Brand amber
export const COLOR_AMBER = '#e7a44a';
export const COLOR_AMBER_DARK = '#b07a2a';

// Other Duolingo highlights
export const COLOR_BLUE = '#1cb0f6';
export const COLOR_BLUE_DARK = '#0b8ec9';
export const COLOR_YELLOW = '#ffc800';
export const COLOR_YELLOW_DARK = '#e5b400';
export const COLOR_ORANGE = '#ff9600';
