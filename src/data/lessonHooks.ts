/**
 * v2.0.B.221 — Per-lesson hook metadata (emotional peak cut framework).
 *
 * Source-of-truth mirror: tools/_content-db.cjs HOOK_MAP.
 * Theory: docs/research/chapter-ending-hook-design.md.
 * Skill: ~/.claude/skills/narrative-cut-analyst/SKILL.md.
 *
 * Hook framework (B1-B6):
 *   B1 物理懸念 / B2 情緒翻轉 / B3 資訊缺口
 *   B4 期待加速 / B5 道德兩難 / B6 預言種子
 *
 * Used by:
 *   - LessonScene._showLessonStats() — render inquiry microcopy above Continue
 *   - PostHog LESSON_COMPLETE event — hook_type tag for A/B analytics
 */
export interface LessonHook {
  type: string;        // B1-B6 (may be compound like 'B4+B3')
  inquiry: string;     // inquiry-terminating question (zh)
  inquiryEn?: string;  // optional english version (currently zh-only per A2 audience)
}

export const LESSON_HOOKS: Record<string, LessonHook> = {
  // Ch1 桃太郎 (v6 emotional peak cut applied B.220)
  'kt-ch1-l1': { type: 'B3',        inquiry: '那大紅色的是什麼?' },
  'kt-ch1-l2': { type: 'B4+B3',     inquiry: '桃子裡是什麼?' },
  'kt-ch1-l3': { type: 'B5+B2',     inquiry: '父母會讓他走嗎?' },
  'kt-ch1-l4': { type: 'B4',        inquiry: '狗會跟他?還有誰?' },
  'kt-ch1-l5': { type: 'B6+B1',     inquiry: '島上為何安靜?是埋伏?' },
  'kt-ch1-l6': { type: 'B2',        inquiry: '鬼王怎知他名字?' },
  'kt-ch1-l7': { type: 'B6 open',   inquiry: '口袋還留一顆糰子 — 還有下一段?' },
  // Ch2-7 待 narrative-cut-analyst skill 重切 (B.222+)
};

export function getLessonHook(lessonId: string): LessonHook | null {
  return LESSON_HOOKS[lessonId] ?? null;
}
