/**
 * v2.0.B.239 — NextStoryPicker (chapter-final "明晚聽 / 繼續聽" picker).
 *
 * Surfaces as a modal on LessonPage CompletePanel when the user has just
 * finished the last lesson of a chapter (isLastLessonOfChapter=true).
 *
 * Flow:
 *   1. Render 4 story cards (top recommendations filtered by user
 *      preferences + ability), first card flagged "⭐ 推薦".
 *   2. User taps a card → that card is selected (others dimmed).
 *   3. User taps "🌙 明晚聽" → queueTomorrow + addXp(+5) + scheduleNotif
 *      (cross-chapter-hook 21:00 next day) + Mochi toast + close.
 *      (Self-restraint reward: small XP for picking sleep over more screen.)
 *   4. User taps "☕ 繼續聽" → navigate to that chapter's first lesson.
 *      No XP — that's the "default greedy" path.
 *
 * iOS Safari: Notification.permission may be 'default' or 'denied' (no PWA
 * install). scheduleNotif() defensively no-ops when consent is missing —
 * we still queue the localStorage entry so the in-app banner works.
 *
 * No emoji in card titles per memory rule (Pickup language-learning surface).
 * Mochi chrome UI is allowed emoji per spec exception.
 */
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  recommendNextStories,
  type RankedRecommendation,
} from '../../data/storyRecommend';
import { defaultCandidatePool } from '../../data/storyTags';
import { readUserProfile, readUserPreferences } from '../../data/userProfile';
import { queueTomorrow } from '../../data/tomorrowQueue';
import { addXp } from '../../data/xp';
import { scheduleNotif } from '../../notifications';

// ── Chapter metadata (mirror MapPage CHAPTER_META + GrandmaRecommendCarousel)
const CHAPTER_EMOJI: Record<number, string> = {
  0: '🐾',
  1: '🐈',
  2: '🍑',
  3: '🦆',
  4: '🐢',
  5: '🐪',
  6: '🏚️',
  7: '🦢',
  8: '🏺',
  9: '🐷',
  10: '👠',
};

const CHAPTER_TITLE_ZH: Record<number, string> = {
  0: 'ABC 開始',
  1: '院子裡的第一個故事',
  2: '桃太郎',
  3: '醜小鴨',
  4: '龜兔賽跑',
  5: '駱駝為什麼有駝峰',
  6: 'Baba Yaga 雞腳屋',
  7: '六隻天鵝',
  8: '葉限',
  9: '三隻小豬',
  10: '灰姑娘',
};

const CHAPTER_TITLE_EN: Record<number, string> = {
  0: 'ABC Start',
  1: 'A Story in the Yard',
  2: 'Momotaro',
  3: 'The Ugly Duckling',
  4: 'Tortoise and Hare',
  5: 'How the Camel Got Its Hump',
  6: 'Baba Yaga',
  7: 'The Six Swans',
  8: 'Ye Xian',
  9: 'Three Little Pigs',
  10: 'Cinderella',
};

const CHAPTER_CULTURE_ZH: Record<number, string> = {
  0: '基礎',
  1: '日常',
  2: '日本',
  3: '北歐',
  4: '寓言',
  5: '中亞',
  6: '俄羅斯',
  7: '德國',
  8: '中華',
  9: '英國',
  10: '法國',
};

/**
 * Pick top-K recommendations from the engine result. Core canon comes first
 * (Ch2 桃太郎, Ch3 醜小鴨 per 共同故事悖論), then top elective. Dedupes by
 * chapter so a canon entry is not also shown as elective.
 *
 * Skips the chapter the user just finished (`excludeChapter`) so we don't
 * suggest "明晚聽 桃太郎" right after they finished 桃太郎.
 */
function pickTop4(
  recs: ReturnType<typeof recommendNextStories>,
  excludeChapter: number,
  limit: number = 4,
): RankedRecommendation[] {
  const out: RankedRecommendation[] = [];
  const seen = new Set<number>();
  const push = (r: RankedRecommendation) => {
    if (out.length >= limit) return;
    if (seen.has(r.chapter)) return;
    if (r.chapter === excludeChapter) return;
    seen.add(r.chapter);
    out.push(r);
  };
  for (const r of recs.core) push(r);
  for (const r of recs.elective) push(r);
  return out;
}

interface Props {
  /** Chapter the user just completed (excluded from recommendations). */
  completedChapter: number;
  /** Called when the modal closes (either path). Navigation handled inside. */
  onClose: () => void;
}

type Phase = 'pick' | 'toast';

/**
 * Resolve recommendation cards. Exposed for testing so we don't have to
 * mount the full React tree to verify ranking behaviour.
 */
export function resolveRecommendedChapters(
  excludeChapter: number,
  limit: number = 4,
): RankedRecommendation[] {
  const profile = readUserProfile();
  const prefs = readUserPreferences();
  const recs = recommendNextStories(profile, defaultCandidatePool(), prefs);
  return pickTop4(recs, excludeChapter, limit);
}

export default function NextStoryPicker({ completedChapter, onClose }: Props) {
  const navigate = useNavigate();
  const cards = useMemo(
    () => resolveRecommendedChapters(completedChapter, 4),
    [completedChapter],
  );
  // Pre-select the first card so the action buttons always have a target.
  const [selectedChapter, setSelectedChapter] = useState<number | null>(
    cards[0]?.chapter ?? null,
  );
  const [phase, setPhase] = useState<Phase>('pick');

  const handlePickTomorrow = useCallback(() => {
    if (selectedChapter == null) return;
    try { queueTomorrow(selectedChapter); } catch {}
    try { addXp(5); } catch {}
    try {
      const slot = new Date();
      slot.setDate(slot.getDate() + 1);
      slot.setHours(21, 0, 0, 0);
      // Reuse cross-chapter-hook NotifKind — copy framework already covers
      // tomorrow-evening "今晚的故事是 X" framing per chapter (copy.ts § Type 2).
      scheduleNotif('cross-chapter-hook', slot, { chapter: selectedChapter });
    } catch {}
    setPhase('toast');
    // Mochi toast displays for 1500ms, then dismiss + navigate home.
    window.setTimeout(() => {
      onClose();
      navigate('/');
    }, 1500);
  }, [selectedChapter, onClose, navigate]);

  const handlePickContinue = useCallback(() => {
    if (selectedChapter == null) return;
    onClose();
    navigate(`/map?ch=${selectedChapter}`);
  }, [selectedChapter, onClose, navigate]);

  if (cards.length === 0) {
    // Defensive fallback — no candidates means the user has shipped every
    // chapter. Close the modal so CompletePanel's default Continue takes over.
    return null;
  }

  if (phase === 'toast') {
    return (
      <div role="dialog" aria-modal="true" style={overlayStyle}>
        <div style={toastStyle}>
          <div style={{ fontSize: 44, lineHeight: 1, marginBottom: 8 }} aria-hidden="true">🐈💤</div>
          <div style={{ fontSize: 17, fontWeight: 900, color: 'var(--t-text)' }}>
            see you tomorrow
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#7a6850', marginTop: 4, fontStyle: 'italic' }}>
            明晚見 · Mochi 也想睡了
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="next-story-picker-title"
      style={overlayStyle}
    >
      <div style={cardContainerStyle}>
        {/* Header — Mochi/grandma voice */}
        <div style={headerBlock}>
          <div style={{ fontSize: 40, lineHeight: 1 }} aria-hidden="true">🐈</div>
          <div id="next-story-picker-title" style={titleStyle}>
            今晚故事說完了 — 明晚想聽什麼?
          </div>
          <div style={subtitleStyle}>
            Story ended — what should we hear tomorrow?
          </div>
        </div>

        {/* Story cards grid (2x2 on mobile, single row on wider) */}
        <div style={gridStyle}>
          {cards.map((rec, i) => {
            const isSelected = selectedChapter === rec.chapter;
            const dim = selectedChapter != null && !isSelected;
            const recommended = i === 0;
            return (
              <StoryCard
                key={rec.chapter}
                rec={rec}
                isSelected={isSelected}
                dimmed={dim}
                recommended={recommended}
                onTap={() => setSelectedChapter(rec.chapter)}
              />
            );
          })}
        </div>

        {/* Action buttons — 明晚聽 (left, olive) / 繼續聽 (right, amber) */}
        <div style={actionsRow}>
          <button
            type="button"
            onClick={handlePickTomorrow}
            disabled={selectedChapter == null}
            aria-label="Schedule for tomorrow night"
            style={{
              ...actionBtnBase,
              background: 'var(--t-success)',
              boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.18), 0 4px 0 var(--t-success-dark)',
              opacity: selectedChapter == null ? 0.5 : 1,
            }}
          >
            <span style={{ fontSize: 20, marginRight: 6 }} aria-hidden="true">🌙</span>
            <span style={actionLabelStyle}>
              <span style={actionLabelZh}>明晚聽</span>
              <span style={actionLabelEn}>Tomorrow · +5 XP</span>
            </span>
          </button>
          <button
            type="button"
            onClick={handlePickContinue}
            disabled={selectedChapter == null}
            aria-label="Continue listening now"
            style={{
              ...actionBtnBase,
              background: 'var(--t-brand)',
              boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.18), 0 4px 0 var(--t-brand-dark)',
              opacity: selectedChapter == null ? 0.5 : 1,
            }}
          >
            <span style={{ fontSize: 20, marginRight: 6 }} aria-hidden="true">☕</span>
            <span style={actionLabelStyle}>
              <span style={actionLabelZh}>繼續聽</span>
              <span style={actionLabelEn}>Continue</span>
            </span>
          </button>
        </div>

        {/* Soft framing — Mochi 也想睡了 */}
        <div style={hintStyle}>
          Mochi 也想睡了 · 不急,慢慢來
        </div>
      </div>
    </div>
  );
}

// ── Sub-component: per-story card ──────────────────────────────────────────

interface CardProps {
  rec: RankedRecommendation;
  isSelected: boolean;
  dimmed: boolean;
  recommended: boolean;
  onTap: () => void;
}

function StoryCard({ rec, isSelected, dimmed, recommended, onTap }: CardProps) {
  const emoji = CHAPTER_EMOJI[rec.chapter] ?? '📖';
  const titleZh = CHAPTER_TITLE_ZH[rec.chapter] ?? `第 ${rec.chapter} 章`;
  const titleEn = CHAPTER_TITLE_EN[rec.chapter] ?? `Chapter ${rec.chapter}`;
  const culture = CHAPTER_CULTURE_ZH[rec.chapter] ?? '故事';

  return (
    <button
      type="button"
      onClick={onTap}
      aria-pressed={isSelected}
      aria-label={`${titleEn} (${titleZh})${recommended ? ' recommended' : ''}`}
      style={{
        position: 'relative',
        border: isSelected ? '2px solid #d68a52' : '2px solid #e7e3d0',
        borderRadius: 14,
        background: isSelected ? 'var(--t-surface-alt)' : 'var(--t-bg)',
        padding: '12px 10px',
        textAlign: 'left',
        cursor: 'pointer',
        fontFamily: 'inherit',
        opacity: dimmed ? 0.45 : 1,
        transition: 'opacity 160ms ease, border-color 160ms ease, background 160ms ease',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minHeight: 110,
        boxShadow: isSelected
          ? 'inset 0 3px 0 rgba(255,255,255,0.5), 0 3px 0 rgba(60,42,28,0.22)'
          : 'inset 0 2px 0 rgba(255,255,255,0.4), 0 2px 0 rgba(60,42,28,0.10)',
      }}
    >
      {recommended && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -8,
            right: -6,
            background: 'var(--t-brand)',
            color: '#ffffff',
            fontSize: 10,
            fontWeight: 900,
            padding: '3px 8px',
            borderRadius: 999,
            boxShadow: '0 2px 0 rgba(60,42,28,0.20)',
            letterSpacing: 0.3,
          }}
        >
          ⭐ 推薦
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 28, lineHeight: 1 }} aria-hidden="true">{emoji}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 900, color: 'var(--t-text)', lineHeight: 1.2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{titleZh}</div>
          <div style={{
            fontSize: 10, fontWeight: 700, color: '#7a6850', fontStyle: 'italic', lineHeight: 1.2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{titleEn}</div>
        </div>
      </div>
      <span style={{
        alignSelf: 'flex-start',
        fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 999,
        background: '#fef3c7', color: '#7a5e25', letterSpacing: 0.3,
      }}>{culture}</span>
    </button>
  );
}

// ── Styles (inline, palette aligned with OnboardingPicker.tsx) ─────────────

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(60, 42, 28, 0.55)',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '16px',
  overflowY: 'auto',
};

const cardContainerStyle: React.CSSProperties = {
  background: 'var(--t-bg)',
  borderRadius: 18,
  padding: '20px 18px 18px',
  width: '100%',
  maxWidth: 440,
  boxShadow: '0 12px 32px rgba(60, 42, 28, 0.32)',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 16,
  marginBottom: 32,
};

const headerBlock: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
};

const titleStyle: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 900,
  color: 'var(--t-text)',
  textAlign: 'center',
  lineHeight: 1.3,
  marginTop: 4,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: '#7a6850',
  textAlign: 'center',
  fontStyle: 'italic',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 10,
};

const actionsRow: React.CSSProperties = {
  display: 'flex',
  gap: 10,
  marginTop: 4,
};

const actionBtnBase: React.CSSProperties = {
  flex: 1,
  border: 'none',
  borderRadius: 14,
  color: '#ffffff',
  fontFamily: 'inherit',
  fontSize: 14,
  fontWeight: 900,
  padding: '14px 12px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  minHeight: 56,
};

const actionLabelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  lineHeight: 1.15,
};

const actionLabelZh: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
};

const actionLabelEn: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  opacity: 0.92,
  fontStyle: 'italic',
};

const hintStyle: React.CSSProperties = {
  marginTop: 4,
  fontSize: 11,
  color: '#7d6a52',
  textAlign: 'center',
  fontWeight: 600,
  fontStyle: 'italic',
};

const toastStyle: React.CSSProperties = {
  background: 'var(--t-bg)',
  borderRadius: 18,
  padding: '32px 28px',
  textAlign: 'center',
  boxShadow: '0 12px 32px rgba(60, 42, 28, 0.32)',
  maxWidth: 320,
  marginTop: '30vh',
};
