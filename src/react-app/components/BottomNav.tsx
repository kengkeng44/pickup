import { useLocation, useNavigate } from 'react-router-dom';

const TABS = [
  { path: '/', label: 'Home', icon: '/mascots/node-paw.webp' },
  { path: '/tasks', label: 'Tasks', icon: '/mascots/icon-star.webp' },
  { path: '/profile', label: 'Profile', icon: '/mascots/calico-anchor.webp' },
  { path: '/alerts', label: 'Alerts', icon: '/mascots/flame.webp' },
] as const;

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on Lesson immersive routes
  if (location.pathname.startsWith('/lesson/')) return null;

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: 480, margin: '0 auto',
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
            <img src={tab.icon} width={32} height={32} alt="" style={{ display: 'block', margin: '0 auto', opacity: active ? 1 : 0.55 }} />
          </button>
        );
      })}
    </nav>
  );
}
