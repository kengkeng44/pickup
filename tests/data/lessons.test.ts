import { describe, it, expect } from 'vitest';
import { QuestionSchema } from '../../src/data/lessons';

describe('QuestionSchema (discriminated union)', () => {
  it('accepts valid listen-mc with 4 options', () => {
    const valid = {
      type: 'listen-mc',
      id: 'test-mc-1',
      level: 'A2',
      difficulty: 'easy',
      sentence: 'The cat is here.',
      question: 'Which word?',
      options: ['cat', 'dog', 'fish', 'bird'],
      correctIndex: 0,
      explanationZh: 'cat = 貓',
      tags: ['test'],
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('accepts tap-tiles with 5+ tiles (no max-4 lie)', () => {
    const valid = {
      type: 'tap-tiles',
      id: 'test-tap-1',
      level: 'A2',
      sentence: 'She came back every night.',
      question: 'Tap what you hear',
      tiles: ['She', 'came', 'back', 'every', 'night', 'always', 'house'],
      correctOrder: [0, 1, 2, 3, 4],
      explanationZh: 'past tense of come',
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('accepts tap-pairs with exactly 4 pairs', () => {
    const valid = {
      type: 'tap-pairs',
      id: 'test-pair-1',
      level: 'A2',
      sentence: 'tonight words',
      question: 'Tap pairs',
      pairs: [
        { left: 'cat', right: '貓' },
        { left: 'dog', right: '狗' },
        { left: 'fish', right: '魚' },
        { left: 'bird', right: '鳥' },
      ],
      explanationZh: 'animals',
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('rejects listen-mc with 5 options (regression: kt-ch1-06 bug)', () => {
    const invalid = {
      type: 'listen-mc',
      id: 'bad-mc',
      level: 'A2',
      sentence: 'too many',
      options: ['a', 'b', 'c', 'd', 'e'],
      correctIndex: 0,
      explanationZh: 'fail',
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });

  it('rejects unknown type', () => {
    const invalid = {
      type: 'mystery-type',
      id: 'x',
      level: 'A2',
      sentence: 's',
      explanationZh: 'e',
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });

  it('rejects tap-tiles with out-of-range correctOrder (cross-field guard)', () => {
    const invalid = {
      type: 'tap-tiles',
      id: 'bad-tap-1',
      level: 'A2',
      sentence: 'too out of range',
      tiles: ['a', 'b', 'c'],
      correctOrder: [0, 1, 99],  // 99 >= tiles.length (3)
      explanationZh: 'fail',
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });
});
