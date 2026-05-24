import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { PlayScene } from './scenes/PlayScene';
import { EndScene } from './scenes/EndScene';
import './style.css';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 900,
  height: 600,
  backgroundColor: '#fdfaf2',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    // Explicit single-touch tap registration. Multi-finger taps were
    // confusing Phaser's pointer routing on some Android devices, occasionally
    // dropping the second tap on a card. One pointer is all we need.
    activePointers: 2, // 1 active + 1 mouse fallback for hybrid devices
    touch: {
      capture: true,
    },
  },
  scene: [BootScene, MenuScene, PlayScene, EndScene],
};

new Phaser.Game(config);
