import { useT } from '../i18n';

// v2.0.B.348: achievements 接 i18n — name/desc 走字典 (id → ach.{id}.name/desc)
const ACHIEVEMENTS = [
  { id: 1, icon: '🐾', earned: false },
  { id: 2, icon: '🔥', earned: false },
  { id: 3, icon: '⚡', earned: false },
  { id: 4, icon: '⭐', earned: false },
  { id: 5, icon: '👣', earned: false },
  { id: 6, icon: '📚', earned: false },
  { id: 7, icon: '🎯', earned: false },
  { id: 8, icon: '🏆', earned: false },
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
            borderRadius: 12,
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
