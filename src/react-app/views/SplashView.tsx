interface Props { onStart: () => void; }

export default function SplashView({ onStart }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center', height: '100%' }}>
      <img src="/mascots/calico-anchor.webp" width={140} height={140} alt="Mochi" style={{ marginBottom: 24 }} />
      <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--t-text)', margin: '0 0 8px', letterSpacing: 2 }}>拾光</h1>
      {/* v2.0.B.231 audience pivot: 上班族「撿回時間」→ 兒童/親子「睡前小故事」.
          Per docs/strategy/2026-06-05-target-audience-realignment.md. */}
      <p style={{ fontSize: 16, color: 'var(--t-text-muted)', fontWeight: 600, margin: '0 0 32px' }}>奶奶的睡前英文小故事</p>
      <button
        onClick={onStart}
        style={{
          padding: '14px 36px',
          background: 'var(--t-success)',
          color: '#fff',
          border: 'none',
          borderBottom: '4px solid var(--t-success)',
          borderRadius: 14,
          fontSize: 16,
          fontWeight: 900,
          letterSpacing: 1,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        開始 · Begin →
      </button>
      <p style={{ fontSize: 11, color: 'var(--t-text-muted)', marginTop: 28, opacity: 0.6 }}>
        React 18 + Vite · 60-70% 快 first load (vs Phaser 版)
      </p>
    </div>
  );
}
