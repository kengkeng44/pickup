/**
 * P19 — data-driven content rule lint over public/lessons-ch*.json.
 *
 * Locks in at test time:
 *  - no ✓/✗ glyphs in pre-reveal fields (feedback_correct_no_checkmark:
 *    答對只用 olive 綠色 bg/border, 不加 ✓; True/False 純文字)
 *  - no emoji in question/options for non-emoji question types
 *    (feedback_pickup_no_emoji_qa: 題目跟答案禁 emoji, 純語言學習;
 *    emoji-pick / listen-emoji 是 by-design 例外)
 *  - no CJK in pre-reveal fields question/options/sentence
 *    (feedback_pickup_no_chinese_pre_reveal: reveal 前所有 surface 禁中文)
 *
 * The CJK rule has 16 PRE-EXISTING violations (Ch7 葉限 ×10 / Ch26 ×1 /
 * Ch27 西遊記 ×5 — bilingual gloss style "葉限 (Yexian)"). Those are frozen
 * into a baseline RATCHET below so the suite stays green while NEW content
 * cannot introduce new violations. When an offender is fixed, remove it
 * from the baseline (the stale-baseline test enforces this).
 * Same offenders are surfaced as warn-only C2_CJK_PRE_REVEAL by
 * tools/validate-lessons.js at build time.
 */
import { describe, it, expect } from 'vitest';

// Load all lesson banks via Vite glob (no node:fs — keeps tsc green under
// types:["vite/client"] without pulling @types/node, which would clash
// setTimeout→NodeJS.Timeout across the app's timer code).
const LESSON_MODULES = import.meta.glob('../../public/lessons-ch*.json', {
  eager: true,
}) as Record<string, { default: unknown[] }>;

function lessonFiles(): Array<[string, unknown[]]> {
  return Object.entries(LESSON_MODULES)
    .map(([p, m]) => [p.split('/').pop() as string, m.default] as [string, unknown[]])
    .filter(([f]) => /^lessons-ch\d+\.json$/.test(f));
}

const CHECKMARK_RE = /[✓✔✗✘]/;
const EMOJI_RE = /\p{Extended_Pictographic}/u;
const CJK_RE = /\p{Script=Han}/u;
const EMOJI_EXEMPT_TYPES = new Set(['emoji-pick', 'listen-emoji']);
const CJK_EXEMPT_TYPES = new Set(['listen-tf-zh']); // Chinese by design

// Ratchet baseline: pre-existing CJK offenders (2026-07 snapshot).
// Format: "<file>::<questionId>::<field>". Only REMOVE entries (after
// fixing content) — never add.
const CJK_BASELINE = new Set<string>([
  'lessons-ch7.json::kt-ch7-l1-q2::sentence',
  'lessons-ch7.json::kt-ch7-l2-q4::sentence',
  'lessons-ch7.json::kt-ch7-l3-q2::sentence',
  'lessons-ch7.json::kt-ch7-l4-q2::sentence',
  'lessons-ch7.json::kt-ch7-l4-q6::sentence',
  'lessons-ch7.json::kt-ch7-l5-q2::sentence',
  'lessons-ch7.json::kt-ch7-l5-q5::sentence',
  'lessons-ch7.json::kt-ch7-l6-q4::sentence',
  'lessons-ch7.json::kt-ch7-l7-q6::sentence',
  'lessons-ch7.json::kt-ch7-l7-q9::sentence',
  'lessons-ch26.json::kt-ch26-l5-q10::question',
  'lessons-ch27.json::kt-ch27-l1-q2::sentence',
  'lessons-ch27.json::kt-ch27-l2-q2::sentence',
  'lessons-ch27.json::kt-ch27-l3-q2::sentence',
  'lessons-ch27.json::kt-ch27-l5-q2::sentence',
  'lessons-ch27.json::kt-ch27-l7-q8::sentence',
]);

interface RawQuestion {
  id: string;
  type: string;
  question?: unknown;
  sentence?: unknown;
  options?: unknown;
}

function eachQuestion(cb: (file: string, q: RawQuestion) => void): void {
  const files = lessonFiles();
  expect(files.length).toBeGreaterThan(0);
  for (const [file, raw] of files) {
    for (const lesson of raw as Array<{ questions?: RawQuestion[] }>) {
      for (const q of lesson.questions ?? []) cb(file, q);
    }
  }
}

/** Pre-reveal string fields of a question: question, sentence, options[]. */
function preRevealFields(q: RawQuestion): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  if (typeof q.question === 'string') out.push(['question', q.question]);
  if (typeof q.sentence === 'string') out.push(['sentence', q.sentence]);
  if (Array.isArray(q.options)) {
    q.options.forEach((o, i) => {
      if (typeof o === 'string') out.push([`options[${i}]`, o]);
    });
  }
  return out;
}

describe('content rules — pre-reveal fields of public/lessons-ch*.json', () => {
  it('no ✓/✗ glyphs anywhere in pre-reveal fields (currently clean — hard rule)', () => {
    const offenders: string[] = [];
    eachQuestion((file, q) => {
      for (const [field, val] of preRevealFields(q)) {
        if (CHECKMARK_RE.test(val)) offenders.push(`${file} ${q.id} ${field}: ${val.slice(0, 50)}`);
      }
    });
    expect(offenders, `✓/✗ glyphs found:\n${offenders.join('\n')}`).toEqual([]);
  });

  it('no emoji in question/options for non-emoji question types (currently clean — hard rule)', () => {
    const offenders: string[] = [];
    eachQuestion((file, q) => {
      if (EMOJI_EXEMPT_TYPES.has(q.type)) return;
      for (const [field, val] of preRevealFields(q)) {
        if (field === 'sentence') continue; // rule scope: question + options
        if (EMOJI_RE.test(val)) offenders.push(`${file} ${q.id} ${field}: ${val.slice(0, 50)}`);
      }
    });
    expect(offenders, `emoji in Q/options found:\n${offenders.join('\n')}`).toEqual([]);
  });

  it('no NEW CJK in pre-reveal fields (ratchet against frozen baseline)', () => {
    const newOffenders: string[] = [];
    eachQuestion((file, q) => {
      if (CJK_EXEMPT_TYPES.has(q.type)) return;
      for (const [field, val] of preRevealFields(q)) {
        if (!CJK_RE.test(val)) continue;
        const key = `${file}::${q.id}::${field.replace(/\[\d+\]$/, '')}`;
        if (!CJK_BASELINE.has(key)) {
          newOffenders.push(`${file} ${q.id} ${field}: ${val.slice(0, 50)}`);
        }
      }
    });
    expect(
      newOffenders,
      `NEW CJK pre-reveal violations (not in the 2026-07 baseline — Chinese only in explanationZh / post-reveal):\n${newOffenders.join('\n')}`
    ).toEqual([]);
  });

  it('CJK baseline is not stale (fixed offenders must be removed from the ratchet)', () => {
    const stillPresent = new Set<string>();
    eachQuestion((file, q) => {
      if (CJK_EXEMPT_TYPES.has(q.type)) return;
      for (const [field, val] of preRevealFields(q)) {
        if (!CJK_RE.test(val)) continue;
        stillPresent.add(`${file}::${q.id}::${field.replace(/\[\d+\]$/, '')}`);
      }
    });
    const stale = [...CJK_BASELINE].filter((k) => !stillPresent.has(k));
    expect(
      stale,
      `Baseline entries no longer violating — remove them so the ratchet tightens:\n${stale.join('\n')}`
    ).toEqual([]);
  });
});
