/**
 * Achievements tab — badges derived from real progress.
 *
 * Was a hardcoded stub (every badge earned:false forever). Now renders
 * `evaluateAchievements()` from src/data/achievements.ts, which derives
 * unlock state read-only from live localStorage:
 *   - lessons completed  (pickup.chapter.{N}.lessons.completed)
 *   - daily streak       (pickup.streak.count)
 *   - XP / level         (pickup.xp.total)
 */
import { useMemo } from 'react';
import { evaluateAchievements } from '../../data/achievements';

export default function AlertsPage() {
  // Read-only localStorage derivation — compute once per mount.
  const achievements = useMemo(() => evaluateAchievements(), []);

  return (
    <div style={{ padding: '16px 14px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, color: '#3c2a1c', margin: '0 0 16px' }}>Achievements</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {achievements.map(a => (
          <div key={a.id} style={{
            background: a.unlocked ? '#fff' : '#f1ebe1',
            border: `2px solid ${a.unlocked ? '#e7a44a' : '#c8a878'}`,
            borderRadius: 12,
            padding: 12,
            textAlign: 'center',
            opacity: a.unlocked ? 1 : 0.6,
          }}>
            <div style={{ fontSize: 32, marginBottom: 6, lineHeight: 1 }}>
              {a.iconSrc ? (
                <img
                  src={a.iconSrc}
                  alt=""
                  width={32}
                  height={32}
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'bottom',
                    filter: a.unlocked ? 'none' : 'grayscale(1)',
                  }}
                />
              ) : a.emoji}
            </div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#3c2a1c', marginBottom: 2 }}>{a.title}</div>
            <div style={{ fontSize: 10, color: '#8b6f4a', lineHeight: 1.4 }}>{a.description}</div>
            {!a.unlocked && a.progressLabel && (
              <div style={{ fontSize: 10, color: '#b07a2a', fontWeight: 800, marginTop: 4 }}>
                {a.progressLabel}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
