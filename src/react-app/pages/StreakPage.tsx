// v2.0.B.483 (per user「還要有連勝機制」+ 截圖): 連勝戰績頁 — Duolingo 風。
// 大火焰 + 連勝數 + 本週打卡週曆 (今天置中) + 完美連勝周獎勵提示 + 分享 + CTA。
// 入口: 地圖上排火焰 🔥 點下去 (MapPage HudIcon → navigate('/streak'))。
import { useNavigate } from 'react-router-dom';
import { readStreak, getStreakWeek } from '../../data/streak';
import { getActivePlayer } from '../../data/players';
import { useT } from '../i18n';

export default function StreakPage() {
  const navigate = useNavigate();
  const { t } = useT();
  const streak = readStreak();
  const week = getStreakWeek();
  const name = getActivePlayer()?.name ?? '';

  const FLAME = '#ff7a3a';
  const FLAME_DEEP = '#ff5a1f';

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      padding: 'calc(env(safe-area-inset-top) + 24px) 20px calc(env(safe-area-inset-bottom) + 20px)',
      background: 'var(--t-bg)',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <img src="/mascots/icon-flame.webp" width={150} height={150} alt="" style={{ display: 'block', filter: 'drop-shadow(0 8px 16px rgba(255,122,58,0.28))' }} />
        <div style={{ fontSize: 80, fontWeight: 900, color: FLAME, lineHeight: 1.05, letterSpacing: '-0.02em' }}>{streak}</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: FLAME, marginBottom: 22 }}>{t('streak.title')}</div>

        {/* 週曆 */}
        <div style={{
          width: '100%', maxWidth: 360, background: 'var(--t-surface)',
          border: '2px solid var(--t-border-card)', borderRadius: 'var(--t-radius-card)',
          padding: '16px 14px 18px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {week.days.map((d) => (
              <div key={d.iso} style={{ flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 800, color: d.isToday ? FLAME : 'var(--t-text-muted)', marginBottom: 8 }}>{d.label}</div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
            {week.days.map((d) => {
              const size = 36;
              if (d.isReward) {
                return (
                  <div key={d.iso} style={cellWrap}>
                    <div style={{ fontSize: 30, lineHeight: 1, filter: week.perfect ? 'none' : 'grayscale(1) opacity(0.6)' }} aria-hidden="true">🧰</div>
                  </div>
                );
              }
              if (d.checked) {
                return (
                  <div key={d.iso} style={cellWrap}>
                    <div style={{
                      width: size, height: size, borderRadius: '50%',
                      background: `linear-gradient(180deg, ${FLAME} 0%, ${FLAME_DEEP} 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: d.isToday ? `0 0 0 3px #ffd166` : 'none',
                    }}>
                      <span style={{ color: '#fff', fontSize: 18, fontWeight: 900 }}>✓</span>
                    </div>
                  </div>
                );
              }
              return (
                <div key={d.iso} style={cellWrap}>
                  <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--t-border-soft)' }} />
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 16, fontWeight: 700, color: 'var(--t-text-muted)', textAlign: 'center', lineHeight: 1.6, maxWidth: 320 }}>
          {week.perfect
            ? t('streak.perfect')
            : t('streak.more').replace('{n}', String(week.remaining))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16 }}>
        <button type="button" onClick={() => shareStreak(streak, t('streak.shareText'))} aria-label={t('streak.share')}
          style={{
            flex: '0 0 auto', width: 56, height: 56, borderRadius: 'var(--t-radius-card)',
            border: '2px solid var(--t-border-card)', background: 'var(--t-surface)',
            fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}>📤</button>
        <button type="button" onClick={() => navigate(-1)}
          style={{
            flex: 1, minHeight: 56, borderRadius: 'var(--t-radius-card)', border: 'none',
            background: 'var(--t-focus)', color: '#fff', fontSize: 18, fontWeight: 900, fontFamily: 'inherit',
            borderBottom: '4px solid #1690c9', cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}>
          {name ? t('streak.cta').replace('{name}', name) : t('streak.ctaPlain')}
        </button>
      </div>
    </div>
  );
}

const cellWrap: React.CSSProperties = { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' };

async function shareStreak(streak: number, text: string): Promise<void> {
  const msg = text.replace('{n}', String(streak));
  try {
    if (navigator.share) { await navigator.share({ text: msg }); return; }
  } catch { /* user cancelled or unsupported */ }
  try { await navigator.clipboard.writeText(msg); } catch { /* ignore */ }
}
