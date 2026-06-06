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
import { addXp } from '../../data/xp';
import { addCoins } from '../../data/coins';
import { updateStreak, type StreakUpdateResult } from '../../data/streak';
import { unlockCardsForLesson, type CardId } from '../../data/cards';
import { track, EVENT } from '../../analytics/posthog';
import { RENDERERS, FallbackRenderer, wrapWords, type RawQuestion } from '../renderers';
import { getLessonHook } from '../../data/lessonHooks';

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
        {/* v2.0.B.187 P1: close ✕ tap area 22 → 44px HIG */}
        <button onClick={() => navigate('/')} aria-label="Close" style={{ background: 'transparent', border: 'none', fontSize: 24, color: '#8b6f4a', cursor: 'pointer', width: 44, height: 44, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>✕</button>
        {/* v2.0.B.187 P2-C: q-counter 11 → 14px senior 老花可讀 */}
        <span style={{ fontSize: 14, fontWeight: 800, color: '#7a5e25', background: '#fef3c7', padding: '6px 14px', borderRadius: 999 }}>
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
      {/* v2.0.B.187 P1-A: speaker tap 22 → 44px HIG (內含 20px img + 12px halo padding) */}
      <button onClick={replay} aria-label="Replay" style={{ flex: '0 0 auto', width: 44, height: 44, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>
        <img src="/mascots/icon-speaker.webp" width={22} height={22} alt="" style={{ opacity: 0.7 }} />
      </button>
      <span ref={ref} style={{ flex: '1 1 auto' }} dangerouslySetInnerHTML={{ __html: wrapWords(text) }} />
    </div>
  );
}

function CompletePanel({ lesson, log, elapsedMs, onBack }: {
  lesson: Lesson; log: Array<{ q: RawQuestion; userIdx: number; isCorrect: boolean }>; elapsedMs: number; onBack: () => void;
}) {
  // v2.0.B.192 (UI/UX P1 #35 + cron P0 latent): wire addXp + addCoins on
  // lesson complete. React 從 v2.0.A onwards 沒呼叫過 addXp/addCoins,
  // 導致 HUD readXp 永遠 0。連 audit P1 #35 寫的「公式不一致」其實是
  // 因為根本沒寫入。修法:correct×10 XP + correct×3 Coins,formula
  // consistent across CompletePanel display + persisted state。
  const correct = log.filter(a => a.isCorrect).length;
  const total = log.length;
  const xp = correct * 10;
  const coinDelta = correct * 3;
  const accuracy = total > 0 ? Math.round(correct / total * 100) : 100;

  // v2.0.B.230 (was B.221, mis-landed in dead LessonScene.ts): hook framework
  // metadata for inquiry microcopy + PostHog tag. Per docs/research/chapter-
  // ending-hook-design.md framework B1-B6.
  const hook = getLessonHook(lesson.id);

  // v2.0.B.232 招 1 streak + freeze: capture updateStreak() result so the
  // panel can render Mochi-saved-your-streak microcopy (warm not punishing).
  const [streakResult, setStreakResult] = useState<StreakUpdateResult | null>(null);
  // v2.0.B.232 招 2 collectible cards: capture cards newly unlocked by
  // completing this lesson so the panel can show "你解鎖了 X 張新卡片".
  const [newCards, setNewCards] = useState<CardId[]>([]);

  useEffect(() => {
    try { markLessonCompleted(lesson.chapter, lesson.id); } catch {}
    try { addXp(xp); } catch {}
    try { addCoins(coinDelta); } catch {}
    try { setStreakResult(updateStreak()); } catch {}
    try { setNewCards(unlockCardsForLesson(lesson.id)); } catch {}
    try {
      track(EVENT.LESSON_COMPLETE, {
        lesson_id: lesson.id,
        chapter: lesson.chapter,
        question_count: total,
        correct_count: correct,
        accuracy,
        xp_earned: xp,
        elapsed_ms: elapsedMs,
        review_opened: false,
        // B.230 hook framework A/B analytics
        hook_type: hook?.type ?? 'none',
        has_inquiry: hook != null,
      });
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      {/* v2.0.B.232 招 1: streak / freeze 結果 banner.
          - 累積 / 新增 → 🔥 N 天
          - 漏一天但用 freeze 保住 → 🧊 Mochi 幫你保住 streak
          - 漏一天且沒 freeze → 「Mochi 等你回來,我們再走一次」(不打擊式 framing) */}
      {streakResult && (
        <StreakBanner result={streakResult} />
      )}
      {/* v2.0.B.232 招 2: 新解鎖卡片提示 (溫和招呼,不打斷) */}
      {newCards.length > 0 && (
        <NewCardsBanner count={newCards.length} />
      )}
      {/* v2.0.B.230: hook inquiry microcopy above Continue button. Bell HIP
          Prompt 外顯 — drives Zeigarnik 效應點下一個 button 衝動. */}
      {hook?.inquiry && (
        <div style={{
          marginBottom: 14,
          padding: '10px 14px',
          background: 'transparent',
          border: '1.5px dashed #c8a878',
          borderRadius: 10,
          color: '#8b6f4a',
          fontSize: 14,
          fontWeight: 700,
          textAlign: 'center',
          letterSpacing: '0.3px',
          maxWidth: 420,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>想知道:{hook.inquiry}</div>
      )}
      {/* v2.0.B.187 P2-D: Continue 全寬,senior instinct 對齊 */}
      <button onClick={onBack} style={{
        padding: '16px 24px', background: '#7ac74a', color: '#fff', border: 'none',
        borderBottom: '4px solid #5d9a35', borderRadius: 14, fontSize: 17, fontWeight: 900,
        cursor: 'pointer', fontFamily: 'inherit', width: '100%', maxWidth: 420,
        WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
      }}>完成 · Continue →</button>
    </div>
  );
}

// v2.0.B.232 招 1: streak result banner. Three states, all warm framing.
function StreakBanner({ result }: { result: StreakUpdateResult }) {
  let icon: string;
  let zh: string;
  let en: string;
  let accent: string;
  if (result.freezeUsed) {
    icon = '🧊';
    zh = `Mochi 用 1 個 freeze 幫你保住 streak (還剩 ${result.freezesRemaining})`;
    en = `Mochi used 1 freeze to keep your streak (${result.freezesRemaining} left)`;
    accent = '#5a8cc4';
  } else if (result.resetOccurred) {
    icon = '🐾';
    zh = 'Mochi 等你回來 — 我們再走一次';
    en = `Welcome back. Let's start again.`;
    accent = '#c8a878';
  } else {
    icon = '🔥';
    zh = `連續學習 ${result.count} 天!`;
    en = `${result.count}-day streak!`;
    accent = '#ff7a3a';
  }
  return (
    <div className="pickup-fade-up" style={{
      marginBottom: 12,
      padding: '12px 14px',
      background: '#fff7e8',
      border: `2px solid ${accent}`,
      borderBottom: `4px solid ${accent}`,
      borderRadius: 12,
      display: 'flex', alignItems: 'center', gap: 12,
      maxWidth: 420, marginLeft: 'auto', marginRight: 'auto',
    }}>
      <span style={{ fontSize: 28 }}>{icon}</span>
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#3c2a1c', lineHeight: 1.3 }}>{zh}</div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#8b6f4a', marginTop: 2 }}>{en}</div>
      </div>
    </div>
  );
}

// v2.0.B.232 招 2: 新解鎖卡片 banner. 鼓勵點圖鑑 tab.
function NewCardsBanner({ count }: { count: number }) {
  return (
    <div className="pickup-fade-up" style={{
      marginBottom: 12,
      padding: '12px 14px',
      background: '#fef3c7',
      border: '2px solid #e7a44a',
      borderBottom: '4px solid #b07a2a',
      borderRadius: 12,
      display: 'flex', alignItems: 'center', gap: 12,
      maxWidth: 420, marginLeft: 'auto', marginRight: 'auto',
    }}>
      <span style={{ fontSize: 28 }}>📒</span>
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#3c2a1c', lineHeight: 1.3 }}>
          你解鎖了 {count} 張新卡片!
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#8b6f4a', marginTop: 2 }}>
          You unlocked {count} new card{count > 1 ? 's' : ''}. Check 圖鑑 tab.
        </div>
      </div>
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
