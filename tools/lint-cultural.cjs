#!/usr/bin/env node
/**
 * lint-cultural.cjs (桶 C 新 lint 2/3)
 *
 * Cultural sensitivity scan for Pickup content (8-12 兒童 + 親子 客群).
 *
 * Flags 4 categories of problematic terms across sentence / question /
 * options / explanationZh fields in public/lessons-ch{N}.json:
 *
 *   1. 性別 stereotype  ("girls are quiet", "boys are strong", etc)
 *   2. 種族 / 國籍 stereotype  (10-15 ban-list phrases)
 *   3. 暴力 / 死亡 explicit terms  (context-aware — 桃太郎 demons exempted)
 *   4. 商業品牌 endorsement risk  (McDonald, iPhone, Disney, etc)
 *
 * For each hit prints:
 *   - file / qId / field / category / matched phrase / fix suggestion
 *
 * Exit code 0 always (warn-only).
 *
 * Usage:
 *   node tools/lint-cultural.cjs
 *   node tools/lint-cultural.cjs --ch=1
 */
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const publicDir = path.resolve(repoRoot, 'public');

// -----------------------------------------------------------------------------
// CLI
// -----------------------------------------------------------------------------
function parseArgs() {
  let chFilter = null;
  for (const a of process.argv.slice(2)) {
    const m = /^--ch=(\d+)$/.exec(a);
    if (m) chFilter = Number(m[1]);
  }
  return { chFilter };
}

// -----------------------------------------------------------------------------
// Ban lists
// -----------------------------------------------------------------------------
// Each entry: { pattern: RegExp (case-insensitive), fix: string }
// Note: patterns kept narrow to avoid false positives on neutral content.

const GENDER_STEREOTYPE = [
  { pattern: /\bgirls?\s+(?:are|should|must)\s+(?:quiet|soft|gentle|pretty|weak|sweet)\b/i,
    fix: 'Avoid gendered traits. Describe the individual character instead.' },
  { pattern: /\bboys?\s+(?:are|should|must)\s+(?:strong|brave|tough|loud|smart)\b/i,
    fix: 'Avoid gendered traits. Describe the individual character instead.' },
  { pattern: /\ba\s+(?:girl|boy)\s+should\b/i,
    fix: 'Prescriptive gender rule. Drop or rephrase as character choice.' },
  { pattern: /\b(?:girls?|boys?)\s+(?:don'?t|do not)\s+(?:cry|fight|play)\b/i,
    fix: 'Sexist prescription. Remove or rewrite as personal feeling.' },
  { pattern: /\b(?:woman|women|wife)\s+(?:belongs?|stays?)\s+(?:home|in the kitchen)\b/i,
    fix: 'Outdated role stereotype. Rephrase as scene action.' },
  { pattern: /\bact\s+like\s+a\s+(?:man|girl|lady)\b/i,
    fix: 'Gender-coded prescription. Use "act bravely / kindly" instead.' },
];

const RACE_NATIONALITY_STEREOTYPE = [
  { pattern: /\basians?\s+(?:are\s+)?(?:smart|good\s+at\s+math)\b/i,
    fix: 'Racial stereotype. Remove.' },
  { pattern: /\bblacks?\s+(?:are\s+)?(?:athletic|fast|tall)\b/i,
    fix: 'Racial stereotype. Remove.' },
  { pattern: /\bwhites?\s+(?:are\s+)?(?:rich|privileged)\b/i,
    fix: 'Racial stereotype. Remove.' },
  { pattern: /\bjapanese\s+(?:are\s+)?(?:polite|robotic|disciplined)\b/i,
    fix: 'National stereotype. Describe a specific character instead.' },
  { pattern: /\bchinese\s+(?:are\s+)?(?:cheap|copy|loud)\b/i,
    fix: 'National stereotype. Remove.' },
  { pattern: /\bamericans?\s+(?:are\s+)?(?:fat|loud|stupid)\b/i,
    fix: 'National stereotype. Remove.' },
  { pattern: /\bindians?\s+(?:are\s+)?(?:smelly|cheap|spicy)\b/i,
    fix: 'National stereotype. Remove.' },
  { pattern: /\bmexicans?\s+(?:are\s+)?(?:lazy|illegal)\b/i,
    fix: 'National stereotype. Remove.' },
  { pattern: /\bfrench\s+(?:are\s+)?(?:rude|smelly)\b/i,
    fix: 'National stereotype. Remove.' },
  { pattern: /\bgermans?\s+(?:are\s+)?(?:cold|strict|nazi)\b/i,
    fix: 'National stereotype. Remove.' },
  { pattern: /\bjews?\s+(?:are\s+)?(?:rich|greedy|cheap)\b/i,
    fix: 'Anti-semitic stereotype. Remove immediately.' },
  { pattern: /\bmuslims?\s+(?:are\s+)?(?:terrorist|violent)\b/i,
    fix: 'Islamophobic stereotype. Remove immediately.' },
  { pattern: /\bgypsy|gypsies\b/i,
    fix: 'Use "Romani" instead — "gypsy" is a slur.' },
  { pattern: /\boriental\b/i,
    fix: 'Use "Asian" — "oriental" is outdated for people.' },
  { pattern: /\billiterate\s+(?:tribe|peasant|peasants)\b/i,
    fix: 'Pejorative framing. Remove.' },
];

// Violence / death terms. Context-aware: 桃太郎 (momotaro) defeats demons (oni),
// which is canonical and child-safe in the original Japanese folklore.
// We allow violence terms only when storyId === 'momotaro' AND the target is
// 'demon' / 'oni' / 'ogre'. Everything else flagged.
const VIOLENCE_TERMS = [
  { pattern: /\b(?:killed|murder|murdered|murders|murdering)\b/i, fix: 'Replace with "defeated" / "stopped" for child audience.' },
  { pattern: /\b(?:blood|bleeding|bloody)\b/i, fix: 'Avoid blood imagery for 8-12 audience.' },
  { pattern: /\b(?:death|dying|died)\b/i, fix: 'Soften to "passed away" / "was gone" for grandparent context.' },
  { pattern: /\b(?:slaughter|massacre|execute|executed)\b/i, fix: 'Too graphic. Remove or replace with "defeated".' },
  { pattern: /\bsuicide\b/i, fix: 'Not appropriate for 8-12 audience. Remove immediately.' },
  { pattern: /\b(?:rape|raped|raping)\b/i, fix: 'Not appropriate. Remove immediately.' },
  { pattern: /\b(?:torture|tortured)\b/i, fix: 'Too graphic. Remove.' },
  { pattern: /\bcorpse(?:s)?\b/i, fix: 'Too graphic. Replace with neutral language.' },
  { pattern: /\bgun(?:s)?\b/i, fix: 'No firearms in fairy-tale frame. Remove.' },
  { pattern: /\bshot\s+(?:him|her|them|dead)\b/i, fix: 'Firearm violence — remove.' },
];

// Context exemption: in Momotaro story, "demons/oni/ogres were defeated/sent away"
// is the canonical resolution. We don't want to false-flag "the demon was killed"
// when storyId === 'momotaro'. We test the SAME string for an exemption signal.
function isMomotaroExempt(text, storyId) {
  if (storyId !== 'momotaro') return false;
  return /\b(?:demon|demons|oni|ogre|ogres)\b/i.test(text);
}

const COMMERCIAL_BRANDS = [
  { pattern: /\bmcdonald(?:'s|s)?\b/i, fix: 'Replace with "burger shop" / generic.' },
  { pattern: /\bstarbucks?\b/i, fix: 'Replace with "coffee shop".' },
  { pattern: /\biphone\b/i, fix: 'Replace with "phone".' },
  { pattern: /\bipad\b/i, fix: 'Replace with "tablet".' },
  { pattern: /\bsamsung\b/i, fix: 'Replace with generic phone / TV.' },
  { pattern: /\bapple\s+(?:store|watch|inc)\b/i, fix: 'Avoid brand endorsement.' },
  { pattern: /\bdisney(?:land|world)?\b/i, fix: 'Replace with "theme park".' },
  { pattern: /\bnetflix\b/i, fix: 'Replace with "streaming app" / "TV".' },
  { pattern: /\byoutube\b/i, fix: 'Replace with "video app".' },
  { pattern: /\btiktok\b/i, fix: 'Replace with "video app".' },
  { pattern: /\bcoca[\s-]?cola\b/i, fix: 'Replace with "soda".' },
  { pattern: /\bpepsi\b/i, fix: 'Replace with "soda".' },
  { pattern: /\bnike\b/i, fix: 'Replace with "sports shoes".' },
  { pattern: /\badidas\b/i, fix: 'Replace with "sports shoes".' },
  { pattern: /\bgoogle\b/i, fix: 'Replace with "search".' },
  { pattern: /\bfacebook\b/i, fix: 'Replace with "social app".' },
  { pattern: /\binstagram\b/i, fix: 'Replace with "photo app".' },
  { pattern: /\bamazon\b/i, fix: 'Replace with "online store" (if not the rainforest).' },
  { pattern: /\btesla\b/i, fix: 'Replace with "electric car".' },
];

const CATEGORIES = [
  { name: 'GENDER_STEREOTYPE', rules: GENDER_STEREOTYPE, contextAware: false },
  { name: 'RACE_NATIONALITY',  rules: RACE_NATIONALITY_STEREOTYPE, contextAware: false },
  { name: 'VIOLENCE',          rules: VIOLENCE_TERMS, contextAware: true },
  { name: 'COMMERCIAL_BRAND',  rules: COMMERCIAL_BRANDS, contextAware: false },
];

// -----------------------------------------------------------------------------
// Field collection
// -----------------------------------------------------------------------------
function collectFields(lessons) {
  const out = [];
  for (const lesson of lessons) {
    const storyId = lesson.storyId || '';
    for (const q of lesson.questions || []) {
      const push = (field, text) => {
        if (typeof text === 'string' && text.length > 0) out.push({ qId: q.id, storyId, field, text });
      };
      push('sentence', q.sentence);
      push('sentenceEn', q.sentenceEn);
      push('question', q.question);
      push('questionEn', q.questionEn);
      push('text', q.text);
      push('explanationZh', q.explanationZh);
      if (Array.isArray(q.options)) q.options.forEach((o, i) => push(`option[${i}]`, o));
    }
  }
  return out;
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------
function main() {
  const { chFilter } = parseArgs();
  const files = fs
    .readdirSync(publicDir)
    .filter(f => /^lessons-ch\d+\.json$/.test(f))
    .filter(f => {
      if (chFilter == null) return true;
      const m = /^lessons-ch(\d+)\.json$/.exec(f);
      return m && Number(m[1]) === chFilter;
    })
    .sort();

  if (files.length === 0) {
    console.log('lint-cultural: no lessons-ch*.json files matched.');
    process.exit(0);
  }

  console.log('lint-cultural (gender / race / violence / brand scan, warn-only)');
  console.log('='.repeat(78));

  let totalHits = 0;
  for (const file of files) {
    const fullPath = path.resolve(publicDir, file);
    let lessons;
    try {
      lessons = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    } catch (e) {
      console.error(`  FAIL parse ${file}: ${e.message}`);
      continue;
    }
    const samples = collectFields(lessons);
    const hits = [];

    for (const s of samples) {
      for (const cat of CATEGORIES) {
        for (const rule of cat.rules) {
          const match = rule.pattern.exec(s.text);
          if (!match) continue;
          // Violence exemption: Momotaro defeating demons is canonical
          if (cat.contextAware && cat.name === 'VIOLENCE' && isMomotaroExempt(s.text, s.storyId)) {
            continue;
          }
          hits.push({
            qId: s.qId,
            field: s.field,
            category: cat.name,
            match: match[0],
            fix: rule.fix,
            preview: s.text.slice(0, 80),
          });
        }
      }
    }

    console.log(`\n--- ${file} (${samples.length} strings scanned) ---`);
    if (hits.length === 0) {
      console.log('  OK — no cultural-sensitivity hits');
    } else {
      console.log(`  ${hits.length} hit(s):`);
      for (const h of hits) {
        console.log(`  [${h.category}] ${h.qId} ${h.field}: "${h.match}"`);
        console.log(`     preview: "${h.preview}"`);
        console.log(`     fix:     ${h.fix}`);
      }
    }
    totalHits += hits.length;
  }

  console.log('\n' + '='.repeat(78));
  console.log(`Summary: ${totalHits} cultural hit(s) across ${files.length} chapter file(s)`);
  console.log('(warn-only; exit 0 — does not block pre-commit)');
  process.exit(0);
}

main();
