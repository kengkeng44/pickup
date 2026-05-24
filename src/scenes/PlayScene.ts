import Phaser from 'phaser';
import { useRunStore } from '../store/runStore';
import { roundTypeLabel, roundTypeShort } from '../data/roundGenerator';
import { CardSprite } from '../ui/CardSprite';
import type { Vocab } from '../data/vocab';

const ROUNDS_PER_RUN = 10;
const ROUND_TIME_MS = 15_000;
const FLASH_MS = 650;
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
    this.renderHud();
    this.animateTargetIn();
    this.renderHand(useRunStore.getState().vocab!);
    this.startTimer();
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
    this.scoreText.setText(`Score ${state.score}`);
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
    const targetY = 120;
    this.targetText.y = targetY - 40;
    this.targetText.alpha = 0;
    this.targetText.setScale(0.92);
    this.tweens.add({
      targets: this.targetText,
      y: targetY,
      alpha: 1,
      scale: 1,
      duration: 320,
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
      sprite.playEntrance(60 * idx);
      this.cardSprites.push(sprite);
    });
  }

  // ─── Input handlers ─────────────────────────────────────────────────────────

  private handleCardClick(word: string): void {
    if (this.cardsLocked || this.timerExpired) return;
    this.cardsLocked = true;
    for (const c of this.cardSprites) c.setEnabled(false);
    this.stopTimer();

    const store = useRunStore.getState();
    const result = store.playCard(word);

    const playedSprite = this.cardSprites.find((c) => c.word === word);
    if (playedSprite) {
      if (result.correct) {
        playedSprite.flashCorrect();
        this.spawnFloatingScore(playedSprite.x, playedSprite.y, result.pointsGained);
        this.playScreenFlash(0x2fb380, 0.18);
      } else {
        playedSprite.flashWrong();
        this.shakeHearts();
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
    useRunStore.getState().timeoutRound();
    this.shakeHearts();
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

    if (remaining <= 0 && !this.timerExpired && !this.cardsLocked) {
      this.timerExpired = true;
      this.handleTimeout();
    }
  }

  private drawTimerRing(cx: number, cy: number, ratio: number, low = false): void {
    const r = 26;
    this.timerArcBg.clear();
    this.timerArcBg.lineStyle(5, 0xe7e2d4, 1);
    this.timerArcBg.strokeCircle(cx, cy, r);

    this.timerArc.clear();
    if (ratio <= 0) return;
    const color = low ? 0xe25c4d : 0xff7a59;
    this.timerArc.lineStyle(5, color, 1);
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
