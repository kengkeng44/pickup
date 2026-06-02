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
    <div className="pickup-lesson-words" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 12px', background: '#fff7e8', border: '2px solid #e7a44a', borderRadius: 14 }}>
      <img src="/mascots/calico-anchor.webp" width={44} height={44} alt="" style={{ borderRadius: '50%' }} />
      <div style={{ flex: 1, position: 'relative' }}>
        <SpeakerBtn onClick={() => speak(text)} />
        <span ref={ref as React.RefObject<HTMLSpanElement>} style={{ marginLeft: 6, fontSize: 16, fontWeight: 700, color: '#3c2a1c', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: wrapWords(text) }} />
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 14 }}>
          <SpeakerBtn onClick={() => speak(en)} size={48} />
          <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: '#8b6f4a', letterSpacing: '0.1em', lineHeight: 1.8 }}>{blanks(en)}</div>
        </div>
        <div style={{ fontSize: 13, color: '#8b6f4a', textAlign: 'center', marginBottom: 16, fontWeight: 600 }}>🎧 點喇叭聽完聲音再選答案</div>
        {opts.map((o, i) => <OptionBtn key={i} label={o} state="idle" onClick={() => click(i)} />)}
      </div>
    );
  }

  return (
    <div ref={ref} className="pickup-lesson-words" style={{ padding: '14px 6px 8px' }}>
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
      {opts.map((o, i) => {
        const isCorrect = i === correctIdx;
        const isSel = i === selected;
        const state: 'idle' | 'correct' | 'wrong' | 'shown' =
          !revealed ? 'idle' : isSel ? (isCorrect ? 'correct' : 'wrong') : isCorrect ? 'correct' : 'shown';
        return <OptionBtn key={i} label={o} labelZh={revealed ? optsZh[i] : undefined} state={state} onClick={() => click(i)} disabled={revealed} />;
      })}
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

// ─── 5. tap-tiles (simplified: 4 candidates pick correct order = sentence) ──
const TapTilesRenderer = ({ q, onAdvance, onAnswer }: RendererProps) => {
  const en = q.sentence ?? '';
  const tiles = q.tilesEn ?? en.split(/\s+/).filter(Boolean);
  const correctOrder = en.split(/\s+/).filter(Boolean);
  const [picked, setPicked] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setPicked([]); setRevealed(false);
    try { speak(en); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  const tap = (i: number) => {
    if (revealed) return;
    if (picked.includes(i)) return;
    sfxCardPress();
    setPicked([...picked, i]);
  };

  const submit = () => {
    if (revealed) return;
    const userSentence = picked.map(i => tiles[i]).join(' ');
    const correct = userSentence.toLowerCase() === correctOrder.join(' ').toLowerCase();
    try { (correct ? sfxCorrect : sfxWrong)(); } catch {}
    setRevealed(true);
    onAnswer(correct ? 0 : 1, correct);
    window.setTimeout(() => onAdvance(en), correct ? 3000 : 5000);
  };

  return (
    <div className="pickup-lesson-words">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 14 }}>
        <SpeakerBtn onClick={() => speak(en)} size={44} />
        <div style={{ flex: 1, fontSize: 13, color: '#8b6f4a', fontWeight: 600 }}>聽聲音, 點字排出句子</div>
      </div>
      {/* picked sentence */}
      <div style={{ minHeight: 60, padding: 10, background: '#fff', border: '2px solid #c8a878', borderRadius: 10, marginBottom: 10, fontSize: 15, fontWeight: 700, color: '#3c2a1c' }}>
        {picked.map(i => tiles[i]).join(' ') || <span style={{ color: '#c8a878' }}>選字排這裡…</span>}
      </div>
      {/* tile candidates */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {tiles.map((t, i) => (
          <button key={i} onClick={() => tap(i)} disabled={revealed || picked.includes(i)} style={{
            padding: '8px 14px', background: picked.includes(i) ? '#e8dec8' : '#fff',
            color: picked.includes(i) ? '#c8a878' : '#3c2a1c',
            border: '2px solid #c8a878', borderBottom: '3px solid #b07a2a',
            borderRadius: 10, fontSize: 14, fontWeight: 700,
            cursor: picked.includes(i) ? 'default' : 'pointer', fontFamily: 'inherit',
          }}>{t}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setPicked([])} disabled={revealed} style={{ flex: 1, padding: '10px 0', background: '#fef8ed', color: '#8b6f4a', border: '2px solid #c8a878', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>清除</button>
        <button onClick={submit} disabled={revealed || picked.length === 0} style={{ flex: 2, padding: '10px 0', background: revealed ? '#c8a878' : '#7ac74a', color: '#fff', border: 'none', borderBottom: '4px solid #5d9a35', borderRadius: 10, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit' }}>送出</button>
      </div>
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
