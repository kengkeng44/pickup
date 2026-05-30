#!/usr/bin/env node
/**
 * generate-mochi-elevenlabs.js — Mochi (8 y/o boy cat) voice MP3 generator.
 *
 * Uses ElevenLabs API with a community/library voice (voice_id passed via
 * env). Generates Ch1 narration + outro chunks (1st-person Mochi POV).
 *
 * Setup:
 *   ELEVENLABS_API_KEY in env (via Infisical injection: `infisical run --`)
 *   ELEVENLABS_VOICE_ID env (override default below)
 *
 * Run: infisical run --env=dev -- node tools/generate-mochi-elevenlabs.js
 */

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

if (!process.env.ELEVENLABS_API_KEY) {
  console.error('Missing ELEVENLABS_API_KEY. Run via infisical run.');
  process.exit(1);
}

// User reverted to original pick: Lulu Lolipop — high-pitched bubbly girl
// (technically a female "cute cartoon girl" voice). User feedback prefers
// over Quang Anh which was slow. Voice gender re-interpreted: Mochi can
// be a female-presenting cat narrator.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'ocZQ262SsZb9RIxcQBOj';
const MODEL_ID = 'eleven_multilingual_v2';

const audioDir = resolve(repoRoot, 'public/audio/lessons');
if (!existsSync(audioDir)) mkdirSync(audioDir, { recursive: true });

function hash8(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i); return (h >>> 0).toString(16).padStart(8, '0'); }
function sub(s) { return s.replace(/\{catName\}/g, 'Mochi').replace(/\{dogName\}/g, 'Hana'); }
function split(s) { return s.split(/(?<=[.!?])\s+/).map(x => x.trim()).filter(Boolean); }

// Same Ch1 narration + outro blocks as OpenAI grandma generator
const blocks = [
  'I am {catName}. I am a stray cat.\n\nEvery night, I visit one yard. Grandma and her dog {dogName} are there.\n\nGrandma tells stories. I listen with {dogName}.\n\nTonight, she tells one about me…',
  'The story ends. {dogName} is asleep on the floor.\n\nI walk back to the street. Goodnight, Grandma. Goodnight, {dogName}.\n\nSee you tomorrow night.',
];
// v2.0.B.67: also Mochi-POV question sentences from Ch1 (Q2/Q3/Q7/Q8 outer frame)
const mochiQuestionSentences = [
  "Every night I visit Grandma's yard.",
  "{dogName} is Grandma's brown dog.",
  "Goodnight, Grandma.",
  "Four words I want to remember from tonight.",
];
const seen = new Set();
const tasks = [];
for (const block of blocks) {
  const subbed = sub(block);
  for (const part of subbed.split(/\n+/).map(s => s.trim()).filter(Boolean)) {
    if (!seen.has(part)) { seen.add(part); tasks.push(part); }
    for (const chunk of split(part)) if (!seen.has(chunk)) { seen.add(chunk); tasks.push(chunk); }
  }
}
for (const q of mochiQuestionSentences) {
  const subbed = sub(q);
  if (!seen.has(subbed)) { seen.add(subbed); tasks.push(subbed); }
  for (const chunk of split(subbed)) if (!seen.has(chunk)) { seen.add(chunk); tasks.push(chunk); }
}

// v2.0.B.38: also generate ONE concatenated full-narration MP3 for
// single-play iOS Safari (audio chain via ended event still flaky on
// iPhone; one play() call = guaranteed work).
const fullNarration = sub(blocks[0]).replace(/\n+/g, ' '); // join chunks into one paragraph
tasks.unshift(fullNarration); // index 0 = the concat
const CONCAT_FILENAME = 'mochi-ch1-fullnarration.mp3';

console.log(`Generating ${tasks.length} Mochi MP3s via ElevenLabs voice ${VOICE_ID}`);
const totalChars = tasks.reduce((s, t) => s + t.length, 0);
console.log(`Char budget: ${totalChars} (free tier 10K/month)\n`);

let ok = 0;
let failed = 0;
for (let i = 0; i < tasks.length; i++) {
  const text = tasks[i];
  const filename = i === 0 ? CONCAT_FILENAME : `mochi-${hash8(text)}.mp3`;
  const filePath = resolve(audioDir, filename);
  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text,
          model_id: MODEL_ID,
          voice_settings: {
            stability: 0.4,        // lower = more expressive intonation
            similarity_boost: 0.75,
            style: 0.45,           // medium-high = energetic boy
            use_speaker_boost: true,
          },
        }),
      }
    );
    if (!res.ok) {
      const errText = await res.text();
      console.error(`FAIL ${filename}: ${res.status} ${errText.slice(0, 200)}`);
      failed += 1;
      if (res.status === 401 || res.status === 429) {
        console.error('Stopping due to auth/quota');
        break;
      }
      continue;
    }
    writeFileSync(filePath, Buffer.from(await res.arrayBuffer()));
    console.log(`OK ${filename}`);
    ok += 1;
    await new Promise(r => setTimeout(r, 250));
  } catch (e) {
    console.error(`FAIL ${filename}: ${e.message}`);
    failed += 1;
  }
}
console.log(`\nDone. ${ok} generated, ${failed} failed.`);
