/**
 * 拾光 (Pickup) — Design System v1 token accessors (v2.0.B.279).
 *
 * `t.*` returns `var(--t-*)` strings so inline styles stay theme-aware:
 *   style={{ color: t.color.text }}  →  color: var(--t-text)
 * Flip <html data-theme="dark"> and every consumer follows, no re-render.
 *
 * `raw` holds the LIGHT hex values for surfaces that can't read CSS vars
 * (Phaser canvas, share-card SVG, OG images). Keep raw in sync with the
 * :root block in tokens.css.
 *
 * tokens.css must be imported once at app entry (main.tsx).
 */

const v = (name: string) => `var(--t-${name})`;

export const t = {
  color: {
    bg: v('bg'),
    surface: v('surface'),
    surfaceAlt: v('surface-alt'),
    border: v('border'),
    borderStrong: v('border-strong'),
    borderCard: v('border-card'),
    borderSoft: v('border-soft'),
    tintWarn: v('tint-warn'),
    text: v('text'),
    textMuted: v('text-muted'),
    textInverse: v('text-inverse'),
    brand: v('brand'),
    brandDark: v('brand-dark'),
    success: v('success'),
    successDark: v('success-dark'),
    successTint: v('success-tint'),
    danger: v('danger'),
    dangerDark: v('danger-dark'),
    dangerTint: v('danger-tint'),
    info: v('info'),
    warn: v('warn'),
    focus: v('focus'),
  },
  space: (n: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10) => v(`space-${n}`),
  radius: { sm: v('radius-sm'), md: v('radius-md'), lg: v('radius-lg'), pill: v('radius-pill') },
  text: {
    micro: v('text-micro'), body: v('text-body'), button: v('text-button'),
    title: v('text-title'), stat: v('text-stat'), display: v('text-display'),
  },
  elev: { 1: v('elev-1'), 2: v('elev-2'), 3: v('elev-3'), topStripe: v('top-stripe') },
  dur: { fast: v('dur-fast'), base: v('dur-base'), slow: v('dur-slow') },
  ease: { spring: v('ease-spring'), out: v('ease-out') },
  z: { sticky: v('z-sticky'), overlay: v('z-overlay'), toast: v('z-toast') },
} as const;

/** Light-theme hex values for canvas / SVG / OG surfaces (no CSS vars). */
export const raw = {
  bg: '#fef8ed', surface: '#ffffff', surfaceAlt: '#fff7e8',
  border: '#ead9bb', borderStrong: '#d4c098',
  text: '#3c2a1c', textMuted: '#8b6f4a', textInverse: '#ffffff',
  brand: '#e7a44a', brandDark: '#b07a2a',
  success: '#7d9a4f', successDark: '#5e7a36', successTint: '#dde6c8',
  danger: '#c84a3a', dangerDark: '#7a2a20', dangerTint: '#f5dad4',
  info: '#4a6678', warn: '#c4a040', focus: '#1cb0f6',
} as const;
