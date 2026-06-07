// v2.0.B.253 P0 fix (ui-ux cron 2026-06-07T1208 SRS Babbel):
// 章節進度條原本硬編 progress: 8/24 是裝飾性假數字, 跟玩家實際完成不連動 → 誤導
// 改接 readCompletedLessons(ch.id).size, 進度條變真 mastery indicator。
import { readCompletedLessons } from '../../store/runStore';

interface Props { onPickLesson: () => void; }

const CHAPTER_META = [
  { id: 1, titleZh: '院子裡的第一個故事', titleEn: 'A Story in the Yard', unlocked: true, total: 24 },
  { id: 2, titleZh: '桃太郎', titleEn: 'Momotaro', unlocked: false, total: 24 },
  { id: 3, titleZh: '醜小鴨', titleEn: 'The Ugly Duckling', unlocked: false, total: 25 },
];

export default function MapView({ onPickLesson }: Props) {
  // v2.0.B.253: render-time derive — readCompletedLessons 是 cheap localStorage read,
  // 不需 useState/useEffect。每次 MapView mount 自動讀最新進度。
  const CHAPTERS = CHAPTER_META.map(ch => ({
    ...ch,
    progress: readCompletedLessons(ch.id).size,
  }));
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
            ch.progress === 0 ? (
              // v2.0.B.254 P0 fix (UX + PW agent from B.253 5-agent post-ship):
              // 兒童首訪看 0/24 + 空白條 = demotivate, t=5s 流失. 改 invitation banner
              // 邀請 framing, 完成 1 題後切回真實進度條. 雙語並列符合 memory rule.
              <div style={{ padding: '8px 12px', background: '#fef3c7', border: '2px dashed #e7a44a', borderRadius: 8, textAlign: 'center', fontSize: 12, fontWeight: 800, color: '#7a5e25' }}>
                👇 {ch.total} 題等你開始 · Tap to start {ch.total} lessons
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 6, background: '#fef3c7', borderRadius: 3, overflow: 'hidden' }}>
                  {/* v2.0.B.254: Duo bright green #7ac74a → olive #7d9a4f (UI-UX cron 1208 P2 + v1.9.36 token migration) */}
                  <div style={{ height: '100%', width: `${(ch.progress / ch.total) * 100}%`, background: '#7d9a4f' }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#8b6f4a' }}>{ch.progress}/{ch.total}</span>
              </div>
            )
          )}
        </button>
      ))}

      <p style={{ fontSize: 11, color: '#8b6f4a', textAlign: 'center', marginTop: 20, opacity: 0.6 }}>
        React JSX render · 0 innerHTML reparse
      </p>
    </div>
  );
}
