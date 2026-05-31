/**
 * v2.0.B.149: Phaser + all scenes extracted from main.ts for lazy-load.
 *
 * Dynamically imported by main.ts after splash paints. Cuts ~1.2 MB
 * (phaser bundle) + ~216 KB (scenes) from initial critical path.
 * Per memory rule feedback-perf-budget — fixes 3547ms > 3000ms.
 *
 * Industry alignment: Duolingo/Roblox/Niantic all defer heavy game
 * runtime past first paint.
 */
import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { PlayScene } from './scenes/PlayScene';
import { EndScene } from './scenes/EndScene';
import { StoryModeScene } from './scenes/StoryModeScene';
import { ChapterIntroScene } from './scenes/ChapterIntroScene';
import { ChapterEndScene } from './scenes/ChapterEndScene';
import { StoryEndingScene } from './scenes/StoryEndingScene';
import { LessonScene } from './scenes/LessonScene';

export const PHASER_WIDTH = 400;
export const PHASER_HEIGHT = 800;

/**
 * Starts the Phaser game. Called from main.ts after splash overlay
 * paints + tear-intro animation is on its way out. Async ensures
 * 'load' event fires before this work begins.
 */
export function startGame(): Phaser.Game {
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
      LessonScene,
    ],
  };
  const game = new Phaser.Game(config);
  (window as unknown as { pickupGame: Phaser.Game }).pickupGame = game;
  return game;
}
