/**
 * v2.0.B.167 Phase 3a — Question renderer registry.
 *
 * Single file, 9 renderers + RENDERERS map. LessonPage dispatches via
 * RENDERERS[q.type]. Each renderer is pure React component with props.
 *
 * Audio: speak() with onEnd callback (per-play token via useRef advanced).
 * WordHint: pickup-lesson-words wrapper class + wrapWords helper +
 *   wireSentenceHints on ref mount.
 */
import { useEffect, useRef, useState } from 'react';
import { speak, stopSpeaking } from '../audio/tts';
import { wireSentenceHints } from '../ui/WordHint';
import { sfxCorrect, sfxWrong, sfxCardPress } from '../audio/sfx';
import { resolveComprehension, subscribeComprehensionMode } from '../data/comprehensionMode';
import SpeakZh from './components/SpeakZh';
import { translate } from './i18n';
import { getLang, subscribeLang } from '../data/lang';
import { toSimplified } from '../data/zhHans';
import { checkAnswer, canonical } from '../data/answerMatch';
import { readDifficulty } from '../data/difficulty';

// v2.0.B.393 — 統一語言: 題目畫面 prompt 跟著選的語言走 (非 hook, 給 const map / 工具用).
// 用 hook useTq() 讓元件切語言自動 re-render; 純函式 tq() 給非元件 (如 SPEAKER label).
function tq(key: string): string {
  return translate(key, getLang());
}
function useTq(): (key: string) => string {
  const [, force] = useState(0);
  useEffect(() => subscribeLang(() => force((n) => n + 1)), []);
  const lang = getLang();
  return (key: string) => translate(key, lang);
}

export interface RawQuestion {
  type: string;
  id: string;
  sentence?: string;
  sentenceEasy?: string;     // v2.0.B.323 三難度
  sentenceHard?: string;     // v2.0.B.323 三難度 (原文/原典)
  questionEn?: string;
  questionZh?: string;
  question?: string;
  options?: string[];
  optionsZh?: string[];
  correctIndex?: number;
  explanationZh?: string;
  tilesEn?: string[];
  pairsEn?: Array<[string, string]>;
  // v2.0.B.249: schema 用 pairs: [{left, right}] object 形式 (Zod canonical)
  pairs?: Array<{ left: string; right: string }>;
  // v2.0.B.198: 標記誰說的 / 背景介紹。enum mochi | grandma | hana | narrator
  speaker?: string;
  // v2.0.B.232 new question types — see src/data/lessons.ts for schema.
  imageEmoji?: string;       // picture-mc
  imageUrl?: string;         // picture-mc
  sentenceZh?: string;       // read-and-tap / drag-blank / speak-back
  promptEn?: string;         // read-and-tap (e.g. 'Tap the verb')
  correctWordIndex?: number; // read-and-tap
  sentenceTemplate?: string; // drag-blank
  tiles?: string[];          // drag-blank
  correctTiles?: string[];   // drag-blank
  audioWord?: string;        // listen-emoji (deprecated, fallback to sentence)
  acceptableVariants?: string[]; // speak-back
  // v2.0.B.434 type-translate: answer = 主要正解, accept = 其他可接受講法.
  answer?: string;
  accept?: string[];
}

export interface RendererProps {
  q: RawQuestion;
  onAdvance: (snapshot?: string) => void;
  onAnswer: (userIdx: number, isCorrect: boolean) => void;
}

// ─── helpers ────────────────────────────────────────────────────────────────
export function wrapWords(text: string): string {
  const esc = (s: string) => s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  return String(text || '').split(/(\s+)/).map(tok => {
    if (!tok) return '';
    if (/^\s+$/.test(tok)) return tok;
    const e = esc(tok);
    return `<span class="word" data-word="${e}">${e}</span>`;
  }).join('');
}

// v2.0.B.323 (per user): 三難度文本選版 — 依 pickup.difficulty 選 sentenceHard(原文)/
// sentenceEasy(簡化)/sentence(medium 預設). 缺版 fallback 到 sentence.
export function pickSentence(q: RawQuestion): string {
  const base = q.sentence ?? '';
  const d = readDifficulty();
  if (d === 'hard' && q.sentenceHard) return q.sentenceHard;
  if (d === 'easy' && q.sentenceEasy) return q.sentenceEasy;
  return base;
}

// v2.0.B.319: plain (non-tappable) HTML-escape — read-comprehension 答題前段落用這個
// (無 .word span → 不可點中文 / 無虛線), 答完才換 wrapWords.
export function escapeText(text: string): string {
  return String(text || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function useWordHint(ref: React.RefObject<HTMLElement | null>, deps: unknown[]) {
  useEffect(() => {
    if (ref.current) { try { wireSentenceHints(ref.current); } catch {} }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// v2.0.B.479: 「揭示後播音效 + 延遲推進」是多個 MC renderer 重複的 effect。
// 抽成一個 hook (literal extraction, 行為不變): revealed 翻 true → 播對/錯音效 →
// delay 後 advance(), unmount 清 timer。delayWrong 省略時同 delayCorrect。
function useRevealAdvance(
  revealed: boolean,
  correct: boolean,
  advance: () => void,
  delayCorrect: number,
  delayWrong: number = delayCorrect,
) {
  useEffect(() => {
    if (!revealed) return;
    try { (correct ? sfxCorrect : sfxWrong)(); } catch {}
    const t = window.setTimeout(advance, correct ? delayCorrect : delayWrong);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);
}

function blanks(text: string): string {
  return text.split(/\s+/).filter(Boolean).map(() => '____').join(' ');
}

// v2.0.B.185: Levenshtein edit distance for fuzzy typed-input matching.
// Wagner-Fischer DP, O(a×b) time / O(b) space. Early-exit when length diff
// already exceeds max tolerance (3) — avoids full DP for "totally wrong" input.
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  const al = a.length, bl = b.length;
  if (Math.abs(al - bl) > 3) return Infinity;
  const dp = new Array(bl + 1);
  for (let j = 0; j <= bl; j++) dp[j] = j;
  for (let i = 1; i <= al; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= bl; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(dp[j - 1], dp[j], prev);
      prev = tmp;
    }
  }
  return dp[bl];
}

// v2.0.B.366 (per user): 按壓動畫 — icon 彈一下 (pop) + 外擴一圈聲波環 (ping), Duolingo-style.
const SpeakerBtn = ({ onClick, size = 22 }: { onClick: () => void; size?: number }) => {
  const [ping, setPing] = useState(false);
  const handle = () => {
    setPing(false);
    // 強制 reflow 讓動畫每次重播
    requestAnimationFrame(() => setPing(true));
    window.setTimeout(() => setPing(false), 620);
    onClick();
  };
  return (
    <button onClick={handle} aria-label="Replay" className={ping ? 'pickup-speaker-ping' : undefined} style={{
      flex: '0 0 auto', width: size, height: size, padding: 0, position: 'relative',
      background: 'transparent', border: 'none', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
    }}>
      <img src="/mascots/icon-speaker.webp" width={size - 2} height={size - 2} alt="" className={ping ? 'pickup-speaker-pop' : undefined} style={{ opacity: 0.78 }} />
    </button>
  );
};

// v2.0.B.cron 聽力配對: 聲音波形視覺 (喇叭 icon + 波形長條, 暖色琥珀系 per user — 非藍).
// 純視覺 affordance, 不帶文字 (聽力題不可洩漏英文). active=選中 → 琥珀加深。
// 每列 seed 不同 → 波形高低各異 (像真的聲紋), 純靜態 (尊重 reduce-motion)。
const WAVE_BARS = 13;
const Waveform = ({ active, seed = 0 }: { active?: boolean; seed?: number }) => {
  const bars = [];
  for (let i = 0; i < WAVE_BARS; i++) {
    // deterministic pseudo-random 高度 0.28–1.0, 中段較高 (像語音能量包絡)
    const center = 1 - Math.abs(i - (WAVE_BARS - 1) / 2) / ((WAVE_BARS - 1) / 2);
    const wobble = (Math.sin((i + 1) * (seed + 1) * 1.7) + 1) / 2;
    const h = 0.28 + (0.45 * center + 0.27 * wobble);
    bars.push(Math.min(1, h));
  }
  const color = active ? 'var(--t-brand-dark)' : 'var(--t-brand)';
  return (
    <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', gap: 2.5, height: 28, flex: 1, justifyContent: 'flex-start' }}>
      {bars.map((h, i) => (
        <span key={i} style={{
          display: 'inline-block', width: 3, borderRadius: 2,
          height: `${Math.round(h * 26)}px`, background: color,
          transition: 'background 160ms ease',
        }} />
      ))}
    </span>
  );
};

const OptionBtn = ({ label, labelZh, state, onClick, disabled }: {
  label: string; labelZh?: string; state: 'idle' | 'selected' | 'correct' | 'wrong' | 'shown';
  onClick: () => void; disabled?: boolean;
}) => {
  // v2.0.B.435 (per user): 'selected' = 已選未檢查 (琥珀高亮), 跟 idle / 答後狀態區隔。
  const bg = state === 'correct' ? 'var(--t-success-tint)' : state === 'wrong' ? 'var(--t-danger-tint)' : state === 'shown' ? 'var(--t-bg)' : state === 'selected' ? 'var(--t-tint-warn)' : 'var(--t-surface)';
  const fg = state === 'correct' ? 'var(--t-success)' : state === 'wrong' ? 'var(--t-danger)' : 'var(--t-text)';
  const border = state === 'correct' ? 'var(--t-success)' : state === 'wrong' ? 'var(--t-danger)' : state === 'selected' ? 'var(--t-accent)' : 'var(--t-border-card)';
  return (
    <button onClick={onClick} disabled={disabled} className={state === 'correct' ? 'pickup-press pickup-correct-pop' : 'pickup-press'} style={{
      width: '100%', padding: '14px 16px', marginBottom: 8,
      background: bg, color: fg,
      border: `2px solid ${border}`, borderBottom: `4px solid ${state === 'selected' ? 'var(--t-accent)' : 'var(--t-brand-dark)'}`,
      borderRadius: 'var(--t-radius-card)', fontSize: 'var(--t-text-option)', fontWeight: 800,
      cursor: disabled ? 'default' : 'pointer', fontFamily: 'inherit',
      textAlign: 'left',
    }}>
      <div>{label}{labelZh ? <span style={{ color: 'var(--t-text-muted)', fontWeight: 600, marginLeft: 8 }}>· <SpeakZh text={labelZh} /></span> : ''}</div>
    </button>
  );
};

// v2.0.B.435 (per user 「答題前下面要有個檢查按鈕, 只有選完答案才會變綠色可按」):
// 共用檢查鈕 — 未選 = 灰不可按; 已選 = 綠可按。
const CheckBtn = ({ active, onCheck }: { active: boolean; onCheck: () => void }) => (
  <button type="button" onClick={onCheck} disabled={!active} className="pickup-press" style={{
    width: '100%', minHeight: 52, marginTop: 16, border: 'none', borderRadius: 'var(--t-radius-card)',
    background: active ? 'var(--t-success)' : 'var(--t-border-card)', color: '#fff',
    borderBottom: active ? '4px solid var(--t-brand-dark)' : '4px solid var(--t-border-card)',
    fontSize: 16, fontWeight: 900, fontFamily: 'inherit',
    cursor: active ? 'pointer' : 'default', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
  }}>{tq('q.check')}</button>
);

const Explanation = ({ text }: { text: string }) => text ? (
  <div style={{ marginTop: 12, fontSize: 14, color: 'var(--t-text)', lineHeight: 1.6, padding: '10px 12px', background: 'var(--t-bg)', borderLeft: '3px solid var(--t-border-card)', borderRadius: '0 8px 8px 0' }}>
    <SpeakZh text={text} />
  </div>
) : null;

// v2.0.B.198: SpeakerBadge — 顯示「誰說的 / 是背景介紹」明示。
// mochi 1st-person | grandma 奶奶說的 | hana 柴犬 | narrator 背景旁白
const SPEAKER_META: Record<string, { emoji: string; label: string; bg: string; fg: string }> = {
  mochi:    { emoji: '🐱', label: 'Mochi',   bg: '#fed7aa', fg: '#9a3412' },
  grandma:  { emoji: '👵', label: 'Grandma', bg: 'var(--t-tint-warn)', fg: '#78350f' },
  hana:     { emoji: '🐕', label: 'Hana',    bg: '#f5e6d3', fg: '#6b4226' },
  narrator: { emoji: '📖', label: '背景',    bg: 'var(--t-surface-alt)', fg: 'var(--t-text-muted)' },
};
const SpeakerBadge = ({ speaker }: { speaker?: string }) => {
  const t = useTq();
  const meta = SPEAKER_META[speaker || 'narrator'] ?? SPEAKER_META.narrator;
  // narrator 「背景」跟著語言走; 角色名 (Mochi/Grandma/Hana) 是專名, 不翻。
  const label = (speaker || 'narrator') === 'narrator' ? t('q.speaker.narrator') : meta.label;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 9px', borderRadius: 'var(--t-radius-pill)',
      background: meta.bg, color: meta.fg,
      fontSize: 11, fontWeight: 800, letterSpacing: 0.3,
      marginBottom: 8,
    }}>
      <span style={{ fontSize: 13 }}>{meta.emoji}</span>
      <span>{label}</span>
    </div>
  );
};

// ─── 1. narration ───────────────────────────────────────────────────────────
const NarrationRenderer = ({ q, onAdvance }: RendererProps) => {
  const text = pickSentence(q); // v2.0.B.323 三難度文本
  // v2.0.B.369 (per user): 旁白也「預設空格 → 點英文 → 點中文」(統一). 無提示字.
  // 因為空格要手動揭示才讀得到, 改手動「繼續」(不自動推進). 旁白 explanationZh 即中文.
  const zh = q.sentenceZh ?? q.explanationZh ?? '';
  useEffect(() => {
    try { speak(text, 'en-US'); } catch {}
    return () => stopSpeaking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  return (
    <div>
      <SpeakerBadge speaker={q.speaker} />
      <RevealSentence en={text} zh={zh || undefined} big />
      <button
        type="button"
        onClick={() => onAdvance(text)}
        className="pickup-answer-sticky pickup-press"
        style={{
          width: '100%', minHeight: 52, border: 'none', borderRadius: 'var(--t-radius-card)',
          background: 'var(--t-brand-dark)', color: '#fff', fontSize: 16, fontWeight: 900,
          borderBottom: '4px solid rgba(0,0,0,0.25)',
          fontFamily: 'inherit', cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
        }}
      >{tq('q.continue')}</button>
    </div>
  );
};

// ─── 2. listen-tf (blind, Y/N) ──────────────────────────────────────────────
const ListenTfRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const en = q.sentence ?? '';
  const qEn = q.questionEn ?? q.question ?? '';
  const opts = q.options ?? ['Yes', 'No'];
  const correctIdx = q.correctIndex ?? 0;
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useWordHint(ref, [revealed, q.id]);

  useEffect(() => {
    setRevealed(false); setSelected(null);
    // v2.0.B.254 P0 fix (Audio-Text agent WARN from B.253 5-agent post-ship):
    // 跟 NarrationRenderer 同 race — useEffect 無 cleanup, chained setTimeout(speak qPrompt, 400)
    // 在 unmount 後仍會 fire → speak qEn 對死 scene 喊話 = audio leak.
    // 比 NarrationRenderer 還糟 (chained timer). 拉 innerTimer 到 outer scope, cleanup 一併清。
    let innerTimer: number | undefined;
    try {
      speak(en, 'en-US', { onEnd: () => {
        if (qEn) innerTimer = window.setTimeout(() => { try { speak(qEn); } catch {} }, 400);
      }});
    } catch {}
    return () => {
      stopSpeaking();
      if (innerTimer !== undefined) window.clearTimeout(innerTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  useRevealAdvance(revealed, selected === correctIdx, () => onAdvance(en), 2500, 4000);

  // v2.0.B.435: 點選項 = 只選取; 底部「檢查」鈕才送出。
  const click = (i: number) => {
    if (revealed) return;
    sfxCardPress();
    setSelected(i);
  };
  const check = () => {
    if (revealed || selected == null) return;
    setRevealed(true);
    onAnswer(selected, selected === correctIdx);
  };

  if (!revealed) {
    return (
      <div ref={ref} className="pickup-lesson-words">
        <SpeakerBadge speaker={q.speaker} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--t-surface-alt)', border: '1px solid var(--t-border-soft)', borderRadius: 'var(--t-radius-md)', marginBottom: 14 }}>
          <SpeakerBtn onClick={() => speak(en, 'en-US', { force: true })} size={48} />
          <div style={{ flex: 1, fontSize: 'var(--t-text-option)', fontWeight: 700, color: 'var(--t-text-muted)', letterSpacing: '0.1em', lineHeight: 1.8 }}>{blanks(en)}</div>
        </div>
        <div style={{ fontSize: 14, color: 'var(--t-text-muted)', textAlign: 'center', marginBottom: 16, fontWeight: 700 }}>🎧 {tq('q.listenThenAnswer')}</div>
        <div className="pickup-answer-sticky">
          {opts.map((o, i) => <OptionBtn key={i} label={o} state={i === selected ? 'selected' : 'idle'} onClick={() => click(i)} />)}
          <CheckBtn active={selected != null} onCheck={check} />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="pickup-lesson-words" style={{ padding: '14px 6px 8px' }}>
      <SpeakerBadge speaker={q.speaker} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--t-surface-alt)', borderRadius: 'var(--t-radius-md)', border: '1px solid var(--t-border-soft)', marginBottom: 12 }}>
        <SpeakerBtn onClick={() => speak(en, 'en-US', { force: true })} size={36} />
        <span dangerouslySetInnerHTML={{ __html: wrapWords(en) }} style={{ flex: 1, fontSize: 'var(--t-text-option)', fontWeight: 700, color: 'var(--t-text)', lineHeight: 1.7 }} />
      </div>
      <Explanation text={q.explanationZh ?? ''} />
    </div>
  );
};

// ─── RevealSentence (v2.0.B.360 per user) — 句子 3-段點擊揭示 ──────────────────
// 空白 → 點 1 下出英文 → 點 2 下出中文 (sentenceZh). 文章式輕量呈現, 不每句框起來.
// answered=true (答完) 時自動至少到英文段, 讓解析有上下文. 缺 sentenceZh → 揭示只到英文.
const RevealSentence: React.FC<{ en: string; zh?: string; answered?: boolean; big?: boolean; startStage?: number }> = ({ en, zh, answered, big, startStage }) => {
  const [stage, setStage] = useState(startStage ?? 0); // 0 空白, 1 英文, 2 英文+中文
  useEffect(() => { setStage(startStage ?? 0); }, [en, startStage]);
  useEffect(() => { if (answered) setStage((s) => Math.max(s, 1)); }, [answered]);
  const maxStage = zh ? 2 : 1;
  const advance = () => setStage((s) => Math.min(maxStage, s + 1));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 4px', marginBottom: 14 }}>
      <SpeakerBtn onClick={() => speak(en, 'en-US', { force: true })} size={40} />
      <div onClick={advance} style={{ flex: 1, cursor: stage < maxStage ? 'pointer' : 'default', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>
        {stage === 0 ? (
          <span style={{ fontSize: big ? 'var(--t-text-stem)' : 16, fontWeight: 700, color: 'var(--t-text-muted)', letterSpacing: '0.12em', lineHeight: 1.9 }}
            dangerouslySetInnerHTML={{ __html: blanks(en) }} />
        ) : (
          <span style={{ fontSize: big ? 'var(--t-text-stem)' : 16, fontWeight: 700, color: 'var(--t-text)', lineHeight: 1.7 }}>{en}</span>
        )}
        {stage >= 2 && zh && (
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--t-text-muted)', marginTop: 6, lineHeight: 1.6 }}>{toSimplified(zh)}</div>
        )}
      </div>
    </div>
  );
};

// ─── grammar-mc (v2.0.B.360) — 文法題: 原文句子「恆可見」(才看得到要填的空位) + 標籤 ──
const GrammarMcRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const sentence = pickSentence(q);
  const qPrompt = q.question ?? q.questionEn ?? '';
  const opts = q.options ?? [];
  const optsZh = q.optionsZh ?? [];
  const correctIdx = q.correctIndex ?? 0;
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    setSelected(null); setRevealed(false);
    try { speak(sentence, 'en-US'); } catch {}
    return () => stopSpeaking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);
  useEffect(() => {
    if (!revealed) return;
    const t = window.setTimeout(() => onAdvance(sentence), 3000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);
  // v2.0.B.435: 點選項 = 只選取; 底部「檢查」鈕才送出。
  const click = (i: number) => {
    if (revealed) return;
    sfxCardPress();
    setSelected(i);
  };
  const check = () => {
    if (revealed || selected == null) return;
    setRevealed(true);
    onAnswer(selected, selected === correctIdx);
    try { (selected === correctIdx ? sfxCorrect : sfxWrong)(); } catch {}
  };
  return (
    <div>
      <SpeakerBadge speaker={q.speaker} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 4px', marginBottom: 8 }}>
        <SpeakerBtn onClick={() => speak(sentence, 'en-US', { force: true })} size={40} />
        <span style={{ flex: 1, fontSize: 'var(--t-text-stem)', fontWeight: 700, color: 'var(--t-text)', lineHeight: 1.7 }}>{sentence}</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--t-brand-dark)', margin: '0 4px 12px' }}>📘 {tq('q.grammar')} · {qPrompt}</div>
      <div className="pickup-answer-sticky">
        {opts.map((o, i) => {
          const isCorrect = i === correctIdx;
          const isSel = i === selected;
          const state: 'idle' | 'selected' | 'correct' | 'wrong' | 'shown' =
            !revealed ? (isSel ? 'selected' : 'idle') : isSel ? (isCorrect ? 'correct' : 'wrong') : isCorrect ? 'correct' : 'shown';
          return <OptionBtn key={i} label={o} labelZh={revealed ? optsZh[i] : undefined} state={state} onClick={() => click(i)} disabled={revealed} />;
        })}
        {!revealed && <CheckBtn active={selected != null} onCheck={check} />}
      </div>
      {revealed && <Explanation text={q.explanationZh ?? ''} />}
    </div>
  );
};

// ─── scroll-pick (v2.0.B.388 per user) — 句子含空格,下方候選字滑/點選即時填入預覽 ──
const ScrollPickRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const raw = pickSentence(q);
  const parts = raw.split('___');
  const before = parts[0] ?? '';
  const after = parts.slice(1).join('___');
  const qPrompt = q.question ?? q.questionEn ?? '';
  const opts = q.options ?? [];
  const optsZh = q.optionsZh ?? [];
  const correctIdx = q.correctIndex ?? 0;
  const [sel, setSel] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    setSel(null); setRevealed(false);
    try { speak(raw.replace('___', ' '), 'en-US'); } catch {}
    return () => stopSpeaking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);
  useEffect(() => {
    if (!revealed) return;
    const correct = sel === correctIdx;
    const t = window.setTimeout(() => onAdvance(raw), correct ? 2500 : 3500);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);
  const check = () => {
    if (sel == null || revealed) return;
    sfxCardPress(); setRevealed(true);
    onAnswer(sel, sel === correctIdx);
    try { (sel === correctIdx ? sfxCorrect : sfxWrong)(); } catch {}
  };
  const blankColor = revealed ? (sel === correctIdx ? 'var(--t-success)' : 'var(--t-danger)') : 'var(--t-brand-dark)';
  // v2.0.B.390 (per user): 空格用「底線」, 一個單字一條 (答案有空格才多一條), 非方框.
  // 未選時用底線字元 ＿ 當佔位 (本身就是底線, 不再加 borderBottom 避免雙線);
  // 選了之後顯示真正單字, 並補一條 borderBottom 當底線。
  const ansWords = Math.max(1, (opts[correctIdx] ?? '').trim().split(/\s+/).length);
  const blankPlaceholder = Array(ansWords).fill('＿＿＿').join(' ');
  const filled = sel != null;
  const blankText = filled ? opts[sel as number] : blankPlaceholder;
  return (
    <div>
      <SpeakerBadge speaker={q.speaker} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 6px', marginBottom: 8 }}>
        <SpeakerBtn onClick={() => speak(raw.replace('___', ' '), 'en-US', { force: true })} size={40} />
        <span style={{ flex: 1, fontSize: 'var(--t-text-stem)', fontWeight: 700, color: 'var(--t-text)', lineHeight: 1.8 }}>
          {before}
          <span style={{ fontWeight: 900, color: blankColor, borderBottom: filled ? `2px solid ${blankColor}` : 'none', padding: '0 6px' }}>{blankText}</span>
          {after}
        </span>
      </div>
      {qPrompt && <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--t-brand-dark)', margin: '0 6px 10px' }}>↕ {qPrompt}</div>}
      {/* 候選字直列 (可滑動) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: '46vh', overflowY: 'auto', padding: '2px' }}>
        {opts.map((o, i) => {
          const isSel = i === sel;
          const isCorrect = i === correctIdx;
          const bg = revealed ? (isCorrect ? 'var(--t-success-tint)' : isSel ? 'var(--t-danger-tint)' : 'var(--t-surface)') : isSel ? 'var(--t-tint-warn)' : 'var(--t-surface)';
          const border = revealed ? (isCorrect ? 'var(--t-success)' : isSel ? 'var(--t-danger)' : 'var(--t-border-card)') : isSel ? 'var(--t-brand-dark)' : 'var(--t-border-card)';
          return (
            <button key={i} onClick={() => { if (!revealed) { sfxCardPress(); setSel(i); } }} disabled={revealed}
              className="pickup-press"
              style={{ width: '100%', padding: '14px 16px', background: bg, color: 'var(--t-text)',
                border: `2px solid ${border}`, borderBottom: `4px solid ${isSel || (revealed && isCorrect) ? border : 'var(--t-brand-dark)'}`,
                borderRadius: 'var(--t-radius-card)', fontSize: 'var(--t-text-option)', fontWeight: 800, cursor: revealed ? 'default' : 'pointer',
                fontFamily: 'inherit', textAlign: 'left', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>
              {o}{revealed && optsZh[i] ? <span style={{ color: 'var(--t-text-muted)', fontWeight: 600, marginLeft: 8 }}>· <SpeakZh text={optsZh[i]} /></span> : ''}
            </button>
          );
        })}
      </div>
      {!revealed ? (
        <button type="button" onClick={check} disabled={sel == null}
          style={{ width: '100%', minHeight: 52, marginTop: 16, border: 'none', borderRadius: 'var(--t-radius-card)',
            background: sel == null ? 'var(--t-border-card)' : 'var(--t-brand-dark)', color: '#fff', fontSize: 16, fontWeight: 900,
            fontFamily: 'inherit', cursor: sel == null ? 'default' : 'pointer', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>
          {tq('q.check')}
        </button>
      ) : <Explanation text={q.explanationZh ?? ''} />}
    </div>
  );
};

// ─── 3. listen-mc / listen-comprehension / listen-emoji / read-mc-with-audio (blind 4-option) ──
const ListenMcRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const en = q.sentence ?? '';
  const qPrompt = q.question ?? q.questionEn ?? '';
  const opts = q.options ?? [];
  const optsZh = q.optionsZh ?? [];
  const correctIdx = q.correctIndex ?? 0;
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useWordHint(ref, [revealed, q.id]);

  useEffect(() => {
    setRevealed(false); setSelected(null);
    // v2.0.B.176: chain sentence + question audio (sentence MP3 onEnd → 400ms gap → question WebSpeech)
    try {
      speak(en, 'en-US', {
        onEnd: () => {
          if (qPrompt) window.setTimeout(() => { try { speak(qPrompt); } catch {} }, 400);
        }
      });
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  useRevealAdvance(revealed, selected === correctIdx, () => onAdvance(en), 3000);

  // v2.0.B.435: 點選項 = 只選取 (不送出); 底部「檢查」鈕才送出。
  const click = (i: number) => {
    if (revealed) return;
    sfxCardPress();
    setSelected(i);
  };
  const check = () => {
    if (revealed || selected == null) return;
    setRevealed(true);
    onAnswer(selected, selected === correctIdx);
  };

  return (
    <div ref={ref} className="pickup-lesson-words">
      <SpeakerBadge speaker={q.speaker} />
      <RevealSentence en={en} zh={q.sentenceZh} answered={revealed} />
      {qPrompt && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--t-surface-alt)', border: '1px solid var(--t-border-soft)', borderRadius: 'var(--t-radius-md)', marginBottom: 14 }}>
          <SpeakerBtn onClick={() => speak(qPrompt, 'en-US', { force: true })} size={36} />
          <span dangerouslySetInnerHTML={{ __html: wrapWords(qPrompt) }} style={{ flex: 1, fontSize: 'var(--t-text-stem)', fontWeight: 800, color: 'var(--t-text)', lineHeight: 1.5 }} />
        </div>
      )}
      {/* v2.0.B.186 P0-C fix: 4 options sticky-bottom 避免被 history 擠出視窗 */}
      <div className="pickup-answer-sticky">
        {opts.map((o, i) => {
          const isCorrect = i === correctIdx;
          const isSel = i === selected;
          const state: 'idle' | 'selected' | 'correct' | 'wrong' | 'shown' =
            !revealed ? (isSel ? 'selected' : 'idle') : isSel ? (isCorrect ? 'correct' : 'wrong') : isCorrect ? 'correct' : 'shown';
          return <OptionBtn key={i} label={o} labelZh={revealed ? optsZh[i] : undefined} state={state} onClick={() => click(i)} disabled={revealed} />;
        })}
        {!revealed && <CheckBtn active={selected != null} onCheck={check} />}
      </div>
      {revealed && <Explanation text={q.explanationZh ?? ''} />}
    </div>
  );
};

// ─── read-comprehension (v2.0.B.319 per user) ───────────────────────────────
// 角色講一段「可讀」段落 + 提問 + 4選1。跟 listen-comprehension 不同:段落一開始就
// 看得到 (非聽力盲填)。per user 規則:
//   1. 答題時段落「不能點中文」(純文字, 無 .word / 無虛線)
//   2. 答完後段落才開放「點詞看中文」(wrapWords + WordHint)
//   3. 答完後清掉選項 (回答跟原文理解非必要 → 留乾淨段落讓玩家學字)
const ReadComprehensionRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const passage = pickSentence(q); // v2.0.B.323 三難度文本
  const qPrompt = q.question ?? q.questionEn ?? '';
  const opts = q.options ?? [];
  const optsZh = q.optionsZh ?? [];
  const correctIdx = q.correctIndex ?? 0;
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setSelected(null); setRevealed(false); setDone(false);
    try { speak(passage, 'en-US'); } catch {}
    return () => stopSpeaking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  // v2.0.B.435: 點選項 = 只選取; 底部「檢查」鈕才送出。
  const click = (i: number) => {
    if (revealed) return;
    sfxCardPress();
    setSelected(i);
  };
  const check = () => {
    if (revealed || selected == null) return;
    const correct = selected === correctIdx;
    setRevealed(true);
    onAnswer(selected, correct);
    try { (correct ? sfxCorrect : sfxWrong)(); } catch {}
    // 答完 (對/錯都算完成作答) → 1.2s 顯示對錯後進入閱讀模式
    window.setTimeout(() => setDone(true), 1200);
  };

  return (
    <div>
      <SpeakerBadge speaker={q.speaker} />
      {/* v2.0.B.360: 段落改 3-段點擊揭示 (空白→英文→中文), 文章式輕量呈現 */}
      <RevealSentence en={passage} zh={q.sentenceZh} answered={revealed} big />

      {!done ? (
        <>
          {qPrompt && (
            <div style={{ fontSize: 'var(--t-text-stem)', fontWeight: 800, color: 'var(--t-text)', margin: '0 4px 12px', lineHeight: 1.5 }}>{qPrompt}</div>
          )}
          <div className="pickup-answer-sticky">
            {opts.map((o, i) => {
              const isCorrect = i === correctIdx;
              const isSel = i === selected;
              const state: 'idle' | 'selected' | 'correct' | 'wrong' | 'shown' =
                !revealed ? (isSel ? 'selected' : 'idle') : isSel ? (isCorrect ? 'correct' : 'wrong') : isCorrect ? 'correct' : 'shown';
              return <OptionBtn key={i} label={o} labelZh={revealed ? optsZh[i] : undefined} state={state} onClick={() => click(i)} disabled={revealed} />;
            })}
            {!revealed && <CheckBtn active={selected != null} onCheck={check} />}
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => onAdvance(passage)}
            className="pickup-answer-sticky"
            style={{
              width: '100%', minHeight: 52, border: 'none', borderRadius: 'var(--t-radius-card)',
              background: 'var(--t-brand-dark)', color: '#fff', fontSize: 16, fontWeight: 900,
              fontFamily: 'inherit', cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
            }}
          >{tq('q.continue')}</button>
        </>
      )}
    </div>
  );
};

// ─── 理解選擇 (merged, v2.0.B.cron per user) ─────────────────────────────────
// read-comprehension + listen-comprehension 合併。資料 shape 相同 (段落 sentence
// + question + 4 options + correctIndex), 唯一差別是「呈現方式」, 由全域開關決定:
//   resolveComprehension(id) === 'read'   → ReadComprehensionRenderer (段落可見, 答完點詞)
//   resolveComprehension(id) === 'listen' → ListenMcRenderer (段落盲聽 blanks, 答完 reveal)
// 開關 'auto' (預設) = 跟著難度鷹架: easy→讀 / hard→聽 / medium→混 (見 comprehensionMode.ts)。
// 設定頁可手動鎖 listen/read。三個 type ('comprehension'/'listen-comprehension'/
// 'read-comprehension') 全導向這裡 → 內容不需遷移, 行為被開關統一。
const ComprehensionRenderer = (props: RendererProps) => {
  // q.id 進 resolve → 同題穩定; mode/難度變動時重算 (subscribe + q.id 依賴)
  const [resolved, setResolved] = useState(() => resolveComprehension(props.q.id));
  useEffect(() => {
    setResolved(resolveComprehension(props.q.id));
    return subscribeComprehensionMode(() => setResolved(resolveComprehension(props.q.id)));
  }, [props.q.id]);
  return resolved === 'read' ? <ReadComprehensionRenderer {...props} /> : <ListenMcRenderer {...props} />;
};

// ─── 4. type-what-you-hear (text input) ─────────────────────────────────────
const TypeWhatYouHearRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const en = q.sentence ?? '';
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setText(''); setRevealed(false);
    try { speak(en); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  const submit = () => {
    if (revealed) return;
    const norm = (s: string) => s.toLowerCase().replace(/[.,!?'"]/g, '').replace(/\s+/g, ' ').trim();
    const normText = norm(text);
    const normEn = norm(en);
    // v2.0.B.185 P0-D fix (Walkthrough audit): Levenshtein fuzzy match.
    // Tolerance scales with sentence length (60+ A2 typing accuracy ≈ 92%):
    //   ≤5 chars exact / ≤15 → 1 / ≤30 → 2 / >30 → 3
    const len = Math.max(normText.length, normEn.length);
    const tolerance = len <= 5 ? 0 : len <= 15 ? 1 : len <= 30 ? 2 : 3;
    const dist = editDistance(normText, normEn);
    const correct = dist <= tolerance;
    sfxCardPress();
    try { (correct ? sfxCorrect : sfxWrong)(); } catch {}
    setRevealed(true);
    onAnswer(correct ? 0 : 1, correct);
    // v2.0.B.185 dwell bump: 3s correct / 6s wrong (was 5s) — senior 需要看正解
    window.setTimeout(() => onAdvance(en), correct ? 3000 : 6000);
  };

  return (
    <div className="pickup-lesson-words">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--t-surface-alt)', border: '1px solid var(--t-border-soft)', borderRadius: 'var(--t-radius-md)', marginBottom: 14 }}>
        <SpeakerBtn onClick={() => speak(en, 'en-US', { force: true })} size={48} />
        <div style={{ flex: 1, fontSize: 13, color: 'var(--t-text-muted)', fontWeight: 600 }}>{tq('q.typeWhatYouHear')}</div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={revealed}
        placeholder={tq('q.typePlaceholder')}
        rows={3}
        style={{
          width: '100%', padding: 10, fontSize: 15, fontFamily: 'inherit',
          border: '2px solid var(--t-border-card)', borderRadius: 10, background: 'var(--t-surface)', color: 'var(--t-text)', marginBottom: 10, resize: 'none',
        }}
      />
      <button onClick={submit} disabled={revealed || !text.trim()} className="pickup-press" style={{
        width: '100%', padding: '12px 0', background: revealed || !text.trim() ? 'var(--t-border-card)' : 'var(--t-success)',
        color: '#fff', border: 'none', borderBottom: '4px solid var(--t-success)', borderRadius: 'var(--t-radius-card)', fontSize: 15, fontWeight: 900,
        cursor: revealed || !text.trim() ? 'default' : 'pointer', fontFamily: 'inherit',
      }}>{tq('q.submit')}</button>
      {revealed && (
        <div style={{ marginTop: 12, fontSize: 14, color: 'var(--t-text)', padding: '10px 12px', background: 'var(--t-bg)', borderLeft: '3px solid var(--t-border-card)', borderRadius: '0 8px 8px 0' }}>
          正解: <strong>{en}</strong>
          {q.explanationZh && <div style={{ marginTop: 6 }}><SpeakZh text={q.explanationZh} /></div>}
        </div>
      )}
    </div>
  );
};

// ─── type-translate (v2.0.B.434 大工程: 外文打字 + 近似判斷) ─────────────────
//
// 玩家看「來源語言」句子 (q.sentence, 例 中文「我很好」), 用外文打出同樣意思。
// 一個意思有多種文法正確講法 → q.answer (主解) + q.accept[] (別句), 引擎再吃縮寫/標點/大小寫。
// 近似判斷 (answerMatch.checkAnswer):
//   correct → 慶祝 + 推進。
//   near    → 「差一點」溫柔提示 (依 reason), 不罰體力, 留輸入讓玩家改 (force-correct/blindRetry)。
//   wrong   → 明顯錯, 首錯記一次 (扣體力), 不揭答案, 重試。
const TypeTranslateRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  // v2.0.B.457: 來源句顯示玩家自己的語言 — sentenceZh (繁中母檔; ja/ko 經 overlay 換成日韓;
  // zh-Hans 經 toSimplified 轉簡中)。fallback 舊 sentence 欄。
  const source = toSimplified(q.sentenceZh ?? q.sentence ?? '');
  const answer = q.answer ?? '';
  const accept = q.accept ?? [];
  const [text, setText] = useState('');
  // v2.0.B.460 (per user): 結果四態 — exact(完全對) / alt(別句也對, 兩個都顯示) /
  // near(有錯字, 顯示『有錯字喔！』+ 正解, 算過) / null。wrong 另開 (錯, 重試不揭答案)。
  const [result, setResult] = useState<'exact' | 'alt' | 'near' | null>(null);
  const [wrong, setWrong] = useState(false);
  const recorded = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setText(''); setResult(null); setWrong(false); recorded.current = false;
  }, [q.id]);

  const submit = () => {
    if (result || !text.trim()) return;
    const r = checkAnswer(text, answer, accept);
    sfxCardPress();
    if (r.status === 'correct') {
      const isAlt = canonical(text) !== canonical(answer); // 命中 accept[] 的別句
      setResult(isAlt ? 'alt' : 'exact'); setWrong(false);
      try { sfxCorrect(); } catch {}
      if (!recorded.current) { recorded.current = true; onAnswer(0, true); }
      window.setTimeout(() => onAdvance(answer), isAlt ? 3200 : 2500);
      return;
    }
    if (r.status === 'near') {
      // 差一點 = 有錯字: 顯示『有錯字喔！』+ 揭正解, 算過 (Duolingo typo 模式)。
      setResult('near'); setWrong(false);
      try { sfxCorrect(); } catch {}
      if (!recorded.current) { recorded.current = true; onAnswer(0, true); }
      window.setTimeout(() => onAdvance(answer), 3500); // 多停一下讓玩家看正解
      return;
    }
    // 明顯錯: 首錯記一次 (扣體力), 不揭答案, 重試。
    setWrong(true);
    try { sfxWrong(); } catch {}
    if (!recorded.current) { recorded.current = true; onAnswer(1, false); }
  };

  const canSubmit = !result && !!text.trim();
  const borderColor = wrong ? 'var(--t-error)' : result ? 'var(--t-success)' : 'var(--t-border-card)';
  return (
    // v2.0.B.461 (per user 格式照第一張圖片): 吉祥物 + 對話泡(來源句, 虛線底) + 橫線輸入區 + 底部鍵盤鈕+檢查鈕。
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {(q.imageEmoji || q.imageUrl) ? (
        /* v2.0.B.509 重要單字實物圖卡 (照 Duolingo「翻譯此單詞」) — 圖 + 來源詞, 取代對話泡 */
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            background: 'var(--t-surface)', border: '2px solid var(--t-border-soft)',
            borderRadius: 'var(--t-radius-card)', padding: '22px 30px',
            boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5), 0 3px 0 rgba(60,42,28,0.10)',
          }}>
            {q.imageUrl
              ? <img src={q.imageUrl} alt="" style={{ width: 128, height: 128, objectFit: 'contain', display: 'block' }} />
              : <span style={{ fontSize: 96, lineHeight: 1 }} aria-hidden="true">{q.imageEmoji}</span>}
            <span style={{ fontSize: 'var(--t-text-stem)', fontWeight: 800, color: 'var(--t-text)' }}>{source}</span>
          </div>
        </div>
      ) : (
        /* 吉祥物 + 對話泡 (純文字來源句) */
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 8 }}>
          <img src="/mascots/scene-mochi-talking.webp" width={92} height={92} alt="" style={{ flexShrink: 0, display: 'block' }} />
          <div style={{
            position: 'relative', flex: 1, background: 'var(--t-surface)', border: '2px solid var(--t-border-soft)',
            borderRadius: 16, padding: '14px 16px', marginTop: 10,
          }}>
            <span aria-hidden="true" style={{ position: 'absolute', left: -10, top: 18, width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderRight: '10px solid #e5e0d6' }} />
            <span style={{ fontSize: 'var(--t-text-stem)', fontWeight: 800, color: 'var(--t-text)', borderBottom: '2px dashed var(--t-border-card)', paddingBottom: 4, lineHeight: 1.6 }}>{source}</span>
          </div>
        </div>
      )}
      {/* 橫線輸入區 (兩條橫線, 照圖) */}
      <div style={{ marginTop: 26 }}>
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => { setText(e.target.value); if (wrong) setWrong(false); }}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } }}
          disabled={!!result}
          placeholder={tq('q.typePlaceholder')}
          rows={2}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          style={{
            width: '100%', padding: '12px 4px', fontSize: 18, fontFamily: 'inherit',
            border: 'none', borderTop: `2px solid ${borderColor}`, borderBottom: `2px solid ${borderColor}`,
            borderRadius: 0, background: 'transparent', color: 'var(--t-text)', resize: 'none', outline: 'none',
          }}
        />
      </div>
      {wrong && <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--t-error)', marginTop: 10 }}>再試一次 · Try again</div>}
      {result && (
        <div style={{
          marginTop: 12, fontSize: 14, color: 'var(--t-text)', padding: '10px 12px', background: 'var(--t-bg)',
          borderLeft: `3px solid ${result === 'near' ? 'var(--t-accent)' : 'var(--t-success)'}`, borderRadius: '0 8px 8px 0',
        }}>
          {result === 'near' && <div style={{ fontWeight: 900, color: 'var(--t-accent)', marginBottom: 6 }}>✏️ {tq('q.typo')}</div>}
          {result === 'alt' && <div style={{ fontWeight: 900, color: 'var(--t-success)', marginBottom: 6 }}>✅ {tq('q.alsoCorrect')}</div>}
          {/* alt: 顯示玩家寫的別句 + 標準答案 */}
          {result === 'alt' && (
            <div style={{ fontSize: 13, color: 'var(--t-text-muted)', marginBottom: 4 }}>{tq('q.yourAnswer')}: <strong style={{ color: 'var(--t-text)' }}>{text.trim()}</strong></div>
          )}
          <div>{result === 'exact' ? '✅ ' : ''}{(result === 'near' || result === 'alt') ? `${tq('q.correctAnswer')}: ` : ''}<strong>{answer}</strong></div>
          {q.explanationZh && <div style={{ marginTop: 6 }}><SpeakZh text={q.explanationZh} /></div>}
        </div>
      )}
      {/* 底部列: 鍵盤鈕 + 檢查鈕 (照第一張圖) */}
      <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', gap: 12 }}>
        <button type="button" aria-label="keyboard" onClick={() => inputRef.current?.focus()} disabled={!!result} style={{
          flexShrink: 0, width: 60, minHeight: 52, borderRadius: 'var(--t-radius-card)', border: '2px solid var(--t-border-card)',
          background: 'var(--t-surface)', fontSize: 22, cursor: result ? 'default' : 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>⌨️</button>
        <button onClick={submit} disabled={!canSubmit} style={{
          flex: 1, minHeight: 52,
          background: canSubmit ? 'var(--t-success)' : 'var(--t-border-card)',
          color: '#fff', border: 'none',
          borderBottom: canSubmit ? '4px solid var(--t-brand-dark)' : '4px solid var(--t-border-card)',
          borderRadius: 'var(--t-radius-card)', fontSize: 16, fontWeight: 900,
          cursor: canSubmit ? 'pointer' : 'default', fontFamily: 'inherit',
        }}>{tq('q.check')}</button>
      </div>
    </div>
  );
};

// ─── 5. tap-tiles (v2.0.B.232 招 7 upgrade: tap-to-place mini builder) ──────
//
// Upgrade rationale (CLAUDE.md drag-and-drop iOS Safari risk):
//   - Original "pick any order then submit" felt low-stakes; correct order
//     was only validated at submit. Wrong arrangements stayed in place.
//   - Drag-and-drop has iOS Safari edge cases (scroll fights, touch
//     event drift), so we pick the tap-to-place fallback per task spec.
//
// New behavior:
//   1. Sentence visualised as ordered slots ____ ____ ____ … (one per word).
//   2. Player taps a tile to "place" it in the next empty slot.
//   3. If tile matches the next expected word → slot fills (green flash),
//      tile locks bottom-row (grey out). One pop-in animation.
//   4. If tile is wrong → slot flashes red, tile wobbles, returns to bottom.
//      Wrong tile remains tappable. No punishment, no score deduction
//      (per CLAUDE.md: 不打擊式 framing).
//   5. When all slots filled correctly → auto-advance after celebration.
//
// 2-strike reveal: after 2 wrong taps Mochi shows the next correct tile
// highlighted (per memory rule pickup-retry-reveal).
const TapTilesRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const en = q.sentence ?? '';
  const correctOrder = en.split(/\s+/).filter(Boolean);
  const tiles = q.tilesEn ?? correctOrder;
  // Stable shuffled tile order, indexed against `tiles` array.
  const shuffleOrder = useRef<number[]>([]);
  // Slots: array<index-into-tiles | null> aligned with correctOrder.
  const [slots, setSlots] = useState<(number | null)[]>(() => correctOrder.map(() => null));
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);
  const [pulseSlot, setPulseSlot] = useState<number | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const placedTileIndices = new Set(slots.filter((x): x is number => x !== null));
  const nextSlotIdx = slots.findIndex(s => s === null);

  useEffect(() => {
    shuffleOrder.current = tiles.map((_, i) => i).sort(() => Math.random() - 0.5);
    setSlots(correctOrder.map(() => null));
    setWrongFlash(null);
    setPulseSlot(null);
    setWrongCount(0);
    setRevealed(false);
    try { speak(en); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  // Detect completion (all slots filled correctly = win)
  useEffect(() => {
    if (revealed) return;
    if (nextSlotIdx === -1) {
      // Full board — and since we only place correct tiles, completion = correct.
      setRevealed(true);
      try { sfxCorrect(); } catch {}
      onAnswer(0, true);
      window.setTimeout(() => onAdvance(en), 2800);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextSlotIdx, revealed]);

  const tap = (tileIdx: number) => {
    if (revealed) return;
    if (placedTileIndices.has(tileIdx)) return;
    if (nextSlotIdx === -1) return;
    const slotIdx = nextSlotIdx;
    const expected = correctOrder[slotIdx];
    const tileWord = tiles[tileIdx];
    if (tileWord.toLowerCase() === expected.toLowerCase()) {
      // Correct — lock into slot
      sfxCardPress();
      setSlots(prev => {
        const next = [...prev];
        next[slotIdx] = tileIdx;
        return next;
      });
      setPulseSlot(slotIdx);
      window.setTimeout(() => setPulseSlot(null), 350);
    } else {
      // Wrong — wobble + auto-return (tile state isn't actually placed)
      try { sfxWrong(); } catch {}
      setWrongFlash(tileIdx);
      setWrongCount(c => c + 1);
      // Log the first wrong attempt as the answer.
      if (wrongCount === 0) {
        onAnswer(1, false);
      }
      window.setTimeout(() => setWrongFlash(null), 380);
    }
  };

  // 2-strike reveal: hint the correct tile (highlight border).
  const hintTileIdx = wrongCount >= 2 && nextSlotIdx >= 0
    ? tiles.findIndex((t, i) => !placedTileIndices.has(i) && t.toLowerCase() === correctOrder[nextSlotIdx].toLowerCase())
    : -1;

  return (
    <div className="pickup-lesson-words">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--t-surface-alt)', border: '1px solid var(--t-border-soft)', borderRadius: 'var(--t-radius-md)', marginBottom: 14 }}>
        <SpeakerBtn onClick={() => speak(en, 'en-US', { force: true })} size={44} />
        <div style={{ flex: 1, fontSize: 13, color: 'var(--t-text-muted)', fontWeight: 600 }}>
          {tq('q.tapToBuild')}
        </div>
      </div>
      {/* ordered slots (one per word) — tap to place */}
      <div style={{
        minHeight: 60, padding: '12px 10px',
        background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 'var(--t-radius-md)',
        marginBottom: 12,
        display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
      }}>
        {slots.map((tileIdx, slotIdx) => {
          const filled = tileIdx !== null;
          const isPulse = pulseSlot === slotIdx;
          const isNext = !filled && slotIdx === nextSlotIdx && !revealed;
          return (
            <span key={slotIdx} style={{
              display: 'inline-block',
              minWidth: filled ? undefined : 60,
              padding: filled ? '6px 12px' : '6px 10px',
              background: filled ? 'var(--t-success-tint)' : isNext ? 'var(--t-tint-warn)' : '#f1ebe1',
              color: filled ? 'var(--t-text)' : '#a89c80',
              border: `2px dashed ${isNext ? 'var(--t-brand)' : '#c4b89c'}`,
              borderStyle: filled ? 'solid' : 'dashed',
              borderColor: filled ? 'var(--t-success)' : isNext ? 'var(--t-brand)' : '#c4b89c',
              borderRadius: 8,
              fontSize: 'var(--t-text-option)', fontWeight: 800, lineHeight: 1.2,
              textAlign: 'center',
              transform: isPulse ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 200ms ease, background 200ms ease',
            }}>
              {filled ? tiles[tileIdx!] : '____'}
            </span>
          );
        })}
      </div>
      {/* tile candidates — shuffled, tap to validate */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {shuffleOrder.current.map(tileIdx => {
          const t = tiles[tileIdx];
          const isPlaced = placedTileIndices.has(tileIdx);
          const isWobble = wrongFlash === tileIdx;
          const isHint = hintTileIdx === tileIdx;
          return (
            <button
              key={tileIdx}
              onClick={() => tap(tileIdx)}
              disabled={revealed || isPlaced}
              className={isWobble ? 'pickup-wobble' : undefined}
              style={{
                padding: '10px 16px',
                background: isPlaced ? '#e8dec8' : isHint ? 'var(--t-surface-alt)' : 'var(--t-surface)',
                color: isPlaced ? 'var(--t-border-card)' : 'var(--t-text)',
                border: `2px solid ${isHint ? 'var(--t-brand)' : 'var(--t-border-card)'}`,
                borderBottom: `3px solid ${isHint ? 'var(--t-brand-dark)' : 'var(--t-brand-dark)'}`,
                borderRadius: 10,
                fontSize: 'var(--t-text-option)', fontWeight: 700,
                cursor: isPlaced || revealed ? 'default' : 'pointer',
                fontFamily: 'inherit',
                opacity: isPlaced ? 0.55 : 1,
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                transition: 'opacity 200ms ease',
              }}
            >
              {t}
            </button>
          );
        })}
      </div>
      {/* status microcopy — 2-strike hint or encouragement */}
      {!revealed && wrongCount === 1 && (
        <div className="pickup-fade-up" style={{ fontSize: 13, color: 'var(--t-text-muted)', textAlign: 'center', fontWeight: 700, marginTop: 6 }}>
          再試一次 · Try again
        </div>
      )}
      {!revealed && wrongCount >= 2 && hintTileIdx >= 0 && (
        <div className="pickup-fade-up" style={{ fontSize: 13, color: 'var(--t-brand-dark)', textAlign: 'center', fontWeight: 800, marginTop: 6 }}>
          🐱 Mochi 提示: 試試亮亮的那個 · Try the highlighted one
        </div>
      )}
      {revealed && <Explanation text={q.explanationZh ?? `正解: ${en}`} />}
    </div>
  );
};

// ─── 6. tap-pairs (簡化配對 · v2.0.B.279 Duolingo-style 重做) ──────────────
// 改 layout 2 真左右 column (中文 / 英文), 加 per-pair pulse + ✓ + wrong shake.
// user (B.279): 「左邊中文 右邊英文 然後點了要有特效 參考多鄰國答對特效」
const TapPairsRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  // v2.0.B.249: schema 用 pairs: [{left, right}] (Zod), 舊 renderer 讀 pairsEn
  // tuple → defensive 讀, 兩種 shape 都吃. data 約定: left=中文, right=英文
  const pairs: Array<[string, string]> = (
    (q.pairs as Array<{ left: string; right: string } | [string, string]> | undefined) ??
    q.pairsEn ??
    []
  ).map((p) => (Array.isArray(p) ? p : [p.left, p.right]));
  const [matched, setMatched] = useState<number[]>([]);
  const [selected, setSelected] = useState<{ side: 'left' | 'right'; idx: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  // v2.0.B.279: animation state — 配對瞬間打 success class, 答錯打 wrong class
  const [justMatched, setJustMatched] = useState<number | null>(null);
  const [shakeIds, setShakeIds] = useState<{ left: number | null; right: number | null }>({ left: null, right: null });

  // Stable shuffled right-side once per question
  const rightShuffle = useRef<number[]>([]);
  useEffect(() => {
    rightShuffle.current = pairs.map((_, i) => i).sort(() => Math.random() - 0.5);
    setMatched([]); setSelected(null); setRevealed(false);
    setJustMatched(null); setShakeIds({ left: null, right: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  const tap = (side: 'left' | 'right', idx: number) => {
    if (revealed) return;
    if (side === 'left' && matched.includes(idx)) return;
    if (side === 'right' && matched.includes(rightShuffle.current[idx])) return;
    sfxCardPress();
    // v2.0.B.280: 「塞虛擬聲音」— tap 卡讀字 (左中文 zh-TW / 右英文 en-US, force=true 略 mute)
    // Web Speech API 是免費 placeholder, user 之後可換成 OpenAI TTS 預錄音檔
    try {
      if (side === 'left') {
        speak(pairs[idx][0], 'zh-TW', { rate: 0.85, force: true });
      } else {
        const origIdx = rightShuffle.current[idx];
        if (origIdx !== undefined && pairs[origIdx]) {
          speak(pairs[origIdx][1], 'en-US', { rate: 0.85, force: true });
        }
      }
    } catch {}
    if (!selected) { setSelected({ side, idx }); return; }
    if (selected.side === side) { setSelected({ side, idx }); return; }
    const leftIdx = selected.side === 'left' ? selected.idx : idx;
    const rightSIdx = selected.side === 'right' ? selected.idx : idx;
    const actualRight = rightShuffle.current[rightSIdx];
    if (leftIdx === actualRight) {
      // ✓ 配對成功 — per-pair sfxCorrect (subtle) + pulse animation
      try { sfxCorrect(); } catch {}
      setJustMatched(leftIdx);
      window.setTimeout(() => setJustMatched(null), 600);
      const next = [...matched, leftIdx];
      setMatched(next);
      setSelected(null);
      if (next.length === pairs.length) {
        setRevealed(true);
        onAnswer(0, true);
        window.setTimeout(() => onAdvance(), 2200);
      }
    } else {
      // ✗ 答錯 — shake 兩張卡 + sfxWrong
      try { sfxWrong(); } catch {}
      setShakeIds({ left: leftIdx, right: rightSIdx });
      window.setTimeout(() => setShakeIds({ left: null, right: null }), 420);
      setSelected(null);
    }
  };

  if (pairs.length === 0) {
    return <div style={{ padding: 20, color: 'var(--t-text-muted)', textAlign: 'center' }}>{tq('q.noPairData')}</div>;
  }

  // v2.0.B.461 (per user 格式照第二張圖片): 扁平白卡 + 淺灰邊 + 底部軟陰影; 配對成功 = 灰掉淡出。
  const cardStyle = (state: 'matched' | 'selected' | 'default'): React.CSSProperties => ({
    width: '100%', minHeight: 78, padding: '0 12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: state === 'matched' ? '#f6f3ee' : state === 'selected' ? 'var(--t-tint-warn)' : 'var(--t-surface)',
    color: state === 'matched' ? '#cfc8bb' : 'var(--t-text)',
    border: `2px solid ${state === 'selected' ? 'var(--t-accent)' : state === 'matched' ? '#ece7df' : '#e5e0d6'}`,
    boxShadow: state === 'matched' ? 'none' : '0 2px 0 #e0dacf',
    borderRadius: 16,
    fontSize: 'var(--t-text-option)', fontWeight: 800, fontFamily: 'inherit',
    cursor: state === 'matched' ? 'default' : 'pointer',
    touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
    transition: 'background 150ms ease, border-color 150ms ease, opacity 150ms ease',
    opacity: state === 'matched' ? 0.55 : 1,
  });

  return (
    // v2.0.B.461 (per user 格式照第二張圖片): 無吉祥物, 兩欄大卡 (左中文/右英文) 填滿, 底部檢查鈕。
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* v2.0.B.462 (per user「題目要在中間, 跟上面有空間」): 卡片群垂直置中於剩餘空間 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: 16 }}>
        {/* LEFT — 中文 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {pairs.map((p, i) => {
            const isMatched = matched.includes(i);
            const isSelected = selected?.side === 'left' && selected.idx === i;
            const isJustMatched = justMatched === i;
            const isShaking = shakeIds.left === i;
            const state: 'matched' | 'selected' | 'default' = isMatched ? 'matched' : isSelected ? 'selected' : 'default';
            const className = isJustMatched ? 'pickup-pair-success' : isShaking ? 'pickup-pair-wrong' : undefined;
            // v2.0.B.541 (per user「配對題答對之後隱形」): 配對成功 → 播完 success 脈動即淡成隱形
            // (保留原位不重排, 避免其他卡跳動/誤點), 只剩未配對的卡。
            const gone = isMatched && !isJustMatched;
            return (
              <button
                key={`L${i}`}
                onClick={() => tap('left', i)}
                disabled={isMatched}
                className={className}
                style={{ ...cardStyle(state), ...(gone ? { opacity: 0, pointerEvents: 'none', boxShadow: 'none' } : {}) }}
              >
                {/* v2.0.B.281: 砍 ✓ — user「不要打勾」. 色變 + disabled 已表明 matched */}
                <span>{p[0]}</span>
              </button>
            );
          })}
        </div>
        {/* RIGHT — 英文 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {rightShuffle.current.map((origIdx, sIdx) => {
            const isMatched = matched.includes(origIdx);
            const isSelected = selected?.side === 'right' && selected.idx === sIdx;
            const isJustMatched = justMatched === origIdx;
            const isShaking = shakeIds.right === sIdx;
            const state: 'matched' | 'selected' | 'default' = isMatched ? 'matched' : isSelected ? 'selected' : 'default';
            const className = isJustMatched ? 'pickup-pair-success' : isShaking ? 'pickup-pair-wrong' : undefined;
            const gone = isMatched && !isJustMatched; // v2.0.B.541: 答對後隱形 (保留原位)
            return (
              <button
                key={`R${sIdx}`}
                onClick={() => tap('right', sIdx)}
                disabled={isMatched}
                className={className}
                style={{ ...cardStyle(state), ...(gone ? { opacity: 0, pointerEvents: 'none', boxShadow: 'none' } : {}) }}
              >
                <span>{pairs[origIdx]?.[1]}</span>
              </button>
            );
          })}
        </div>
      </div>
      {revealed && (
        <div className="pickup-pair-celebrate" style={{ marginTop: 16, textAlign: 'center', fontSize: 40, lineHeight: 1 }}>🎉</div>
      )}
      </div>
      {/* v2.0.B.461 (格式照第二張圖片): 底部檢查鈕 — 配對題全配對自動推進, 此鈕維持灰 (視覺一致) */}
      <div style={{ paddingTop: 16 }}>
        <button type="button" disabled style={{
          width: '100%', minHeight: 52, border: 'none', borderRadius: 'var(--t-radius-card)',
          background: 'var(--t-border-card)', color: '#fff', fontSize: 16, fontWeight: 900,
          fontFamily: 'inherit', cursor: 'default',
        }}>{tq('q.check')}</button>
      </div>
    </div>
  );
};

// ─── 聽力配對 listen-pairs (v2.0.B.cron per user「選擇配對」Duolingo std) ──────
// 「聽力選中文」: 左欄 = 聲音波形按鈕 (播英文, 不顯示英文字), 右欄 = 中文。
// 用聽的把音檔配到中文意思。圖片槽 + 框框 + 波形 = 照 user screenshot 標準設計。
// 資料沿用 tap-pairs {left:中文, right:英文}: 左格播 right(英文), 右格顯示 left(中文)。
const ListenPairsRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const pairs: Array<[string, string]> = (
    (q.pairs as Array<{ left: string; right: string } | [string, string]> | undefined) ??
    q.pairsEn ??
    []
  ).map((p) => (Array.isArray(p) ? p : [p.left, p.right]));
  const [matched, setMatched] = useState<number[]>([]);
  const [selected, setSelected] = useState<{ side: 'audio' | 'zh'; idx: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [justMatched, setJustMatched] = useState<number | null>(null);
  const [shakeIds, setShakeIds] = useState<{ audio: number | null; zh: number | null }>({ audio: null, zh: null });

  const rightShuffle = useRef<number[]>([]);
  useEffect(() => {
    rightShuffle.current = pairs.map((_, i) => i).sort(() => Math.random() - 0.5);
    setMatched([]); setSelected(null); setRevealed(false);
    setJustMatched(null); setShakeIds({ audio: null, zh: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  const speakEn = (origIdx: number) => {
    try { if (pairs[origIdx]) speak(pairs[origIdx][1], 'en-US', { rate: 0.85, force: true }); } catch {}
  };

  const tap = (side: 'audio' | 'zh', idx: number) => {
    if (revealed) return;
    if (side === 'audio' && matched.includes(idx)) return;
    if (side === 'zh' && matched.includes(rightShuffle.current[idx])) return;
    sfxCardPress();
    // 聽力題: 點左格永遠播該音檔英文 (聽力是答題唯一線索)
    if (side === 'audio') speakEn(idx);
    if (!selected) { setSelected({ side, idx }); return; }
    if (selected.side === side) { setSelected({ side, idx }); return; }
    const audioIdx = selected.side === 'audio' ? selected.idx : idx;
    const zhSIdx = selected.side === 'zh' ? selected.idx : idx;
    const actualZh = rightShuffle.current[zhSIdx];
    if (audioIdx === actualZh) {
      try { sfxCorrect(); } catch {}
      setJustMatched(audioIdx);
      window.setTimeout(() => setJustMatched(null), 600);
      const next = [...matched, audioIdx];
      setMatched(next);
      setSelected(null);
      if (next.length === pairs.length) {
        setRevealed(true);
        onAnswer(0, true);
        window.setTimeout(() => onAdvance(), 2200);
      }
    } else {
      try { sfxWrong(); } catch {}
      setShakeIds({ audio: audioIdx, zh: zhSIdx });
      window.setTimeout(() => setShakeIds({ audio: null, zh: null }), 420);
      setSelected(null);
    }
  };

  if (pairs.length === 0) {
    return <div style={{ padding: 20, color: 'var(--t-text-muted)', textAlign: 'center' }}>{tq('q.noPairData')}</div>;
  }

  // 聲音格 — 選中藍底藍框 (照 screenshot), 配對成功綠, 預設白
  const audioCell = (state: 'matched' | 'selected' | 'default'): React.CSSProperties => ({
    padding: '12px 12px',
    background: state === 'matched' ? 'var(--t-success-tint)' : state === 'selected' ? 'var(--t-tint-warn)' : 'var(--t-surface)',
    border: `2px solid ${state === 'matched' ? 'var(--t-success)' : state === 'selected' ? 'var(--t-brand-dark)' : 'var(--t-border-card)'}`,
    borderRadius: 'var(--t-radius-card)', cursor: state === 'matched' ? 'default' : 'pointer', fontFamily: 'inherit',
    minHeight: 56, display: 'flex', alignItems: 'center', gap: 8,
    touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
    transition: 'background 160ms ease, border-color 160ms ease',
  });
  // 中文格 — 選中暖琥珀, 配對成功綠, 預設白
  const zhCell = (state: 'matched' | 'selected' | 'default'): React.CSSProperties => ({
    padding: '12px 10px',
    background: state === 'matched' ? 'var(--t-success-tint)' : state === 'selected' ? 'var(--t-tint-warn)' : 'var(--t-surface)',
    color: 'var(--t-text)',
    border: `2px solid ${state === 'matched' ? 'var(--t-success)' : 'var(--t-border-card)'}`,
    borderBottom: state === 'matched' ? '3px solid var(--t-success)' : '3px solid var(--t-brand-dark)',
    borderRadius: 'var(--t-radius-card)', fontSize: 16, fontWeight: 800, cursor: state === 'matched' ? 'default' : 'pointer',
    fontFamily: 'inherit', minHeight: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
    touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
    transition: 'background 160ms ease, border-color 160ms ease',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* 圖片槽 — 角色置中 (照 screenshot 標準位置) + 下方分隔線 */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--t-border-soft)' }}>
        <img src="/mascots/calico-anchor.webp" width={104} height={104} alt="" style={{ borderRadius: '50%', display: 'block' }} />
      </div>
      {/* 題型標題 (照 screenshot「選擇配對」) */}
      <div style={{ textAlign: 'center', fontSize: 17, fontWeight: 900, color: 'var(--t-text)', marginBottom: 14 }}>{tq('q.matchPairs')}</div>

      <div style={{ display: 'flex', gap: 10, marginTop: 'auto', marginBottom: 'auto' }}>
        {/* LEFT — 聲音波形 (播英文) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pairs.map((_, i) => {
            const isMatched = matched.includes(i);
            const isSelected = selected?.side === 'audio' && selected.idx === i;
            const state: 'matched' | 'selected' | 'default' = isMatched ? 'matched' : isSelected ? 'selected' : 'default';
            const className = justMatched === i ? 'pickup-pair-success' : shakeIds.audio === i ? 'pickup-pair-wrong' : undefined;
            const gone = isMatched && justMatched !== i; // v2.0.B.541: 答對後隱形 (保留原位)
            return (
              <button key={`A${i}`} onClick={() => tap('audio', i)} disabled={isMatched} className={className} style={{ ...audioCell(state), ...(gone ? { opacity: 0, pointerEvents: 'none', boxShadow: 'none' } : {}) }} aria-label={tq('q.playAudio')}>
                <img src="/mascots/icon-speaker.webp" width={22} height={22} alt="" style={{ flex: '0 0 auto', opacity: isMatched ? 0.45 : 0.85 }} />
                <Waveform active={isSelected} seed={i} />
              </button>
            );
          })}
        </div>
        {/* RIGHT — 中文 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rightShuffle.current.map((origIdx, sIdx) => {
            const isMatched = matched.includes(origIdx);
            const isSelected = selected?.side === 'zh' && selected.idx === sIdx;
            const state: 'matched' | 'selected' | 'default' = isMatched ? 'matched' : isSelected ? 'selected' : 'default';
            const className = justMatched === origIdx ? 'pickup-pair-success' : shakeIds.zh === sIdx ? 'pickup-pair-wrong' : undefined;
            const gone = isMatched && justMatched !== origIdx; // v2.0.B.541: 答對後隱形 (保留原位)
            return (
              <button key={`Z${sIdx}`} onClick={() => tap('zh', sIdx)} disabled={isMatched} className={className} style={{ ...zhCell(state), ...(gone ? { opacity: 0, pointerEvents: 'none', boxShadow: 'none' } : {}) }}>
                <span>{pairs[origIdx]?.[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
      {revealed && (
        <div className="pickup-pair-celebrate" style={{ marginTop: 20, textAlign: 'center', fontSize: 44, lineHeight: 1 }}>🎉</div>
      )}
    </div>
  );
};

// ─── 7. emoji-pick (v2.0.B.197 Ch1 hook) ───────────────────────────────────
// 開場 hook: 3 秒情緒 + 5 秒小勝利 + Zeigarnik 故事鉤。No TTS dependency
// (emoji 視覺自帶 affordance),iOS first-tap audio unlock 靠這次 tap。
const WRONG_POOL = [
  'She shakes her head ✨',
  'Not that one ✨',
  'She wants something else ✨',
];

const EmojiPickRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const prompt = q.sentence ?? '';
  const opts = q.options ?? [];
  const optsZh = q.optionsZh ?? [];
  const correctIdx = q.correctIndex ?? 0;
  const afterText = q.explanationZh ?? '';
  const [phase, setPhase] = useState<'pick' | 'reveal'>('pick');
  const [wrongCount, setWrongCount] = useState(0);
  const [shakeIdx, setShakeIdx] = useState<number | null>(null);

  const onTap = (i: number) => {
    if (phase === 'reveal') return;
    if (i === correctIdx) {
      try { sfxCorrect(); } catch {}
      onAnswer(i, true);
      window.setTimeout(() => setPhase('reveal'), 800);
    } else {
      try { sfxWrong(); } catch {}
      setShakeIdx(i);
      setWrongCount(c => c + 1);
      window.setTimeout(() => setShakeIdx(null), 400);
    }
  };

  if (phase === 'reveal') {
    return (
      <div className="pickup-fade-up" style={{ textAlign: 'center', padding: '30px 20px' }}>
        <img src="/mascots/calico-anchor.webp" width={120} height={120} alt="Mochi" className="pickup-bounce" style={{ borderRadius: '50%', marginBottom: 18 }} />
        <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--t-text)', lineHeight: 1.7, marginBottom: 24 }}>{afterText}</p>
        <button onClick={() => onAdvance(prompt)} className="pickup-press" style={{
          padding: '16px 24px', background: 'var(--t-brand)', color: 'var(--t-surface)', border: 'none',
          borderBottom: '4px solid var(--t-brand-dark)', borderRadius: 'var(--t-radius-card)', fontSize: 17, fontWeight: 900,
          cursor: 'pointer', fontFamily: 'inherit', width: '100%', maxWidth: 360,
          WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
        }} aria-label="聽 Mochi 的故事">→</button>
      </div>
    );
  }

  return (
    <div className="pickup-fade-up" style={{ textAlign: 'center', padding: '10px 8px' }}>
      <div style={{ textAlign: 'left' }}><SpeakerBadge speaker={q.speaker} /></div>
      <img src="/mascots/calico-anchor.webp" width={84} height={84} alt="Mochi" style={{ borderRadius: '50%', marginBottom: 10 }} />
      <h2 style={{ fontSize: 'var(--t-text-stem)', fontWeight: 900, color: 'var(--t-text)', lineHeight: 1.5, margin: '0 0 14px' }}>{prompt}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, maxWidth: 360, margin: '0 auto' }}>
        {opts.map((o, i) => {
          const [emoji, ...labelParts] = o.split(' ');
          const label = labelParts.join(' ');
          const isShaking = shakeIdx === i;
          return (
            <button key={i} onClick={() => onTap(i)} className={isShaking ? 'pickup-wobble' : 'pickup-press'} aria-label={`${label} ${optsZh[i] || ''}`} style={{
              padding: '14px 8px', background: 'var(--t-surface)', border: '2px solid var(--t-border-soft)',
              borderBottom: '4px solid var(--t-border-card)', borderRadius: 'var(--t-radius-card)',
              cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
              transition: 'transform 80ms ease',
            }}>
              <span style={{ fontSize: 38, lineHeight: 1 }}>{emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--t-text)' }}>{label}</span>
            </button>
          );
        })}
      </div>
      {wrongCount > 0 && (
        <p className="pickup-fade-up" key={wrongCount} style={{ marginTop: 16, fontSize: 13, color: 'var(--t-text-muted)', fontWeight: 700 }}>
          {WRONG_POOL[(wrongCount - 1) % WRONG_POOL.length]}
        </p>
      )}
    </div>
  );
};

// ─── 8. listen-emoji (v2.0.B.232 #1) ────────────────────────────────────────
// TTS 唸 1 個英文字 (e.g. 'cat'), 4 個 emoji 大圖選 1。比 listen-mc 更圖像化,
// 適合 A2 入門 / 海外華人 heritage learners 視覺優先。option string 格式
// "🐈 cat" (emoji + space + EN label),renderer split 後 emoji 大字 / label 小字。
//
// Differs from emoji-pick: emoji-pick 是 reading prompt → emoji,本題是
// listening prompt → emoji (blind, 沒看見英文,只聽聲音)。
const ListenEmojiRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const word = q.audioWord ?? q.sentence ?? '';
  const opts = q.options ?? [];
  const optsZh = q.optionsZh ?? [];
  const correctIdx = q.correctIndex ?? 0;
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [shakeIdx, setShakeIdx] = useState<number | null>(null);

  useEffect(() => {
    setRevealed(false); setSelected(null); setShakeIdx(null);
    try { speak(word, 'en-US'); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  useRevealAdvance(revealed, selected === correctIdx, () => onAdvance(word), 2500, 4000);

  const click = (i: number) => {
    if (revealed) return;
    sfxCardPress();
    if (i === correctIdx) {
      setSelected(i);
      setRevealed(true);
      onAnswer(i, true);
    } else {
      try { sfxWrong(); } catch {}
      setShakeIdx(i);
      window.setTimeout(() => setShakeIdx(null), 380);
      // first wrong logs as answer (parity with TapTilesRenderer)
      setSelected(i);
      onAnswer(i, false);
      // 2-strike reveal: show correct after 2 wrong attempts
    }
  };

  return (
    <div className="pickup-lesson-words" style={{ textAlign: 'center', padding: '12px 4px' }}>
      <div style={{ textAlign: 'left' }}><SpeakerBadge speaker={q.speaker} /></div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '14px 16px', background: 'var(--t-surface-alt)', border: '1px solid var(--t-border-soft)', borderRadius: 'var(--t-radius-md)', marginBottom: 18 }}>
        <SpeakerBtn onClick={() => speak(word, 'en-US', { force: true })} size={56} />
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t-text-muted)' }}>{tq('q.listenThenPick')}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 360, margin: '0 auto' }}>
        {opts.map((o, i) => {
          const [emoji, ...labelParts] = o.split(' ');
          const label = labelParts.join(' ');
          const isShaking = shakeIdx === i;
          const isCorrect = i === correctIdx;
          const isSel = i === selected;
          const bg = !revealed
            ? 'var(--t-surface)'
            : isCorrect ? 'var(--t-success-tint)'
            : isSel ? 'var(--t-danger-tint)' : 'var(--t-surface)';
          const border = !revealed
            ? 'var(--t-border-soft)'
            : isCorrect ? 'var(--t-success)'
            : isSel ? 'var(--t-danger)' : 'var(--t-border-soft)';
          return (
            <button
              key={i}
              onClick={() => click(i)}
              disabled={revealed}
              aria-label={`${label} ${optsZh[i] || ''}`}
              className={isShaking ? 'pickup-wobble' : 'pickup-press'}
              style={{
                padding: '20px 8px',
                background: bg,
                border: `2px solid ${border}`,
                borderBottom: `4px solid ${revealed && isCorrect ? 'var(--t-success)' : 'var(--t-border-card)'}`,
                borderRadius: 'var(--t-radius-card)',
                cursor: revealed ? 'default' : 'pointer',
                fontFamily: 'inherit',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
              }}
            >
              <span style={{ fontSize: 'clamp(34px, 9vh, 52px)', lineHeight: 1 }}>{emoji}</span>
              {revealed && <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--t-text)' }}>{label}{optsZh[i] ? <> · <SpeakZh text={optsZh[i]} /></> : ''}</span>}
            </button>
          );
        })}
      </div>
      {revealed && <Explanation text={q.explanationZh ?? ''} />}
    </div>
  );
};

// ─── 9. picture-mc (v2.0.B.232 #2) ──────────────────────────────────────────
// 顯示 1 張圖 (emoji big or img URL), 4 個英文句子選 1 描述。
// 培養「圖 → 語言」翻譯 (reverse of listen-emoji)。
const PictureMcRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const opts = q.options ?? [];
  const optsZh = q.optionsZh ?? [];
  const correctIdx = q.correctIndex ?? 0;
  const prompt = q.question ?? q.questionEn ?? 'Which sentence describes the picture?';
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setRevealed(false); setSelected(null);
    // Auto-read prompt for accessibility / A2 reading-only learners
    try { speak(prompt, 'en-US'); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  useRevealAdvance(revealed, selected === correctIdx, () => onAdvance(opts[correctIdx]), 3000);

  // v2.0.B.435: 點選項 = 只選取; 底部「檢查」鈕才送出。
  const click = (i: number) => {
    if (revealed) return;
    sfxCardPress();
    setSelected(i);
  };
  const check = () => {
    if (revealed || selected == null) return;
    setRevealed(true);
    onAnswer(selected, selected === correctIdx);
  };

  return (
    <div className="pickup-lesson-words" style={{ padding: '4px 0', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <SpeakerBadge speaker={q.speaker} />
      {/* v2.0.B.370 (per user 標準): 圖片框 flex-shrink — 沒位置就縮小, 選項永不被折疊 */}
      <div style={{
        flex: '1 1 auto', minHeight: 0, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '12px', background: 'var(--t-surface-alt)',
        border: '2px solid var(--t-border-soft)', borderRadius: 16, marginBottom: 12,
      }}>
        {q.imageUrl ? (
          <img src={q.imageUrl} alt="" style={{ maxWidth: '72%', maxHeight: '100%', objectFit: 'contain' }} />
        ) : (
          <span style={{ fontSize: 'clamp(48px, 16vh, 96px)', lineHeight: 1 }}>{q.imageEmoji ?? '🖼️'}</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--t-surface-alt)', border: '1px solid var(--t-border-soft)', borderRadius: 'var(--t-radius-md)', marginBottom: 12 }}>
        <SpeakerBtn onClick={() => speak(prompt, 'en-US', { force: true })} size={32} />
        <span style={{ flex: 1, fontSize: 14, fontWeight: 800, color: 'var(--t-text)' }}>{prompt}</span>
      </div>
      <div className="pickup-answer-sticky">
        {opts.map((o, i) => {
          const isCorrect = i === correctIdx;
          const isSel = i === selected;
          const state: 'idle' | 'selected' | 'correct' | 'wrong' | 'shown' =
            !revealed ? (isSel ? 'selected' : 'idle') : isSel ? (isCorrect ? 'correct' : 'wrong') : isCorrect ? 'correct' : 'shown';
          return <OptionBtn key={i} label={o} labelZh={revealed ? optsZh[i] : undefined} state={state} onClick={() => click(i)} disabled={revealed} />;
        })}
        {!revealed && <CheckBtn active={selected != null} onCheck={check} />}
      </div>
      {revealed && <Explanation text={q.explanationZh ?? ''} />}
    </div>
  );
};

// ─── 10. read-and-tap (v2.0.B.232 #3) ───────────────────────────────────────
// 顯示 1 句英文 + 雙語, 兒童 tap 句中某個關鍵字 (e.g. 'Tap the verb')。
// 培養語法意識。answer 維度:correctWordIndex 0-indexed against split words.
const ReadAndTapRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const en = q.sentence ?? '';
  const zh = q.sentenceZh ?? '';
  const prompt = q.promptEn ?? q.question ?? 'Tap the word';
  const correctIdx = q.correctWordIndex ?? 0;
  const words = en.split(/\s+/).filter(Boolean);
  const [tapped, setTapped] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    setTapped(null); setRevealed(false); setWrongCount(0);
    try { speak(en, 'en-US', { onEnd: () => {
      if (prompt) window.setTimeout(() => { try { speak(prompt); } catch {} }, 400);
    }}); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  useEffect(() => {
    if (!revealed) return;
    const t = window.setTimeout(() => onAdvance(en), tapped === correctIdx ? 2800 : 3800);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  const tap = (i: number) => {
    if (revealed) return;
    sfxCardPress();
    if (i === correctIdx) {
      try { sfxCorrect(); } catch {}
      setTapped(i);
      setRevealed(true);
      onAnswer(i, true);
    } else {
      try { sfxWrong(); } catch {}
      setTapped(i);
      setWrongCount(c => c + 1);
      if (wrongCount === 0) onAnswer(i, false);
      if (wrongCount >= 1) {
        // 2-strike reveal — show correct answer
        setRevealed(true);
      }
      window.setTimeout(() => { if (!revealed) setTapped(null); }, 600);
    }
  };

  return (
    <div className="pickup-lesson-words" style={{ padding: '4px 0' }}>
      <SpeakerBadge speaker={q.speaker} />
      {/* prompt */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--t-surface-alt)', border: '1px solid var(--t-border-soft)', borderRadius: 'var(--t-radius-md)', marginBottom: 12 }}>
        <SpeakerBtn onClick={() => speak(prompt, 'en-US', { force: true })} size={36} />
        <span style={{ flex: 1, fontSize: 'var(--t-text-stem)', fontWeight: 800, color: 'var(--t-text)' }}>{prompt}</span>
      </div>
      {/* sentence with tappable words */}
      <div style={{
        padding: '16px 14px', background: 'var(--t-surface)',
        border: '2px solid var(--t-border-card)', borderRadius: 'var(--t-radius-card)', marginBottom: 10,
        display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
      }}>
        {words.map((w, i) => {
          const isTapped = tapped === i;
          const isCorrect = i === correctIdx;
          const bg = !revealed
            ? isTapped ? 'var(--t-danger-tint)' : 'var(--t-surface)'
            : isCorrect ? 'var(--t-success-tint)' : isTapped && !isCorrect ? 'var(--t-danger-tint)' : 'var(--t-surface)';
          const border = !revealed
            ? isTapped ? 'var(--t-danger)' : 'var(--t-border-card)'
            : isCorrect ? 'var(--t-success)' : isTapped && !isCorrect ? 'var(--t-danger)' : 'var(--t-border-card)';
          const color = revealed && isCorrect ? 'var(--t-success)' : 'var(--t-text)';
          return (
            <button
              key={i}
              onClick={() => tap(i)}
              disabled={revealed}
              aria-label={`Word ${i + 1}: ${w}`}
              style={{
                padding: '6px 12px',
                background: bg,
                color,
                border: `2px solid ${border}`,
                borderBottom: `3px solid ${revealed && isCorrect ? 'var(--t-success)' : 'var(--t-brand-dark)'}`,
                borderRadius: 10,
                fontSize: 16, fontWeight: 800,
                cursor: revealed ? 'default' : 'pointer',
                fontFamily: 'inherit',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {w}
            </button>
          );
        })}
      </div>
      {zh && (
        <div style={{ fontSize: 13, color: 'var(--t-text-muted)', textAlign: 'center', marginBottom: 8 }}>{zh}</div>
      )}
      {!revealed && wrongCount === 1 && (
        <div className="pickup-fade-up" style={{ fontSize: 13, color: 'var(--t-text-muted)', textAlign: 'center', fontWeight: 700, marginTop: 6 }}>
          再試一次 · Try again
        </div>
      )}
      {revealed && <Explanation text={q.explanationZh ?? ''} />}
    </div>
  );
};

// ─── 11. drag-blank (v2.0.B.232 #4) ─────────────────────────────────────────
// 拖字到空格,但 iOS Safari fallback tap-to-place (跟招 7 tap-tiles 同邏輯)。
// sentenceTemplate 用 __ 表示 blanks;tiles 是 candidate bank;
// correctTiles 是依序填空答案 (length == __ count)。
// 為了 A/B testing 跟 tap-tiles 並存。
const DragBlankRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const template = q.sentenceTemplate ?? '';
  const tiles = q.tiles ?? [];
  const correctTiles = q.correctTiles ?? [];
  const blanksCount = (template.match(/__/g) ?? []).length;
  // segments: ["I want a ", "__", " for breakfast"] (split keeps blanks empty)
  const segments = template.split(/__/g);
  // shuffled candidate order
  const shuffleOrder = useRef<number[]>([]);
  const [placements, setPlacements] = useState<(number | null)[]>(() => Array(blanksCount).fill(null));
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const placed = new Set(placements.filter((x): x is number => x !== null));
  const nextSlot = placements.findIndex(p => p === null);

  useEffect(() => {
    shuffleOrder.current = tiles.map((_, i) => i).sort(() => Math.random() - 0.5);
    setPlacements(Array(blanksCount).fill(null));
    setWrongFlash(null); setWrongCount(0); setRevealed(false);
    try { speak((q.sentence || template.replace(/__/g, '...')), 'en-US'); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  useEffect(() => {
    if (revealed) return;
    if (nextSlot === -1) {
      // all filled — and we only place correct tiles so this is a win
      setRevealed(true);
      try { sfxCorrect(); } catch {}
      onAnswer(0, true);
      window.setTimeout(() => onAdvance(template.replace(/__/g, '___')), 2800);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextSlot, revealed]);

  const tap = (tileIdx: number) => {
    if (revealed || placed.has(tileIdx) || nextSlot === -1) return;
    const tile = tiles[tileIdx];
    const expected = correctTiles[nextSlot];
    if (tile === expected) {
      sfxCardPress();
      setPlacements(prev => {
        const next = [...prev];
        next[nextSlot] = tileIdx;
        return next;
      });
    } else {
      try { sfxWrong(); } catch {}
      setWrongFlash(tileIdx);
      setWrongCount(c => c + 1);
      if (wrongCount === 0) onAnswer(1, false);
      window.setTimeout(() => setWrongFlash(null), 380);
    }
  };

  // 2-strike hint: highlight correct candidate
  const hintIdx = wrongCount >= 2 && nextSlot >= 0
    ? tiles.findIndex((t, i) => !placed.has(i) && t === correctTiles[nextSlot])
    : -1;

  // render sentence with slot placeholders interleaved
  const sentenceParts: React.ReactNode[] = [];
  segments.forEach((seg, i) => {
    if (seg) sentenceParts.push(<span key={`s${i}`}>{seg}</span>);
    if (i < segments.length - 1) {
      const tIdx = placements[i];
      const filled = tIdx !== null;
      sentenceParts.push(
        <span key={`b${i}`} style={{
          display: 'inline-block', minWidth: filled ? undefined : 56,
          padding: '2px 10px',
          background: filled ? 'var(--t-success-tint)' : i === nextSlot && !revealed ? 'var(--t-tint-warn)' : '#f1ebe1',
          color: filled ? 'var(--t-text)' : '#a89c80',
          border: `2px ${filled ? 'solid var(--t-success)' : i === nextSlot && !revealed ? 'dashed var(--t-brand)' : 'dashed #c4b89c'}`,
          borderRadius: 8,
          fontSize: 'var(--t-text-option)', fontWeight: 800, lineHeight: 1.2,
          margin: '0 2px',
        }}>
          {filled ? tiles[tIdx!] : '___'}
        </span>
      );
    }
  });

  return (
    <div className="pickup-lesson-words">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--t-surface-alt)', border: '1px solid var(--t-border-soft)', borderRadius: 'var(--t-radius-md)', marginBottom: 12 }}>
        <SpeakerBtn onClick={() => speak(q.sentence || template.replace(/__/g, '...'), 'en-US', { force: true })} size={36} />
        <div style={{ flex: 1, fontSize: 13, color: 'var(--t-text-muted)', fontWeight: 700 }}>
          點字填空 · Tap to fill the blank
        </div>
      </div>
      {/* sentence with slots */}
      <div style={{
        minHeight: 60, padding: '14px 12px',
        background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 'var(--t-radius-md)',
        marginBottom: 14, fontSize: 'var(--t-text-option)', fontWeight: 700, color: 'var(--t-text)',
        lineHeight: 1.9,
      }}>
        {sentenceParts}
      </div>
      {/* candidate bank */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {shuffleOrder.current.map(tIdx => {
          const t = tiles[tIdx];
          const isPlaced = placed.has(tIdx);
          const isWobble = wrongFlash === tIdx;
          const isHint = hintIdx === tIdx;
          return (
            <button
              key={tIdx}
              onClick={() => tap(tIdx)}
              disabled={revealed || isPlaced}
              className={isWobble ? 'pickup-wobble' : undefined}
              aria-label={`Tile: ${t}`}
              style={{
                padding: '10px 16px',
                background: isPlaced ? '#e8dec8' : isHint ? 'var(--t-surface-alt)' : 'var(--t-surface)',
                color: isPlaced ? 'var(--t-border-card)' : 'var(--t-text)',
                border: `2px solid ${isHint ? 'var(--t-brand)' : 'var(--t-border-card)'}`,
                borderBottom: `3px solid ${isHint ? 'var(--t-brand-dark)' : 'var(--t-brand-dark)'}`,
                borderRadius: 10,
                fontSize: 'var(--t-text-option)', fontWeight: 700,
                cursor: isPlaced || revealed ? 'default' : 'pointer',
                fontFamily: 'inherit',
                opacity: isPlaced ? 0.55 : 1,
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {t}
            </button>
          );
        })}
      </div>
      {q.sentenceZh && (
        <div style={{ fontSize: 12, color: 'var(--t-text-muted)', textAlign: 'center', marginBottom: 6 }}>{q.sentenceZh}</div>
      )}
      {!revealed && wrongCount === 1 && (
        <div className="pickup-fade-up" style={{ fontSize: 13, color: 'var(--t-text-muted)', textAlign: 'center', fontWeight: 700, marginTop: 6 }}>
          再試一次 · Try again
        </div>
      )}
      {!revealed && wrongCount >= 2 && hintIdx >= 0 && (
        <div className="pickup-fade-up" style={{ fontSize: 13, color: 'var(--t-brand-dark)', textAlign: 'center', fontWeight: 800, marginTop: 6 }}>
          🐱 試試亮亮的那個 · Try the highlighted one
        </div>
      )}
      {revealed && <Explanation text={q.explanationZh ?? ''} />}
    </div>
  );
};

// ─── 11.5 listen-build (v2.0.B.237 — blind listen + free build) ─────────────
//
// 純聽音檔 → 沒視覺 sentence template → tap tiles 完整建構句子.
// 跟 tap-tiles 差別: tap-tiles 視覺顯示 sentence (盲聽範圍只在順序), listen-build
// 連 sentence 都不顯示 (盲聽 + 自由排列). A2 最難的聽力題.
//
// Flow:
//   1. 大喇叭 (常速) + 🐢 慢速 (rate 0.5) 兩顆按鈕.
//   2. 中段 N 個 slot ____ ____ … (count = correctTiles.length), next slot 琥珀.
//   3. 下方 tile bank (含 distractors), tap correct tile → 填入 next slot + 鎖.
//   4. tap wrong tile → wobble + tile 留 bank 可重 tap; 第一次 wrong 記 onAnswer.
//   5. 2-strike reveal: 第 2 個 wrong 起亮亮的 hint border + Mochi 微文案.
//   6. 全填 → auto-advance 2.8s + Explanation 雙語.
const ListenBuildRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const sentence = q.sentence ?? '';
  const zh = q.sentenceZh ?? '';
  const tiles = q.tiles ?? [];
  const correctTiles = q.correctTiles ?? [];
  // Shuffled tile presentation order (stable per question)
  const shuffleOrder = useRef<number[]>([]);
  // slots: array<index-into-tiles | null>, length = correctTiles.length
  const [slots, setSlots] = useState<(number | null)[]>(() => correctTiles.map(() => null));
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const placed = new Set(slots.filter((x): x is number => x !== null));
  const nextSlot = slots.findIndex(s => s === null);

  useEffect(() => {
    shuffleOrder.current = tiles.map((_, i) => i).sort(() => Math.random() - 0.5);
    setSlots(correctTiles.map(() => null));
    setWrongFlash(null);
    setWrongCount(0);
    setRevealed(false);
    // Auto-play sentence on mount (盲聽 prompt).
    try { speak(sentence, 'en-US'); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  // Detect win (all slots filled — we only allow correct tiles so completion = correct)
  useEffect(() => {
    if (revealed) return;
    if (slots.length > 0 && nextSlot === -1) {
      setRevealed(true);
      try { sfxCorrect(); } catch {}
      onAnswer(0, true);
      window.setTimeout(() => onAdvance(sentence), 2800);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextSlot, revealed]);

  const tap = (tileIdx: number) => {
    if (revealed) return;
    if (placed.has(tileIdx)) return;
    if (nextSlot === -1) return;
    const expected = correctTiles[nextSlot];
    const tileWord = tiles[tileIdx];
    if (tileWord === expected) {
      sfxCardPress();
      setSlots(prev => {
        const next = [...prev];
        next[nextSlot] = tileIdx;
        return next;
      });
    } else {
      try { sfxWrong(); } catch {}
      setWrongFlash(tileIdx);
      setWrongCount(c => c + 1);
      if (wrongCount === 0) onAnswer(1, false);
      window.setTimeout(() => setWrongFlash(null), 380);
    }
  };

  // 2-strike hint: highlight correct tile candidate for next slot.
  const hintIdx = wrongCount >= 2 && nextSlot >= 0
    ? tiles.findIndex((t, i) => !placed.has(i) && t === correctTiles[nextSlot])
    : -1;

  return (
    <div className="pickup-lesson-words" style={{ padding: '4px 0' }}>
      <SpeakerBadge speaker={q.speaker} />
      {/* audio pad: big speaker + slow turtle (no visible sentence!) */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 16px',
        background: 'var(--t-surface-alt)', border: '1px solid var(--t-border-soft)',
        borderRadius: 'var(--t-radius-md)', marginBottom: 12,
      }}>
        <SpeakerBtn onClick={() => speak(sentence, 'en-US', { force: true })} size={52} />
        <button
          onClick={() => { try { speak(sentence, 'en-US', { rate: 0.5, force: true }); } catch {} }}
          aria-label="Slow replay"
          style={{
            padding: '8px 12px',
            background: 'var(--t-tint-warn)',
            color: 'var(--t-text-muted)',
            border: '2px solid var(--t-brand)',
            borderBottom: '3px solid var(--t-brand-dark)',
            borderRadius: 10,
            fontSize: 13, fontWeight: 800,
            cursor: 'pointer', fontFamily: 'inherit',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          🐢 {tq('q.slow')}
        </button>
        <div style={{ flex: 1, fontSize: 12, color: 'var(--t-text-muted)', fontWeight: 700, textAlign: 'right' }}>
          {tq('q.buildSentence')}
        </div>
      </div>
      {/* ordered slots — fully blind, no sentence template shown */}
      <div style={{
        minHeight: 60, padding: '14px 12px',
        background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 'var(--t-radius-md)',
        marginBottom: 12,
        display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
      }}>
        {slots.map((tIdx, sIdx) => {
          const filled = tIdx !== null;
          const isNext = !filled && sIdx === nextSlot && !revealed;
          return (
            <span key={sIdx} style={{
              display: 'inline-block',
              minWidth: filled ? undefined : 60,
              padding: filled ? '6px 12px' : '6px 10px',
              background: filled ? 'var(--t-success-tint)' : isNext ? 'var(--t-tint-warn)' : '#f1ebe1',
              color: filled ? 'var(--t-text)' : '#a89c80',
              border: `2px ${filled ? 'solid var(--t-success)' : isNext ? 'dashed var(--t-brand)' : 'dashed #c4b89c'}`,
              borderRadius: 8,
              fontSize: 'var(--t-text-option)', fontWeight: 800, lineHeight: 1.2,
              textAlign: 'center',
            }}>
              {filled ? tiles[tIdx!] : '____'}
            </span>
          );
        })}
      </div>
      {/* tile bank — shuffled */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {shuffleOrder.current.map(tIdx => {
          const t = tiles[tIdx];
          const isPlaced = placed.has(tIdx);
          const isWobble = wrongFlash === tIdx;
          const isHint = hintIdx === tIdx;
          return (
            <button
              key={tIdx}
              onClick={() => tap(tIdx)}
              disabled={revealed || isPlaced}
              className={isWobble ? 'pickup-wobble' : undefined}
              aria-label={`Tile: ${t}`}
              style={{
                padding: '10px 16px',
                background: isPlaced ? '#e8dec8' : isHint ? 'var(--t-surface-alt)' : 'var(--t-surface)',
                color: isPlaced ? 'var(--t-border-card)' : 'var(--t-text)',
                border: `2px solid ${isHint ? 'var(--t-brand)' : 'var(--t-border-card)'}`,
                borderBottom: `3px solid ${isHint ? 'var(--t-brand-dark)' : 'var(--t-brand-dark)'}`,
                borderRadius: 10,
                fontSize: 'var(--t-text-option)', fontWeight: 700,
                cursor: isPlaced || revealed ? 'default' : 'pointer',
                fontFamily: 'inherit',
                opacity: isPlaced ? 0.55 : 1,
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                transition: 'opacity 200ms ease',
              }}
            >
              {t}
            </button>
          );
        })}
      </div>
      {/* 2-strike hint microcopy */}
      {!revealed && wrongCount === 1 && (
        <div className="pickup-fade-up" style={{ fontSize: 13, color: 'var(--t-text-muted)', textAlign: 'center', fontWeight: 700, marginTop: 6 }}>
          再聽一次 · Listen again
        </div>
      )}
      {!revealed && wrongCount >= 2 && hintIdx >= 0 && (
        <div className="pickup-fade-up" style={{ fontSize: 13, color: 'var(--t-brand-dark)', textAlign: 'center', fontWeight: 800, marginTop: 6 }}>
          🐱 Mochi 提示: 試試亮亮的那個 · Try the highlighted one
        </div>
      )}
      {revealed && zh && (
        <div style={{ fontSize: 13, color: 'var(--t-text-muted)', textAlign: 'center', marginTop: 8 }}>{zh}</div>
      )}
      {revealed && <Explanation text={q.explanationZh ?? ''} />}
    </div>
  );
};

// ─── 12. speak-back (v2.0.B.232 #5) ─────────────────────────────────────────
// 錄音對齊,需 Web Speech Recognition API。顯示 sentence + 'Say:' + record button,
// 抓 user 唸的字 → 字串比對 → 對 / 錯 / try again。兒童發音練習。
// iOS Safari speech recognition 支援差 → 偵測 → fallback 'tap to skip' (graceful).
//
// SpeechRecognition API: Chrome / Edge / Android Chrome 支援良好,iOS Safari
// (≤17) 完全不支援,Safari 18+ 部分支援。fallback flow:no API → 灰按鈕 +
// '此裝置不支援錄音 · Tap to skip' (不 crash)。
interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (e: { results: { 0: { 0: { transcript: string } } } }) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}
const getSpeechRecognition = (): (new () => SpeechRecognitionLike) | null => {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

const SpeakBackRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const en = q.sentence ?? '';
  const zh = q.sentenceZh ?? '';
  const variants = q.acceptableVariants ?? [];
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [matched, setMatched] = useState<boolean | null>(null);
  const SR = getSpeechRecognition();
  const supported = SR !== null;
  const recRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    setRecording(false); setTranscript(''); setRevealed(false); setMatched(null);
    try { speak(en, 'en-US'); } catch {}
    return () => {
      try { recRef.current?.stop(); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  const norm = (s: string) => s.toLowerCase().replace(/[.,!?'"]/g, '').replace(/\s+/g, ' ').trim();

  const judge = (heard: string) => {
    const target = norm(en);
    const heardN = norm(heard);
    if (heardN === target) return true;
    if (variants.some(v => norm(v) === heardN)) return true;
    // fuzzy: ≤2 edits for short sentences
    const len = Math.max(target.length, heardN.length);
    const tol = len <= 10 ? 1 : len <= 25 ? 2 : 3;
    return editDistance(target, heardN) <= tol;
  };

  const startRec = () => {
    if (!SR || revealed) return;
    try {
      const rec = new SR();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';
      rec.onresult = (e) => {
        const heard = e.results[0][0].transcript;
        setTranscript(heard);
        const ok = judge(heard);
        setMatched(ok);
        setRevealed(true);
        try { (ok ? sfxCorrect : sfxWrong)(); } catch {}
        onAnswer(ok ? 0 : 1, ok);
        window.setTimeout(() => onAdvance(en), ok ? 3000 : 5000);
      };
      rec.onerror = () => { setRecording(false); };
      rec.onend = () => { setRecording(false); };
      recRef.current = rec;
      setRecording(true);
      rec.start();
    } catch {
      setRecording(false);
    }
  };

  const skip = () => {
    if (revealed) return;
    sfxCardPress();
    setRevealed(true);
    setMatched(null);
    onAnswer(0, true); // skip counts as pass to not punish unsupported devices
    window.setTimeout(() => onAdvance(en), 1500);
  };

  return (
    <div className="pickup-lesson-words" style={{ padding: '4px 0' }}>
      <SpeakerBadge speaker={q.speaker} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--t-surface-alt)', border: '1px solid var(--t-border-soft)', borderRadius: 'var(--t-radius-md)', marginBottom: 14 }}>
        <SpeakerBtn onClick={() => speak(en, 'en-US', { force: true })} size={44} />
        <span style={{ flex: 1, fontSize: 'var(--t-text-option)', fontWeight: 700, color: 'var(--t-text)', lineHeight: 1.6 }}>{en}</span>
      </div>
      {zh && (
        <div style={{ fontSize: 13, color: 'var(--t-text-muted)', textAlign: 'center', marginBottom: 10 }}>{zh}</div>
      )}
      <div style={{ textAlign: 'center', padding: '14px 0' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--t-text-muted)', marginBottom: 12 }}>Say:</div>
        {supported ? (
          <button
            onClick={startRec}
            disabled={recording || revealed}
            aria-label="Record your voice"
            className={recording ? 'pickup-pulse' : ''}
            style={{
              width: 96, height: 96, borderRadius: '50%',
              background: recording ? 'var(--t-danger)' : revealed ? 'var(--t-border-card)' : 'var(--t-brand)',
              border: 'none', borderBottom: '5px solid var(--t-brand-dark)',
              color: '#fff', fontSize: 38,
              cursor: recording || revealed ? 'default' : 'pointer',
              touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
            }}
          >
            🎤
          </button>
        ) : (
          <button
            onClick={skip}
            disabled={revealed}
            className="pickup-press"
            style={{
              padding: '14px 20px', background: 'var(--t-border-card)',
              color: '#fff', border: 'none', borderBottom: '4px solid var(--t-text-muted)',
              borderRadius: 'var(--t-radius-md)', fontSize: 14, fontWeight: 800,
              cursor: revealed ? 'default' : 'pointer', fontFamily: 'inherit',
              maxWidth: 320,
            }}
          >
            此裝置不支援錄音 · Tap to skip
          </button>
        )}
        <div style={{ fontSize: 12, color: 'var(--t-text-muted)', marginTop: 10, fontWeight: 700 }}>
          {recording ? tq('q.recording') : supported && !revealed ? tq('q.tapMic') : ''}
        </div>
      </div>
      {revealed && transcript && (
        <div style={{ marginTop: 12, fontSize: 14, color: 'var(--t-text)', padding: '10px 12px', background: 'var(--t-bg)', borderLeft: '3px solid var(--t-border-card)', borderRadius: '0 8px 8px 0' }}>
          <div>{tq('q.heard')}: <strong>{transcript}</strong></div>
          <div style={{ marginTop: 4, color: matched ? 'var(--t-success)' : 'var(--t-danger)', fontWeight: 800 }}>
            {matched ? `✓ ${tq('q.greatShort')}` : `× ${tq('q.tryAgainShort')}`}
          </div>
        </div>
      )}
      {revealed && <Explanation text={q.explanationZh ?? ''} />}
    </div>
  );
};

// ─── registry ───────────────────────────────────────────────────────────────
export const RENDERERS: Record<string, React.FC<RendererProps>> = {
  'narration': NarrationRenderer,
  'listen-tf': ListenTfRenderer,
  'listen-tf-zh': ListenTfRenderer,
  'listen-mc': ListenMcRenderer,
  // v2.0.B.cron 理解選擇 merge: 三個 type 全導向 ComprehensionRenderer,
  // 聽/讀由全域開關決定 (comprehensionMode.ts)。
  'comprehension': ComprehensionRenderer,
  'listen-comprehension': ComprehensionRenderer,
  'read-comprehension': ComprehensionRenderer,
  // v2.0.B.232: listen-emoji 從 ListenMcRenderer 改自己的 big-emoji renderer
  'listen-emoji': ListenEmojiRenderer,
  'read-mc-with-audio': ListenMcRenderer,
  'type-what-you-hear': TypeWhatYouHearRenderer,
  'type-translate': TypeTranslateRenderer, // v2.0.B.434 外文打字 + 近似判斷
  'tap-tiles': TapTilesRenderer,
  'tap-pairs': TapPairsRenderer,
  'phrase-pairs': TapPairsRenderer, // v2.0.B.321: 片語配對復用 tap-pairs UI
  'listen-pairs': ListenPairsRenderer, // v2.0.B.cron: 聽力選中文配對 (波形 ↔ 中文)
  'emoji-pick': EmojiPickRenderer,
  // v2.0.B.360: grammar-mc 改用專屬 renderer (原文句子恆可見 + 📘文法 標籤).
  'grammar-mc': GrammarMcRenderer,
  // v2.0.B.388: 填空滑選 — 候選字直列選入空格
  'scroll-pick': ScrollPickRenderer,
  // v2.0.B.232 new types (TODO content expansion)
  'picture-mc': PictureMcRenderer,
  'read-and-tap': ReadAndTapRenderer,
  'drag-blank': DragBlankRenderer,
  'speak-back': SpeakBackRenderer,
  // v2.0.B.237: blind listen + 自由排列 (A2 上限聽力題)
  'listen-build': ListenBuildRenderer,
};

// Fallback for unknown types
export const FallbackRenderer: React.FC<RendererProps> = ({ q, onAdvance }) => {
  useEffect(() => {
    const t = window.setTimeout(() => onAdvance(q.sentence), 1500);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);
  return <div style={{ padding: 20, textAlign: 'center', color: 'var(--t-text-muted)' }}>{tq('q.unknownType')}: {q.type}</div>;
};
