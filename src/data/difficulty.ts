/**
 * 難度設定 — 單一來源 (v2.0.B.477).
 *
 * `pickup.difficulty` 之前被 4 個檔各自手打 (renderers / SettingsPage /
 * comprehensionMode / onboarding)。集中成一組 accessor, 避免 key 漂移。
 * 值不變 (easy|medium|hard), 預設 medium。
 */

export type Difficulty = 'easy' | 'medium' | 'hard';

const LS_DIFFICULTY = 'pickup.difficulty';

export function readDifficulty(): Difficulty {
  if (typeof localStorage === 'undefined') return 'medium';
  try {
    const v = localStorage.getItem(LS_DIFFICULTY);
    if (v === 'easy' || v === 'hard') return v;
  } catch { /* ignore */ }
  return 'medium';
}

export function writeDifficulty(d: Difficulty): void {
  if (typeof localStorage === 'undefined') return;
  try { localStorage.setItem(LS_DIFFICULTY, d); } catch { /* ignore */ }
}
