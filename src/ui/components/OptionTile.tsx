/**
 * 拾光 (Pickup) — OptionTile primitive (design-system v1, v2.0.B.280).
 *
 * The 4-choice answer button used in cloze / listen-mc / emoji-pick.
 * Reproduces the current renderers.tsx OptionBtn look using token classes.
 *
 * States:
 *   idle     → white bg, amber border, dark text — clickable
 *   selected → brand (amber) tint, same border   — user just tapped (pre-reveal)
 *   correct  → success-tint bg, olive border+fg  — right answer revealed
 *   wrong    → danger-tint bg, terracotta border+fg — wrong answer revealed
 *   shown    → surface-alt (cream) bg, muted     — non-selected after reveal
 *
 * All state colours via CSS classes (.t-option-tile, .t-option-tile--*).
 * Label + optional Chinese sub-label mirror OptionBtn in renderers.tsx.
 *
 *   <OptionTile state="idle" onClick={...}>She walks home.</OptionTile>
 *   <OptionTile state="correct" disabled>She walks home.</OptionTile>
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type OptionState = 'idle' | 'selected' | 'correct' | 'wrong' | 'shown';

export interface OptionTileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  state?: OptionState;
  /** Optional Chinese translation shown after reveal. */
  labelZh?: string;
  children: ReactNode;
}

export default function OptionTile({
  state = 'idle',
  labelZh,
  className = '',
  disabled,
  children,
  ...rest
}: OptionTileProps) {
  const cls = [
    't-option-tile',
    `t-option-tile--${state}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={cls}
      disabled={disabled ?? (state !== 'idle' && state !== 'selected')}
      {...rest}
    >
      <span className="t-option-tile__label">{children}</span>
      {labelZh && (
        <span className="t-option-tile__zh" aria-hidden="true">
          {' · '}{labelZh}
        </span>
      )}
    </button>
  );
}
