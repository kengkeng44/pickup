/**
 * v2.0.B.235 — Story tag taxonomy (Phase 1 AI recommendation engine).
 *
 * Per-chapter multi-tag metadata. Three orthogonal axes:
 *
 *   - theme        — narrative substance (神話 / 寓言 / 民俗 / 中華 ...)
 *   - mood         — emotional register (黑暗 / 詩意 / 自我認同 / 情緒 ...)
 *   - protagonist  — character properties (男主 / 女主 / 動物 / 鳥 ...)
 *
 * Used by:
 *   - src/data/storyRecommend.ts — rule-based recommendation engine
 *   - src/data/userProfile.ts    — infer preferredTags from completed chapters
 *
 * Chapter numbering follows the live app (CHAPTER_META in MapPage.tsx):
 *   Ch1 院子裡的第一個故事 (meta-anchor, optional tag set)
 *   Ch2 桃太郎
 *   Ch3 醜小鴨
 *   Ch4 龜兔賽跑
 *   Ch5 駱駝為什麼有駝峰
 *   Ch6 Baba Yaga 雞腳屋
 *   Ch7 六隻天鵝
 *   Ch8 葉限
 *
 * Hook association comes from src/data/lessonHooks.ts (B1-B6 framework).
 */
import { LESSON_HOOKS } from './lessonHooks';
import type { AbilityLevel } from './userProfile';

export type StoryTagAxis = 'theme' | 'mood' | 'protagonist';

export interface StoryTag {
  /** stable id, lowercase ascii, used in scoring */
  id: string;
  /** which axis the tag lives on */
  axis: StoryTagAxis;
  /** display label */
  zh: string;
  en: string;
}

/** Canonical tag dictionary. id is the source-of-truth for set ops. */
export const TAGS: Record<string, StoryTag> = {
  // theme axis
  myth:        { id: 'myth',        axis: 'theme',       zh: '神話',       en: 'Myth' },
  fable:       { id: 'fable',       axis: 'theme',       zh: '寓言',       en: 'Fable' },
  folklore:    { id: 'folklore',    axis: 'theme',       zh: '民俗',       en: 'Folklore' },
  chinese:     { id: 'chinese',     axis: 'theme',       zh: '中華',       en: 'Chinese' },
  cinderella:  { id: 'cinderella',  axis: 'theme',       zh: '灰姑娘',     en: 'Cinderella' },
  adventure:   { id: 'adventure',   axis: 'theme',       zh: '冒險',       en: 'Adventure' },
  workLesson:  { id: 'workLesson',  axis: 'theme',       zh: '工作',       en: 'Work lesson' },
  dialogue:    { id: 'dialogue',    axis: 'theme',       zh: '對話多',     en: 'Dialogue-heavy' },
  metaFrame:   { id: 'metaFrame',   axis: 'theme',       zh: '故事框',     en: 'Meta frame' },
  // mood axis
  dark:        { id: 'dark',        axis: 'mood',        zh: '黑暗',       en: 'Dark' },
  poetic:      { id: 'poetic',      axis: 'mood',        zh: '詩意',       en: 'Poetic' },
  silent:      { id: 'silent',      axis: 'mood',        zh: '沉默',       en: 'Silent' },
  emotional:   { id: 'emotional',   axis: 'mood',        zh: '情緒',       en: 'Emotional' },
  selfIdentity:{ id: 'selfIdentity',axis: 'mood',        zh: '自我認同',   en: 'Self-identity' },
  cunning:     { id: 'cunning',     axis: 'mood',        zh: '智取',       en: 'Cunning' },
  magical:     { id: 'magical',     axis: 'mood',        zh: '神奇',       en: 'Magical' },
  warm:        { id: 'warm',        axis: 'mood',        zh: '溫暖',       en: 'Warm' },
  // protagonist axis
  male:        { id: 'male',        axis: 'protagonist', zh: '男主',       en: 'Male lead' },
  female:      { id: 'female',      axis: 'protagonist', zh: '女主',       en: 'Female lead' },
  animal:      { id: 'animal',      axis: 'protagonist', zh: '動物',       en: 'Animal' },
  bird:        { id: 'bird',        axis: 'protagonist', zh: '鳥',         en: 'Bird' },
  ensemble:    { id: 'ensemble',    axis: 'protagonist', zh: '群像',       en: 'Ensemble' },
};

export type TagId = keyof typeof TAGS;

export interface ChapterTags {
  chapter: number;
  /** human label for debugging only (not localized for UI) */
  story: string;
  /** mixed-axis tag id list */
  tags: TagId[];
}

/**
 * Per-chapter tag map. Numbers match the live CHAPTER_META in MapPage.tsx.
 * Ch1 is the meta-anchor frame (奶奶 + Mochi + Hana) — given a light tag
 * set so cold-start recommendation can still surface it without dominating.
 *
 * v2.0.B.237: Ch0 ground floor (零基礎 ABC / 數字 / 顏色 / 動物 / 家庭 /
 * 問候 / 簡單句) added. Warm / animal tags so cold-start surfaces it.
 */
export const STORY_TAGS: Record<number, ChapterTags> = {
  0: {
    chapter: 0,
    story: 'Ground floor (零基礎 ABC + 數字 + 顏色)',
    tags: ['metaFrame', 'warm', 'animal'],
  },
  1: {
    chapter: 1,
    story: '院子裡的第一個故事 (frame)',
    tags: ['metaFrame', 'warm', 'animal', 'female'],
  },
  2: {
    chapter: 2,
    story: '桃太郎',
    tags: ['myth', 'animal', 'adventure', 'male'],
  },
  3: {
    chapter: 3,
    story: '醜小鴨',
    tags: ['animal', 'selfIdentity', 'emotional', 'bird'],
  },
  4: {
    chapter: 4,
    story: '龜兔賽跑',
    tags: ['animal', 'fable', 'dialogue'],
  },
  5: {
    chapter: 5,
    story: '駱駝為什麼有駝峰',
    tags: ['animal', 'fable', 'workLesson'],
  },
  6: {
    chapter: 6,
    story: 'Baba Yaga 雞腳屋',
    tags: ['dark', 'folklore', 'female', 'cunning'],
  },
  7: {
    chapter: 7,
    story: '六隻天鵝',
    tags: ['poetic', 'silent', 'female', 'bird'],
  },
  8: {
    chapter: 8,
    story: '葉限',
    tags: ['chinese', 'cinderella', 'female', 'magical'],
  },
};

// ─── Hook → Chapter index (from lessonHooks.ts) ────────────────────────────
//
// lessonHooks.ts numbers chapters by STORY index (kt-ch1 = 桃太郎). The live
// app shifts these +1 (Ch1 = meta-anchor). We translate to UI chapter ids so
// the recommendation engine speaks the same number as MapPage/CHAPTER_META.

/** B1-B6 hook types (primary, ignore + or "open" suffix in compound ids). */
export type HookType = 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6';

const ALL_HOOK_TYPES: HookType[] = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'];

function primaryHookOf(raw: string): HookType | null {
  // 'B4+B3' → 'B4', 'B2 big' → 'B2', 'B6 open' → 'B6'
  const m = raw.match(/B[1-6]/);
  return (m?.[0] as HookType) ?? null;
}

/** Map storyHooks (kt-ch1..7) to UI chapter (Ch2..8). Ch1 has no hooks. */
function lessonHookChapterToUiChapter(hookChapter: number): number {
  return hookChapter + 1;
}

/**
 * Per-UI-chapter tally of hook types appearing in that chapter's lessons.
 * E.g. UI Ch2 (桃太郎) has 7 lessons; counts the primary type of each.
 */
export const CHAPTER_HOOK_COUNTS: Record<number, Record<HookType, number>> = (() => {
  const out: Record<number, Record<HookType, number>> = {};
  // v2.0.B.237: Ch0 (ground floor) seeded with zero hooks — ground floor is
  // pure vocab/认读 練習, no Chapter-level narrative hooks apply.
  for (let ch = 0; ch <= 8; ch++) {
    const init: Record<HookType, number> = { B1: 0, B2: 0, B3: 0, B4: 0, B5: 0, B6: 0 };
    out[ch] = init;
  }
  for (const [lessonId, hook] of Object.entries(LESSON_HOOKS)) {
    // lessonId format: kt-ch{N}-l{M}
    const m = lessonId.match(/^kt-ch(\d+)-l\d+$/);
    if (!m) continue;
    const hookChapter = Number(m[1]);
    const uiChapter = lessonHookChapterToUiChapter(hookChapter);
    if (uiChapter < 1 || uiChapter > 8) continue;
    const primary = primaryHookOf(hook.type);
    if (!primary) continue;
    out[uiChapter][primary] = (out[uiChapter][primary] ?? 0) + 1;
  }
  return out;
})();

/** Used by tests + engine — full list of supported hook types. */
export function listHookTypes(): HookType[] {
  return [...ALL_HOOK_TYPES];
}

export function getChapterTags(chapter: number): ChapterTags | undefined {
  return STORY_TAGS[chapter];
}

/** All defined chapter numbers (sorted). */
export function listChapters(): number[] {
  return Object.keys(STORY_TAGS).map(Number).sort((a, b) => a - b);
}

export interface ChapterInfo {
  chapter: number;
  story: string;
  tags: TagId[];
  /** primary hook type counts within the chapter */
  hookCounts: Record<HookType, number>;
}

/**
 * Default candidate pool builder — joins STORY_TAGS + CHAPTER_HOOK_COUNTS
 * into the shape the engine consumes.
 */
export function defaultCandidatePool(): ChapterInfo[] {
  return listChapters().map((ch) => ({
    chapter: ch,
    story: STORY_TAGS[ch].story,
    tags: STORY_TAGS[ch].tags,
    hookCounts: CHAPTER_HOOK_COUNTS[ch] ?? { B1: 0, B2: 0, B3: 0, B4: 0, B5: 0, B6: 0 },
  }));
}

// ─── v2.0.B.237: CEFR-aligned per-chapter difficulty ────────────────────────
//
// Chapter difficulty for ability-adaptive filtering in storyRecommend.ts.
// A0 = pre-A1 only (Ch0 ground floor).
// A2 = standard 8-12 ELT童話 listening + vocab (Ch1-Ch6, Ch8-Ch9).
// A2+ = higher cognitive load (六天鵝 詩意 + 沉默, sustained inference at A2 vocab).
//
// NOTE: keyed on **live UI chapter numbering** matching STORY_TAGS above:
//   Ch1 = meta-frame, Ch2 = 桃太郎, Ch3 = 醜小鴨, Ch4 = 龜兔, Ch5 = 駱駝,
//   Ch6 = Baba Yaga, Ch7 = 六天鵝, Ch8 = 葉限. Ch9 (三隻小豬 / 灰姑娘) reserved
//   for upcoming ships.
//
// Ch5 (駱駝) stays A2 — fable is short + concrete. Ch6 (Baba Yaga) stays A2
// (dark mood but linear plot, gateway for A2 readers ready for darker themes).
// Ch7 (六天鵝) bumped to A2+ for sparse poetic narration.
export const CHAPTER_DIFFICULTY: Record<number, AbilityLevel> = {
  0: 'A0',  // Ground floor — 零基礎
  1: 'A2',  // 院子裡的第一個故事 (meta-frame)
  2: 'A2',  // 桃太郎
  3: 'A2',  // 醜小鴨
  4: 'A2',  // 龜兔賽跑
  5: 'A2',  // 駱駝為什麼有駝峰
  6: 'A2',  // Baba Yaga 雞腳屋 (黑暗主題, 線性情節 ok)
  7: 'A2+', // 六隻天鵝 (詩意 / 沉默 narration)
  8: 'A2',  // 葉限
  9: 'A2',  // 三隻小豬 / 灰姑娘 (即將 ship)
};

/** Return CEFR difficulty for a chapter; defaults to A2 if unmapped. */
export function getChapterDifficulty(chapter: number): AbilityLevel {
  return CHAPTER_DIFFICULTY[chapter] ?? 'A2';
}
