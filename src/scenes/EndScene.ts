import Phaser from 'phaser';
import { useRunStore, RUN_CONFIG } from '../store/runStore';
import { sfxEndFanfare, sfxScoreTick } from '../audio/sfx';
import { audio } from '../audio/AudioManager';
import {
  SCENARIO_META,
  markScenarioCompleted,
  writeBestScore,
  readBestScore,
} from '../data/scenarios';
import { PHASER_WIDTH, PHASER_HEIGHT } from '../main';

interface Rank {
  title: string;
  color: string;
}

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
    const W = PHASER_WIDTH;
    const H = PHASER_HEIGHT;
    const state = useRunStore.getState();

    const correct = state.history.filter((h) => h.correct).length;
    const wrong = state.history.length - correct;
    const dead = state.hp <= 0;
    const completedRun = state.history.length >= RUN_CONFIG.QUESTIONS_PER_RUN;
    const rank = rankFor(state.score);

    // ─── Scenario achievement persistence ────────────────────────────────
    let achievementText = '';
    let achievementColor = '#3aa89b';
    let newBest = false;
    if (state.mode === 'scenario' && state.scenario) {
      const meta = SCENARIO_META[state.scenario];
      if (completedRun && !dead) {
        // Mark scenario as completed.
        markScenarioCompleted(state.scenario);
        achievementText = meta.achievement;
        achievementColor = meta.accent;
      }
      // Always try to update best score (function checks if higher).
      newBest = writeBestScore(state.scenario, state.score);
    }

    // ── Header / status text ─────────────────────────────────────────────
    this.cameras.main.setBackgroundColor('#fdfaf2');

    let topY = 80;
    this.add
      .text(W / 2, topY, dead ? 'Out of HP' : 'Run complete', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '24px',
        fontStyle: 'bold',
        color: dead ? '#e25c4d' : '#2a2730',
      })
      .setOrigin(0.5);

    topY += 36;
    this.add
      .text(W / 2, topY, rank.title, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '17px',
        fontStyle: 'bold',
        color: rank.color,
      })
      .setOrigin(0.5);

    // ── Score (animated counter) ─────────────────────────────────────────
    topY += 60;
    const scoreNum = this.add
      .text(W / 2, topY, '0', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '64px',
        fontStyle: 'bold',
        color: '#2fb380',
      })
      .setOrigin(0.5);

    const counter = { v: 0 };
    let lastTickAt = -1;
    this.tweens.add({
      targets: counter,
      v: state.score,
      duration: 900,
      ease: 'Quad.easeOut',
      onUpdate: () => {
        const v = Math.round(counter.v);
        scoreNum.setText(String(v));
        if (v !== lastTickAt && v % 3 === 0 && v > 0) {
          lastTickAt = v;
          sfxScoreTick();
        }
      },
      onComplete: () => {
        scoreNum.setText(String(state.score));
        if (state.score > 0 && !dead) sfxEndFanfare();
        if (dead) audio.vibrate([120, 80, 120, 80, 200]);
      },
    });

    topY += 60;
    this.add
      .text(
        W / 2,
        topY,
        `Correct ${correct}  ·  Wrong ${wrong}  ·  Best streak ${state.bestStreak}`,
        {
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          color: '#6b6375',
        }
      )
      .setOrigin(0.5);

    // ── Scenario achievement banner (only in scenario mode) ──────────────
    if (state.mode === 'scenario' && state.scenario) {
      const meta = SCENARIO_META[state.scenario];
      topY += 50;

      // Banner card
      const bw = W - 48;
      const bh = achievementText ? 92 : 64;
      const bx = W / 2 - bw / 2;
      const by = topY - bh / 2;

      const banner = this.add.graphics();
      banner.fillStyle(0x000000, 0.06);
      banner.fillRoundedRect(bx, by + 3, bw, bh, 14);
      banner.fillStyle(parseHex(meta.tint), 1);
      banner.fillRoundedRect(bx, by, bw, bh, 14);
      banner.lineStyle(2, parseHex(meta.accent), 1);
      banner.strokeRoundedRect(bx, by, bw, bh, 14);

      this.add
        .text(W / 2, by + 22, `${meta.emoji} ${meta.labelZh}`, {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '15px',
          fontStyle: 'bold',
          color: meta.accent,
        })
        .setOrigin(0.5);

      if (achievementText) {
        this.add
          .text(W / 2, by + 46, achievementText, {
            fontFamily: 'system-ui, sans-serif',
            fontSize: '14px',
            fontStyle: 'bold',
            color: achievementColor,
          })
          .setOrigin(0.5);
      }

      const best = readBestScore(state.scenario);
      const bestLabel = newBest
        ? `🏆 新紀錄!Best ${best}`
        : `Best ${best}`;
      this.add
        .text(
          W / 2,
          by + (achievementText ? 70 : 42),
          bestLabel,
          {
            fontFamily: 'ui-monospace, monospace',
            fontSize: '12px',
            color: newBest ? '#a86a2a' : '#6b6375',
            fontStyle: newBest ? 'bold' : 'normal',
          }
        )
        .setOrigin(0.5);

      topY += bh / 2 + 20;
    }

    // ── Play again button ───────────────────────────────────────────────
    topY += 50;
    const btnW = 240;
    const btnH = 52;
    const btnX = W / 2;
    const btnY = topY;

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
        fontSize: '19px',
        fontStyle: 'bold',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    const hit = this.add
      .zone(btnX, btnY, btnW, btnH)
      .setInteractive({ useHandCursor: true });
    hit.on('pointerup', () => {
      audio.vibrate(15);
      useRunStore.getState().reset();
      this.scene.start('PlayScene');
    });
    hit.on('pointerover', () => drawBtn(true));
    hit.on('pointerout', () => drawBtn(false));

    // Change mode link
    topY += 48;
    const link = this.add
      .text(W / 2, topY, 'Back to menu', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '13px',
        color: '#6b6375',
        fontStyle: 'italic',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    link.on('pointerup', () => {
      useRunStore.getState().reset();
      this.scene.start('MenuScene');
    });

    // Footer
    this.add
      .text(W / 2, H - 24, 'v0.3.0', {
        fontFamily: 'ui-monospace, monospace',
        fontSize: '10px',
        color: '#a8a2b3',
      })
      .setOrigin(0.5);
  }
}

function parseHex(hex: string): number {
  if (!hex.startsWith('#')) return 0xff7a59;
  const n = parseInt(hex.slice(1), 16);
  return Number.isFinite(n) ? n : 0xff7a59;
}
