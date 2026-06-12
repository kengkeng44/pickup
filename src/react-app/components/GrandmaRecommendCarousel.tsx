/**
 * v2.0.B.235 — 今天奶奶的推薦 carousel (Phase 1 AI recommendation surface).
 *
 * Lives above the chapter grid on MapPage. Reads UserProfile from
 * src/data/userProfile.ts + ranks chapters via src/data/storyRecommend.ts,
 * then renders top 3 elective recommendations as horizontally-scrollable
 * cards. Tap → navigate('/map?ch=N').
 *
 * Cold-start (xp=0, no completed chapters): we hide the carousel — first
 * map view should be clean. Once any chapter is touched it shows up.
 * Tunable via `forceShow` prop for debug.
 *
 * Mascot voice: header reads "今天奶奶的推薦 · Grandma picks for you"
 * (warm framing, no streak threat, no urgency).
 */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  recommendNextStories,
  topRecommendations,
  type RankedRecommendation,
} from '../../data/storyRecommend';
import {
  defaultCandidatePool,
  STORY_TAGS,
  TAGS,
} from '../../data/storyTags';
import { readUserProfile } from '../../data/userProfile';

const CHAPTER_ACCENTS: Record<number, string> = {
  1: '#d68a52',
  2: 'var(--t-brand)',
  3: '#e7659c',
  4: '#6e7d5a',
  5: 'var(--t-brand)',
  6: '#6a7d8f',
  7: '#8a6ea8',
  8: '#6a7d8f',
};

const CHAPTER_EMOJI: Record<number, string> = {
  1: '🐈',
  2: '🍑',
  3: '🦆',
  4: '🐢',
  5: '🐪',
  6: '🏚️',
  7: '🦢',
  8: '🏺',
};

const CHAPTER_TITLE_ZH: Record<number, string> = {
  1: '院子裡的第一個故事',
  2: '桃太郎',
  3: '醜小鴨',
  4: '龜兔賽跑',
  5: '駱駝為什麼有駝峰',
  6: 'Baba Yaga 雞腳屋',
  7: '六隻天鵝',
  8: '葉限',
};

const CHAPTER_TITLE_EN: Record<number, string> = {
  1: 'A Story in the Yard',
  2: 'Momotaro',
  3: 'The Ugly Duckling',
  4: 'Tortoise and Hare',
  5: 'How the Camel Got Its Hump',
  6: 'Baba Yaga',
  7: 'The Six Swans',
  8: 'Ye Xian',
};

function darken(hex: string, amount = 0.32): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r * (1 - amount))}, ${Math.round(g * (1 - amount))}, ${Math.round(b * (1 - amount))})`;
}
function lighten(hex: string, amount = 0.20): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const m = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${m(r)}, ${m(g)}, ${m(b)})`;
}

interface RecCardProps {
  rec: RankedRecommendation;
  onTap: () => void;
}
function RecCard({ rec, onTap }: RecCardProps) {
  const accent = CHAPTER_ACCENTS[rec.chapter] ?? 'var(--t-brand)';
  const emoji = CHAPTER_EMOJI[rec.chapter] ?? '📖';
  const titleZh = CHAPTER_TITLE_ZH[rec.chapter] ?? STORY_TAGS[rec.chapter]?.story ?? '';
  const titleEn = CHAPTER_TITLE_EN[rec.chapter] ?? '';

  // Build a 2-tag chip strip from the chapter's tags (first 2 by axis order)
  const chapterTagIds = STORY_TAGS[rec.chapter]?.tags ?? [];
  const chips = chapterTagIds.slice(0, 2).map((id) => TAGS[id]?.zh ?? id);

  return (
    <button
      type="button"
      onClick={onTap}
      aria-label={`Recommended: ${titleEn} (${titleZh})`}
      style={{
        flex: '0 0 auto',
        width: 220,
        scrollSnapAlign: 'start',
        border: 'none',
        borderRadius: 14,
        background: accent,
        color: '#ffffff',
        padding: '12px 14px',
        textAlign: 'left',
        cursor: 'pointer',
        fontFamily: 'inherit',
        boxShadow: `inset 0 8px 0 ${lighten(accent, 0.20)}, 0 6px 0 ${darken(accent, 0.32)}`,
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        marginRight: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 28, lineHeight: 1 }} aria-hidden="true">{emoji}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 900, lineHeight: 1.15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {titleZh}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {titleEn}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 2, flexWrap: 'wrap' }}>
        {chips.map((c, i) => (
          <span key={i} style={{
            fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 999,
            background: 'rgba(255,255,255,0.22)', color: 'var(--t-surface)', letterSpacing: 0.3,
          }}>{c}</span>
        ))}
      </div>
      <div style={{ fontSize: 11, lineHeight: 1.35, marginTop: 4, opacity: 0.95 }}>
        {rec.reason.zh}
      </div>
      <div style={{ fontSize: 10, lineHeight: 1.3, opacity: 0.78, fontStyle: 'italic' }}>
        {rec.reason.en}
      </div>
    </button>
  );
}

interface Props {
  /** Show even on cold-start (debug). Default false. */
  forceShow?: boolean;
  /** Top-K cards. Default 3. */
  limit?: number;
}

/**
 * Carousel renders top-K elective recommendations. Hidden on cold start
 * unless `forceShow` (a brand new user doesn't need overload).
 */
export default function GrandmaRecommendCarousel({ forceShow = false, limit = 3 }: Props) {
  const navigate = useNavigate();
  const result = useMemo(() => {
    const profile = readUserProfile();
    return recommendNextStories(profile, defaultCandidatePool());
  }, []);

  const cards = topRecommendations(result, limit);
  // Cold-start detection: no contributions at all → hide unless forced.
  const isColdStart = cards.length === 0 || cards.every((c) =>
    (c.contributions.coldStart ?? 0) > 0 && c.contributions.tagOverlap === 0
  );
  if (!forceShow && isColdStart) return null;
  if (cards.length === 0) return null;

  return (
    <section
      aria-label="今天奶奶的推薦"
      style={{ padding: '14px 14px 4px' }}
    >
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8,
      }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: 'var(--t-text)' }}>
          今天奶奶的推薦
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#7a6850', fontStyle: 'italic' }}>
          Grandma picks for you
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: 6,
          marginRight: -14,
          paddingRight: 14,
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {cards.map((rec) => (
          <RecCard
            key={rec.chapter}
            rec={rec}
            onTap={() => navigate(`/map?ch=${rec.chapter}`)}
          />
        ))}
      </div>
    </section>
  );
}
