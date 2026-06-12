const ACHIEVEMENTS = [
  { id: 1, icon: '🐾', name: '第一步', desc: '完成第一個 lesson', earned: false },
  { id: 2, icon: '🔥', name: '三日連擊', desc: '連續 3 天學習', earned: false },
  { id: 3, icon: '⚡', name: '七日狂熱', desc: '連續 7 天學習', earned: false },
  { id: 4, icon: '⭐', name: '完美主義', desc: '滿分完成 1 個 lesson', earned: false },
  { id: 5, icon: '👣', name: '探索者', desc: '解鎖 Ch2', earned: false },
  { id: 6, icon: '📚', name: '說書人', desc: '完成 Ch1 全章', earned: false },
  { id: 7, icon: '🎯', name: '神射手', desc: 'XP 達 1000', earned: false },
  { id: 8, icon: '🏆', name: '畢業生', desc: '完成所有章節', earned: false },
];

export default function AlertsPage() {
  return (
    <div style={{ padding: '16px 14px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--t-text)', margin: '0 0 16px' }}>成就</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {ACHIEVEMENTS.map(a => (
          <div key={a.id} style={{
            background: a.earned ? 'var(--t-surface)' : '#f1ebe1',
            border: `2px solid ${a.earned ? 'var(--t-brand)' : 'var(--t-border-card)'}`,
            borderRadius: 12,
            padding: 12,
            textAlign: 'center',
            opacity: a.earned ? 1 : 0.6,
          }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>{a.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--t-text)', marginBottom: 2 }}>{a.name}</div>
            <div style={{ fontSize: 10, color: 'var(--t-text-muted)', lineHeight: 1.4 }}>{a.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
