import { useNavigate } from 'react-router-dom';

// v2.0.B.259: 擴 Ch9-Ch29 (user 反映 ChaptersPage 「選章節」只 8 顆按鈕)
// 之前寫死 Ch1-8, 沒同步 B.236-249 Ch9-26 + B.258 Ch27-29 mid-long round 1 ship
const CHAPTERS: Array<{ id: number; titleZh: string; titleEn: string; unlocked: boolean }> = [
  { id: 1, titleZh: '院子裡的第一個故事', titleEn: 'A Story in the Yard', unlocked: true },
  { id: 2, titleZh: '桃太郎', titleEn: 'Momotaro', unlocked: true },
  { id: 3, titleZh: '醜小鴨', titleEn: 'The Ugly Duckling', unlocked: true },
  { id: 4, titleZh: '龜兔賽跑', titleEn: 'Tortoise and Hare', unlocked: true },
  { id: 5, titleZh: '駱駝為什麼有駝峰', titleEn: 'How the Camel Got Its Hump', unlocked: true },
  { id: 6, titleZh: 'Baba Yaga 雞腳屋', titleEn: 'Baba Yaga', unlocked: true },
  { id: 7, titleZh: '六隻天鵝', titleEn: 'The Six Swans', unlocked: true },
  { id: 8, titleZh: '葉限', titleEn: 'Ye Xian', unlocked: true },
  { id: 9, titleZh: '灰姑娘', titleEn: 'Cinderella', unlocked: true },
  { id: 10, titleZh: '嫦娥奔月', titleEn: 'Chang E Flies to the Moon', unlocked: true },
  { id: 11, titleZh: '后羿射日', titleEn: 'Hou Yi Shoots the Suns', unlocked: true },
  { id: 12, titleZh: '牛郎織女', titleEn: 'The Cowherd and the Weaver Girl', unlocked: true },
  { id: 13, titleZh: '小紅帽', titleEn: 'Little Red Riding Hood', unlocked: true },
  { id: 14, titleZh: '浦島太郎', titleEn: 'Urashima Taro', unlocked: true },
  { id: 15, titleZh: '國王的新衣', titleEn: "The Emperor's New Clothes", unlocked: true },
  { id: 16, titleZh: '一寸法師', titleEn: 'Issun-boshi', unlocked: true },
  { id: 17, titleZh: '鶴的報恩', titleEn: "The Crane's Return", unlocked: true },
  { id: 18, titleZh: '興夫和孬夫', titleEn: 'Heungbu and Nolbu', unlocked: true },
  { id: 19, titleZh: 'Sang Kancil 與鱷魚', titleEn: 'Sang Kancil', unlocked: true },
  { id: 20, titleZh: '蘿蔔大冒險', titleEn: 'The Enormous Turnip', unlocked: true },
  { id: 21, titleZh: 'Anansi 蜘蛛', titleEn: 'Anansi the Spider', unlocked: true },
  { id: 22, titleZh: '孟母三遷', titleEn: "Mencius's Mother", unlocked: true },
  { id: 23, titleZh: '司馬光砸缸', titleEn: 'Sima Guang Smashes the Vat', unlocked: true },
  { id: 24, titleZh: '孔融讓梨', titleEn: 'Kong Rong Gives Up the Pear', unlocked: true },
  { id: 25, titleZh: '愚公移山', titleEn: 'The Foolish Old Man Moves Mountains', unlocked: true },
  { id: 26, titleZh: 'Archimedes 尤里卡', titleEn: 'Archimedes Eureka', unlocked: true },
  { id: 27, titleZh: '西遊記·取經出發', titleEn: 'Journey to the West', unlocked: true },
  { id: 28, titleZh: '諸葛亮·三顧茅廬', titleEn: "Zhuge Liang's Strategems", unlocked: true },
  { id: 29, titleZh: '奧德賽·出航回家', titleEn: 'The Odyssey', unlocked: true },
];

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
        {CHAPTERS.map(ch => (
          <button
            key={ch.id}
            onClick={() => {
              if (!ch.unlocked) return;
              const seen = (() => { try { return localStorage.getItem(`pickup.chapter.${ch.id}.intro.seen`) === '1'; } catch { return false; } })();
              navigate(seen ? `/?ch=${ch.id}` : `/chapter/${ch.id}/intro`);
            }}
            disabled={!ch.unlocked}
            style={{
              width: '100%', textAlign: 'left',
              padding: '14px 16px',
              background: ch.unlocked ? '#c8835f' : '#e8dec8',
              color: ch.unlocked ? '#fff' : '#8b6f4a',
              border: 'none',
              borderBottom: `4px solid ${ch.unlocked ? '#8b5a3c' : '#c8a878'}`,
              borderRadius: 14,
              cursor: ch.unlocked ? 'pointer' : 'not-allowed',
              opacity: ch.unlocked ? 1 : 0.6,
              fontFamily: 'inherit',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.8, marginBottom: 4 }}>
                SECTION {ch.id} · 第 {ch.id} 章
              </div>
              <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 2 }}>{ch.titleZh}</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>{ch.titleEn}</div>
            </div>
            {!ch.unlocked && <span style={{ fontSize: 22 }}>🔒</span>}
            {ch.unlocked && <span style={{ fontSize: 18, opacity: 0.7 }}>›</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
