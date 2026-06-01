import { useNavigate } from 'react-router-dom';

const CHAPTERS: Array<{ id: number; titleZh: string; titleEn: string; unlocked: boolean }> = [
  { id: 1, titleZh: '院子裡的第一個故事', titleEn: 'A Story in the Yard', unlocked: true },
  { id: 2, titleZh: '桃太郎', titleEn: 'Momotaro', unlocked: true },
  { id: 3, titleZh: '醜小鴨', titleEn: 'The Ugly Duckling', unlocked: true },
  { id: 4, titleZh: '龜兔賽跑', titleEn: 'Tortoise and Hare', unlocked: true },
  { id: 5, titleZh: '駱駝為什麼有駝峰', titleEn: 'How the Camel Got Its Hump', unlocked: true },
  { id: 6, titleZh: 'Baba Yaga 雞腳屋', titleEn: 'Baba Yaga', unlocked: true },
  { id: 7, titleZh: '六隻天鵝', titleEn: 'The Six Swans', unlocked: true },
  { id: 8, titleZh: '葉限', titleEn: 'Ye Xian', unlocked: true },
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
            onClick={() => ch.unlocked && navigate(`/?ch=${ch.id}`)}
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
