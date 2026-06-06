#!/usr/bin/env node
/**
 * tools/og-image.cjs — Pickup 拾光 Open Graph image generator.
 *
 * Generates 1200x630 OG cards per chapter. SVG is the source of
 * truth (zero-dep); PNG render hint is printed for the user to
 * pipe through a real rasterizer (sharp / playwright / imagemagick).
 *
 * USAGE
 *   node tools/og-image.cjs [--ch=N|all] [--out=dir] [--dry]
 *
 * FLAGS
 *   --ch=N      Restrict to chapter N (0-7). Default: all.
 *   --out=dir   Output dir. Default: public/og/
 *   --dry       Print what would be written, don't touch disk.
 *   --help / -h Show this help.
 *
 * OUTPUT
 *   public/og/ch{N}.svg              — source SVG (1200x630)
 *   public/og/ch{N}.png              — placeholder hint or rendered (manual)
 *   public/og/render-cmds.txt        — copy-paste commands to PNG-ify
 *
 * No npm packages used. Native node only.
 *
 * Author: 桶 H Marketing agent. 2026-06-06.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LESSONS_DIR = path.join(ROOT, 'public');
const DEFAULT_OUT = path.join(ROOT, 'public', 'og');

const W = 1200;
const H = 630;

// ─── Brand tokens ─────────────────────────────────────────────────────
const BG = '#fef8ed';            // Pickup warm cream
const TEXT_DARK = '#3a2a18';     // Warm dark
const ACCENT = '#e7a44a';        // Amber
const TERRACOTTA = '#c84a3a';
const OLIVE = '#7d9a4f';

const CHAPTER_TITLES = {
  0: { zh: '認識 Mochi 與奶奶', en: 'Meet Mochi & Grandma', emoji: '🐈‍⬛' },
  1: { zh: '桃太郎', en: 'Momotaro', emoji: '🍑' },
  2: { zh: '醜小鴨', en: 'The Ugly Duckling', emoji: '🦢' },
  3: { zh: '龜兔賽跑', en: 'The Tortoise and the Hare', emoji: '🐢' },
  4: { zh: '駱駝為什麼有駝峰', en: 'The Camel\'s Hump', emoji: '🐪' },
  5: { zh: 'Baba Yaga 雞腳屋', en: 'Baba Yaga', emoji: '🏚️' },
  6: { zh: '六隻天鵝', en: 'Six Swans', emoji: '🦢' },
  7: { zh: '葉限', en: 'Ye Xian (Tang Cinderella)', emoji: '🏺' },
};

// ─── Help ─────────────────────────────────────────────────────────────
function help() {
  console.log(`
tools/og-image.cjs — Pickup OG image generator

USAGE
  node tools/og-image.cjs [--ch=N|all] [--out=dir] [--dry]

FLAGS
  --ch=N      Restrict to chapter N (0-7). Default: all.
  --out=dir   Output dir. Default: public/og/
  --dry       Print what would be written, don't touch disk.
  --help / -h Show this help.

OUTPUT
  public/og/ch{N}.svg        — 1200x630 source SVG
  public/og/render-cmds.txt  — commands to convert SVG to PNG manually

EXAMPLES
  node tools/og-image.cjs --dry
  node tools/og-image.cjs --ch=1
  node tools/og-image.cjs                       # all chapters

PNG RENDER (after SVG generated)
  npx sharp-cli -i public/og/ch1.svg -o public/og/ch1.png resize 1200 630
  OR
  npx playwright screenshot --viewport-size=1200,630 \\
      file:///<abs-path>/public/og/ch1.svg public/og/ch1.png
  OR (ImageMagick installed)
  magick public/og/ch1.svg -resize 1200x630 public/og/ch1.png
`);
}

// ─── Arg parse ────────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = { ch: 'all', out: DEFAULT_OUT, dry: false, help: false };
  for (const a of argv) {
    if (a === '--help' || a === '-h') out.help = true;
    else if (a === '--dry') out.dry = true;
    else if (a.startsWith('--ch=')) out.ch = a.slice(5);
    else if (a.startsWith('--out=')) out.out = path.resolve(a.slice(6));
  }
  return out;
}

// ─── XML escape ───────────────────────────────────────────────────────
function xe(s) {
  return String(s).replace(/[<>&'"]/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
  })[c]);
}

// ─── Load lesson count for sub-stat ───────────────────────────────────
function lessonCount(ch) {
  const fp = path.join(LESSONS_DIR, `lessons-ch${ch}.json`);
  if (!fs.existsSync(fp)) return 0;
  try {
    const d = JSON.parse(fs.readFileSync(fp, 'utf-8'));
    return Array.isArray(d) ? d.length : 0;
  } catch (_) { return 0; }
}

// ─── SVG builder ──────────────────────────────────────────────────────
function buildSvg(ch) {
  const meta = CHAPTER_TITLES[ch] || { zh: `第 ${ch} 章`, en: `Chapter ${ch}`, emoji: '📖' };
  const lessons = lessonCount(ch);
  const subStat = lessons > 0 ? `${lessons} lessons · A2 兒童雙語童話` : 'A2 兒童雙語童話';

  // Layout coords.
  const logoX = 80, logoY = 90;
  const centerY = H / 2;
  const titleZhSize = 88;
  const titleEnSize = 56;
  const emojiSize = 220;
  const mochiX = 80, mochiY = H - 100, mochiSize = 60;

  // Vignette: 4 soft accent dots in corners for warmth.
  const dots = [
    { cx: 60, cy: 60, r: 12, fill: ACCENT, opacity: 0.18 },
    { cx: W - 60, cy: 60, r: 18, fill: TERRACOTTA, opacity: 0.12 },
    { cx: 60, cy: H - 60, r: 16, fill: OLIVE, opacity: 0.18 },
    { cx: W - 60, cy: H - 60, r: 22, fill: ACCENT, opacity: 0.22 },
  ];

  const lines = [];
  lines.push(`<?xml version="1.0" encoding="UTF-8"?>`);
  lines.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`);
  lines.push(`  <!-- Pickup 拾光 OG card · Ch${ch} · auto-generated ${new Date().toISOString()} -->`);

  // Background.
  lines.push(`  <rect width="${W}" height="${H}" fill="${BG}"/>`);

  // Soft top stripe (Duo flat highlight).
  lines.push(`  <rect x="0" y="0" width="${W}" height="6" fill="${ACCENT}" opacity="0.45"/>`);

  // Decorative dots.
  for (const d of dots) {
    lines.push(`  <circle cx="${d.cx}" cy="${d.cy}" r="${d.r}" fill="${d.fill}" opacity="${d.opacity}"/>`);
  }

  // Top logo.
  lines.push(`  <text x="${logoX}" y="${logoY}" font-family="'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif" font-size="36" font-weight="700" fill="${TEXT_DARK}">拾光 · Pickup</text>`);

  // Right top: chapter badge.
  const badgeText = `Ch${ch}`;
  const badgeW = 130, badgeH = 56;
  const badgeX = W - 80 - badgeW, badgeY = 56;
  lines.push(`  <rect x="${badgeX}" y="${badgeY}" width="${badgeW}" height="${badgeH}" rx="14" fill="${ACCENT}"/>`);
  lines.push(`  <text x="${badgeX + badgeW / 2}" y="${badgeY + badgeH / 2 + 12}" font-family="sans-serif" font-size="34" font-weight="700" fill="#fff" text-anchor="middle">${xe(badgeText)}</text>`);

  // Center emoji.
  lines.push(`  <text x="${W / 2}" y="${centerY - 50}" font-size="${emojiSize}" text-anchor="middle" dominant-baseline="middle">${xe(meta.emoji)}</text>`);

  // Center chapter ZH title.
  lines.push(`  <text x="${W / 2}" y="${centerY + 120}" font-family="'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif" font-size="${titleZhSize}" font-weight="800" fill="${TEXT_DARK}" text-anchor="middle">${xe(meta.zh)}</text>`);

  // Center chapter EN subtitle.
  lines.push(`  <text x="${W / 2}" y="${centerY + 190}" font-family="'Georgia', serif" font-size="${titleEnSize}" font-weight="500" font-style="italic" fill="${TERRACOTTA}" text-anchor="middle">${xe(meta.en)}</text>`);

  // Bottom: Mochi (use 🐈 fallback) + tagline.
  lines.push(`  <text x="${mochiX}" y="${mochiY}" font-size="${mochiSize}" dominant-baseline="middle">🐈</text>`);
  lines.push(`  <text x="${mochiX + mochiSize + 20}" y="${mochiY}" font-family="'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif" font-size="28" font-weight="600" fill="${TEXT_DARK}" dominant-baseline="middle">${xe(subStat)}</text>`);

  // Bottom-right tagline.
  lines.push(`  <text x="${W - 80}" y="${mochiY}" font-family="'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif" font-size="24" font-weight="500" fill="${TEXT_DARK}" opacity="0.7" text-anchor="end" dominant-baseline="middle">奶奶的睡前英文小故事</text>`);

  lines.push(`</svg>`);
  return lines.join('\n') + '\n';
}

// ─── Render cmds.txt ──────────────────────────────────────────────────
function buildRenderCmds(outDir, chapters) {
  const lines = [];
  lines.push(`# Pickup OG image PNG render commands`);
  lines.push(`# Generated ${new Date().toISOString()} by tools/og-image.cjs`);
  lines.push(`#`);
  lines.push(`# Pick ONE of the methods below per chapter.`);
  lines.push(`# Native node has no PNG rasterizer — manual step.`);
  lines.push(``);
  lines.push(`# ─── Method A: sharp-cli (npm) ──────────────────────────────`);
  lines.push(`# npm i -g sharp-cli`);
  for (const ch of chapters) {
    lines.push(`sharp-cli -i ${path.relative(ROOT, outDir).replace(/\\/g, '/')}/ch${ch}.svg -o ${path.relative(ROOT, outDir).replace(/\\/g, '/')}/ch${ch}.png resize 1200 630`);
  }
  lines.push(``);
  lines.push(`# ─── Method B: ImageMagick (system) ─────────────────────────`);
  for (const ch of chapters) {
    lines.push(`magick ${path.relative(ROOT, outDir).replace(/\\/g, '/')}/ch${ch}.svg -resize 1200x630 ${path.relative(ROOT, outDir).replace(/\\/g, '/')}/ch${ch}.png`);
  }
  lines.push(``);
  lines.push(`# ─── Method C: Playwright headless (npm) ────────────────────`);
  lines.push(`# npm i -D playwright && npx playwright install chromium`);
  for (const ch of chapters) {
    const absPath = path.resolve(outDir, `ch${ch}.svg`).replace(/\\/g, '/');
    lines.push(`npx playwright screenshot --viewport-size=1200,630 file:///${absPath} ${path.relative(ROOT, outDir).replace(/\\/g, '/')}/ch${ch}.png`);
  }
  lines.push(``);
  lines.push(`# ─── Method D: rsvg-convert (librsvg, lightest) ─────────────`);
  for (const ch of chapters) {
    lines.push(`rsvg-convert -w 1200 -h 630 ${path.relative(ROOT, outDir).replace(/\\/g, '/')}/ch${ch}.svg -o ${path.relative(ROOT, outDir).replace(/\\/g, '/')}/ch${ch}.png`);
  }
  return lines.join('\n') + '\n';
}

// ─── Main ─────────────────────────────────────────────────────────────
function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) return help();

  // Decide which chapters.
  let chapters;
  if (opts.ch === 'all') {
    chapters = Object.keys(CHAPTER_TITLES).map(Number).sort((a, b) => a - b);
  } else {
    const n = parseInt(opts.ch, 10);
    if (!Number.isFinite(n) || !CHAPTER_TITLES[n]) {
      console.error(`ERR: --ch=${opts.ch} not in 0-7`);
      process.exit(2);
    }
    chapters = [n];
  }
  console.log(`gen: ${chapters.length} chapter card(s) → ${path.relative(ROOT, opts.out)}/`);

  // Idempotent: read existing SVG to compare.
  const willWrite = [];
  for (const ch of chapters) {
    const svg = buildSvg(ch);
    const outSvg = path.join(opts.out, `ch${ch}.svg`);
    let prior = null;
    if (fs.existsSync(outSvg)) {
      try { prior = fs.readFileSync(outSvg, 'utf-8'); } catch (_) {}
    }
    const norm = s => s ? s.replace(/auto-generated [^ ]+ -->/, '-->') : '';
    const changed = !prior || norm(prior) !== norm(svg);
    willWrite.push({ ch, outSvg, svg, changed });
  }

  if (opts.dry) {
    console.log(`\n--- DRY RUN ---`);
    for (const w of willWrite) {
      const tag = w.changed ? 'WRITE' : 'SKIP ';
      console.log(`  [${tag}] ${path.relative(ROOT, w.outSvg)}  (${w.svg.length} bytes)`);
    }
    console.log(`\n--- render cmds preview ---`);
    console.log(buildRenderCmds(opts.out, chapters).split('\n').slice(0, 15).join('\n'));
    console.log(`  ... (full output written to ${path.relative(ROOT, opts.out)}/render-cmds.txt)`);
    return;
  }

  // Write.
  if (!fs.existsSync(opts.out)) fs.mkdirSync(opts.out, { recursive: true });
  let writeCount = 0, skipCount = 0;
  for (const w of willWrite) {
    if (!w.changed) { skipCount++; continue; }
    fs.writeFileSync(w.outSvg, w.svg, 'utf-8');
    writeCount++;
    console.log(`OK   ${path.relative(ROOT, w.outSvg)} (${w.svg.length} bytes)`);
  }
  const cmdsPath = path.join(opts.out, 'render-cmds.txt');
  fs.writeFileSync(cmdsPath, buildRenderCmds(opts.out, chapters), 'utf-8');
  console.log(`OK   ${path.relative(ROOT, cmdsPath)}`);

  console.log(`\nSUMMARY: ${writeCount} new/updated, ${skipCount} unchanged.`);
  console.log(`PNG: native node has no rasterizer. Run a command from`);
  console.log(`     ${path.relative(ROOT, cmdsPath)} to convert SVG→PNG.`);
}

main();
