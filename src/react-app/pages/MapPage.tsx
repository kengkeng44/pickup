/**
 * v2.0.B.175 — strict 1:1 port of Phaser StoryMapView visual design.
 * Constants from src/ui/StoryMapView.ts. User: '嚴格遵守原版設計 不要有
 * 任何的不一樣'.
 */
import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { readCompletedLessons, isLessonUnlocked } from '../../store/runStore';
import KeySentencesSheet from '../components/KeySentencesSheet';
import { readXp, levelForXp, levelProgress } from '../../data/xp';
import { readCoins } from '../../data/coins';
import { readStreak, readFreezes } from '../../data/streak';
// v2.0.B.234 招 3: Mochi outfit avatar (small badge overlay).
import MochiOutfitAvatar from '../components/MochiOutfitAvatar';
// v2.0.B.235 Phase 1: 今天奶奶的推薦 carousel (AI recommendation engine).
import GrandmaRecommendCarousel from '../components/GrandmaRecommendCarousel';

interface Lesson {
  id: string;
  chapter: number;
  lessonInChapter: number;
  segmentType: string;
  storyBeat?: string;
  intro?: { zh: string };
  questions: unknown[];
}

// v2.0.B.190 LCP fix: module-level fetch cache. First MapPage mount kicks
// off fetch; subsequent mounts (chapter switch + back navigation) hit cache
// instantly. Audit P0: useEffect fetch was causing 3-render LCP cascade.
const lessonCache: Record<number, Promise<Lesson[]>> = {};
function loadChapterLessons(chapter: number): Promise<Lesson[]> {
  if (!lessonCache[chapter]) {
    lessonCache[chapter] = fetch(`/lessons-ch${chapter}.json`)
      .then(r => r.ok ? r.json() : [])
      .then(data => Array.isArray(data) ? data : [])
      .catch(() => []);
  }
  return lessonCache[chapter];
}

// ─── strict constants from StoryMapView.ts ─────────────────────────────────
const COLOR_BG = '#f1ebe1';
const COLOR_NODE = '#a47148';
const COLOR_NODE_DARK = '#7a5b3a';
const COLOR_NODE_DONE = '#7d9a4f';
const COLOR_NODE_DONE_DARK = '#5e7a36';
const COLOR_NODE_LOCKED = '#c4b89c';
const COLOR_NODE_LOCKED_DARK = '#a89c80';
const COLOR_TEXT_DARK = '#3c2a1c';
const COLOR_TEXT_MUTED = '#7a6850';
const NODE_SIZE = 82;
const NODE_HEIGHT = 64;
const CONTAINER_W = 320;

const NODE_PATH_V2: Array<{ dx: number; top: number }> = [
  { dx: 10, top: 16 }, { dx: 30, top: 100 }, { dx: -20, top: 184 },
  { dx: 18, top: 268 }, { dx: 38, top: 352 }, { dx: 24, top: 436 },
  { dx: -10, top: 520 }, { dx: -34, top: 604 }, { dx: -18, top: 688 },
  { dx: 16, top: 772 }, { dx: 36, top: 856 }, { dx: 20, top: 940 },
  { dx: -12, top: 1024 }, { dx: -32, top: 1108 }, { dx: -16, top: 1192 },
  { dx: 14, top: 1276 }, { dx: 34, top: 1360 }, { dx: 18, top: 1444 },
  { dx: -10, top: 1528 }, { dx: -30, top: 1612 }, { dx: -14, top: 1696 },
  { dx: 16, top: 1780 }, { dx: 30, top: 1864 }, { dx: 0, top: 1948 },
];

const CHAPTER_META: Record<number, { titleZh: string; titleEn: string; accent: string }> = {
  1: { titleZh: '院子裡的第一個故事', titleEn: 'A Story in the Yard', accent: '#d68a52' },
  2: { titleZh: '桃太郎', titleEn: 'Momotaro', accent: '#e7a44a' },
  3: { titleZh: '醜小鴨', titleEn: 'The Ugly Duckling', accent: '#e7659c' },
  4: { titleZh: '龜兔賽跑', titleEn: 'Tortoise and Hare', accent: '#6e7d5a' },
  5: { titleZh: '駱駝為什麼有駝峰', titleEn: 'How the Camel Got Its Hump', accent: '#e7a44a' },
  6: { titleZh: 'Baba Yaga 雞腳屋', titleEn: 'Baba Yaga', accent: '#6a7d8f' },
  7: { titleZh: '六隻天鵝', titleEn: 'The Six Swans', accent: '#8a6ea8' },
  8: { titleZh: '葉限', titleEn: 'Ye Xian', accent: '#6a7d8f' },
};

// Color helpers (from StoryMapView.ts)
function darken(hex: string, amount = 0.35): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r * (1 - amount))}, ${Math.round(g * (1 - amount))}, ${Math.round(b * (1 - amount))})`;
}
function lighten(hex: string, amount = 0.22): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const m = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${m(r)}, ${m(g)}, ${m(b)})`;
}

// ─── Grandma (cat) positioning algorithm — strict port of positionCat() ──
const CAT_W = 122;
const CAT_H = 110;
const CAT_CANDIDATES = [60, 100, 130, 180, 220, 380, 440, 500];
const CAT_EDGE_MARGIN = 14;

function computeCatPosition(currentNodeIdx: number): { x: number; y: number } | null {
  if (currentNodeIdx < 0) return null;
  // Use first 8 nodes for sparse-band scoring (same as Phaser)
  const visible = NODE_PATH_V2.slice(0, 8);
  const meanDx = visible.reduce((s, n) => s + n.dx, 0) / visible.length;
  const charSide: 'L' | 'R' = meanDx >= 0 ? 'L' : 'R';
  let bestCatY = 130;
  let bestScore = Number.POSITIVE_INFINITY;
  for (const cy of CAT_CANDIDATES) {
    const top = cy, bot = cy + CAT_H;
    let overlapCount = 0;
    let minHorizontalGap = Number.POSITIVE_INFINITY;
    for (const n of visible) {
      const nTop = n.top, nBot = n.top + NODE_HEIGHT;
      if (bot < nTop || top > nBot) continue;
      overlapCount++;
      const nLeft = CONTAINER_W / 2 - NODE_SIZE / 2 + n.dx;
      const nRight = nLeft + NODE_SIZE;
      const gap = charSide === 'L' ? nLeft - CAT_W : (CONTAINER_W - nRight);
      minHorizontalGap = Math.min(minHorizontalGap, gap);
    }
    const score = overlapCount * 100 - minHorizontalGap;
    if (score < bestScore) { bestScore = score; bestCatY = cy; }
  }
  const catX = charSide === 'L' ? CAT_EDGE_MARGIN : CONTAINER_W - CAT_W - CAT_EDGE_MARGIN;
  return { x: catX, y: bestCatY };
}

// ─── HUD icon ──────────────────────────────────────────────────────────────
function HudIcon({ src, value, valueColor, width = 24, ariaLabel, onClick, progress, filter }: {
  src: string; value: string; valueColor: string; width?: number; ariaLabel: string;
  onClick: () => void; progress?: number; filter?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        background: 'transparent', border: 'none', cursor: 'pointer',
        // v2.0.B.187 P1-D: tap area 38→48px senior thumb 友好
        padding: '12px 10px', borderRadius: 10, fontFamily: 'inherit',
        minWidth: 48, minHeight: 48,
        touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
        display: 'flex', alignItems: 'center',
      }}
    >
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <img src={src} alt="" aria-hidden="true" width={width} height={width} style={{ display: 'block', filter: filter ?? 'none' }} />
          {value && <span style={{ fontSize: 15, fontWeight: 900, color: valueColor, lineHeight: 1 }}>{value}</span>}
        </span>
        {typeof progress === 'number' && (
          <span style={{ display: 'block', width: 38, height: 3, background: 'rgba(122,104,80,0.18)', borderRadius: 2, marginTop: 3, overflow: 'hidden' }}>
            <span style={{ display: 'block', width: `${Math.round(progress * 100)}%`, height: '100%', background: valueColor, borderRadius: 2 }} />
          </span>
        )}
      </span>
    </button>
  );
}

// v2.0.B.232 招 1: emoji-based freeze pill (no PNG asset yet).
function FreezeHudPill({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Streak freezes ${count} available`}
      style={{
        background: 'transparent', border: 'none', cursor: 'pointer',
        padding: '12px 6px', borderRadius: 10, fontFamily: 'inherit',
        minWidth: 40, minHeight: 48,
        touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
        display: 'flex', alignItems: 'center', gap: 3,
      }}
    >
      <span style={{ fontSize: 20, lineHeight: 1 }}>🧊</span>
      <span style={{ fontSize: 15, fontWeight: 900, color: '#5a8cc4', lineHeight: 1 }}>{count}</span>
    </button>
  );
}

export default function MapPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chapter = Math.min(8, Math.max(1, Number(searchParams.get('ch') || 1)));
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [pressedId, setPressedId] = useState<string | null>(null);
  const [showKeySheet, setShowKeySheet] = useState(false);
  // v2.0.B.193 (Walkthrough P1-B): ref to current-node button for auto-scroll
  const currentNodeRef = useRef<HTMLButtonElement | null>(null);
  // v2.0.B.232 招 1: read persistent daily streak + freeze count from
  // localStorage (was in-session runStore.streak — wrong on cold start).
  const streak = readStreak();
  const freezes = readFreezes();
  const completed = readCompletedLessons(chapter);
  const meta = CHAPTER_META[chapter];

  // Derive current node = first non-completed unlocked (or -1 if all done)
  const currentNodeIdx = useMemo(() => {
    if (lessons.length === 0) return -1;
    for (let i = 0; i < lessons.length; i++) {
      if (!completed.has(lessons[i].id)) return i;
    }
    return -1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessons.length, chapter]);
  const catPos = useMemo(() => computeCatPosition(currentNodeIdx), [currentNodeIdx]);

  // v2.0.B.189 P0 fix (UI/UX cron audit): wire HUD to real XP/Coins/Level
  // 從硬編 xp=0/level=1/coins=0 改成讀 localStorage 實際資料。
  // Crown tier per Phaser StoryMapView (L1-2 Silver, L3-4 Gold, L5+ Diamond)
  const xp = readXp();
  const coins = readCoins();
  const level = levelForXp(xp);
  const progress = levelProgress(xp);
  const tierLabel = `L${level}`;
  const tierStroke = level >= 5 ? '#3a9eaa' : level >= 3 ? '#c79410' : '#7a8794';
  const tierFilter = level >= 5 ? 'hue-rotate(155deg) saturate(0.75)' : level >= 3 ? 'none' : 'saturate(0.12) brightness(0.95)';
  const firstTime = xp === 0;

  useEffect(() => {
    setLoading(true);
    loadChapterLessons(chapter)
      .then(setLessons)
      .finally(() => setLoading(false));
  }, [chapter]);

  // v2.0.B.193 (Walkthrough P1-B): scroll current-unlocked node into view
  // when lesson list ready. Senior 玩家完 lesson 回 map 直接看到下一個目標
  // (vs 之前 24 個 node 中自己滑找)。300ms 等 layout settle + sticky header
  // calc offset。
  useEffect(() => {
    if (!loading && currentNodeIdx >= 0 && currentNodeRef.current) {
      const t = window.setTimeout(() => {
        try {
          currentNodeRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        } catch {}
      }, 300);
      return () => window.clearTimeout(t);
    }
  }, [loading, currentNodeIdx]);

  return (
    <div className="pickup-full-bleed" style={{
      background: COLOR_BG, color: COLOR_TEXT_DARK, minHeight: '100dvh',
      fontFamily: '"Nunito", "Noto Sans TC", system-ui, sans-serif',
    }}>
      {/* HUD bar — strict order: Flag / Crown / Coin / Flame */}
      <div style={{
        padding: 'max(14px, env(safe-area-inset-top)) 14px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 4, marginBottom: 8,
      }}>
        <HudIcon src="/mascots/flag-en.webp" value="" valueColor="#3c2a1c" ariaLabel="Language: English" onClick={() => navigate('/profile')} />
        <HudIcon src="/mascots/crown-gold.webp" value={tierLabel} valueColor={tierStroke} filter={tierFilter} ariaLabel={`Crown level ${level} ${Math.round(progress.fraction * 100)}%`} onClick={() => navigate('/profile')} progress={progress.fraction} />
        <HudIcon src="/mascots/coin-gold.webp" value={firstTime ? '' : String(coins)} valueColor="#c79410" ariaLabel={`Coins ${coins}`} onClick={() => navigate('/profile')} />
        <HudIcon src="/mascots/icon-flame.webp" value={firstTime ? '' : String(streak)} valueColor="#ff7a3a" width={26} ariaLabel={`Streak ${streak} days`} onClick={() => navigate('/tasks')} />
        {/* v2.0.B.232 招 1: freeze 🧊 HUD slot. Hide on first-time (xp=0) like
            coin/streak to avoid empty-state clutter. */}
        {!firstTime && <FreezeHudPill count={freezes} onClick={() => navigate('/tasks')} />}
      </div>

      {/* v2.0.B.235 — 今天奶奶的推薦 carousel (Phase 1 rule engine) */}
      <GrandmaRecommendCarousel />

      {/* Chapter header card */}
      <div style={{ padding: 'max(16px, env(safe-area-inset-top)) 14px 0 14px' }}>
        <div style={{
          background: meta.accent, borderRadius: 14,
          padding: '12px 16px', color: '#ffffff',
          boxShadow: `inset 0 8px 0 ${lighten(meta.accent, 0.18)}, 0 4px 0 ${darken(meta.accent, 0.32)}`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.85 }}>
              Section {chapter} · 第 {chapter} 章
            </div>
            <div style={{ fontSize: 17, fontWeight: 900, lineHeight: 1.2, marginTop: 2 }}>
              {meta.titleZh}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2, marginTop: 2, opacity: 0.85, fontStyle: 'italic' }}>
              {meta.titleEn}
            </div>
          </div>
          <button
            type="button"
            aria-label="Chapter key sentences"
            onClick={() => setShowKeySheet(true)}
            style={{
              width: 38, height: 38, borderRadius: 11,
              background: 'rgba(255,255,255,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flex: '0 0 auto', border: 'none', cursor: 'pointer',
              padding: 0, fontFamily: 'inherit',
              touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
            }}
          >
            <img src="/mascots/node-paw.webp" alt="" aria-hidden="true" width={24} height={24} style={{ display: 'block', filter: 'brightness(0) invert(1)' }} />
          </button>
        </div>
      </div>

      {/* Map column — fixed 320 wide, centered, scrollable */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: COLOR_TEXT_MUTED }}>載入中…</div>
      ) : lessons.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: COLOR_TEXT_MUTED }}>本章內容未上線</div>
      ) : (
        <div style={{
          width: CONTAINER_W, margin: '20px auto 80px', position: 'relative',
          height: 2032 + NODE_HEIGHT + 80,
        }}>
          {/* Grandma (cat anchor) — follows currentNodeIdx via positioning algorithm */}
          {catPos && (
            <div
              style={{
                position: 'absolute',
                left: 0, top: 0,
                width: CAT_W, height: CAT_H,
                pointerEvents: 'none', zIndex: 5,
                transform: `translate(${catPos.x}px, ${catPos.y}px)`,
                transformOrigin: '50% 100%',
                transition: 'transform 700ms cubic-bezier(0.4, -0.3, 0.55, 1.5)',
                willChange: 'transform',
              }}
            >
              <div style={{
                position: 'absolute', left: 6, bottom: -2,
                width: 78, height: 10,
                background: 'rgba(60,42,28,0.30)', borderRadius: '50%', zIndex: 0,
              }} />
              <img src="/mascots/iso-grandma.webp" alt="" style={{
                position: 'absolute', left: 0, bottom: 0,
                width: 88, height: 'auto', display: 'block', zIndex: 2,
              }} />
              {/* v2.0.B.234 招 3: small Mochi mascot next to grandma, shows
                  the player's chosen outfit via emoji badge overlay. Sits at
                  grandma's feet — keeps the trio (grandma+shiba+Mochi)
                  consistent across map/intro/lesson surfaces. */}
              <span style={{
                position: 'absolute', left: 70, bottom: 4,
                zIndex: 3, lineHeight: 0,
              }}>
                <MochiOutfitAvatar size={44} ariaLabel="Mochi" />
              </span>
            </div>
          )}

          {/* Shiba — fixed anchor, left = CONTAINER_W/2 + 60, top = 480 */}
          <div style={{
            position: 'absolute',
            left: CONTAINER_W / 2 + 60, top: 480,
            width: 80, height: 90, pointerEvents: 'none', zIndex: 4,
          }}>
            <div style={{
              position: 'absolute', left: 8, bottom: -2,
              width: 64, height: 9,
              background: 'rgba(60,42,28,0.28)', borderRadius: '50%', zIndex: 0,
            }} />
            <img src="/mascots/iso-shiba.webp" alt="" style={{
              position: 'absolute', left: 0, bottom: 0,
              width: 80, height: 'auto', display: 'block', zIndex: 1,
            }} />
          </div>

          {/* Nodes loop NODE_PATH_V2 */}
          {lessons.map((l, i) => {
            const slot = NODE_PATH_V2[i] ?? NODE_PATH_V2[NODE_PATH_V2.length - 1];
            const leftPx = CONTAINER_W / 2 - NODE_SIZE / 2 + slot.dx;
            const done = completed.has(l.id);
            const unlocked = isLessonUnlocked(chapter, l.lessonInChapter, completed.size);
            const baseColor = done ? COLOR_NODE_DONE : unlocked ? COLOR_NODE : COLOR_NODE_LOCKED;
            const shadowColor = done ? COLOR_NODE_DONE_DARK : unlocked ? COLOR_NODE_DARK : COLOR_NODE_LOCKED_DARK;
            const iconSrc = done
              ? '/mascots/node-star.webp'
              : '/mascots/node-paw.webp';
            const iconFilter = !unlocked && !done ? 'grayscale(1)' : 'none';
            const iconOpacity = !unlocked && !done ? 0.65 : 1;

            const isPressed = pressedId === l.id;
            const isCurrent = i === currentNodeIdx;
            const restShadow = `inset 0 8px 0 ${lighten(baseColor, 0.20)}, 0 10px 0 ${shadowColor}`;
            const pressShadow = `inset 0 8px 0 ${lighten(baseColor, 0.20)}, 0 3px 0 ${shadowColor}`;
            return (
              <button
                key={l.id}
                ref={isCurrent ? currentNodeRef : undefined}
                className={isCurrent ? 'pickup-map-node-current' : undefined}
                type="button"
                disabled={!unlocked}
                aria-label={`${l.storyBeat ?? `Lesson ${l.lessonInChapter}`}${unlocked ? '' : ' (locked)'}${isCurrent ? ' (current)' : ''}`}
                onClick={() => unlocked && navigate(`/lesson/${chapter}/${l.id}`)}
                onPointerDown={() => unlocked && setPressedId(l.id)}
                onPointerUp={() => setPressedId(null)}
                onPointerLeave={() => setPressedId(null)}
                onPointerCancel={() => setPressedId(null)}
                style={{
                  position: 'absolute',
                  left: leftPx, top: slot.top,
                  width: NODE_SIZE, height: NODE_HEIGHT,
                  borderRadius: '50% / 60%',
                  border: 'none',
                  background: baseColor,
                  boxShadow: isPressed ? pressShadow : restShadow,
                  transform: isPressed ? 'translateY(8px)' : 'none',
                  cursor: unlocked ? 'pointer' : 'not-allowed',
                  opacity: unlocked ? 1 : 0.7,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 0, fontFamily: 'inherit',
                  touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
                  transition: 'transform 80ms ease, box-shadow 80ms ease',
                  zIndex: 2,
                }}
              >
                <img
                  src={iconSrc}
                  alt=""
                  aria-hidden="true"
                  width={36} height={36}
                  style={{ display: 'block', filter: iconFilter, opacity: iconOpacity }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Key Sentences overlay */}
      {showKeySheet && (
        <KeySentencesSheet
          chapter={chapter}
          titleEn={meta.titleEn}
          onClose={() => setShowKeySheet(false)}
        />
      )}
    </div>
  );
}
