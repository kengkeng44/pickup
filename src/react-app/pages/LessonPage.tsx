/**
 * v2.0.B.164 Phase 2 — React Lesson page (POC of Ch1 real data fetch).
 *
 * Phase 2 ships a minimal renderer that handles narration + listen-tf
 * (most common Ch1 types). Phase 3 will add 8-renderer registry for
 * listen-mc / listen-comprehension / tap-tiles / tap-pairs / etc.
 */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { speak } from '../../audio/tts';
import { preloadHints } from '../../ui/WordHint';
import { sfxCorrect, sfxWrong, sfxCardPress } from '../../audio/sfx';

interface RawQuestion {
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
}

interface Lesson {
  id: string;
  chapter: number;
  lessonInChapter: number;
  intro?: { zh: string; en?: string };
  questions: RawQuestion[];
}

export default function LessonPage() {
  const { chapter, lessonId } = useParams<{ chapter: string; lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [idx, setIdx] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    preloadHints().catch(() => {});
    fetch(`/lessons-ch${chapter}.json`)
      .then(r => r.json())
      .then((arr: Lesson[]) => {
        const found = arr.find(l => l.id === lessonId);
        setLesson(found ?? null);
      });
  }, [chapter, lessonId]);

  if (!lesson) return <div style={{ padding: 40, textAlign: 'center', color: '#8b6f4a' }}>載入中…</div>;
  if (idx >= lesson.questions.length) {
    return <CompletePanel onBack={() => navigate('/')} />;
  }

  const q = lesson.questions[idx];

  const advance = (sentence?: string) => {
    if (sentence) setHistory(h => [...h, sentence]);
    setRevealed(false);
    setSelectedIdx(null);
    setIdx(i => i + 1);
  };

  return (
    <div style={{ padding: '14px 14px 24px', minHeight: '100dvh' }}>
      {/* Top HUD */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <button onClick={() => navigate('/')} aria-label="Close" style={{ background: 'transparent', border: 'none', fontSize: 22, color: '#8b6f4a', cursor: 'pointer' }}>✕</button>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#8b6f4a', background: '#fef3c7', padding: '4px 10px', borderRadius: 10 }}>
          q{idx + 1}/{lesson.questions.length}
        </span>
      </div>

      {/* History narrative archive */}
      {history.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          {history.map((s, i) => <NarrativeLine key={i} text={s} />)}
        </div>
      )}

      {/* Current question dispatch */}
      {q.type === 'narration' && (
        <NarrationRenderer q={q} onAdvance={() => advance(q.sentence)} />
      )}
      {q.type === 'listen-tf' && (
        <ListenTfRenderer
          q={q}
          revealed={revealed}
          selectedIdx={selectedIdx}
          onAnswer={(i) => { setSelectedIdx(i); setRevealed(true); }}
          onAdvance={() => advance(q.sentence)}
        />
      )}
      {q.type !== 'narration' && q.type !== 'listen-tf' && (
        <GenericRenderer
          q={q}
          revealed={revealed}
          selectedIdx={selectedIdx}
          onAnswer={(i) => { setSelectedIdx(i); setRevealed(true); }}
          onAdvance={() => advance(q.sentence)}
        />
      )}
    </div>
  );
}

function NarrativeLine({ text }: { text: string }) {
  const replay = () => { try { speak(text); } catch {} };
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '4px 0', fontSize: 17, color: '#3c2a1c', lineHeight: 1.7, fontWeight: 600 }}>
      <button onClick={replay} aria-label="Replay" style={{ flex: '0 0 auto', width: 22, height: 22, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', marginTop: 3 }}>
        <img src="/mascots/icon-speaker.webp" width={20} height={20} alt="" style={{ opacity: 0.7 }} />
      </button>
      <span style={{ flex: '1 1 auto' }}>{text}</span>
    </div>
  );
}

function NarrationRenderer({ q, onAdvance }: { q: RawQuestion; onAdvance: () => void }) {
  const text = q.sentence ?? '';
  useEffect(() => {
    try {
      speak(text, 'en-US', { onEnd: onAdvance });
    } catch { onAdvance(); }
    const fallback = window.setTimeout(onAdvance, Math.max(5000, text.split(/\s+/).length * 600 + 2000));
    return () => window.clearTimeout(fallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 12px', background: '#fff7e8', border: '2px solid #e7a44a', borderRadius: 14 }}>
      <img src="/mascots/calico-anchor.webp" width={44} height={44} alt="" style={{ borderRadius: '50%' }} />
      <div style={{ flex: 1, fontSize: 16, fontWeight: 700, color: '#3c2a1c', lineHeight: 1.6 }}>{text}</div>
    </div>
  );
}

function ListenTfRenderer({ q, revealed, selectedIdx, onAnswer, onAdvance }: {
  q: RawQuestion; revealed: boolean; selectedIdx: number | null;
  onAnswer: (i: number) => void; onAdvance: () => void;
}) {
  const en = q.sentence ?? '';
  const qEn = q.questionEn ?? q.question ?? '';
  const opts = q.options ?? ['Yes', 'No'];
  const correctIdx = q.correctIndex ?? 0;

  useEffect(() => {
    if (revealed) return;
    try {
      speak(en, 'en-US', {
        onEnd: () => {
          if (qEn) window.setTimeout(() => { try { speak(qEn); } catch {} }, 400);
        }
      });
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  useEffect(() => {
    if (!revealed) return;
    const isCorrect = selectedIdx === correctIdx;
    try { (isCorrect ? sfxCorrect : sfxWrong)(); } catch {}
    const timer = window.setTimeout(onAdvance, isCorrect ? 2500 : 4000);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  const blankSentence = en.split(/\s+/).filter(Boolean).map(() => '____').join(' ');

  if (!revealed) {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 14 }}>
          <button onClick={() => speak(en)} aria-label="Replay" style={{ flex: '0 0 auto', width: 48, height: 48, padding: 0, background: '#fef8ed', border: '2px solid #e7a44a', borderBottom: '4px solid #b07a2a', borderRadius: '50%', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/mascots/icon-speaker.webp" width={32} height={32} alt="" />
          </button>
          <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: '#8b6f4a', letterSpacing: '0.1em', lineHeight: 1.8 }}>{blankSentence}</div>
        </div>
        <div style={{ fontSize: 13, color: '#8b6f4a', textAlign: 'center', marginBottom: 16, fontWeight: 600 }}>
          🎧 點喇叭聽完聲音再選答案
        </div>
        {opts.map((o, i) => (
          <button
            key={i}
            onClick={() => { sfxCardPress(); onAnswer(i); }}
            style={{
              width: '100%', padding: '14px 16px', marginBottom: 8,
              background: '#fff', color: '#3c2a1c',
              border: '2px solid #c8a878', borderBottom: '4px solid #b07a2a',
              borderRadius: 14, fontSize: 16, fontWeight: 800,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >{o}</button>
        ))}
      </>
    );
  }

  return (
    <div style={{ padding: '14px 6px 8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff7e8', borderRadius: 12, border: '1px solid #e0d0b8', marginBottom: 12 }}>
        <button onClick={() => speak(en)} aria-label="Replay" style={{ flex: '0 0 auto', width: 36, height: 36, background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <img src="/mascots/icon-speaker.webp" width={28} height={28} alt="" />
        </button>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: '#3c2a1c', lineHeight: 1.7 }}>{en}</div>
      </div>
      {q.explanationZh && (
        <div style={{ fontSize: 14, color: '#5a4530', lineHeight: 1.6, padding: '10px 12px', background: '#fef8ed', borderLeft: '3px solid #c8a878', borderRadius: '0 8px 8px 0' }}>
          {q.explanationZh}
        </div>
      )}
      <div style={{ textAlign: 'center', padding: '12px 6px', fontSize: 11, color: '#8b6f4a', opacity: 0.7, fontWeight: 600 }}>
        ⬇ {selectedIdx === correctIdx ? '2.5 秒後跳下一題' : '4 秒後跳下一題'}
      </div>
    </div>
  );
}

function GenericRenderer({ q, revealed, selectedIdx, onAnswer, onAdvance }: {
  q: RawQuestion; revealed: boolean; selectedIdx: number | null;
  onAnswer: (i: number) => void; onAdvance: () => void;
}) {
  const en = q.sentence ?? '';
  const prompt = q.question ?? q.questionEn ?? '';
  const opts = q.options ?? [];
  const correctIdx = q.correctIndex ?? 0;
  const optionsZh = q.optionsZh ?? [];

  useEffect(() => {
    if (revealed) return;
    try { speak(en); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);

  useEffect(() => {
    if (!revealed) return;
    const isCorrect = selectedIdx === correctIdx;
    try { (isCorrect ? sfxCorrect : sfxWrong)(); } catch {}
    const timer = window.setTimeout(onAdvance, 3000);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff7e8', border: '1px solid #e0d0b8', borderRadius: 12, marginBottom: 14 }}>
        <button onClick={() => speak(en)} aria-label="Replay" style={{ flex: '0 0 auto', width: 44, height: 44, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <img src="/mascots/icon-speaker.webp" width={32} height={32} alt="" />
        </button>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: revealed ? '#3c2a1c' : '#8b6f4a', lineHeight: 1.7 }}>
          {revealed ? en : en.split(/\s+/).map(() => '____').join(' ')}
        </div>
      </div>

      {prompt && (
        <div style={{ fontSize: 16, fontWeight: 800, color: '#3c2a1c', textAlign: 'center', marginBottom: 14, lineHeight: 1.5 }}>
          {prompt}
        </div>
      )}

      {opts.map((o, i) => {
        const isCorrect = i === correctIdx;
        const isSelected = i === selectedIdx;
        return (
          <button
            key={i}
            onClick={() => !revealed && (sfxCardPress(), onAnswer(i))}
            disabled={revealed}
            style={{
              width: '100%', padding: '14px 16px', marginBottom: 8,
              background: revealed && isSelected ? (isCorrect ? '#eaf6d5' : '#fde0d2') : '#fff',
              color: revealed && isSelected ? (isCorrect ? '#5d9a35' : '#a23829') : '#3c2a1c',
              border: `2px solid ${revealed && isSelected ? (isCorrect ? '#7ac74a' : '#c84a3a') : '#c8a878'}`,
              borderBottom: '4px solid #b07a2a',
              borderRadius: 14, fontSize: 15, fontWeight: 800,
              cursor: revealed ? 'default' : 'pointer', fontFamily: 'inherit',
              textAlign: 'left',
            }}
          >
            <div>{o}{revealed && optionsZh[i] ? ` · ${optionsZh[i]}` : ''}</div>
          </button>
        );
      })}

      {revealed && q.explanationZh && (
        <div style={{ marginTop: 12, fontSize: 14, color: '#5a4530', lineHeight: 1.6, padding: '10px 12px', background: '#fef8ed', borderLeft: '3px solid #c8a878', borderRadius: '0 8px 8px 0' }}>
          {q.explanationZh}
        </div>
      )}
    </>
  );
}

function CompletePanel({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <div style={{ fontSize: 48 }}>🎉</div>
      <div style={{ fontSize: 22, fontWeight: 900, color: '#3c2a1c', marginTop: 12 }}>Lesson complete!</div>
      <button
        onClick={onBack}
        style={{ marginTop: 24, padding: '14px 30px', background: '#7ac74a', color: '#fff', border: 'none', borderBottom: '4px solid #5d9a35', borderRadius: 14, fontSize: 16, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit' }}
      >
        完成 · Continue →
      </button>
    </div>
  );
}

