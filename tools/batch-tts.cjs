#!/usr/bin/env node
/**
 * batch-tts.cjs — 桶 E Audio automation
 *
 * Batch grandma / mochi / hana OpenAI TTS generator for Ch1-8.
 *
 * Usage:
 *   node tools/batch-tts.cjs --help
 *   node tools/batch-tts.cjs --dry --ch=2 --limit=5
 *   node tools/batch-tts.cjs --ch=3
 *   node tools/batch-tts.cjs --ch=2 --voice=grandma --limit=20
 *
 * Features:
 *   • Idempotent: skips MP3 already on disk (no double-spend)
 *   • Per-chapter mode (--ch=N) or omit for all CHAPTERS_WITH_MP3
 *   • Dry-run (--dry) prints queue without API calls
 *   • Limit (--limit=N) for cost control / smoke test
 *   • Voice routing per question.speaker:
 *       narrator / grandma → nova   (warm, motherly, older)
 *       mochi              → nova + higher-pitch cat-like instructions
 *       hana               → onyx + lower friendly dog-like instructions
 *   • Hanzi stripped before TTS (matches tts.ts cleanText [一-鿿])
 *   • Sequential 1-by-1 with 3x retry + exponential backoff
 *   • audioId hash matches src/audio/tts.ts (djb2 → 8 hex)
 *   • Future-proof --from-r2 flag (R2 wrapper TBD; currently writes
 *     to public/audio/lessons/ either way)
 *
 * Requires OPENAI_API_KEY env (skipped gracefully in --dry mode).
 *
 * NOT a replacement for tools/generate-grandma-audio.js (that one is
 * Ch1 ESM-flavoured legacy; this one is the multi-chapter CLI going
 * forward). They write to the same dir and skip each other safely.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------- arg parsing ----------

const argv = process.argv.slice(2);
const flags = {
  ch: null,        // null = all CHAPTERS_WITH_MP3
  dry: false,
  voice: null,     // null = per-speaker routing; else force one
  limit: null,
  fromR2: false,
  help: false,
};

for (const a of argv) {
  if (a === '--help' || a === '-h') flags.help = true;
  else if (a === '--dry' || a === '--dry-run') flags.dry = true;
  else if (a === '--from-r2') flags.fromR2 = true;
  else if (a.startsWith('--ch=')) flags.ch = parseInt(a.slice(5), 10);
  else if (a.startsWith('--voice=')) flags.voice = a.slice(8).toLowerCase();
  else if (a.startsWith('--limit=')) flags.limit = parseInt(a.slice(8), 10);
  else {
    console.error(`Unknown flag: ${a}. Try --help.`);
    process.exit(2);
  }
}

if (flags.help) {
  console.log(`batch-tts.cjs — Pickup grandma/mochi/hana TTS generator

Usage:
  node tools/batch-tts.cjs [--ch=N] [--dry] [--voice=V] [--limit=N] [--from-r2]

Flags:
  --ch=N        Only chapter N (1-8). Omit = run all CHAPTERS_WITH_MP3 set.
  --dry         List would-generate IDs, don't call OpenAI.
  --voice=V     Force voice for ALL items. V in {grandma, mochi, hana} or
                a raw OpenAI voice name (nova/alloy/echo/onyx/shimmer/fable).
                Omit = per-question routing by speaker tag.
  --limit=N     Cap generation at N files (testing / cost control).
  --from-r2     Future flag: pull existing-MP3 manifest from R2 instead
                of disk scan. Currently no-op; still writes to public/.
  --help, -h    This message.

Env:
  OPENAI_API_KEY  Required for actual generation (dry-run skips).

Cost (gpt-4o-mini-tts @ 2026-06): ~$0.015 per 1000 chars.
Ch1 ~200 files ≈ $0.05. Ch2-7 full ≈ $0.30 each.

Output:
  Writes <audioId>.mp3 (or mochi-<hash>.mp3 for mochi voice) to
  public/audio/lessons/. Idempotent — re-run only fills gaps.
`);
  process.exit(0);
}

if (flags.ch !== null && (isNaN(flags.ch) || flags.ch < 1 || flags.ch > 8)) {
  console.error(`Bad --ch=${flags.ch}. Must be 1-8.`);
  process.exit(2);
}
if (flags.limit !== null && (isNaN(flags.limit) || flags.limit < 1)) {
  console.error(`Bad --limit=${flags.limit}. Must be positive integer.`);
  process.exit(2);
}

// ---------- constants ----------

const repoRoot = path.resolve(__dirname, '..');
const audioDir = path.join(repoRoot, 'public', 'audio', 'lessons');
const MODEL = 'gpt-4o-mini-tts';
const SPEED = 0.85;
const MAX_RETRY = 3;
const BACKOFF_BASE_MS = 1500;

// Mirror src/audio/tts.ts CHAPTERS_WITH_MP3 = {1}; new chapters should
// be added here AND there together once their MP3 batch lands.
const DEFAULT_CHAPTERS = [1, 2, 3, 4, 5, 6, 7, 8];

// ---------- voice routing ----------

const GRANDMA_INSTRUCTIONS =
  'You are an elderly grandmother, 80+ years old, sitting in a quiet wooden chair under a warm yellow lamp at night. You are reading a bedtime story to your beloved cat Mochi and dog Hana. Speak VERY SLOWLY. Pause between EVERY phrase. Soft, raspy, slightly tremulous. Warm and unconditionally kind. Lower your pitch slightly at sentence ends like a lullaby. NOT a young narrator or audiobook reader — sound like a real grandmother who has told this story a thousand times.';

const MOCHI_INSTRUCTIONS =
  'You are Mochi, a small shy stray calico cat narrating in first person. Higher pitch than an adult, slightly cat-like — soft, curious, gentle. Speak clearly and a touch slowly for an A2 English learner. Warm, hopeful, never sad or whiny.';

const HANA_INSTRUCTIONS =
  'You are Hana, a friendly shiba dog character. Lower, warm friendly tone — playful but calm. Speak clearly and a touch slowly for an A2 English learner. Slight bounce in cadence, like a dog who is happy you came back.';

function resolveVoice(speakerTag, isMochi) {
  // Force-voice override
  if (flags.voice) {
    const v = flags.voice;
    if (v === 'grandma' || v === 'narrator') return { voice: 'nova', instructions: GRANDMA_INSTRUCTIONS, key: 'grandma' };
    if (v === 'mochi') return { voice: 'nova', instructions: MOCHI_INSTRUCTIONS, key: 'mochi' };
    if (v === 'hana') return { voice: 'onyx', instructions: HANA_INSTRUCTIONS, key: 'hana' };
    // Raw voice fallback (no instructions)
    return { voice: v, instructions: '', key: v };
  }
  // Per-question routing
  if (isMochi || speakerTag === 'mochi') {
    return { voice: 'nova', instructions: MOCHI_INSTRUCTIONS, key: 'mochi' };
  }
  if (speakerTag === 'hana') {
    return { voice: 'onyx', instructions: HANA_INSTRUCTIONS, key: 'hana' };
  }
  // narrator / grandma / undefined → grandma
  return { voice: 'nova', instructions: GRANDMA_INSTRUCTIONS, key: 'grandma' };
}

// ---------- hash + text utils (mirror src/audio/tts.ts) ----------

function hash8(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(h, 33) ^ s.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

function applyDefaults(s) {
  return s.replace(/\{catName\}/g, 'Mochi').replace(/\{dogName\}/g, 'Hana');
}

// Mirror tts.ts cleanText: strip CJK Unified Ideographs (Ch7 Yexian
// code-switch contains 葉限 etc.) + collapse underscores + whitespace.
function cleanText(text) {
  return text
    .replace(/_{2,}/g, ' ')
    .replace(/[一-鿿]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitChunks(text) {
  return text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
}

// ---------- mochi voice text registry (mirror tts.ts) ----------
// Ch1 narration + outer-frame Q sentences that should be Mochi POV.
// Keep in sync with src/audio/tts.ts mochiTexts seed list.

const CH1_NARRATION_BLOCKS = [
  'I am {catName}. I am a stray cat.\n\nEvery night, I visit one yard. Grandma and her dog {dogName} are there.\n\nGrandma tells stories. I listen with {dogName}.\n\nTonight, she tells one about me…',
  'The story ends. {dogName} is asleep on the floor.\n\nI walk back to the street. Goodnight, Grandma. Goodnight, {dogName}.\n\nSee you tomorrow night.',
];

const CH1_MOCHI_QUESTIONS = [
  "Every night I visit Grandma's yard.",
  "{dogName} is Grandma's brown dog.",
  'Goodnight, Grandma.',
  'Four words I want to remember from tonight.',
];

const mochiTexts = new Set();
function registerMochiText(text) {
  const cleaned = cleanText(text);
  if (cleaned) mochiTexts.add(cleaned);
  for (const chunk of splitChunks(cleaned)) mochiTexts.add(chunk);
}

for (const block of CH1_NARRATION_BLOCKS) {
  const subbed = applyDefaults(block);
  for (const part of subbed.split(/\n+/).map(s => s.trim()).filter(Boolean)) {
    registerMochiText(part);
  }
}
for (const raw of CH1_MOCHI_QUESTIONS) {
  registerMochiText(applyDefaults(raw));
}

// ---------- queue build ----------

function chaptersToScan() {
  if (flags.ch !== null) return [flags.ch];
  return DEFAULT_CHAPTERS;
}

function loadLessons(ch) {
  const p = path.join(repoRoot, 'public', `lessons-ch${ch}.json`);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
  } catch (e) {
    console.error(`  parse fail Ch${ch}: ${e.message}`);
    return null;
  }
}

function expectedFilePath(audioId, isMochi) {
  // Mochi voice uses mochi-<hash>.mp3 naming so tts.ts can route by mochiTexts
  // set membership. Grandma voice uses raw <audioId>.mp3.
  const filename = isMochi ? `mochi-${audioId}.mp3` : `${audioId}.mp3`;
  return path.join(audioDir, filename);
}

function buildQueue() {
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  const queue = [];
  const seen = new Set();      // dedupe by destination filepath
  const skipped = [];          // already-on-disk audioIds

  for (const ch of chaptersToScan()) {
    const lessons = loadLessons(ch);
    if (!lessons) {
      console.log(`Ch${ch}: no lessons file (skip)`);
      continue;
    }
    let chCount = 0;
    for (const lesson of lessons) {
      for (const q of (lesson.questions || [])) {
        if (!q.sentence || !q.id) continue;
        const fullText = applyDefaults(q.sentence);
        const cleaned = cleanText(fullText);
        if (!cleaned) continue;

        const isMochi = mochiTexts.has(cleaned) || q.speaker === 'mochi';
        const route = resolveVoice(q.speaker, isMochi);
        const isMochiVoice = route.key === 'mochi';

        // (1) Full-sentence task — keyed by q.id
        pushTask({
          chapter: ch,
          audioId: q.id,
          isMochi: isMochiVoice,
          text: cleaned,
          speaker: q.speaker || 'narrator',
          route,
        });

        // (2) Sub-sentence chunks (keyed by hash8(chunk)) — only when split
        const chunks = splitChunks(cleaned);
        if (chunks.length > 1) {
          for (const chunk of chunks) {
            const chunkIsMochi = mochiTexts.has(chunk) || isMochiVoice;
            const chunkRoute = chunkIsMochi
              ? resolveVoice('mochi', true)
              : route;
            pushTask({
              chapter: ch,
              audioId: hash8(chunk),
              isMochi: chunkRoute.key === 'mochi',
              text: chunk,
              speaker: q.speaker || 'narrator',
              route: chunkRoute,
            });
          }
        }
      }
    }
    console.log(`Ch${ch}: scanned ${lessons.length} lessons, ${chCount} pending so far`);
  }

  function pushTask(t) {
    const filePath = expectedFilePath(t.audioId, t.isMochi);
    if (seen.has(filePath)) return;
    seen.add(filePath);
    if (fs.existsSync(filePath)) {
      skipped.push(t.audioId);
      return;
    }
    queue.push({ ...t, filePath });
  }

  return { queue, skipped };
}

// ---------- OpenAI call w/ retry ----------

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function generateOne(task) {
  const body = {
    model: MODEL,
    voice: task.route.voice,
    input: task.text,
    speed: SPEED,
    response_format: 'mp3',
  };
  if (task.route.instructions) body.instructions = task.route.instructions;

  let lastErr = null;
  for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
    try {
      const res = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errText = await res.text();
        lastErr = new Error(`HTTP ${res.status}: ${errText.slice(0, 160)}`);
        // 4xx (except 429) is unlikely to fix on retry; bail early.
        if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          throw lastErr;
        }
        const wait = BACKOFF_BASE_MS * Math.pow(2, attempt - 1);
        console.log(`  retry ${attempt}/${MAX_RETRY} after ${wait}ms (${lastErr.message.slice(0, 80)})`);
        await sleep(wait);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(task.filePath, buf);
      return { ok: true, bytes: buf.length };
    } catch (e) {
      lastErr = e;
      if (attempt < MAX_RETRY) {
        const wait = BACKOFF_BASE_MS * Math.pow(2, attempt - 1);
        console.log(`  retry ${attempt}/${MAX_RETRY} after ${wait}ms (${e.message.slice(0, 80)})`);
        await sleep(wait);
      }
    }
  }
  return { ok: false, error: lastErr ? lastErr.message : 'unknown' };
}

// ---------- main ----------

async function main() {
  const startTs = Date.now();
  console.log('---');
  console.log(`Pickup batch-tts — chapters=${flags.ch ?? 'all'} voice=${flags.voice ?? 'auto'} limit=${flags.limit ?? '∞'} dry=${flags.dry} from-r2=${flags.fromR2}`);
  if (flags.fromR2) {
    console.log('  (--from-r2 noted; R2 manifest wrapper not yet implemented — using disk scan)');
  }
  console.log(`  audio dir: ${audioDir}`);
  console.log('---');

  const { queue, skipped } = buildQueue();
  console.log(`\nQueue: ${queue.length} pending, ${skipped.length} already on disk.\n`);

  let workQueue = queue;
  if (flags.limit !== null && queue.length > flags.limit) {
    workQueue = queue.slice(0, flags.limit);
    console.log(`Capped to first ${flags.limit} via --limit.\n`);
  }

  if (workQueue.length === 0) {
    console.log('Nothing to generate. Done.');
    return { gen: 0, skip: skipped.length, fail: 0 };
  }

  // Preview (first 8) so user sees what they're paying for
  const preview = workQueue.slice(0, 8);
  console.log('Preview (first 8):');
  for (const t of preview) {
    console.log(`  [Ch${t.chapter}] ${t.route.key.padEnd(7)} ${t.audioId}  ${t.text.slice(0, 60)}${t.text.length > 60 ? '…' : ''}`);
  }
  if (workQueue.length > 8) console.log(`  … and ${workQueue.length - 8} more`);
  console.log('');

  if (flags.dry) {
    console.log('Dry-run — no API calls made. Use without --dry to generate.');
    return { gen: 0, skip: skipped.length, fail: 0, dry: workQueue.length };
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY not set. Run:');
    console.error('');
    console.error('  PowerShell:  $env:OPENAI_API_KEY = "sk-..."');
    console.error('  Bash/zsh:    export OPENAI_API_KEY="sk-..."');
    console.error('');
    console.error('Then re-run this command.');
    process.exit(1);
  }

  let gen = 0;
  let fail = 0;
  const failedIds = [];
  for (let i = 0; i < workQueue.length; i++) {
    const t = workQueue[i];
    const prefix = `[${i + 1}/${workQueue.length}]`;
    process.stdout.write(`${prefix} ${t.route.key} ${t.audioId} … `);
    const r = await generateOne(t);
    if (r.ok) {
      gen += 1;
      console.log(`OK ${r.bytes}B`);
    } else {
      fail += 1;
      failedIds.push(t.audioId);
      console.log(`FAIL ${r.error.slice(0, 100)}`);
    }
  }

  console.log('');
  console.log('---');
  console.log(`生了 ${gen} 個 / skip ${skipped.length} 個 / fail ${fail} 個`);
  if (failedIds.length) {
    console.log(`Failed: ${failedIds.slice(0, 10).join(', ')}${failedIds.length > 10 ? ` … +${failedIds.length - 10}` : ''}`);
  }
  console.log(`Elapsed: ${((Date.now() - startTs) / 1000).toFixed(1)}s`);
  console.log(`Output dir: ${audioDir}`);
  console.log('Next: update src/audio/tts.ts CHAPTERS_WITH_MP3 to include any newly-covered chapter, then deploy.');

  return { gen, skip: skipped.length, fail };
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
