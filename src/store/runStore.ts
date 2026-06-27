// ============================================================
// v2.0 — per-lesson progress within chapter
// Key: pickup.chapter.{N}.lessons.completed = JSON array of lessonId strings
//
// v2.0.B.475: 砍掉舊 v1.x cloze run-store (Zustand useRunStore + free/scenario/
// story 跑題狀態機 ~530 行) — 已無任何 live 引用 (ProfilePage 改讀 data/streak)。
// 本檔現在只剩「章內 lesson 進度」這組純 localStorage helper。
// ============================================================

const LS_LESSON_PROGRESS = (ch: number) =>
  `pickup.chapter.${ch}.lessons.completed`;

export function readCompletedLessons(chapter: number): Set<string> {
  if (typeof localStorage === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(LS_LESSON_PROGRESS(chapter));
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function markLessonCompleted(chapter: number, lessonId: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const current = readCompletedLessons(chapter);
    current.add(lessonId);
    localStorage.setItem(
      LS_LESSON_PROGRESS(chapter),
      JSON.stringify([...current])
    );
  } catch {
    // localStorage write failure — boot.ts v1.9.48 already shows red banner
  }
}

export function isLessonUnlocked(
  // 保留 signature 兼容呼叫端 (MapPage)
  _chapter: number,
  lessonInChapter: number,
  totalCompleted: number
): boolean {
  // v2.0.B.473 (per user「還沒解鎖的要是灰色的」+「第一章一三節容易出問題」):
  // 還原「章內循序解鎖」(Duolingo model)。B.262 的全 free-select 會讓人跳關
  // (做了 L1 又跳做 L3, L2 留中間 → 看起來壞掉), 且沒有「鎖」概念 → 灰色節點消失。
  // 第 1 關永遠解鎖 (1 <= 0+1); 完成 k 關後第 k+1 關解鎖, 其餘灰鎖。
  // 循序完成保證 completed = 前綴 {L1..Lk}, 用 count 判斷即正確。
  return lessonInChapter <= totalCompleted + 1;
}
