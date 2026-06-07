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

export interface RawQuestion {
  type: string;
  id: string;
  sentence?: string;
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

function useWordHint(ref: React.RefObject<HTMLElement | null>, deps: unknown[]) {
  useEffect(() => {
    if (ref.current) { try { wireSentenceHints(ref.current); } catch {} }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
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

const SpeakerBtn = ({ onClick, size = 22 }: { onClick: () => void; size?: number }) => (
  <button onClick={onClick} aria-label="Replay" style={{
    flex: '0 0 auto', width: size, height: size, padding: 0,
    background: 'transparent', border: 'none', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
  }}>
    <img src="/mascots/icon-speaker.webp" width={size - 2} height={size - 2} alt="" style={{ opacity: 0.7 }} />
  </button>
);

const OptionBtn = ({ label, labelZh, state, onClick, disabled }: {
  label: string; labelZh?: string; state: 'idle' | 'correct' | 'wrong' | 'shown';
  onClick: () => void; disabled?: boolean;
}) => {
  const bg = state === 'correct' ? '#eaf6d5' : state === 'wrong' ? '#fde0d2' : state === 'shown' ? '#fef8ed' : '#fff';
  const fg = state === 'correct' ? '#5d9a35' : state === 'wrong' ? '#a23829' : '#3c2a1c';
  const border = state === 'correct' ? '#7ac74a' : state === 'wrong' ? '#c84a3a' : '#c8a878';
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', padding: '14px 16px', marginBottom: 8,
      background: bg, color: fg,
      border: `2px solid ${border}`, borderBottom: '4px solid #b07a2a',
      borderRadius: 14, fontSize: 15, fontWeight: 800,
      cursor: disabled ? 'default' : 'pointer', fontFamily: 'inherit',
      textAlign: 'left',
    }}>
      <div>{label}{labelZh ? <span style={{ color: '#8b6f4a', fontWeight: 600, marginLeft: 8 }}>· {labelZh}</span> : ''}</div>
    </button>
  );
};

const Explanation = ({ text }: { text: string }) => text ? (
  <div style={{ marginTop: 12, fontSize: 14, color: '#5a4530', lineHeight: 1.6, padding: '10px 12px', background: '#fef8ed', borderLeft: '3px solid #c8a878', borderRadius: '0 8px 8px 0' }}>
    {text}
  </div>
) : null;

// v2.0.B.198: SpeakerBadge — 顯示「誰說的 / 是背景介紹」明示。
// mochi 1st-person | grandma 奶奶說的 | hana 柴犬 | narrator 背景旁白
const SPEAKER_META: Record<string, { emoji: string; label: string; bg: string; fg: string }> = {
  mochi:    { emoji: '🐱', label: 'Mochi',   bg: '#fed7aa', fg: '#9a3412' },
  grandma:  { emoji: '👵', label: 'Grandma', bg: '#fef3c7', fg: '#78350f' },
  hana:     { emoji: '🐕', label: 'Hana',    bg: '#f5e6d3', fg: '#6b4226' },
  narrator: { emoji: '📖', label: '背景',    bg: '#e5e7eb', fg: '#4b5563' },
};
const SpeakerBadge = ({ speaker }: { speaker?: string }) => {
  const meta = SPEAKER_META[speaker || 'narrator'] ?? SPEAKER_META.narrator;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 9px', borderRadius: 999,
      background: meta.bg, color: meta.fg,
      fontSize: 11, fontWeight: 800, letterSpacing: 0.3,
      marginBottom: 8,
    }}>
      <span style={{ fontSize: 13 }}>{meta.emoji}</span>
      <span>{meta.label}</span>
    </div>
  );
};

// ─── 1. narration ───────────────────────────────────────────────────────────
const NarrationRenderer = ({ q, onAdvance }: RendererProps) => {
  const text = q.sentence ?? '';
  const advancedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  useWordHint(ref, [q.id]);

  useEffect(() => {
    advancedRef.current = false;
    const advanceOnce = () => {
      if (advancedRef.current) return;
      advancedRef.current = true;
      onAdvance(text);
    };
    // v2.0.B.185 P0-B fix (Walkthrough audit): TTS 結束後多等 2000ms 再 advance,
    // 給 senior 讀者視覺確認窗口。fallback timer 同步 bump 2000ms (字數×600+4000)。
    const dwellAdvance = () => window.setTimeout(advanceOnce, 2000);
    try { speak(text, 'en-US', { onEnd: dwellAdvance }); } catch { dwellAdvance(); }
    const fallbackMs = Math.max(7000, text.split(/\s+/).length * 600 + 4000);
    const timer = window.setTimeout(advanceOnce, fallbackMs);
    // v2.0.B.253 P0 fix (code-health cron 2026-06-07T1236):
    // 用戶中途按 ✕ 退出時, dwellAdvance 仍 fire 在已死 scene → race condition.
    // cleanup 必須同時 stopSpeaking() 清掉 speechEndCallback, 不然 onEnd 還會排新 setTimeout.
    return () => {
      window.clearTimeout(timer);
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  return (
    <div>
      <SpeakerBadge speaker={q.speaker} />
      <div className="pickup-lesson-words" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 12px', background: '#fff7e8', border: '2px solid #e7a44a', borderRadius: 14 }}>
        <img src="/mascots/calico-anchor.webp" width={44} height={44} alt="" style={{ borderRadius: '50%' }} />
        <div style={{ flex: 1, position: 'relative' }}>
          <SpeakerBtn onClick={() => speak(text, 'en-US', { force: true })} />
          <span ref={ref as React.RefObject<HTMLSpanElement>} style={{ marginLeft: 6, fontSize: 16, fontWeight: 700, color: '#3c2a1c', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: wrapWords(text) }} />
        </div>
      </div>
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
    try {
      speak(en, 'en-US', { onEnd: () => {
        if (qEn) window.setTimeout(() => { try { speak(qEn); } catch {} }, 400);
      }});
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  useEffect(() => {
    if (!revealed) return;
    const correct = selected === correctIdx;
    try { (correct ? sfxCorrect : sfxWrong)(); } catch {}
    const t = window.setTimeout(() => onAdvance(en), correct ? 2500 : 4000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  const click = (i: number) => {
    if (revealed) return;
    sfxCardPress();
    setSelected(i);
    setRevealed(true);
    onAnswer(i, i === correctIdx);
  };

  if (!revealed) {
    return (
      <div ref={ref} className="pickup-lesson-words">
        <SpeakerBadge speaker={q.speaker} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 14 }}>
          <SpeakerBtn onClick={() => speak(en, 'en-US', { force: true })} size={48} />
          <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: '#8b6f4a', letterSpacing: '0.1em', lineHeight: 1.8 }}>{blanks(en)}</div>
        </div>
        <div style={{ fontSize: 14, color: '#8b6f4a', textAlign: 'center', marginBottom: 16, fontWeight: 700 }}>🎧 點喇叭聽完聲音再選答案</div>
        <div className="pickup-answer-sticky">
          {opts.map((o, i) => <OptionBtn key={i} label={o} state="idle" onClick={() => click(i)} />)}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="pickup-lesson-words" style={{ padding: '14px 6px 8px' }}>
      <SpeakerBadge speaker={q.speaker} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff7e8', borderRadius: 12, border: '1px solid #e0d0b8', marginBottom: 12 }}>
        <SpeakerBtn onClick={() => speak(en, 'en-US', { force: true })} size={36} />
        <span dangerouslySetInnerHTML={{ __html: wrapWords(en) }} style={{ flex: 1, fontSize: 15, fontWeight: 700, color: '#3c2a1c', lineHeight: 1.7 }} />
      </div>
      <Explanation text={q.explanationZh ?? ''} />
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

  useEffect(() => {
    if (!revealed) return;
    const correct = selected === correctIdx;
    try { (correct ? sfxCorrect : sfxWrong)(); } catch {}
    const t = window.setTimeout(() => onAdvance(en), 3000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  const click = (i: number) => {
    if (revealed) return;
    sfxCardPress();
    setSelected(i);
    setRevealed(true);
    onAnswer(i, i === correctIdx);
  };

  return (
    <div ref={ref} className="pickup-lesson-words">
      <SpeakerBadge speaker={q.speaker} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 14 }}>
        <SpeakerBtn onClick={() => speak(en, 'en-US', { force: true })} size={44} />
        <span dangerouslySetInnerHTML={{ __html: revealed ? wrapWords(en) : blanks(en) }} style={{ flex: 1, fontSize: 15, fontWeight: 700, color: revealed ? '#3c2a1c' : '#8b6f4a', letterSpacing: revealed ? 0 : '0.1em', lineHeight: 1.8 }} />
      </div>
      {qPrompt && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 14 }}>
          <SpeakerBtn onClick={() => speak(qPrompt, 'en-US', { force: true })} size={36} />
          <span dangerouslySetInnerHTML={{ __html: wrapWords(qPrompt) }} style={{ flex: 1, fontSize: 16, fontWeight: 800, color: '#3c2a1c', lineHeight: 1.5 }} />
        </div>
      )}
      {/* v2.0.B.186 P0-C fix: 4 options sticky-bottom 避免被 history 擠出視窗 */}
      <div className="pickup-answer-sticky">
        {opts.map((o, i) => {
          const isCorrect = i === correctIdx;
          const isSel = i === selected;
          const state: 'idle' | 'correct' | 'wrong' | 'shown' =
            !revealed ? 'idle' : isSel ? (isCorrect ? 'correct' : 'wrong') : isCorrect ? 'correct' : 'shown';
          return <OptionBtn key={i} label={o} labelZh={revealed ? optsZh[i] : undefined} state={state} onClick={() => click(i)} disabled={revealed} />;
        })}
      </div>
      {revealed && <Explanation text={q.explanationZh ?? ''} />}
    </div>
  );
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 14 }}>
        <SpeakerBtn onClick={() => speak(en, 'en-US', { force: true })} size={48} />
        <div style={{ flex: 1, fontSize: 13, color: '#8b6f4a', fontWeight: 600 }}>聽聲音, 打出你聽到的句子</div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={revealed}
        placeholder="Type what you hear…"
        rows={3}
        style={{
          width: '100%', padding: 10, fontSize: 15, fontFamily: 'inherit',
          border: '2px solid #c8a878', borderRadius: 10, background: '#fff', color: '#3c2a1c', marginBottom: 10, resize: 'none',
        }}
      />
      <button onClick={submit} disabled={revealed || !text.trim()} style={{
        width: '100%', padding: '12px 0', background: revealed || !text.trim() ? '#c8a878' : '#7ac74a',
        color: '#fff', border: 'none', borderBottom: '4px solid #5d9a35', borderRadius: 14, fontSize: 15, fontWeight: 900,
        cursor: revealed || !text.trim() ? 'default' : 'pointer', fontFamily: 'inherit',
      }}>送出 · Submit</button>
      {revealed && (
        <div style={{ marginTop: 12, fontSize: 14, color: '#5a4530', padding: '10px 12px', background: '#fef8ed', borderLeft: '3px solid #c8a878', borderRadius: '0 8px 8px 0' }}>
          正解: <strong>{en}</strong>
          {q.explanationZh && <div style={{ marginTop: 6 }}>{q.explanationZh}</div>}
        </div>
      )}
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 14 }}>
        <SpeakerBtn onClick={() => speak(en, 'en-US', { force: true })} size={44} />
        <div style={{ flex: 1, fontSize: 13, color: '#8b6f4a', fontWeight: 600 }}>
          聽聲音, 點字排出句子 · Tap words to fill the blanks
        </div>
      </div>
      {/* ordered slots (one per word) — tap to place */}
      <div style={{
        minHeight: 60, padding: '12px 10px',
        background: '#fff', border: '2px solid #c8a878', borderRadius: 12,
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
              background: filled ? '#eaf6d5' : isNext ? '#fef3c7' : '#f1ebe1',
              color: filled ? '#3c2a1c' : '#a89c80',
              border: `2px dashed ${isNext ? '#e7a44a' : '#c4b89c'}`,
              borderStyle: filled ? 'solid' : 'dashed',
              borderColor: filled ? '#7ac74a' : isNext ? '#e7a44a' : '#c4b89c',
              borderRadius: 8,
              fontSize: 15, fontWeight: 800, lineHeight: 1.2,
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
                background: isPlaced ? '#e8dec8' : isHint ? '#fff7e8' : '#fff',
                color: isPlaced ? '#c8a878' : '#3c2a1c',
                border: `2px solid ${isHint ? '#e7a44a' : '#c8a878'}`,
                borderBottom: `3px solid ${isHint ? '#b07a2a' : '#b07a2a'}`,
                borderRadius: 10,
                fontSize: 15, fontWeight: 700,
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
        <div className="pickup-fade-up" style={{ fontSize: 13, color: '#8b6f4a', textAlign: 'center', fontWeight: 700, marginTop: 6 }}>
          再試一次 · Try again
        </div>
      )}
      {!revealed && wrongCount >= 2 && hintTileIdx >= 0 && (
        <div className="pickup-fade-up" style={{ fontSize: 13, color: '#b07a2a', textAlign: 'center', fontWeight: 800, marginTop: 6 }}>
          🐱 Mochi 提示: 試試亮亮的那個 · Try the highlighted one
        </div>
      )}
      {revealed && <Explanation text={q.explanationZh ?? `正解: ${en}`} />}
    </div>
  );
};

// ─── 6. tap-pairs (simplified: match pairs) ─────────────────────────────────
const TapPairsRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  // v2.0.B.249: schema 用 pairs: [{left, right}] (Zod), 舊 renderer 讀 pairsEn
  // tuple → 27 章全炸 '本題型沒有 pairsEn data'. 改 defensive 讀, 兩種 shape 都吃.
  const pairs: Array<[string, string]> = (
    (q.pairs as Array<{ left: string; right: string } | [string, string]> | undefined) ??
    q.pairsEn ??
    []
  ).map((p) => (Array.isArray(p) ? p : [p.left, p.right]));
  const [matched, setMatched] = useState<number[]>([]);
  const [selected, setSelected] = useState<{ side: 'left' | 'right'; idx: number } | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Stable shuffled right-side once per question
  const rightShuffle = useRef<number[]>([]);
  useEffect(() => {
    rightShuffle.current = pairs.map((_, i) => i).sort(() => Math.random() - 0.5);
    setMatched([]); setSelected(null); setRevealed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  const tap = (side: 'left' | 'right', idx: number) => {
    if (revealed) return;
    if (matched.includes(idx) && side === 'left') return;
    sfxCardPress();
    if (!selected) { setSelected({ side, idx }); return; }
    if (selected.side === side) { setSelected({ side, idx }); return; }
    const leftIdx = selected.side === 'left' ? selected.idx : idx;
    const rightIdx = selected.side === 'right' ? selected.idx : idx;
    // right index in shuffled array maps back via rightShuffle
    const actualRight = rightShuffle.current[rightIdx];
    if (leftIdx === actualRight) {
      const next = [...matched, leftIdx];
      setMatched(next);
      setSelected(null);
      if (next.length === pairs.length) {
        try { sfxCorrect(); } catch {}
        setRevealed(true);
        onAnswer(0, true);
        window.setTimeout(() => onAdvance(), 2500);
      }
    } else {
      try { sfxWrong(); } catch {}
      setSelected(null);
    }
  };

  if (pairs.length === 0) {
    return <div style={{ padding: 20, color: '#8b6f4a', textAlign: 'center' }}>(本題沒有配對資料)</div>;
  }

  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#8b6f4a', textAlign: 'center', marginBottom: 12 }}>配對 · Match pairs</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {pairs.map((p, i) => (
          <button key={`L${i}`} onClick={() => tap('left', i)} disabled={matched.includes(i)} style={{
            padding: '12px 8px', background: matched.includes(i) ? '#eaf6d5' : selected?.side === 'left' && selected.idx === i ? '#fef3c7' : '#fff',
            color: '#3c2a1c', border: '2px solid #c8a878', borderBottom: '3px solid #b07a2a', borderRadius: 10,
            fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            opacity: matched.includes(i) ? 0.5 : 1,
          }}>{p[0]}</button>
        ))}
        {rightShuffle.current.map((origIdx, sIdx) => (
          <button key={`R${sIdx}`} onClick={() => tap('right', sIdx)} disabled={matched.includes(origIdx)} style={{
            padding: '12px 8px', background: matched.includes(origIdx) ? '#eaf6d5' : selected?.side === 'right' && selected.idx === sIdx ? '#fef3c7' : '#fff',
            color: '#3c2a1c', border: '2px solid #c8a878', borderBottom: '3px solid #b07a2a', borderRadius: 10,
            fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            opacity: matched.includes(origIdx) ? 0.5 : 1,
          }}>{pairs[origIdx]?.[1]}</button>
        ))}
      </div>
      {revealed && <div style={{ marginTop: 12, textAlign: 'center', fontSize: 14, color: '#5d9a35', fontWeight: 800 }}>✓ 全部配對完成</div>}
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
        <p style={{ fontSize: 16, fontWeight: 700, color: '#3c2a1c', lineHeight: 1.7, marginBottom: 24 }}>{afterText}</p>
        <button onClick={() => onAdvance(prompt)} style={{
          padding: '16px 24px', background: '#e7a44a', color: '#fff', border: 'none',
          borderBottom: '4px solid #b07a2a', borderRadius: 14, fontSize: 17, fontWeight: 900,
          cursor: 'pointer', fontFamily: 'inherit', width: '100%', maxWidth: 360,
          WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
        }}>聽 Mochi 的故事 →</button>
      </div>
    );
  }

  return (
    <div className="pickup-fade-up" style={{ textAlign: 'center', padding: '20px 8px' }}>
      <div style={{ textAlign: 'left' }}><SpeakerBadge speaker={q.speaker} /></div>
      <img src="/mascots/calico-anchor.webp" width={120} height={120} alt="Mochi" style={{ borderRadius: '50%', marginBottom: 16 }} />
      <h2 style={{ fontSize: 18, fontWeight: 900, color: '#3c2a1c', lineHeight: 1.5, margin: '0 0 20px' }}>{prompt}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, maxWidth: 360, margin: '0 auto' }}>
        {opts.map((o, i) => {
          const [emoji, ...labelParts] = o.split(' ');
          const label = labelParts.join(' ');
          const isShaking = shakeIdx === i;
          return (
            <button key={i} onClick={() => onTap(i)} className={isShaking ? 'pickup-wobble' : ''} aria-label={`${label} ${optsZh[i] || ''}`} style={{
              padding: '14px 8px', background: '#fff', border: '2px solid #e0d0b8',
              borderBottom: '4px solid #c8a878', borderRadius: 14,
              cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
              transition: 'transform 80ms ease',
            }}>
              <span style={{ fontSize: 38, lineHeight: 1 }}>{emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#3c2a1c' }}>{label}</span>
            </button>
          );
        })}
      </div>
      {wrongCount > 0 && (
        <p className="pickup-fade-up" key={wrongCount} style={{ marginTop: 16, fontSize: 13, color: '#8b6f4a', fontWeight: 700 }}>
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

  useEffect(() => {
    if (!revealed) return;
    const correct = selected === correctIdx;
    try { (correct ? sfxCorrect : sfxWrong)(); } catch {}
    const t = window.setTimeout(() => onAdvance(word), correct ? 2500 : 4000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '14px 16px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 18 }}>
        <SpeakerBtn onClick={() => speak(word, 'en-US', { force: true })} size={56} />
        <div style={{ fontSize: 14, fontWeight: 700, color: '#8b6f4a' }}>聽聲音 · 選對應的圖</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 360, margin: '0 auto' }}>
        {opts.map((o, i) => {
          const [emoji, ...labelParts] = o.split(' ');
          const label = labelParts.join(' ');
          const isShaking = shakeIdx === i;
          const isCorrect = i === correctIdx;
          const isSel = i === selected;
          const bg = !revealed
            ? '#fff'
            : isCorrect ? '#eaf6d5'
            : isSel ? '#fde0d2' : '#fff';
          const border = !revealed
            ? '#e0d0b8'
            : isCorrect ? '#7ac74a'
            : isSel ? '#c84a3a' : '#e0d0b8';
          return (
            <button
              key={i}
              onClick={() => click(i)}
              disabled={revealed}
              aria-label={`${label} ${optsZh[i] || ''}`}
              className={isShaking ? 'pickup-wobble' : ''}
              style={{
                padding: '20px 8px',
                background: bg,
                border: `2px solid ${border}`,
                borderBottom: `4px solid ${revealed && isCorrect ? '#5d9a35' : '#c8a878'}`,
                borderRadius: 14,
                cursor: revealed ? 'default' : 'pointer',
                fontFamily: 'inherit',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
                minHeight: 120,
              }}
            >
              <span style={{ fontSize: 52, lineHeight: 1 }}>{emoji}</span>
              {revealed && <span style={{ fontSize: 13, fontWeight: 800, color: '#3c2a1c' }}>{label}{optsZh[i] ? ` · ${optsZh[i]}` : ''}</span>}
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

  useEffect(() => {
    if (!revealed) return;
    const correct = selected === correctIdx;
    try { (correct ? sfxCorrect : sfxWrong)(); } catch {}
    const t = window.setTimeout(() => onAdvance(opts[correctIdx]), 3000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  const click = (i: number) => {
    if (revealed) return;
    sfxCardPress();
    setSelected(i);
    setRevealed(true);
    onAnswer(i, i === correctIdx);
  };

  return (
    <div className="pickup-lesson-words" style={{ padding: '4px 0' }}>
      <SpeakerBadge speaker={q.speaker} />
      {/* picture block */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px', background: '#fff7e8',
        border: '2px solid #e0d0b8', borderRadius: 16, marginBottom: 14,
        minHeight: 140,
      }}>
        {q.imageUrl ? (
          <img src={q.imageUrl} alt="" style={{ maxWidth: 200, maxHeight: 160, objectFit: 'contain' }} />
        ) : (
          <span style={{ fontSize: 96, lineHeight: 1 }}>{q.imageEmoji ?? '🖼️'}</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 12 }}>
        <SpeakerBtn onClick={() => speak(prompt, 'en-US', { force: true })} size={32} />
        <span style={{ flex: 1, fontSize: 14, fontWeight: 800, color: '#3c2a1c' }}>{prompt}</span>
      </div>
      <div className="pickup-answer-sticky">
        {opts.map((o, i) => {
          const isCorrect = i === correctIdx;
          const isSel = i === selected;
          const state: 'idle' | 'correct' | 'wrong' | 'shown' =
            !revealed ? 'idle' : isSel ? (isCorrect ? 'correct' : 'wrong') : isCorrect ? 'correct' : 'shown';
          return <OptionBtn key={i} label={o} labelZh={revealed ? optsZh[i] : undefined} state={state} onClick={() => click(i)} disabled={revealed} />;
        })}
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 12 }}>
        <SpeakerBtn onClick={() => speak(prompt, 'en-US', { force: true })} size={36} />
        <span style={{ flex: 1, fontSize: 16, fontWeight: 800, color: '#3c2a1c' }}>{prompt}</span>
      </div>
      {/* sentence with tappable words */}
      <div style={{
        padding: '16px 14px', background: '#fff',
        border: '2px solid #c8a878', borderRadius: 14, marginBottom: 10,
        display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
      }}>
        {words.map((w, i) => {
          const isTapped = tapped === i;
          const isCorrect = i === correctIdx;
          const bg = !revealed
            ? isTapped ? '#fde0d2' : '#fff'
            : isCorrect ? '#eaf6d5' : isTapped && !isCorrect ? '#fde0d2' : '#fff';
          const border = !revealed
            ? isTapped ? '#c84a3a' : '#c8a878'
            : isCorrect ? '#7ac74a' : isTapped && !isCorrect ? '#c84a3a' : '#c8a878';
          const color = revealed && isCorrect ? '#5d9a35' : '#3c2a1c';
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
                borderBottom: `3px solid ${revealed && isCorrect ? '#5d9a35' : '#b07a2a'}`,
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
        <div style={{ fontSize: 13, color: '#8b6f4a', textAlign: 'center', marginBottom: 8 }}>{zh}</div>
      )}
      {!revealed && wrongCount === 1 && (
        <div className="pickup-fade-up" style={{ fontSize: 13, color: '#8b6f4a', textAlign: 'center', fontWeight: 700, marginTop: 6 }}>
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
          background: filled ? '#eaf6d5' : i === nextSlot && !revealed ? '#fef3c7' : '#f1ebe1',
          color: filled ? '#3c2a1c' : '#a89c80',
          border: `2px ${filled ? 'solid #7ac74a' : i === nextSlot && !revealed ? 'dashed #e7a44a' : 'dashed #c4b89c'}`,
          borderRadius: 8,
          fontSize: 15, fontWeight: 800, lineHeight: 1.2,
          margin: '0 2px',
        }}>
          {filled ? tiles[tIdx!] : '___'}
        </span>
      );
    }
  });

  return (
    <div className="pickup-lesson-words">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 12 }}>
        <SpeakerBtn onClick={() => speak(q.sentence || template.replace(/__/g, '...'), 'en-US', { force: true })} size={36} />
        <div style={{ flex: 1, fontSize: 13, color: '#8b6f4a', fontWeight: 700 }}>
          點字填空 · Tap to fill the blank
        </div>
      </div>
      {/* sentence with slots */}
      <div style={{
        minHeight: 60, padding: '14px 12px',
        background: '#fff', border: '2px solid #c8a878', borderRadius: 12,
        marginBottom: 14, fontSize: 15, fontWeight: 700, color: '#3c2a1c',
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
                background: isPlaced ? '#e8dec8' : isHint ? '#fff7e8' : '#fff',
                color: isPlaced ? '#c8a878' : '#3c2a1c',
                border: `2px solid ${isHint ? '#e7a44a' : '#c8a878'}`,
                borderBottom: `3px solid ${isHint ? '#b07a2a' : '#b07a2a'}`,
                borderRadius: 10,
                fontSize: 15, fontWeight: 700,
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
        <div style={{ fontSize: 12, color: '#8b6f4a', textAlign: 'center', marginBottom: 6 }}>{q.sentenceZh}</div>
      )}
      {!revealed && wrongCount === 1 && (
        <div className="pickup-fade-up" style={{ fontSize: 13, color: '#8b6f4a', textAlign: 'center', fontWeight: 700, marginTop: 6 }}>
          再試一次 · Try again
        </div>
      )}
      {!revealed && wrongCount >= 2 && hintIdx >= 0 && (
        <div className="pickup-fade-up" style={{ fontSize: 13, color: '#b07a2a', textAlign: 'center', fontWeight: 800, marginTop: 6 }}>
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
        background: '#fff7e8', border: '1px solid #e0d0b8',
        borderRadius: 12, marginBottom: 12,
      }}>
        <SpeakerBtn onClick={() => speak(sentence, 'en-US', { force: true })} size={52} />
        <button
          onClick={() => { try { speak(sentence, 'en-US', { rate: 0.5, force: true }); } catch {} }}
          aria-label="Slow replay"
          style={{
            padding: '8px 12px',
            background: '#fef3c7',
            color: '#8b6f4a',
            border: '2px solid #e7a44a',
            borderBottom: '3px solid #b07a2a',
            borderRadius: 10,
            fontSize: 13, fontWeight: 800,
            cursor: 'pointer', fontFamily: 'inherit',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          🐢 慢速 · Slow
        </button>
        <div style={{ flex: 1, fontSize: 12, color: '#8b6f4a', fontWeight: 700, textAlign: 'right' }}>
          聽聲音排句子
        </div>
      </div>
      {/* ordered slots — fully blind, no sentence template shown */}
      <div style={{
        minHeight: 60, padding: '14px 12px',
        background: '#fff', border: '2px solid #c8a878', borderRadius: 12,
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
              background: filled ? '#eaf6d5' : isNext ? '#fef3c7' : '#f1ebe1',
              color: filled ? '#3c2a1c' : '#a89c80',
              border: `2px ${filled ? 'solid #7ac74a' : isNext ? 'dashed #e7a44a' : 'dashed #c4b89c'}`,
              borderRadius: 8,
              fontSize: 15, fontWeight: 800, lineHeight: 1.2,
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
                background: isPlaced ? '#e8dec8' : isHint ? '#fff7e8' : '#fff',
                color: isPlaced ? '#c8a878' : '#3c2a1c',
                border: `2px solid ${isHint ? '#e7a44a' : '#c8a878'}`,
                borderBottom: `3px solid ${isHint ? '#b07a2a' : '#b07a2a'}`,
                borderRadius: 10,
                fontSize: 15, fontWeight: 700,
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
        <div className="pickup-fade-up" style={{ fontSize: 13, color: '#8b6f4a', textAlign: 'center', fontWeight: 700, marginTop: 6 }}>
          再聽一次 · Listen again
        </div>
      )}
      {!revealed && wrongCount >= 2 && hintIdx >= 0 && (
        <div className="pickup-fade-up" style={{ fontSize: 13, color: '#b07a2a', textAlign: 'center', fontWeight: 800, marginTop: 6 }}>
          🐱 Mochi 提示: 試試亮亮的那個 · Try the highlighted one
        </div>
      )}
      {revealed && zh && (
        <div style={{ fontSize: 13, color: '#8b6f4a', textAlign: 'center', marginTop: 8 }}>{zh}</div>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 14 }}>
        <SpeakerBtn onClick={() => speak(en, 'en-US', { force: true })} size={44} />
        <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: '#3c2a1c', lineHeight: 1.6 }}>{en}</span>
      </div>
      {zh && (
        <div style={{ fontSize: 13, color: '#8b6f4a', textAlign: 'center', marginBottom: 10 }}>{zh}</div>
      )}
      <div style={{ textAlign: 'center', padding: '14px 0' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#8b6f4a', marginBottom: 12 }}>Say:</div>
        {supported ? (
          <button
            onClick={startRec}
            disabled={recording || revealed}
            aria-label="Record your voice"
            className={recording ? 'pickup-pulse' : ''}
            style={{
              width: 96, height: 96, borderRadius: '50%',
              background: recording ? '#c84a3a' : revealed ? '#c8a878' : '#e7a44a',
              border: 'none', borderBottom: '5px solid #b07a2a',
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
            style={{
              padding: '14px 20px', background: '#c8a878',
              color: '#fff', border: 'none', borderBottom: '4px solid #8b6f4a',
              borderRadius: 12, fontSize: 14, fontWeight: 800,
              cursor: revealed ? 'default' : 'pointer', fontFamily: 'inherit',
              maxWidth: 320,
            }}
          >
            此裝置不支援錄音 · Tap to skip
          </button>
        )}
        <div style={{ fontSize: 12, color: '#8b6f4a', marginTop: 10, fontWeight: 700 }}>
          {recording ? '錄音中… · Listening…' : supported && !revealed ? '點麥克風開始 · Tap mic to start' : ''}
        </div>
      </div>
      {revealed && transcript && (
        <div style={{ marginTop: 12, fontSize: 14, color: '#5a4530', padding: '10px 12px', background: '#fef8ed', borderLeft: '3px solid #c8a878', borderRadius: '0 8px 8px 0' }}>
          <div>聽到 · Heard: <strong>{transcript}</strong></div>
          <div style={{ marginTop: 4, color: matched ? '#5d9a35' : '#a23829', fontWeight: 800 }}>
            {matched ? '✓ 太棒了!' : '× 再練習一次'}
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
  'listen-comprehension': ListenMcRenderer,
  // v2.0.B.232: listen-emoji 從 ListenMcRenderer 改自己的 big-emoji renderer
  'listen-emoji': ListenEmojiRenderer,
  'read-mc-with-audio': ListenMcRenderer,
  'type-what-you-hear': TypeWhatYouHearRenderer,
  'tap-tiles': TapTilesRenderer,
  'tap-pairs': TapPairsRenderer,
  'emoji-pick': EmojiPickRenderer,
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
  return <div style={{ padding: 20, textAlign: 'center', color: '#8b6f4a' }}>未知題型: {q.type} (跳過中…)</div>;
};
