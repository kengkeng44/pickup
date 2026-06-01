import { useRunStore } from '../../store/runStore';

export default function TasksPage() {
  const streak = useRunStore(s => s.streak);
  return (
    <div style={{ padding: '16px 14px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, color: '#3c2a1c', margin: '0 0 16px' }}>每日任務</h1>

      <div style={{ background: '#fff', border: '2px solid #e7a44a', borderBottom: '4px solid #b07a2a', borderRadius: 14, padding: 18, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 36 }}>🔥</span>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#3c2a1c' }}>{streak} 天</div>
            <div style={{ fontSize: 12, color: '#8b6f4a', fontWeight: 700 }}>Daily Streak · 連續學習</div>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 14, fontWeight: 800, color: '#8b6f4a', margin: '18px 0 8px' }}>今日目標</h2>
      {[
        { icon: '📖', text: '完成 1 個 lesson', done: false },
        { icon: '🎯', text: '正確率 ≥ 80%', done: false },
        { icon: '🔊', text: '聽完整個 narration', done: false },
      ].map((t, i) => (
        <div key={i} style={{ background: '#fff', border: '1px solid #e0d0b8', borderRadius: 10, padding: 12, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>{t.icon}</span>
          <span style={{ flex: 1, fontSize: 14, color: '#3c2a1c', fontWeight: 600 }}>{t.text}</span>
          <span style={{ fontSize: 14, color: t.done ? '#5d9a35' : '#c8a878', fontWeight: 800 }}>{t.done ? '✓' : '○'}</span>
        </div>
      ))}
    </div>
  );
}
