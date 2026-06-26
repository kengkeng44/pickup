import { describe, it, expect } from 'vitest';
import { canonical, checkAnswer } from '../../src/data/answerMatch';

describe('canonical', () => {
  it('lowercases, trims, strips punctuation', () => {
    expect(canonical("  I'm Good! ")).toBe('i am good');
    expect(canonical('I am good.')).toBe('i am good');
  });
  it('expands contractions symmetrically', () => {
    expect(canonical("I'm good")).toBe(canonical('I am good'));
    expect(canonical("don't go")).toBe(canonical('do not go'));
    expect(canonical("it's a cat")).toBe(canonical('it is a cat'));
    expect(canonical("can't")).toBe(canonical('cannot'));
  });
  it('normalizes curly apostrophes', () => {
    expect(canonical('I’m good')).toBe('i am good');
  });
});

describe('checkAnswer — correct', () => {
  it('exact match', () => {
    expect(checkAnswer("I'm good", "I'm good").status).toBe('correct');
  });
  it('case / punctuation insensitive', () => {
    expect(checkAnswer('i am good', "I'm good").status).toBe('correct');
    expect(checkAnswer('I am good.', "I'm good").status).toBe('correct');
  });
  it('contraction variant accepted', () => {
    expect(checkAnswer('I am good', "I'm good").status).toBe('correct');
    expect(checkAnswer("I'm good", 'I am good').status).toBe('correct');
  });
  it('alternative phrasing via accept[]', () => {
    const r = checkAnswer("I'm fine", "I'm good", ["I'm fine", "I'm doing well"]);
    expect(r.status).toBe('correct');
  });
  it('uppercase input', () => {
    expect(checkAnswer("I'M GOOD", "I'm good").status).toBe('correct');
  });
});

describe('checkAnswer — near (差一點)', () => {
  it('single-letter typo', () => {
    const r = checkAnswer('I am gopd', "I'm good"); // goPd ~ good
    expect(r.status).toBe('near');
    expect(r.reason).toBe('typo');
  });
  it('missing article', () => {
    const r = checkAnswer('I have cat', 'I have a cat');
    expect(r.status).toBe('near');
    expect(r.reason).toBe('article');
  });
  it('extra article', () => {
    const r = checkAnswer('I have a the cat', 'I have a cat');
    expect(r.status).toBe('near');
  });
  it('one extra trailing word', () => {
    const r = checkAnswer('I am good now', 'I am good');
    expect(r.status).toBe('near');
  });
  it('words out of order', () => {
    const r = checkAnswer('good am I', 'I am good');
    expect(r.status).toBe('near');
    expect(r.reason).toBe('order');
  });
});

describe('checkAnswer — wrong', () => {
  it('empty input', () => {
    expect(checkAnswer('', "I'm good").status).toBe('wrong');
  });
  it('completely different', () => {
    expect(checkAnswer('the weather is sunny', "I'm good").status).toBe('wrong');
  });
  it('too short vs answer', () => {
    expect(checkAnswer('good', "I'm very good today").status).toBe('wrong');
  });
  it('wrong word (not a typo)', () => {
    expect(checkAnswer('I am bad', "I'm good").status).toBe('wrong');
  });
});
