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
import { speak } from '../audio/tts';
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
  // v2.0.B.198: 標記誰說的 / 背景介紹。enum mochi | grandma | hana | narrator
  speaker?: string;
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
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  return (
    <div>
      <SpeakerBadge speaker={q.speaker} />
      <div className="pickup-lesson-words" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 12px', background: '#fff7e8', border: '2px solid #e7a44a', borderRadius: 14 }}>
        <img src="/mascots/calico-anchor.webp" width={44} height={44} alt="" style={{ borderRadius: '50%' }} />
        <div style={{ flex: 1, position: 'relative' }}>
          <SpeakerBtn onClick={() => speak(text)} />
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
          <SpeakerBtn onClick={() => speak(en)} size={48} />
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
        <SpeakerBtn onClick={() => speak(en)} size={36} />
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
        <SpeakerBtn onClick={() => speak(en)} size={44} />
        <span dangerouslySetInnerHTML={{ __html: revealed ? wrapWords(en) : blanks(en) }} style={{ flex: 1, fontSize: 15, fontWeight: 700, color: revealed ? '#3c2a1c' : '#8b6f4a', letterSpacing: revealed ? 0 : '0.1em', lineHeight: 1.8 }} />
      </div>
      {qPrompt && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 14 }}>
          <SpeakerBtn onClick={() => speak(qPrompt)} size={36} />
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
        <SpeakerBtn onClick={() => speak(en)} size={48} />
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
        <SpeakerBtn onClick={() => speak(en)} size={44} />
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
  const pairs = q.pairsEn ?? [];
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
    return <div style={{ padding: 20, color: '#8b6f4a', textAlign: 'center' }}>(本題型沒有 pairsEn data)</div>;
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

// ─── registry ───────────────────────────────────────────────────────────────
export const RENDERERS: Record<string, React.FC<RendererProps>> = {
  'narration': NarrationRenderer,
  'listen-tf': ListenTfRenderer,
  'listen-tf-zh': ListenTfRenderer,
  'listen-mc': ListenMcRenderer,
  'listen-comprehension': ListenMcRenderer,
  'listen-emoji': ListenMcRenderer,
  'read-mc-with-audio': ListenMcRenderer,
  'type-what-you-hear': TypeWhatYouHearRenderer,
  'tap-tiles': TapTilesRenderer,
  'tap-pairs': TapPairsRenderer,
  'emoji-pick': EmojiPickRenderer,
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
