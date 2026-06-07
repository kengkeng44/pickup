#!/usr/bin/env node
/**
 * v2.0.B.224 — Sync LESSON_HOOKS from src/data/lessonHooks.ts (runtime source-of-truth)
 *               into tools/_content-db.cjs HOOK_MAP (audit) so both files stay aligned.
 *
 * Rationale: src/data/lessonHooks.ts is the RUNTIME source (TS, used by Vite bundle).
 *            tools/_content-db.cjs needs HOOK_MAP for the per-lesson audit table.
 *            These are 2 different runtimes (TS browser vs Node CJS) — single source
 *            file can't be required by both. Manual sync drift = silent UX mismatch.
 *
 * This script:
 *   1. Parses `src/data/lessonHooks.ts` LESSON_HOOKS object via lightweight regex
 *   2. Reads `tools/_content-db.cjs`
 *   3. Replaces HOOK_MAP block between `const HOOK_MAP = {` and matching `};`
 *      with regenerated entries (preserves canon: ref via lookup of existing values)
 *
 * Usage: node tools/_sync-hooks.cjs
 *        npm run sync-hooks  (if wired in package.json)
 *
 * Safety: idempotent. Diff before commit. If parsing fails, exits without writing.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_TS = path.join(ROOT, 'src', 'data', 'lessonHooks.ts');
const TARGET_CJS = path.join(ROOT, 'tools', '_content-db.cjs');

// ─── Parse lessonHooks.ts ─────────────────────────────────────────────
const tsContent = fs.readFileSync(SOURCE_TS, 'utf-8');

// Match: 'kt-ch{N}-l{N}': { type: 'XX', inquiry: 'YY' },
const entryRe = /'(kt-ch\d+-l\d+)':\s*\{\s*type:\s*'([^']+)',\s*inquiry:\s*'([^']*)'\s*\}/g;

const tsEntries = {};
let match;
while ((match = entryRe.exec(tsContent)) !== null) {
  const [, id, type, inquiry] = match;
  tsEntries[id] = { type, inquiry };
}

if (Object.keys(tsEntries).length === 0) {
  console.error(`[sync-hooks] FAIL: 0 entries parsed from ${SOURCE_TS}`);
  console.error(`             check regex against current file syntax`);
  process.exit(1);
}

// ─── Read existing canon refs from _content-db.cjs ───────────────────
const cjsContent = fs.readFileSync(TARGET_CJS, 'utf-8');
const canonRe = /'(kt-ch\d+-l\d+)':\s*\{[^}]*canon:\s*'([^']+)'\s*\}/g;
const canonByLesson = {};
while ((match = canonRe.exec(cjsContent)) !== null) {
  canonByLesson[match[1]] = match[2];
}

// ─── Regenerate HOOK_MAP block ───────────────────────────────────────
// Sort by chapter then lesson
const sortedIds = Object.keys(tsEntries).sort((a, b) => {
  const [, aCh, aL] = a.match(/kt-ch(\d+)-l(\d+)/);
  const [, bCh, bL] = b.match(/kt-ch(\d+)-l(\d+)/);
  return (+aCh - +bCh) || (+aL - +bL);
});

let currentCh = -1;
const STORY_BY_CH = {
  1: '桃太郎', 2: '醜小鴨', 3: '龜兔賽跑',
  4: '駱駝為什麼有駝峰', 5: 'Baba Yaga 雞腳屋', 6: '六隻天鵝',
  7: '葉限 (Tang Cinderella)',
  // v2.0.B.247: Ch8-26 加進來避免 CI sync-hooks 跟手寫長註解打架
  8: '三隻小豬', 9: '灰姑娘 (Perrault 1697)',
  10: '嫦娥奔月', 11: '后羿射日', 12: '牛郎織女',
  13: '小紅帽 (Grimm 1812)', 14: '浦島太郎', 15: '國王的新衣 (Andersen 1837)',
  16: '一寸法師', 17: '鶴的報恩', 18: '興夫和孬夫',
  19: 'Sang Kancil 鼠鹿', 20: '蘿蔔大冒險', 21: 'Anansi 蜘蛛',
  22: '孟母三遷', 23: '司馬光砸缸', 24: '孔融讓梨',
  25: '愚公移山', 26: 'Archimedes Eureka',
};

const lines = [];
for (const id of sortedIds) {
  const ch = +id.match(/kt-ch(\d+)-/)[1];
  if (ch !== currentCh) {
    lines.push(`  // Ch${ch} ${STORY_BY_CH[ch] || ''}`);
    currentCh = ch;
  }
  const { type, inquiry } = tsEntries[id];
  const canon = canonByLesson[id] || '(no canon ref yet)';
  // Escape single quotes in strings for JS literal safety
  const escType = type.replace(/'/g, "\\'");
  const escInquiry = inquiry.replace(/'/g, "\\'");
  const escCanon = canon.replace(/'/g, "\\'");
  // Align columns visually for grep + readability
  const idLit = `'${id}':`.padEnd(16);
  const typeLit = `type: '${escType}',`.padEnd(20);
  lines.push(`  ${idLit} { ${typeLit} inquiry: '${escInquiry}',  canon: '${escCanon}' },`);
}

const newBlock = `const HOOK_MAP = {\n${lines.join('\n')}\n};`;

// ─── Replace HOOK_MAP block in _content-db.cjs ──────────────────────
const blockRe = /const HOOK_MAP\s*=\s*\{[\s\S]*?\n\};/;
if (!blockRe.test(cjsContent)) {
  console.error(`[sync-hooks] FAIL: HOOK_MAP block not found in ${TARGET_CJS}`);
  process.exit(1);
}

const newCjs = cjsContent.replace(blockRe, newBlock);

if (newCjs === cjsContent) {
  console.log(`[sync-hooks] no-op (already in sync, ${sortedIds.length} entries)`);
  process.exit(0);
}

fs.writeFileSync(TARGET_CJS, newCjs, 'utf-8');
console.log(`[sync-hooks] OK — ${sortedIds.length} entries synced from lessonHooks.ts → _content-db.cjs HOOK_MAP`);

// Audit: which entries gained/lost canon refs
const missing = sortedIds.filter(id => !canonByLesson[id]);
if (missing.length > 0) {
  console.log(`[sync-hooks] ⚠️ ${missing.length} entries without canon ref:`);
  for (const id of missing) console.log(`              - ${id}`);
}
