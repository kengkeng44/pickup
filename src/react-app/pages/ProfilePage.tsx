import { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRunStore } from '../../store/runStore';
import { readXp, levelForXp } from '../../data/xp';
import { readCoins, addCoins } from '../../data/coins';
import { isBackendLive, serverRename } from '../../data/backend';
import { readOutfit, getOutfitById } from '../../data/mascotOutfits';
import { useT } from '../i18n';

// v2.0.B.234 招 3: lazy-load WardrobeView (modal opens on tap, not on mount).
const WardrobeView = lazy(() => import('./WardrobeView'));

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t, lang } = useT();
  const streak = useRunStore(s => s.streak);
  // v2.0.B.191 P1 fix (UI/UX): wire stats to real data layer (was '—' literals)
  const xp = readXp();
  const coins = readCoins();
  const level = levelForXp(xp);
  const [catName, setCatName] = useState(() => {
    try { return localStorage.getItem('pickup.catName') ?? 'Mochi'; } catch { return 'Mochi'; }
  });
  // v2.0.B.305: rename limit — 3 免費改名, 之後每次扣 coins (per user)
  const FREE_RENAMES = 3;
  const RENAME_COST = 100;
  const [draft, setDraft] = useState(catName);
  const [renameCount, setRenameCount] = useState(() => {
    try { return Math.max(0, Number(localStorage.getItem('pickup.catName.changes') || '0') || 0); } catch { return 0; }
  });
  const [coinBal, setCoinBal] = useState(coins);
  const [renameFlash, setRenameFlash] = useState('');
  const [renameErr, setRenameErr] = useState(false);
  // v2.0.B.234 招 3: wardrobe state + current outfit display.
  const [wardrobeOpen, setWardrobeOpen] = useState(false);
  const [outfitId, setOutfitId] = useState<string>(() => readOutfit());
  const outfit = getOutfitById(outfitId);
  const outfitLabel = outfit ? (lang === 'zh' ? outfit.name.zh : outfit.name.en) : t('profile.outfitDefault');
  const outfitBadge = outfit?.emojiBadge ?? '';

  const willCost = renameCount >= FREE_RENAMES;
  const trimmed = draft.trim();
  const canSave = trimmed.length > 0 && trimmed !== catName;
  const remaining = Math.max(0, FREE_RENAMES - renameCount);

  const saveCat = () => {
    const v = draft.trim();
    if (!v || v === catName) return;
    if (renameCount >= FREE_RENAMES) {
      if (coinBal < RENAME_COST) {
        setRenameErr(true);
        setRenameFlash(t('profile.notEnough').replace('{cost}', String(RENAME_COST)).replace('{bal}', String(coinBal)));
        return;
      }
      setCoinBal(addCoins(-RENAME_COST));
    }
    setCatName(v);
    try { localStorage.setItem('pickup.catName', v); } catch {}
    // v2.0.B.308 (P2): 鏡像給 server (server 自有 3-free / 100-coin 檢查; 開機 pull 為準)
    try { if (isBackendLive()) void serverRename(v); } catch {}
    const nextCount = renameCount + 1;
    setRenameCount(nextCount);
    try { localStorage.setItem('pickup.catName.changes', String(nextCount)); } catch {}
    setRenameErr(false);
    setRenameFlash(t('profile.renamed'));
  };

  return (
    <div style={{ padding: '16px 14px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--t-text)', margin: '0 0 16px' }}>{t('profile.title')}</h1>

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
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              value={draft}
              onChange={(e) => { setDraft(e.target.value); if (renameFlash) { setRenameFlash(''); setRenameErr(false); } }}
              placeholder={t('profile.catName')}
              maxLength={12}
              aria-label={t('profile.catName')}
              style={{
                flex: '1 1 auto', width: '100%', maxWidth: 150, minWidth: 0,
                padding: 8, fontSize: 16, fontWeight: 700,
                border: '2px solid var(--t-border-card)', borderRadius: 8, color: 'var(--t-text)',
                fontFamily: 'inherit', background: 'var(--t-bg)',
              }}
            />
            <button
              type="button"
              onClick={saveCat}
              disabled={!canSave}
              style={{
                flex: '0 0 auto', padding: '8px 12px', fontSize: 13, fontWeight: 800,
                border: 'none', borderRadius: 8, fontFamily: 'inherit',
                color: '#fff', background: canSave ? 'var(--t-brand-dark)' : '#cdbfa8',
                cursor: canSave ? 'pointer' : 'default',
                WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
              }}
            >
              {willCost ? t('profile.saveCost').replace('{cost}', String(RENAME_COST)) : t('profile.save')}
            </button>
          </div>
          <div style={{ fontSize: 11, color: renameErr ? 'var(--t-error, #c84a3a)' : 'var(--t-text-muted)', marginTop: 4 }}>
            {renameFlash
              ? renameFlash
              : remaining > 0
                ? t('profile.renameRemaining').replace('{n}', String(remaining))
                : t('profile.renameUsedUp').replace('{cost}', String(RENAME_COST)).replace('{bal}', String(coinBal))}
          </div>
        </div>
      </div>

      {/* v2.0.B.234 招 3: 衣櫥 entry — opens WardrobeView modal */}
      <button
        onClick={() => setWardrobeOpen(true)}
        aria-label={t('profile.wardrobe.aria')}
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
            {t('profile.wardrobe')}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-text-muted)', marginTop: 2 }}>
            {t('profile.wardrobe.current')}: {outfitLabel}
          </div>
        </div>
        <span style={{ fontSize: 20, color: 'var(--t-brand-dark)', fontWeight: 900 }} aria-hidden="true">›</span>
      </button>

      {/* v2.0.B.329: 統計 (拿掉「統計」標題, 直接呈現 4 格 — 更簡潔) */}
      <div style={{ background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 14, padding: 16, marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Stat label={t('profile.stat.streak')} value={`${streak} 🔥`} />
          <Stat label={t('profile.stat.xp')} value={String(xp)} />
          <Stat label={t('profile.stat.coins')} value={String(coins)} />
          <Stat label={t('profile.stat.crown')} value={`L${level}`} />
        </div>
      </div>

      {/* v2.0.B.329: 「給家長」→「設定」入口 (夜間/音訊/難度/狗名/家長紀錄/重置 都在設定裡) */}
      <button
        onClick={() => navigate('/settings')}
        aria-label={t('settings.title')}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 14,
          background: 'var(--t-surface)', border: '2px solid var(--t-border-card)',
          borderBottom: '4px solid var(--t-border-card)', borderRadius: 14,
          padding: '14px 16px', marginBottom: 14,
          cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
          touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span style={{ fontSize: 28, lineHeight: 1 }} aria-hidden="true">⚙️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 900, color: 'var(--t-text)' }}>
            {t('settings.title')}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-text-muted)', marginTop: 2 }}>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: 10, background: 'var(--t-bg)', borderRadius: 10, textAlign: 'center', border: '1px solid var(--t-border-soft)' }}>
      <div style={{ fontSize: 11, color: 'var(--t-text-muted)', marginBottom: 4, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 900, color: 'var(--t-brand-dark)' }}>{value}</div>
    </div>
  );
}
