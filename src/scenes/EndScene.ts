import Phaser from 'phaser';
import { useRunStore } from '../store/runStore';

interface Rank {
  title: string;
  color: string;
}

/**
 * Rank thresholds out of a perfect 100+streak (max ~150 with bonuses).
 *   <30   Novice
 *   30-59 Apprentice
 *   60-89 Wordsmith
 *   90+   Master
 */
function rankFor(score: number): Rank {
  if (score >= 90) return { title: 'Wordsmith Master', color: '#ff7a59' };
  if (score >= 60) return { title: 'Skilled Wordsmith', color: '#2fb380' };
  if (score >= 30) return { title: 'Apprentice', color: '#a86a2a' };
  return { title: 'Novice', color: '#6b6375' };
}

export class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;
    const state = useRunStore.getState();

    const correct = state.history.filter((h) => h.correct).length;
    const wrong = state.history.length - correct;
    const dead = state.hp <= 0;
    const rank = rankFor(state.score);

    this.add
      .text(width / 2, height / 2 - 180, dead ? 'You ran out of HP' : 'Run complete', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '32px',
        fontStyle: 'bold',
        color: dead ? '#e25c4d' : '#2a2730',
      })
      .setOrigin(0.5);

    // Rank — gives the score arc a story.
    this.add
      .text(width / 2, height / 2 - 120, rank.title, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '22px',
        fontStyle: 'bold',
        color: rank.color,
      })
      .setOrigin(0.5);

    const scoreNum = this.add
      .text(width / 2, height / 2 - 50, `${state.score}`, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '72px',
        fontStyle: 'bold',
        color: '#2fb380',
      })
      .setOrigin(0.5);

    // Score count-up tween for impact.
    scoreNum.setText('0');
    const counter = { v: 0 };
    this.tweens.add({
      targets: counter,
      v: state.score,
      duration: 700,
      ease: 'Quad.easeOut',
      onUpdate: () => scoreNum.setText(String(Math.round(counter.v))),
      onComplete: () => scoreNum.setText(String(state.score)),
    });

    this.add
      .text(
        width / 2,
        height / 2 + 20,
        `Correct ${correct}    ·    Wrong ${wrong}    ·    Best streak ${state.bestStreak}`,
        {
          fontFamily: 'ui-monospace, monospace',
          fontSize: '18px',
          color: '#6b6375',
        }
      )
      .setOrigin(0.5);

    // "Play again" button.
    const btnW = 220;
    const btnH = 56;
    const btnX = width / 2;
    const btnY = height / 2 + 110;

    const btnBg = this.add.graphics();
    const drawBtn = (hover: boolean) => {
      btnBg.clear();
      btnBg.fillStyle(hover ? 0xff8e72 : 0xff7a59, 1);
      btnBg.fillRoundedRect(btnX - btnW / 2, btnY - btnH / 2, btnW, btnH, 12);
    };
    drawBtn(false);

    this.add
      .text(btnX, btnY, 'Play again', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '22px',
        fontStyle: 'bold',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    const hit = this.add
      .zone(btnX, btnY, btnW, btnH)
      .setInteractive({ useHandCursor: true });

    hit.on('pointerover', () => drawBtn(true));
    hit.on('pointerout', () => drawBtn(false));
    hit.on('pointerup', () => {
      useRunStore.getState().reset();
      this.scene.start('PlayScene');
    });
  }
}
