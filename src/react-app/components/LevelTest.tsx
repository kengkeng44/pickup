/**
 * v2.0.B.237 — LevelTest 5-question diagnostic for ability-adaptive entry.
 *
 * Surfaces on first app open (or via Profile > Re-test). Asks 5 super-simple
 * questions covering ABC + numbers + colors + animals + greetings, then
 * writes the inferred level to `localStorage['pickup.ability.level']` so
 * the recommendation engine knows whether to surface Ch0 ground floor or
 * jump straight to A2 stories.
 *
 * Design rules (per CLAUDE.md + B.237 spec):
 *   - 雙語 (中英) bilingual throughout — A2 兒童家長看得懂
 *   - 兒童 friendly: 「零基礎 ok!」「慢慢來」「貓咪相信你」, 不打擊
 *   - Skip button explicit: 「我是新手 · I am beginner」 → A0
 *   - 5 questions of type 'emoji-pick' (no audio dependency on first run)
 *   - Score 0-1 → A0, 2-3 → A1, 4 → A2, 5 → A2+
 *   - No npm dependencies, no PostHog wiring yet (P2)
 *
 * Caller wiring: render inside SplashView or MapPage when
 *   localStorage['pickup.ability.level'] is missing.
 */
import { useState, useCallback } from 'react';
import type { AbilityLevel } from '../../data/userProfile';

const ABILITY_STORAGE_KEY = 'pickup.ability.level';

interface Question {
  id: string;
  questionEn: string;
  questionZh: string;
  options: Array<{ emoji: string; en: string; zh: string }>;
  correctIndex: number;
}

// 5 diagnostic Qs — escalating difficulty from absolute beginner to A2+.
const QUESTIONS: Question[] = [
  {
    id: 'lvl-q1-abc',
    questionEn: 'Which one is "cat"?',
    questionZh: '哪一個是「貓」?',
    options: [
      { emoji: '🐱', en: 'cat', zh: '貓' },
      { emoji: '🐶', en: 'dog', zh: '狗' },
      { emoji: '🐦', en: 'bird', zh: '鳥' },
      { emoji: '🐟', en: 'fish', zh: '魚' },
    ],
    correctIndex: 0,
  },
  {
    id: 'lvl-q2-color',
    questionEn: 'Which color is red?',
    questionZh: '哪個顏色是紅色?',
    options: [
      { emoji: '🔵', en: 'blue', zh: '藍' },
      { emoji: '🔴', en: 'red', zh: '紅' },
      { emoji: '🟢', en: 'green', zh: '綠' },
      { emoji: '🟡', en: 'yellow', zh: '黃' },
    ],
    correctIndex: 1,
  },
  {
    id: 'lvl-q3-number',
    questionEn: 'How many apples? 🍎🍎🍎',
    questionZh: '有幾顆蘋果? 🍎🍎🍎',
    options: [
      { emoji: '1️⃣', en: 'one', zh: '一' },
      { emoji: '2️⃣', en: 'two', zh: '二' },
      { emoji: '3️⃣', en: 'three', zh: '三' },
      { emoji: '4️⃣', en: 'four', zh: '四' },
    ],
    correctIndex: 2,
  },
  {
    id: 'lvl-q4-sentence',
    questionEn: '"I see a cat." What do I see?',
    questionZh: '「I see a cat.」我看到什麼?',
    options: [
      { emoji: '🐱', en: 'a cat', zh: '一隻貓' },
      { emoji: '🐶', en: 'a dog', zh: '一隻狗' },
      { emoji: '🐦', en: 'a bird', zh: '一隻鳥' },
      { emoji: '🐟', en: 'a fish', zh: '一條魚' },
    ],
    correctIndex: 0,
  },
  {
    id: 'lvl-q5-feeling',
    questionEn: '"She felt lonely in the silent forest." How does she feel?',
    questionZh: '「She felt lonely in the silent forest.」她有什麼感覺?',
    options: [
      { emoji: '😀', en: 'happy', zh: '開心' },
      { emoji: '😢', en: 'lonely', zh: '孤單' },
      { emoji: '😡', en: 'angry', zh: '生氣' },
      { emoji: '😴', en: 'sleepy', zh: '想睡' },
    ],
    correctIndex: 1,
  },
];

/**
 * Map raw score (0..5) to CEFR ability tier.
 * Exported for unit tests + future tuning.
 */
export function scoreToAbility(correctCount: number): AbilityLevel {
  if (correctCount <= 1) return 'A0';
  if (correctCount <= 3) return 'A1';
  if (correctCount === 4) return 'A2';
  return 'A2+';
}

/**
 * Persist the inferred level so the recommender / chapter gating reads it.
 * Pure side-effect; defensive about missing localStorage.
 */
export function persistAbilityLevel(level: AbilityLevel): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(ABILITY_STORAGE_KEY, level);
    }
  } catch {
    // ignore — read path tolerates missing key (falls back to inference)
  }
}

interface LevelTestProps {
  onComplete: (level: AbilityLevel) => void;
  /** Optional override for test harness — defaults to QUESTIONS above. */
  questions?: Question[];
}

export default function LevelTest({ onComplete, questions = QUESTIONS }: LevelTestProps) {
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const current = questions[idx];
  const total = questions.length;

  const handlePick = useCallback((choice: number) => {
    if (picked !== null) return;
    setPicked(choice);
    if (choice === current.correctIndex) {
      setCorrect((c) => c + 1);
    }
    // Auto-advance after 700ms so user sees the highlight.
    setTimeout(() => {
      if (idx + 1 >= total) {
        setDone(true);
      } else {
        setIdx((i) => i + 1);
        setPicked(null);
      }
    }, 700);
  }, [picked, current, idx, total]);

  const handleFinish = useCallback(() => {
    const level = scoreToAbility(correct);
    persistAbilityLevel(level);
    onComplete(level);
  }, [correct, onComplete]);

  const handleSkipBeginner = useCallback(() => {
    persistAbilityLevel('A0');
    onComplete('A0');
  }, [onComplete]);

  // ─── Result screen ─────────────────────────────────────────────────────
  if (done) {
    const level = scoreToAbility(correct);
    const greeting = (() => {
      if (level === 'A0') {
        return {
          zh: '零基礎 ok! 我們從 ABC 開始,慢慢來',
          en: 'Beginner-friendly! Let us start at ABC together.',
        };
      }
      if (level === 'A1') {
        return {
          zh: '你已經會一些字了!從 Ch0 ground floor 暖身,再進童話',
          en: 'You know some words! Warm up at Ch0, then meet the fairy tales.',
        };
      }
      if (level === 'A2') {
        return {
          zh: '太棒了!桃太郎 + 醜小鴨 等你來聽',
          en: 'Great! Momotaro and the Ugly Duckling are ready for you.',
        };
      }
      return {
        zh: '好厲害!連 lonely 都聽得懂 — 來挑戰六隻天鵝',
        en: 'Brave! You caught "lonely" — try Six Swans for a stretch story.',
      };
    })();

    return (
      <div role="dialog" aria-labelledby="lvltest-result-title" style={containerStyle}>
        <div style={cardStyle}>
          <div id="lvltest-result-title" style={titleStyle}>
            {`程度: ${level} · Your level: ${level}`}
          </div>
          <div style={subtitleStyle}>
            {`${correct} / ${total} 答對 correct`}
          </div>
          <div style={bigEmojiStyle} aria-hidden="true">🐱</div>
          <div style={bilingualBlock}>
            <div style={zhLine}>{greeting.zh}</div>
            <div style={enLine}>{greeting.en}</div>
          </div>
          <button
            type="button"
            onClick={handleFinish}
            style={primaryBtnStyle}
            aria-label={`Continue at level ${level}`}
          >
            開始 · Start
          </button>
        </div>
      </div>
    );
  }

  // ─── Question screen ───────────────────────────────────────────────────
  return (
    <div role="dialog" aria-labelledby="lvltest-q-title" style={containerStyle}>
      <div style={cardStyle}>
        <div style={progressBarTrack}>
          <div
            style={{
              ...progressBarFill,
              width: `${((idx) / total) * 100}%`,
            }}
            aria-hidden="true"
          />
        </div>
        <div style={progressTextStyle}>
          {`Q${idx + 1} / ${total}`}
        </div>
        <div id="lvltest-q-title" style={titleStyle}>
          {current.questionEn}
        </div>
        <div style={subtitleStyle}>{current.questionZh}</div>
        <div style={optionsGridStyle}>
          {current.options.map((opt, i) => {
            const isPicked = picked === i;
            const isCorrect = current.correctIndex === i;
            // Color tier: idle → cream, picked correct → olive, picked wrong → terracotta
            let bg = 'var(--t-bg)';
            let textColor = 'var(--t-text)';
            if (picked !== null) {
              if (isPicked && isCorrect) {
                bg = 'var(--t-success)';
                textColor = '#ffffff';
              } else if (isPicked && !isCorrect) {
                bg = 'var(--t-danger)';
                textColor = '#ffffff';
              } else if (!isPicked && isCorrect) {
                bg = '#e7e3d0';
              }
            }
            return (
              <button
                key={opt.en}
                type="button"
                onClick={() => handlePick(i)}
                disabled={picked !== null}
                aria-label={`${opt.en} (${opt.zh})`}
                style={{
                  ...optionBtnStyle,
                  background: bg,
                  color: textColor,
                  cursor: picked !== null ? 'default' : 'pointer',
                }}
              >
                <div style={optionEmojiStyle} aria-hidden="true">{opt.emoji}</div>
                <div style={optionLabelStyle}>
                  <span style={optionEnStyle}>{opt.en}</span>
                  <span style={optionZhStyle}>{opt.zh}</span>
                </div>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handleSkipBeginner}
          style={skipBtnStyle}
          aria-label="I am a beginner - skip the test"
        >
          我是新手 · I am beginner
        </button>
      </div>
    </div>
  );
}

// ─── Inline styles (kept close so component is portable) ──────────────────

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(60, 42, 28, 0.55)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '16px',
};

const cardStyle: React.CSSProperties = {
  background: 'var(--t-bg)',
  borderRadius: 18,
  padding: '20px 18px 18px',
  width: '100%',
  maxWidth: 420,
  boxShadow: '0 12px 32px rgba(60, 42, 28, 0.32)',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
};

const titleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 900,
  color: 'var(--t-text)',
  textAlign: 'center',
  lineHeight: 1.3,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: '#5a4632',
  textAlign: 'center',
  fontWeight: 600,
};

const progressBarTrack: React.CSSProperties = {
  width: '100%',
  height: 6,
  background: '#e7e3d0',
  borderRadius: 4,
  overflow: 'hidden',
};

const progressBarFill: React.CSSProperties = {
  height: '100%',
  background: 'var(--t-brand)',
  transition: 'width 220ms ease-out',
};

const progressTextStyle: React.CSSProperties = {
  fontSize: 11,
  color: '#7d6a52',
  textAlign: 'right',
  fontWeight: 700,
};

const optionsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 10,
  marginTop: 4,
};

const optionBtnStyle: React.CSSProperties = {
  border: '2px solid #d68a52',
  borderRadius: 12,
  padding: '14px 8px',
  fontFamily: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 6,
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  transition: 'background 180ms ease-out',
};

const optionEmojiStyle: React.CSSProperties = {
  fontSize: 32,
  lineHeight: 1,
};

const optionLabelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  lineHeight: 1.1,
};

const optionEnStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
};

const optionZhStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  opacity: 0.85,
};

const skipBtnStyle: React.CSSProperties = {
  marginTop: 6,
  border: 'none',
  background: 'transparent',
  color: '#7d6a52',
  fontFamily: 'inherit',
  fontSize: 13,
  fontWeight: 700,
  textDecoration: 'underline',
  cursor: 'pointer',
  padding: '8px 4px',
  touchAction: 'manipulation',
};

const bigEmojiStyle: React.CSSProperties = {
  fontSize: 56,
  textAlign: 'center',
  lineHeight: 1,
};

const bilingualBlock: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  textAlign: 'center',
};

const zhLine: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: 'var(--t-text)',
};

const enLine: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: '#5a4632',
  fontStyle: 'italic',
};

const primaryBtnStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: 12,
  background: 'var(--t-brand)',
  color: '#ffffff',
  fontFamily: 'inherit',
  fontSize: 16,
  fontWeight: 900,
  padding: '14px 18px',
  cursor: 'pointer',
  marginTop: 8,
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.18), 0 4px 0 rgba(60,42,28,0.20)',
};
