/**
 * applyStyle — copy a plain object into an HTMLElement's `style`.
 *
 * Object.assign(el.style, {...}) is the conventional pattern, but TypeScript
 * complains because CSSStyleDeclaration has 500+ required properties. We
 * iterate explicitly with a typed cast that satisfies tsc without lying
 * about runtime semantics.
 */
export function applyStyle(
  el: HTMLElement,
  styles: Record<string, string>
): void {
  const target = el.style as unknown as Record<string, string>;
  for (const key of Object.keys(styles)) {
    target[key] = styles[key];
  }
}

/**
 * attachPressFeedback — v1.9.29 (audit #8).
 *
 * Adds the standard Duolingo "press down" tactile feedback that was
 * open-coded across 6+ files. Two flavors:
 *
 *   attachPressFeedback(btn);                 // depth 2px, no border
 *   attachPressFeedback(btn, 1);              // depth 1px (small icons)
 *   attachPressFeedback(card, {                // 3D-button: nudge + shrink
 *     depth: 2,                                //   the bottom border
 *     borderBottom: { from: 4, to: 2 },
 *   });
 *
 * Callers needing a lock gate (skip feedback while disabled) should not
 * use this helper — open-code with a guard so the press never fires.
 */
export interface PressFeedbackOpts {
  depth?: number;
  borderBottom?: { from: number; to: number };
}

export function attachPressFeedback(
  el: HTMLElement,
  opts: PressFeedbackOpts | number = 2
): void {
  const cfg: PressFeedbackOpts = typeof opts === 'number' ? { depth: opts } : opts;
  const depth = cfg.depth ?? 2;
  const bd = cfg.borderBottom;
  el.addEventListener('pointerdown', () => {
    el.style.transform = `translateY(${depth}px)`;
    if (bd) el.style.borderBottomWidth = `${bd.to}px`;
  });
  const release = () => {
    el.style.transform = '';
    if (bd) el.style.borderBottomWidth = `${bd.from}px`;
  };
  el.addEventListener('pointerup', release);
  el.addEventListener('pointerleave', release);
  el.addEventListener('pointercancel', release);
}
