import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    this.add
      .text(width / 2, height / 2 - 60, 'WordWar', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '48px',
        fontStyle: 'bold',
        color: '#2a2730',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2, 'CEFR cloze · 填空挑戰', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '16px',
        color: '#6b6375',
      })
      .setOrigin(0.5);

    const tap = this.add
      .text(width / 2, height / 2 + 60, 'Tap to start', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        color: '#ff7a59',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height - 30, 'v0.3.0 · Phaser ' + Phaser.VERSION, {
        fontFamily: 'ui-monospace, monospace',
        fontSize: '11px',
        color: '#a8a2b3',
      })
      .setOrigin(0.5);

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

    this.time.delayedCall(1500, advance);
    this.input.once('pointerdown', advance);
  }
}
