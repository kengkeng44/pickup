/**
 * v2.0.B.232 — Schema sanity tests for the 5 new question types added per
 * docs/TODO.md content expansion list (listen-emoji big / picture-mc /
 * read-and-tap / drag-blank / speak-back).
 *
 * Each `describe` block has at least one accept-path + one reject-path
 * to lock down the cross-field guards in QuestionSchema.superRefine().
 */
import { describe, it, expect } from 'vitest';
import { QuestionSchema } from '../../src/data/lessons';

describe('listen-emoji schema', () => {
  it('accepts a valid listen-emoji question with 4 emoji options', () => {
    const valid = {
      type: 'listen-emoji',
      id: 'le-cat-1',
      level: 'A2',
      sentence: 'cat',
      options: ['🐈 cat', '🐕 dog', '🐦 bird', '🐟 fish'],
      optionsZh: ['貓', '狗', '鳥', '魚'],
      correctIndex: 0,
      explanationZh: 'cat = 貓',
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('rejects listen-emoji with 5 options (shares FourOptionShape constraint)', () => {
    const invalid = {
      type: 'listen-emoji',
      id: 'le-bad',
      level: 'A2',
      sentence: 'cat',
      options: ['🐈 cat', '🐕 dog', '🐦 bird', '🐟 fish', '🐔 chicken'],
      correctIndex: 0,
      explanationZh: 'fail',
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });
});

describe('picture-mc schema', () => {
  it('accepts a valid picture-mc with imageEmoji', () => {
    const valid = {
      type: 'picture-mc',
      id: 'pm-1',
      level: 'A2',
      sentence: 'The cat is sleeping on the couch.',
      imageEmoji: '😴🐈',
      question: 'Which sentence describes the picture?',
      options: [
        'The cat is sleeping on the couch.',
        'The cat is eating fish.',
        'The cat is jumping over the wall.',
        'The cat is running in the garden.',
      ],
      optionsZh: ['貓在沙發上睡覺', '貓在吃魚', '貓在跳牆', '貓在花園跑'],
      correctIndex: 0,
      explanationZh: 'sleeping = 睡覺',
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('accepts picture-mc with imageUrl (instead of imageEmoji)', () => {
    const valid = {
      type: 'picture-mc',
      id: 'pm-2',
      level: 'A2',
      sentence: 'A dog runs in the park.',
      imageUrl: '/images/dog-park.png',
      question: 'Which sentence describes the picture?',
      options: [
        'A dog runs in the park.',
        'A dog swims in the pool.',
        'A dog eats a bone.',
        'A dog sleeps on a bed.',
      ],
      correctIndex: 0,
      explanationZh: 'runs = 跑',
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('rejects picture-mc with neither imageEmoji nor imageUrl', () => {
    const invalid = {
      type: 'picture-mc',
      id: 'pm-bad',
      level: 'A2',
      sentence: 'A cat.',
      question: 'Which?',
      options: ['cat', 'dog', 'bird', 'fish'],
      correctIndex: 0,
      explanationZh: 'fail',
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });
});

describe('read-and-tap schema', () => {
  it('accepts a valid read-and-tap question (Tap the verb)', () => {
    const valid = {
      type: 'read-and-tap',
      id: 'rt-verb-1',
      level: 'A2',
      sentence: 'The cat jumps on the wall.',
      sentenceZh: '貓跳到牆上',
      promptEn: 'Tap the verb',
      correctWordIndex: 2, // "jumps"
      explanationZh: 'jumps = 動詞',
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('rejects read-and-tap when correctWordIndex >= sentence word count', () => {
    const invalid = {
      type: 'read-and-tap',
      id: 'rt-bad',
      level: 'A2',
      sentence: 'I jump.',
      sentenceZh: '我跳',
      promptEn: 'Tap the verb',
      correctWordIndex: 5, // only 2 words!
      explanationZh: 'fail',
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });
});

describe('drag-blank schema', () => {
  it('accepts a valid drag-blank with single blank', () => {
    const valid = {
      type: 'drag-blank',
      id: 'db-1',
      level: 'A2',
      sentence: 'I want a banana for breakfast.',
      sentenceTemplate: 'I want a __ for breakfast.',
      sentenceZh: '我早餐想要一根香蕉',
      tiles: ['banana', 'cookie', 'umbrella', 'window'],
      correctTiles: ['banana'],
      explanationZh: 'banana = 香蕉',
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('accepts drag-blank with multiple blanks', () => {
    const valid = {
      type: 'drag-blank',
      id: 'db-2',
      level: 'A2',
      sentence: 'The cat is on the wall.',
      sentenceTemplate: 'The __ is on the __.',
      sentenceZh: '貓在牆上',
      tiles: ['cat', 'wall', 'dog', 'roof', 'fish'],
      correctTiles: ['cat', 'wall'],
      explanationZh: 'cat on wall',
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('rejects drag-blank when correctTiles count != blank count', () => {
    const invalid = {
      type: 'drag-blank',
      id: 'db-bad-1',
      level: 'A2',
      sentence: 'I want a banana.',
      sentenceTemplate: 'I want a __ for __.',
      sentenceZh: '我想要',
      tiles: ['banana', 'cookie', 'breakfast'],
      correctTiles: ['banana'], // 2 blanks but only 1 answer
      explanationZh: 'fail',
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });

  it('rejects drag-blank when correctTile not in tiles bank', () => {
    const invalid = {
      type: 'drag-blank',
      id: 'db-bad-2',
      level: 'A2',
      sentence: 'I want a banana.',
      sentenceTemplate: 'I want a __.',
      sentenceZh: '我想要',
      tiles: ['cookie', 'umbrella'],
      correctTiles: ['banana'], // banana not in tiles
      explanationZh: 'fail',
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });
});

describe('speak-back schema', () => {
  it('accepts a valid speak-back question', () => {
    const valid = {
      type: 'speak-back',
      id: 'sb-1',
      level: 'A2',
      sentence: 'I love rainy nights.',
      sentenceZh: '我喜歡下雨的夜晚',
      explanationZh: '練習發音',
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('accepts speak-back with acceptableVariants', () => {
    const valid = {
      type: 'speak-back',
      id: 'sb-2',
      level: 'A2',
      sentence: 'It is raining.',
      sentenceZh: '下雨了',
      acceptableVariants: ["It's raining.", 'Its raining.'],
      explanationZh: '練習發音',
    };
    expect(() => QuestionSchema.parse(valid)).not.toThrow();
  });

  it('rejects speak-back missing sentenceZh', () => {
    const invalid = {
      type: 'speak-back',
      id: 'sb-bad',
      level: 'A2',
      sentence: 'Test.',
      // sentenceZh missing
      explanationZh: 'fail',
    };
    expect(() => QuestionSchema.parse(invalid)).toThrow();
  });
});
