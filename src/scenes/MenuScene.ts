import Phaser from 'phaser';
import { audio } from '../audio/AudioManager';

/**
 * MenuScene — v2.0.B.111: story-only mode. ModeMenu (free + scenario + story
 * picker) removed per user "順便把除了情節以外的模式先刪掉". Now MenuScene is
 * just a thin redirect to StoryModeScene; could be removed entirely once
 * BootScene routing is refactored.
 */
export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#fef8ed');
    audio.ensureContext();
    this.scene.start('StoryModeScene');
  }
}
