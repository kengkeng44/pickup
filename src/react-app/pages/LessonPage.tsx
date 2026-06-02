/**
 * v2.0.B.167 Phase 3a — LessonPage refactored to renderer registry.
 *
 * Dispatches via RENDERERS[q.type] from src/react-app/renderers.tsx.
 * Wires lesson completion: markLessonCompleted + PostHog events +
 * navigate back to map.
 */
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { speak } from '../../audio/tts';
import { wireSentenceHints } from '../../ui/WordHint';
import { markLessonCompleted } from '../../store/runStore';
import { track, EVENT } from '../../analytics/posthog';
import { RENDERERS, FallbackRenderer, wrapWords, type RawQuestion } from '../renderers';

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
  const startedAt = useRef(Date.now());
  const answerLog = useRef<Array<{ q: RawQuestion; userIdx: number; isCorrect: boolean }>>([]);

  useEffect(() => {
    fetch(`/lessons-ch${chapter}.json`)
      .then(r => r.json())
      .then((arr: Lesson[]) => {
        const found = arr.find(l => l.id === lessonId);
        setLesson(found ?? null);
        setIdx(0);
        setHistory([]);
        answerLog.current = [];
        startedAt.current = Date.now();
        if (found) {
          try { track(EVENT.LESSON_START, { lesson_id: found.id, chapter: found.chapter, question_count: found.questions.length }); } catch {}
        }
      });
  }, [chapter, lessonId]);

  if (!lesson) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#8b6f4a' }}>載入中…</div>;
  }

  const done = idx >= lesson.questions.length;
  if (done) {
    return <CompletePanel
      lesson={lesson}
      log={answerLog.current}
      elapsedMs={Date.now() - startedAt.current}
      onBack={() => navigate('/')}
    />;
  }

  const q = lesson.questions[idx];
  const Renderer = RENDERERS[q.type] ?? FallbackRenderer;

  const onAdvance = (snapshot?: string) => {
    if (snapshot) setHistory(h => [...h, snapshot]);
    setIdx(i => i + 1);
  };

  const onAnswer = (userIdx: number, isCorrect: boolean) => {
    answerLog.current.push({ q, userIdx, isCorrect });
    try {
      track(EVENT.ANSWER_SUBMIT, {
        lesson_id: lesson.id,
        question_id: q.id,
        question_type: q.type,
        question_idx: idx,
        user_answer_idx: userIdx,
        is_correct: isCorrect,
        attempt_number: 1,
      });
    } catch {}
  };

  return (
    <div style={{ padding: '14px 14px 24px', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <button onClick={() => navigate('/')} aria-label="Close" style={{ background: 'transparent', border: 'none', fontSize: 22, color: '#8b6f4a', cursor: 'pointer' }}>✕</button>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#8b6f4a', background: '#fef3c7', padding: '4px 10px', borderRadius: 10 }}>
          q{idx + 1}/{lesson.questions.length}
        </span>
      </div>

      {history.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          {history.map((s, i) => <NarrativeLine key={i} text={s} />)}
        </div>
      )}

      <Renderer q={q} onAdvance={onAdvance} onAnswer={onAnswer} />
    </div>
  );
}

function NarrativeLine({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const replay = () => { try { speak(text); } catch {} };
  useEffect(() => {
    if (ref.current) { try { wireSentenceHints(ref.current); } catch {} }
  });
  return (
    <div className="pickup-lesson-words" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '4px 0', fontSize: 17, color: '#3c2a1c', lineHeight: 1.7, fontWeight: 600 }}>
      <button onClick={replay} aria-label="Replay" style={{ flex: '0 0 auto', width: 22, height: 22, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', marginTop: 3 }}>
        <img src="/mascots/icon-speaker.webp" width={20} height={20} alt="" style={{ opacity: 0.7 }} />
      </button>
      <span ref={ref} style={{ flex: '1 1 auto' }} dangerouslySetInnerHTML={{ __html: wrapWords(text) }} />
    </div>
  );
}

function CompletePanel({ lesson, log, elapsedMs, onBack }: {
  lesson: Lesson; log: Array<{ q: RawQuestion; userIdx: number; isCorrect: boolean }>; elapsedMs: number; onBack: () => void;
}) {
  useEffect(() => {
    try { markLessonCompleted(lesson.chapter, lesson.id); } catch {}
    const correct = log.filter(a => a.isCorrect).length;
    const total = log.length;
    try {
      track(EVENT.LESSON_COMPLETE, {
        lesson_id: lesson.id,
        chapter: lesson.chapter,
        question_count: total,
        correct_count: correct,
        accuracy: total > 0 ? Math.round(correct / total * 100) : 100,
        xp_earned: correct * 10,
        elapsed_ms: elapsedMs,
        review_opened: false,
      });
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const correct = log.filter(a => a.isCorrect).length;
  const total = log.length;
  const accuracy = total > 0 ? Math.round(correct / total * 100) : 100;
  const xp = correct * 10;
  const min = Math.floor(elapsedMs / 60000);
  const sec = Math.floor((elapsedMs % 60000) / 1000);
  const timeStr = min > 0 ? `${min}:${sec.toString().padStart(2, '0')}` : `${sec}s`;

  return (
    <div className="pickup-fade-up" style={{ padding: '30px 20px', textAlign: 'center', position: 'relative' }}>
      {/* Confetti shower */}
      {Array.from({ length: 12 }).map((_, i) => {
        const emojis = ['🎉', '⭐', '✨', '🌟', '🎊'];
        return (
          <span key={i} className="pickup-confetti" style={{
            left: `${5 + (i * 8)}%`,
            animationDelay: `${(i % 6) * 0.15}s`,
          }}>{emojis[i % emojis.length]}</span>
        );
      })}
      <div style={{ fontSize: 48 }}>🎉</div>
      <div style={{ fontSize: 22, fontWeight: 900, color: '#3c2a1c', marginTop: 12, marginBottom: 18 }}>Lesson complete!</div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <Stat label="XP" value={xp} color="#b07a2a" bg="#fef3c7" />
        <Stat label="ACCURACY" value={`${accuracy}%`} color="#5d9a35" bg="#eaf6d5" />
        <Stat label="TIME" value={timeStr} color="#8b6f4a" bg="#fef8ed" />
      </div>
      <button onClick={onBack} style={{
        padding: '14px 36px', background: '#7ac74a', color: '#fff', border: 'none',
        borderBottom: '4px solid #5d9a35', borderRadius: 14, fontSize: 16, fontWeight: 900,
        cursor: 'pointer', fontFamily: 'inherit',
      }}>完成 · Continue →</button>
    </div>
  );
}

function Stat({ label, value, color, bg }: { label: string; value: number | string; color: string; bg: string }) {
  return (
    <div style={{ flex: 1, padding: '12px 8px', background: bg, border: `2px solid ${color}`, borderBottom: `4px solid ${color}`, borderRadius: 14, opacity: 0.95 }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: '#8b6f4a', letterSpacing: 1, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 900, color }}>{value}</div>
    </div>
  );
}
