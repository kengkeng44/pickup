import { useNavigate } from 'react-router-dom';
import { readCompletedLessons } from '../../store/runStore';

// v2.0.B.262: progression unlock — 「31 顆地圖, Ch1 起鎖死, 完成 1 章亮下 1 章」
// 之前 (B.259/260): 全 31 章 unlocked: true 寫死, 用戶任何章都可進
// 現在: Ch1 永遠 unlocked, ChN unlocked 需 readCompletedLessons(N-1).size >= 7
// (每章 7 lessons 為 standard, 完成全 7 才算 章節結業)
const CHAPTERS: Array<{ id: number; titleZh: string; titleEn: string }> = [
  { id: 1, titleZh: '院子裡的第一個故事', titleEn: 'A Story in the Yard' },
  { id: 2, titleZh: '桃太郎', titleEn: 'Momotaro' },
  { id: 3, titleZh: '醜小鴨', titleEn: 'The Ugly Duckling' },
  { id: 4, titleZh: '龜兔賽跑', titleEn: 'Tortoise and Hare' },
  { id: 5, titleZh: '駱駝為什麼有駝峰', titleEn: 'How the Camel Got Its Hump' },
  { id: 6, titleZh: 'Baba Yaga 雞腳屋', titleEn: 'Baba Yaga' },
  { id: 7, titleZh: '六隻天鵝', titleEn: 'The Six Swans' },
  { id: 8, titleZh: '葉限', titleEn: 'Ye Xian' },
  { id: 9, titleZh: '灰姑娘', titleEn: 'Cinderella' },
  { id: 10, titleZh: '嫦娥奔月', titleEn: 'Chang E Flies to the Moon' },
  { id: 11, titleZh: '后羿射日', titleEn: 'Hou Yi Shoots the Suns' },
  { id: 12, titleZh: '牛郎織女', titleEn: 'The Cowherd and the Weaver Girl' },
  { id: 13, titleZh: '小紅帽', titleEn: 'Little Red Riding Hood' },
  { id: 14, titleZh: '浦島太郎', titleEn: 'Urashima Taro' },
  { id: 15, titleZh: '國王的新衣', titleEn: "The Emperor's New Clothes" },
  { id: 16, titleZh: '一寸法師', titleEn: 'Issun-boshi' },
  { id: 17, titleZh: '鶴的報恩', titleEn: "The Crane's Return" },
  { id: 18, titleZh: '興夫和孬夫', titleEn: 'Heungbu and Nolbu' },
  { id: 19, titleZh: 'Sang Kancil 與鱷魚', titleEn: 'Sang Kancil' },
  { id: 20, titleZh: '蘿蔔大冒險', titleEn: 'The Enormous Turnip' },
  { id: 21, titleZh: 'Anansi 蜘蛛', titleEn: 'Anansi the Spider' },
  { id: 22, titleZh: '孟母三遷', titleEn: "Mencius's Mother" },
  { id: 23, titleZh: '司馬光砸缸', titleEn: 'Sima Guang Smashes the Vat' },
  { id: 24, titleZh: '孔融讓梨', titleEn: 'Kong Rong Gives Up the Pear' },
  { id: 25, titleZh: '愚公移山', titleEn: 'The Foolish Old Man Moves Mountains' },
  { id: 26, titleZh: 'Archimedes 尤里卡', titleEn: 'Archimedes Eureka' },
  { id: 27, titleZh: '西遊記·取經出發', titleEn: 'Journey to the West' },
  { id: 28, titleZh: '諸葛亮·三顧茅廬', titleEn: "Zhuge Liang's Strategems" },
  { id: 29, titleZh: '奧德賽·出航回家', titleEn: 'The Odyssey' },
  { id: 30, titleZh: '赫拉克勒斯·尼米亞獅子', titleEn: 'Heracles vs Nemean Lion' },
  { id: 31, titleZh: 'Robin Hood·Sherwood 森林', titleEn: 'Robin Hood' },
];

// v2.0.B.262: chapter progression unlock helper
function isChapterUnlocked(chId: number): boolean {
  if (chId === 1) return true;
  // 前一章必須完成全 7 lesson (kt-ch{N-1}-l1 ~ l7) 才解鎖本章
  return readCompletedLessons(chId - 1).size >= 7;
}

export default function ChaptersPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '14px 14px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <button
          onClick={() => navigate(-1)}
          aria-label="返回"
          style={{ background: 'transparent', border: 'none', fontSize: 22, color: '#8b6f4a', cursor: 'pointer', padding: 4 }}
        >‹</button>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: '#3c2a1c' }}>選章節</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CHAPTERS.map(ch => {
          // v2.0.B.262: compute unlock at render time (前章完成全 7 lessons 才亮)
          const unlocked = isChapterUnlocked(ch.id);
          const completed = readCompletedLessons(ch.id).size;
          const isComplete = completed >= 7;
          return (
            <button
              key={ch.id}
              onClick={() => {
                if (!unlocked) return;
                const seen = (() => { try { return localStorage.getItem(`pickup.chapter.${ch.id}.intro.seen`) === '1'; } catch { return false; } })();
                navigate(seen ? `/map?ch=${ch.id}` : `/chapter/${ch.id}/intro`);
              }}
              disabled={!unlocked}
              style={{
                width: '100%', textAlign: 'left',
                padding: '14px 16px',
                background: isComplete ? '#7d9a4f' : unlocked ? '#c8835f' : '#e8dec8',
                color: unlocked ? '#fff' : '#8b6f4a',
                border: 'none',
                borderBottom: `4px solid ${isComplete ? '#5d7a35' : unlocked ? '#8b5a3c' : '#c8a878'}`,
                borderRadius: 14,
                cursor: unlocked ? 'pointer' : 'not-allowed',
                opacity: unlocked ? 1 : 0.5,
                filter: unlocked ? 'none' : 'grayscale(0.6)',
                fontFamily: 'inherit',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.85, marginBottom: 4 }}>
                  SECTION {ch.id} · 第 {ch.id} 章 {isComplete ? '✓ 完成' : unlocked ? `· ${completed}/7` : ''}
                </div>
                <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 2 }}>{ch.titleZh}</div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>{ch.titleEn}</div>
              </div>
              {isComplete && <span style={{ fontSize: 22 }}>⭐</span>}
              {!unlocked && <span style={{ fontSize: 22 }}>🔒</span>}
              {unlocked && !isComplete && <span style={{ fontSize: 18, opacity: 0.7 }}>›</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
