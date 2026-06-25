#!/usr/bin/env node
/**
 * v2.0.B.412 — 答案位置均衡器 (per user: 每個位置正確機率要一樣).
 *
 * 現況: 4選1 類正解 40% 在位置0 + 54% 在位置1 (內容 agent 老把正解放第一個)。
 * 修法: 對每題「可洗位置」的選擇題, 用 per-(選項數) round-robin 指派目標位置,
 *       把正解從現位 c 換到目標 t (swap c↔t), 同步換 options / optionsZh / correctIndex。
 *       日/韓 overlay 的 o[] 陣列做「同一個 swap」→ 翻譯對齊不跑掉。
 *
 * 不動: listen-tf (對/錯 語意位置)、配對類、無 correctIndex 的題型。
 *   node tools/balance-answer-positions.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUB = path.join(ROOT, 'public');
const I18N = path.join(PUB, 'lessons-i18n');

// 位置可任意洗的選擇題 (語意不綁位置)
const SHUFFLE = new Set([
  'listen-mc', 'comprehension', 'read-comprehension', 'listen-comprehension',
  'grammar-mc', 'picture-mc', 'emoji-pick', 'scroll-pick', 'listen-emoji',
]);

function swap(arr, i, j) {
  if (Array.isArray(arr) && i < arr.length && j < arr.length) {
    const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
}

function main() {
  const rr = {};            // round-robin 計數 per 選項數 k
  const swaps = {};         // qid → [c, t] (給 overlay 同步)
  const before = {}, after = {};
  let n = 0;

  for (let ch = 0; ch <= 31; ch++) {
    const f = path.join(PUB, `lessons-ch${ch}.json`);
    if (!fs.existsSync(f)) continue;
    const arr = JSON.parse(fs.readFileSync(f, 'utf8'));
    let touched = false;

    for (const lesson of arr) {
      for (const q of lesson.questions) {
        if (!SHUFFLE.has(q.type)) continue;
        if (!Array.isArray(q.options) || typeof q.correctIndex !== 'number') continue;
        const k = q.options.length;
        if (k < 2) continue;
        const c = q.correctIndex;
        if (c < 0 || c >= k) continue;

        before[c] = (before[c] || 0) + 1;
        rr[k] = (rr[k] || 0);
        const t = rr[k] % k;
        rr[k]++;

        if (t !== c) {
          swap(q.options, c, t);
          if (Array.isArray(q.optionsZh) && q.optionsZh.length === k) swap(q.optionsZh, c, t);
          q.correctIndex = t;
          swaps[q.id] = [c, t];
          touched = true;
        }
        after[t] = (after[t] || 0) + 1;
        n++;
      }
    }
    if (touched) fs.writeFileSync(f, JSON.stringify(arr, null, 2) + '\n');
  }

  // 同步 overlay (日/韓) 的 o[] 陣列
  let ovTouched = 0;
  if (fs.existsSync(I18N)) {
    for (const file of fs.readdirSync(I18N)) {
      if (!/\.json$/.test(file)) continue;
      const fp = path.join(I18N, file);
      const map = JSON.parse(fs.readFileSync(fp, 'utf8'));
      let changed = false;
      for (const [qid, [c, t]] of Object.entries(swaps)) {
        const e = map[qid];
        if (e && Array.isArray(e.o)) { swap(e.o, c, t); changed = true; }
      }
      if (changed) { fs.writeFileSync(fp, JSON.stringify(map, null, 1) + '\n'); ovTouched++; }
    }
  }

  console.log(`balanced ${n} 題, 換位 ${Object.keys(swaps).length} 題, overlay 同步 ${ovTouched} 檔`);
  const pct = (d) => Object.keys(d).sort().map((k) => `位置${k}:${(d[k] / n * 100).toFixed(1)}%`).join('  ');
  console.log('修前:', pct(before));
  console.log('修後:', pct(after));
}

main();
