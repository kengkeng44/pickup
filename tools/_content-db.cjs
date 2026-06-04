#!/usr/bin/env node
/**
 * v2.0.B.216 — Content database extractor.
 *
 * Reads public/lessons-ch{0..7}.json, outputs:
 *   - docs/content-db.md          full table per Q (chapter / lesson / id /
 *                                 type / question / answer / est_time_s)
 *   - docs/content-db-summary.md  per-chapter aggregates + 25% variance check
 *
 * Per-type estimated time (seconds):
 *   - tap-pairs (vocab intro): 45
 *   - tap-pairs (review):      40
 *   - narration:               30  (auto-advance after TTS)
 *   - listen-tf:               25  (Y/N quick decision)
 *   - listen-mc:               45  (4-option think)
 *   - listen-comprehension:    60  (deeper inference)
 *   - emoji-pick:              30  (visual)
 *   - tap-tiles:               50  (sentence ordering)
 *   - read-mc-with-audio:      45
 *   - listen-emoji:            30
 *   - type-what-you-hear:      75  (typing)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// v2.0.B.217: revised time estimates for 5 min/lesson budget
// Per user '數量要照每個小節只能花五分鐘'
const TIME_S = {
  'tap-pairs': 30,            // 4 pairs × 7s — vocab intro
  'narration': 15,            // ~10s TTS + 2s dwell + advance
  'listen-tf': 20,            // listen + Y/N tap
  'listen-tf-zh': 20,
  'listen-mc': 35,            // listen + read 4 options + tap
  'listen-comprehension': 45, // listen + inference + tap
  'emoji-pick': 25,           // visual quick
  'tap-tiles': 35,            // sentence ordering
  'read-mc-with-audio': 35,
  'listen-emoji': 25,
  'type-what-you-hear': 60,   // typing slowest
};
const LESSON_BUDGET_S = 300;  // 5 min

const CHAPTER_TITLES = {
  0: 'Intro · 認識 Mochi 與奶奶',
  1: '桃太郎',
  2: '醜小鴨',
  3: '龜兔賽跑',
  4: '駱駝為什麼有駝峰',
  5: 'Baba Yaga',
  6: '六隻天鵝',
  7: '葉限',
};

// v2.0.B.220: hook type per lesson (per docs/research/chapter-ending-hook-design.md)
// B1 物理懸念 / B2 情緒翻轉 / B3 資訊缺口 / B4 期待加速 / B5 道德兩難 / B6 預言種子
const HOOK_MAP = {
  // Ch1 桃太郎 (v6 emotional peak cut applied)
  'kt-ch1-l1': { type: 'B3',     inquiry: '那大紅色的是什麼?',         canon: 'momotaro.md#beat-1-setup' },
  'kt-ch1-l2': { type: 'B4+B3',  inquiry: '桃子裡是什麼?是嬰兒?活的?', canon: 'momotaro.md#beat-2-discovery' },
  'kt-ch1-l3': { type: 'B5+B2',  inquiry: '父母會讓他走嗎?',           canon: 'momotaro.md#beat-3-birth' },
  'kt-ch1-l4': { type: 'B4',     inquiry: '狗會跟?還會遇誰?',          canon: 'momotaro.md#beat-4-mission' },
  'kt-ch1-l5': { type: 'B6+B1',  inquiry: '島上為何安靜?是埋伏?',       canon: 'momotaro.md#beat-5-departure' },
  'kt-ch1-l6': { type: 'B2',     inquiry: '鬼王怎知他名字?陷阱?',       canon: 'momotaro.md#beat-6-battle' },
  'kt-ch1-l7': { type: 'B6 (open)', inquiry: '(開放結局, 留後鉤)',     canon: 'momotaro.md#beat-7-victory' },
  // Ch2 醜小鴨 (B.221 skill 試跑)
  'kt-ch2-l1': { type: 'B3',        inquiry: '那大蛋裡是什麼?',          canon: 'ugly-duckling.md#beat-1-setup' },
  'kt-ch2-l2': { type: 'B2',        inquiry: '他是醜?還是只是不一樣?',  canon: 'ugly-duckling.md#beat-2-discovery' },
  'kt-ch2-l3': { type: 'B2',        inquiry: '媽媽會回來保護他嗎?',      canon: 'ugly-duckling.md#beat-3-rejection' },
  'kt-ch2-l4': { type: 'B1',        inquiry: '他會被打中?還能逃多遠?',  canon: 'ugly-duckling.md#beat-4-escape' },
  'kt-ch2-l5': { type: 'B5',        inquiry: '他要去哪?外面更冷',        canon: 'ugly-duckling.md#beat-5-cottage' },
  'kt-ch2-l6': { type: 'B6',        inquiry: '春天會更好?還是又一次?',  canon: 'ugly-duckling.md#beat-6-winter' },
  'kt-ch2-l7': { type: 'B2 big',    inquiry: '原來他不是醜小鴨 — 還有什麼?', canon: 'ugly-duckling.md#beat-7-reveal' },
  // Ch3 龜兔賽跑 (agent B.223)
  'kt-ch3-l1': { type: 'B2',        inquiry: '烏龜怎敢挑戰?他想做什麼?',      canon: 'tortoise-hare.md#beat-1' },
  'kt-ch3-l2': { type: 'B3',        inquiry: '差距這麼大,烏龜能追嗎?',        canon: 'tortoise-hare.md#beat-2' },
  'kt-ch3-l3': { type: 'B5',        inquiry: '兔子真的要睡?會醒嗎?',          canon: 'tortoise-hare.md#beat-3' },
  'kt-ch3-l4': { type: 'B6',        inquiry: '兔子要醒了嗎?烏龜還剩多遠?',    canon: 'tortoise-hare.md#beat-4' },
  'kt-ch3-l5': { type: 'B5',        inquiry: '沒人叫醒兔子嗎?該不該叫?',      canon: 'tortoise-hare.md#beat-5' },
  'kt-ch3-l6': { type: 'B2',        inquiry: '兔子來得及嗎?還是輸定了?',      canon: 'tortoise-hare.md#beat-6' },
  'kt-ch3-l7': { type: 'B2 big',    inquiry: '慢而穩之外 — 兔子學到了嗎?',    canon: 'tortoise-hare.md#beat-7' },
  // Ch4 駱駝為什麼有駝峰
  'kt-ch4-l1': { type: 'B3',        inquiry: '"Humph" 是什麼意思?他在躲什麼?', canon: 'camel-hump.md#beat-1' },
  'kt-ch4-l2': { type: 'B6',        inquiry: '他們要告狀嗎?Man 會怎麼處理?',   canon: 'camel-hump.md#beat-2' },
  'kt-ch4-l3': { type: 'B4',        inquiry: '沙塵裡是什麼?是誰來了?',         canon: 'camel-hump.md#beat-3' },
  'kt-ch4-l4': { type: 'B5',        inquiry: 'Djinn 會幫誰?會罰駱駝嗎?',       canon: 'camel-hump.md#beat-4' },
  'kt-ch4-l5': { type: 'B6',        inquiry: '是什麼魔法?駱駝會變什麼?',       canon: 'camel-hump.md#beat-5' },
  'kt-ch4-l6': { type: 'B1',        inquiry: '背要變成什麼?還會停嗎?',         canon: 'camel-hump.md#beat-6' },
  'kt-ch4-l7': { type: 'B2 big',    inquiry: '自己背的包袱 — user 在背什麼?',  canon: 'camel-hump.md#beat-7' },
  // Ch5 Baba Yaga 雞腳屋
  'kt-ch5-l1': { type: 'B6',        inquiry: '沒火會怎樣?誰要去拿火?',         canon: 'baba-yaga.md#beat-1' },
  'kt-ch5-l2': { type: 'B3',        inquiry: 'Baba Yaga 是誰?',                canon: 'baba-yaga.md#beat-2' },
  'kt-ch5-l3': { type: 'B6',        inquiry: '三個騎士是誰?',                  canon: 'baba-yaga.md#beat-3' },
  'kt-ch5-l4': { type: 'B1',        inquiry: '屋子會動?她要走進去嗎?',         canon: 'baba-yaga.md#beat-4' },
  'kt-ch5-l5': { type: 'B2',        inquiry: '巫婆會吃她?還會放她走?',         canon: 'baba-yaga.md#beat-5' },
  'kt-ch5-l6': { type: 'B3',        inquiry: '娃娃能做什麼?它會動嗎?',         canon: 'baba-yaga.md#beat-6' },
  'kt-ch5-l7': { type: 'B2 big',    inquiry: '口袋裡的小東西 — user 自己的是什麼?', canon: 'baba-yaga.md#beat-7' },
  // Ch6 六隻天鵝
  'kt-ch6-l1': { type: 'B6',        inquiry: '沒了母親,誰會來填這個位置?',     canon: 'six-swans.md#beat-1' },
  'kt-ch6-l2': { type: 'B3',        inquiry: '為什麼是六件?六件白衣是給誰?',   canon: 'six-swans.md#beat-2' },
  'kt-ch6-l3': { type: 'B1',        inquiry: '男孩去哪了?還能變回來嗎?',       canon: 'six-swans.md#beat-3' },
  'kt-ch6-l4': { type: 'B5',        inquiry: '六年不能說話,她能撐下去嗎?',     canon: 'six-swans.md#beat-4' },
  'kt-ch6-l5': { type: 'B6',        inquiry: '王子的母親會接受她嗎?',           canon: 'six-swans.md#beat-5' },
  'kt-ch6-l6': { type: 'B5',        inquiry: '她要說話救自己嗎?還是繼續織?',   canon: 'six-swans.md#beat-6' },
  'kt-ch6-l7': { type: 'B2 big',    inquiry: '說出口的那刻 — 你忍著沒說的是什麼?', canon: 'six-swans.md#beat-7' },
  // Ch7 葉限 (Tang dynasty Cinderella)
  'kt-ch7-l1': { type: 'B6',        inquiry: '後母會一直這樣對她嗎?',           canon: 'yexian.md#beat-1' },
  'kt-ch7-l2': { type: 'B3',        inquiry: '這條魚不只是魚?它是誰?',         canon: 'yexian.md#beat-2' },
  'kt-ch7-l3': { type: 'B1',        inquiry: '葉限會知道嗎?她怎麼承受?',       canon: 'yexian.md#beat-3' },
  'kt-ch7-l4': { type: 'B3',        inquiry: '骨頭能給她什麼?她要問什麼?',     canon: 'yexian.md#beat-4' },
  'kt-ch7-l5': { type: 'B2',        inquiry: '她會被認出嗎?誰已經盯著她?',     canon: 'yexian.md#beat-5' },
  'kt-ch7-l6': { type: 'B1',        inquiry: '鞋掉了會落到誰手上?',             canon: 'yexian.md#beat-6' },
  'kt-ch7-l7': { type: 'B2 big',    inquiry: '失去的支持回來了 — 你的呢?',     canon: 'yexian.md#beat-7' },
};

function shortText(s, max = 60) {
  if (!s) return '';
  s = s.toString().replace(/\n/g, ' ').trim();
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

function getAnswer(q) {
  if (q.type === 'narration') return '(auto-advance)';
  if (q.type === 'tap-pairs') {
    if (q.pairs) return q.pairs.map(p => `${p.left}=${p.right}`).join(' / ');
    return '(pairs)';
  }
  if (q.type === 'tap-tiles') return q.sentence || '(tiles)';
  if (q.type === 'listen-tf' || q.type === 'listen-tf-zh') {
    const idx = q.correctIndex ?? 0;
    return (q.options || ['Yes','No'])[idx];
  }
  if (Array.isArray(q.options)) {
    const idx = q.correctIndex ?? 0;
    const en = q.options[idx];
    const zh = q.optionsZh?.[idx];
    return zh ? `${en} (${zh})` : en;
  }
  return '(?)';
}

const rows = [];
const perChapter = {};

// v2.0.B.217: skip Ch0 per user '不用放到數據庫裡面'
for (let ch = 1; ch <= 7; ch++) {
  const fp = path.join(ROOT, 'public', `lessons-ch${ch}.json`);
  if (!fs.existsSync(fp)) continue;
  const data = JSON.parse(fs.readFileSync(fp, 'utf-8'));
  const chStats = { lessons: data.length, qCount: 0, timeS: 0, typeCounts: {}, lessonsOverBudget: 0 };
  for (const lesson of data) {
    let lessonTime = 0;
    for (const q of lesson.questions || []) {
      const t = q.type;
      const time = TIME_S[t] || 40;
      const stem = q.question || q.questionEn || q.sentence || '';
      const answer = getAnswer(q);
      rows.push({
        ch,
        lesson: `Ch${ch}-${lesson.lessonInChapter}`,
        qId: q.id,
        type: t,
        speaker: q.speaker || '-',
        stem: shortText(stem, 60),
        answer: shortText(answer, 50),
        timeS: time,
      });
      chStats.qCount++;
      chStats.timeS += time;
      lessonTime += time;
      chStats.typeCounts[t] = (chStats.typeCounts[t] || 0) + 1;
    }
    if (lessonTime > LESSON_BUDGET_S) chStats.lessonsOverBudget++;
  }
  perChapter[ch] = chStats;
}

// ─── Write full DB ────────────────────────────────────────────────────
const dbLines = [
  `# Pickup Content DB — full Q table`,
  '',
  `Auto-generated by \`tools/_content-db.cjs\` from \`public/lessons-ch{0..7}.json\`.`,
  '',
  `**Total**: ${rows.length} Q across ${Object.keys(perChapter).length} chapters.`,
  '',
  `| Ch | Lesson | Q ID | Type | Speaker | Stem / Sentence | Answer | Time (s) |`,
  `|----|--------|------|------|---------|-----------------|--------|----------|`,
];
for (const r of rows) {
  const esc = s => String(s).replace(/\|/g, '\\|');
  dbLines.push(`| ${r.ch} | ${r.lesson} | \`${r.qId}\` | ${r.type} | ${r.speaker} | ${esc(r.stem)} | ${esc(r.answer)} | ${r.timeS} |`);
}
fs.writeFileSync(path.join(ROOT, 'docs', 'content-db.md'), dbLines.join('\n') + '\n', 'utf-8');

// ─── Write summary ────────────────────────────────────────────────────
const totalQ = rows.length;
const totalTime = rows.reduce((s, r) => s + r.timeS, 0);
const avgPerCh = Math.round(totalQ / Object.keys(perChapter).length);
const tolerance = 0.25;
const lowBand = Math.round(avgPerCh * (1 - tolerance));
const highBand = Math.round(avgPerCh * (1 + tolerance));

const sumLines = [
  `# Pickup Content DB — per-chapter summary`,
  '',
  `**Generated**: ${new Date().toISOString()}`,
  '',
  `## Aggregate`,
  '',
  `- **Total Q**: ${totalQ}`,
  `- **Total play time est**: ${Math.round(totalTime / 60)} min`,
  `- **Avg Q per chapter**: ${avgPerCh}`,
  `- **25% tolerance band**: ${lowBand} ≤ Q ≤ ${highBand}`,
  '',
  `## Per chapter (with 25% tolerance check)`,
  '',
  `| Ch | Title | Lessons | Q count | Avg Q/lesson | Avg lesson time (5 min budget) | Variance from avg | Tolerance |`,
  `|----|-------|---------|---------|--------------|--------------------------------|-------------------|-----------|`,
];
for (let ch = 1; ch <= 7; ch++) {
  const s = perChapter[ch];
  if (!s) continue;
  const variance = Math.round((s.qCount - avgPerCh) / avgPerCh * 100);
  const inBand = s.qCount >= lowBand && s.qCount <= highBand;
  const avgLessonTime = Math.round(s.timeS / s.lessons);
  const sign = variance > 0 ? '+' : '';
  const budgetMark = avgLessonTime <= LESSON_BUDGET_S ? '✓' : `⚠️ ${avgLessonTime}s>${LESSON_BUDGET_S}s`;
  sumLines.push(`| ${ch} | ${CHAPTER_TITLES[ch] || ''} | ${s.lessons} | ${s.qCount} | ${(s.qCount / s.lessons).toFixed(1)} | ${avgLessonTime}s/lesson ${budgetMark} | ${sign}${variance}% | ${inBand ? '✓' : '⚠️ OUT'} |`);
}

sumLines.push('');
sumLines.push(`## Per-lesson hook ending (v6, emotional peak cut)`);
sumLines.push('');
sumLines.push(`Per docs/research/chapter-ending-hook-design.md framework B1-B6.`);
sumLines.push(`Hook coverage: Ch1 ✓ applied. Ch2-7 待 narrative-cut-analyst skill 重切.`);
sumLines.push('');
sumLines.push(`| Lesson ID | Story Beat | Hook Type | Inquiry Question | Canon Ref |`);
sumLines.push(`|-----------|------------|-----------|------------------|-----------|`);
for (let ch = 1; ch <= 7; ch++) {
  const fp = path.join(ROOT, 'public', `lessons-ch${ch}.json`);
  if (!fs.existsSync(fp)) continue;
  const data = JSON.parse(fs.readFileSync(fp, 'utf-8'));
  for (const lesson of data) {
    const hook = HOOK_MAP[lesson.id];
    const hookType = hook?.type || '_(no hook yet)_';
    const inquiry = hook?.inquiry || '_-_';
    const canon = hook?.canon ? `[${hook.canon}](../docs/canon/${hook.canon})` : '_-_';
    sumLines.push(`| \`${lesson.id}\` | ${lesson.storyBeat || ''} | ${hookType} | ${inquiry} | ${canon} |`);
  }
}

sumLines.push('');
sumLines.push(`## Q type distribution per chapter`);
sumLines.push('');
const allTypes = new Set();
for (const s of Object.values(perChapter)) for (const t of Object.keys(s.typeCounts)) allTypes.add(t);
const typesArr = [...allTypes].sort();
sumLines.push(`| Ch | ${typesArr.join(' | ')} |`);
sumLines.push(`|----|${typesArr.map(()=>'---').join('|')}|`);
for (let ch = 1; ch <= 7; ch++) {
  const s = perChapter[ch];
  if (!s) continue;
  const cells = typesArr.map(t => s.typeCounts[t] || 0);
  sumLines.push(`| ${ch} | ${cells.join(' | ')} |`);
}

fs.writeFileSync(path.join(ROOT, 'docs', 'content-db-summary.md'), sumLines.join('\n') + '\n', 'utf-8');

console.log(`OK   docs/content-db.md (${rows.length} rows)`);
console.log(`OK   docs/content-db-summary.md`);
console.log(`\n[CURRENT STATE]`);
console.log(`Total Q: ${totalQ}, total time: ${Math.round(totalTime/60)} min`);
console.log(`Avg per chapter: ${avgPerCh}, 25% tolerance band: ${lowBand}-${highBand}`);
console.log(`\nPer chapter (Ch0 excluded, 5 min/lesson budget):`);
for (let ch = 1; ch <= 7; ch++) {
  const s = perChapter[ch];
  if (!s) continue;
  const variance = Math.round((s.qCount - avgPerCh) / avgPerCh * 100);
  const inBand = s.qCount >= lowBand && s.qCount <= highBand;
  const avgT = Math.round(s.timeS / s.lessons);
  const budgetMark = avgT <= LESSON_BUDGET_S ? '✓' : `⚠️ ${avgT}s>300s`;
  console.log(`  Ch${ch} ${CHAPTER_TITLES[ch] || ''}: ${s.qCount} Q (${(s.qCount/s.lessons).toFixed(1)}/lesson, ${avgT}s avg ${budgetMark}), variance ${variance > 0 ? '+' : ''}${variance}% ${inBand ? '✓' : '⚠️ OUT'}`);
}
