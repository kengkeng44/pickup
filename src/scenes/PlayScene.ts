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
import { Mascot } from '../ui/Mascot';
import { SCENARIO_META, FREE_PRACTICE_META } from '../data/scenarios';
import { PHASER_WIDTH, PHASER_HEIGHT } from '../main';

const ROUND_TIME_MS = 15_000;
const HP_MAX = 3;
const ADVANCE_CORRECT_MS = 4_000;
const ADVANCE_WRONG_MS = 8_000;
const ADVANCE_TIMEOUT_MS = 8_000;
const TIMER_LOW_THRESHOLD_MS = 5_000;

/**
 * PlayScene (portrait v0.3).
 *
 * Layout (top → bottom, 400×800 reference):
 *   0–60     Header strip (logo, HP, score, mute)
 *  60–100    Scenario context strip (scenario mode only)
 * 100–270    Mascot area (DOM overlay; Phaser draws a tinted bg circle)
 * 270–400    Sentence card
 * 400–660    Answer buttons (ClozeUI DOM overlay, vertical stack)
 * 660–740    Timer ring + Continue button area
 * 740–800    Safe area
 *
 * Phaser owns: header text, HP hearts, score, scenario strip,
 * mascot background tint, sentence card bg, sentence text, timer ring,
 * fx (screen flash, shake).
 *
 * DOM (overlay) owns: mascot SVG, 4 vertical buttons, reveal panel.
 */
export class PlayScene extends Phaser.Scene {
  // Header
  private headerBg!: Phaser.GameObjects.Graphics;
  private hearts: Phaser.GameObjects.Text[] = [];
  private scoreText!: Phaser.GameObjects.Text;

  // Scenario strip
  private scenarioStrip?: Phaser.GameObjects.Container;
  private scenarioStripBg?: Phaser.GameObjects.Graphics;
  private scenarioStripText?: Phaser.GameObjects.Text;

  // Mascot bg + sentence card
  private mascotBg!: Phaser.GameObjects.Graphics;
  private sentenceCard!: Phaser.GameObjects.Graphics;
  private sentenceText!: Phaser.GameObjects.Text;
  private streakText!: Phaser.GameObjects.Text;

  // Timer
  private timerArcBg!: Phaser.GameObjects.Graphics;
  private timerArc!: Phaser.GameObjects.Graphics;
  private timerText!: Phaser.GameObjects.Text;

  // Misc
  private changeModeLink!: Phaser.GameObjects.Text;
  private loadingText?: Phaser.GameObjects.Text;
  private retryBtn?: Phaser.GameObjects.Container;
  private flashOverlay!: Phaser.GameObjects.Rectangle;

  private clozeUI?: ClozeUI;
  private mascot?: Mascot;

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
    const W = PHASER_WIDTH;
    const H = PHASER_HEIGHT;
    const meta = this.activeMeta();

    // Background tint based on scenario accent.
    this.cameras.main.setBackgroundColor(meta.tint);

    // ── Header strip ──────────────────────────────────────────────────────────
    this.headerBg = this.add.graphics();
    this.headerBg.fillStyle(0xffffff, 1);
    this.headerBg.fillRect(0, 0, W, 60);
    this.headerBg.lineStyle(1, 0xe7e2d4, 1);
    this.headerBg.lineBetween(0, 60, W, 60);

    this.add
      .text(20, 30, 'WordWar', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '18px',
        fontStyle: 'bold',
        color: '#2a2730',
      })
      .setOrigin(0, 0.5);

    // HP hearts under logo line
    this.hearts = [];
    for (let i = 0; i < HP_MAX; i++) {
      const heart = this.add
        .text(110 + i * 22, 30, '♥', {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '20px',
          color: '#e25c4d',
          fontStyle: 'bold',
        })
        .setOrigin(0, 0.5);
      this.hearts.push(heart);
    }

    // Score (centered-ish right of hearts)
    this.scoreText = this.add
      .text(W - 60, 30, '0', {
        fontFamily: 'ui-monospace, monospace',
        fontSize: '20px',
        fontStyle: 'bold',
        color: '#2fb380',
      })
      .setOrigin(1, 0.5);

    // Mute button top-right corner
    new MuteButton(this, W - 24, 30);

    // ── Scenario context strip ────────────────────────────────────────────────
    this.buildScenarioStrip();

    // ── Mascot background (tint + circle) ─────────────────────────────────────
    this.mascotBg = this.add.graphics();
    this.drawMascotBg();

    // ── Sentence card ─────────────────────────────────────────────────────────
    this.sentenceCard = this.add.graphics();
    this.drawSentenceCard();

    this.sentenceText = this.add
      .text(W / 2, 335, '', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '20px',
        fontStyle: 'bold',
        color: '#2a2730',
        align: 'center',
        wordWrap: { width: W - 48, useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    this.streakText = this.add
      .text(W / 2, 397, '', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '12px',
        color: '#ff7a59',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // ── Timer arc (small, bottom of sentence card) ────────────────────────────
    const timerCx = W - 36;
    const timerCy = 90;
    this.timerArcBg = this.add.graphics();
    this.timerArc = this.add.graphics();
    this.drawTimerRing(timerCx, timerCy, 1);
    this.timerText = this.add
      .text(timerCx, timerCy, '15', {
        fontFamily: 'ui-monospace, monospace',
        fontSize: '15px',
        fontStyle: 'bold',
        color: '#2a2730',
      })
      .setOrigin(0.5);

    // Change-mode link (small, top of mascot area)
    this.changeModeLink = this.add
      .text(20, 90, '← change', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '11px',
        color: '#a8a2b3',
        fontStyle: 'italic',
      })
      .setOrigin(0, 0.5)
      .setInteractive({ useHandCursor: true });
    this.changeModeLink.on('pointerup', () => {
      this.cleanupOverlay();
      this.stopTimer();
      this.scene.start('MenuScene');
    });

    // Screen-flash overlay
    this.flashOverlay = this.add
      .rectangle(W / 2, H / 2, W, H, 0x2fb380, 0)
      .setDepth(1000);

    this.loadingText = this.add
      .text(W / 2, H / 2, 'Loading…', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '18px',
        color: '#6b6375',
      })
      .setOrigin(0.5);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.cleanupOverlay();
    });

    this.bootstrap();
  }

  // ─── Scenario meta accessors ───────────────────────────────────────────────

  private activeMeta(): {
    accent: string;
    tint: string;
    mascotId: string;
    emoji: string;
    labelZh: string;
    labelEn: string;
  } {
    const { mode, scenario } = useRunStore.getState();
    if (mode === 'scenario' && scenario) {
      return SCENARIO_META[scenario];
    }
    return FREE_PRACTICE_META;
  }

  private buildScenarioStrip(): void {
    const W = PHASER_WIDTH;
    const meta = this.activeMeta();
    const { mode } = useRunStore.getState();
    if (mode !== 'scenario') return;

    this.scenarioStrip = this.add.container(0, 60);
    this.scenarioStripBg = this.add.graphics();
    this.scenarioStripBg.fillStyle(parseHex(meta.accent), 1);
    this.scenarioStripBg.fillRect(0, 0, W, 40);
    this.scenarioStrip.add(this.scenarioStripBg);

    this.scenarioStripText = this.add
      .text(W / 2, 20, '', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        fontStyle: 'bold',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    this.scenarioStrip.add(this.scenarioStripText);
  }

  private updateScenarioStripText(): void {
    const { mode, scenario, history } = useRunStore.getState();
    if (mode !== 'scenario' || !scenario || !this.scenarioStripText) return;
    const meta = SCENARIO_META[scenario];
    const qNum = Math.min(history.length + 1, RUN_CONFIG.QUESTIONS_PER_RUN);
    this.scenarioStripText.setText(
      `${meta.emoji} ${meta.labelEn} — Question ${qNum} of ${RUN_CONFIG.QUESTIONS_PER_RUN}`
    );
  }

  private drawMascotBg(): void {
    const W = PHASER_WIDTH;
    const meta = this.activeMeta();
    const { mode } = useRunStore.getState();
    const stripOffset = mode === 'scenario' ? 40 : 0;
    const top = 60 + stripOffset;
    const bottom = 270;
    this.mascotBg.clear();
    // Soft gradient-ish using two filled rects with slight alpha diff.
    this.mascotBg.fillStyle(parseHex(meta.tint), 1);
    this.mascotBg.fillRect(0, top, W, bottom - top);
    // Decorative center circle behind mascot
    this.mascotBg.fillStyle(0xffffff, 0.55);
    this.mascotBg.fillCircle(W / 2, (top + bottom) / 2 + 6, 78);
  }

  private drawSentenceCard(): void {
    const W = PHASER_WIDTH;
    const meta = this.activeMeta();
    const x = 16;
    const y = 286;
    const w = W - 32;
    const h = 130;

    this.sentenceCard.clear();
    // Subtle shadow
    this.sentenceCard.fillStyle(0x000000, 0.06);
    this.sentenceCard.fillRoundedRect(x, y + 3, w, h, 16);
    // Card body
    this.sentenceCard.fillStyle(0xffffff, 1);
    this.sentenceCard.fillRoundedRect(x, y, w, h, 16);
    // Accent left bar
    this.sentenceCard.fillStyle(parseHex(meta.accent), 1);
    this.sentenceCard.fillRoundedRect(x, y, 4, h, 4);
  }

  // ─── Bootstrap & loading ────────────────────────────────────────────────────

  private async bootstrap(): Promise<void> {
    const store = useRunStore.getState();
    try {
      if (store.mode === 'scenario') {
        await store.loadScenarios();
      } else {
        await store.loadSentences();
      }
    } catch {
      // setError already happened inside the loader
    }
    const after = useRunStore.getState();
    const ready =
      after.mode === 'scenario'
        ? !!after.scenarioQuestions
        : !!after.questions;
    if (after.error || !ready) {
      this.showLoadFailure(after.error ?? 'unknown');
      return;
    }
    this.loadingText?.destroy();
    this.loadingText = undefined;

    store.reset();
    this.displayedScore = 0;
    this.scoreText.setText('0');

    // Mount DOM overlays.
    this.clozeUI = new ClozeUI(
      {
        onAnswer: (idx) => this.handleAnswer(idx),
        onContinue: () => this.handleContinue(),
      },
      { accent: this.activeMeta().accent }
    );
    this.mascot = new Mascot();
    this.mascot.setScenarioStripVisible(
      useRunStore.getState().mode === 'scenario'
    );
    this.mascot.setMascot(this.activeMeta().mascotId);

    this.nextRound();
  }

  private showLoadFailure(reason: string): void {
    const W = PHASER_WIDTH;
    const H = PHASER_HEIGHT;
    if (this.loadingText) {
      this.loadingText.setText(`Failed to load\n${reason}`);
      this.loadingText.setColor('#e25c4d');
      this.loadingText.setAlign('center');
    }
    if (this.retryBtn) return;
    const c = this.add.container(W / 2, H / 2 + 60);
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
      if (this.loadingText) this.loadingText.setText('Loading…');
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

    const rounds = store.history.length;
    if (rounds >= RUN_CONFIG.QUESTIONS_PER_RUN || store.hp <= 0) {
      this.toEnd();
      return;
    }

    store.startRound();
    const after = useRunStore.getState();
    if (!after.round) {
      this.toEnd();
      return;
    }

    this.clozeUI?.resetForRound();
    this.mascot?.setAnim('idle');
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
    this.mascot?.destroy();
    this.mascot = undefined;
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

    this.sentenceText.setText(formatSentence(round.sentence));
    this.animateScoreTo(state.score);

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

    this.updateScenarioStripText();
  }

  private animateSentenceIn(): void {
    const baseY = 335;
    this.sentenceText.y = baseY - 12;
    this.sentenceText.alpha = 0;
    this.sentenceText.setScale(0.96);
    this.tweens.add({
      targets: this.sentenceText,
      y: baseY,
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
      this.mascot?.setAnim('happy');
      this.playScreenFlash(0x2fb380, 0.18);
      sfxCorrect();
      audio.vibrate(30);
      this.scheduleAdvance(ADVANCE_CORRECT_MS);
    } else {
      this.mascot?.setAnim('sad');
      this.shakeHearts();
      sfxWrong();
      sfxHpLoss();
      audio.vibrate([50, 30, 50]);
      this.scheduleAdvance(ADVANCE_WRONG_MS);
    }

    this.renderHud();
  }

  private handleContinue(): void {
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
    const W = PHASER_WIDTH;
    const timerCx = W - 36;
    const timerCy = 90;

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

  private drawTimerRing(
    cx: number,
    cy: number,
    ratio: number,
    low = false
  ): void {
    const r = 18;
    const meta = this.activeMeta();
    this.timerArcBg.clear();
    this.timerArcBg.lineStyle(3, 0xf0eadc, 1);
    this.timerArcBg.strokeCircle(cx, cy, r);

    this.timerArc.clear();
    if (ratio <= 0) return;
    const color = low ? 0xe25c4d : parseHex(meta.accent);
    this.timerArc.lineStyle(5, color, 1);
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
    this.mascot?.setAnim('sad');
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
    const W = PHASER_WIDTH;
    this.drawTimerRing(W - 36, 90, 1);
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
        this.scoreText.setText(`${Math.round(counter.v)}`);
      },
      onComplete: () => {
        this.displayedScore = target;
        this.scoreText.setText(`${target}`);
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
      x: '+=4',
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

function formatSentence(raw: string): string {
  return raw.replace(/_{3,}/g, '  _____  ');
}

/** "#ff7a59" → 0xff7a59. Returns 0xff7a59 fallback on parse failure. */
function parseHex(hex: string): number {
  if (!hex.startsWith('#')) return 0xff7a59;
  const n = parseInt(hex.slice(1), 16);
  return Number.isFinite(n) ? n : 0xff7a59;
}
