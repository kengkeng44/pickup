/**
 * Pickup v2.0.B.278 — auto-bump SW CACHE_VERSION on every build.
 *
 * 為什麼: B.178 到 B.277 99 commits 之間 sw.js byte content 沒變,
 * browser 不偵測 SW update,用戶 PWA cache 永遠卡死 — 看不到任何新 deploy.
 * 此 script 在 vite build 後改 dist/sw.js 的 CACHE_VERSION 成 build timestamp,
 * 確保每次 deploy SW byte 必然 diff → browser 必然觸發 activate → cleanup 舊 cache.
 *
 * 修改範圍只在 dist/ (deployed copy), source public/sw.js 不動 — 保持 git clean.
 *
 * 跑時機: vite build 完成後自動 (package.json `postbuild` hook).
 */
const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, '..', 'dist', 'sw.js');

if (!fs.existsSync(swPath)) {
  console.warn(`[bump-sw-version] dist/sw.js not found at ${swPath}, skipping`);
  process.exit(0);
}

const original = fs.readFileSync(swPath, 'utf8');
const stamp = new Date().toISOString().replace(/[:.]/g, '-').replace(/Z$/, '');
const newVersion = `pickup-build-${stamp}`;

const updated = original.replace(
  /const CACHE_VERSION = '[^']+';/,
  `const CACHE_VERSION = '${newVersion}';`,
);

if (updated === original) {
  console.error('[bump-sw-version] FAIL — CACHE_VERSION pattern not matched. SW byte unchanged across deploys = PWA cache 卡死.');
  process.exit(1);
}

fs.writeFileSync(swPath, updated, 'utf8');
console.log(`[bump-sw-version] ✓ dist/sw.js CACHE_VERSION → ${newVersion}`);
