import Phaser from 'phaser';
import { ModeMenu } from '../ui/ModeMenu';
import { useRunStore } from '../store/runStore';
import { audio } from '../audio/AudioManager';

/**
 * MenuScene — v0.3 entry point.
 *
 * Phaser side: dim brand backdrop. The actual menu UI is a DOM overlay
 * (ModeMenu) for the same accessibility / touch reasons ClozeUI uses DOM.
 *
 * ModeMenu handles two flows:
 *   - Free practice → start with mode='free', level='A2'
 *   - Scenario     → pick scenario, then start with mode='scenario'
 */
export class MenuScene extends Phaser.Scene {
  private modeMenu?: ModeMenu;

  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Faint brand text behind the overlay — only visible if the overlay
    // ever fails to mount. Mostly invisible in practice.
    this.add
      .text(width / 2, height / 2, 'WordWar', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '40px',
        fontStyle: 'bold',
        color: '#e7e2d4',
      })
      .setOrigin(0.5);

    this.modeMenu = new ModeMenu({
      onStartFree: () => {
        audio.ensureContext();
        const store = useRunStore.getState();
        store.setMode('free');
        store.setScenario(null);
        store.setLevel('A2');
        this.modeMenu?.destroy();
        this.modeMenu = undefined;
        this.scene.start('PlayScene');
      },
      onStartScenario: (id) => {
        audio.ensureContext();
        const store = useRunStore.getState();
        store.setMode('scenario');
        store.setScenario(id);
        store.setLevel('A2');
        this.modeMenu?.destroy();
        this.modeMenu = undefined;
        this.scene.start('PlayScene');
      },
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.modeMenu?.destroy();
      this.modeMenu = undefined;
    });
  }
}
