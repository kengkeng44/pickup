import { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRunStore } from '../../store/runStore';
import { readXp, levelForXp } from '../../data/xp';
import { readCoins } from '../../data/coins';
import {
  hasNotificationConsent,
  setNotificationConsent,
  bootScheduler,
} from '../../notifications';
import { readOutfit, getOutfitById } from '../../data/mascotOutfits';
import { getTheme, toggleTheme } from '../../data/theme';

// v2.0.B.234 招 3: lazy-load WardrobeView (modal opens on tap, not on mount).
const WardrobeView = lazy(() => import('./WardrobeView'));

export default function ProfilePage() {
  const navigate = useNavigate();
  const streak = useRunStore(s => s.streak);
  // v2.0.B.191 P1 fix (UI/UX): wire stats to real data layer (was '—' literals)
  const xp = readXp();
  const coins = readCoins();
  const level = levelForXp(xp);
  const [catName, setCatName] = useState(() => {
    try { return localStorage.getItem('pickup.catName') ?? 'Mochi'; } catch { return 'Mochi'; }
  });
  // v2.0.B.234 招 3: wardrobe state + current outfit display.
  const [wardrobeOpen, setWardrobeOpen] = useState(false);
  const [outfitId, setOutfitId] = useState<string>(() => readOutfit());
  const outfit = getOutfitById(outfitId);
  const outfitLabelZh = outfit?.name.zh ?? 'Mochi 原樣';
  const outfitLabelEn = outfit?.name.en ?? 'Mochi (default)';
  const outfitBadge = outfit?.emojiBadge ?? '';
  // v2.0.B.234 wiring: Mochi notifications toggle. Default off (per
  // src/notifications/consent.tsx — requires explicit user opt-in).
  const [notifsOn, setNotifsOn] = useState<boolean>(() => {
    try { return hasNotificationConsent(); } catch { return false; }
  });
  // v2.0.B.282: night mode toggle.
  const [dark, setDark] = useState<boolean>(() => getTheme() === 'dark');

  const saveCat = (v: string) => {
    setCatName(v);
    try { localStorage.setItem('pickup.catName', v); } catch {}
  };

  // v2.0.B.234 wiring: toggle handler — fires native permission prompt on
  // first enable (must be in user-gesture click handler per iOS Safari).
  const toggleNotifs = async () => {
    const next = !notifsOn;
    setNotifsOn(next);
    try {
      await setNotificationConsent(next);
      if (next) {
        try { bootScheduler(); } catch {}
      }
    } catch {}
  };

  return (
    <div style={{ padding: '16px 14px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--t-text)', margin: '0 0 16px' }}>我的</h1>

      <div style={{ background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 14, padding: 16, marginBottom: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 64, height: 64, flex: '0 0 auto' }}>
          <img src="/mascots/calico-anchor.webp" width={64} height={64} alt={catName} style={{ display: 'block' }} />
          {outfitBadge && (
            <span aria-hidden="true" style={{
              position: 'absolute', bottom: -2, right: -2,
              fontSize: 24, lineHeight: 1,
              textShadow: '0 1px 2px rgba(255,255,255,0.9)',
            }}>{outfitBadge}</span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <input
            value={catName}
            onChange={(e) => saveCat(e.target.value)}
            placeholder="貓咪名字"
            style={{
              width: '100%', padding: 8, fontSize: 16, fontWeight: 700,
              border: '2px solid var(--t-border-card)', borderRadius: 8, color: 'var(--t-text)',
              fontFamily: 'inherit', background: 'var(--t-bg)',
            }}
          />
          <div style={{ fontSize: 11, color: 'var(--t-text-muted)', marginTop: 4 }}>更改後重新整理生效</div>
        </div>
      </div>

      {/* v2.0.B.234 招 3: 衣櫥 entry — opens WardrobeView modal */}
      <button
        onClick={() => setWardrobeOpen(true)}
        aria-label="開啟衣櫥 · Open wardrobe"
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 14,
          background: 'var(--t-surface-alt)', border: '2px solid var(--t-brand)',
          borderBottom: '4px solid var(--t-brand-dark)', borderRadius: 14,
          padding: '14px 16px', marginBottom: 14,
          cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
          touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span style={{ fontSize: 32, lineHeight: 1 }} aria-hidden="true">👕</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 900, color: 'var(--t-text)' }}>
            衣櫥 · Wardrobe
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-text-muted)', marginTop: 2 }}>
            目前 · Current: {outfitLabelZh} · {outfitLabelEn}
          </div>
        </div>
        <span style={{ fontSize: 20, color: 'var(--t-brand-dark)', fontWeight: 900 }} aria-hidden="true">›</span>
      </button>

      <div style={{ background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 14, padding: 16, marginBottom: 14 }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 800, color: 'var(--t-text)' }}>統計</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Stat label="連勝 Streak" value={`${streak} 🔥`} />
          <Stat label="XP" value={String(xp)} />
          <Stat label="Coins" value={String(coins)} />
          <Stat label="Crown Level" value={`L${level}`} />
        </div>
      </div>

      {/* Parent Corner entry — navigates to /parent (arithmetic-gated) */}
      <button
        onClick={() => navigate('/parent')}
        aria-label="給家長 · Parent Corner"
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 14,
          background: 'var(--t-surface)', border: '2px solid var(--t-border-card)',
          borderBottom: '4px solid var(--t-border-card)', borderRadius: 14,
          padding: '14px 16px', marginBottom: 14,
          cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
          touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span style={{ fontSize: 30, lineHeight: 1 }} aria-hidden="true">👨‍👩‍👧</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 900, color: 'var(--t-text)' }}>
            給家長 · Parent Corner
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-text-muted)', marginTop: 2 }}>
            查看孩子的學習紀錄 · Learning history for parents
          </div>
        </div>
        <span style={{ fontSize: 20, color: 'var(--t-brand-dark)', fontWeight: 900 }} aria-hidden="true">›</span>
      </button>

      {/* v2.0.B.234 wiring: Mochi notifications toggle. Default off. */}
      <div style={{ background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 14, padding: 16, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--t-text)' }}>允許 Mochi 通知</div>
          <div style={{ fontSize: 12, color: 'var(--t-text-muted)', marginTop: 2 }}>Mochi notifications · 偶爾捎封信給你</div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={notifsOn}
          aria-label="允許 Mochi 通知 · Mochi notifications"
          onClick={toggleNotifs}
          style={{
            width: 52, height: 30, borderRadius: 999, border: 'none', padding: 3,
            background: notifsOn ? 'var(--t-success)' : '#d8c9b3', cursor: 'pointer',
            position: 'relative', transition: 'background 160ms ease-out',
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}
        >
          <span style={{
            display: 'block', width: 24, height: 24, borderRadius: '50%',
            background: 'var(--t-surface)', boxShadow: '0 1px 2px rgba(60,42,28,0.25)',
            transform: notifsOn ? 'translateX(22px)' : 'translateX(0)',
            transition: 'transform 160ms ease-out',
          }} />
        </button>
      </div>

      {/* v2.0.B.282: night mode toggle — bedtime-friendly dark theme. */}
      <div style={{ background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 14, padding: 16, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--t-text)' }}>夜間模式 🌙</div>
          <div style={{ fontSize: 12, color: 'var(--t-text-muted)', marginTop: 2 }}>Night mode · 睡前護眼暗色</div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={dark}
          aria-label="夜間模式 · Night mode"
          onClick={() => setDark(toggleTheme() === 'dark')}
          style={{
            width: 52, height: 30, borderRadius: 999, border: 'none', padding: 3,
            background: dark ? 'var(--t-success)' : '#d8c9b3', cursor: 'pointer',
            position: 'relative', transition: 'background 160ms ease-out',
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}
        >
          <span style={{
            display: 'block', width: 24, height: 24, borderRadius: '50%',
            background: 'var(--t-surface)', boxShadow: '0 1px 2px rgba(60,42,28,0.25)',
            transform: dark ? 'translateX(22px)' : 'translateX(0)',
            transition: 'transform 160ms ease-out',
          }} />
        </button>
      </div>

      {wardrobeOpen && (
        <Suspense fallback={null}>
          <WardrobeView
            onClose={() => setWardrobeOpen(false)}
            onApplied={(id) => setOutfitId(id)}
          />
        </Suspense>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: 10, background: 'var(--t-bg)', borderRadius: 10, textAlign: 'center', border: '1px solid var(--t-border-soft)' }}>
      <div style={{ fontSize: 11, color: 'var(--t-text-muted)', marginBottom: 4, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 900, color: 'var(--t-brand-dark)' }}>{value}</div>
    </div>
  );
}
