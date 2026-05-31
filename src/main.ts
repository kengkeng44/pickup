/**
 * v2.0.B.152: tiny entry — splash + critical inits only.
 *
 * Phaser + all 9 scenes lazy-loaded via dynamic import('./bootGame')
 * AFTER 'load' event fires. Per memory rule feedback-perf-budget.
 *
 * Earlier B.149-B.151 attempt FAILED because main.ts kept the static
 * imports (Write tool errored on 'File has not been read yet' and the
 * silent failure shipped to prod claiming perf was fixed). Bug-check
 * agent caught this; B.152 actually removes them.
 */
import { audio } from './audio/AudioManager';
import { sfxCardPress } from './audio/sfx';
import './style.css';

// v1.9.48 audit-4 #4: detect blocked localStorage (Safari Private,
// quota-exceeded, etc.) so user knows their progress will silently revert
// on reload. Banner only mounts when writes actually fail.
function detectStorageBlocked(): boolean {
  try {
    const k = '__pickup_storage_test__';
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
    return false;
  } catch {
    return true;
  }
}
if (typeof window !== 'undefined' && detectStorageBlocked()) {
  const banner = document.createElement('div');
  banner.id = 'pickup-storage-warn';
  banner.style.cssText =
    'position:fixed;top:0;left:0;right:0;z-index:9999;background:#c84a3a;color:#fff;' +
    'padding:10px 14px;text-align:center;font-size:12px;font-weight:800;line-height:1.4;' +
    'font-family:"Noto Sans TC", "Nunito", system-ui, sans-serif;letter-spacing:0.3px;';
  banner.textContent = '⚠️ 進度無法儲存 — 請關閉私密瀏覽以保留 XP / 連勝紀錄';
  document.body.appendChild(banner);
}

// v0.3 reference resolution constants. Re-exported here for any modules
// importing them via { PHASER_WIDTH, PHASER_HEIGHT } from 'main.ts'.
// The actual Phaser config + Phaser.Game live in bootGame.ts (lazy).
export const PHASER_WIDTH = 400;
export const PHASER_HEIGHT = 800;

// v1.9.12: global click SFX. Any <button> tap fires a subtle press
// sound (sfxCardPress). User has audio mute toggle in Profile if too
// much. Excludes silent-on-purpose buttons via [data-no-click-sfx].
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  const btn = target.closest('button') as HTMLButtonElement | null;
  if (!btn) return;
  if (btn.hasAttribute('data-no-click-sfx')) return;
  if (audio.audioMuted) return;
  // ensureContext to unlock on first user click
  audio.ensureContext();
  sfxCardPress();
}, true);

// v1.7.1: remove the tear-drop intro overlay after its full sequence.
window.setTimeout(() => {
  document.getElementById('pickup-tear-intro')?.remove();
}, 3200);

// v2.0.B.155 PWA: register service worker for offline shell + 'Add to Home
// Screen' affordance. Wrapped in conditions so dev/preview doesn't try to
// install on file:// or unsupported browsers.
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silent fail — PWA install is progressive enhancement.
    });
  });
}

// v2.0.B.152: lazy-load Phaser + scenes after 'load' event.
function bootPhaserLazy(): void {
  void import('./bootGame').then(({ startGame }) => startGame());
}
if (document.readyState === 'complete') {
  bootPhaserLazy();
} else {
  window.addEventListener('load', () => {
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
    if (ric) {
      ric(bootPhaserLazy);
    } else {
      setTimeout(bootPhaserLazy, 50);
    }
  });
}
