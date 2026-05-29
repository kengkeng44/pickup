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

// Pickup brand palette + style — Isometric Duolingo chibi (matches existing iso-grandma.webp / iso-shiba.webp aesthetic)
const STYLE_BASE = `Isometric Duolingo-style chibi character (think Duolingo's Lin / Junior / Lily characters — clean rounded shapes, large head small body, friendly inviting). Soft cel-shaded with very minimal subtle outline (NOT bold black ink outline). Studio Ghibli warm palette.

PALETTE LOCK: amber #e7a44a, cream #fef8ed, coffee brown #8b6f4a, olive green #7d9a4f, warm dark text #3c2a1c. Avoid bright Disney saturation. Avoid Duolingo bright green #58cc02.

SHADING: gentle soft cel-shading only. Flat color blocks. NO gradient. NO halo. NO glow. NO blur drop shadow. NO baked floor shadow under character.

CRITICAL — what NOT to include (runtime app draws these):
- NO white tile platform under character
- NO sticker die-cut border around character
- NO drop shadow blob under character
- NO baked ellipse floor beneath
- The character must stand cleanly on transparent background. The Pickup app composites a solid ellipse floor shadow (rgba(60,42,28,0.3), zero blur) at runtime beneath the character — your output must NOT include any pre-baked shadow.

OUTPUT: Square 1024x1024. Pure transparent background. Character occupies center, feet touch lower-middle of canvas (not bottom edge — leave ~15% bottom margin for runtime ellipse). NO text, NO words, NO speech bubbles.`;

const CHARACTERS = {
  grandma: {
    name: 'iso-grandma',
    prompt: `${STYLE_BASE}

Subject: A kind elderly East Asian grandmother sitting on a small low wooden chair, reading from a small open storybook resting on her lap. Bedtime storytelling pose (NOT umbrella-holding). Gentle warm closed-mouth smile. Soft round glasses. Silver hair tied in low bun. Wearing warm amber knitted cardigan over cream blouse, brown long skirt. Hands gently on book. Posture peaceful, slightly leaning forward as if narrating. Big round black dot eyes with single white highlight (kawaii Duolingo style). Soft kind face with subtle laugh lines. Chair is small and simple, brown wood — no tile under it. The grandmother and chair together as a unified isometric unit, character clearly the focus.

Inspired by Studio Ghibli grandmothers (warm, wise, gentle) + Duolingo chibi proportions (large head small body). Round shapes. Cozy and inviting. Avoid Western Disney style.`,
  },
  shiba: {
    name: 'iso-shiba',
    prompt: `${STYLE_BASE}

Subject: A chibi shiba inu dog (柴犬), sitting upright in a relaxed listening posture. NO cushion or pillow underneath (character stands directly on transparent background). Attentive ears perked up. Gentle alert closed-mouth smile with tip of tongue slightly visible. Fluffy curled tail wrapped at side. Classic shiba markings: orange-amber back and head, cream belly + face mask + paws. Wide kawaii black-dot eyes with single white highlight. Looking up alert as if listening to a story being told. Compact round chibi body proportions, NOT realistic shiba anatomy.

Inspired by Studio Ghibli small animals and Duolingo chibi pets. Round shapes. The dog should look like a beloved family pet — warm, friendly, calm.`,
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
