/**
 * v2.0.B.264 — 章節首頁改成「故事地圖」(Duolingo-style winding path)
 * User: 「一點進去是故事圖鑑, 但我要的是地圖」
 *
 * 設計:
 *   - 31 顆章節節點蜿蜒排列 (sine-wave dx 偏移 + 100px 垂直間距)
 *   - 每節點 = 圓形 button (70x70) 含 emoji + section badge + 三態
 *   - Section 分類分組 (序章 / 東方 / 西方 / 寓言 / 大故事), 每組標題 chip 隔開
 *   - 頂部 hero stats card (已搜集 N/31 + % + progress bar)
 *   - Progression unlock (B.262 沿用): Ch1 永遠 unlock, ChN 需前章 7 lesson 全 done
 *
 * 三態:
 *   locked   🔒 grey + opacity 0.55 + grayscale 0.6
 *   unlocked amber circle + 進度 N/7+% (有 progress 才顯)
 *   complete olive circle + ⭐ + ✓ 搜集 stamp
 */
import { useNavigate } from 'react-router-dom';
import { readCompletedLessons } from '../../store/runStore';

interface ChapterMeta {
  id: number;
  titleZh: string;
  titleEn: string;
  emoji: string;
  group: string; // 序章 / 東方 / 西方 / 寓言 / 大故事
  subCat: string; // 日本童話 / 中華神話 / etc.
}

const CHAPTERS: ChapterMeta[] = [
  { id: 1, titleZh: '院子裡的第一個故事', titleEn: 'A Story in the Yard', emoji: '📖', group: '序章', subCat: '序章' },
  // 東方
  { id: 2, titleZh: '桃太郎', titleEn: 'Momotaro', emoji: '🍑', group: '東方', subCat: '日本童話' },
  { id: 14, titleZh: '浦島太郎', titleEn: 'Urashima Taro', emoji: '🐢', group: '東方', subCat: '日本童話' },
  { id: 16, titleZh: '一寸法師', titleEn: 'Issun-boshi', emoji: '🍱', group: '東方', subCat: '日本童話' },
  { id: 17, titleZh: '鶴的報恩', titleEn: "The Crane's Return", emoji: '🕊️', group: '東方', subCat: '日本童話' },
  { id: 18, titleZh: '興夫和孬夫', titleEn: 'Heungbu and Nolbu', emoji: '🌾', group: '東方', subCat: '韓國民間' },
  { id: 8, titleZh: '葉限', titleEn: 'Ye Xian', emoji: '👠', group: '東方', subCat: '中華神話' },
  { id: 10, titleZh: '嫦娥奔月', titleEn: 'Chang E Flies to the Moon', emoji: '🌙', group: '東方', subCat: '中華神話' },
  { id: 11, titleZh: '后羿射日', titleEn: 'Hou Yi Shoots the Suns', emoji: '☀️', group: '東方', subCat: '中華神話' },
  { id: 12, titleZh: '牛郎織女', titleEn: 'The Cowherd and the Weaver Girl', emoji: '🌌', group: '東方', subCat: '中華神話' },
  { id: 25, titleZh: '愚公移山', titleEn: 'The Foolish Old Man', emoji: '🏔️', group: '東方', subCat: '中華神話' },
  { id: 22, titleZh: '孟母三遷', titleEn: "Mencius's Mother", emoji: '🏠', group: '東方', subCat: '中華歷史' },
  { id: 23, titleZh: '司馬光砸缸', titleEn: 'Sima Guang', emoji: '🪨', group: '東方', subCat: '中華歷史' },
  { id: 24, titleZh: '孔融讓梨', titleEn: 'Kong Rong', emoji: '🍐', group: '東方', subCat: '中華歷史' },
  { id: 19, titleZh: 'Sang Kancil 與鱷魚', titleEn: 'Sang Kancil', emoji: '🐊', group: '東方', subCat: '東南亞' },
  // 西方
  { id: 3, titleZh: '醜小鴨', titleEn: 'The Ugly Duckling', emoji: '🦢', group: '西方', subCat: '安徒生' },
  { id: 15, titleZh: '國王的新衣', titleEn: "The Emperor's New Clothes", emoji: '👑', group: '西方', subCat: '安徒生' },
  { id: 7, titleZh: '六隻天鵝', titleEn: 'The Six Swans', emoji: '🦢', group: '西方', subCat: '格林兄弟' },
  { id: 13, titleZh: '小紅帽', titleEn: 'Little Red Riding Hood', emoji: '🐺', group: '西方', subCat: '格林兄弟' },
  { id: 9, titleZh: '灰姑娘', titleEn: 'Cinderella', emoji: '👗', group: '西方', subCat: '佩羅' },
  { id: 6, titleZh: 'Baba Yaga 雞腳屋', titleEn: 'Baba Yaga', emoji: '🏚️', group: '西方', subCat: '斯拉夫民俗' },
  { id: 20, titleZh: '蘿蔔大冒險', titleEn: 'The Enormous Turnip', emoji: '🥕', group: '西方', subCat: '斯拉夫民俗' },
  { id: 26, titleZh: 'Archimedes 尤里卡', titleEn: 'Archimedes Eureka', emoji: '💡', group: '西方', subCat: '希臘歷史' },
  // 寓言
  { id: 4, titleZh: '龜兔賽跑', titleEn: 'Tortoise and Hare', emoji: '🐢', group: '寓言', subCat: '伊索寓言' },
  { id: 5, titleZh: '駱駝為什麼有駝峰', titleEn: 'How the Camel Got Its Hump', emoji: '🐪', group: '寓言', subCat: '吉卜林' },
  { id: 21, titleZh: 'Anansi 蜘蛛', titleEn: 'Anansi the Spider', emoji: '🕷️', group: '寓言', subCat: '非洲寓言' },
  // 大故事 (mid-long)
  { id: 27, titleZh: '西遊記·取經出發', titleEn: 'Journey to the West', emoji: '🐒', group: '大故事', subCat: '中華史詩' },
  { id: 28, titleZh: '諸葛亮·三顧茅廬', titleEn: "Zhuge Liang", emoji: '🏯', group: '大故事', subCat: '中華史詩' },
  { id: 29, titleZh: '奧德賽·出航回家', titleEn: 'The Odyssey', emoji: '⛵', group: '大故事', subCat: '希臘史詩' },
  { id: 30, titleZh: '赫拉克勒斯·尼米亞獅子', titleEn: 'Heracles', emoji: '🦁', group: '大故事', subCat: '希臘史詩' },
  { id: 31, titleZh: 'Robin Hood·Sherwood', titleEn: 'Robin Hood', emoji: '🏹', group: '大故事', subCat: '英雄傳奇' },
];

const GROUP_ORDER = ['序章', '東方', '西方', '寓言', '大故事'];
const GROUP_META: Record<string, { emoji: string; color: string }> = {
  序章: { emoji: '📖', color: '#8b6f4a' },
  東方: { emoji: '🌏', color: '#c8835f' },
  西方: { emoji: '🌍', color: '#6a7d8f' },
  寓言: { emoji: '🦊', color: '#e7a44a' },
  大故事: { emoji: '🌟', color: '#8a6ea8' },
};

function isChapterUnlocked(chId: number): boolean {
  if (chId === 1) return true;
  return readCompletedLessons(chId - 1).size >= 7;
}

// Sine-wave horizontal offset for winding path (returns dx in pixels)
function nodeDx(idxInGroup: number): number {
  return Math.round(Math.sin(idxInGroup * 0.7) * 75);
}

export default function ChaptersPage() {
  const navigate = useNavigate();
  const completedCount = CHAPTERS.filter(ch => readCompletedLessons(ch.id).size >= 7).length;
  const totalPercent = Math.round((completedCount / CHAPTERS.length) * 100);

  // Group chapters by `group` field, preserve declared order
  const byGroup: Record<string, ChapterMeta[]> = {};
  for (const ch of CHAPTERS) {
    if (!byGroup[ch.group]) byGroup[ch.group] = [];
    byGroup[ch.group].push(ch);
  }

  return (
    <div style={{ padding: '14px 14px 80px', maxWidth: 480, margin: '0 auto' }}>
      {/* Hero header */}
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: '#3c2a1c' }}>🗺️ 故事地圖</h1>
        <div style={{ fontSize: 12, color: '#8b6f4a', marginTop: 4, letterSpacing: 1 }}>Story Map · 31 章</div>
      </div>

      {/* Collection stats hero */}
      <div style={{
        background: 'linear-gradient(135deg, #fef8ed 0%, #fff7e8 100%)',
        border: '2px solid #e7a44a',
        borderBottom: '4px solid #b07a2a',
        borderRadius: 14,
        padding: 14,
        marginBottom: 18,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 13, color: '#8b6f4a', fontWeight: 700, marginBottom: 6 }}>已搜集</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: '#3c2a1c', lineHeight: 1 }}>
          {completedCount}<span style={{ fontSize: 18, color: '#8b6f4a', fontWeight: 700 }}> / {CHAPTERS.length}</span>
        </div>
        <div style={{ fontSize: 12, color: '#7a5e25', marginTop: 6, fontWeight: 700 }}>
          {totalPercent}% 完成
        </div>
        <div style={{ marginTop: 8, height: 7, background: '#fef3c7', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${totalPercent}%`,
            background: 'linear-gradient(90deg, #e7a44a 0%, #7d9a4f 100%)',
            transition: 'width 0.6s ease',
          }} />
        </div>
        {completedCount === CHAPTERS.length && (
          <div style={{ marginTop: 10, fontSize: 14, fontWeight: 900, color: '#5d7a35' }}>
            🎉 全圖鑑搜集完成!
          </div>
        )}
      </div>

      {/* Winding map by group */}
      {GROUP_ORDER.map(g => {
        const chapters = byGroup[g] ?? [];
        if (chapters.length === 0) return null;
        const groupCompleted = chapters.filter(ch => readCompletedLessons(ch.id).size >= 7).length;
        const meta = GROUP_META[g];
        return (
          <div key={g} style={{ marginBottom: 24 }}>
            {/* Group section header chip */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: `${meta.color}22`,
              border: `2px solid ${meta.color}`,
              borderRadius: 999,
              padding: '6px 14px',
              marginBottom: 16,
              maxWidth: 280,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: meta.color }}>
                {meta.emoji} {g}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: meta.color, opacity: 0.85 }}>
                {groupCompleted} / {chapters.length}
              </span>
            </div>

            {/* Winding chapter nodes in this group */}
            <div style={{ position: 'relative' }}>
              {chapters.map((ch, i) => {
                const unlocked = isChapterUnlocked(ch.id);
                const completed = readCompletedLessons(ch.id).size;
                const isComplete = completed >= 7;
                const pct = Math.round((completed / 7) * 100);
                const dx = nodeDx(i);

                return (
                  <div key={ch.id} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    marginBottom: 18,
                    transform: `translateX(${dx}px)`,
                    transition: 'transform 0.3s ease',
                  }}>
                    {/* Connector line to next node (dashed) */}
                    {i < chapters.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        width: 2,
                        height: 22,
                        background: 'transparent',
                        borderLeft: '2px dashed #c8a878',
                        marginTop: 92,
                        opacity: 0.5,
                        zIndex: -1,
                      }} />
                    )}
                    {/* Chapter button */}
                    <button
                      onClick={() => {
                        if (!unlocked) return;
                        const seen = (() => { try { return localStorage.getItem(`pickup.chapter.${ch.id}.intro.seen`) === '1'; } catch { return false; } })();
                        navigate(seen ? `/map?ch=${ch.id}` : `/chapter/${ch.id}/intro`);
                      }}
                      disabled={!unlocked}
                      aria-label={`Section ${ch.id} ${ch.titleZh}${isComplete ? ' completed' : unlocked ? ` ${pct} percent` : ' locked'}`}
                      style={{
                        width: 74,
                        height: 74,
                        borderRadius: '50%',
                        background: isComplete ? '#eaf6d5' : unlocked ? '#fff7e8' : '#e8dec8',
                        border: `3px solid ${isComplete ? '#7d9a4f' : unlocked ? '#e7a44a' : '#c8a878'}`,
                        borderBottom: `6px solid ${isComplete ? '#5d7a35' : unlocked ? '#b07a2a' : '#8b6f4a'}`,
                        fontSize: 32,
                        cursor: unlocked ? 'pointer' : 'not-allowed',
                        opacity: unlocked ? 1 : 0.55,
                        filter: unlocked ? 'none' : 'grayscale(0.6)',
                        position: 'relative',
                        fontFamily: 'inherit',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation',
                      }}
                    >
                      {unlocked ? ch.emoji : '🔒'}
                      {/* #N badge */}
                      <div style={{
                        position: 'absolute',
                        top: -6,
                        right: -6,
                        background: '#fff7e8',
                        color: '#b07a2a',
                        fontSize: 9,
                        fontWeight: 900,
                        padding: '2px 6px',
                        borderRadius: 999,
                        border: '1px solid #c8a878',
                        letterSpacing: 0.3,
                      }}>
                        #{ch.id}
                      </div>
                      {/* ✓ search stamp */}
                      {isComplete && (
                        <div style={{
                          position: 'absolute',
                          bottom: -6,
                          right: -6,
                          background: '#7d9a4f',
                          color: '#fff',
                          fontSize: 9,
                          fontWeight: 900,
                          padding: '2px 6px',
                          borderRadius: 999,
                          letterSpacing: 0.3,
                        }}>
                          ✓
                        </div>
                      )}
                    </button>
                    {/* Title below */}
                    <div style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: unlocked ? '#3c2a1c' : '#8b6f4a',
                      textAlign: 'center',
                      maxWidth: 120,
                      lineHeight: 1.3,
                      marginTop: 2,
                    }}>
                      {ch.titleZh}
                    </div>
                    {/* Sub-cat tag */}
                    <div style={{
                      fontSize: 9,
                      color: '#8b6f4a',
                      opacity: 0.7,
                      fontWeight: 600,
                    }}>
                      {ch.subCat}
                    </div>
                    {/* Progress mini */}
                    {unlocked && !isComplete && completed > 0 && (
                      <div style={{
                        fontSize: 10,
                        color: '#b07a2a',
                        fontWeight: 800,
                        background: '#fff7e8',
                        padding: '2px 8px',
                        borderRadius: 999,
                        border: '1px solid #c8a878',
                      }}>
                        {completed}/7 · {pct}%
                      </div>
                    )}
                    {isComplete && (
                      <div style={{
                        fontSize: 10,
                        color: '#5d7a35',
                        fontWeight: 900,
                        background: '#eaf6d5',
                        padding: '2px 8px',
                        borderRadius: 999,
                        border: '1px solid #7d9a4f',
                      }}>
                        ✓ 搜集成功
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
