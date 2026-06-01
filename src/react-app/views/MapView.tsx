interface Props { onPickLesson: () => void; }

const CHAPTERS = [
  { id: 1, titleZh: '院子裡的第一個故事', titleEn: 'A Story in the Yard', unlocked: true, progress: 8, total: 24 },
  { id: 2, titleZh: '桃太郎', titleEn: 'Momotaro', unlocked: false, progress: 0, total: 24 },
  { id: 3, titleZh: '醜小鴨', titleEn: 'The Ugly Duckling', unlocked: false, progress: 0, total: 25 },
];

export default function MapView({ onPickLesson }: Props) {
  return (
    <div style={{ padding: '16px 14px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#3c2a1c' }}>章節地圖</div>
        <div style={{ fontSize: 12, color: '#8b6f4a' }}>Chapter Map</div>
      </div>

      {CHAPTERS.map(ch => (
        <button
          key={ch.id}
          onClick={ch.unlocked ? onPickLesson : undefined}
          disabled={!ch.unlocked}
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'left',
            padding: '14px 16px',
            marginBottom: 12,
            background: ch.unlocked ? '#fff7e8' : '#e8dec8',
            color: ch.unlocked ? '#3c2a1c' : '#8b6f4a',
            border: `2px solid ${ch.unlocked ? '#e7a44a' : '#c8a878'}`,
            borderBottom: `4px solid ${ch.unlocked ? '#b07a2a' : '#8b6f4a'}`,
            borderRadius: 14,
            cursor: ch.unlocked ? 'pointer' : 'not-allowed',
            opacity: ch.unlocked ? 1 : 0.6,
            fontFamily: 'inherit',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#8b6f4a', letterSpacing: 1 }}>
              SECTION {ch.id} · 第 {ch.id} 章
            </span>
            {!ch.unlocked && <span style={{ fontSize: 16 }}>🔒</span>}
          </div>
          <div style={{ fontSize: 17, fontWeight: 900, marginBottom: 4 }}>{ch.titleZh}</div>
          <div style={{ fontSize: 12, color: '#8b6f4a', marginBottom: 8 }}>{ch.titleEn}</div>
          {ch.unlocked && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 6, background: '#fef3c7', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(ch.progress / ch.total) * 100}%`, background: '#7ac74a' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#8b6f4a' }}>{ch.progress}/{ch.total}</span>
            </div>
          )}
        </button>
      ))}

      <p style={{ fontSize: 11, color: '#8b6f4a', textAlign: 'center', marginTop: 20, opacity: 0.6 }}>
        React JSX render · 0 innerHTML reparse
      </p>
    </div>
  );
}
