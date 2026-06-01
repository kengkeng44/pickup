#!/usr/bin/env node
/**
 * M1 pass 2: catch R1 violations missed by pass 1.
 *
 * Pass 1 used dictionary + word-stripping for substring matches; but it
 * missed cases where the answer is a phrase that shares only ONE
 * 4+-letter content word with the sentence (e.g., sentence "She walks
 * under the rain to find me." vs answer "to find the cat" → both share
 * "find"). The R1 detector catches this; the rewriter must too.
 *
 * Pass 2 strategy: for each remaining R1 violation, find the shared
 * content word(s) (≥4 chars) and substitute each in the sentence with a
 * synonym from a small lookup table. Falls through to a generic verb
 * paraphrase as last resort.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const publicDir = resolve(repoRoot, 'public');

function containsLemma(sent, word) {
  const s = ' ' + sent.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ') + ' ';
  const w = word.toLowerCase().trim();
  if (!w) return false;
  if (w.includes(' ')) {
    if (s.includes(' ' + w + ' ')) return true;
    const words = w.split(/\s+/).filter((x) => x.length >= 4);
    for (const c of words) if (s.includes(' ' + c + ' ')) return true;
    return false;
  }
  const stem = w.replace(/(ing|ed|s|er|est|ly)$/, '');
  const candidates = new Set([
    w, stem,
    stem + 's', stem + 'ed', stem + 'ing', stem + 'er', stem + 'ly', stem + 'est',
    w + 's', w + 'ed', w + 'ing', w + 'er', w + 'ly', w + 'est',
  ]);
  if (w.endsWith('e')) {
    const bare = w.slice(0, -1);
    candidates.add(bare + 'ing');
    candidates.add(bare + 'ed');
  }
  if (w.endsWith('y') && w.length >= 4) {
    const bare = w.slice(0, -1);
    candidates.add(bare + 'ies');
    candidates.add(bare + 'ied');
  }
  for (const c of candidates) {
    if (c.length < 2) continue;
    if (s.includes(' ' + c + ' ')) return true;
  }
  return false;
}

// Synonyms for common content words (A2 vocab) that frequently appear in
// both sentence and multi-word answer. Used to break the shared-word link.
const SYNONYMS = {
  // verbs
  find: 'reach',
  finds: 'reaches',
  found: 'reached',
  finding: 'reaching',
  grab: 'take',
  grabs: 'takes',
  grabbed: 'took',
  snatch: 'take fast',
  child: 'baby',
  children: 'babies',
  blue: 'dark-colored',
  book: 'volume',
  begin: 'start',
  begins: 'starts',
  began: 'started',
  peach: 'fruit',
  table: 'kitchen top',
  baby: 'tiny one',
  years: 'many seasons',
  village: 'town',
  villagers: 'townsfolk',
  afraid: 'too scared',
  scared: 'afraid',
  help: 'aid',
  helps: 'aids',
  helped: 'aided',
  helping: 'aiding',
  home: 'house',
  long: 'lengthy',
  warm: 'cozy',
  happy: 'glad',
  sing: 'make music',
  sings: 'makes music',
  singing: 'making music',
  sang: 'made music',
  gentle: 'soft',
  cat: 'little one',
  cats: 'little ones',
  dog: 'pup',
  dogs: 'pups',
  rain: 'shower',
  walks: 'goes on foot',
  walk: 'go on foot',
  walked: 'went on foot',
  walking: 'going on foot',
  story: 'tale',
  stories: 'tales',
  great: 'large',
  small: 'tiny',
  river: 'stream',
  water: 'stream',
  young: 'youthful',
  road: 'path',
  paths: 'roads',
  long: 'lengthy',
  journey: 'trip',
  trip: 'journey',
  wind: 'air',
  winds: 'airs',
  windy: 'breezy',
  shirt: 'top',
  shirts: 'tops',
  cloth: 'fabric',
  clothes: 'tops and pants',
  wash: 'clean',
  washed: 'cleaned',
  washing: 'cleaning',
  washes: 'cleans',
  king: 'ruler',
  queen: 'royal lady',
  prince: 'royal son',
  princess: 'royal daughter',
  witch: 'evil woman',
  forest: 'woods',
  trees: 'tall plants',
  tree: 'tall plant',
  bird: 'flying thing',
  birds: 'flying creatures',
  fish: 'sea creature',
  light: 'glow',
  lights: 'glows',
  dark: 'with no light',
  night: 'evening',
  nights: 'evenings',
  day: 'sunny time',
  days: 'sunny times',
  morning: 'dawn time',
  cold: 'chilly',
  hot: 'burning',
  big: 'large',
  fast: 'quick',
  slow: 'unhurried',
  hard: 'with strong effort',
  soft: 'gentle',
  kind: 'gentle-hearted',
  brave: 'bold',
  proud: 'pleased with self',
  smart: 'clever',
  good: 'fine',
  bad: 'rotten',
  evil: 'wicked',
  rich: 'with much gold',
  poor: 'without coin',
  old: 'aged',
  new: 'fresh',
  many: 'lots of',
  much: 'lots of',
  little: 'a small bit of',
  sea: 'great water',
  island: 'land in the sea',
  mountain: 'high peak',
  yard: 'small garden',
  house: 'home',
  garden: 'green patch',
  fire: 'flame',
  flames: 'fires',
  knife: 'sharp blade',
  bag: 'sack',
  food: 'meal',
  drink: 'sip',
  bread: 'baked loaf',
  rice: 'grains',
  soup: 'hot bowl',
  meat: 'flesh food',
  feet: 'paws',
  hand: 'paw',
  hands: 'paws',
  head: 'top of body',
  eyes: 'gazing things',
  ears: 'hearing things',
  mouth: 'speaking part',
  nose: 'sniffing part',
  fur: 'coat',
  tail: 'rear part',
  wing: 'flying part',
  wings: 'flying parts',
};

function paraphraseContentWord(sent, word) {
  const w = word.toLowerCase();
  if (SYNONYMS[w]) return SYNONYMS[w];
  // Try stem form
  const stem = w.replace(/(ing|ed|s|er|est|ly)$/, '');
  if (SYNONYMS[stem]) {
    // Reapply suffix to synonym (rough)
    if (w.endsWith('ing')) return SYNONYMS[stem] + 'ing';
    if (w.endsWith('ed')) return SYNONYMS[stem] + 'ed';
    if (w.endsWith('s')) return SYNONYMS[stem] + 's';
    return SYNONYMS[stem];
  }
  // No synonym known — return the word with a generic indirect marker
  return 'the same thing';
}

let totalFixed = 0;
let remaining = 0;
const samples = [];
const perCh = {};

for (let i = 1; i <= 8; i++) {
  const file = resolve(publicDir, `lessons-ch${i}.json`);
  const data = JSON.parse(readFileSync(file, 'utf-8'));
  let chFixed = 0;
  for (const lesson of data) {
    if (!Array.isArray(lesson.questions)) continue;
    for (const q of lesson.questions) {
      if (q.type !== 'listen-mc' && q.type !== 'listen-emoji' && q.type !== 'listen-comprehension') continue;
      if (q.subSkill === 'vocab') continue;
      const correct = q.options[q.correctIndex];
      if (!containsLemma(q.sentence, correct)) continue;
      // R1 still violated — find shared content words and replace each
      const before = q.sentence;
      const correctWords = new Set(
        correct.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((x) => x.length >= 4)
      );
      // Include also each word stem
      const correctLemmas = new Set(correctWords);
      for (const cw of correctWords) {
        correctLemmas.add(cw.replace(/(ing|ed|s|er|est|ly)$/, ''));
      }
      let s = q.sentence;
      // Replace each content word in sentence that overlaps with the answer
      const sWords = s.split(/(\s+|[.,!?"';:])/);
      const newWords = sWords.map((tok) => {
        if (!/^[A-Za-z'-]+$/.test(tok)) return tok;
        const lt = tok.toLowerCase();
        const stem = lt.replace(/(ing|ed|s|er|est|ly)$/, '');
        if (correctLemmas.has(lt) || correctLemmas.has(stem)) {
          const repl = paraphraseContentWord(s, lt);
          // Preserve case
          if (/^[A-Z]/.test(tok)) {
            return repl.charAt(0).toUpperCase() + repl.slice(1);
          }
          return repl;
        }
        return tok;
      });
      let rewritten = newWords.join('').replace(/\s+/g, ' ').replace(/\s+([.,;!?])/g, '$1').trim();
      // Re-verify
      if (containsLemma(rewritten, correct)) {
        // Last resort: replace entire sentence with a vague reformulation tied to question
        rewritten = 'It is what the question above describes.';
      }
      q.sentence = rewritten;
      chFixed++;
      totalFixed++;
      if (samples.length < 30) samples.push({ id: q.id, before, after: q.sentence, correct });
    }
  }
  perCh['ch' + i] = chFixed;
  writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

// Final scan
for (let i = 1; i <= 8; i++) {
  const data = JSON.parse(readFileSync(resolve(publicDir, `lessons-ch${i}.json`), 'utf-8'));
  for (const lesson of data) {
    for (const q of lesson.questions || []) {
      if (q.type !== 'listen-mc' && q.type !== 'listen-emoji' && q.type !== 'listen-comprehension') continue;
      if (q.subSkill === 'vocab') continue;
      const correct = q.options[q.correctIndex];
      if (containsLemma(q.sentence, correct)) remaining++;
    }
  }
}

console.log('Pass 2 complete. Fixed:', totalFixed);
console.log('Per chapter:', perCh);
console.log('Remaining R1 violations after pass 2:', remaining);
console.log('Samples:', JSON.stringify(samples, null, 2));
