import Phaser from 'phaser';
import { useRunStore, RUN_CONFIG } from '../store/runStore';
import { audio } from '../audio/AudioManager';
import { startBgm } from '../audio/bgm';
import {
  sfxCorrect,
  sfxWrong,
  sfxTimerTick,
  sfxRoundTransition,
  sfxHpLoss,
} from '../audio/sfx';
import { MuteButton } from '../ui/MuteButton';
import { ClozeUI } from '../ui/ClozeUI';

const ROUND_TIME_MS = 15_000;
const HP_MAX = 3;
const ADVANCE_CORRECT_MS = 4_000;
const ADVANCE_WRONG_MS = 8_000;
const ADVANCE_TIMEOUT_MS = 8_000;
// Threshold (ms remaining) at which the timer enters "low" state.
const TIMER_LOW_THRESHOLD_MS = 5_000;

/**
 * PlayScene (cloze rewrite).
 *
 * Phaser is responsible for:
 *   - Sentence (with blank) display
 *   - HUD (HP hearts, score, round counter, streak)
 *   - Timer ring + countdown text
 *   - Mute button, "change level" link
 *   - Visual juice (screen flash on correct, shake on wrong)
 *
 * Phaser is NOT responsible for:
 *   - The 4 answer buttons (they live in ClozeUI as DOM overlay — see ClozeUI.ts)
 *   - The reveal panel (also in ClozeUI)
 *
 * This division is deliberate: HTML buttons get rock-solid touch handling
 * out of the box, which Phaser hit-testing did not on certain Android devices.
 */
export class PlayScene extends Phaser.Scene {
  private sentenceText!: Phaser.GameObjects.Text;
  private hearts: Phaser.GameObjects.Text[] = [];
  private scoreText!: Phaser.GameObjects.Text;
  private roundText!: Phaser.GameObjects.Text;
  private streakText!: Phaser.GameObjects.Text;
  private levelBadge!: Phaser.GameObjects.Text;
  private changeLevelLink!: Phaser.GameObjects.Text;
  private timerArcBg!: Phaser.GameObjects.Graphics;
  private timerArc!: Phaser.GameObjects.Graphics;
  private timerText!: Phaser.GameObjects.Text;
  private loadingText?: Phaser.GameObjects.Text;
  private retryBtn?: Phaser.GameObjects.Container;
  private flashOverlay!: Phaser.GameObjects.Rectangle;

  private clozeUI?: ClozeUI;
  private roundEndsAt = 0;
  private timerEvent?: Phaser.Time.TimerEvent;
  private timerLowPulseTween?: Phaser.Tweens.Tween;
  private timerExpired = false;
  private lastTickSecond = -1;
  private displayedScore = 0;
  private scoreTween?: Phaser.Tweens.Tween;
  private warningPlaying = false;
  private advanceTimer?: Phaser.Time.TimerEvent;
  private locked = false;

  constructor() {
    super({ key: 'PlayScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // ── Level badge (top-left) ────────────────────────────────────────────────
    this.levelBadge = this.add
      .text(40, 32, '', {
        fontFamily: 'ui-monospace, Consolas, monospace',
        fontSize: '13px',
        fontStyle: 'bold',
        color: '#a86a2a',
        backgroundColor: '#fff0db',
        padding: { left: 10, right: 10, top: 4, bottom: 4 },
      })
      .setOrigin(0, 0.5);

    this.changeLevelLink = this.add
      .text(40 + 60, 32, 'change', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '11px',
        color: '#a8a2b3',
        fontStyle: 'italic',
      })
      .setOrigin(0, 0.5)
      .setInteractive({ useHandCursor: true });
    this.changeLevelLink.on('pointerup', () => {
      this.clozeUI?.destroy();
      this.clozeUI = undefined;
      this.stopTimer();
      this.scene.start('MenuScene');
    });

    // ── Sentence — the hero element ───────────────────────────────────────────
    this.sentenceText = this.add
      .text(width / 2, height / 2 - 40, '', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '30px',
        fontStyle: 'bold',
        color: '#2a2730',
        align: 'center',
        wordWrap: { width: width - 60, useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    // ── HUD middle row: hearts (HP), score, round counter ─────────────────────
    this.hearts = [];
    for (let i = 0; i < HP_MAX; i++) {
      const heart = this.add.text(40 + i * 24, 64, '♥', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '22px',
        color: '#e25c4d',
        fontStyle: 'bold',
      });
      this.hearts.push(heart);
    }

    this.scoreText = this.add
      .text(width / 2, 72, 'Score 0', {
        fontFamily: 'ui-monospace, monospace',
        fontSize: '20px',
        fontStyle: 'bold',
        color: '#2fb380',
      })
      .setOrigin(0.5, 0);

    this.streakText = this.add
      .text(width / 2, 96, '', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '13px',
        color: '#ff7a59',
        fontStyle: 'bold',
      })
      .setOrigin(0.5, 0);

    this.roundText = this.add
      .text(width - 76, 72, `Round 1 / ${RUN_CONFIG.QUESTIONS_PER_RUN}`, {
        fontFamily: 'ui-monospace, monospace',
        fontSize: '14px',
        color: '#6b6375',
        fontStyle: 'bold',
      })
      .setOrigin(1, 0);

    // ── Timer: circular arc at top-right ──────────────────────────────────────
    const timerCx = width - 40;
    const timerCy = 130;
    this.timerArcBg = this.add.graphics();
    this.timerArc = this.add.graphics();
    this.drawTimerRing(timerCx, timerCy, 1);
    this.timerText = this.add
      .text(timerCx, timerCy, '15', {
        fontFamily: 'ui-monospace, monospace',
        fontSize: '20px',
        fontStyle: 'bold',
        color: '#2a2730',
      })
      .setOrigin(0.5);

    // Mute button (top-right corner)
    new MuteButton(this, width - 28, 32);

    // Screen-flash overlay
    this.flashOverlay = this.add
      .rectangle(width / 2, height / 2, width, height, 0x2fb380, 0)
      .setDepth(1000);

    this.loadingText = this.add
      .text(width / 2, height / 2, 'Loading sentences…', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '22px',
        color: '#6b6375',
      })
      .setOrigin(0.5);

    // Clean up the DOM overlay if scene shuts down (e.g., navigating to End).
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.cleanupOverlay();
    });

    this.bootstrap();
  }

  // ─── Bootstrap & loading ────────────────────────────────────────────────────

  private async bootstrap(): Promise<void> {
    const store = useRunStore.getState();
    await store.loadSentences();
    const after = useRunStore.getState();
    if (after.error || !after.questions) {
      this.showLoadFailure(after.error ?? 'unknown');
      return;
    }
    this.loadingText?.destroy();
    this.loadingText = undefined;

    store.reset();
    this.displayedScore = 0;
    this.scoreText.setText('Score 0');

    // Mount the DOM overlay once per scene lifetime.
    this.clozeUI = new ClozeUI({
      onAnswer: (idx) => this.handleAnswer(idx),
      onContinue: () => this.handleContinue(),
    });

    this.nextRound();
  }

  private showLoadFailure(reason: string): void {
    if (this.loadingText) {
      this.loadingText.setText(`Failed to load sentences\n${reason}`);
      this.loadingText.setColor('#e25c4d');
      this.loadingText.setAlign('center');
    }
    if (this.retryBtn) return;
    const { width, height } = this.cameras.main;
    const c = this.add.container(width / 2, height / 2 + 80);
    const bg = this.add.graphics();
    bg.fillStyle(0xff7a59, 1);
    bg.fillRoundedRect(-70, -22, 140, 44, 10);
    const label = this.add
      .text(0, 0, 'Retry', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '18px',
        fontStyle: 'bold',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    c.add([bg, label]);
    c.setSize(140, 44);
    c.setInteractive(
      new Phaser.Geom.Rectangle(-70, -22, 140, 44),
      Phaser.Geom.Rectangle.Contains
    );
    c.on('pointerup', () => {
      c.destroy();
      this.retryBtn = undefined;
      if (this.loadingText) this.loadingText.setText('Loading sentences…');
      this.bootstrap();
    });
    this.retryBtn = c;
  }

  // ─── Round lifecycle ────────────────────────────────────────────────────────

  private nextRound(): void {
    this.clearTimer();
    this.cancelAdvanceTimer();
    this.locked = false;
    this.stopWarning();

    const store = useRunStore.getState();
    if (!store.questions) return;

    const rounds = store.history.length;
    if (rounds >= RUN_CONFIG.QUESTIONS_PER_RUN || store.hp <= 0) {
      this.toEnd();
      return;
    }

    store.startRound();
    const after = useRunStore.getState();
    if (!after.round) {
      // Out of questions — finish run.
      this.toEnd();
      return;
    }

    this.clozeUI?.resetForRound();
    this.timerExpired = false;
    this.lastTickSecond = -1;
    this.renderHud();
    this.animateSentenceIn();
    this.startTimer();

    if (rounds > 0) {
      sfxRoundTransition();
    }
  }

  private toEnd(): void {
    this.cleanupOverlay();
    this.scene.start('EndScene');
  }

  private cleanupOverlay(): void {
    this.clozeUI?.destroy();
    this.clozeUI = undefined;
    this.stopWarning();
  }

  private maybeStartBgm(): void {
    if (audio.audioMuted) return;
    if (audio.isBgmRunning) return;
    const ctx = audio.ensureContext();
    if (!ctx) return;
    startBgm();
  }

  private renderHud(): void {
    const state = useRunStore.getState();
    const round = state.round;
    if (!round) return;

    this.levelBadge.setText(state.level);
    // Position the change-level link right after the badge.
    this.changeLevelLink.x = this.levelBadge.x + this.levelBadge.width + 8;

    // Sentence with stylized blank.
    this.sentenceText.setText(formatSentence(round.sentence));

    this.animateScoreTo(state.score);
    this.roundText.setText(
      `Round ${state.history.length + 1} / ${RUN_CONFIG.QUESTIONS_PER_RUN}`
    );

    for (let i = 0; i < this.hearts.length; i++) {
      const filled = i < state.hp;
      this.hearts[i].setText(filled ? '♥' : '♡');
      this.hearts[i].setColor(filled ? '#e25c4d' : '#d9d3c2');
    }

    if (state.streak >= 2) {
      this.streakText.setText(`\u{1F525} ${state.streak} streak`);
    } else {
      this.streakText.setText('');
    }
  }

  private animateSentenceIn(): void {
    const { height } = this.cameras.main;
    const targetY = height / 2 - 40;
    this.sentenceText.y = targetY - 18;
    this.sentenceText.alpha = 0;
    this.sentenceText.setScale(0.96);
    this.tweens.add({
      targets: this.sentenceText,
      y: targetY,
      alpha: 1,
      scale: 1,
      duration: 220,
      ease: 'Back.easeOut',
    });
  }

  // ─── Answer / reveal flow ───────────────────────────────────────────────────

  private handleAnswer(idx: number): void {
    if (this.locked || this.timerExpired) return;
    this.locked = true;
    this.stopTimer();
    this.maybeStartBgm();

    const state = useRunStore.getState();
    if (!state.round) return;
    const result = state.answer(idx);

    this.clozeUI?.revealAnswer(idx, result.correctIndex, result.explanationZh);

    if (result.correct) {
      this.playScreenFlash(0x2fb380, 0.18);
      sfxCorrect();
      audio.vibrate(30);
      this.scheduleAdvance(ADVANCE_CORRECT_MS);
    } else {
      this.shakeHearts();
      sfxWrong();
      sfxHpLoss();
      audio.vibrate([50, 30, 50]);
      this.scheduleAdvance(ADVANCE_WRONG_MS);
    }

    this.renderHud();
  }

  private handleContinue(): void {
    // Player tapped Continue before auto-advance fired.
    if (!this.locked && !this.timerExpired) return;
    this.cancelAdvanceTimer();
    this.nextRound();
  }

  private scheduleAdvance(ms: number): void {
    this.cancelAdvanceTimer();
    this.advanceTimer = this.time.delayedCall(ms, () => this.nextRound());
  }

  private cancelAdvanceTimer(): void {
    if (this.advanceTimer) {
      this.advanceTimer.remove(false);
      this.advanceTimer = undefined;
    }
  }

  // ─── Timer ──────────────────────────────────────────────────────────────────

  private startTimer(): void {
    this.roundEndsAt = this.time.now + ROUND_TIME_MS;
    this.timerEvent = this.time.addEvent({
      delay: 50,
      loop: true,
      callback: () => this.tickTimer(),
    });
    this.tickTimer();
  }

  private tickTimer(): void {
    const remaining = Math.max(0, this.roundEndsAt - this.time.now);
    const ratio = remaining / ROUND_TIME_MS;
    const seconds = Math.ceil(remaining / 1000);
    const { width } = this.cameras.main;
    const timerCx = width - 40;
    const timerCy = 130;

    const low = remaining <= TIMER_LOW_THRESHOLD_MS && remaining > 0;
    this.timerText.setText(String(seconds));
    this.timerText.setColor(low ? '#e25c4d' : '#2a2730');
    this.drawTimerRing(timerCx, timerCy, ratio, low);

    if (low && !this.timerLowPulseTween) {
      this.timerLowPulseTween = this.tweens.add({
        targets: this.timerText,
        scale: { from: 1.0, to: 1.18 },
        duration: 360,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }
    if (!low && this.timerLowPulseTween) {
      this.timerLowPulseTween.stop();
      this.timerText.setScale(1);
      this.timerLowPulseTween = undefined;
    }

    // Warning layer triggers at 5s, mutes on answer/round change.
    if (low && !this.warningPlaying && !this.locked) {
      audio.playWarningLayer();
      this.warningPlaying = true;
    }

    if (low && seconds !== this.lastTickSecond) {
      this.lastTickSecond = seconds;
      sfxTimerTick();
      audio.vibrate(20);
    }
    if (!low) this.lastTickSecond = -1;

    if (remaining <= 0 && !this.timerExpired && !this.locked) {
      this.timerExpired = true;
      this.handleTimeout();
    }
  }

  private stopWarning(): void {
    if (this.warningPlaying) {
      audio.stopWarningLayer();
      this.warningPlaying = false;
    }
  }

  private drawTimerRing(cx: number, cy: number, ratio: number, low = false): void {
    const r = 22;
    this.timerArcBg.clear();
    this.timerArcBg.lineStyle(4, 0xf0eadc, 1);
    this.timerArcBg.strokeCircle(cx, cy, r);

    this.timerArc.clear();
    if (ratio <= 0) return;
    const color = low ? 0xe25c4d : 0xff7a59;
    this.timerArc.lineStyle(7, color, 1);
    const start = -Math.PI / 2;
    const end = start + Math.PI * 2 * ratio;
    this.timerArc.beginPath();
    this.timerArc.arc(cx, cy, r, start, end, false);
    this.timerArc.strokePath();
  }

  private handleTimeout(): void {
    this.locked = true;
    this.stopTimer();
    const result = useRunStore.getState().timeoutRound();
    this.clozeUI?.revealTimeout(result.correctIndex, result.explanationZh);
    this.shakeHearts();
    sfxHpLoss();
    audio.vibrate([80, 40, 80]);
    this.renderHud();
    this.scheduleAdvance(ADVANCE_TIMEOUT_MS);
  }

  private stopTimer(): void {
    if (this.timerEvent) {
      this.timerEvent.remove(false);
      this.timerEvent = undefined;
    }
    if (this.timerLowPulseTween) {
      this.timerLowPulseTween.stop();
      this.timerText.setScale(1);
      this.timerLowPulseTween = undefined;
    }
    this.stopWarning();
  }

  private clearTimer(): void {
    this.stopTimer();
    const { width } = this.cameras.main;
    this.drawTimerRing(width - 40, 130, 1);
    this.timerText.setText('15');
    this.timerText.setColor('#2a2730');
  }

  // ─── FX ─────────────────────────────────────────────────────────────────────

  private animateScoreTo(target: number): void {
    if (target === this.displayedScore) return;
    if (this.scoreTween) {
      this.scoreTween.stop();
      this.scoreTween = undefined;
    }
    const from = this.displayedScore;
    const counter = { v: from };
    this.scoreTween = this.tweens.add({
      targets: counter,
      v: target,
      duration: 360,
      ease: 'Quad.easeOut',
      onUpdate: () => {
        this.scoreText.setText(`Score ${Math.round(counter.v)}`);
      },
      onComplete: () => {
        this.displayedScore = target;
        this.scoreText.setText(`Score ${target}`);
        this.scoreTween = undefined;
      },
    });
    if (target > from) {
      this.tweens.add({
        targets: this.scoreText,
        scale: { from: 1.0, to: 1.15 },
        duration: 120,
        yoyo: true,
        ease: 'Quad.easeOut',
      });
    }
  }

  private playScreenFlash(color: number, peakAlpha: number): void {
    this.flashOverlay.setFillStyle(color);
    this.flashOverlay.setAlpha(0);
    this.tweens.add({
      targets: this.flashOverlay,
      alpha: { from: peakAlpha, to: 0 },
      duration: 280,
      ease: 'Quad.easeOut',
    });
  }

  private shakeHearts(): void {
    const targets = this.hearts;
    const baseXs = targets.map((h) => h.x);
    this.tweens.add({
      targets,
      x: '+=6',
      yoyo: true,
      duration: 60,
      repeat: 2,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        targets.forEach((h, i) => (h.x = baseXs[i]));
      },
    });
    targets.forEach((h) => {
      const prev = h.style.color;
      h.setColor('#ff3b30');
      this.time.delayedCall(220, () => h.setColor(prev));
    });
    this.playScreenFlash(0xe25c4d, 0.14);
    this.cameras.main.shake(180, 0.004);
  }
}

/**
 * Replace ___ with a styled blank in the rendered sentence.
 *
 * We can't apply rich text styling in a single Phaser.Text easily, so we
 * just substitute the underscores with a visible underline character
 * sequence. The cloze UX is clear from context (4 buttons below).
 */
function formatSentence(raw: string): string {
  // Replace the literal ___ marker with a wider visual blank.
  return raw.replace(/_{3,}/g, '  _____  ');
}
