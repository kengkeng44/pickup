/**
 * BottomNav — v1.7.3 Duolingo-style global tab bar.
 *
 * Fixed bottom, muted/dark warm palette per user request (「最下面可以用暗的」).
 * Five tabs: Map (home) · Free · Scenarios · Stats · Settings.
 * Only the active tab is amber-tinted; others are muted brown.
 *
 * The nav is mounted per-scene by the scene that wants it (StoryModeScene
 * in v1.7.3). MenuScene / PlayScene don't show it yet — adding them is a
 * later UX call.
 */

import { applyStyle } from './domUtil';

export type BottomNavTab = 'map' | 'free' | 'scenarios' | 'stats' | 'settings';

export interface BottomNavHandlers {
  onTab: (tab: BottomNavTab) => void;
}

// Inline SVG icons — outline style, single color (currentColor) so the
// active tab color is driven by the parent button's `color`.
const ICONS: Record<BottomNavTab, string> = {
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v13l6-3 6 3 6-3V4l-6 3-6-3-6 3z"/><path d="M9 4v13"/><path d="M15 7v13"/></svg>`,
  free: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  scenarios: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 5v14M16 5v14"/></svg>`,
  stats: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-8"/><path d="M22 19H2"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>`,
};

const LABELS: Record<BottomNavTab, string> = {
  map: 'Map',
  free: 'Free',
  scenarios: 'Scenes',
  stats: 'Stats',
  settings: 'Settings',
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
      background: '#3c2a1c', // dark warm brown per user request
      borderTop: '2px solid #2a1d12',
      boxShadow: '0 -3px 12px rgba(0, 0, 0, 0.18)',
      fontFamily: '"Nunito", "Noto Sans TC", system-ui, sans-serif',
    });

    const tabs: BottomNavTab[] = ['map', 'free', 'scenarios', 'stats', 'settings'];
    for (const tab of tabs) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', LABELS[tab]);
      const isActive = tab === active;
      applyStyle(btn, {
        flex: '1',
        background: 'transparent',
        border: 'none',
        padding: '8px 4px 4px',
        cursor: 'pointer',
        color: isActive ? '#f7c97d' : '#a8927a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3px',
        fontFamily: 'inherit',
        transition: 'color 160ms ease, transform 160ms ease',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      });
      btn.innerHTML = `
        <span style="width:26px;height:26px;display:flex;align-items:center;justify-content:center;">${ICONS[tab]}</span>
        <span style="font-size:10px;font-weight:800;letter-spacing:0.4px;">${LABELS[tab]}</span>
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
      btn.style.color = id === tab ? '#f7c97d' : '#a8927a';
    }
  }

  destroy(): void {
    this.root.remove();
  }
}
