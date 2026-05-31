#!/usr/bin/env node
/**
 * Rewrite intro.en (emotion-first, ≤15 words) + add openerVocab for Ch1 L1-L10.
 * Spec from user 2026-05-31: short emotional hook + tap-to-translate word pool.
 *
 * Strategy: load JSON, mutate L1-L10 only, write back as UTF-8 no BOM,
 * 2-space indent (matches existing file convention).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = resolve(__dirname, '..', 'public', 'lessons-ch1.json');

const raw = readFileSync(file, 'utf-8');
// Strip BOM if present so JSON.parse never sees it.
const json = JSON.parse(raw.replace(/^﻿/, ''));

// ─── L1-L10 rewrites ────────────────────────────────────────────────
// Each entry: { en: short emotion-first intro, openerVocab: {...} }
// Keys lowercase EXCEPT proper nouns (Grandma, Mochi, Hana).
// Stopwords skipped: a, an, the, to, in, on, of.

/** @type {Record<string, {en: string, openerVocab: Record<string, {zh: string, pos: string}>}>} */
const updates = {
  'kt-ch1-l1': {
    // storyBeat: {catName} 跳上矮牆
    en: 'It is dark and cold. {catName} the stray cat jumps up the wall.',
    openerVocab: {
      'it': { zh: '它', pos: 'pron.' },
      'is': { zh: '是', pos: 'v.' },
      'dark': { zh: '黑暗的', pos: 'adj.' },
      'and': { zh: '和', pos: 'conj.' },
      'cold': { zh: '冷的', pos: 'adj.' },
      'Mochi': { zh: 'Mochi (糰糰)', pos: 'n. (專有)' },
      'stray': { zh: '流浪的', pos: 'adj.' },
      'cat': { zh: '貓', pos: 'n.' },
      'jumps': { zh: '跳 (第三人稱)', pos: 'v.' },
      'up': { zh: '向上', pos: 'prep.' },
      'wall': { zh: '牆', pos: 'n.' },
    },
  },
  'kt-ch1-l2': {
    // storyBeat: {dogName} 搖尾巴迎接
    en: '{dogName} the shiba dog wags his tail. He waits for his best friend.',
    openerVocab: {
      'Hana': { zh: 'Hana (花花)', pos: 'n. (專有)' },
      'shiba': { zh: '柴犬', pos: 'n.' },
      'dog': { zh: '狗', pos: 'n.' },
      'wags': { zh: '搖 (第三人稱)', pos: 'v.' },
      'his': { zh: '他的', pos: 'pron.' },
      'tail': { zh: '尾巴', pos: 'n.' },
      'he': { zh: '他', pos: 'pron.' },
      'waits': { zh: '等 (第三人稱)', pos: 'v.' },
      'for': { zh: '為了', pos: 'prep.' },
      'best': { zh: '最好的', pos: 'adj.' },
      'friend': { zh: '朋友', pos: 'n.' },
    },
  },
  'kt-ch1-l3': {
    // storyBeat: 奶奶打開故事書
    en: 'Grandma sits in her chair. She opens a thick book and starts a story.',
    openerVocab: {
      'Grandma': { zh: '奶奶', pos: 'n.' },
      'sits': { zh: '坐 (第三人稱)', pos: 'v.' },
      'her': { zh: '她的', pos: 'pron.' },
      'chair': { zh: '椅子', pos: 'n.' },
      'she': { zh: '她', pos: 'pron.' },
      'opens': { zh: '打開 (第三人稱)', pos: 'v.' },
      'thick': { zh: '厚的', pos: 'adj.' },
      'book': { zh: '書', pos: 'n.' },
      'and': { zh: '和', pos: 'conj.' },
      'starts': { zh: '開始 (第三人稱)', pos: 'v.' },
      'story': { zh: '故事', pos: 'n.' },
    },
  },
  'kt-ch1-l4': {
    // storyBeat: 故事開始 — 從前一個雨夜
    en: 'The story begins long ago. The night is wet, dark, and loud with thunder.',
    openerVocab: {
      'story': { zh: '故事', pos: 'n.' },
      'begins': { zh: '開始 (第三人稱)', pos: 'v.' },
      'long': { zh: '長的 / 很久的', pos: 'adj.' },
      'ago': { zh: '以前', pos: 'adv.' },
      'night': { zh: '夜晚', pos: 'n.' },
      'is': { zh: '是', pos: 'v.' },
      'wet': { zh: '濕的', pos: 'adj.' },
      'dark': { zh: '黑暗的', pos: 'adj.' },
      'and': { zh: '和', pos: 'conj.' },
      'loud': { zh: '大聲的', pos: 'adj.' },
      'with': { zh: '帶有 / 跟', pos: 'prep.' },
      'thunder': { zh: '雷聲', pos: 'n.' },
    },
  },
  'kt-ch1-l5': {
    // storyBeat: 小貓濕透又冷又怕
    en: 'A tiny kitten is alone in the rain. She is wet, cold, and hungry.',
    openerVocab: {
      'tiny': { zh: '小小的', pos: 'adj.' },
      'kitten': { zh: '小貓', pos: 'n.' },
      'is': { zh: '是', pos: 'v.' },
      'alone': { zh: '獨自', pos: 'adv.' },
      'rain': { zh: '雨', pos: 'n.' },
      'she': { zh: '她', pos: 'pron.' },
      'wet': { zh: '濕的', pos: 'adj.' },
      'cold': { zh: '冷的', pos: 'adj.' },
      'and': { zh: '和', pos: 'conj.' },
      'hungry': { zh: '餓的', pos: 'adj.' },
    },
  },
  'kt-ch1-l6': {
    // storyBeat: 她蜷縮在巷子角落
    en: 'The kitten finds a narrow alley. She rolls up small to stay warm.',
    openerVocab: {
      'kitten': { zh: '小貓', pos: 'n.' },
      'finds': { zh: '找到 (第三人稱)', pos: 'v.' },
      'narrow': { zh: '窄的', pos: 'adj.' },
      'alley': { zh: '巷子', pos: 'n.' },
      'she': { zh: '她', pos: 'pron.' },
      'rolls': { zh: '捲起 (第三人稱)', pos: 'v.' },
      'up': { zh: '起來', pos: 'prep.' },
      'small': { zh: '小的', pos: 'adj.' },
      'stay': { zh: '保持', pos: 'v.' },
      'warm': { zh: '溫暖的', pos: 'adj.' },
    },
  },
  'kt-ch1-l7': {
    // storyBeat: 大影子靠近 — 是奶奶
    en: 'A big shadow comes near. The kitten shakes. But it is a kind lady.',
    openerVocab: {
      'big': { zh: '大的', pos: 'adj.' },
      'shadow': { zh: '影子', pos: 'n.' },
      'comes': { zh: '來 (第三人稱)', pos: 'v.' },
      'near': { zh: '靠近', pos: 'adv.' },
      'kitten': { zh: '小貓', pos: 'n.' },
      'shakes': { zh: '發抖 (第三人稱)', pos: 'v.' },
      'but': { zh: '但是', pos: 'conj.' },
      'it': { zh: '它', pos: 'pron.' },
      'is': { zh: '是', pos: 'v.' },
      'kind': { zh: '善良的', pos: 'adj.' },
      'lady': { zh: '女士', pos: 'n.' },
    },
  },
  'kt-ch1-l8': {
    // storyBeat: 奶奶撐傘為她遮雨
    en: 'The lady holds her umbrella over the kitten. Her own arm gets wet.',
    openerVocab: {
      'lady': { zh: '女士', pos: 'n.' },
      'holds': { zh: '拿 / 撐 (第三人稱)', pos: 'v.' },
      'her': { zh: '她的', pos: 'pron.' },
      'umbrella': { zh: '雨傘', pos: 'n.' },
      'over': { zh: '在...上方', pos: 'prep.' },
      'kitten': { zh: '小貓', pos: 'n.' },
      'own': { zh: '自己的', pos: 'adj.' },
      'arm': { zh: '手臂', pos: 'n.' },
      'gets': { zh: '變得 (第三人稱)', pos: 'v.' },
      'wet': { zh: '濕的', pos: 'adj.' },
    },
  },
  'kt-ch1-l9': {
    // storyBeat: 奶奶溫柔說「不怕」
    en: 'The lady leans down. She speaks softly and tells the kitten not to fear.',
    openerVocab: {
      'lady': { zh: '女士', pos: 'n.' },
      'leans': { zh: '靠近 / 傾身 (第三人稱)', pos: 'v.' },
      'down': { zh: '向下', pos: 'adv.' },
      'she': { zh: '她', pos: 'pron.' },
      'speaks': { zh: '說 (第三人稱)', pos: 'v.' },
      'softly': { zh: '輕柔地', pos: 'adv.' },
      'and': { zh: '和', pos: 'conj.' },
      'tells': { zh: '告訴 (第三人稱)', pos: 'v.' },
      'kitten': { zh: '小貓', pos: 'n.' },
      'not': { zh: '不', pos: 'adv.' },
      'fear': { zh: '害怕', pos: 'v.' },
    },
  },
  'kt-ch1-l10': {
    // storyBeat: 奶奶蹲下,輕輕問問
    en: 'The lady kneels on the wet road. She asks the kitten why she is alone.',
    openerVocab: {
      'lady': { zh: '女士', pos: 'n.' },
      'kneels': { zh: '跪下 (第三人稱)', pos: 'v.' },
      'wet': { zh: '濕的', pos: 'adj.' },
      'road': { zh: '路', pos: 'n.' },
      'she': { zh: '她', pos: 'pron.' },
      'asks': { zh: '問 (第三人稱)', pos: 'v.' },
      'kitten': { zh: '小貓', pos: 'n.' },
      'why': { zh: '為什麼', pos: 'adv.' },
      'is': { zh: '是', pos: 'v.' },
      'alone': { zh: '獨自', pos: 'adv.' },
    },
  },
};

// Validation: confirm every word in en (minus stopwords + punct) has a vocab entry.
const STOPWORDS = new Set(['a', 'an', 'the', 'to', 'in', 'on', 'of']);
function tokenize(en) {
  return en
    .replace(/\{catName\}/g, 'Mochi')
    .replace(/\{dogName\}/g, 'Hana')
    .split(/[\s,.!?;:"'()—–-]+/)
    .filter(Boolean);
}
let totalUnique = 0;
for (const [id, upd] of Object.entries(updates)) {
  const tokens = tokenize(upd.en);
  const wordCount = tokens.length;
  const missing = [];
  for (const tok of tokens) {
    if (STOPWORDS.has(tok.toLowerCase())) continue;
    // Try exact-case key (for proper nouns) then lowercase
    if (Object.prototype.hasOwnProperty.call(upd.openerVocab, tok)) continue;
    if (Object.prototype.hasOwnProperty.call(upd.openerVocab, tok.toLowerCase())) continue;
    missing.push(tok);
  }
  totalUnique += Object.keys(upd.openerVocab).length;
  console.log(`${id}: ${wordCount} words, ${Object.keys(upd.openerVocab).length} vocab entries${missing.length ? `  MISSING: ${missing.join(', ')}` : ''}`);
  if (wordCount > 15) {
    console.warn(`  ⚠ ${id}: ${wordCount} > 15 words!`);
  }
}
console.log(`\nTotal unique vocab entries L1-L10: ${totalUnique}`);

// Apply mutations
let applied = 0;
for (const lesson of json) {
  const upd = updates[lesson.id];
  if (!upd) continue;
  if (!lesson.intro) {
    console.error(`! ${lesson.id} has no intro field — skipping`);
    continue;
  }
  // Mutate in place: keep intro.zh untouched, replace intro.en, insert openerVocab
  // between intro and questions.
  lesson.intro.en = upd.en;
  // Rebuild lesson object so openerVocab sits in a stable position
  // (after intro, before questions).
  const rebuilt = {};
  for (const k of Object.keys(lesson)) {
    rebuilt[k] = lesson[k];
    if (k === 'intro') {
      rebuilt.openerVocab = upd.openerVocab;
    }
  }
  // Replace lesson keys in place to preserve array order
  for (const k of Object.keys(lesson)) delete lesson[k];
  for (const k of Object.keys(rebuilt)) lesson[k] = rebuilt[k];
  applied++;
}
console.log(`\nApplied to ${applied} lessons.`);

// Write back UTF-8 no BOM, 2-space indent, trailing newline (matches existing file)
const out = JSON.stringify(json, null, 2) + '\n';
writeFileSync(file, out, { encoding: 'utf-8' });
console.log(`Wrote ${file} (${out.length} bytes)`);
