/**
 * BottomNav — v1.7.5 4-tab structure (Home / Tasks / Profile / Alerts).
 *
 * Per user 2026-05-26: 通知 / profile / 任務 / 地圖 (用家的 icon).
 * Dropped from v1.7.4 5-tab: Free + Scenes (merged into Tasks),
 * Stats + Settings (merged into Profile). Notifications/Alerts is new
 * (placeholder until streak reminders + new-chapter pings exist).
 *
 * Visual: fixed bottom, dark warm brown bg, amber-tint when active.
 */

import { applyStyle } from './domUtil';

export type BottomNavTab = 'home' | 'tasks' | 'profile' | 'alerts';

export interface BottomNavHandlers {
  onTab: (tab: BottomNavTab) => void;
}

// Inline SVG icons — outline, single-color via currentColor so the
// active state is just a parent `color:` swap.
// v1.9.17: user-generated PNG icons (rembg + WebP), 32px nav tiles.
// Active state is purely a glow/tint applied to the wrapping <span>
// rather than recolouring the icon itself (PNGs are fixed-colour).
const navImg = (file: string) => `<img src="/mascots/${file}" alt="" aria-hidden="true" width="32" height="32" style="display:block;" />`;
const ICONS: Record<BottomNavTab, string> = {
  home:    navImg('nav-home.webp'),
  tasks:   navImg('nav-tasks.webp'),
  profile: navImg('nav-profile.webp'),
  alerts:  navImg('nav-alerts.webp'),
};

const LABELS: Record<BottomNavTab, string> = {
  home: 'Home',
  tasks: 'Tasks',
  profile: 'Profile',
  alerts: 'Alerts',
};

export class BottomNav {
  private root: HTMLElement;
  private buttons = new Map<BottomNavTab, HTMLButtonElement>();

  constructor(active: BottomNavTab, handlers: BottomNavHandlers) {
    this.root = document.createElement('nav');
    this.root.id = 'pickup-bottom-nav';
    this.root.setAttribute('aria-label', 'Primary');
    applyStyle(this.root, {
      position: 'fixed',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: '40',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'stretch',
      padding: 'max(8px, env(safe-area-inset-bottom)) 6px max(10px, env(safe-area-inset-bottom)) 6px',
      background: '#3c2a1c',
      // v1.9.44 Duo flat: blur top halo stripped, solid 3px border-top for separation.
      borderTop: '3px solid #2a1d12',
      fontFamily: '"Nunito", "Noto Sans TC", system-ui, sans-serif',
    });

    const tabs: BottomNavTab[] = ['home', 'tasks', 'profile', 'alerts'];
    for (const tab of tabs) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', LABELS[tab]);
      const isActive = tab === active;
      applyStyle(btn, {
        flex: '1',
        background: 'transparent',
        border: 'none',
        // v1.9.47 audit-3 #7: active tab gets a solid 3px amber top bar
        // (color-block indicator) — pure Duo, no halo. Inactive = no bar.
        borderTop: isActive ? '3px solid #f7c97d' : '3px solid transparent',
        padding: '5px 4px 4px',
        cursor: 'pointer',
        color: isActive ? '#f7c97d' : '#a8927a',
        opacity: isActive ? '1' : '0.55',
        transform: isActive ? 'translateY(-2px)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3px',
        fontFamily: 'inherit',
        transition: 'color 160ms ease, transform 160ms ease, border-top-color 160ms ease',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      });
      // v1.9.31 audit #11: restore tiny 10px labels under each icon.
      // Visible labels help users + screen readers; the 10px size keeps the
      // nav uncluttered (vs. the bulky text that was removed in v1.9.15).
      btn.innerHTML = `
        <span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;">${ICONS[tab]}</span>
        <span style="font-size:10px;font-weight:800;letter-spacing:0.4px;line-height:1;">${LABELS[tab]}</span>
      `;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        handlers.onTab(tab);
      });
      this.buttons.set(tab, btn);
      this.root.appendChild(btn);
    }

    document.body.appendChild(this.root);
  }

  setActive(tab: BottomNavTab): void {
    for (const [id, btn] of this.buttons) {
      const active = id === tab;
      btn.style.color = active ? '#f7c97d' : '#a8927a';
      btn.style.opacity = active ? '1' : '0.55';
      // v1.9.47 audit-3 #7: also toggle the amber top bar + lift.
      btn.style.borderTop = active ? '3px solid #f7c97d' : '3px solid transparent';
      btn.style.transform = active ? 'translateY(-2px)' : 'none';
    }
  }

  destroy(): void {
    this.root.remove();
  }
}
