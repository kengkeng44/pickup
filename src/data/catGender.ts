/**
 * Cat (Mochi) gender — v2.0.B.25 prep for player-selectable Mochi voice.
 *
 * Player picks male/female via Profile tab. Stored in localStorage.
 * Used by future tts dispatch to pick OpenAI voice:
 *   - 'male'   → 'echo' (warm young male voice)
 *   - 'female' → 'nova' (warm young female voice)
 *   - undefined → 'female' default
 *
 * Mirrors catName.ts / dogName.ts pattern.
 */

const LS_CAT_GENDER = 'pickup.cat-gender';
export type CatGender = 'male' | 'female';
export const DEFAULT_CAT_GENDER: CatGender = 'female';

export function readCatGender(): CatGender {
  if (typeof localStorage === 'undefined') return DEFAULT_CAT_GENDER;
  try {
    const v = localStorage.getItem(LS_CAT_GENDER);
    return v === 'male' || v === 'female' ? v : DEFAULT_CAT_GENDER;
  } catch {
    return DEFAULT_CAT_GENDER;
  }
}

export function writeCatGender(g: CatGender): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(LS_CAT_GENDER, g);
  } catch {
    // ignore
  }
}

/**
 * Map gender to OpenAI TTS voice id. Used by future tts.ts dispatch.
 */
export function voiceForCat(): 'echo' | 'nova' {
  return readCatGender() === 'male' ? 'echo' : 'nova';
}
