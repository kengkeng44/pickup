import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadChapterLessons, _clearLessonCacheForTests } from '../../src/data/lessons';

describe('loadChapterLessons', () => {
  beforeEach(() => {
    _clearLessonCacheForTests();
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  it('fetches and parses chapter 1 lessons', async () => {
    const sampleLesson = {
      id: 'kt-ch1-l1',
      chapter: 1,
      lessonInChapter: 1,
      segmentType: 'outer-prologue',
      storyBeat: 'Mochi 跳上矮牆',
      questions: [{
        type: 'listen-mc',
        id: 'q1',
        level: 'A2',
        sentence: 'I jump on the wall.',
        options: ['jump', 'walk', 'run', 'sit'],
        correctIndex: 0,
        explanationZh: 'jump = 跳',
      }, {
        type: 'listen-mc',
        id: 'q2',
        level: 'A2',
        sentence: 'The wall is low.',
        options: ['low', 'high', 'long', 'soft'],
        correctIndex: 0,
        explanationZh: 'low = 矮',
      }, {
        type: 'listen-mc',
        id: 'q3',
        level: 'A2',
        sentence: 'I see the yard.',
        options: ['yard', 'park', 'road', 'house'],
        correctIndex: 0,
        explanationZh: 'yard = 院子',
      }],
    };
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [sampleLesson],
    });

    const lessons = await loadChapterLessons(1);
    expect(lessons).toHaveLength(1);
    expect(lessons[0].id).toBe('kt-ch1-l1');
    expect(lessons[0].questions).toHaveLength(3);
  });

  it('injects player cat name into sentences', async () => {
    const sampleLesson = {
      id: 'kt-ch1-l1',
      chapter: 1,
      lessonInChapter: 1,
      segmentType: 'outer-prologue',
      questions: [{
        type: 'listen-mc',
        id: 'q1',
        level: 'A2',
        sentence: 'I am {catName}.',
        options: ['cat', 'dog', 'fish', 'bird'],
        correctIndex: 0,
        explanationZh: 'I am {catName}.',
      }, {
        type: 'listen-mc',
        id: 'q2',
        level: 'A2',
        sentence: 'placeholder',
        options: ['a', 'b', 'c', 'd'],
        correctIndex: 0,
        explanationZh: 'p',
      }, {
        type: 'listen-mc',
        id: 'q3',
        level: 'A2',
        sentence: 'placeholder',
        options: ['a', 'b', 'c', 'd'],
        correctIndex: 0,
        explanationZh: 'p',
      }],
    };
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [sampleLesson],
    });
    (localStorage.getItem as any).mockReturnValue('Mochi');

    const lessons = await loadChapterLessons(1);
    expect(lessons[0].questions[0].sentence).toBe('I am Mochi.');
    expect(lessons[0].questions[0].explanationZh).toBe('I am Mochi.');
  });

  it('throws on fetch failure', async () => {
    (fetch as any).mockResolvedValue({ ok: false, status: 404 });
    await expect(loadChapterLessons(1)).rejects.toThrow();
  });
});
