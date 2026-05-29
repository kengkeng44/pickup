import { describe, it, expect } from 'vitest';
import { ClozeQuestionsSchema, ClozeQuestionSchema } from '../../src/data/sentences';
import { ScenarioQuestionsSchema } from '../../src/data/scenarios';
import { StoryQuestionsSchema } from '../../src/data/storyKitten';

// Inline fixtures shaped exactly like real entries from
// public/sentences.json + public/scenarios.json + public/story-kitten.json.
// Verifies that the v2.0 ClozeQuestionsSchema preprocess defaults
// `type: 'listen-mc'` for entries missing the discriminator (legacy data).

const LEGACY_SENTENCE = {
  id: 's-001',
  level: 'A2' as const,
  difficulty: 'easy' as const,
  sentence: 'I ___ coffee every morning.',
  options: ['drink', 'drinks', 'drinking', 'drank'] as [string, string, string, string],
  correctIndex: 0 as const,
  explanationZh: 'I is first person singular...',
  tags: ['verb', 'present-simple'],
};

const LEGACY_SCENARIO = {
  id: 'rs-001',
  level: 'A2' as const,
  difficulty: 'easy' as const,
  scenario: 'restaurant' as const,
  scenarioOrder: 0 as const,
  sentence: 'Excuse me, could I ___ the menu, please?',
  options: ['seeing', 'see', 'saw', 'to see'] as [string, string, string, string],
  correctIndex: 1 as const,
  explanationZh: 'could/would takes bare infinitive...',
  tags: ['modal', 'polite-request'],
};

const STORY_LISTEN_MC = {
  id: 'kt-ch1-01',
  level: 'A2' as const,
  difficulty: 'easy' as const,
  sentence: 'I wake up and the rain is falling ___.',
  options: ['gently', 'hard', 'soft', 'fast'] as [string, string, string, string],
  correctIndex: 1 as const,
  explanationZh: 'hard means heavily...',
  type: 'listen-mc' as const,
  chapter: 1 as const,
  questionInChapter: 1 as const,
};

describe('v2.0 ClozeQuestionsSchema preprocess', () => {
  it('accepts legacy entries lacking `type` and stamps listen-mc', () => {
    const parsed = ClozeQuestionsSchema.parse([LEGACY_SENTENCE]);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].type).toBe('listen-mc');
  });

  it('preserves entries that already have an explicit type', () => {
    const explicit = { ...LEGACY_SENTENCE, type: 'read-mc-with-audio' as const };
    const parsed = ClozeQuestionsSchema.parse([explicit]);
    expect(parsed[0].type).toBe('read-mc-with-audio');
  });

  it('ClozeQuestionSchema (single) accepts a fully-typed listen-mc entry', () => {
    const explicit = { ...LEGACY_SENTENCE, type: 'listen-mc' as const };
    const parsed = ClozeQuestionSchema.parse(explicit);
    expect(parsed.id).toBe('s-001');
  });
});

describe('v2.0 ScenarioQuestionsSchema', () => {
  it('accepts legacy scenario entries with no `type` (defaults to listen-mc)', () => {
    const parsed = ScenarioQuestionsSchema.parse([LEGACY_SCENARIO]);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].type).toBe('listen-mc');
    expect(parsed[0].scenario).toBe('restaurant');
  });
});

describe('v2.0 StoryQuestionsSchema (loose, supports all types)', () => {
  it('accepts a listen-mc story entry', () => {
    const parsed = StoryQuestionsSchema.parse([STORY_LISTEN_MC]);
    expect(parsed[0].type).toBe('listen-mc');
    expect(parsed[0].chapter).toBe(1);
  });

  it('accepts a tap-tiles story entry (options/correctIndex omitted)', () => {
    const tapTiles = {
      id: 'kt-ch1-tt',
      level: 'A2' as const,
      sentence: 'Tap the words in order.',
      explanationZh: 'order: subject + verb + object',
      type: 'tap-tiles' as const,
      tiles: ['I', 'see', 'a', 'cat'],
      correctOrder: [0, 1, 2, 3],
      chapter: 1 as const,
      questionInChapter: 8 as const,
    };
    const parsed = StoryQuestionsSchema.parse([tapTiles]);
    expect(parsed[0].type).toBe('tap-tiles');
    expect(parsed[0].tiles).toEqual(['I', 'see', 'a', 'cat']);
  });
});
