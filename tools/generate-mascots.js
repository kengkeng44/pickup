#!/usr/bin/env node
/**
 * generate-mascots.js — Pickup v2.0 post-ship feature
 *
 * Generates character variants via OpenAI gpt-image-1 (transparent PNG).
 * Saves to public/mascots/preview/ — does NOT overwrite existing
 * iso-grandma.webp / iso-shiba.webp etc. User reviews, picks best,
 * Claude moves the chosen file to the real asset path + commits.
 *
 * Cost (2026-05):
 *   - low quality: $0.04/img
 *   - medium quality: $0.11/img (default)
 *   - high quality: $0.19/img
 *   Default 6 PNGs medium ≈ $0.66.
 *
 * Setup:
 *   1. OPENAI_API_KEY in env or .env (or via `infisical run --`)
 *   2. node tools/generate-mascots.js [grandma|shiba|both] [n=3] [quality]
 *
 * Examples:
 *   node tools/generate-mascots.js           # both, 3 variants each, medium
 *   node tools/generate-mascots.js grandma 5 # only grandma, 5 variants
 *   node tools/generate-mascots.js both 2 low # cheap exploration
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

// Load API key (env or .env)
if (!process.env.OPENAI_API_KEY) {
  const envPath = resolve(repoRoot, '.env');
  if (existsSync(envPath)) {
    const envText = readFileSync(envPath, 'utf-8');
    const match = envText.match(/^OPENAI_API_KEY=(.+)$/m);
    if (match) {
      process.env.OPENAI_API_KEY = match[1].trim().replace(/^["']|["']$/g, '');
    }
  }
}
if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY. Set via .env or `infisical run --`.');
  process.exit(1);
}

// Args
const target = (process.argv[2] || 'both').toLowerCase();
const variantsPerChar = parseInt(process.argv[3] || '3', 10);
const quality = (process.argv[4] || 'medium').toLowerCase();
if (!['low', 'medium', 'high'].includes(quality)) {
  console.error('quality must be low / medium / high');
  process.exit(1);
}

// Pickup brand palette + style
const STYLE_BASE = `Isometric chibi sticker character, Studio Ghibli warm palette + Duolingo flat-shape language hybrid. Pickup brand: amber #e7a44a, cream #fef8ed, coffee brown #8b6f4a, olive green #7d9a4f, warm dark text #3c2a1c. Bold black hand-drawn ink outline 4-5px, slightly imperfect wobbly lines. Flat color blocks, NO gradient, NO halo, NO glow. Soft drop shadow at base. Square 1024x1024. Transparent background. Sticker style with subtle die-cut border. NO text, NO words, NO speech bubbles.`;

const CHARACTERS = {
  grandma: {
    name: 'iso-grandma',
    prompt: `${STYLE_BASE}

Subject: A kind elderly Asian grandmother sitting on a low wooden chair in a quiet outdoor yard at night. She is reading from a small old hardback storybook open on her lap, gentle warm smile, soft round glasses. Silver hair tied in a low bun. Wearing a warm amber knitted cardigan over a cream blouse, brown long skirt. Hands rest gently on the book. Posture peaceful and storyteller-like, slightly leaning forward as if narrating to listeners. Eyes are big round black dots with single white highlight — kawaii style not realistic. Face is soft, kind, with subtle laugh lines. Bedtime story telling vibe, NOT umbrella-holding.

Inspired by Studio Ghibli grandmothers (warm, wise, gentle) and Duolingo chibi proportions (large head, small body). Round shapes. Cozy and inviting. Avoid Western Disney style.`,
  },
  shiba: {
    name: 'iso-shiba',
    prompt: `${STYLE_BASE}

Subject: A chibi shiba inu dog (柴犬), sitting upright on a small floor cushion in a quiet outdoor yard at night, attentive ears perked up, gentle alert smile with tongue slightly out, fluffy curled tail, classic shiba orange + cream fur markings (orange back/head, cream belly/face mask/paws). Wide kawaii black-dot eyes with single white highlight. Looking up as if listening to a story. Cozy, slightly sleepy but engaged. Compact round body proportions, NOT realistic shiba detail.

Inspired by Studio Ghibli small animals and Duolingo chibi pets. Round shapes. The dog should look like a beloved family pet, warm and friendly.`,
  },
};

const targets = target === 'both' ? ['grandma', 'shiba'] : [target];
const invalidTargets = targets.filter((t) => !CHARACTERS[t]);
if (invalidTargets.length) {
  console.error(`Unknown character(s): ${invalidTargets.join(', ')}. Use grandma | shiba | both.`);
  process.exit(1);
}

const previewDir = resolve(repoRoot, 'public/mascots/preview');
if (!existsSync(previewDir)) {
  mkdirSync(previewDir, { recursive: true });
}

console.log(`Generating ${variantsPerChar} variants × ${targets.length} character(s) at ${quality} quality...`);
console.log(`Output: ${previewDir}`);
console.log(`Estimated cost: $${(targets.length * variantsPerChar * { low: 0.04, medium: 0.11, high: 0.19 }[quality]).toFixed(2)}\n`);

let success = 0;
let failed = 0;

for (const charKey of targets) {
  const char = CHARACTERS[charKey];
  for (let i = 1; i <= variantsPerChar; i++) {
    const filename = `${char.name}-v${i}.png`;
    const filePath = resolve(previewDir, filename);
    if (existsSync(filePath)) {
      console.log(`SKIP ${filename} (exists — delete to regenerate)`);
      continue;
    }
    try {
      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-image-1',
          prompt: char.prompt,
          n: 1,
          size: '1024x1024',
          quality,
          output_format: 'png',
          background: 'transparent',
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        console.error(`FAIL ${filename}: ${res.status} ${errText.slice(0, 300)}`);
        failed += 1;
        if (res.status === 401 || res.status === 429) {
          console.error('Stopping due to auth/quota.');
          break;
        }
        continue;
      }
      const data = await res.json();
      const b64 = data?.data?.[0]?.b64_json;
      if (!b64) {
        console.error(`FAIL ${filename}: no b64_json in response`);
        failed += 1;
        continue;
      }
      const buf = Buffer.from(b64, 'base64');
      writeFileSync(filePath, buf);
      success += 1;
      console.log(`OK ${filename} (${(buf.length / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`FAIL ${filename}: ${e.message}`);
      failed += 1;
    }
  }
}

console.log(`\nDone. ${success} generated, ${failed} failed.`);
console.log(`Preview at: ${previewDir}`);
console.log(`Next: tell Claude "生完了" — Claude will Read each PNG to display them in chat for you to pick.`);
