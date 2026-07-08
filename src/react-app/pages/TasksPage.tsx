import { readCompletedLessons } from '../../store/runStore';
import { readStreak, readFreezes } from '../../data/streak';
import { useT } from '../i18n';

export default function TasksPage() {
  const { t } = useT();
  // v2.0.B.232 招 1: persistent daily streak + freeze count from localStorage
  const streak = readStreak();
  const freezes = readFreezes();
  // v2.0.B.191 P1 fix (UI/UX): wire daily task done state
  // "完成 1 個 lesson": Ch1+ 任一 lesson 完過即 done
  let hasCompletedAnyLesson = false;
  for (let ch = 1; ch <= 8; ch++) {
    if (readCompletedLessons(ch).size > 0) { hasCompletedAnyLesson = true; break; }
  }
  const streakDone = streak > 0;
  const goals = [
    { icon: '📖', text: t('tasks.goal.lesson'), done: hasCompletedAnyLesson },
    { icon: '🔥', text: t('tasks.goal.streak'), done: streakDone },
    { icon: '🎯', text: t('tasks.goal.accuracy'), done: false },
  ];
  return (
    <div style={{ padding: '16px 14px 24px' }}>
      <h1 style={{ fontSize: 'var(--t-text-title)', fontWeight: 900, color: 'var(--t-text)', margin: '0 0 14px' }}>{t('tasks.title')}</h1>

      <div style={{ background: 'var(--t-surface)', border: '2px solid var(--t-brand)', borderBottom: '4px solid var(--t-brand-dark)', borderRadius: 'var(--t-radius-card)', padding: 18, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 36 }}>🔥</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--t-text-stat)', fontWeight: 900, color: 'var(--t-text)' }}>{t('tasks.streakDays').replace('{n}', String(streak))}</div>
            <div style={{ fontSize: 'var(--t-text-label)', color: 'var(--t-text-muted)', fontWeight: 700 }}>{t('tasks.streakLabel')}</div>
          </div>
        </div>
      </div>

      {/* v2.0.B.232 招 1: freeze 🧊 hero card. Mochi 隊友 framing, not threat. */}
      <div style={{ background: 'var(--t-surface)', border: '2px solid #5a8cc4', borderBottom: '4px solid #3e6da3', borderRadius: 'var(--t-radius-card)', padding: 18, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 36 }}>🧊</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--t-text-stat)', fontWeight: 900, color: 'var(--t-text)' }}>{t('tasks.freezeCount').replace('{n}', String(freezes))}</div>
            <div style={{ fontSize: 'var(--t-text-label)', color: 'var(--t-text-muted)', fontWeight: 700 }}>
              {t('tasks.freezeLabel')}
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 'var(--t-text-label)', fontWeight: 800, color: 'var(--t-text-muted)', margin: '20px 0 8px' }}>{t('tasks.goals')}</h2>
      {goals.map((g, i) => (
        <div key={i} style={{ background: 'var(--t-surface)', border: '1px solid var(--t-border-soft)', borderRadius: 10, padding: 12, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>{g.icon}</span>
          <span style={{ flex: 1, fontSize: 'var(--t-text-body)', color: 'var(--t-text)', fontWeight: 600 }}>{g.text}</span>
          <span style={{ fontSize: 'var(--t-text-body)', color: g.done ? 'var(--t-success)' : 'var(--t-border-card)', fontWeight: 800 }}>{g.done ? '✓' : '○'}</span>
        </div>
      ))}
    </div>
  );
}
