import Phaser from 'phaser';
import { useRunStore } from '../store/runStore';
import { roundTypeLabel, roundTypeShort } from '../data/roundGenerator';
import { CardSprite } from '../ui/CardSprite';
import type { Vocab } from '../data/vocab';
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

const ROUNDS_PER_RUN = 10;
const ROUND_TIME_MS = 15_000;
// Tighter feedback window — v1 was 650ms which felt sluggish on a streak.
// 480ms still lets the player read the result + see the score bump without
// dragging the round-to-round cadence.
const FLASH_MS = 480;
const HP_MAX = 3;

export class PlayScene extends Phaser.Scene {
  private targetText!: Phaser.GameObjects.Text;
  private typeText!: Phaser.GameObjects.Text;
  private typeChipBg!: Phaser.GameObjects.Graphics;
  private hearts: Phaser.GameObjects.Text[] = [];
  private hpLabel!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private roundText!: Phaser.GameObjects.Text;
  private streakText!: Phaser.GameObjects.Text;
  private timerArcBg!: Phaser.GameObjects.Graphics;
  private timerArc!: Phaser.GameObjects.Graphics;
  private timerText!: Phaser.GameObjects.Text;
  private skipBtn!: Phaser.GameObjects.Container;
  private skipBtnLabel!: Phaser.GameObjects.Text;
  private skipBtnBg!: Phaser.GameObjects.Graphics;
  private loadingText?: Phaser.GameObjects.Text;
  private retryBtn?: Phaser.GameObjects.Container;
  private flashOverlay!: Phaser.GameObjects.Rectangle;
  private cardSprites: CardSprite[] = [];
  private cardsLocked = false;
  private roundEndsAt = 0;
  private timerEvent?: Phaser.Time.TimerEvent;
  private timerLowPulseTween?: Phaser.Tweens.Tween;
  private timerExpired = false;
  private lastTickSecond = -1;
  private displayedScore = 0;
  private scoreTween?: Phaser.Tweens.Tween;

  constructor() {
    super({ key: 'PlayScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // ── Top-center: round-type chip ───────────────────────────────────────────
    this.typeChipBg = this.add.graphics();
    this.typeText = this.add
      .text(width / 2, 38, '', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '13px',
        fontStyle: 'bold',
        color: '#a86a2a',
      })
      .setOrigin(0.5);

    // Bilingual hint below the chip — small, gentle muted color.
    this.add
      .text(width / 2, 60, '', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '12px',
        color: '#6b6375',
      })
      .setOrigin(0.5)
      .setName('typeHint');

    // ── Target word — the hero element ────────────────────────────────────────
    this.targetText = this.add
      .text(width / 2, 120, '', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '56px',
        fontStyle: 'bold',
        color: '#2a2730',
      })
      .setOrigin(0.5);

    // ── HUD middle row: hearts (HP), score, round counter ─────────────────────
    this.hpLabel = this.add.text(40, 190, 'HP', {
      fontFamily: 'ui-monospace, monospace',
      fontSize: '12px',
      color: '#6b6375',
      fontStyle: 'bold',
    });
    this.hearts = [];
    for (let i = 0; i < HP_MAX; i++) {
      const heart = this.add.text(70 + i * 24, 184, '♥', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '22px',
        color: '#e25c4d',
        fontStyle: 'bold',
      });
      this.hearts.push(heart);
    }

    this.scoreText = this.add
      .text(width / 2, 195, 'Score 0', {
        fontFamily: 'ui-monospace, monospace',
        fontSize: '20px',
        fontStyle: 'bold',
        color: '#2fb380',
      })
      .setOrigin(0.5, 0);

    this.streakText = this.add
      .text(width / 2, 220, '', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '13px',
        color: '#ff7a59',
        fontStyle: 'bold',
      })
      .setOrigin(0.5, 0);

    this.roundText = this.add
      .text(width - 40, 195, `Round 1 / ${ROUNDS_PER_RUN}`, {
        fontFamily: 'ui-monospace, monospace',
        fontSize: '16px',
        color: '#6b6375',
        fontStyle: 'bold',
      })
      .setOrigin(1, 0);

    // ── Timer: circular arc at top-right under the round counter ──────────────
    const timerCx = width - 60;
    const timerCy = 270;
    this.timerArcBg = this.add.graphics();
    this.timerArc = this.add.graphics();
    this.drawTimerRing(timerCx, timerCy, 1);
    this.timerText = this.add
      .text(timerCx, timerCy, '15', {
        fontFamily: 'ui-monospace, monospace',
        fontSize: '22px',
        fontStyle: 'bold',
        color: '#2a2730',
      })
      .setOrigin(0.5);

    // ── Skip button (bottom-left) — escape hatch when a word is unknown ───────
    this.skipBtn = this.add.container(60, height - 40);
    this.skipBtnBg = this.add.graphics();
    this.skipBtnLabel = this.add
      .text(0, 0, 'Skip', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '13px',
        fontStyle: 'bold',
        color: '#6b6375',
      })
      .setOrigin(0.5);
    this.skipBtn.add([this.skipBtnBg, this.skipBtnLabel]);
    this.redrawSkipBtn(false);
    this.skipBtn.setSize(80, 32);
    this.skipBtn.setInteractive(
      new Phaser.Geom.Rectangle(-40, -16, 80, 32),
      Phaser.Geom.Rectangle.Contains
    );
    this.skipBtn.on('pointerover', () => this.redrawSkipBtn(true));
    this.skipBtn.on('pointerout', () => this.redrawSkipBtn(false));
    this.skipBtn.on('pointerup', () => this.handleSkip());

    // ── Mute button (top-right corner) ────────────────────────────────────────
    // 28px in from each edge — outside the timer ring's 26px radius.
    new MuteButton(this, width - 28, 28);

    // ── Screen-flash overlay (subtle, only for correct answers) ───────────────
    this.flashOverlay = this.add
      .rectangle(width / 2, height / 2, width, height, 0x2fb380, 0)
      .setDepth(1000);

    // ── Loading text ──────────────────────────────────────────────────────────
    this.loadingText = this.add
      .text(width / 2, height / 2, 'Loading vocab…', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '22px',
        color: '#6b6375',
      })
      .setOrigin(0.5);

    this.bootstrap();
  }

  // ─── Bootstrap & loading ────────────────────────────────────────────────────

  private async bootstrap(): Promise<void> {
    const store = useRunStore.getState();
    await store.loadVocab();
    const after = useRunStore.getState();
    if (after.error || !after.vocab) {
      this.showLoadFailure(after.error ?? 'unknown');
      return;
    }
    this.loadingText?.destroy();
    this.loadingText = undefined;
    store.reset();
    this.displayedScore = 0;
    this.scoreText.setText('Score 0');
    this.nextRound();
  }

  private showLoadFailure(reason: string): void {
    if (this.loadingText) {
      this.loadingText.setText(`Failed to load vocab\n${reason}`);
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
      if (this.loadingText) this.loadingText.setText('Loading vocab…');
      // Best-effort: nuke cached error and try again.
      this.bootstrap();
    });
    this.retryBtn = c;
  }

  // ─── Round lifecycle ────────────────────────────────────────────────────────

  private nextRound(): void {
    this.clearTimer();
    const store = useRunStore.getState();
    if (!store.vocab) return;

    const rounds = store.history.length;
    if (rounds >= ROUNDS_PER_RUN || store.hp <= 0) {
      this.scene.start('EndScene');
      return;
    }

    store.startRound();
    this.timerExpired = false;
    this.lastTickSecond = -1;
    this.renderHud();
    this.animateTargetIn();
    this.renderHand(useRunStore.getState().vocab!);
    this.startTimer();
    // Swoosh between rounds (skipped on round 1 — first round opens silently
    // since BGM hasn't been authorized by user gesture yet anyway).
    if (rounds > 0) {
      sfxRoundTransition();
    }
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
    this.typeText.setText(roundTypeShort(round.type));
    const hint = this.children.getByName('typeHint') as Phaser.GameObjects.Text | null;
    if (hint) hint.setText(roundTypeLabel(round.type));
    this.layoutTypeChip();
    this.targetText.setText(round.target);
    // v2 polish: animate score gains with a quick count-up + pop, so the
    // player FEELS the points arrive rather than just seeing a number change.
    this.animateScoreTo(state.score);
    this.roundText.setText(`Round ${state.history.length + 1} / ${ROUNDS_PER_RUN}`);

    // Hearts: show 3 outlines, fill the first `hp` with red.
    for (let i = 0; i < this.hearts.length; i++) {
      const filled = i < state.hp;
      this.hearts[i].setText(filled ? '♥' : '♡');
      this.hearts[i].setColor(filled ? '#e25c4d' : '#d9d3c2');
    }

    // Streak indicator (only shown at 2+).
    if (state.streak >= 2) {
      this.streakText.setText(`\u{1F525} ${state.streak} streak`);
    } else {
      this.streakText.setText('');
    }
    // Unused locals guard — keeps the field referenced.
    this.hpLabel.setVisible(true);
  }

  private layoutTypeChip(): void {
    const { width } = this.cameras.main;
    const padX = 14;
    const padY = 6;
    const tw = this.typeText.width;
    const th = this.typeText.height;
    const cx = width / 2;
    const cy = 38;
    const w = tw + padX * 2;
    const h = th + padY * 2;
    this.typeChipBg.clear();
    this.typeChipBg.fillStyle(0xfff0db, 1);
    this.typeChipBg.fillRoundedRect(cx - w / 2, cy - h / 2, w, h, h / 2);
  }

  private animateTargetIn(): void {
    // v2 polish: shorter entrance (220ms vs 320ms). Snappiness comes from
    // sub-250ms response — at 320ms the player felt like they were waiting
    // for the round to "start" rather than playing it.
    const targetY = 120;
    this.targetText.y = targetY - 24;
    this.targetText.alpha = 0;
    this.targetText.setScale(0.94);
    this.tweens.add({
      targets: this.targetText,
      y: targetY,
      alpha: 1,
      scale: 1,
      duration: 220,
      ease: 'Back.easeOut',
    });
  }

  private renderHand(vocab: Vocab): void {
    for (const c of this.cardSprites) c.destroy();
    this.cardSprites = [];
    this.cardsLocked = false;

    const round = useRunStore.getState().round;
    if (!round) return;

    const { width, height } = this.cameras.main;
    const hand = round.hand;
    // Adaptive sizing — clamp card width so 5 cards fit a 375px-logical viewport
    // (game scales via Phaser.Scale.FIT, but we still want cards to read).
    const maxTotalW = Math.min(width - 40, 820);
    const idealCardW = 140;
    const gap = 16;
    const totalIdeal = hand.length * idealCardW + (hand.length - 1) * gap;
    const cardW =
      totalIdeal > maxTotalW
        ? Math.floor((maxTotalW - (hand.length - 1) * gap) / hand.length)
        : idealCardW;
    const cardH = Math.round(cardW * (180 / 140));
    const totalW = hand.length * cardW + (hand.length - 1) * gap;
    const startX = (width - totalW) / 2 + cardW / 2;
    const y = height - 130;

    hand.forEach((word, idx) => {
      const entry = vocab[word];
      const pos = entry ? entry.pos : 'n';
      const sprite = new CardSprite({
        scene: this,
        x: startX + idx * (cardW + gap),
        y,
        word,
        pos,
        width: cardW,
        height: cardH,
        onClick: (w) => this.handleCardClick(w),
      });
      // v2 polish: stagger 35ms not 60ms — total entry is now 35×3+220 ≈ 325ms
      // vs v1's 60×3+280 = 460ms. The cards feel like they "appear together"
      // rather than waiting in line.
      sprite.playEntrance(35 * idx);
      this.cardSprites.push(sprite);
    });
  }

  // ─── Input handlers ─────────────────────────────────────────────────────────

  private handleCardClick(word: string): void {
    if (this.cardsLocked || this.timerExpired) return;
    this.cardsLocked = true;
    for (const c of this.cardSprites) c.setEnabled(false);
    this.stopTimer();

    // First card tap is the gesture that unlocks the AudioContext on iOS.
    // Lazy-start BGM here rather than in BootScene because the tap-anywhere
    // there sometimes wasn't being honored as a user-gesture by iOS Safari
    // when scene-start fired immediately.
    this.maybeStartBgm();

    const store = useRunStore.getState();
    const result = store.playCard(word);

    const playedSprite = this.cardSprites.find((c) => c.word === word);
    if (playedSprite) {
      if (result.correct) {
        playedSprite.flashCorrect();
        this.spawnFloatingScore(playedSprite.x, playedSprite.y, result.pointsGained);
        this.playScreenFlash(0x2fb380, 0.18);
        sfxCorrect();
        audio.vibrate(30);
      } else {
        playedSprite.flashWrong();
        this.shakeHearts();
        sfxWrong();
        sfxHpLoss();
        audio.vibrate([50, 30, 50]);
      }
    }

    this.renderHud();
    this.time.delayedCall(FLASH_MS, () => this.nextRound());
  }

  private handleSkip(): void {
    if (this.cardsLocked || this.timerExpired) return;
    this.cardsLocked = true;
    for (const c of this.cardSprites) c.setEnabled(false);
    this.stopTimer();
    this.maybeStartBgm();
    useRunStore.getState().timeoutRound();
    this.shakeHearts();
    sfxHpLoss();
    audio.vibrate([80, 40, 80]);
    this.renderHud();
    this.time.delayedCall(FLASH_MS, () => this.nextRound());
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
    const timerCx = width - 60;
    const timerCy = 270;

    // Switch color/pulse below 5s.
    const low = remaining <= 5_000 && remaining > 0;
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

    // Tick SFX + light haptic each second under 5s, fires once per second.
    if (low && seconds !== this.lastTickSecond) {
      this.lastTickSecond = seconds;
      sfxTimerTick();
      audio.vibrate(20);
    }
    if (!low) this.lastTickSecond = -1;

    if (remaining <= 0 && !this.timerExpired && !this.cardsLocked) {
      this.timerExpired = true;
      this.handleTimeout();
    }
  }

  private drawTimerRing(cx: number, cy: number, ratio: number, low = false): void {
    // v2 polish: thicker active arc (7px) vs background (4px) makes the
    // depleting timer pop visually. Background also lightened to #f0eadc.
    const r = 26;
    this.timerArcBg.clear();
    this.timerArcBg.lineStyle(4, 0xf0eadc, 1);
    this.timerArcBg.strokeCircle(cx, cy, r);

    this.timerArc.clear();
    if (ratio <= 0) return;
    const color = low ? 0xe25c4d : 0xff7a59;
    this.timerArc.lineStyle(7, color, 1);
    const start = -Math.PI / 2;
    const end = start + Math.PI * 2 * ratio;
    // Phaser's arc draws clockwise when anticlockwise=false.
    this.timerArc.beginPath();
    this.timerArc.arc(cx, cy, r, start, end, false);
    this.timerArc.strokePath();
  }

  private handleTimeout(): void {
    if (this.cardsLocked) return;
    this.cardsLocked = true;
    for (const c of this.cardSprites) c.setEnabled(false);
    this.stopTimer();
    useRunStore.getState().timeoutRound();
    this.shakeHearts();
    sfxHpLoss();
    audio.vibrate([80, 40, 80]);
    this.renderHud();

    // Visual cue for timeout — target text turns red briefly.
    const prev = this.targetText.style.color;
    this.targetText.setColor('#e25c4d');
    this.tweens.add({
      targets: this.targetText,
      alpha: { from: 1, to: 0.5 },
      duration: 200,
      yoyo: true,
    });
    this.time.delayedCall(FLASH_MS, () => {
      this.targetText.setColor(prev);
      this.nextRound();
    });
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
  }

  private clearTimer(): void {
    this.stopTimer();
    const { width } = this.cameras.main;
    this.drawTimerRing(width - 60, 270, 1);
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
    // Quick scale pop on the score text — only on gains, not on reset.
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

  private spawnFloatingScore(x: number, y: number, points: number): void {
    if (points <= 0) return;
    const t = this.add
      .text(x, y - 20, `+${points}`, {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '32px',
        fontStyle: 'bold',
        color: '#2fb380',
      })
      .setOrigin(0.5)
      .setDepth(1100);
    this.tweens.add({
      targets: t,
      y: y - 90,
      alpha: { from: 1, to: 0 },
      duration: 700,
      ease: 'Quad.easeOut',
      onComplete: () => t.destroy(),
    });
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
    // Brief red flash on hearts.
    targets.forEach((h) => {
      const prev = h.style.color;
      h.setColor('#ff3b30');
      this.time.delayedCall(220, () => h.setColor(prev));
    });

    // v2 polish: subtle red screen flash gives HP loss real weight. The
    // existing green flash on correct answers reads as positive feedback;
    // mirror it with red on wrong to balance the two states emotionally.
    this.playScreenFlash(0xe25c4d, 0.14);

    // Camera shake — tiny but felt. (4px amplitude, 200ms)
    this.cameras.main.shake(180, 0.004);
  }

  private redrawSkipBtn(hover: boolean): void {
    this.skipBtnBg.clear();
    this.skipBtnBg.fillStyle(hover ? 0xfff0db : 0xfdfaf2, 1);
    this.skipBtnBg.lineStyle(1, 0xd9d3c2, 1);
    this.skipBtnBg.fillRoundedRect(-40, -16, 80, 32, 8);
    this.skipBtnBg.strokeRoundedRect(-40, -16, 80, 32, 8);
    this.skipBtnLabel.setColor(hover ? '#2a2730' : '#6b6375');
  }
}
