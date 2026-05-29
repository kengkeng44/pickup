/**
 * Dog name — v2.0.A.8.
 *
 * Player can customize Hana (the shiba dog)'s name. Default Hana (English
 * by user request, parallel to Mochi cat naming). Stored in localStorage.
 * Used throughout narration / question text via runtime `applyDogName()`
 * substitution on the {dogName} placeholder.
 *
 * Mirrors `catName.ts` pattern.
 */

const LS_DOG_NAME = 'pickup.dog-name';
export const DEFAULT_DOG_NAME = 'Hana';
const MAX_LEN = 12;

export function readDogName(): string {
  if (typeof localStorage === 'undefined') return DEFAULT_DOG_NAME;
  try {
    const v = localStorage.getItem(LS_DOG_NAME);
    return v && v.trim() ? v.trim() : DEFAULT_DOG_NAME;
  } catch {
    return DEFAULT_DOG_NAME;
  }
}

export function writeDogName(name: string): string {
  const cleaned = (name ?? '').trim().slice(0, MAX_LEN) || DEFAULT_DOG_NAME;
  if (typeof localStorage === 'undefined') return cleaned;
  try {
    localStorage.setItem(LS_DOG_NAME, cleaned);
  } catch {
    // ignore
  }
  return cleaned;
}

export function resetDogName(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(LS_DOG_NAME);
  } catch {
    // ignore
  }
}

/**
 * Replace {dogName} placeholder in arbitrary text with the player's
 * chosen name (or default Hana). Used at render time so changing the
 * name re-renders everywhere on next mount.
 */
export function applyDogName(text: string): string {
  if (!text) return text;
  return text.replace(/\{dogName\}/g, readDogName());
}
