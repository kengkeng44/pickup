/**
 * v2.0.B.175 — strict 1:1 port of Phaser StoryMapView visual design.
 * Constants from src/ui/StoryMapView.ts. User: '嚴格遵守原版設計 不要有
 * 任何的不一樣'.
 */
import { useEffect, useState, useMemo, useRef, useCallback, Fragment } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { readCompletedLessons, isLessonUnlocked } from '../../store/runStore';
import { getInProgressLessonIds } from '../../data/lessonProgress';
import KeySentencesSheet from '../components/KeySentencesSheet';
import { MapNode } from '../components/MapNode';
import { readXp, levelForXp, levelProgress } from '../../data/xp';
import { readCoins, addCoins } from '../../data/coins';
import { isBackendLive, serverOpenChest } from '../../data/backend';
import { readStreak, readFreezes } from '../../data/streak';
// v2.0.B.234 招 3: Mochi outfit avatar (small badge overlay).
import MochiOutfitAvatar from '../components/MochiOutfitAvatar';
// v2.0.B.235 Phase 1: 今天奶奶的推薦 carousel (AI recommendation engine).
import GrandmaRecommendCarousel from '../components/GrandmaRecommendCarousel';
// v2.0.B.239: tomorrow-queue read so MapPage can surface the
// "Mochi 記得了 — 今晚講 X" banner when user queued a story last session.
import {
  readTomorrowQueue,
  consumeTomorrowQueue,
  isTomorrowBannerDue,
  type TomorrowQueueEntry,
} from '../../data/tomorrowQueue';

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
// v2.0.B.318: COLOR_NODE / COLOR_NODE_DARK 移除 — 未完成節點改用各章 chMeta.accent
const COLOR_NODE_DONE = 'var(--t-success)';
const COLOR_NODE_DONE_DARK = 'var(--t-success-dark)';
const COLOR_NODE_LOCKED = '#c4b89c';
const COLOR_NODE_LOCKED_DARK = '#a89c80';
const COLOR_TEXT_DARK = 'var(--t-text)';
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

// v2.0.B.266: cyclic node slot for aggregate mode (user: 「拓展成無限顆 只要加按鈕即可」)
// 原 24 entries 用完後 cycle 重複 dx 模式, top 累加, 維持原視覺蜿蜒節奏
const NODE_CYCLE_HEIGHT = NODE_PATH_V2[NODE_PATH_V2.length - 1].top - NODE_PATH_V2[0].top + 84;
function getNodeSlot(i: number): { dx: number; top: number } {
  if (i < NODE_PATH_V2.length) return NODE_PATH_V2[i];
  const cycle = Math.floor(i / NODE_PATH_V2.length);
  const idx = i % NODE_PATH_V2.length;
  const base = NODE_PATH_V2[idx];
  return { dx: base.dx, top: base.top + cycle * NODE_CYCLE_HEIGHT };
}

// v2.0.B.318 (per user): 每章專屬配色 (全 hex, 不再 var() — 讓 lighten/darken 陰影生效) +
// 故事 emoji. accent 套到該章「節點 + 分隔線 + 書封」, 整段路徑跟著故事變色. 色系挑暖中明度,
// 白字 (書封) + 米色爪 (節點) 都讀得清; 相鄰章不同色.
const CHAPTER_META: Record<number, { titleZh: string; titleEn: string; accent: string; emoji: string }> = {
  1: { titleZh: '桃太郎', titleEn: 'Momotaro', accent: '#e98a52', emoji: '🍑' },
  2: { titleZh: '醜小鴨', titleEn: 'The Ugly Duckling', accent: '#5b91a5', emoji: '🦢' },
  3: { titleZh: '龜兔賽跑', titleEn: 'Tortoise and Hare', accent: '#6e9a4f', emoji: '🐢' },
  4: { titleZh: '駱駝為什麼有駝峰', titleEn: 'How the Camel Got Its Hump', accent: '#c79a4a', emoji: '🐪' },
  5: { titleZh: 'Baba Yaga 雞腳屋', titleEn: 'Baba Yaga', accent: '#7a6a9a', emoji: '🏚️' },
  6: { titleZh: '六隻天鵝', titleEn: 'The Six Swans', accent: '#8f9cc0', emoji: '🦢' },
  7: { titleZh: '葉限', titleEn: 'Ye Xian', accent: '#c0473a', emoji: '🐟' },
  8: { titleZh: '三隻小豬', titleEn: 'The Three Little Pigs', accent: '#db7d96', emoji: '🐷' },
  // v2.0.B.259: 補 Ch9-Ch29 (user 反映 MapPage 只 7-8 顆按鈕, 已 ship 30 章但只顯示 8)
  9: { titleZh: '灰姑娘', titleEn: 'Cinderella', accent: '#5a7fb0', emoji: '👗' },
  10: { titleZh: '嫦娥奔月', titleEn: 'Chang E Flies to the Moon', accent: '#6b6fa8', emoji: '🌙' },
  11: { titleZh: '后羿射日', titleEn: 'Hou Yi Shoots the Suns', accent: '#e0892f', emoji: '☀️' },
  12: { titleZh: '牛郎織女', titleEn: 'The Cowherd and the Weaver Girl', accent: '#4f6aa0', emoji: '🌌' },
  13: { titleZh: '小紅帽', titleEn: 'Little Red Riding Hood', accent: '#cc4d4d', emoji: '🧺' },
  14: { titleZh: '浦島太郎', titleEn: 'Urashima Taro', accent: '#3f9aa0', emoji: '🐢' },
  15: { titleZh: '國王的新衣', titleEn: "The Emperor's New Clothes", accent: '#9a6fb0', emoji: '👑' },
  16: { titleZh: '一寸法師', titleEn: 'Issun-boshi', accent: '#6e9a5a', emoji: '🍚' },
  17: { titleZh: '鶴的報恩', titleEn: "The Crane's Return", accent: '#7fa0b5', emoji: '🕊️' },
  18: { titleZh: '興夫和孬夫', titleEn: 'Heungbu and Nolbu', accent: '#cba03f', emoji: '🪺' },
  19: { titleZh: 'Sang Kancil 與鱷魚', titleEn: 'Sang Kancil', accent: '#5a9a6a', emoji: '🐭' },
  20: { titleZh: '蘿蔔大冒險', titleEn: 'The Enormous Turnip', accent: '#b56fa0', emoji: '🥕' },
  21: { titleZh: 'Anansi 蜘蛛', titleEn: 'Anansi the Spider', accent: '#9a6a3a', emoji: '🕷️' },
  22: { titleZh: '孟母三遷', titleEn: "Mencius's Mother", accent: '#c07248', emoji: '🏠' },
  23: { titleZh: '司馬光砸缸', titleEn: 'Sima Guang Smashes the Vat', accent: '#5588a8', emoji: '🏺' },
  24: { titleZh: '孔融讓梨', titleEn: 'Kong Rong Gives Up the Pear', accent: '#9aa84f', emoji: '🍐' },
  25: { titleZh: '愚公移山', titleEn: 'The Foolish Old Man Moves Mountains', accent: '#6a8a7a', emoji: '⛰️' },
  26: { titleZh: 'Archimedes 尤里卡', titleEn: 'Archimedes Eureka', accent: '#3f9a9a', emoji: '🛁' },
  27: { titleZh: '西遊記·取經出發', titleEn: 'Journey to the West', accent: '#d98736', emoji: '🐵' },
  28: { titleZh: '諸葛亮·三顧茅廬', titleEn: "Zhuge Liang's Strategems", accent: '#4a9a7a', emoji: '🪶' },
  29: { titleZh: '奧德賽·出航回家', titleEn: 'The Odyssey', accent: '#4a7fb0', emoji: '⛵' },
  // v2.0.B.260: round 2 mid-long ship
  30: { titleZh: '赫拉克勒斯·尼米亞獅子', titleEn: 'Heracles vs Nemean Lion', accent: '#b5563a', emoji: '🦁' },
  31: { titleZh: 'Robin Hood·Sherwood 森林', titleEn: 'Robin Hood', accent: '#5a8a4a', emoji: '🏹' },
};

// Color helpers (from StoryMapView.ts)
function lighten(hex: string, amount = 0.22): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const m = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${m(r)}, ${m(g)}, ${m(b)})`;
}
// v2.0.B.271: darken 回歸 — 書封 3D 立體 shadow 需要 accent 的暗版
function darken(hex: string, amount = 0.22): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const m = (c: number) => Math.round(c * (1 - amount));
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
function HudIcon({ src, value, valueColor, width = 22, ariaLabel, onClick, progress: _progress, filter }: {
  src: string; value: string; valueColor: string; width?: number; ariaLabel: string;
  onClick: () => void; progress?: number; filter?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        background: 'transparent', border: 'none', cursor: 'pointer',
        // v2.0.B.269: HUD 縮窄 — padding 12x10→6x8, minHeight 48→38, width 24→22
        // user: 「上面四個弄窄一點」, 但 tap area 仍維持 38px (>= HIG 32px floor)
        padding: '6px 8px', borderRadius: 10, fontFamily: 'inherit',
        minWidth: 38, minHeight: 38,
        touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
        display: 'flex', alignItems: 'center',
      }}
    >
      {/* v2.0.B.283: 砍 progress bar (user「左上數過來第二個進度條刪掉」= 皇冠下面那條 mini bar)
          progress prop 留著兼容 (caller 仍傳但不 render), 之後要再加直接 unblock 此處 */}
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <img src={src} alt="" aria-hidden="true" width={width} height={width} style={{ display: 'block', filter: filter ?? 'none' }} />
        {value && <span style={{ fontSize: 15, fontWeight: 900, color: valueColor, lineHeight: 1 }}>{value}</span>}
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
  // v2.0.B.266: aggregate mode (user: 「拓展成無限顆」)
  const isAggregate = !searchParams.has('ch');
  const requestedChapter = Math.min(31, Math.max(1, Number(searchParams.get('ch') || 1)));

  // v2.0.B.267: virtual scrolling (windowing) — 不一次 render 217 顆 button
  // user: 「往下滑再載入就好 不然一個頁面會太大 (這叫什麼技術 你上網查一下照著用)」
  // → 標準 windowing / virtualization 技術: 只 render viewport ± buffer 內的 node
  // 容器高度 = lessons.length × NODE_PITCH 保 scrollbar 精準
  // v2.0.B.296 ROOT FIX: 砍 scrollY listener 完全. 11 patch 失敗的真根因 = React 18 setState
  // in scroll listener 在 mobile broken (facebook/react#26227). chapter detection 改 IO.
  // (catPos / currentNodeIdx 跟 scroll 無關, 不需 scrollY).
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [pressedId, setPressedId] = useState<string | null>(null);
  // v2.0.B.272: 整張書封 click toggle 金句集錦 (user: 「書封點進去應該是金句集錦」)
  // 再點書封 = 關 sheet 回地圖 (toggle 而非僅 open)
  const [showKeySheet, setShowKeySheet] = useState(false);
  // v2.0.B.274: 寶箱開啟 state (取代原本 localStorage.reload nuclear path)
  // 初始化 lazy 一次掃 localStorage 取已開 chest indices, 之後 state-only
  const [openedChests, setOpenedChests] = useState<Set<number>>(() => {
    const s = new Set<number>();
    try {
      for (let i = 0; i < 500; i += 5) {
        if (localStorage.getItem(`pickup.chest.${i}.opened`) === '1') s.add(i);
      }
    } catch {}
    return s;
  });
  const [, setChestTick] = useState(0);
  // v2.0.B.193 (Walkthrough P1-B): ref to current-node button for auto-scroll
  const currentNodeRef = useRef<HTMLButtonElement | null>(null);
  // v2.0.B.232 招 1: read persistent daily streak + freeze count from
  // localStorage (was in-session runStore.streak — wrong on cold start).
  const streak = readStreak();
  const freezes = readFreezes();
  // v2.0.B.270: stream 包含 lesson + 每 5 lesson 一個寶箱 (user: 「每五個按鈕中間要加一個寶箱」)
  // 217 lessons + 43 chests = 260 nodes total (43 = floor(217/5))
  const stream = useMemo(() => {
    const out: Array<{ kind: 'lesson' | 'chest'; lessonIdx?: number }> = [];
    lessons.forEach((_, i) => {
      out.push({ kind: 'lesson', lessonIdx: i });
      if ((i + 1) % 5 === 0) out.push({ kind: 'chest' });
    });
    return out;
  }, [lessons.length]);

  // v2.0.B.316: 每個章節交界插一段垂直空檔 (放分隔線用), 後續節點累加下移.
  // 回傳每個 stream index 的累計位移 px. 章界 = aggregate 模式某 lesson 的 lessonInChapter===1 (非首項).
  const CH_GAP = 56;
  const chapterOffsets = useMemo(() => {
    const offs: number[] = [];
    let acc = 0;
    for (let i = 0; i < stream.length; i++) {
      const item = stream[i];
      if (item.kind === 'lesson') {
        const l = lessons[item.lessonIdx!];
        if (isAggregate && l && l.lessonInChapter === 1 && i > 0) acc += CH_GAP;
      }
      offs[i] = acc;
    }
    return offs;
  }, [stream, lessons, isAggregate]);
  const totalChapterGap = chapterOffsets.length ? chapterOffsets[chapterOffsets.length - 1] : 0;

  // v2.0.B.267: virtual scroll 視窗計算 + 動態 chapter header (跟著 visible node 走)
  // v2.0.B.296: 砍 visStart 計算 (已不需要 — chapter detection 改 IO, 虛擬化已砍).
  const NODE_PITCH = 84;

  // v2.0.B.296 ROOT FIX: chapter 偵測改 IntersectionObserver.
  // 之前 11 patch 失敗的真根因 = setState in scroll listener mobile broken + iOS Safari
  // momentum scroll 期間做 fixed element content mutation 觸發 paint invalidation = 強行跳回.
  // IO async + off-main-thread, 跟 momentum scroll 不競爭, 1 callback per chapter boundary.
  // v2.0.B.313 ROOT FIX「滑動跳回章節」: 砍掉 scroll-driven chapter 偵測 (IntersectionObserver
  // + debounce, B.296/B.312). 真因 = 滑動中改 fixed 書封內容 → WebKit momentum repaint 跳頂,
  // debounce 只把跳延到鬆手. 改成書封跟「你的進度章節」(currentNodeIdx 的章) 走 = 滑動期間
  // 永不 mutate fixed 書封 = 根治. (見下方 displayChapter / meta.)
  const [chapter] = useState(requestedChapter);

  // v2.0.B.275 perf: completedByChapter memo — 把 render loop 內 217× readCompletedLessons
  // localStorage.getItem + JSON.parse 收成 1× per render. 收益 ~80% scroll re-render 成本.
  // deps: lessons (內容變才重算, scroll 不重算)
  const completedByChapter = useMemo(() => {
    const map = new Map<number, Set<string>>();
    const chapters = new Set<number>();
    lessons.forEach(l => chapters.add(l.chapter ?? requestedChapter));
    chapters.forEach(c => map.set(c, readCompletedLessons(c)));
    return map;
  }, [lessons, isAggregate, requestedChapter]);

  // v2.0.B.286 (cron walk P0-2 P1): in-progress node marking. ONE localStorage
  // walk per mount (not per node — honours B.275 217×→1× perf rule). Recomputes
  // when lessons change (e.g. returning to map after a lesson remounts the page).
  const inProgressIds = useMemo(() => getInProgressLessonIds(), [lessons]);

  // v2.0.B.239: tomorrow-queue banner. Read on mount; only show after 18:00
  // local + when entry exists + not yet consumed. Banner tap consumes the
  // queue + navigates to that chapter.
  const [tomorrowQueue, setTomorrowQueue] = useState<TomorrowQueueEntry | null>(null);
  useEffect(() => {
    try {
      if (isTomorrowBannerDue()) {
        setTomorrowQueue(readTomorrowQueue());
      }
    } catch {}
  }, []);

  // Derive current node = first non-completed (aggregate 用 per-lesson chapter)
  // v2.0.B.275: 改用 completedByChapter map 不再 per-lesson localStorage
  const currentNodeIdx = useMemo(() => {
    if (lessons.length === 0) return -1;
    for (let i = 0; i < lessons.length; i++) {
      const l = lessons[i];
      const lessonChapter = isAggregate ? l.chapter : chapter;
      const doneSet = completedByChapter.get(lessonChapter) ?? new Set<string>();
      if (!doneSet.has(l.id)) return i;
    }
    return -1;
  }, [lessons, chapter, isAggregate, completedByChapter]);
  const catPos = useMemo(() => computeCatPosition(currentNodeIdx), [currentNodeIdx]);
  // v2.0.B.316: 貓也要跟著章界位移下移 (current node 的 stream index = lesson idx + 前面 chest 數)
  const catOffsetY = currentNodeIdx >= 0
    ? (chapterOffsets[currentNodeIdx + Math.floor(currentNodeIdx / 5)] ?? 0)
    : 0;

  // v2.0.B.313: 書封章節 = 你的進度章 (currentNodeIdx 的 lesson.chapter), 非滑動位置.
  // currentNodeIdx 只在「完成 lesson」時變, 滑動時恆定 → fixed 書封滑動中 0 mutation = 不跳.
  const displayChapter = isAggregate
    ? (lessons[currentNodeIdx >= 0 ? currentNodeIdx : 0]?.chapter ?? requestedChapter)
    : chapter;
  const meta = CHAPTER_META[displayChapter] ?? CHAPTER_META[1];

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

  // v2.0.B.285 PERF root fix: aggregate mode 之前 Promise.all 等 31 個 JSON 全到位才 paint
  // = cold start 4G ~5-10s 黑屏. 架構問題, user 問好幾次「為什麼一點點內容這麼卡」.
  // v2.0.B.297 ARCHITECTURE PARITY: 1-shot load 對齊 pickup-rn (inline import 行為).
  // 之前 progressive 2-phase setLessons(prev=>[...prev,...more]) 在 ~3s 觸發 lessons array
  // grow → stream re-memo → 視窗內 nodes mount/unmount → 配 dynamic chapter + cat 動畫
  // = 用戶體感「混 + 跳」殘餘. 換 1-shot, 等所有 31 章載入才 setLessons 一次, 用戶看到
  // 完整 paw map. trade-off: +3s 等待 (mobile 4G), 但 mid-scroll 0 layout 變動.
  //
  // 配合: 之後遷 RN 對應 pickup-rn 的 build-time JSON import (boot 0ms load), 此處 web
  // 端用 Promise.all 並行 fetch 是最接近的等效行為.
  useEffect(() => {
    setLoading(true);
    if (isAggregate) {
      const chapters = Array.from({ length: 31 }, (_, i) => i + 1);
      Promise.all(chapters.map(c => loadChapterLessons(c).catch(() => [] as Lesson[])))
        .then(arrs => {
          setLessons(arrs.flat());
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      loadChapterLessons(chapter)
        .then(setLessons)
        .finally(() => setLoading(false));
    }
  }, [chapter, isAggregate]);

  // v2.0.B.193 (Walkthrough P1-B): scroll current-unlocked node into view 一次 — REMOVED B.287
  // 根因 5+ 次回報「滑下去跳上面」: 300ms setTimeout + scrollY < 80 guard 擋不住 race —
  // 用戶在 300ms 內已開始滑, scrollY 可能還在 50-80px 區間 → guard pass → scrollIntoView
  // block:'center' 把 current node (常 idx=0) 拉回 viewport 中央 = 跳回頂.
  // 修法: 砍掉整個 feature. Senior 玩家可靠 .pickup-map-node-current pulse 動畫視覺找
  // current node, 不需強制 auto-scroll.

  // v2.0.B.274: 關掉瀏覽器 scroll restoration, 自己控 (router nav 也不要 bounce 回頂)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => { window.history.scrollRestoration = prev; };
    }
  }, []);

  // v2.0.B.275: stable callbacks for MapNode React.memo — 不 inline 給 memo 才能 bail-out
  const handleLessonTap = useCallback((ch: number, id: string) => {
    navigate(`/lesson/${ch}/${id}`);
  }, [navigate]);
  const handlePressDown = useCallback((id: string) => { setPressedId(id); }, []);
  const handlePressEnd = useCallback(() => { setPressedId(null); }, []);

  // v2.0.B.288 root simplify: 砍 ResizeObserver + 動態 chromeHeight
  // 根因 5+ 次「滑中突然跳」: ResizeObserver 在 chapter 切換 CSS transition 期間
  // 偶發 fire (sub-pixel paint 變動), setChromeHeight → React re-render → spacer 改 →
  // content shift = user 看到的 jump. 改 static spacer height 杜絕 reflow loop.
  // chromeRef 留著 ref binding 兼容, 不再 observe.
  const chromeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="pickup-full-bleed" style={{
      background: COLOR_BG, color: COLOR_TEXT_DARK, minHeight: '100dvh',
      fontFamily: '"Nunito", "Noto Sans TC", system-ui, sans-serif',
    }}>
      {/* v2.0.B.277 一勞永逸 chrome: HUD + 書封 合併單一 fixed wrapper, 自然 flow 不靠
          hardcoded offset. ResizeObserver 量真實高度 → spacer 自動跟. user 改 HUD 高 /
          iOS URL bar 收合 / 加 banner row 都自動 work, 不會再切書封 */}
      <div
        ref={chromeRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: COLOR_BG,
          paddingTop: 'env(safe-area-inset-top)',
          boxShadow: '0 6px 12px -6px rgba(60,42,28,0.10)',
        }}
      >
        {/* HUD icons row */}
        <div style={{
          padding: '6px 12px 4px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2,
        }}>
          <HudIcon src="/mascots/flag-en.webp" value="" valueColor="var(--t-text)" ariaLabel="Language: English" onClick={() => navigate('/profile')} />
          <HudIcon src="/mascots/crown-gold.webp" value={tierLabel} valueColor={tierStroke} filter={tierFilter} ariaLabel={`Crown level ${level} ${Math.round(progress.fraction * 100)}%`} onClick={() => navigate('/profile')} progress={progress.fraction} />
          <HudIcon src="/mascots/coin-gold.webp" value={firstTime ? '' : String(coins)} valueColor="#c79410" ariaLabel={`Coins ${coins}`} onClick={() => navigate('/profile')} />
          <HudIcon src="/mascots/icon-flame.webp" value={firstTime ? '' : String(streak)} valueColor="#ff7a3a" width={26} ariaLabel={`Streak ${streak} days`} onClick={() => navigate('/tasks')} />
          {!firstTime && <FreezeHudPill count={freezes} onClick={() => navigate('/tasks')} />}
        </div>
        {/* Chapter book cover — flow 在 HUD 下方, 不再 position:fixed */}
        <button
          type="button"
          aria-label={`第 ${displayChapter} 章 ${meta.titleZh} · 點看本章金句集錦`}
          aria-expanded={showKeySheet}
          onClick={() => setShowKeySheet(s => !s)}
          style={{
            // v2.0.B.283: 上下加寬 (user「加上下寬一點」). padding 10/14 → 18/16, 卡更厚實
            display: 'flex', alignItems: 'center', gap: 10,
            width: 'calc(100% - 28px)',
            margin: '0 14px 12px',
            background: meta.accent,
            color: '#fff',
            border: 'none',
            borderRadius: 14,
            padding: '18px 16px',
            boxShadow: `inset 0 4px 0 rgba(255,255,255,0.22), 0 5px 0 ${darken(meta.accent, 0.28)}`,
            textAlign: 'left',
            cursor: 'pointer',
            fontFamily: 'inherit',
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
            // v2.0.B.294 force compositor layer: 把 book cover 隔離成獨立 paint layer,
            // chapter 切換時 bg/text 變化只 repaint 這層, 不影響 260 個 button + body scroll context.
            // 業界對「fixed header content swap flicker」的 standard fix (Surma / Apple Dev Forum).
            transform: 'translateZ(0)',
            willChange: 'auto',
            contain: 'paint' as const,
            backfaceVisibility: 'hidden' as const,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* v2.0.B.283: 加位置 ch{N} 標 (user「要有位置 ch1」), 仍保留英文 title 為主 */}
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1.5, color: 'rgba(255,255,255,0.78)', marginBottom: 2 }}>
              CH {displayChapter}
            </div>
            <div style={{ fontSize: 19, fontWeight: 900, lineHeight: 1.2, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <span aria-hidden="true" style={{ marginRight: 6 }}>{meta.emoji}</span>{meta.titleEn}
            </div>
          </div>
          <span aria-hidden="true" style={{
            fontSize: 20, lineHeight: 1, color: '#fff',
            transform: showKeySheet ? 'rotate(180deg)' : 'none',
            transition: 'transform 200ms ease',
          }}>›</span>
        </button>
      </div>

      {/* v2.0.B.288 static spacer: HUD ~50 + 書封 ~80 (B.283 加厚後) + 留 padding ≈ 140
          + iOS safe-area-inset-top. 動態 ResizeObserver 已砍 (jitter 源) */}
      <div style={{ height: 'calc(140px + env(safe-area-inset-top))' }} aria-hidden="true" />

      {/* v2.0.B.235 — 今天奶奶的推薦 carousel (Phase 1 rule engine) */}
      <GrandmaRecommendCarousel />

      {/* v2.0.B.239: tomorrow-queue banner — surfaces when user picked
          "明晚聽 X" last session AND it's now past 18:00 local. Tap → consume
          + navigate to that chapter (deep-link). */}
      {tomorrowQueue && (
        <button
          type="button"
          onClick={() => {
            try { consumeTomorrowQueue(); } catch {}
            const ch = tomorrowQueue.chapter;
            setTomorrowQueue(null);
            navigate(`/map?ch=${ch}`);
          }}
          aria-label={`Tonight's story: chapter ${tomorrowQueue.chapter}`}
          style={{
            margin: '4px 14px 6px',
            display: 'block',
            background: 'var(--t-surface-alt)',
            border: '2px solid var(--t-border-card)',
            borderBottom: '4px solid var(--t-text-muted)',
            borderRadius: 12,
            padding: '10px 14px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            width: 'calc(100% - 28px)',
            textAlign: 'left',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24, lineHeight: 1 }} aria-hidden="true">🌙</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--t-text)', lineHeight: 1.3 }}>
                Mochi 記得了 — 今晚講 {CHAPTER_META[tomorrowQueue.chapter]?.titleZh ?? '故事'}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#7a6850', marginTop: 2, fontStyle: 'italic' }}>
                Tonight: {CHAPTER_META[tomorrowQueue.chapter]?.titleEn ?? 'your pick'}
              </div>
            </div>
          </div>
        </button>
      )}

      {/* v2.0.B.277: 書封已合併進上面 chromeRef fixed wrapper, 此處不再獨立 fixed.
          參見 line ~422-486 的合併 wrapper */}

      {/* Map column — fixed 320 wide, centered, scrollable */}
      {loading ? (
        // v2.0.B.282: Loading 用 paw pulse, Coming soon 用 Mochi bounce — animation 取代文字
        <div style={{ textAlign: 'center', padding: 60 }}>
          <img src="/mascots/node-paw.webp" width={56} height={56} alt="" className="pickup-pulse" style={{ display: 'inline-block' }} />
        </div>
      ) : lessons.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <img src="/mascots/calico-anchor.webp" width={96} height={96} alt="" className="pickup-bounce" style={{ display: 'inline-block', borderRadius: '50%' }} />
        </div>
      ) : (
        <div style={{
          width: CONTAINER_W, margin: '20px auto 80px', position: 'relative',
          // v2.0.B.290 ROOT FIX: container height 預固定 MAX_EXPECTED_STREAM, 不依 stream.length 變
          // 之前 progressive load (Ch1 → Ch2-31 setLessons) 會讓 container 從 2496 → 22000 突跳 19488px
          // → browser scroll-anchoring 補償 → user 看到 mid-scroll jump.
          // 改用 final size 250 (預期 217 lesson + 43 chest, round up safety) × NODE_PITCH 從 mount 就到位.
          // stream 之後 fill 進來不再改 container 高度 = browser 從未看到 height change = 不跳.
          height: Math.max(2032, 280 * NODE_PITCH) + NODE_HEIGHT + 80 + totalChapterGap,
          overflowAnchor: 'none',
          contain: 'layout' as const,
        }}>
          {/* Grandma (cat anchor) — follows currentNodeIdx via positioning algorithm */}
          {catPos && (
            <div
              style={{
                position: 'absolute',
                left: 0, top: 0,
                width: CAT_W, height: CAT_H,
                pointerEvents: 'none', zIndex: 5,
                transform: `translate(${catPos.x}px, ${catPos.y + catOffsetY}px)`,
                transformOrigin: '50% 100%',
                // v2.0.B.290: 砍 cubic-bezier overshoot (1.5 = 50% 超出後彈回). iOS Safari 對 transform overshoot
                // 在 scroll 同時觸發 viewport repaint, 已知 jitter. 改 ease-out 400ms 短暫且不超目標.
                transition: 'transform 400ms ease-out',
                willChange: 'auto',
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

          {/* v2.0.B.270 virtualization + chest interleave: 每 5 lesson 一個 🎁 寶箱 */}
          {/* v2.0.B.292 NUCLEAR TEST: 砍虛擬化, render 全部 stream nodes.
              9+ patch 失敗後決定性測試 — 若跳消失 = 虛擬化 mount/unmount 是 root.
              若仍跳 = browser inherent issue (WebKit Bug #297779 等), 接受 platform 限制.
              MapNode 已 React.memo + props 穩定, scroll 期間 0 re-render, 260 node DOM ~50KB. */}
          {stream.map((item, localIdx) => {
            const i = localIdx;
            const slot = getNodeSlot(i);
            const nodeTop = slot.top + (chapterOffsets[i] ?? 0);
            const leftPx = CONTAINER_W / 2 - NODE_SIZE / 2 + slot.dx;

            // v2.0.B.271: 寶箱 — 純 🎁 emoji, 無按鈕 chrome (user: 「寶箱不要用按鈕 直接用那個寶箱」)
            // v2.0.B.274 fix: 不再 window.location.reload() — 用 chestTick state 觸發 re-render
            // 保留 scroll position, 避免被當成跳頂主源
            if (item.kind === 'chest') {
              const chestKey = `pickup.chest.${i}.opened`;
              const opened = openedChests.has(i);
              return (
                <button
                  key={`chest-${i}`}
                  type="button"
                  aria-label={opened ? '寶箱 (已開啟)' : '寶箱 (+10 金幣)'}
                  onClick={() => {
                    if (opened) return;
                    try {
                      localStorage.setItem(chestKey, '1');
                      // v2.0.B.306 fix: 原寫 'pickup.coins' (孤兒 key) → readCoins 讀 'pickup.coins.total', +10 從沒進帳. 改用 addCoins.
                      addCoins(10);
                      // v2.0.B.308 (P2): 鏡像給 server (idempotent per chest)
                      if (isBackendLive()) void serverOpenChest(String(i));
                    } catch {}
                    setOpenedChests(prev => new Set(prev).add(i));
                    setChestTick(t => t + 1); // trigger HUD coin re-read
                  }}
                  style={{
                    position: 'absolute',
                    left: leftPx, top: nodeTop,
                    width: NODE_SIZE, height: NODE_HEIGHT,
                    background: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    cursor: opened ? 'default' : 'pointer',
                    fontSize: 56, lineHeight: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'inherit', padding: 0,
                    touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
                    zIndex: 2,
                    opacity: opened ? 0.45 : 1,
                    filter: opened ? 'grayscale(0.7)' : 'none',
                    transform: opened ? 'scale(0.92)' : 'none',
                    transition: 'transform 120ms ease, opacity 200ms ease',
                  }}
                >
                  {opened ? '✨' : '🎁'}
                </button>
              );
            }

            // v2.0.B.275: Lesson 節點 — primitive props 給 <MapNode> React.memo bail-out
            // 用 completedByChapter map 不再 per-lesson localStorage read (217× → 1× per render)
            const l = lessons[item.lessonIdx!];
            const lessonChapter = isAggregate ? l.chapter : chapter;
            const chMeta = CHAPTER_META[lessonChapter] ?? CHAPTER_META[1];
            const lessonCompletedSet = completedByChapter.get(lessonChapter) ?? new Set<string>();
            const done = lessonCompletedSet.has(l.id);
            const unlocked = isLessonUnlocked(lessonChapter, l.lessonInChapter, lessonCompletedSet.size);
            const inProgress = unlocked && !done && inProgressIds.has(l.id);
            // v2.0.B.318 (per user): 未完成且解鎖的節點 = 該章專屬色 (done 仍金星, locked 仍灰) → 整段路徑跟故事變色
            const baseColor = done ? COLOR_NODE_DONE : unlocked ? chMeta.accent : COLOR_NODE_LOCKED;
            const shadowColor = done ? COLOR_NODE_DONE_DARK : unlocked ? darken(chMeta.accent, 0.30) : COLOR_NODE_LOCKED_DARK;
            const iconSrc = done ? '/mascots/node-star.webp' : '/mascots/node-paw.webp';
            const iconFilter = !unlocked && !done ? 'grayscale(1)' : 'none';
            const iconOpacity = !unlocked && !done ? 0.65 : 1;
            const isPressed = pressedId === l.id;
            const isCurrent = i === currentNodeIdx;
            const restShadow = `inset 0 8px 0 ${lighten(baseColor, 0.20)}, 0 10px 0 ${shadowColor}`;
            const pressShadow = `inset 0 8px 0 ${lighten(baseColor, 0.20)}, 0 3px 0 ${shadowColor}`;
            // v2.0.B.315: 章節分隔標 — aggregate 模式每章第一關上方放「CH N · 標題」.
            // 跟著捲動 (絕對定位在 scroll 容器內, 非 fixed) → 滑動中 0 mutation = 不會跳;
            // 取代 B.313 拿掉的「書封跟滑動換章」, 讓玩家滑到哪章看得出來.
            const showChapterLabel = isAggregate && l.lessonInChapter === 1 && i > 0;
            // v2.0.B.301 (cron ui-ux D1): pre-session time signal — 22s/Q (3s auto-advance + ~19s read/answer, A2-conservative)
            const estMin = Math.max(1, Math.ceil(l.questions.length * 22 / 60));
            const ariaLabel = `${l.storyBeat ?? `Lesson ${l.lessonInChapter}`} · ~${estMin}min${unlocked ? '' : ' (locked)'}${inProgress ? ' (in progress)' : ''}${isCurrent ? ' (current)' : ''}`;
            return (
              <Fragment key={l.id}>
              {showChapterLabel && (
                // v2.0.B.317 (per user): 分隔線延伸到螢幕邊緣 (100vw 突破 320 容器) + 更粗更透明 + 英文章名.
                <div style={{
                  position: 'absolute', left: '50%', width: '100vw', transform: 'translateX(-50%)',
                  top: nodeTop - CH_GAP / 2,
                  display: 'flex', alignItems: 'center', gap: 12,
                  pointerEvents: 'none', zIndex: 4,
                }}>
                  <div style={{ flex: 1, height: 3, background: chMeta.accent, opacity: 0.38, borderRadius: 3 }} />
                  <div style={{
                    flex: '0 0 auto', color: chMeta.accent,
                    fontSize: 13, fontWeight: 900, letterSpacing: 0.3, whiteSpace: 'nowrap',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}><span style={{ fontSize: 18 }} aria-hidden="true">{chMeta.emoji}</span>CH {lessonChapter} · {chMeta.titleEn}</div>
                  <div style={{ flex: 1, height: 3, background: chMeta.accent, opacity: 0.38, borderRadius: 3 }} />
                </div>
              )}
              <MapNode
                lessonId={l.id}
                chapter={lessonChapter}
                ariaLabel={ariaLabel}
                leftPx={leftPx}
                top={nodeTop}
                size={NODE_SIZE}
                height={NODE_HEIGHT}
                done={done}
                inProgress={inProgress}
                unlocked={unlocked}
                isCurrent={isCurrent}
                isPressed={isPressed}
                baseColor={baseColor}
                iconSrc={iconSrc}
                iconFilter={iconFilter}
                iconOpacity={iconOpacity}
                restShadow={restShadow}
                pressShadow={pressShadow}
                onTap={handleLessonTap}
                onPressDown={handlePressDown}
                onPressEnd={handlePressEnd}
                innerRef={isCurrent ? currentNodeRef : undefined}
              />
              </Fragment>
            );
          })}
        </div>
      )}

      {/* Key Sentences overlay */}
      {showKeySheet && (
        <KeySentencesSheet
          chapter={displayChapter}
          titleEn={meta.titleEn}
          onClose={() => setShowKeySheet(false)}
        />
      )}

    </div>
  );
}
