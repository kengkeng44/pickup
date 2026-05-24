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
