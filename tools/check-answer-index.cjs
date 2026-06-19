#!/usr/bin/env node
/**
 * v2.0.B.337 — 自動修復安全護欄 (cron self-healing Phase 2).
 *
 * 比對「git HEAD 的 lessons」vs「現在 working tree 的 lessons」, 若任何題目的
 * correctIndex (正解位置) 被改動 → exit 1。自動修 (Tier A/B) 改完一定要跑這個:
 * 確保改干擾項/文字時「絕對沒動到正確答案」(auto-fix-tiers HARD_STOP)。
 *
 * 用法: node tools/check-answer-index.js
 *   - 綠 (exit 0): 沒有任何 correctIndex 變動 (或無 lessons 改動)
 *   - 紅 (exit 1): 列出被改到答案位置的題目 id → 自動修必須 revert
 */
const { execSync } = require('child_process');

function load(ref, path) {
  try {
    const raw = ref === null
      ? require('fs').readFileSync(path, 'utf8')
      : execSync(`git show ${ref}:${path}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    return JSON.parse(raw);
  } catch {
    return null; // 檔不存在於該 ref (新檔) → 不比對
  }
}

function indexById(lessons) {
  const m = new Map();
  if (!Array.isArray(lessons)) return m;
  for (const l of lessons) for (const q of (l.questions || [])) {
    if (q && q.id != null && q.correctIndex != null) m.set(q.id, q.correctIndex);
  }
  return m;
}

// 哪些 lessons 檔在 working tree 有改動 (vs HEAD)
let changed = [];
try {
  changed = execSync('git diff --name-only HEAD -- "public/lessons-ch*.json"', { encoding: 'utf8' })
    .split('\n').map(s => s.trim()).filter(Boolean);
} catch { /* not a git repo / no diff */ }

if (changed.length === 0) {
  console.log('check-answer-index: 無 lessons 改動 ✓');
  process.exit(0);
}

const violations = [];
for (const path of changed) {
  const before = indexById(load('HEAD', path));
  const after = indexById(load(null, path));
  for (const [id, idx] of before) {
    if (after.has(id) && after.get(id) !== idx) {
      violations.push(`${path}  ${id}: correctIndex ${idx} → ${after.get(id)}`);
    }
  }
}

if (violations.length) {
  console.error('❌ check-answer-index: 偵測到正解位置被改動 (HARD_STOP, 自動修禁止動 correctIndex):');
  violations.forEach(v => console.error('   ' + v));
  process.exit(1);
}
console.log(`check-answer-index: ${changed.length} 個 lessons 檔改動, correctIndex 全部不變 ✓`);
process.exit(0);
