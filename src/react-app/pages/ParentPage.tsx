/**
 * 拾光 (Pickup) — Parent Corner / 給家長 v1
 *
 * Parent-facing stats page (ZH-primary). Shows:
 *   - 今晚 · Tonight: today's lessons, accuracy, time + latest key sentence
 *   - 本週 · This week: active days, lessons, accuracy, streak, bond stage
 *   - 鼓勵語: warm parent note (never guilt)
 *
 * Gate: simple arithmetic gate before revealing content (standard kids-app
 * grown-up gate — no persistence needed, lives in component state only).
 *
 * Route: /parent (registered in App.tsx)
 */
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../ui/components/Card';
import Button from '../../ui/components/Button';
import ProgressBar from '../../ui/components/ProgressBar';
import { t } from '../../ui/theme/index';
import { getTodayStats, getWeekStats, getRecentLessons } from '../../data/learnLog';
import { readStreak } from '../../data/streak';
import { getKeySentenceForLesson } from '../../data/keySentences';

// ─── ParentGate ─────────────────────────────────────────────────────────────

/** Random single-digit arithmetic challenge to confirm "grown-up". */
function makeChallenge(): { n1: number; n2: number; answer: number } {
  const n1 = Math.floor(Math.random() * 9) + 1;   // 1–9
  const n2 = Math.floor(Math.random() * 9) + 1;   // 1–9
  return { n1, n2, answer: n1 + n2 };
}

interface ParentGateProps {
  onPass: () => void;
}

function ParentGate({ onPass }: ParentGateProps) {
  const [challenge] = useState(makeChallenge);
  const [input, setInput] = useState('');
  const [wrong, setWrong] = useState(false);

  const confirm = useCallback(() => {
    if (Number(input) === challenge.answer) {
      onPass();
    } else {
      setWrong(true);
      setInput('');
    }
  }, [input, challenge.answer, onPass]);

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
      background: t.color.bg,
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }} aria-hidden="true">👨‍👩‍👧</div>
      <h1 style={{ fontSize: 20, fontWeight: 900, color: t.color.text, marginBottom: 8, textAlign: 'center' }}>
        給家長 · Parent Corner
      </h1>
      <p style={{ fontSize: 14, color: t.color.textMuted, marginBottom: 24, textAlign: 'center', lineHeight: 1.6 }}>
        為了確認你是大人<br />
        請回答這道算術題：
      </p>

      <Card variant="raised" style={{ width: '100%', maxWidth: 320, padding: '24px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: t.color.text, marginBottom: 20, letterSpacing: 2 }}>
          {challenge.n1} + {challenge.n2} = ?
        </div>
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={input}
          onChange={e => { setInput(e.target.value); setWrong(false); }}
          onKeyDown={e => { if (e.key === 'Enter') confirm(); }}
          placeholder="輸入答案"
          aria-label={`${challenge.n1} 加 ${challenge.n2} 等於？`}
          style={{
            width: '100%',
            padding: '12px 14px',
            fontSize: 20,
            fontWeight: 700,
            textAlign: 'center',
            border: `2px solid ${wrong ? t.color.danger : t.color.borderCard}`,
            borderRadius: 10,
            color: t.color.text,
            background: t.color.bg,
            fontFamily: 'inherit',
            marginBottom: 12,
            boxSizing: 'border-box',
          }}
        />
        {wrong && (
          <p style={{ fontSize: 13, color: t.color.danger, marginBottom: 10, fontWeight: 700 }}>
            再想想看 · Try again
          </p>
        )}
        <Button variant="primary" size="lg" full onClick={confirm}>
          確認 · Confirm
        </Button>
      </Card>
    </div>
  );
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function fmtMs(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min === 0) return `${sec}s`;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

function accuracyPct(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/** Warm non-guilt parent encouragement line. */
function encouragement(weekLessons: number, weekAccuracy: number): string {
  if (weekLessons === 0) return '每晚一個小故事就很好 🌙';
  if (weekAccuracy >= 90) return '孩子這週很投入，答對率超高 🌱';
  if (weekLessons >= 5) return '孩子這週每天都有進來，很棒 🐱';
  if (weekLessons >= 3) return '孩子這週有三天練習，繼續加油 🌟';
  return '每晚一個小故事就很好 🌙';
}

// ─── stat tile ───────────────────────────────────────────────────────────────

function StatTile({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{
      flex: '1 1 0',
      minWidth: 0,
      background: t.color.bg,
      border: `1.5px solid ${t.color.borderSoft}`,
      borderRadius: 10,
      padding: '10px 8px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 11, color: t.color.textMuted, fontWeight: 700, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 900, color: t.color.brandDark, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: t.color.textMuted, marginTop: 3, fontWeight: 600 }}>{sub}</div>}
    </div>
  );
}

// ─── ParentContent ────────────────────────────────────────────────────────────

function ParentContent() {
  const navigate = useNavigate();
  const todayStats = getTodayStats();
  const weekStats = getWeekStats();
  const streak = readStreak();

  // Most recent lesson for key sentence
  const recent = getRecentLessons(1);
  const lastLesson = recent[0] ?? null;
  const keySentence = lastLesson
    ? getKeySentenceForLesson(lastLesson.chapter, lastLesson.lessonId)
    : null;

  const todayAcc = accuracyPct(todayStats.correct, todayStats.total);
  const weekAcc = accuracyPct(weekStats.correct, weekStats.total);
  const weekEncouragement = encouragement(weekStats.lessons, weekAcc);
  const hasAnyData = weekStats.lessons > 0;

  return (
    <div style={{ padding: '16px 14px 32px', maxWidth: 480, margin: '0 auto' }}>
      {/* Back button */}
      <div style={{ marginBottom: 16 }}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
          ← 回到 Mochi
        </Button>
      </div>

      <h1 style={{ fontSize: 22, fontWeight: 900, color: t.color.text, margin: '0 0 4px' }}>
        給家長 · Parent Corner
      </h1>
      <p style={{ fontSize: 13, color: t.color.textMuted, margin: '0 0 20px', lineHeight: 1.5 }}>
        孩子的學習紀錄 · Your child's learning history
      </p>

      {/* Empty state */}
      {!hasAnyData && (
        <Card variant="flat" style={{ padding: '28px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }} aria-hidden="true">📖</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.color.text, marginBottom: 8 }}>
            孩子完成第一課後，這裡會出現學習紀錄
          </div>
          <div style={{ fontSize: 13, color: t.color.textMuted, lineHeight: 1.6 }}>
            After the first lesson, you'll see stats here.<br />
            每晚一個小故事就很好 🌙
          </div>
        </Card>
      )}

      {hasAnyData && (
        <>
          {/* 今晚 · Tonight */}
          <Card variant="raised" topStripe style={{ padding: '16px', marginBottom: 14 }}>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: t.color.text, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 1 }}>
              今晚 · Tonight
            </h2>
            {todayStats.lessons === 0 ? (
              <div style={{ fontSize: 14, color: t.color.textMuted, fontWeight: 600, padding: '4px 0' }}>
                今天還沒有練習紀錄 · No lessons yet today
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <StatTile label="課程" value={todayStats.lessons} sub="lessons" />
                  <StatTile label="答對率" value={`${todayAcc}%`} sub="accuracy" />
                  <StatTile label="時間" value={fmtMs(todayStats.ms)} sub="time" />
                </div>
                {keySentence && (
                  <div style={{
                    background: t.color.tintWarn,
                    border: `1.5px solid ${t.color.borderCard}`,
                    borderRadius: 10,
                    padding: '10px 12px',
                  }}>
                    <div style={{ fontSize: 11, color: t.color.textMuted, fontWeight: 800, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                      今晚學的金句
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.color.text, marginBottom: 2, fontStyle: 'italic' }}>
                      "{keySentence.en}"
                    </div>
                    <div style={{ fontSize: 12, color: t.color.textMuted, fontWeight: 600 }}>
                      {keySentence.zh}
                    </div>
                  </div>
                )}
              </>
            )}
          </Card>

          {/* 本週 · This Week */}
          <Card variant="raised" topStripe style={{ padding: '16px', marginBottom: 14 }}>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: t.color.text, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 1 }}>
              本週 · This Week
            </h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <StatTile label="練習天數" value={`${weekStats.activeDays}/7`} sub="active days" />
              <StatTile label="課程" value={weekStats.lessons} sub="lessons" />
              <StatTile label="答對率" value={`${weekAcc}%`} sub="accuracy" />
            </div>

            {/* Active days progress bar */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: t.color.textMuted, fontWeight: 700, marginBottom: 4 }}>
                本週練習天數 · Days practiced this week
              </div>
              <ProgressBar
                value={weekStats.activeDays}
                max={7}
                minPercent={2}
                aria-label={`本週練習 ${weekStats.activeDays} 天，共 7 天`}
              />
            </div>

            {/* Streak */}
            <div style={{
              background: t.color.bg,
              border: `1.5px solid ${t.color.borderSoft}`,
              borderRadius: 10,
              padding: '10px 8px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 11, color: t.color.textMuted, fontWeight: 700, marginBottom: 4 }}>連勝 Streak</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: t.color.brandDark }}>
                {streak} 🔥
              </div>
            </div>
          </Card>

          {/* 鼓勵語 */}
          <Card variant="flat" style={{ padding: '14px 16px', marginBottom: 14, borderStyle: 'dashed' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.color.text, lineHeight: 1.7 }}>
              {weekEncouragement}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

// ─── ParentPage (default export) ─────────────────────────────────────────────

export default function ParentPage() {
  const [passed, setPassed] = useState(false);

  if (!passed) {
    return <ParentGate onPass={() => setPassed(true)} />;
  }

  return <ParentContent />;
}
