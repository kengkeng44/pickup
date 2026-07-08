import { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { readStreak } from '../../data/streak';
import { readXp, levelForXp } from '../../data/xp';
import { readCoins } from '../../data/coins';
import { readOutfit, getOutfitById } from '../../data/mascotOutfits';
import { listPlayers, getActivePlayer, createPlayer, switchPlayer } from '../../data/players';
import { useT } from '../i18n';

// v2.0.B.234 招 3: lazy-load WardrobeView (modal opens on tap, not on mount).
const WardrobeView = lazy(() => import('./WardrobeView'));

// v2.0.B.551 (per user 策略「英檢拆成獨立 app」): 英檢入口從主線 app 移除 (原 B.544 家長區)。
// 主線 app = 純兒童故事線 (ch0-31); 英檢 (ch32-34) 之後搬去獨立 repo/app, 內容檔暫留不動。

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t, lang } = useT();
  // v2.0.B.475: 改讀真正的每日 streak (data/streak), 修「個人頁 streak 永遠顯示 0」bug
  // (原讀 runStore in-run cloze streak, React 從不更新它 → 恆 0; HUD 用的才是對的每日 streak)。
  const streak = readStreak();
  // v2.0.B.191 P1 fix (UI/UX): wire stats to real data layer (was '—' literals)
  const xp = readXp();
  const coins = readCoins();
  const level = levelForXp(xp);
  // v2.0.B.559 (per user「角色設定固定」): 改名功能移除, Mochi/Hana 寫死 —
  // 內容層 B.148 早已 hardcode, 這裡把最後一個自由度 (Profile 改名 UI) 收掉。
  const catName = 'Mochi';
  // v2.0.B.234 招 3: wardrobe state + current outfit display.
  const [wardrobeOpen, setWardrobeOpen] = useState(false);
  const [outfitId, setOutfitId] = useState<string>(() => readOutfit());
  const outfit = getOutfitById(outfitId);
  const outfitLabel = outfit ? (lang === 'zh' ? outfit.name.zh : outfit.name.en) : t('profile.outfitDefault');
  const outfitBadge = outfit?.emojiBadge ?? '';

  return (
    <div style={{ padding: '16px 14px 24px' }}>
      <h1 style={{ fontSize: 'var(--t-text-title)', fontWeight: 900, color: 'var(--t-text)', margin: '0 0 14px' }}>{t('profile.title')}</h1>

      <div style={{ background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 'var(--t-radius-card)', padding: 16, marginBottom: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
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
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 'var(--t-text-title)', fontWeight: 900, color: 'var(--t-text)' }}>{catName}</div>
          <div style={{ fontSize: 'var(--t-text-label)', color: 'var(--t-text-muted)', marginTop: 2, fontWeight: 700 }}>
            {outfitLabel}
          </div>
        </div>
      </div>

      {/* v2.0.B.436: 多帳號 / 進度保留 切換 */}
      <PlayerSwitcher />

      {/* v2.0.B.234 招 3: 衣櫥 entry — opens WardrobeView modal */}
      <button
        onClick={() => setWardrobeOpen(true)}
        aria-label={t('profile.wardrobe.aria')}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 14,
          background: 'var(--t-surface-alt)', border: '2px solid var(--t-brand)',
          borderBottom: '4px solid var(--t-brand-dark)', borderRadius: 'var(--t-radius-card)',
          padding: '14px 16px', marginBottom: 14,
          cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
          touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span style={{ fontSize: 32, lineHeight: 1 }} aria-hidden="true">👕</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 'var(--t-text-body)', fontWeight: 900, color: 'var(--t-text)' }}>
            {t('profile.wardrobe')}
          </div>
          <div style={{ fontSize: 'var(--t-text-label)', fontWeight: 700, color: 'var(--t-text-muted)', marginTop: 2 }}>
            {t('profile.wardrobe.current')}: {outfitLabel}
          </div>
        </div>
        <span style={{ fontSize: 20, color: 'var(--t-brand-dark)', fontWeight: 900 }} aria-hidden="true">›</span>
      </button>

      {/* v2.0.B.329: 統計 (拿掉「統計」標題, 直接呈現 4 格 — 更簡潔) */}
      <div style={{ background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 'var(--t-radius-card)', padding: 16, marginBottom: 14 }}>
        {/* v2.0.B.573: stat 磚上色 (Duolingo stat tile) — icon/數字語意色 + 12% tint 底 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Stat label={t('profile.stat.streak')} value={String(streak)} icon="🔥" color="#ff7a3a" />
          <Stat label={t('profile.stat.xp')} value={String(xp)} icon="⚡" color="var(--t-focus)" />
          <Stat label={t('profile.stat.coins')} value={String(coins)} icon="🪙" color="var(--t-brand)" />
          <Stat label={t('profile.stat.crown')} value={`L${level}`} icon="👑" color="#8b5cf6" />
        </div>
      </div>

      {/* v2.0.B.329: 「給家長」→「設定」入口 (夜間/音訊/難度/狗名/家長紀錄/重置 都在設定裡) */}
      <button
        onClick={() => navigate('/settings')}
        aria-label={t('settings.title')}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 14,
          background: 'var(--t-surface)', border: '2px solid var(--t-border-card)',
          borderBottom: '4px solid var(--t-border-card)', borderRadius: 'var(--t-radius-card)',
          padding: '14px 16px', marginBottom: 14,
          cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
          touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span style={{ fontSize: 28, lineHeight: 1 }} aria-hidden="true">⚙️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 'var(--t-text-body)', fontWeight: 900, color: 'var(--t-text)' }}>
            {t('settings.title')}
          </div>
          <div style={{ fontSize: 'var(--t-text-label)', fontWeight: 700, color: 'var(--t-text-muted)', marginTop: 2 }}>
            {t('profile.settings.sub')}
          </div>
        </div>
        <span style={{ fontSize: 20, color: 'var(--t-brand-dark)', fontWeight: 900 }} aria-hidden="true">›</span>
      </button>

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

// v2.0.B.436: 進度保留 — 帳號切換卡。切換 = 快照當前進度 → 載入目標 → reload。
function PlayerSwitcher() {
  const [players, setPlayers] = useState(() => listPlayers());
  const [activeId, setActiveId] = useState(() => getActivePlayer()?.id ?? '');
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');

  const doSwitch = (id: string) => {
    if (id === activeId) return;
    const ok = confirm('切換帳號？目前進度會自動保存，之後切回來不會不見。');
    if (!ok) return;
    if (switchPlayer(id)) {
      try { location.reload(); } catch { setActiveId(id); }
    }
  };

  const doAdd = () => {
    const id = createPlayer(name);
    setPlayers(listPlayers());
    setName(''); setAdding(false);
    doSwitch(id);
  };

  return (
    <div style={{ background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 'var(--t-radius-card)', padding: 14, marginBottom: 14 }}>
      <div style={{ fontSize: 'var(--t-text-label)', fontWeight: 900, color: 'var(--t-text)', marginBottom: 10 }}>👥 帳號 · Players</div>
      {players.map((p) => {
        const isActive = p.id === activeId;
        return (
          <button key={p.id} type="button" onClick={() => doSwitch(p.id)} disabled={isActive} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
            padding: '11px 14px', borderRadius: 'var(--t-radius-md)', fontFamily: 'inherit', textAlign: 'left',
            border: `2px solid ${isActive ? 'var(--t-success)' : 'var(--t-border-card)'}`,
            background: isActive ? 'var(--t-success-tint)' : 'var(--t-surface)',
            cursor: isActive ? 'default' : 'pointer',
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}>
            <span style={{ fontSize: 20 }} aria-hidden="true">{isActive ? '✅' : '🐱'}</span>
            <span style={{ flex: 1, fontSize: 'var(--t-text-body)', fontWeight: 800, color: 'var(--t-text)' }}>{p.name}</span>
            {isActive && <span style={{ fontSize: 'var(--t-text-label)', fontWeight: 800, color: 'var(--t-success)' }}>使用中</span>}
          </button>
        );
      })}
      {adding ? (
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="新帳號名字" maxLength={12} autoFocus style={{
            flex: 1, padding: 9, fontSize: 'var(--t-text-body)', fontWeight: 700, border: '2px solid var(--t-border-card)', borderRadius: 8,
            color: 'var(--t-text)', background: 'var(--t-bg)', fontFamily: 'inherit',
          }} />
          <button type="button" onClick={doAdd} style={{
            padding: '9px 14px', border: 'none', borderRadius: 8, fontFamily: 'inherit', fontSize: 'var(--t-text-button)', fontWeight: 800,
            color: '#fff', background: 'var(--t-brand-dark)', cursor: 'pointer',
          }}>建立</button>
        </div>
      ) : (
        <button type="button" onClick={() => setAdding(true)} style={{
          width: '100%', padding: '10px 0', marginTop: 2, border: '2px dashed var(--t-border-card)', borderRadius: 'var(--t-radius-md)',
          background: 'transparent', color: 'var(--t-text-muted)', fontFamily: 'inherit', fontSize: 'var(--t-text-button)', fontWeight: 800,
          cursor: 'pointer', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
        }}>＋ 新增帳號</button>
      )}
    </div>
  );
}

// v2.0.B.573: Duolingo stat tile — 語意色 icon+數字 + 低飽和 tint 底 (color-mix 跟著亮/暗 token 走, 夜色不亮底)
function Stat({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  return (
    <div style={{
      padding: 10, borderRadius: 10, textAlign: 'center',
      background: `color-mix(in srgb, ${color} 12%, transparent)`,
      border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
    }}>
      <div style={{ fontSize: 'var(--t-text-micro)', color: 'var(--t-text-muted)', marginBottom: 4, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 'var(--t-text-stat)', fontWeight: 900, color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <span aria-hidden="true" style={{ fontSize: 18, lineHeight: 1 }}>{icon}</span>
        <span>{value}</span>
      </div>
    </div>
  );
}
