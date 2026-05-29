import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { sfxCardPress } from './audio/sfx';

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
import { audio } from './audio/AudioManager';
import { MenuScene } from './scenes/MenuScene';
import { PlayScene } from './scenes/PlayScene';
import { EndScene } from './scenes/EndScene';
import { StoryModeScene } from './scenes/StoryModeScene';
import { ChapterIntroScene } from './scenes/ChapterIntroScene';
import { ChapterEndScene } from './scenes/ChapterEndScene';
import { StoryEndingScene } from './scenes/StoryEndingScene';
import { LessonScene } from './scenes/LessonScene';
import './style.css';

/**
 * Portrait phone-app layout (v0.3 rework).
 *
 * 400 × 800 reference resolution, FIT scaled so the canvas centers in the
 * #app container (which is itself capped at 480px wide). On desktop the
 * surrounding cream bezel shows the "phone" framing; on mobile the canvas
 * fills the screen edge-to-edge.
 */
export const PHASER_WIDTH = 400;
export const PHASER_HEIGHT = 800;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.HEADLESS,
  parent: 'app',
  width: PHASER_WIDTH,
  height: PHASER_HEIGHT,
  backgroundColor: '#fef8ed',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    activePointers: 2,
    touch: {
      capture: true,
    },
  },
  scene: [
    BootScene,
    MenuScene,
    StoryModeScene,
    ChapterIntroScene,
    PlayScene,
    ChapterEndScene,
    StoryEndingScene,
    EndScene,
    LessonScene,  // v2.0 — single-lesson scope, called from StoryMapView click
  ],
};

new Phaser.Game(config);

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
// Timeline: 0.05s cat fade-in (0.55s) + tear fall 0.55→1.55s + disc
// expand 1.55→2.65s + orange shell fade 2.65→3.0s = ends at 3.0s.
// Pad to 3200ms so we never yank the element mid-fade on slow devices.
// (Old preboot skeleton removed in v1.7.1 — tear-intro IS the new
// preboot, paints on first frame.)
window.setTimeout(() => {
  document.getElementById('pickup-tear-intro')?.remove();
}, 3200);
