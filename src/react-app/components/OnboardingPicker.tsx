/**
 * v2.0.B.238 — OnboardingPicker (4-axis story-taste multi-select).
 *
 * Surfaces after LevelTest on first onboard (or via Profile > 重設口味).
 * Lets the user pick what KINDS of stories Mochi should pull from her
 * registry of 30. Saves to localStorage 'pickup.story.preferences' so the
 * recommender (GrandmaRecommendCarousel) can filter accordingly.
 *
 * Design rules (mirrors LevelTest.tsx):
 *   - 雙語 (中英) throughout — A2 兒童/家長都看得懂
 *   - Mochi voice header — '想知道你愛聽什麼故事 🐾'
 *   - Skip path explicit: '跳過 → 全部都喜歡' → ALL wildcard (empty axes)
 *   - 4 sections vertical stack; per-axis chip grid (tap to toggle)
 *   - No npm deps, no PostHog wiring yet
 *
 * Caller wiring example:
 *   {showOnboardingPicker && (
 *     <OnboardingPicker
 *       onComplete={(prefs) => { setOnboardingDone(); }}
 *     />
 *   )}
 */
import { useCallback, useState } from 'react';
import {
  ALL_PREFERENCES_DEFAULT,
  setUserPreferences,
  type UserPreferences,
} from '../../data/userProfile';
import type {
  Culture,
  Protagonist,
  Style,
  Theme,
} from '../../data/storyRegistry';

interface ChipOption<T extends string> {
  id: T;
  emoji: string;
  zh: string;
  en: string;
}

const CULTURE_OPTIONS: Array<ChipOption<Culture>> = [
  { id: 'china', emoji: '🏮', zh: '中華', en: 'China' },
  { id: 'japan', emoji: '🌸', zh: '日本', en: 'Japan' },
  { id: 'korea', emoji: '🇰🇷', zh: '韓國', en: 'Korea' },
  { id: 'india', emoji: '🐉', zh: '印度', en: 'India' },
  { id: 'europe', emoji: '🌹', zh: '歐美', en: 'Europe' },
  { id: 'global-folk', emoji: '🌍', zh: '全球民間', en: 'World folk' },
];

const STYLE_OPTIONS: Array<ChipOption<Style>> = [
  { id: 'fantasy', emoji: '🦄', zh: '玄幻', en: 'Fantasy' },
  { id: 'animal-fable', emoji: '🐾', zh: '動物寓言', en: 'Animal fable' },
  { id: 'dark-fairy-tale', emoji: '🌌', zh: '黑暗童話', en: 'Dark tale' },
  { id: 'warm', emoji: '💕', zh: '溫馨', en: 'Warm' },
  { id: 'adventure', emoji: '🗡️', zh: '冒險', en: 'Adventure' },
  { id: 'mystery', emoji: '🔍', zh: '推理', en: 'Mystery' },
];

const PROTAGONIST_OPTIONS: Array<ChipOption<Protagonist>> = [
  { id: 'animal', emoji: '🐱', zh: '動物', en: 'Animal' },
  { id: 'child', emoji: '👧', zh: '兒童', en: 'Child' },
  { id: 'elder', emoji: '👵', zh: '老人', en: 'Elder' },
  { id: 'mythical', emoji: '🧚', zh: '神話', en: 'Mythical' },
  { id: 'object', emoji: '🛏️', zh: '物件', en: 'Object' },
];

const THEME_OPTIONS: Array<ChipOption<Theme>> = [
  { id: 'friendship', emoji: '🤝', zh: '友情', en: 'Friendship' },
  { id: 'growth', emoji: '🌱', zh: '成長', en: 'Growth' },
  { id: 'wit', emoji: '🧠', zh: '智取', en: 'Wit' },
  { id: 'justice', emoji: '⚖️', zh: '公平', en: 'Justice' },
  { id: 'courage', emoji: '💪', zh: '勇氣', en: 'Courage' },
  { id: 'creativity', emoji: '🎨', zh: '創造', en: 'Creativity' },
];

interface Props {
  onComplete: (prefs: UserPreferences) => void;
}

function toggleInArray<T>(arr: T[], item: T): T[] {
  if (arr.includes(item)) return arr.filter((x) => x !== item);
  return [...arr, item];
}

export default function OnboardingPicker({ onComplete }: Props) {
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [styles, setStyles] = useState<Style[]>([]);
  const [protagonists, setProtagonists] = useState<Protagonist[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);

  const handleFinish = useCallback(() => {
    const prefs: UserPreferences = {
      cultures,
      styles,
      protagonists,
      themes,
    };
    setUserPreferences(prefs);
    onComplete(prefs);
  }, [cultures, styles, protagonists, themes, onComplete]);

  const handleSkip = useCallback(() => {
    const prefs: UserPreferences = { ...ALL_PREFERENCES_DEFAULT };
    setUserPreferences(prefs);
    onComplete(prefs);
  }, [onComplete]);

  const totalPicked =
    cultures.length + styles.length + protagonists.length + themes.length;

  return (
    <div role="dialog" aria-labelledby="onboarding-picker-title" style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerBlock}>
          <div style={mascotEmoji} aria-hidden="true">🐱</div>
          <div id="onboarding-picker-title" style={titleStyle}>
            Mochi 想知道你愛聽什麼故事
          </div>
          <div style={subtitleStyle}>
            Mochi wants to know what stories you like
          </div>
          <div style={hintStyle}>
            {`點選你喜歡的(可多選) · Tap any you like (multi-select)`}
          </div>
        </div>

        <Section
          titleZh="文化區"
          titleEn="Culture"
          options={CULTURE_OPTIONS}
          selected={cultures}
          onToggle={(id) => setCultures((s) => toggleInArray(s, id))}
        />
        <Section
          titleZh="故事風格"
          titleEn="Style"
          options={STYLE_OPTIONS}
          selected={styles}
          onToggle={(id) => setStyles((s) => toggleInArray(s, id))}
        />
        <Section
          titleZh="主角類型"
          titleEn="Protagonist"
          options={PROTAGONIST_OPTIONS}
          selected={protagonists}
          onToggle={(id) => setProtagonists((s) => toggleInArray(s, id))}
        />
        <Section
          titleZh="故事主題"
          titleEn="Theme"
          options={THEME_OPTIONS}
          selected={themes}
          onToggle={(id) => setThemes((s) => toggleInArray(s, id))}
        />

        <div style={footerBlock}>
          <button
            type="button"
            onClick={handleFinish}
            style={primaryBtnStyle}
            aria-label={`Finish - ${totalPicked} preferences picked`}
          >
            {totalPicked > 0
              ? `完成 → 跳到推薦 · Done (${totalPicked} picked)`
              : '完成 → 跳到推薦 · Done'}
          </button>
          <button
            type="button"
            onClick={handleSkip}
            style={skipBtnStyle}
            aria-label="Skip - I like everything"
          >
            跳過 → 全部都喜歡 · Skip (I like all)
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-component: per-axis chip grid ─────────────────────────────────────

interface SectionProps<T extends string> {
  titleZh: string;
  titleEn: string;
  options: Array<ChipOption<T>>;
  selected: T[];
  onToggle: (id: T) => void;
}

function Section<T extends string>({
  titleZh,
  titleEn,
  options,
  selected,
  onToggle,
}: SectionProps<T>) {
  return (
    <div style={sectionStyle}>
      <div style={sectionTitleZh}>{titleZh}</div>
      <div style={sectionTitleEn}>{titleEn}</div>
      <div style={chipGridStyle}>
        {options.map((opt) => {
          const isSelected = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onToggle(opt.id)}
              aria-label={`${opt.en} (${opt.zh})`}
              aria-pressed={isSelected}
              style={{
                ...chipBtnStyle,
                background: isSelected ? '#e7a44a' : '#fef8ed',
                color: isSelected ? '#ffffff' : '#3c2a1c',
                borderColor: isSelected ? '#d68a52' : '#e7e3d0',
                boxShadow: isSelected
                  ? 'inset 0 4px 0 rgba(255,255,255,0.18), 0 3px 0 rgba(60,42,28,0.24)'
                  : 'inset 0 2px 0 rgba(255,255,255,0.4), 0 2px 0 rgba(60,42,28,0.10)',
              }}
            >
              <span style={chipEmojiStyle} aria-hidden="true">{opt.emoji}</span>
              <span style={chipLabelStyle}>
                <span style={chipLabelZh}>{opt.zh}</span>
                <span style={chipLabelEn}>{opt.en}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Styles (inline, palette aligned with LevelTest.tsx) ───────────────────

const containerStyle: React.CSSProperties = {
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

const cardStyle: React.CSSProperties = {
  background: '#fef8ed',
  borderRadius: 18,
  padding: '20px 18px 18px',
  width: '100%',
  maxWidth: 440,
  boxShadow: '0 12px 32px rgba(60, 42, 28, 0.32)',
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  marginTop: 16,
  marginBottom: 32,
};

const headerBlock: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
};

const mascotEmoji: React.CSSProperties = {
  fontSize: 44,
  lineHeight: 1,
  marginBottom: 2,
};

const titleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 900,
  color: '#3c2a1c',
  textAlign: 'center',
  lineHeight: 1.3,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: '#5a4632',
  textAlign: 'center',
  fontStyle: 'italic',
};

const hintStyle: React.CSSProperties = {
  marginTop: 6,
  fontSize: 12,
  color: '#7d6a52',
  textAlign: 'center',
  fontWeight: 600,
};

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  paddingTop: 4,
};

const sectionTitleZh: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: '#3c2a1c',
};

const sectionTitleEn: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: '#7d6a52',
  fontStyle: 'italic',
  marginTop: -2,
};

const chipGridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  marginTop: 6,
};

const chipBtnStyle: React.CSSProperties = {
  border: '2px solid',
  borderRadius: 14,
  padding: '8px 12px',
  fontFamily: 'inherit',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  transition: 'background 160ms ease-out',
  minHeight: 44,
};

const chipEmojiStyle: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 1,
};

const chipLabelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 0,
  lineHeight: 1.1,
};

const chipLabelZh: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 800,
};

const chipLabelEn: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  opacity: 0.85,
  fontStyle: 'italic',
};

const footerBlock: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  marginTop: 8,
};

const primaryBtnStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: 12,
  background: '#e7a44a',
  color: '#ffffff',
  fontFamily: 'inherit',
  fontSize: 15,
  fontWeight: 900,
  padding: '14px 18px',
  cursor: 'pointer',
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.18), 0 4px 0 rgba(60,42,28,0.20)',
};

const skipBtnStyle: React.CSSProperties = {
  marginTop: 4,
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
