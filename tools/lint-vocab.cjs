#!/usr/bin/env node
/**
 * lint-vocab.cjs (桶 C 新 lint 3/3)
 *
 * A2 vocab ban-list scan. Flags B1+ / C1 words that should be replaced with
 * A2 equivalents per `~/.claude/skills/pickup-item-writer/SKILL.md` R3.
 *
 * Bans collected from:
 *   - skill SKILL.md R3 explicit table (soared / scaled / bobbed / drifted /
 *     knelt / forgiveness / blessed / rose color / hidden / volume / garments
 *     / majestic / set to go)
 *   - canonical content QA backlog (boasted / cherished / forbade / pleaded /
 *     banished / lamented / dwelt / vowed / forsaken / yearned / gleaming /
 *     stately / proclaimed / etc)
 *
 * Scans sentence / sentenceEn / question / questionEn / text / options[]
 * in every public/lessons-ch{N}.json.
 *
 * Exit code:
 *   - 0 = warn-only (default)
 *   - 2 = block (--strict mode, intended for CI tightening later)
 *
 * Usage:
 *   node tools/lint-vocab.cjs
 *   node tools/lint-vocab.cjs --ch=1
 *   node tools/lint-vocab.cjs --strict
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
  let strict = false;
  for (const a of process.argv.slice(2)) {
    const m = /^--ch=(\d+)$/.exec(a);
    if (m) chFilter = Number(m[1]);
    if (a === '--strict') strict = true;
  }
  return { chFilter, strict };
}

// -----------------------------------------------------------------------------
// B1+ ban list (lowercase, lemma form — we match \b<lemma>(s|d|ed|ing)?\b)
// -----------------------------------------------------------------------------
const BAN_LIST = [
  // skill SKILL.md R3 table
  { lemma: 'soared',       a2: 'flew high / flew over' },
  { lemma: 'scaled',       a2: 'climbed' },
  { lemma: 'bobbed',       a2: 'floated' },
  { lemma: 'drifted',      a2: 'floated' },
  { lemma: 'knelt',        a2: 'sat / went to (his/her) knees' },
  { lemma: 'forgiveness',  a2: 'mercy / sorry' },
  { lemma: 'blessed',      a2: 'said goodbye / kind words' },
  { lemma: 'garments',     a2: 'clothes' },
  { lemma: 'majestic',     a2: 'great / strong' },

  // Canon B1+ verbs from content QA backlog
  { lemma: 'boasted',      a2: 'said proudly' },
  { lemma: 'cherished',    a2: 'loved' },
  { lemma: 'forbade',      a2: 'said no' },
  { lemma: 'pleaded',      a2: 'asked again / begged' },
  { lemma: 'banished',     a2: 'sent away' },
  { lemma: 'lamented',     a2: 'felt sad / cried' },
  { lemma: 'dwelt',        a2: 'lived' },
  { lemma: 'vowed',        a2: 'promised' },
  { lemma: 'forsaken',     a2: 'left alone' },
  { lemma: 'yearned',      a2: 'wanted' },
  { lemma: 'proclaimed',   a2: 'said loudly' },

  // C1 adjectives (decorative epithets that creep in from canon translation)
  { lemma: 'gleaming',     a2: 'shining' },
  { lemma: 'stately',      a2: 'tall / fine' },
  { lemma: 'magnificent',  a2: 'great / wonderful' },
  { lemma: 'splendid',     a2: 'great / wonderful' },
  { lemma: 'radiant',      a2: 'bright / shining' },
  { lemma: 'luminous',     a2: 'bright' },
  { lemma: 'serene',       a2: 'calm' },
  { lemma: 'tranquil',     a2: 'quiet / calm' },
  { lemma: 'sorrowful',    a2: 'sad' },
  { lemma: 'mournful',     a2: 'sad' },
  { lemma: 'weary',        a2: 'tired' },
  { lemma: 'arduous',      a2: 'hard' },
  { lemma: 'perilous',     a2: 'dangerous' },
  { lemma: 'verdant',      a2: 'green' },
  { lemma: 'humble',       a2: 'small / simple' },
  { lemma: 'meek',         a2: 'quiet / shy' },

  // C1 verbs
  { lemma: 'beheld',       a2: 'saw' },
  { lemma: 'gazed',        a2: 'looked' },
  { lemma: 'whispered',    a2: 'said quietly' },  // borderline A2 but flagged for review
  { lemma: 'roamed',       a2: 'walked around' },
  { lemma: 'wandered',     a2: 'walked' },
  { lemma: 'fetched',      a2: 'brought / got' },
  { lemma: 'beseeched',    a2: 'asked / begged' },
  { lemma: 'departed',     a2: 'left' },
  { lemma: 'concealed',    a2: 'hid' },
  { lemma: 'revealed',     a2: 'showed' },
];

// Build a single regex (case-insensitive) per lemma covering common inflections.
// We allow trailing s / d / ed / ing / 'd / 's / es so "soared / soaring" both
// catch when lemma is "soared" (matches via the base "soar"...). Approach: take
// the lemma string verbatim AND also generate a base form by stripping common
// English suffixes (ed/d/s/es/ing) — then match either + inflection.
function buildBaseForms(lemma) {
  const set = new Set([lemma]);
  // strip suffix to base
  const strips = [
    [/ed$/i, ''],
    [/d$/i, ''],
    [/ing$/i, ''],
    [/s$/i, ''],
    [/es$/i, ''],
  ];
  for (const [re, sub] of strips) {
    if (re.test(lemma)) {
      const base = lemma.replace(re, sub);
      if (base.length >= 3) set.add(base);
    }
  }
  return [...set];
}

const COMPILED_BANS = BAN_LIST.map(b => {
  const bases = buildBaseForms(b.lemma);
  // pattern: \b(base1|base2)(s|es|ed|d|ing)?\b
  const alt = bases.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const pattern = new RegExp(`\\b(?:${alt})(?:s|es|ed|d|ing)?\\b`, 'i');
  return { ...b, pattern };
});

// -----------------------------------------------------------------------------
// Field collection (English fields only)
// -----------------------------------------------------------------------------
function collectFields(lessons) {
  const out = [];
  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      const push = (field, text) => {
        if (typeof text === 'string' && text.length > 0) out.push({ qId: q.id, field, text });
      };
      push('sentence', q.sentence);
      push('sentenceEn', q.sentenceEn);
      push('question', q.question);
      push('questionEn', q.questionEn);
      push('text', q.text);
      if (Array.isArray(q.options)) q.options.forEach((o, i) => push(`option[${i}]`, o));
    }
  }
  return out;
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------
function main() {
  const { chFilter, strict } = parseArgs();
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
    console.log('lint-vocab: no lessons-ch*.json files matched.');
    process.exit(0);
  }

  console.log(`lint-vocab (A2 ban-list: ${BAN_LIST.length} lemmas, ${strict ? 'STRICT' : 'warn-only'})`);
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
      for (const b of COMPILED_BANS) {
        const m = b.pattern.exec(s.text);
        if (!m) continue;
        hits.push({
          qId: s.qId,
          field: s.field,
          banned: m[0],
          suggested: b.a2,
          preview: s.text.slice(0, 80),
        });
      }
    }

    console.log(`\n--- ${file} (${samples.length} strings scanned) ---`);
    if (hits.length === 0) {
      console.log('  OK — no B1+ vocab hits');
    } else {
      console.log(`  ${hits.length} B1+ vocab hit(s):`);
      console.log(`  ${'Q ID'.padEnd(22)} ${'field'.padEnd(12)} ${'banned'.padEnd(15)} → A2 suggestion`);
      for (const h of hits) {
        console.log(`  ${h.qId.padEnd(22)} ${h.field.padEnd(12)} ${h.banned.padEnd(15)} → ${h.suggested}`);
        console.log(`     "${h.preview}"`);
      }
    }
    totalHits += hits.length;
  }

  console.log('\n' + '='.repeat(78));
  console.log(`Summary: ${totalHits} B1+ vocab hit(s) across ${files.length} chapter file(s)`);
  if (strict && totalHits > 0) {
    console.error('STRICT mode: blocking (exit 2).');
    process.exit(2);
  }
  console.log(strict ? '(strict mode, no hits — exit 0)' : '(warn-only; pass --strict to block on hits)');
  process.exit(0);
}

main();
