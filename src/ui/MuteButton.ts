/**
 * MuteButton — small top-right HUD toggle for audio mute state.
 *
 * Renders as a 32x32 rounded square with a speaker glyph (🔊/🔇). Tap toggles
 * AudioManager mute. Subscribes to AudioManager state so external changes
 * update the icon.
 */

import Phaser from 'phaser';
import { audio } from '../audio/AudioManager';

export class MuteButton extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Graphics;
  private icon: Phaser.GameObjects.Text;
  private unsub?: () => void;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.bg = new Phaser.GameObjects.Graphics(scene);
    this.add(this.bg);

    this.icon = new Phaser.GameObjects.Text(scene, 0, 0, '', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '18px',
      color: '#6b6375',
    }).setOrigin(0.5);
    this.add(this.icon);

    this.setSize(36, 36);
    this.setInteractive(
      new Phaser.Geom.Rectangle(-18, -18, 36, 36),
      Phaser.Geom.Rectangle.Contains
    );

    this.on('pointerup', () => {
      // Ensure context is created on this user gesture (autoplay policy).
      audio.ensureContext();
      audio.toggleAudioMuted();
    });

    this.unsub = audio.subscribe(() => this.refresh());
    this.refresh();

    scene.add.existing(this);

    this.once(Phaser.GameObjects.Events.DESTROY, () => {
      this.unsub?.();
    });
  }

  private refresh(): void {
    const muted = audio.audioMuted;
    this.bg.clear();
    this.bg.fillStyle(0xffffff, 1);
    this.bg.lineStyle(1, 0xe7e2d4, 1);
    this.bg.fillRoundedRect(-18, -18, 36, 36, 8);
    this.bg.strokeRoundedRect(-18, -18, 36, 36, 8);
    this.icon.setText(muted ? '\u{1F507}' : '\u{1F50A}');
    this.icon.setColor(muted ? '#e25c4d' : '#6b6375');
  }
}
