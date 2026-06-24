#!/usr/bin/env node
/**
 * v2.0.B.396 — 驗證 ja/ko 內容 overlay 結構對齊來源骨架.
 *
 * 對每個 public/lessons-i18n/ch{N}-{lang}.json:
 *   - 每個來源 qid 都在 (無漏)
 *   - 每個來源欄位 (s/e/q/o/p) 都在 (無漏)
 *   - 陣列欄位 (o/p) 長度一致
 *   - 沒有來源沒有的 qid (無多)
 * 任一不符 → exit 1 (CI / 上線前 gate)。
 *
 *   node tools/validate-content-i18n.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'tools', '_i18n-src');
const OV_DIR = path.join(ROOT, 'public', 'lessons-i18n');

function main() {
  if (!fs.existsSync(OV_DIR)) { console.log('no overlays yet ✓'); return; }
  const files = fs.readdirSync(OV_DIR).filter((f) => /^ch\d+-(ja|ko)\.json$/.test(f));
  let totalIssues = 0;
  let checked = 0;
  for (const f of files.sort()) {
    const m = f.match(/^ch(\d+)-(ja|ko)\.json$/);
    const ch = m[1];
    const srcPath = path.join(SRC_DIR, `ch${ch}.json`);
    if (!fs.existsSync(srcPath)) { console.log(`${f}: ⚠️ no source ch${ch}.json (run extract first)`); totalIssues++; continue; }
    const src = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
    let ov;
    try { ov = JSON.parse(fs.readFileSync(path.join(OV_DIR, f), 'utf8')); }
    catch (e) { console.log(`${f}: ✗ invalid JSON — ${e.message}`); totalIssues++; continue; }
    let issues = 0;
    for (const [id, se] of Object.entries(src)) {
      const oe = ov[id];
      if (!oe) { console.log(`${f}: missing qid ${id}`); issues++; continue; }
      for (const k of Object.keys(se)) {
        if (oe[k] == null) { console.log(`${f}: ${id} missing field ${k}`); issues++; }
        else if (Array.isArray(se[k])) {
          if (!Array.isArray(oe[k]) || oe[k].length !== se[k].length) {
            console.log(`${f}: ${id}.${k} array len ${Array.isArray(oe[k]) ? oe[k].length : 'non-array'} ≠ ${se[k].length}`);
            issues++;
          }
        }
      }
    }
    for (const id of Object.keys(ov)) {
      if (!src[id]) { console.log(`${f}: extra qid not in source: ${id}`); issues++; }
    }
    console.log(`${f}: ${Object.keys(ov).length} entries — ${issues === 0 ? 'PASS ✓' : issues + ' issues ✗'}`);
    totalIssues += issues;
    checked++;
  }
  console.log(`\n${checked} overlay files checked, ${totalIssues} issues.`);
  if (totalIssues > 0) process.exit(1);
}

main();
