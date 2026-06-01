import { useLocation, useNavigate } from 'react-router-dom';

const TABS = [
  { path: '/', label: '首頁', icon: '/mascots/node-paw.webp' },
  { path: '/tasks', label: '任務', icon: '/mascots/icon-star.webp' },
  { path: '/profile', label: '我的', icon: '/mascots/calico-anchor.webp' },
  { path: '/alerts', label: '成就', icon: '/mascots/flame.webp' },
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
            <img src={tab.icon} width={28} height={28} alt="" style={{ display: 'block', margin: '0 auto 2px', opacity: active ? 1 : 0.55 }} />
            <div style={{ fontSize: 10, fontWeight: 800, color: active ? '#b07a2a' : '#8b6f4a', letterSpacing: 0.5 }}>{tab.label}</div>
          </button>
        );
      })}
    </nav>
  );
}
