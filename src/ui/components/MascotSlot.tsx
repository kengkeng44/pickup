/**
 * 拾光 (Pickup) — MascotSlot primitive (design-system v1, v2.0.B.280).
 *
 * Avatar image + optional solid ground ellipse (zero blur, per brand rule).
 * Reproduces the ellipse pattern from MapPage.tsx:
 *   background: rgba(60,42,28,0.28-0.30), borderRadius: 50%
 *
 * char selects the mascot image:
 *   mochi   → /mascots/calico-anchor.webp
 *   hana    → /mascots/iso-shiba.webp
 *   grandma → /mascots/iso-grandma.webp
 *   custom  → pass `src` prop directly
 *
 * pose is reserved for future outfit/animation variants (no-op now).
 *
 *   <MascotSlot char="mochi" size={72} floor />
 *   <MascotSlot char="hana" size={64} />
 *   <MascotSlot src="/mascots/scene-mochi-talking.webp" size={96} floor />
 */
import type { HTMLAttributes } from 'react';

export type MascotChar = 'mochi' | 'hana' | 'grandma';

const CHAR_SRC: Record<MascotChar, string> = {
  mochi:   '/mascots/calico-anchor.webp',
  hana:    '/mascots/iso-shiba.webp',
  grandma: '/mascots/iso-grandma.webp',
};

export interface MascotSlotProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Preset character name. Ignored if `src` is provided. */
  char?: MascotChar;
  /** Override image path directly (skips char lookup). */
  src?: string;
  /** Square size in px. Default: 72. */
  size?: number;
  /** Alt text. Defaults to the char name or "mascot". */
  alt?: string;
  /**
   * Pose tag (reserved for future variants). Currently no-op.
   * E.g. "idle" | "happy" | "talking"
   */
  pose?: string;
  /** Show solid ground ellipse beneath the mascot. Default: false. */
  floor?: boolean;
}

export default function MascotSlot({
  char,
  src,
  size = 72,
  alt,
  pose: _pose,
  floor = false,
  className = '',
  style,
  ...rest
}: MascotSlotProps) {
  const imgSrc = src ?? (char ? CHAR_SRC[char] : CHAR_SRC.mochi);
  const imgAlt = alt ?? char ?? 'mascot';

  // Ellipse dimensions scale proportionally to match MapPage ratios:
  // grandma ellipse: 78×10 @ size ~80 → ~1.0 × size wide, ~0.125 × size tall
  const ellipseW = Math.round(size * 1.05);
  const ellipseH = Math.max(6, Math.round(size * 0.13));

  return (
    <span
      className={['t-mascot-slot', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...(style ?? {}) }}
      {...rest}
    >
      {floor && (
        <span
          aria-hidden="true"
          className="t-mascot-slot__floor"
          style={{ width: ellipseW, height: ellipseH }}
        />
      )}
      <img
        src={imgSrc}
        alt={imgAlt}
        width={size}
        height={size}
        className="t-mascot-slot__img"
      />
    </span>
  );
}
