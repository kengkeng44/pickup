#!/usr/bin/env node
/**
 * tools/podcast-rss.cjs — Pickup 拾光 podcast RSS auto-generator.
 *
 * Scans public/audio/lessons/*.mp3, groups by chapter or lesson,
 * reads public/lessons-ch{N}.json for metadata, and emits an
 * RSS 2.0 + iTunes namespace feed at public/podcast/feed.xml.
 *
 * USAGE
 *   node tools/podcast-rss.cjs [--ch=N|all] [--per=chapter|lesson]
 *                              [--out=path] [--base=URL] [--dry]
 *
 * FLAGS
 *   --ch=N         Restrict to chapter N (1-7). Default: all.
 *   --per=chapter  One episode per chapter (default).
 *   --per=lesson   One episode per lesson.
 *   --out=path     Output XML path. Default: public/podcast/feed.xml
 *   --base=URL     CDN base URL prefix for MP3 enclosure.
 *                  Default: https://pickupwords.pages.dev
 *                  (set R2 base when ready, e.g.
 *                   https://r2.pickupwords.com)
 *   --dry          Print what would be written, don't touch disk.
 *   --help / -h    Show this help.
 *
 * IDEMPOTENT: re-run only updates feed.xml when MP3 set changes.
 *
 * No npm packages used. Native node only.
 *
 * Author: 桶 H Marketing agent. 2026-06-06.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT, 'public', 'audio', 'lessons');
const LESSONS_DIR = path.join(ROOT, 'public');
const DEFAULT_OUT = path.join(ROOT, 'public', 'podcast', 'feed.xml');
const DEFAULT_BASE = 'https://pickupwords.pages.dev';

// ─── Help ─────────────────────────────────────────────────────────────
function help() {
  console.log(`
tools/podcast-rss.cjs — Pickup podcast feed generator

USAGE
  node tools/podcast-rss.cjs [--ch=N|all] [--per=chapter|lesson]
                             [--out=path] [--base=URL] [--dry]

FLAGS
  --ch=N         Restrict to chapter N (1-7). Default: all.
  --per=chapter  One episode per chapter (default).
  --per=lesson   One episode per lesson.
  --out=path     Output XML path. Default: public/podcast/feed.xml
  --base=URL     MP3 enclosure base URL (default: pickupwords.pages.dev)
  --dry          Print what would be written, don't touch disk.
  --help / -h    Show this help.

EXAMPLES
  node tools/podcast-rss.cjs --dry
  node tools/podcast-rss.cjs --ch=1 --per=lesson
  node tools/podcast-rss.cjs --base=https://r2.pickupwords.com
`);
}

// ─── Arg parse ────────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = { ch: 'all', per: 'chapter', out: DEFAULT_OUT, base: DEFAULT_BASE, dry: false, help: false };
  for (const a of argv) {
    if (a === '--help' || a === '-h') out.help = true;
    else if (a === '--dry') out.dry = true;
    else if (a.startsWith('--ch=')) out.ch = a.slice(5);
    else if (a.startsWith('--per=')) out.per = a.slice(6);
    else if (a.startsWith('--out=')) out.out = path.resolve(a.slice(6));
    else if (a.startsWith('--base=')) out.base = a.slice(7).replace(/\/+$/, '');
  }
  if (!['chapter', 'lesson'].includes(out.per)) {
    console.error(`ERR: --per must be 'chapter' or 'lesson' (got ${out.per})`);
    process.exit(2);
  }
  return out;
}

// ─── Constants (mirrored from _content-db.cjs) ────────────────────────
const CHAPTER_TITLES = {
  0: 'Intro · 認識 Mochi 與奶奶',
  1: '桃太郎 / Momotaro',
  2: '醜小鴨 / The Ugly Duckling',
  3: '龜兔賽跑 / The Tortoise and the Hare',
  4: '駱駝為什麼有駝峰 / The Camel\'s Hump',
  5: 'Baba Yaga / 雞腳屋',
  6: '六隻天鵝 / Six Swans',
  7: '葉限 / Ye Xian',
};

// Per-type estimated time (seconds) — same as _content-db.cjs.
const TIME_S = {
  'tap-pairs': 30,
  'narration': 15,
  'listen-tf': 20,
  'listen-tf-zh': 20,
  'listen-mc': 35,
  'listen-comprehension': 45,
  'emoji-pick': 25,
  'tap-tiles': 35,
  'read-mc-with-audio': 35,
  'listen-emoji': 25,
  'type-what-you-hear': 60,
};

// ─── MP3 scan ─────────────────────────────────────────────────────────
function scanMp3() {
  if (!fs.existsSync(AUDIO_DIR)) {
    console.error(`ERR: audio dir not found: ${AUDIO_DIR}`);
    process.exit(2);
  }
  // Match kt-ch{N}-l{L}-q{Q}.mp3 OR kt-ch{N}-l{L}-n{N}.mp3
  const re = /^kt-ch(\d+)-l(\d+)-([qn])(\d+)\.mp3$/;
  const files = fs.readdirSync(AUDIO_DIR);
  const byChapter = {};
  for (const f of files) {
    const m = re.exec(f);
    if (!m) continue;
    const ch = parseInt(m[1], 10);
    const lesson = parseInt(m[2], 10);
    const kind = m[3];  // q or n
    const seq = parseInt(m[4], 10);
    (byChapter[ch] ??= {});
    (byChapter[ch][lesson] ??= []);
    byChapter[ch][lesson].push({ file: f, ch, lesson, kind, seq });
  }
  // Sort each lesson by kind (n first) then seq.
  for (const ch of Object.keys(byChapter)) {
    for (const l of Object.keys(byChapter[ch])) {
      byChapter[ch][l].sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === 'n' ? -1 : 1;
        return a.seq - b.seq;
      });
    }
  }
  return byChapter;
}

// ─── Lessons JSON ─────────────────────────────────────────────────────
function loadLessons(ch) {
  const fp = path.join(LESSONS_DIR, `lessons-ch${ch}.json`);
  if (!fs.existsSync(fp)) return null;
  try { return JSON.parse(fs.readFileSync(fp, 'utf-8')); }
  catch (e) { console.error(`WARN: failed to parse ${fp}: ${e.message}`); return null; }
}

// ─── Time estimate ────────────────────────────────────────────────────
function estimateLessonSeconds(lesson) {
  if (!lesson?.questions) return 60;
  let s = 0;
  for (const q of lesson.questions) s += TIME_S[q.type] || 40;
  return s;
}

function fmtDuration(totalS) {
  const h = Math.floor(totalS / 3600);
  const m = Math.floor((totalS % 3600) / 60);
  const s = totalS % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ─── XML escape ───────────────────────────────────────────────────────
function xmlEscape(s) {
  return String(s).replace(/[<>&'"]/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
  })[c]);
}

// ─── Pub date stagger ─────────────────────────────────────────────────
// Episodes need monotonically increasing pubDate. Anchor at 2026-06-01,
// 1 episode per day for chapter-level, 1 every 12h for lesson-level.
function pubDateFor(idx, per) {
  const anchor = new Date('2026-06-01T20:00:00Z');
  const stepMs = per === 'lesson' ? 12 * 3600 * 1000 : 24 * 3600 * 1000;
  return new Date(anchor.getTime() + idx * stepMs).toUTCString();
}

// ─── Build items ──────────────────────────────────────────────────────
function buildItems(byChapter, opts) {
  const items = [];
  const chapters = Object.keys(byChapter).map(Number).sort((a, b) => a - b);
  let idx = 0;

  for (const ch of chapters) {
    if (opts.ch !== 'all' && String(ch) !== String(opts.ch)) continue;
    const lessons = byChapter[ch];
    const lessonsJson = loadLessons(ch) || [];
    const lessonsJsonById = {};
    for (const l of lessonsJson) lessonsJsonById[l.id] = l;

    const lessonIds = Object.keys(lessons).map(Number).sort((a, b) => a - b);
    const chTitle = CHAPTER_TITLES[ch] || `Chapter ${ch}`;

    if (opts.per === 'chapter') {
      // Aggregate metadata for whole chapter.
      const allMp3 = [];
      let totalS = 0;
      const beats = [];
      for (const l of lessonIds) {
        const lessonObj = lessonsJsonById[`kt-ch${ch}-l${l}`];
        if (lessonObj) {
          totalS += estimateLessonSeconds(lessonObj);
          if (lessonObj.storyBeat) beats.push(`L${l}: ${lessonObj.storyBeat}`);
        } else {
          totalS += lessons[l].length * 20;
        }
        for (const mp of lessons[l]) allMp3.push(mp);
      }
      if (allMp3.length === 0) continue;
      // Pick representative mp3 for enclosure — use first available file.
      const enclosure = allMp3[0].file;
      // Sum filesize.
      let fsz = 0;
      for (const m of allMp3) {
        try { fsz += fs.statSync(path.join(AUDIO_DIR, m.file)).size; }
        catch (_) { /* ignore */ }
      }
      const title = `Ch${ch} ${chTitle}`;
      const description = beats.length
        ? `本集收錄 ${chTitle} 全章 ${lessonIds.length} 個 lesson:\n${beats.join('\n')}`
        : `${chTitle} — 全章 ${lessonIds.length} 個 lesson 聲音故事。`;
      items.push({
        title,
        description,
        guid: `pickup-ch${ch}`,
        enclosure: `${opts.base}/audio/lessons/${enclosure}`,
        enclosureBytes: fsz || 1024 * 1024,  // fallback 1MB
        duration: fmtDuration(totalS),
        pubDate: pubDateFor(idx, 'chapter'),
        mp3Count: allMp3.length,
      });
      idx++;
    } else {
      // per=lesson
      for (const l of lessonIds) {
        const mp3s = lessons[l];
        if (!mp3s.length) continue;
        const lessonObj = lessonsJsonById[`kt-ch${ch}-l${l}`];
        const beat = lessonObj?.storyBeat || `Lesson ${l}`;
        const totalS = lessonObj
          ? estimateLessonSeconds(lessonObj)
          : mp3s.length * 20;
        // Enclosure: first MP3 of lesson.
        const enclosure = mp3s[0].file;
        let fsz = 0;
        try { fsz = fs.statSync(path.join(AUDIO_DIR, enclosure)).size; }
        catch (_) { fsz = 1024 * 1024; }

        const title = `Ch${ch}·L${l} ${chTitle} — ${beat}`;
        let description = `${chTitle} 第 ${l} 段 · ${beat}\n本段 ${mp3s.length} 個音訊片段。`;
        if (lessonObj?.questions) {
          const hook = lessonObj.questions.find(q => q.tags?.includes('hook'));
          if (hook?.sentence) description += `\n\nQ11 hook: ${hook.sentence}`;
        }
        items.push({
          title,
          description,
          guid: `pickup-ch${ch}-l${l}`,
          enclosure: `${opts.base}/audio/lessons/${enclosure}`,
          enclosureBytes: fsz,
          duration: fmtDuration(totalS),
          pubDate: pubDateFor(idx, 'lesson'),
          mp3Count: mp3s.length,
        });
        idx++;
      }
    }
  }
  return items;
}

// ─── Render RSS ───────────────────────────────────────────────────────
function renderFeed(items, opts) {
  const lastBuild = new Date().toUTCString();
  const channelTitle = 'Pickup 拾光 · 兒童雙語童話';
  const channelDesc = '奶奶睡前說英文童話 — 8 個世界童話, A2 慢速雙語朗讀。陪小孩 (8-12 歲)、親子、海外華人 heritage 二代睡前 10 分鐘。';
  const link = opts.base;
  const lines = [];
  lines.push(`<?xml version="1.0" encoding="UTF-8"?>`);
  lines.push(`<rss version="2.0"`);
  lines.push(`     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"`);
  lines.push(`     xmlns:atom="http://www.w3.org/2005/Atom"`);
  lines.push(`     xmlns:content="http://purl.org/rss/1.0/modules/content/">`);
  lines.push(`  <channel>`);
  lines.push(`    <title>${xmlEscape(channelTitle)}</title>`);
  lines.push(`    <link>${xmlEscape(link)}</link>`);
  lines.push(`    <description>${xmlEscape(channelDesc)}</description>`);
  lines.push(`    <language>zh-TW</language>`);
  lines.push(`    <copyright>© 2026 Pickup 拾光</copyright>`);
  lines.push(`    <lastBuildDate>${lastBuild}</lastBuildDate>`);
  lines.push(`    <atom:link href="${xmlEscape(link)}/podcast/feed.xml" rel="self" type="application/rss+xml" />`);
  lines.push(`    <itunes:author>Pickup 拾光</itunes:author>`);
  lines.push(`    <itunes:summary>${xmlEscape(channelDesc)}</itunes:summary>`);
  lines.push(`    <itunes:owner>`);
  lines.push(`      <itunes:name>Pickup 拾光</itunes:name>`);
  lines.push(`      <itunes:email>hello@pickupwords.com</itunes:email>`);
  lines.push(`    </itunes:owner>`);
  lines.push(`    <itunes:explicit>false</itunes:explicit>`);
  lines.push(`    <itunes:category text="Kids &amp; Family">`);
  lines.push(`      <itunes:category text="Education for Kids" />`);
  lines.push(`    </itunes:category>`);
  lines.push(`    <itunes:category text="Education">`);
  lines.push(`      <itunes:category text="Language Learning" />`);
  lines.push(`    </itunes:category>`);
  lines.push(`    <itunes:image href="${xmlEscape(link)}/og/podcast-cover.png" />`);

  for (const it of items) {
    lines.push(`    <item>`);
    lines.push(`      <title>${xmlEscape(it.title)}</title>`);
    lines.push(`      <description><![CDATA[${it.description}]]></description>`);
    lines.push(`      <guid isPermaLink="false">${xmlEscape(it.guid)}</guid>`);
    lines.push(`      <pubDate>${it.pubDate}</pubDate>`);
    lines.push(`      <enclosure url="${xmlEscape(it.enclosure)}" length="${it.enclosureBytes}" type="audio/mpeg" />`);
    lines.push(`      <itunes:duration>${it.duration}</itunes:duration>`);
    lines.push(`      <itunes:summary>${xmlEscape(it.description)}</itunes:summary>`);
    lines.push(`      <itunes:explicit>false</itunes:explicit>`);
    lines.push(`    </item>`);
  }
  lines.push(`  </channel>`);
  lines.push(`</rss>`);
  return lines.join('\n') + '\n';
}

// ─── Main ─────────────────────────────────────────────────────────────
function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) return help();

  const byChapter = scanMp3();
  const chFound = Object.keys(byChapter).map(Number).sort((a, b) => a - b);
  console.log(`scan: ${chFound.length} chapter(s) with MP3 found: [${chFound.join(', ')}]`);

  const items = buildItems(byChapter, opts);
  if (items.length === 0) {
    console.error(`WARN: 0 episodes built. Check --ch / --per flags or MP3 presence.`);
    process.exit(1);
  }
  console.log(`build: ${items.length} episode(s) (per=${opts.per}, ch=${opts.ch}, base=${opts.base})`);

  const xml = renderFeed(items, opts);

  if (opts.dry) {
    console.log(`\n--- DRY RUN: would write ${opts.out} (${xml.length} bytes) ---`);
    for (const it of items) {
      console.log(`  [${it.pubDate.slice(0, 16)}] ${it.title}  (dur=${it.duration}, mp3s=${it.mp3Count})`);
    }
    return;
  }

  // Idempotent: skip write if unchanged.
  const outDir = path.dirname(opts.out);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  let prior = null;
  if (fs.existsSync(opts.out)) {
    try { prior = fs.readFileSync(opts.out, 'utf-8'); } catch (_) {}
  }
  // Compare ignoring lastBuildDate line to detect real changes.
  const norm = s => s ? s.replace(/<lastBuildDate>.*?<\/lastBuildDate>/, '') : '';
  if (prior && norm(prior) === norm(xml)) {
    console.log(`OK   ${path.relative(ROOT, opts.out)} — unchanged (idempotent skip)`);
    return;
  }
  fs.writeFileSync(opts.out, xml, 'utf-8');
  console.log(`OK   ${path.relative(ROOT, opts.out)} written (${xml.length} bytes, ${items.length} episodes)`);
}

main();
