import { useLocation, useNavigate } from 'react-router-dom';

const TABS = [
  { path: '/', label: '首頁', icon: '/mascots/node-paw.webp', emoji: null as string | null },
  { path: '/tasks', label: '任務', icon: '/mascots/icon-star.webp', emoji: null as string | null },
  // v2.0.B.232 招 2: 圖鑑 tab (collectible card collection)
  { path: '/cards', label: '圖鑑', icon: '/mascots/icon-star.webp', emoji: '📒' as string | null },
  { path: '/profile', label: '我的', icon: '/mascots/calico-anchor.webp', emoji: null as string | null },
  { path: '/alerts', label: '成就', icon: '/mascots/flame.webp', emoji: null as string | null },
] as const;

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on Lesson immersive routes
  if (location.pathname.startsWith('/lesson/')) return null;

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#fff7e8', borderTop: '3px solid #c8a878',
      display: 'flex', justifyContent: 'space-around', padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
      zIndex: 100,
    }}>
      {TABS.map(tab => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            aria-label={tab.label}
            style={{
              flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '4px 0',
              borderTop: active ? '3px solid #e7a44a' : '3px solid transparent',
              transform: active ? 'translateY(-2px)' : 'none',
              transition: 'transform 0.15s',
            }}
          >
            {tab.emoji ? (
              <div style={{
                width: 28, height: 28, margin: '0 auto 2px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, lineHeight: 1,
                opacity: active ? 1 : 0.55,
              }}>{tab.emoji}</div>
            ) : (
              <img src={tab.icon} width={28} height={28} alt="" style={{ display: 'block', margin: '0 auto 2px', opacity: active ? 1 : 0.55 }} />
            )}
            <div style={{ fontSize: 10, fontWeight: 800, color: active ? '#b07a2a' : '#8b6f4a', letterSpacing: 0.5 }}>{tab.label}</div>
          </button>
        );
      })}
    </nav>
  );
}
