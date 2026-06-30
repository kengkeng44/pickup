#!/usr/bin/env node
/**
 * gen-exam-lessons.mjs — 字表驅動的英檢題目產生器 (v2.0.B.519)
 *
 * 拿一份 A1/A2 字表 (tools/wordlists/*.json, 每筆 {en,zh,ja,ko,emoji,cefr,theme})
 * → 產出「看圖打字 (type-translate) + 中英配對 (tap-pairs)」的英檢章 lessons,
 *   + 自動產 ja/ko overlay (lessons-i18n/)。
 *
 * 為什麼 deterministic (不用 LLM): vocab 看圖打字 / 配對 題的所有欄位都能從字表 row
 * 直接組出來 (emoji + 中文詞 + 英文答案), 不需要創意 → 100% 可程式化, 零 give-away
 * (MC 類的 X2/X8/X48 lint 不適用這兩種題型), 且加字 → 重跑 → 內容+翻譯自動長出來。
 *
 * 合法性: 只用「字 + 等級 + 主題」這種事實資料 (字表範圍取自公開的 YLE/GEPT 主題),
 * 全部題目都是本地組出的原創 item, 不收錄任何真題。
 *
 * 用法:
 *   node tools/gen-exam-lessons.mjs <wordlist.json> <chapter> "<titleZh>" "<titleEn>" <theme1,theme2,...>
 * 例:
 *   node tools/gen-exam-lessons.mjs tools/wordlists/exam-vocab-a1a2.json 34 "字表挑戰 A1" "Wordlist A1" animals,colours,numbers,family,body,food,drink
 *
 * 輸出:
 *   public/lessons-ch<N>.json
 *   public/lessons-i18n/ch<N>-ja.json
 *   public/lessons-i18n/ch<N>-ko.json
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const [wlPath, chapterArg, titleZh, titleEn, themesArg] = process.argv.slice(2);
if (!wlPath || !chapterArg || !titleZh || !titleEn || !themesArg) {
  console.error('用法: node tools/gen-exam-lessons.mjs <wordlist.json> <chapter> "<titleZh>" "<titleEn>" <t1,t2,...>');
  process.exit(1);
}
const chapter = Number(chapterArg);
const themes = themesArg.split(',').map((s) => s.trim()).filter(Boolean);

const words = JSON.parse(readFileSync(resolve(repoRoot, wlPath), 'utf-8'));
const byTheme = new Map();
for (const w of words) {
  if (!byTheme.has(w.theme)) byTheme.set(w.theme, []);
  byTheme.get(w.theme).push(w);
}

const THEME_NAME = {
  animals: ['🐾 動物', 'Animals'], colours: ['🎨 顏色', 'Colours'], numbers: ['🔢 數字', 'Numbers'],
  family: ['👨‍👩‍👧 家庭', 'Family'], body: ['✋ 身體', 'Body'], food: ['🍎 食物', 'Food'],
  drink: ['🥤 飲料', 'Drinks'], clothes: ['👕 衣服', 'Clothes'], toys: ['🧸 玩具', 'Toys'],
  classroom: ['🎒 教室', 'Classroom'], home: ['🏠 家裡', 'Home'], nature: ['🌳 大自然', 'Nature'],
};

// 不加複數/冠詞的主題 (數字/顏色加 "a five"/"the red" 很怪 → 只收原字 + 冠詞變體當 accept)
const NO_PLURAL = new Set(['numbers', 'colours']);
function acceptFor(en, theme) {
  const a = [`a ${en}`, `the ${en}`];
  if (!NO_PLURAL.has(theme) && /^[a-z]+$/.test(en)) a.push(`${en}s`);
  return [...new Set(a)];
}

const lessons = [];
const ovJa = {};
const ovKo = {};

themes.forEach((theme, ti) => {
  const pool = (byTheme.get(theme) || []).slice();
  if (pool.length < 4) { console.error(`⚠️ theme "${theme}" 字數 < 4, 跳過`); return; }
  const lessonNum = ti + 1;
  const [nameZh] = THEME_NAME[theme] || [`📚 ${theme}`, theme];
  const lid = `kt-ch${chapter}-l${lessonNum}`;
  const isLast = ti === themes.length - 1;
  const qs = [];

  // 1) 旁白 intro (繁中 base + ja/ko overlay)
  const introId = `${lid}-intro`;
  qs.push({
    type: 'narration', id: introId, level: 'A1', difficulty: 'easy', speaker: 'grandma',
    sentence: `Let's learn some ${(THEME_NAME[theme] || ['', theme])[1].toLowerCase()} words. Look and type!`,
    sentenceZh: `我們來學「${nameZh.replace(/^\S+\s/, '')}」的單字。看圖打字!`,
    explanationZh: '奶奶說:看著圖記單字最牢,打出來更記得住喔。',
    tags: ['exam', 'wordlist', `ch${chapter}`, theme, 'intro'],
  });
  ovJa[introId] = { s: '絵を見て、英語の言葉を打ってみましょうね。', e: 'おばあちゃん:絵を見ながら覚えると、しっかり身につくのよ。' };
  ovKo[introId] = { s: '그림을 보고 영어 단어를 입력해 보렴.', e: '할머니: 그림을 보면서 외우면 더 잘 기억된단다.' };

  // 2) 看圖打字 (type-translate) — 每字一題 (上限 6)
  const tt = pool.slice(0, 12);
  tt.forEach((w, i) => {
    const qid = `${lid}-q${i + 1}`;
    qs.push({
      type: 'type-translate', id: qid,
      level: w.cefr === 'A2' ? 'A2' : 'A1', difficulty: w.cefr === 'A2' ? 'medium' : 'easy',
      imageEmoji: w.emoji, sentence: w.zh, sentenceZh: w.zh,
      answer: w.en, accept: acceptFor(w.en, theme),
      explanationZh: `「${w.zh}」的英文是 ${w.en}。`,
      tags: ['exam', 'wordlist', `ch${chapter}`, theme, 'vocab', 'type'],
    });
    ovJa[qid] = { s: w.ja, e: `${w.ja} = ${w.en} だよ。` };
    ovKo[qid] = { s: w.ko, e: `${w.ko} = ${w.en}.` };
  });

  // 3) 中英配對 (tap-pairs) — 取 4 字
  const pp = pool.slice(0, 4);
  const pairId = `${lid}-q${tt.length + 1}`;
  qs.push({
    type: 'tap-pairs', id: pairId, level: 'A1', difficulty: 'easy',
    sentence: 'Match the words.',
    pairs: pp.map((w) => ({ left: w.zh, right: w.en })),
    explanationZh: `字彙配對:${pp.map((w) => `${w.zh} ${w.en}`).join('、')}。`,
    tags: ['exam', 'wordlist', `ch${chapter}`, theme, 'vocab'],
  });
  ovJa[pairId] = { p: pp.map((w) => w.ja), e: `配対:${pp.map((w) => `${w.ja} = ${w.en}`).join('、')}。` };
  ovKo[pairId] = { p: pp.map((w) => w.ko), e: `짝 맞추기: ${pp.map((w) => `${w.ko} = ${w.en}`).join(', ')}.` };

  lessons.push({
    id: lid, chapter, lessonInChapter: lessonNum,
    segmentType: isLast ? 'review' : 'main-story',
    lessonName: nameZh,
    questions: qs,
  });
});

const out = resolve(repoRoot, `public/lessons-ch${chapter}.json`);
writeFileSync(out, JSON.stringify(lessons, null, 2) + '\n');
writeFileSync(resolve(repoRoot, `public/lessons-i18n/ch${chapter}-ja.json`), JSON.stringify(ovJa, null, 2) + '\n');
writeFileSync(resolve(repoRoot, `public/lessons-i18n/ch${chapter}-ko.json`), JSON.stringify(ovKo, null, 2) + '\n');

const totalQ = lessons.reduce((n, l) => n + l.questions.length, 0);
console.log(`✓ ch${chapter} "${titleZh}": ${lessons.length} lessons / ${totalQ} entries (${themes.join(',')})`);
console.log(`  → public/lessons-ch${chapter}.json + ja/ko overlay (${Object.keys(ovJa).length} entries each)`);
