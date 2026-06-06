/**
 * v2.0.B.237 — Schema tests for listen-build question type.
 *
 * listen-build = 盲聽 + 自由排列. 跟 tap-tiles 差別: tap-tiles 視覺顯示
 * sentence, listen-build 連 sentence template 都不顯示. A2 上限聽力題.
 *
 * Cross-field guards locked here:
 *   - correctTiles 全在 tiles bank.
 *   - distractors >= 1 (tiles.length >= correctTiles.length + 1).
 */
import { describe, it, expect } from 'vitest';
import { QuestionSchema } from '../../src/data/lessons';

describe('listen-build schema', () => {
  it('accepts a valid listen-build with distractors', () => {
    const valid = {
      type: 'listen-build',
      id: 'lb-1',
      level: 'A2',
      difficulty: 'medium',
      speaker: 'grandma',
      sentence: 'The cat is on the wall.',
      sentenceZh: '貓在牆上',
      tiles: ['The', 'cat', 'is', 'on', 'the', 'wall', 'dog', 'roof'],
      correctTiles: ['The', 'cat', 'is', 'on', 'the', 'wall'],
      explanationZh: 'on the wall = 在牆上',
      tags: ['ch1', 'cat'],
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('rejects listen-build when correctTiles contains a tile not in bank', () => {
    const invalid = {
      type: 'listen-build',
      id: 'lb-bad-1',
      level: 'A2',
      difficulty: 'easy',
      speaker: 'mochi',
      sentence: 'I want fish.',
      sentenceZh: '我想吃魚',
      tiles: ['I', 'want', 'milk', 'bread'],
      correctTiles: ['I', 'want', 'fish'], // 'fish' not in tiles
      explanationZh: 'fail',
      tags: [],
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });

  it('rejects listen-build when correctTiles is empty', () => {
    const invalid = {
      type: 'listen-build',
      id: 'lb-bad-2',
      level: 'A2',
      difficulty: 'easy',
      speaker: 'hana',
      sentence: 'Empty.',
      sentenceZh: '空',
      tiles: ['Empty', 'Full'],
      correctTiles: [], // min(1) violation
      explanationZh: 'fail',
      tags: [],
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });

  it('requires sentenceZh (bilingual lock)', () => {
    const invalid = {
      type: 'listen-build',
      id: 'lb-bad-3',
      level: 'A2',
      difficulty: 'medium',
      speaker: 'narrator',
      sentence: 'No Chinese here.',
      // sentenceZh missing — should reject
      tiles: ['No', 'Chinese', 'here', 'fish'],
      correctTiles: ['No', 'Chinese', 'here'],
      explanationZh: 'fail',
      tags: [],
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });

  it('rejects listen-build with invalid difficulty enum value', () => {
    const invalid = {
      type: 'listen-build',
      id: 'lb-bad-4',
      level: 'A2',
      difficulty: 'extreme', // not in ['easy','medium','hard']
      speaker: 'grandma',
      sentence: 'Difficulty test.',
      sentenceZh: '難度測試',
      tiles: ['Difficulty', 'test', 'extra'],
      correctTiles: ['Difficulty', 'test'],
      explanationZh: 'fail',
      tags: [],
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });
});
