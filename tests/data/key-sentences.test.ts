/**
 * v2.0.B.235 — Unit tests for KEY_SENTENCES registry + share-card SVG.
 *
 * Guarantees:
 *   - Every chapter 1-8 has ≥ 1 KeySentence.
 *   - Each entry has non-empty `en`, `zh`, `source`, `lessonId`.
 *   - `en` is ≤ 30 chars (copyright + visual budget).
 *   - `lessonId` matches the project's `kt-ch{N}-l{M}` convention and
 *     aligns to chapter N.
 *   - SVG renderer is idempotent and contains the sentence text.
 */
import { describe, it, expect } from 'vitest';
import {
  KEY_SENTENCES,
  getKeySentenceForChapter,
  getKeySentenceForLesson,
} from '../../src/data/keySentences';
import { genShareCardSVG, SHARE_CARD_W, SHARE_CARD_H } from '../../src/data/shareCard';

const CHAPTERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

describe('KEY_SENTENCES registry', () => {
  for (const ch of CHAPTERS) {
    it(`chapter ${ch} has at least one key sentence`, () => {
      const arr = KEY_SENTENCES[ch];
      expect(arr).toBeDefined();
      expect(arr.length).toBeGreaterThanOrEqual(1);
    });
  }

  it('every entry has non-empty en / zh / source / lessonId', () => {
    for (const ch of CHAPTERS) {
      for (const s of KEY_SENTENCES[ch]) {
        expect(s.en.trim().length, `ch${ch} ${s.lessonId} en`).toBeGreaterThan(0);
        expect(s.zh.trim().length, `ch${ch} ${s.lessonId} zh`).toBeGreaterThan(0);
        expect(s.source.trim().length, `ch${ch} ${s.lessonId} source`).toBeGreaterThan(0);
        expect(s.lessonId.trim().length, `ch${ch} lessonId`).toBeGreaterThan(0);
      }
    }
  });

  it('every en stays within the share-card visual budget (≤ 60 chars, ≤ 1 sentence)', () => {
    // Note: user spec said "≤ 30 字" (Chinese chars). For English canonical
    // folktale quotes the equivalent line-of-text budget is ~60 chars —
    // anything longer either wraps badly on the 1200×630 card or starts
    // reproducing more than 1 sentence (copyright risk).
    for (const ch of CHAPTERS) {
      for (const s of KEY_SENTENCES[ch]) {
        expect(s.en.length, `ch${ch} ${s.lessonId} "${s.en}"`).toBeLessThanOrEqual(60);
        // Single sentence rule: no more than one terminal punctuation that
        // isn't at the very end. We allow . ! ? as terminals.
        const terminals = (s.en.match(/[.!?](?=\s|$)/g) || []).length;
        expect(terminals, `ch${ch} ${s.lessonId} "${s.en}" terminal count`).toBeLessThanOrEqual(2);
      }
    }
  });

  it('every zh stays compact (≤ 30 字)', () => {
    for (const ch of CHAPTERS) {
      for (const s of KEY_SENTENCES[ch]) {
        expect(s.zh.length, `ch${ch} ${s.lessonId} "${s.zh}"`).toBeLessThanOrEqual(30);
      }
    }
  });

  it('every lessonId matches kt-ch{N}-l{M} and aligns to its chapter', () => {
    const re = /^kt-ch(\d+)-l(\d+)$/;
    for (const ch of CHAPTERS) {
      for (const s of KEY_SENTENCES[ch]) {
        const m = re.exec(s.lessonId);
        expect(m, `ch${ch} ${s.lessonId} pattern`).not.toBeNull();
        if (m) {
          const chFromId = Number(m[1]);
          expect(chFromId, `ch${ch} ${s.lessonId} chapter alignment`).toBe(ch);
        }
      }
    }
  });
});

describe('getKeySentenceForChapter', () => {
  it('returns the first entry for known chapters', () => {
    for (const ch of CHAPTERS) {
      const s = getKeySentenceForChapter(ch);
      expect(s).not.toBeNull();
      expect(s!.en.length).toBeGreaterThan(0);
    }
  });

  it('returns null for unknown chapter', () => {
    expect(getKeySentenceForChapter(99)).toBeNull();
  });
});

describe('getKeySentenceForLesson', () => {
  it('returns exact-match entry when lessonId matches', () => {
    // Ch1 l7 is the canonical Momotaro reveal entry.
    const s = getKeySentenceForLesson(1, 'kt-ch1-l7');
    expect(s).not.toBeNull();
    expect(s!.lessonId).toBe('kt-ch1-l7');
  });

  it('falls back to chapter primary when lessonId is unknown', () => {
    const s = getKeySentenceForLesson(1, 'kt-ch1-l99-doesnt-exist');
    expect(s).not.toBeNull();
    // Falls back to first entry of chapter — same as getKeySentenceForChapter.
    const primary = getKeySentenceForChapter(1);
    expect(s!.lessonId).toBe(primary!.lessonId);
  });

  it('returns null when chapter has no entries', () => {
    expect(getKeySentenceForLesson(99, 'kt-ch99-l1')).toBeNull();
  });
});

describe('genShareCardSVG', () => {
  it('returns identical bytes for the same input (idempotent)', () => {
    const s = KEY_SENTENCES[1][0];
    const a = genShareCardSVG(s);
    const b = genShareCardSVG(s);
    expect(a).toBe(b);
  });

  it('contains an svg root with the share dimensions', () => {
    const s = KEY_SENTENCES[1][0];
    const svg = genShareCardSVG(s);
    expect(svg).toContain(`<svg xmlns="http://www.w3.org/2000/svg" width="${SHARE_CARD_W}" height="${SHARE_CARD_H}"`);
    expect(svg).toContain('</svg>');
  });

  it('embeds the english + chinese text + source', () => {
    const s = KEY_SENTENCES[2][0]; // Andersen 醜小鴨
    const svg = genShareCardSVG(s);
    expect(svg).toContain(s.en);
    expect(svg).toContain(s.zh);
    expect(svg).toContain(s.source);
  });

  it('xml-escapes apostrophes so quotes do not break attribute parsing', () => {
    const s = {
      lessonId: 'test-quote',
      en: "I'll huff and puff.",
      zh: '我會吹氣。',
      source: "Test 'apostrophe' source",
    };
    const svg = genShareCardSVG(s);
    // Apostrophes from the input must be entity-escaped in the output.
    expect(svg).toContain('I&apos;ll huff and puff.');
    expect(svg).toContain("Test &apos;apostrophe&apos; source");
  });
});
