// v2.0.B.286: shared lesson resume-progress helpers (cron walk P0-2 P1).
// Core resume persistence already shipped in B.272 (LessonPage writes
// {idx,history,log} to `pickup.lesson.resume.ch{chapter}.{lessonId}` per
// answer, restores on load, clears on completion). This module extracts the
// key + read helpers so the MAP can mark "in-progress" nodes (未開始 / 進行中 /
// 完成). Template `ch${chapter}` coerces string ('1') and number (1) the same,
// so the LessonPage writer (chapter as string from useParams) and the map
// reader (chapter as number) hit the same key.
const PREFIX = 'pickup.lesson.resume.';

export function lessonResumeKey(chapter?: string | number, lessonId?: string): string {
  return `${PREFIX}ch${chapter ?? '?'}.${lessonId ?? '?'}`;
}

export function readSavedIdx(chapter?: string | number, lessonId?: string): number {
  try {
    const raw = localStorage.getItem(lessonResumeKey(chapter, lessonId));
    if (!raw) return 0;
    const s = JSON.parse(raw) as { idx?: number };
    return typeof s.idx === 'number' && s.idx > 0 ? s.idx : 0;
  } catch { return 0; }
}

export function hasInProgress(chapter?: string | number, lessonId?: string): boolean {
  return readSavedIdx(chapter, lessonId) > 0;
}

export function clearSavedProgress(chapter?: string | number, lessonId?: string): void {
  try { localStorage.removeItem(lessonResumeKey(chapter, lessonId)); } catch {}
}

// One-pass scan of all resume keys → Set of lessonIds with saved idx > 0.
// Lets the map derive in-progress state with a single localStorage walk
// instead of one read per node (B.275 perf: avoid 217× per render).
export function getInProgressLessonIds(): Set<string> {
  const out = new Set<string>();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith(PREFIX)) continue;
      const raw = localStorage.getItem(k);
      if (!raw) continue;
      let idx = 0;
      try { idx = (JSON.parse(raw) as { idx?: number }).idx ?? 0; } catch { continue; }
      if (idx > 0) {
        const m = k.match(/^pickup\.lesson\.resume\.ch[^.]*\.(.+)$/);
        if (m) out.add(m[1]);
      }
    }
  } catch {}
  return out;
}
