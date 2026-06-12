/**
 * 拾光 (Pickup) — ProgressBar primitive (design-system v1, v2.0.B.280).
 *
 * Olive fill + inset top highlight. Spring-eased width transition.
 * Reproduces the LessonPage.tsx progress track look using token classes.
 *
 * Width is the only dynamic value → minimal inline style on the fill div.
 * Everything else (colours, radius, height, highlight) lives in .t-progress-*.
 *
 *   <ProgressBar value={3} max={10} />
 *   <ProgressBar value={idx + 1} max={lesson.questions.length} aria-label="Lesson progress" />
 */
import type { HTMLAttributes } from 'react';

export interface ProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Current progress value (≥ 0). */
  value: number;
  /** Maximum value (must be > 0). */
  max: number;
  /** Minimum displayed width so the bar is always visible at step 1. Default: 4%. */
  minPercent?: number;
}

export default function ProgressBar({
  value,
  max,
  minPercent = 4,
  className = '',
  'aria-label': ariaLabel = 'Progress',
  ...rest
}: ProgressBarProps) {
  const pct = max > 0 ? Math.max(minPercent, (value / max) * 100) : minPercent;

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      className={['t-progress', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {/* Fill width is dynamic — inline style only for this one value. */}
      <div
        className="t-progress__fill"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
