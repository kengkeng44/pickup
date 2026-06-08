import { useLocation, useNavigate } from 'react-router-dom';

// v2.0.B.273 user directive:
//   1. 第一條 label 「首頁」→「地圖」(label 對齊頁面內容, route / 仍 → MapPage 架構不變)
//   2. 最右兩位置互換 — 成就↔我的, 成就移到第 4, 我的擺最後
const TABS = [
  { path: '/', label: '地圖', icon: '/mascots/node-paw.webp', emoji: null as string | null },
  { path: '/tasks', label: '任務', icon: '/mascots/icon-star.webp', emoji: null as string | null },
  // v2.0.B.232 招 2: 圖鑑 tab (collectible card collection)
  { path: '/cards', label: '圖鑑', icon: '/mascots/icon-star.webp', emoji: '📒' as string | null },
  { path: '/alerts', label: '成就', icon: '/mascots/flame.webp', emoji: null as string | null },
  { path: '/profile', label: '我的', icon: '/mascots/calico-anchor.webp', emoji: null as string | null },
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
            <div style={{ fontSize: 10, fontWeight: 800, color: active ? '#9b5a1f' : '#8b6f4a', letterSpacing: 0.5 }}>{tab.label}</div>
          </button>
        );
      })}
    </nav>
  );
}
