import { useT } from '../i18n';

// v2.0.B.350: achievements 改自帶雙語資料 (不依賴 i18n 字典) — 動態 key 易被
// 字典再生工具漏掃, inline {zh,en} 最穩。標題仍走 t('alerts.title')。
const ACHIEVEMENTS: Array<{ id: number; icon: string; name: { zh: string; en: string }; desc: { zh: string; en: string }; earned: boolean }> = [
  { id: 1, icon: '🐾', name: { zh: '第一步', en: 'First Step' }, desc: { zh: '完成第一個 lesson', en: 'Complete your first lesson' }, earned: false },
  { id: 2, icon: '🔥', name: { zh: '三日連擊', en: '3-Day Streak' }, desc: { zh: '連續 3 天學習', en: 'Study 3 days in a row' }, earned: false },
  { id: 3, icon: '⚡', name: { zh: '七日狂熱', en: '7-Day Streak' }, desc: { zh: '連續 7 天學習', en: 'Study 7 days in a row' }, earned: false },
  { id: 4, icon: '⭐', name: { zh: '完美主義', en: 'Perfectionist' }, desc: { zh: '滿分完成 1 個 lesson', en: 'Ace a lesson with full marks' }, earned: false },
  { id: 5, icon: '👣', name: { zh: '探索者', en: 'Explorer' }, desc: { zh: '解鎖 Ch2', en: 'Unlock Chapter 2' }, earned: false },
  { id: 6, icon: '📚', name: { zh: '說書人', en: 'Storyteller' }, desc: { zh: '完成 Ch1 全章', en: 'Finish all of Chapter 1' }, earned: false },
  { id: 7, icon: '🎯', name: { zh: '神射手', en: 'Sharpshooter' }, desc: { zh: 'XP 達 1000', en: 'Reach 1000 XP' }, earned: false },
  { id: 8, icon: '🏆', name: { zh: '畢業生', en: 'Graduate' }, desc: { zh: '完成所有章節', en: 'Complete every chapter' }, earned: false },
];

export default function AlertsPage() {
  const { t } = useT();
  return (
    <div style={{ padding: '16px 14px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--t-text)', margin: '0 0 16px' }}>{t('alerts.title')}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {ACHIEVEMENTS.map(a => (
          <div key={a.id} style={{
            background: a.earned ? 'var(--t-surface)' : '#f1ebe1',
            border: `2px solid ${a.earned ? 'var(--t-brand)' : 'var(--t-border-card)'}`,
            borderRadius: 'var(--t-radius-md)',
            padding: 12,
            textAlign: 'center',
            opacity: a.earned ? 1 : 0.6,
          }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>{a.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--t-text)', marginBottom: 2 }}>{t(`ach.${a.id}.name`)}</div>
            <div style={{ fontSize: 10, color: 'var(--t-text-muted)', lineHeight: 1.4 }}>{t(`ach.${a.id}.desc`)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
