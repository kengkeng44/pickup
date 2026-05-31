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

// v2.0.B.157 bug-check #2 fix: gate intro removal on either fixed 3200ms
// OR Phaser lazy mount,whichever fires first. Prevents blank screen on
// slow phones where requestIdleCallback fires after 3200ms.
let _introRemoved = false;
function removeIntro(): void {
  if (_introRemoved) return;
  _introRemoved = true;
  document.getElementById('pickup-tear-intro')?.remove();
}
window.setTimeout(removeIntro, 3200);

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

// v2.0.B.161.4: lazy analytics init (no-op without VITE_POSTHOG_KEY).
// Spec: docs/product/posthog-event-taxonomy-2026-06.md. Fires APP_OPEN
// once analytics ready.
function bootAnalyticsLazy(): void {
  void import('./analytics/posthog').then((m) => {
    void m.initAnalytics().then(() => {
      const deviceId = m.getOrCreateDeviceId();
      m.identifyUser(deviceId, {
        language: typeof navigator !== 'undefined' ? navigator.language : 'unknown',
      });
      m.track(m.EVENT.APP_OPEN, {
        is_pwa: window.matchMedia?.('(display-mode: standalone)')?.matches ?? false,
        ua_mobile: /Mobi|Android|iPhone|iPad/.test(typeof navigator !== 'undefined' ? navigator.userAgent : ''),
        source: 'cold_start',
      });
    });
  }).catch(() => { /* analytics is optional */ });
}

// v2.0.B.161.5: consent banner per posthog event spec § H. Only shows
// if (1) PostHog key present (no key = nothing to consent to) + (2) no
// prior decision. Decline = full opt-out; accept = enable + bootAnalytics.
function showConsentBannerIfNeeded(): void {
  const hasKey = !!(import.meta as ImportMeta & { env?: { VITE_POSTHOG_KEY?: string } }).env?.VITE_POSTHOG_KEY;
  if (!hasKey) return;
  void import('./analytics/posthog').then((m) => {
    if (m.getConsent() != null) {
      // Already decided — boot analytics now if granted
      if (m.getConsent() === 'granted') bootAnalyticsLazy();
      return;
    }
    const banner = document.createElement('div');
    banner.id = 'pickup-consent-banner';
    banner.style.cssText = [
      'position:fixed', 'bottom:0', 'left:0', 'right:0', 'z-index:9998',
      'background:#fff7e8', 'border-top:3px solid #e7a44a',
      'padding:14px 18px 18px', 'box-shadow:0 -4px 12px rgba(0,0,0,0.10)',
      'font-family:"Noto Sans TC","Nunito",system-ui,sans-serif',
      'color:#3c2a1c',
    ].join(';');
    banner.innerHTML = `
      <div style="font-size:13px;line-height:1.5;margin-bottom:10px;">
        我們用<b>匿名數據</b>幫助改善拾光 (不含個資 / 不會分享給第三方)。<br/>
        <span style="color:#8b6f4a;font-size:12px;">We use anonymous analytics to improve Pickup.</span>
      </div>
      <div style="display:flex;gap:8px;">
        <button type="button" id="pickup-consent-deny" style="
          flex:1;padding:10px 0;background:#fef8ed;color:#8b6f4a;
          border:2px solid #c8a878;border-radius:10px;font-size:13px;
          font-weight:700;cursor:pointer;font-family:inherit;
        ">拒絕 · Deny</button>
        <button type="button" id="pickup-consent-accept" style="
          flex:1;padding:10px 0;background:#7ac74a;color:#ffffff;
          border:none;border-bottom:3px solid #5d9a35;border-radius:10px;
          font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;
        ">同意 · Accept</button>
      </div>
    `;
    document.body.appendChild(banner);
    banner.querySelector('#pickup-consent-accept')?.addEventListener('click', () => {
      m.setConsent(true);
      banner.remove();
      bootAnalyticsLazy();
    });
    banner.querySelector('#pickup-consent-deny')?.addEventListener('click', () => {
      m.setConsent(false);
      banner.remove();
    });
  }).catch(() => { /* analytics optional */ });
}

// v2.0.B.152: lazy-load Phaser + scenes after 'load' event.
function bootPhaserLazy(): void {
  void import('./bootGame').then(({ startGame }) => {
    startGame();
    // v2.0.B.157: chain intro removal so it doesn't fire before Phaser mounts
    removeIntro();
    // v2.0.B.161.5: consent banner first; analytics boots only on accept
    // (or if user previously granted). No key = no banner = no analytics.
    showConsentBannerIfNeeded();
  });
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
