/**
 * v2.0.B.232 (2026-06-06) — Notification copy lookup table.
 *
 * Source: docs/research/notification-design.md § B1 (verbatim where possible).
 * Voice rules:
 *   - Third-person narrator (奶奶 / Mochi / Hana)
 *   - Bilingual (zh first, en second)
 *   - Inquiry-driven endings (Bell HIP)
 *   - No deadline / guilt / streak-break pressure
 *   - No emoji in question/option fields (CLAUDE.md feedback rule)
 *
 * Chapter-specific variants cover Ch1-Ch8. Generic variants apply when
 * ctx.chapter is null or no chapter-specific entry exists.
 */
import type { NotifKind, NotifCopy } from './types';

export const COPY: Record<NotifKind, NotifCopy[]> = {
  // ──────────────────────────────────────────────────────────────────
  // Type 1 · 故事中斷續讀 (P0 highest ROI)
  // 8 chapter variants per research § B1 Type 1
  // ──────────────────────────────────────────────────────────────────
  'unfinished-story': [
    { chapter: 1, hookType: 'B3',
      zh: '奶奶把書翻到一半就睡著了。Mochi 在牆上等你',
      en: 'Grandma fell asleep mid-sentence. Mochi is still listening.' },
    { chapter: 2, hookType: 'B3',
      zh: '老婆婆河邊看見一個紅紅大大的東西',
      en: 'An old woman saw something pink in the river.' },
    { chapter: 3, hookType: 'B2',
      zh: '鴨爸鴨媽還沒看到他變天鵝。要繼續嗎?',
      en: "The ducklings haven't seen him fly yet." },
    { chapter: 4, hookType: 'B6',
      zh: '兔子才剛閉上眼睛。烏龜還在走',
      en: 'The hare just closed his eyes. The tortoise keeps walking.' },
    { chapter: 5, hookType: 'B1',
      zh: '駱駝的背還沒變。Djinn 在沙塵裡',
      en: "The camel's back hasn't changed yet. The Djinn waits in the dust." },
    { chapter: 6, hookType: 'B1',
      zh: '雞腳屋還在動。她還沒走進去',
      en: 'The chicken-legged house is still moving. She has not gone in.' },
    { chapter: 7, hookType: 'B2',
      zh: '六件白衣還沒織完。她一句話都不能說',
      en: 'Six white shirts are not finished. She still cannot speak.' },
    { chapter: 8, hookType: 'B1',
      zh: '葉限的金鞋還沒有出現',
      en: "Yexian's golden shoe hasn't appeared yet." },
  ],

  // ──────────────────────────────────────────────────────────────────
  // Type 2 · 跨章 cliffhanger (chapter just completed)
  // 7 transition variants Ch1→2 ... Ch7→8
  // ──────────────────────────────────────────────────────────────────
  'cross-chapter-hook': [
    { chapter: 1, hookType: 'B3',
      zh: '今晚奶奶要講「河邊的大桃子」',
      en: 'Tonight grandma starts: "Something pink in the river."' },
    { chapter: 2, hookType: 'B2',
      zh: '今晚的故事關於一隻不一樣的小鴨',
      en: 'Tonight: a duckling who looks different.' },
    { chapter: 3, hookType: 'B4',
      zh: '今晚奶奶要說烏龜跟兔子賽跑',
      en: 'Tonight: a tortoise races a hare.' },
    { chapter: 4, hookType: 'B3',
      zh: '今晚的問題:駱駝為什麼有駝峰?',
      en: 'Tonight: why does the camel have a hump?' },
    { chapter: 5, hookType: 'B1',
      zh: '今晚要進森林深處,雞腳屋等著',
      en: 'Tonight: deep in the forest, a house on chicken legs.' },
    { chapter: 6, hookType: 'B2',
      zh: '今晚奶奶要說一個不能說話的女孩',
      en: 'Tonight: a girl who is not allowed to speak.' },
    { chapter: 7, hookType: 'B6',
      zh: '最後一夜,葉限的故事還沒講完',
      en: "The last night. Yexian's story isn't done." },
  ],

  // ──────────────────────────────────────────────────────────────────
  // Type 3 · Mochi 跳牆 daily ritual (generic, chapter-agnostic)
  // 5 rotation variants per research § B1 Type 3
  // ──────────────────────────────────────────────────────────────────
  'mochi-daily-ritual': [
    { zh: 'Mochi 跳牆了。今晚要不要聽?',
      en: 'Mochi just jumped the wall. Story time?' },
    { zh: 'Hana 趴在奶奶腳邊。Mochi 還在外面',
      en: "Hana is at grandma's feet. Mochi is still outside." },
    { zh: '矮牆上有一隻三花貓。奶奶開書了',
      en: 'A calico cat on the low wall. Grandma opens the book.' },
    { zh: '奶奶的燈亮了。Mochi 蹲在窗外',
      en: "Grandma's lamp is on. Mochi waits at the window." },
    { zh: 'Hana 搖尾巴等你。今晚的故事很短',
      en: "Hana is wagging. Tonight's story is short." },
  ],

  // ──────────────────────────────────────────────────────────────────
  // Type 4 · SRS 弱項溫柔提醒 (Mochi 「記得」voice, no TOEIC framing)
  // 3 generic variants per research § B1 Type 4
  // ──────────────────────────────────────────────────────────────────
  'srs-weak-word': [
    { zh: 'Mochi 還記得你上次卡在哪。今晚一起翻過去?',
      en: 'Mochi remembers where you got stuck. Want to try again?' },
    { zh: '奶奶把昨天的字寫在小卡上。要看看嗎?',
      en: "Grandma wrote yesterday's words on small cards." },
    { zh: 'Hana 把昨晚漏的字咬回來給你',
      en: "Hana brought back yesterday's words." },
  ],

  // ──────────────────────────────────────────────────────────────────
  // Type 5 · Milestone celebration (offline only — in-app uses confetti)
  // 8 chapter completion + 3 streak generic
  // ──────────────────────────────────────────────────────────────────
  'milestone': [
    // streak milestones (chapter undefined = generic)
    { zh: '30 天連續夜晚。奶奶要在書扉頁寫上你的名字',
      en: '30 nights in a row. Grandma will write your name in the book.' },
    { zh: '100 個夜晚。Mochi 把貓掌印留在桃花樹下',
      en: '100 nights. Mochi leaves a paw print under the peach tree.' },
    { zh: '一整年的夜晚。奶奶說這本書是給你的',
      en: 'A whole year of nights. Grandma says this book is yours.' },
    // chapter completion variants
    { chapter: 1, zh: '雨夜的故事陪奶奶說完了。下一頁是桃太郎',
      en: 'You finished the rainy night. Next: a peach in the river.' },
    { chapter: 2, zh: '桃太郎那章, 你陪奶奶說完了。下一頁是醜小鴨',
      en: 'You finished Momotaro with grandma. Next: a different duckling.' },
    { chapter: 3, zh: '醜小鴨變天鵝了。下一頁是烏龜跟兔子',
      en: 'The duckling flew. Next: a tortoise and a hare.' },
    { chapter: 4, zh: '烏龜走到終點了。下一頁是駱駝的駝峰',
      en: 'The tortoise won. Next: a camel and a hump.' },
    { chapter: 5, zh: '駱駝接受了背上的事。下一頁要進森林',
      en: 'The camel carries his weight. Next: into the forest.' },
    { chapter: 6, zh: 'Baba Yaga 放她走了。下一頁是六隻天鵝',
      en: 'Baba Yaga let her go. Next: six swans.' },
    { chapter: 7, zh: '六件白衣織完了。下一頁是葉限的金鞋',
      en: 'Six white shirts are finished. Next: a golden shoe.' },
    { chapter: 8, zh: '葉限的故事說完了。奶奶把書合上',
      en: "Yexian's story is told. Grandma closes the book." },
  ],

  // ──────────────────────────────────────────────────────────────────
  // Type 6 · Weekly recap (Sunday 20:00)
  // 2 generic templates; dynamic fields filled at trigger time
  // ──────────────────────────────────────────────────────────────────
  'weekly-recap': [
    { zh: '這週你陪奶奶讀了幾個夜晚。她記得',
      en: 'You sat with grandma a few nights this week. She remembers.' },
    { zh: '下週奶奶要翻到新的一頁',
      en: 'Next week grandma turns to a new page.' },
  ],

  // ──────────────────────────────────────────────────────────────────
  // Type 7 · Soft win-back (lapse >= 14d, two A/B variants per research)
  // ──────────────────────────────────────────────────────────────────
  'soft-winback': [
    // A — emotional
    { zh: '奶奶把書放在桌上。Mochi 偶爾還會跳上牆。書會等你',
      en: 'Grandma left the book on the table. Mochi still visits sometimes.' },
    // B — Duolingo reverse-psychology
    { zh: '這是最後一封提醒。如果你還想聽故事, 它一直在這',
      en: 'This is the last reminder. The story stays here, if you ever come back.' },
  ],
};

/**
 * Pick a variant for the given kind + chapter context.
 * - Prefers chapter-matching variant if any exist
 * - Falls back to generic (chapter == undefined) entries
 * - seed-deterministic rotation (so same trigger time = same copy)
 */
export function pickVariant(
  kind: NotifKind,
  ctx: { chapter?: number | null; seed?: number } = {}
): NotifCopy {
  const pool = COPY[kind];
  if (pool.length === 0) {
    // Should be unreachable — table is statically populated above.
    return { zh: '', en: '' };
  }

  const chapter = ctx.chapter ?? null;
  const chapterMatches = chapter == null
    ? []
    : pool.filter(v => v.chapter === chapter);
  const generics = pool.filter(v => v.chapter === undefined);

  const candidates = chapterMatches.length > 0 ? chapterMatches : (generics.length > 0 ? generics : pool);
  const seed = ctx.seed ?? Date.now();
  const idx = Math.abs(seed) % candidates.length;
  return candidates[idx]!;
}
