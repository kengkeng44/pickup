import { useLocation, useNavigate } from 'react-router-dom';

// v2.0.B.280 嚴格 EN-only UI rule (見 memory feedback_pickup_no_chinese_ui.md)
// 除對話框/故事/角色 voice 外, UI 一律 EN. aria-label 保留中文 (screen reader)
const TABS = [
  { path: '/', label: 'Map', ariaLabel: '地圖', icon: '/mascots/node-paw.webp', emoji: null as string | null },
  { path: '/tasks', label: 'Tasks', ariaLabel: '任務', icon: '/mascots/icon-star.webp', emoji: null as string | null },
  { path: '/cards', label: 'Cards', ariaLabel: '圖鑑', icon: '/mascots/icon-star.webp', emoji: '📒' as string | null },
  { path: '/alerts', label: 'Trophy', ariaLabel: '成就', icon: '/mascots/flame.webp', emoji: null as string | null },
  { path: '/profile', label: 'Me', ariaLabel: '我的', icon: '/mascots/calico-anchor.webp', emoji: null as string | null },
] as const;

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on Lesson immersive routes
  if (location.pathname.startsWith('/lesson/')) return null;

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--t-surface-alt)', borderTop: '3px solid #c8a878',
      display: 'flex', justifyContent: 'space-around', padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
      zIndex: 100,
    }}>
      {TABS.map(tab => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            aria-label={tab.ariaLabel}
            style={{
              // v2.0.B.271: active state 改暖色系框框 (user: 「用一個暖色系框框顯示」)
              // 從原本的 borderTop line 改成 2.5px 完整框 + 淡 amber tint
              flex: 1, cursor: 'pointer',
              margin: '0 3px', padding: '4px 0',
              background: active ? 'rgba(231,164,74,0.14)' : 'transparent',
              border: active ? '2.5px solid #d68a52' : '2.5px solid transparent',
              borderRadius: 12,
              transition: 'background 0.2s ease, border-color 0.2s ease',
              fontFamily: 'inherit',
            }}
          >
            {/* v2.0.B.282 icon-only nav — 砍 label, icon 已 self-evident, aria-label 留中文給 SR */}
            {tab.emoji ? (
              <div style={{
                width: 32, height: 32, margin: '0 auto',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, lineHeight: 1,
                opacity: active ? 1 : 0.55,
              }}>{tab.emoji}</div>
            ) : (
              <img src={tab.icon} width={32} height={32} alt="" style={{ display: 'block', margin: '0 auto', opacity: active ? 1 : 0.55 }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
