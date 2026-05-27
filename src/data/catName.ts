/**
 * Cat name — v1.9.52.
 *
 * Player can customize the calico cat's name. Default 糰糰. Stored in
 * localStorage. Used throughout narration / question text via runtime
 * `applyCatName()` substitution on the {catName} placeholder.
 */

const LS_CAT_NAME = 'pickup.cat-name';
export const DEFAULT_CAT_NAME = '糰糰';
const MAX_LEN = 12;

export function readCatName(): string {
  if (typeof localStorage === 'undefined') return DEFAULT_CAT_NAME;
  try {
    const v = localStorage.getItem(LS_CAT_NAME);
    return v && v.trim() ? v.trim() : DEFAULT_CAT_NAME;
  } catch {
    return DEFAULT_CAT_NAME;
  }
}

export function writeCatName(name: string): string {
  const cleaned = (name ?? '').trim().slice(0, MAX_LEN) || DEFAULT_CAT_NAME;
  if (typeof localStorage === 'undefined') return cleaned;
  try {
    localStorage.setItem(LS_CAT_NAME, cleaned);
  } catch {
    // ignore
  }
  return cleaned;
}

export function resetCatName(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(LS_CAT_NAME);
  } catch {
    // ignore
  }
}

/**
 * Replace {catName} placeholder in arbitrary text with the player's
 * chosen name (or default 糰糰). Used at render time so changing the
 * name re-renders everywhere on next mount.
 */
export function applyCatName(text: string): string {
  if (!text) return text;
  return text.replace(/\{catName\}/g, readCatName());
}
