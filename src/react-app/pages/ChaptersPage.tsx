/**
 * v2.0.B.265 — 故事圖鑑 grid pokedex (從首頁移到 /chapters 子頁)
 *
 * User 確認: 「圖鑑沒有走錯方向只是他不應該在首頁」
 * 所以保留 B.263 grid 設計, 只是現在 / → InfiniteMapPage, /chapters → 本頁圖鑑
 *
 * 設計 (沿用 B.263):
 *   - 頂部 hero card (已搜集 N/31 + % + gradient progress bar)
 *   - 6 大類 tab (📚 全部 / 🌏 東方 / 🌍 西方 / 🦊 寓言 / 🌟 大故事 / 📖 序章)
 *   - 17 個小類 sub-cat section (日本/中華神話/格林/希臘史詩 等)
 *   - 31 pokedex 卡 (4 列 grid)
 *     #N badge + 42px emoji + 中文標題
 *     三態: locked 🔒 / unlocked + 進度 N/7+% / complete ✓ 搜集 olive
 *
 * Progression unlock 沿用 B.262 (Ch1 永遠 unlock, ChN 需前章 7 lesson 全 done)
 */
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { readCompletedLessons } from '../../store/runStore';
import { useT } from '../i18n';

type Category = 'all' | 'east' | 'west' | 'fable' | 'mid-long' | 'special' | 'exam';

const TABS: Array<{ id: Category; label: string }> = [
  { id: 'all', label: '📚 全部' },
  { id: 'east', label: '🌏 東方' },
  { id: 'west', label: '🌍 西方' },
  { id: 'fable', label: '🦊 寓言' },
  { id: 'mid-long', label: '🌟 大故事' },
  { id: 'special', label: '📖 序章' },
  { id: 'exam', label: '🎓 英檢' },
];

interface ChapterMeta {
  id: number;
  titleZh: string;
  titleEn: string;
  emoji: string;
  category: Category;
  subCat: string;
  // v2.0.B.507: 英檢挑戰 entry scaffold — 內容未上前標 coming-soon:
  // 不可點 (無 lessons-chN.json → 不會 404)、不計入故事圖鑑完成度。
  comingSoon?: boolean;
}

const CHAPTERS: ChapterMeta[] = [
  // v2.0.B.487 (per user): Ch0 入門 加進清單最前 (序章 tab + 全部 都看得到), Ch1 改成需 Ch0 完成才解鎖。
  { id: 0, titleZh: '一切的開始', titleEn: 'The Beginning', emoji: '🔤', category: 'special', subCat: '入門' },
  { id: 1, titleZh: '桃太郎', titleEn: 'Momotaro', emoji: '🍑', category: 'east', subCat: '日本童話' },
  { id: 2, titleZh: '醜小鴨', titleEn: 'The Ugly Duckling', emoji: '🦢', category: 'west', subCat: '安徒生' },
  { id: 3, titleZh: '龜兔賽跑', titleEn: 'Tortoise and Hare', emoji: '🐢', category: 'fable', subCat: '伊索寓言' },
  { id: 4, titleZh: '駱駝為什麼有駝峰', titleEn: 'How the Camel Got Its Hump', emoji: '🐪', category: 'fable', subCat: '吉卜林' },
  { id: 5, titleZh: 'Baba Yaga 雞腳屋', titleEn: 'Baba Yaga', emoji: '🏚️', category: 'west', subCat: '斯拉夫民俗' },
  { id: 6, titleZh: '六隻天鵝', titleEn: 'The Six Swans', emoji: '🦢', category: 'west', subCat: '格林兄弟' },
  { id: 7, titleZh: '葉限', titleEn: 'Ye Xian', emoji: '👠', category: 'east', subCat: '中華神話' },
  { id: 8, titleZh: '三隻小豬', titleEn: 'The Three Little Pigs', emoji: '🐷', category: 'west', subCat: '英國童話' },
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
  // v2.0.B.508: 英檢挑戰 — 獨立 track, 一開始就解鎖可選 (不鏈到故事進度), 玩家自己選要不要練。
  // 真內容上線 = lessons-ch32.json (GEPT 初級)。spec: docs/standards/2026-06-29-gept-item-spec.md
  // + 2026-06-29-cambridge-yle-item-spec.md。其餘級別 (YLE / GEPT Kids) 內容備妥後比照新增。
  { id: 32, titleZh: 'GEPT 初級 英檢', titleEn: 'GEPT Elementary', emoji: '📗', category: 'exam', subCat: '全民英檢 GEPT' },
  { id: 33, titleZh: 'YLE Starters 入門', titleEn: 'Cambridge YLE Starters', emoji: '🐣', category: 'exam', subCat: '劍橋兒童英檢 YLE' },
];

// 故事圖鑑完成度只算故事章節 (英檢是獨立 track, 不計入)。
const STORY_CHAPTERS = CHAPTERS.filter((c) => !c.comingSoon && c.category !== 'exam');

// v2.0.B.489: Ch0 擴成 7 關後, 全章節一律 7 關 (跟地圖 gate 一致)。
function chapterTotal(chId: number): number {
  // v2.0.B.514: 英檢 ch32 = 10 關 (其餘故事章固定 7)。
  return chId === 32 ? 10 : 7;
}
function isChapterComplete(chId: number): boolean {
  return readCompletedLessons(chId).size >= chapterTotal(chId);
}
function isChapterUnlocked(chId: number): boolean {
  if (chId <= 0) return true;                 // Ch0 入門永遠開
  return isChapterComplete(chId - 1);          // ChN 需前章全完成
}

export default function ChaptersPage() {
  const navigate = useNavigate();
  const { t } = useT();
  const [tab, setTab] = useState<Category>('all');

  const filtered = useMemo(
    () => tab === 'all' ? CHAPTERS : CHAPTERS.filter(ch => ch.category === tab),
    [tab]
  );

  const grouped = useMemo(() => {
    const groups: Record<string, ChapterMeta[]> = {};
    for (const ch of filtered) {
      if (!groups[ch.subCat]) groups[ch.subCat] = [];
      groups[ch.subCat].push(ch);
    }
    return groups;
  }, [filtered]);

  const completedCount = STORY_CHAPTERS.filter(ch => isChapterComplete(ch.id)).length;
  const totalPercent = Math.round((completedCount / STORY_CHAPTERS.length) * 100);

  return (
    <div style={{ padding: '14px 14px 24px', maxWidth: 640, margin: '0 auto' }}>
      {/* Back nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <button
          onClick={() => navigate(-1)}
          aria-label={t('chapters.back')}
          style={{ background: 'transparent', border: 'none', fontSize: 22, color: 'var(--t-text-muted)', cursor: 'pointer', padding: 4 }}
        >‹</button>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: 'var(--t-text)' }}>{t('chapters.title')}</h1>
      </div>

      {/* Collection stats hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--t-bg) 0%, var(--t-surface-alt) 100%)',
        border: '2px solid var(--t-brand)',
        borderBottom: '4px solid var(--t-brand-dark)',
        borderRadius: 'var(--t-radius-card)',
        padding: 16,
        marginBottom: 14,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 13, color: 'var(--t-text-muted)', fontWeight: 700, marginBottom: 6 }}>{t('chapters.collected')}</div>
        <div style={{ fontSize: 38, fontWeight: 900, color: 'var(--t-text)', lineHeight: 1 }}>
          {completedCount}<span style={{ fontSize: 18, color: 'var(--t-text-muted)', fontWeight: 700 }}> / {STORY_CHAPTERS.length}</span>
        </div>
        <div style={{ fontSize: 12, color: '#7a5e25', marginTop: 6, fontWeight: 700 }}>
          {totalPercent}{t('chapters.pct')}
        </div>
        <div style={{ marginTop: 10, height: 8, background: 'var(--t-tint-warn)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${totalPercent}%`,
            background: 'linear-gradient(90deg, var(--t-brand) 0%, var(--t-success) 100%)',
            transition: 'width 0.6s ease',
          }} />
        </div>
        {completedCount === STORY_CHAPTERS.length && (
          <div style={{ marginTop: 10, fontSize: 14, fontWeight: 900, color: 'var(--t-success)' }}>
            {t('chapters.allDone')}
          </div>
        )}
      </div>

      {/* Category tabs */}
      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        marginBottom: 14,
        padding: '4px 0',
        WebkitOverflowScrolling: 'touch',
      }}>
        {TABS.map(tabItem => {
          const count = tabItem.id === 'all'
            ? CHAPTERS.length
            : CHAPTERS.filter(c => c.category === tabItem.id).length;
          return (
            <button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              style={{
                flex: '0 0 auto',
                padding: '8px 14px',
                background: tab === tabItem.id ? 'var(--t-brand)' : 'var(--t-surface-alt)',
                color: tab === tabItem.id ? '#fff' : 'var(--t-text-muted)',
                border: tab === tabItem.id ? 'none' : '1px solid var(--t-border-card)',
                borderBottom: tab === tabItem.id ? '3px solid var(--t-brand-dark)' : '1px solid var(--t-border-card)',
                borderRadius: 'var(--t-radius-pill)',
                fontSize: 13,
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
              }}
            >
              {tabItem.label} <span style={{ opacity: 0.75, fontWeight: 700 }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Grouped chapter cards by sub-category */}
      {Object.entries(grouped).map(([subCat, chapters]) => {
        const subCompleted = chapters.filter(ch => isChapterComplete(ch.id)).length;
        return (
          <div key={subCat} style={{ marginBottom: 20 }}>
            <h2 style={{
              margin: '0 0 10px',
              fontSize: 14,
              fontWeight: 900,
              color: '#7a5e25',
              paddingLeft: 8,
              borderLeft: '4px solid var(--t-brand)',
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
                const comingSoon = !!ch.comingSoon;
                const isExam = ch.category === 'exam';        // 英檢 = 獨立 track, 一開始就開
                const unlocked = isExam ? true : (!comingSoon && isChapterUnlocked(ch.id));
                const completed = comingSoon ? 0 : readCompletedLessons(ch.id).size;
                const total = chapterTotal(ch.id);
                const isComplete = !comingSoon && completed >= total;
                const pct = Math.round((completed / total) * 100);
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      if (!unlocked) return;
                      const seen = (() => { try { return localStorage.getItem(`pickup.chapter.${ch.id}.intro.seen`) === '1'; } catch { return false; } })();
                      // Ch0 入門 + 英檢章無故事序章 → 直接進地圖。
                      navigate(ch.id === 0 || isExam || seen ? `/map?ch=${ch.id}` : `/chapter/${ch.id}/intro`);
                    }}
                    disabled={!unlocked}
                    aria-label={`Section ${ch.id} ${ch.titleZh}${isComplete ? ' completed' : comingSoon ? ' coming soon' : unlocked ? ` ${pct} percent` : ' locked'}`}
                    style={{
                      minHeight: 160,
                      background: isComplete ? 'var(--t-success-tint)' : unlocked ? 'var(--t-surface-alt)' : '#e8dec8',
                      border: `2px solid ${isComplete ? 'var(--t-success)' : unlocked ? 'var(--t-brand)' : 'var(--t-border-card)'}`,
                      borderBottom: `4px solid ${isComplete ? 'var(--t-success)' : unlocked ? 'var(--t-brand-dark)' : 'var(--t-text-muted)'}`,
                      borderRadius: 'var(--t-radius-card)',
                      padding: '12px 8px 10px',
                      color: unlocked ? 'var(--t-text)' : 'var(--t-text-muted)',
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
                    <div style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: isComplete ? 'var(--t-success)' : unlocked ? 'var(--t-brand-dark)' : 'var(--t-text-muted)',
                      letterSpacing: 0.5,
                    }}>
                      #{ch.id.toString().padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: 42, lineHeight: 1, margin: '6px 0' }}>
                      {comingSoon || unlocked ? ch.emoji : '🔒'}
                    </div>
                    {comingSoon && (
                      <div style={{
                        position: 'absolute', top: 6, right: 6,
                        background: 'var(--t-accent)', color: '#fff',
                        fontSize: 9, fontWeight: 900, padding: '2px 6px',
                        borderRadius: 'var(--t-radius-pill)', letterSpacing: 0.3,
                      }}>
                        即將推出
                      </div>
                    )}
                    <div style={{
                      fontSize: 11,
                      fontWeight: 900,
                      lineHeight: 1.3,
                      textAlign: 'center',
                      minHeight: 28,
                    }}>
                      {ch.titleZh}
                    </div>
                    {isComplete && (
                      <div style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        background: 'var(--t-success)',
                        color: '#fff',
                        fontSize: 9,
                        fontWeight: 900,
                        padding: '2px 6px',
                        borderRadius: 'var(--t-radius-pill)',
                        letterSpacing: 0.3,
                      }}>
                          {t('chapters.badge')}
                      </div>
                    )}
                    {unlocked && !isComplete && completed > 0 && (
                      <div style={{
                        fontSize: 10,
                        color: 'var(--t-brand-dark)',
                        fontWeight: 800,
                        marginTop: 2,
                      }}>
                        {completed}/{total} · {pct}%
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
