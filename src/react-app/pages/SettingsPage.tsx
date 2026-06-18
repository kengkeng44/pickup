// v2.0.B.329 (per user): 設定頁 — 取代舊「給家長」入口。集中必要設定, 各項即時連動。
// 上網查 + 精簡: 兒童 ELT app 必要設定 = 音訊 / 顯示(夜間)/ 難度 / 角色名 / 家長紀錄 / 重置。
// 不放: 語言(固定中→英)、通知(站外提醒在 todo)、帳號(後端 P1 後再加)。
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTheme, toggleTheme } from '../../data/theme';
import { isBgmEnabled, setBgmEnabled, isSfxEnabled, setSfxEnabled } from '../../data/audioSettings';
import { startBgm, stopBgm } from '../../audio/bgm';

type Diff = 'easy' | 'medium' | 'hard';
function readDiff(): Diff {
  try { const v = localStorage.getItem('pickup.difficulty'); return v === 'easy' || v === 'hard' ? v : 'medium'; } catch { return 'medium'; }
}

function Toggle({ on, onChange, ariaLabel }: { on: boolean; onChange: () => void; ariaLabel: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={ariaLabel} onClick={onChange}
      style={{
        width: 52, height: 30, borderRadius: 999, border: 'none', padding: 3, flex: '0 0 auto',
        background: on ? 'var(--t-success)' : '#d8c9b3', cursor: 'pointer',
        position: 'relative', transition: 'background 160ms ease-out',
        WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
      }}>
      <span style={{
        display: 'block', width: 24, height: 24, borderRadius: '50%', background: 'var(--t-surface)',
        boxShadow: '0 1px 2px rgba(60,42,28,0.25)',
        transform: on ? 'translateX(22px)' : 'translateX(0)', transition: 'transform 160ms ease-out',
      }} />
    </button>
  );
}

const cardStyle: React.CSSProperties = {
  background: 'var(--t-surface)', border: '2px solid var(--t-border-card)', borderRadius: 14,
  padding: 16, marginBottom: 14,
};
const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 12 };

function Row({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{ ...rowStyle, marginTop: 0 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--t-text)' }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--t-text-muted)', marginTop: 2 }}>{sub}</div>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => getTheme() === 'dark');
  const [bgm, setBgm] = useState(() => isBgmEnabled());
  const [sfx, setSfx] = useState(() => isSfxEnabled());
  const [diff, setDiff] = useState<Diff>(() => readDiff());

  const applyDiff = (d: Diff) => {
    setDiff(d);
    try { localStorage.setItem('pickup.difficulty', d); } catch { /* ignore */ }
  };

  const onBgm = () => {
    const next = !bgm; setBgm(next); setBgmEnabled(next);
    if (next) { try { startBgm(); } catch { /* ignore */ } } else { stopBgm(); }
  };

  return (
    <div style={{ padding: '16px 14px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <button type="button" onClick={() => navigate('/profile')} aria-label="返回"
          style={{ background: 'transparent', border: 'none', fontSize: 26, color: 'var(--t-text-muted)', cursor: 'pointer', lineHeight: 1 }}>‹</button>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--t-text)', margin: 0 }}>設定 · Settings</h1>
      </div>

      {/* 顯示 */}
      <div style={cardStyle}>
        <Row title="夜間模式 🌙" sub="Night mode · 睡前護眼暗色">
          <Toggle on={dark} onChange={() => setDark(toggleTheme() === 'dark')} ariaLabel="夜間模式" />
        </Row>
      </div>

      {/* 音訊 */}
      <div style={cardStyle}>
        <Row title="背景音樂 🎵" sub="關掉可同時聽你自己的音樂">
          <Toggle on={bgm} onChange={onBgm} ariaLabel="背景音樂" />
        </Row>
        <div style={{ height: 1, background: 'var(--t-border-soft)', margin: '12px 0' }} />
        <Row title="音效 🔔" sub="答對 / 答錯 / 點擊音">
          <Toggle on={sfx} onChange={() => { const n = !sfx; setSfx(n); setSfxEnabled(n); }} ariaLabel="音效" />
        </Row>
      </div>

      {/* 難度 */}
      <div style={cardStyle}>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--t-text)', marginBottom: 4 }}>難度 🎚️</div>
        <div style={{ fontSize: 12, color: 'var(--t-text-muted)', marginBottom: 10 }}>文章難易:簡單 / 適中 / 原文</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {([['easy', '簡單'], ['medium', '適中'], ['hard', '原文']] as [Diff, string][]).map(([d, label]) => (
            <button key={d} type="button" onClick={() => applyDiff(d)}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 10, fontFamily: 'inherit', fontWeight: 800, fontSize: 14,
                cursor: 'pointer', minHeight: 44,
                border: diff === d ? '2px solid var(--t-brand-dark)' : '2px solid var(--t-border-card)',
                background: diff === d ? 'var(--t-brand-dark)' : 'var(--t-bg)',
                color: diff === d ? '#fff' : 'var(--t-text)',
              }}>{label}</button>
          ))}
        </div>
      </div>

      {/* 家長 */}
      <button type="button" onClick={() => navigate('/parent')}
        style={{ ...cardStyle, width: '100%', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', borderBottom: '4px solid var(--t-border-card)' }}>
        <span style={{ fontSize: 28, lineHeight: 1 }} aria-hidden="true">👨‍👩‍👧</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 900, color: 'var(--t-text)' }}>家長專區</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-text-muted)', marginTop: 2 }}>孩子的學習紀錄</div>
        </div>
        <span style={{ fontSize: 20, color: 'var(--t-brand-dark)', fontWeight: 900 }} aria-hidden="true">›</span>
      </button>
    </div>
  );
}
