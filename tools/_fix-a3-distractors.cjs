#!/usr/bin/env node
/**
 * v2.0.B.188 — Content QA audit (2026-06-02T0006) A3 junk-distractor fix.
 *
 * 14 Q-IDs across Ch1/2/3 where ≥1 distractor was junk (wrong semantic
 * category / grammatical class / zero plausibility). Audit-prescribed
 * word-level replacements: keep correctIndex unchanged, swap junk EN
 * option + its ZH gloss with phonologically-adjacent semantically-correct
 * alternative. Audio regen NOT needed (listen-mc reveals options text only).
 *
 * Run: node tools/_fix-a3-distractors.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FIXES = [
  // Ch1
  { ch: 1, id: 'kt-ch1-l4-q3',  swaps: [{ en: 'deer',   zh: '鹿',     newEn: 'dull',    newZh: '暗淡' }] },
  { ch: 1, id: 'kt-ch1-l4-q12', swaps: [
    { en: 'thread', zh: '線',     newEn: 'rain',    newZh: '雨' },
    { en: 'throat', zh: '喉嚨',   newEn: 'wind',    newZh: '風' },
    { en: 'thumbs', zh: '拇指',   newEn: 'hail',    newZh: '冰雹' },
  ]},
  { ch: 1, id: 'kt-ch1-l5-q2',  swaps: [
    { en: 'fire',   zh: '火',     newEn: 'tail',    newZh: '尾巴' },
    { en: 'far',    zh: '遠',     newEn: 'ear',     newZh: '耳朵' },
    { en: 'for',    zh: '為了',   newEn: 'paw',     newZh: '腳掌' },
  ]},
  { ch: 1, id: 'kt-ch1-l5-q3',  swaps: [
    { en: 'toes',   zh: '腳趾',   newEn: 'one',     newZh: '一' },
    { en: 'tour',   zh: '旅行',   newEn: 'three',   newZh: '三' },
  ]},
  { ch: 1, id: 'kt-ch1-l5-q6',  swaps: [{ en: 'flag',  zh: '旗',     newEn: 'floppy',  newZh: '耷拉' }] },
  { ch: 1, id: 'kt-ch1-l6-q1',  swaps: [{ en: 'kills', zh: '殺',     newEn: 'coils',   newZh: '盤繞' }] },
  { ch: 1, id: 'kt-ch1-l6-q3',  swaps: [{ en: 'aloud', zh: '大聲',   newEn: 'apart',   newZh: '分離' }] },
  { ch: 1, id: 'kt-ch1-l7-q1',  swaps: [
    { en: 'sheep',  zh: '羊',     newEn: 'shape',   newZh: '形狀' },
    { en: 'shows',  zh: '展示',   newEn: 'shroud',  newZh: '黑影' },
  ]},
  { ch: 1, id: 'kt-ch1-l7-q3',  swaps: [
    { en: 'warmly', zh: '溫暖',   newEn: 'widow',   newZh: '寡婦' },
    { en: 'wonder', zh: '驚奇',   newEn: 'wanderer', newZh: '流浪者' },
  ]},
  { ch: 1, id: 'kt-ch1-l7-q7',  swaps: [
    { en: 'grain',  zh: '穀物',   newEn: 'gold',    newZh: '金色' },
    { en: 'great',  zh: '很棒',   newEn: 'green',   newZh: '綠色' },
  ]},
  { ch: 1, id: 'kt-ch1-l8-q6',  swaps: [
    { en: 'wise',   zh: '聰明',   newEn: 'narrow',  newZh: '窄' },
    { en: 'wild',   zh: '狂野',   newEn: 'small',   newZh: '小' },
    { en: 'weak',   zh: '虛弱',   newEn: 'long',    newZh: '長' },
  ]},
  { ch: 1, id: 'kt-ch1-l8-q7',  swaps: [
    { en: 'deep',   zh: '深',     newEn: 'damp',    newZh: '潮濕' },
    { en: 'drop',   zh: '掉',     newEn: 'cold',    newZh: '冷' },
    { en: 'draw',   zh: '畫',     newEn: 'dirty',   newZh: '髒' },
  ]},
  // Ch2
  { ch: 2, id: 'kt-ch2-l5-q2',  swaps: [
    { en: 'small',  zh: '小',     newEn: 'red',     newZh: '紅色' },
    { en: 'round',  zh: '圓',     newEn: 'orange',  newZh: '橘色' },
  ]},
  // Ch3
  { ch: 3, id: 'kt-ch3-l4-q3',  swaps: [
    { en: 'wave',   zh: '揮手',   newEn: 'cool',    newZh: '涼' },
    { en: 'worm',   zh: '蟲',     newEn: 'cold',    newZh: '冷' },
    { en: 'warn',   zh: '警告',   newEn: 'wet',     newZh: '濕' },
  ]},
];

// Group fixes by chapter
const byChapter = {};
for (const f of FIXES) {
  byChapter[f.ch] = byChapter[f.ch] ?? [];
  byChapter[f.ch].push(f);
}

let totalApplied = 0;
let totalSkipped = 0;
const log = [];

for (const ch of Object.keys(byChapter).map(Number).sort()) {
  const filePath = path.join(ROOT, 'public', `lessons-ch${ch}.json`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);

  for (const fix of byChapter[ch]) {
    let q = null;
    for (const lesson of data) {
      const found = (lesson.questions || []).find(x => x.id === fix.id);
      if (found) { q = found; break; }
    }
    if (!q) {
      log.push(`SKIP ${fix.id}: not found in ch${ch}.json`);
      totalSkipped += fix.swaps.length;
      continue;
    }
    if (!Array.isArray(q.options) || !Array.isArray(q.optionsZh)) {
      log.push(`SKIP ${fix.id}: missing options/optionsZh arrays`);
      totalSkipped += fix.swaps.length;
      continue;
    }

    for (const sw of fix.swaps) {
      const idx = q.options.findIndex(o => o === sw.en);
      if (idx < 0) {
        log.push(`SKIP ${fix.id}: option "${sw.en}" not found (current: ${JSON.stringify(q.options)})`);
        totalSkipped++;
        continue;
      }
      if (idx === q.correctIndex) {
        log.push(`SKIP ${fix.id}: refusing to overwrite correctIndex ${idx} value "${sw.en}"`);
        totalSkipped++;
        continue;
      }
      const oldZh = q.optionsZh[idx];
      q.options[idx] = sw.newEn;
      q.optionsZh[idx] = sw.newZh;
      log.push(`OK   ${fix.id}: options[${idx}] "${sw.en}/${oldZh}" → "${sw.newEn}/${sw.newZh}"`);
      totalApplied++;
    }
  }

  // Write JSON back preserving 2-space indent (matches existing files)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

console.log(log.join('\n'));
console.log(`\n[SUMMARY] applied=${totalApplied} skipped=${totalSkipped}`);
process.exit(totalSkipped === 0 ? 0 : 1);
