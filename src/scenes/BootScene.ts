import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    this.add
      .text(width / 2, height / 2 - 50, 'WordWar', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '64px',
        fontStyle: 'bold',
        color: '#2a2730',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 20, 'CEFR cloze · 10 rounds, 15 sec each', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '20px',
        color: '#6b6375',
      })
      .setOrigin(0.5);

    const tap = this.add
      .text(width / 2, height / 2 + 70, 'Tap anywhere to play', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '16px',
        color: '#ff7a59',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height - 30, 'v0.1.0 · Phaser ' + Phaser.VERSION, {
        fontFamily: 'ui-monospace, monospace',
        fontSize: '12px',
        color: '#a8a2b3',
      })
      .setOrigin(0.5);

    // Pulse the "tap" hint so the affordance reads.
    this.tweens.add({
      targets: tap,
      alpha: { from: 1, to: 0.4 },
      duration: 900,
      yoyo: true,
      repeat: -1,
    });

    let advanced = false;
    const advance = () => {
      if (advanced) return;
      advanced = true;
      this.scene.start('MenuScene');
    };

    // Auto-advance after 1.5s, or on any click/tap.
    this.time.delayedCall(1500, advance);
    this.input.once('pointerdown', advance);
  }
}
