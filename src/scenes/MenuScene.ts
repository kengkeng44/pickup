import Phaser from 'phaser';
import { LevelMenu } from '../ui/LevelMenu';
import { useRunStore } from '../store/runStore';
import { audio } from '../audio/AudioManager';

/**
 * MenuScene — first interactive scene.
 *
 * Phaser side: just renders a brand title (the menu UI proper is DOM-overlay
 * driven for accessibility + touch reliability). We use a scene only so we
 * can scene.start('PlayScene') with the standard transition.
 */
export class MenuScene extends Phaser.Scene {
  private levelMenu?: LevelMenu;

  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    this.add
      .text(width / 2, height / 2 - 80, 'WordWar', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '64px',
        fontStyle: 'bold',
        color: '#2a2730',
      })
      .setOrigin(0.5);
    this.add
      .text(width / 2, height / 2, 'CEFR cloze · 填空挑戰', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '18px',
        color: '#6b6375',
      })
      .setOrigin(0.5);

    this.levelMenu = new LevelMenu({
      onSelect: (level) => {
        // First user gesture — ensure AudioContext is created.
        audio.ensureContext();
        useRunStore.getState().setLevel(level);
        this.levelMenu?.destroy();
        this.levelMenu = undefined;
        this.scene.start('PlayScene');
      },
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.levelMenu?.destroy();
      this.levelMenu = undefined;
    });
  }
}
