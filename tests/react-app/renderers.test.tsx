// @vitest-environment jsdom
//
// v2.0.B.480: renderers 的「選答 → 檢查 → 揭示 → 延遲推進」生命週期 smoke 測試。
// 目的: 給 useRevealAdvance (B.479) + 後續要收斂的 MC renderer 一個安全網。
// 之前 renderers.tsx (2280 行核心答題流程) 零測試覆蓋 → 重構全靠手讀, 風險高。
//
// 覆蓋: 點正解 → onAnswer(idx,true) → timer 到 → onAdvance；點錯 → onAnswer(idx,false)。
// (jsdom 無 AudioContext/speechSynthesis, sfx/tts 自動 no-op — 見 AudioManager.ensureContext。)
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, cleanup, within } from '@testing-library/react';
import { createElement } from 'react';

// jsdom 沒有 HTMLMediaElement.play/load + speechSynthesis → tts 的 audio-unlock 會噴 noise。
// 測 renderer 邏輯不需要真音訊, 直接 mock 成 no-op (sfx 本來就會 no-op, 一併靜音保險)。
vi.mock('../../src/audio/tts', () => ({ speak: () => {}, stopSpeaking: () => {} }));
vi.mock('../../src/audio/sfx', () => ({ sfxCorrect: () => {}, sfxWrong: () => {}, sfxCardPress: () => {} }));

import { RENDERERS, type RendererProps } from '../../src/react-app/renderers';

const CHECK_LABEL = '檢查'; // translate('q.check','zh')

function makeQ(type: string, correctIndex: number) {
  return {
    id: `t-${type}`,
    type,
    sentence: 'I am very happy today',
    sentenceZh: '我今天很開心',
    question: 'Pick the answer',
    questionEn: 'Pick the answer',
    questionZh: '選答案',
    options: ['Apple', 'Banana', 'Cherry', 'Date'],
    optionsZh: ['蘋果', '香蕉', '櫻桃', '棗子'],
    correctIndex,
    explanationZh: '解釋文字',
  };
}

function renderType(type: string, correctIndex: number) {
  const onAnswer = vi.fn();
  const onAdvance = vi.fn();
  const Comp = RENDERERS[type];
  const props: RendererProps = { q: makeQ(type, correctIndex) as RendererProps['q'], onAnswer, onAdvance };
  const utils = render(createElement(Comp, props));
  return { onAnswer, onAdvance, ...utils };
}

// 選項 + 檢查鈕都齊備的 MC-family renderer。
const MC_TYPES = ['listen-tf', 'listen-mc', 'grammar-mc'];

describe('renderers — select→check→advance lifecycle', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.runOnlyPendingTimers(); vi.useRealTimers(); cleanup(); });

  for (const type of MC_TYPES) {
    it(`${type}: 點正解 → onAnswer(true) + 推進`, () => {
      const correctIndex = 1; // 'Banana'
      const { onAnswer, onAdvance, container } = renderType(type, correctIndex);

      // 點正解選項
      const correctBtn = within(container).getByText('Banana').closest('button')!;
      fireEvent.click(correctBtn);
      // 按檢查
      const checkBtn = within(container).getByText(CHECK_LABEL).closest('button')!;
      fireEvent.click(checkBtn);

      expect(onAnswer).toHaveBeenCalledTimes(1);
      expect(onAnswer.mock.calls[0][1]).toBe(true); // isCorrect

      // 推進: 跑完所有 timer (各 renderer 延遲不一, 用 runAll 蓋掉)
      vi.runOnlyPendingTimers();
      expect(onAdvance).toHaveBeenCalledTimes(1);
    });

    it(`${type}: 點錯 → onAnswer(false)`, () => {
      const correctIndex = 1; // 'Banana' 正解, 但點 'Apple'
      const { onAnswer, container } = renderType(type, correctIndex);
      const wrongBtn = within(container).getByText('Apple').closest('button')!;
      fireEvent.click(wrongBtn);
      const checkBtn = within(container).getByText(CHECK_LABEL).closest('button')!;
      fireEvent.click(checkBtn);
      expect(onAnswer).toHaveBeenCalledTimes(1);
      expect(onAnswer.mock.calls[0][1]).toBe(false);
    });
  }

  it('檢查鈕在未選答案時不可送出', () => {
    const { onAnswer, container } = renderType('listen-mc', 0);
    const checkBtn = within(container).getByText(CHECK_LABEL).closest('button')!;
    fireEvent.click(checkBtn); // 還沒選 → 應 no-op
    expect(onAnswer).not.toHaveBeenCalled();
  });
});
