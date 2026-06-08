/**
 * v2.0.B.263 — 章節頁改成「故事圖鑑」(Story Collection)
 * User: 「章節頁面放到圖鑑裡, 完成亮幾趴, 全部完成搜集成功, 可分類 (東方/西方/小故事/大故事), 裡面還有小類」
 *
 * 雙層分類:
 *   大類 tab: 全部 / 東方 / 西方 / 寓言 / 大故事 / 序章
 *   小類 section: 日本童話 / 中華神話 / 中華歷史 / 格林 / 安徒生 / 希臘史詩 / etc.
 *
 * 每章卡片:
 *   - emoji 大 icon (圖鑑封面感)
 *   - #N section badge
 *   - 中文標題
 *   - 進度 N/7 + %% (unlocked 但未完成)
 *   - ✓ 搜集 stamp (7/7 完成)
 *   - 🔒 + grayscale (前章未完成)
 *
 * 頂部 hero card: 已搜集 X / 31 + 進度條 + 完成 %
 *
 * Progression unlock (B.262 沿用): Ch1 永遠 unlock, ChN 看 readCompletedLessons(N-1).size >= 7
 */
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { readCompletedLessons } from '../../store/runStore';

type Category = 'all' | 'east' | 'west' | 'fable' | 'mid-long' | 'special';

const TABS: Array<{ id: Category; label: string }> = [
  { id: 'all', label: '📚 全部' },
  { id: 'east', label: '🌏 東方' },
  { id: 'west', label: '🌍 西方' },
  { id: 'fable', label: '🦊 寓言' },
  { id: 'mid-long', label: '🌟 大故事' },
  { id: 'special', label: '📖 序章' },
];

interface ChapterMeta {
  id: number;
  titleZh: string;
  titleEn: string;
  emoji: string;
  category: Category;
  subCat: string;
}

const CHAPTERS: ChapterMeta[] = [
  { id: 1, titleZh: '院子裡的第一個故事', titleEn: 'A Story in the Yard', emoji: '📖', category: 'special', subCat: '序章' },
  { id: 2, titleZh: '桃太郎', titleEn: 'Momotaro', emoji: '🍑', category: 'east', subCat: '日本童話' },
  { id: 3, titleZh: '醜小鴨', titleEn: 'The Ugly Duckling', emoji: '🦢', category: 'west', subCat: '安徒生' },
  { id: 4, titleZh: '龜兔賽跑', titleEn: 'Tortoise and Hare', emoji: '🐢', category: 'fable', subCat: '伊索寓言' },
  { id: 5, titleZh: '駱駝為什麼有駝峰', titleEn: 'How the Camel Got Its Hump', emoji: '🐪', category: 'fable', subCat: '吉卜林' },
  { id: 6, titleZh: 'Baba Yaga 雞腳屋', titleEn: 'Baba Yaga', emoji: '🏚️', category: 'west', subCat: '斯拉夫民俗' },
  { id: 7, titleZh: '六隻天鵝', titleEn: 'The Six Swans', emoji: '🦢', category: 'west', subCat: '格林兄弟' },
  { id: 8, titleZh: '葉限', titleEn: 'Ye Xian', emoji: '👠', category: 'east', subCat: '中華神話' },
  { id: 9, titleZh: '灰姑娘', titleEn: 'Cinderella', emoji: '👗', category: 'west', subCat: '佩羅' },
  { id: 10, titleZh: '嫦娥奔月', titleEn: 'Chang E Flies to the Moon', emoji: '🌙', category: 'east', subCat: '中華神話' },
  { id: 11, titleZh: '后羿射日', titleEn: 'Hou Yi Shoots the Suns', emoji: '☀️', category: 'east', subCat: '中華神話' },
  { id: 12, titleZh: '牛郎織女', titleEn: 'The Cowherd and the Weaver Girl', emoji: '🌌', category: 'east', subCat: '中華神話' },
  { id: 13, titleZh: '小紅帽', titleEn: 'Little Red Riding Hood', emoji: '🐺', category: 'west', subCat: '格林兄弟' },
  { id: 14, titleZh: '浦島太郎', titleEn: 'Urashima Taro', emoji: '🐢', category: 'east', subCat: '日本童話' },
  { id: 15, titleZh: '國王的新衣', titleEn: "The Emperor's New Clothes", emoji: '👑', category: 'west', subCat: '安徒生' },
  { id: 16, titleZh: '一寸法師', titleEn: 'Issun-boshi', emoji: '🍱', category: 'east', subCat: '日本童話' },
  { id: 17, titleZh: '鶴的報恩', titleEn: "The Crane's Return", emoji: '🕊️', category: 'east', subCat: '日本童話' },
  { id: 18, titleZh: '興夫和孬夫', titleEn: 'Heungbu and Nolbu', emoji: '🌾', category: 'east', subCat: '韓國民間' },
  { id: 19, titleZh: 'Sang Kancil 與鱷魚', titleEn: 'Sang Kancil', emoji: '🐊', category: 'east', subCat: '東南亞' },
  { id: 20, titleZh: '蘿蔔大冒險', titleEn: 'The Enormous Turnip', emoji: '🥕', category: 'west', subCat: '斯拉夫民俗' },
  { id: 21, titleZh: 'Anansi 蜘蛛', titleEn: 'Anansi the Spider', emoji: '🕷️', category: 'fable', subCat: '非洲寓言' },
  { id: 22, titleZh: '孟母三遷', titleEn: "Mencius's Mother", emoji: '🏠', category: 'east', subCat: '中華歷史' },
  { id: 23, titleZh: '司馬光砸缸', titleEn: 'Sima Guang', emoji: '🪨', category: 'east', subCat: '中華歷史' },
  { id: 24, titleZh: '孔融讓梨', titleEn: 'Kong Rong', emoji: '🍐', category: 'east', subCat: '中華歷史' },
  { id: 25, titleZh: '愚公移山', titleEn: 'The Foolish Old Man', emoji: '🏔️', category: 'east', subCat: '中華神話' },
  { id: 26, titleZh: 'Archimedes 尤里卡', titleEn: 'Archimedes Eureka', emoji: '💡', category: 'west', subCat: '希臘歷史' },
  { id: 27, titleZh: '西遊記·取經出發', titleEn: 'Journey to the West', emoji: '🐒', category: 'mid-long', subCat: '中華史詩' },
  { id: 28, titleZh: '諸葛亮·三顧茅廬', titleEn: "Zhuge Liang", emoji: '🏯', category: 'mid-long', subCat: '中華史詩' },
  { id: 29, titleZh: '奧德賽·出航回家', titleEn: 'The Odyssey', emoji: '⛵', category: 'mid-long', subCat: '希臘史詩' },
  { id: 30, titleZh: '赫拉克勒斯·尼米亞獅子', titleEn: 'Heracles', emoji: '🦁', category: 'mid-long', subCat: '希臘史詩' },
  { id: 31, titleZh: 'Robin Hood·Sherwood', titleEn: 'Robin Hood', emoji: '🏹', category: 'mid-long', subCat: '英雄傳奇' },
];

function isChapterUnlocked(chId: number): boolean {
  if (chId === 1) return true;
  return readCompletedLessons(chId - 1).size >= 7;
}

export default function ChaptersPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Category>('all');

  const filtered = useMemo(
    () => tab === 'all' ? CHAPTERS : CHAPTERS.filter(ch => ch.category === tab),
    [tab]
  );

  // Group by subCat (preserve insertion order)
  const grouped = useMemo(() => {
    const groups: Record<string, ChapterMeta[]> = {};
    for (const ch of filtered) {
      if (!groups[ch.subCat]) groups[ch.subCat] = [];
      groups[ch.subCat].push(ch);
    }
    return groups;
  }, [filtered]);

  // Collection stats — re-compute each render (cheap, 31 localStorage reads)
  const completedCount = CHAPTERS.filter(ch => readCompletedLessons(ch.id).size >= 7).length;
  const totalPercent = Math.round((completedCount / CHAPTERS.length) * 100);

  return (
    <div style={{ padding: '14px 14px 24px', maxWidth: 640, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 14, textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: '#3c2a1c' }}>📖 故事圖鑑</h1>
        <div style={{ fontSize: 12, color: '#8b6f4a', marginTop: 4, letterSpacing: 1 }}>Story Collection · 31 章</div>
      </div>

      {/* Collection stats hero card */}
      <div style={{
        background: 'linear-gradient(135deg, #fef8ed 0%, #fff7e8 100%)',
        border: '2px solid #e7a44a',
        borderBottom: '4px solid #b07a2a',
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 13, color: '#8b6f4a', fontWeight: 700, marginBottom: 6 }}>已搜集</div>
        <div style={{ fontSize: 38, fontWeight: 900, color: '#3c2a1c', lineHeight: 1 }}>
          {completedCount}<span style={{ fontSize: 18, color: '#8b6f4a', fontWeight: 700 }}> / {CHAPTERS.length}</span>
        </div>
        <div style={{ fontSize: 12, color: '#7a5e25', marginTop: 6, fontWeight: 700 }}>
          {totalPercent}% 完成
        </div>
        <div style={{ marginTop: 10, height: 8, background: '#fef3c7', borderRadius: 4, overflow: 'hidden' }}>
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

      {/* Category tabs (horizontal scroll) */}
      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        marginBottom: 14,
        padding: '4px 0',
        WebkitOverflowScrolling: 'touch',
      }}>
        {TABS.map(t => {
          const count = t.id === 'all'
            ? CHAPTERS.length
            : CHAPTERS.filter(c => c.category === t.id).length;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: '0 0 auto',
                padding: '8px 14px',
                background: tab === t.id ? '#e7a44a' : '#fff7e8',
                color: tab === t.id ? '#fff' : '#8b6f4a',
                border: tab === t.id ? 'none' : '1px solid #c8a878',
                borderBottom: tab === t.id ? '3px solid #b07a2a' : '1px solid #c8a878',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
              }}
            >
              {t.label} <span style={{ opacity: 0.75, fontWeight: 700 }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Grouped chapter list by sub-category */}
      {Object.entries(grouped).map(([subCat, chapters]) => {
        const subCompleted = chapters.filter(ch => readCompletedLessons(ch.id).size >= 7).length;
        return (
          <div key={subCat} style={{ marginBottom: 20 }}>
            <h2 style={{
              margin: '0 0 10px',
              fontSize: 14,
              fontWeight: 900,
              color: '#7a5e25',
              paddingLeft: 8,
              borderLeft: '4px solid #e7a44a',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span>{subCat}</span>
              <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.75 }}>
                {subCompleted} / {chapters.length}
              </span>
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: 10,
            }}>
              {chapters.map(ch => {
                const unlocked = isChapterUnlocked(ch.id);
                const completed = readCompletedLessons(ch.id).size;
                const isComplete = completed >= 7;
                const pct = Math.round((completed / 7) * 100);
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      if (!unlocked) return;
                      const seen = (() => { try { return localStorage.getItem(`pickup.chapter.${ch.id}.intro.seen`) === '1'; } catch { return false; } })();
                      navigate(seen ? `/map?ch=${ch.id}` : `/chapter/${ch.id}/intro`);
                    }}
                    disabled={!unlocked}
                    aria-label={`Section ${ch.id} ${ch.titleZh}${isComplete ? ' completed' : unlocked ? ` ${pct} percent` : ' locked'}`}
                    style={{
                      minHeight: 160,
                      background: isComplete ? '#eaf6d5' : unlocked ? '#fff7e8' : '#e8dec8',
                      border: `2px solid ${isComplete ? '#7d9a4f' : unlocked ? '#e7a44a' : '#c8a878'}`,
                      borderBottom: `4px solid ${isComplete ? '#5d7a35' : unlocked ? '#b07a2a' : '#8b6f4a'}`,
                      borderRadius: 14,
                      padding: '12px 8px 10px',
                      color: unlocked ? '#3c2a1c' : '#8b6f4a',
                      cursor: unlocked ? 'pointer' : 'not-allowed',
                      fontFamily: 'inherit',
                      opacity: unlocked ? 1 : 0.55,
                      filter: unlocked ? 'none' : 'grayscale(0.6)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      position: 'relative',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                    }}
                  >
                    {/* Top: section badge */}
                    <div style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: isComplete ? '#5d7a35' : unlocked ? '#b07a2a' : '#8b6f4a',
                      letterSpacing: 0.5,
                    }}>
                      #{ch.id.toString().padStart(2, '0')}
                    </div>
                    {/* Middle: emoji big */}
                    <div style={{ fontSize: 42, lineHeight: 1, margin: '6px 0' }}>
                      {unlocked ? ch.emoji : '🔒'}
                    </div>
                    {/* Bottom: title */}
                    <div style={{
                      fontSize: 11,
                      fontWeight: 900,
                      lineHeight: 1.3,
                      textAlign: 'center',
                      minHeight: 28,
                    }}>
                      {ch.titleZh}
                    </div>
                    {/* Progress or stamp */}
                    {isComplete && (
                      <div style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        background: '#7d9a4f',
                        color: '#fff',
                        fontSize: 9,
                        fontWeight: 900,
                        padding: '2px 6px',
                        borderRadius: 999,
                        letterSpacing: 0.3,
                      }}>
                        ✓ 搜集
                      </div>
                    )}
                    {unlocked && !isComplete && completed > 0 && (
                      <div style={{
                        fontSize: 10,
                        color: '#b07a2a',
                        fontWeight: 800,
                        marginTop: 2,
                      }}>
                        {completed}/7 · {pct}%
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
