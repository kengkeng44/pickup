import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { PlayScene } from './scenes/PlayScene';
import { EndScene } from './scenes/EndScene';
import { StoryModeScene } from './scenes/StoryModeScene';
import { ChapterIntroScene } from './scenes/ChapterIntroScene';
import { ChapterEndScene } from './scenes/ChapterEndScene';
import { StoryEndingScene } from './scenes/StoryEndingScene';
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
  ],
};

new Phaser.Game(config);

// Dismiss the inline pre-boot skeleton once Phaser has mounted. Brief
// delay lets BootScene paint at least once so the cream → splash fade
// is seamless instead of a flash of empty cream.
window.setTimeout(() => {
  const preboot = document.getElementById('pickup-preboot-inline');
  if (preboot) {
    preboot.classList.add('is-hidden');
    window.setTimeout(() => preboot.remove(), 360);
  }
}, 220);

// v1.7.0: remove the tear-drop intro overlay after its full sequence.
// Timeline: 0.05s cat fade-in + 0.85s tear fall (start 0.5s) + 1.0s disc
// expand (start 1.3s) + 0.3s fade (start 2.3s) = ends at 2.6s.
// Pad to 2800ms so we never yank the element mid-fade on slow devices.
window.setTimeout(() => {
  document.getElementById('pickup-tear-intro')?.remove();
}, 2800);
