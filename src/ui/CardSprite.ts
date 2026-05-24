import Phaser from 'phaser';
import type { POS } from '../data/vocab';

export type CardState = 'idle' | 'hover' | 'pressed' | 'correct' | 'wrong';

export interface CardSpriteOpts {
  scene: Phaser.Scene;
  x: number;
  y: number;
  word: string;
  pos: POS;
  width?: number;
  height?: number;
  onClick?: (word: string) => void;
}

const W = 140;
const H = 180;
const RADIUS = 16;

// Light-theme palette tuned for cream background #fdfaf2.
// Body text contrast on idle card (#2a2730 on #ffffff) ≈ 14.4:1 — passes WCAG AA.
const COLORS = {
  idleFill: 0xffffff,
  idleStroke: 0xe7e2d4,
  hoverFill: 0xfff7e8,
  hoverStroke: 0xff7a59,
  pressedFill: 0xfff0db,
  pressedStroke: 0xff7a59,
  correctFill: 0xe6f7e9,
  correctStroke: 0x2fb380,
  wrongFill: 0xfde8e6,
  wrongStroke: 0xe25c4d,
  badgeBg: 0xfff0db,
  shadow: 0xd9d3c2,
};

const POS_LABEL: Record<POS, string> = {
  n: 'noun',
  v: 'verb',
  a: 'adj',
  r: 'adv',
};

/**
 * A single clickable word-card. Container holds:
 *   - drop-shadow Graphics
 *   - background Graphics (rounded rect with state-driven fill/stroke)
 *   - small POS pill (subtle, learner-friendly — "noun" beats "n.")
 *   - word Text
 *
 * Animation:
 *   - pointerdown: scale 0.95 (~80ms)
 *   - pointerup:   scale back to 1.0
 *   - wrong: horizontal shake (~200ms, 5 jitter frames)
 *   - correct: scale-up + fade-out (caller drives next round transition)
 */
export class CardSprite extends Phaser.GameObjects.Container {
  public readonly word: string;
  public readonly pos: POS;
  private shadow: Phaser.GameObjects.Graphics;
  private bg: Phaser.GameObjects.Graphics;
  private badge: Phaser.GameObjects.Graphics;
  private wordText: Phaser.GameObjects.Text;
  private badgeText: Phaser.GameObjects.Text;
  private cardState: CardState = 'idle';
  private cardW: number;
  private cardH: number;
  private isActive = true;
  private homeX: number;
  private homeY: number;
  private onClickCb?: (word: string) => void;

  constructor(opts: CardSpriteOpts) {
    super(opts.scene, opts.x, opts.y);
    this.word = opts.word;
    this.pos = opts.pos;
    this.cardW = opts.width ?? W;
    this.cardH = opts.height ?? H;
    this.homeX = opts.x;
    this.homeY = opts.y;
    this.onClickCb = opts.onClick;

    this.shadow = new Phaser.GameObjects.Graphics(opts.scene);
    this.add(this.shadow);

    this.bg = new Phaser.GameObjects.Graphics(opts.scene);
    this.add(this.bg);

    this.badge = new Phaser.GameObjects.Graphics(opts.scene);
    this.add(this.badge);

    this.badgeText = new Phaser.GameObjects.Text(opts.scene, 0, 0, POS_LABEL[opts.pos], {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '11px',
      color: '#a86a2a',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add(this.badgeText);

    this.wordText = new Phaser.GameObjects.Text(opts.scene, 0, 0, opts.word, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '22px',
      color: '#2a2730',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: this.cardW - 20 },
    }).setOrigin(0.5);
    this.add(this.wordText);

    // Hit area covering the card.
    this.setSize(this.cardW, this.cardH);
    this.setInteractive(
      new Phaser.Geom.Rectangle(-this.cardW / 2, -this.cardH / 2, this.cardW, this.cardH),
      Phaser.Geom.Rectangle.Contains
    );

    this.on('pointerover', () => {
      if (this.isActive && this.cardState === 'idle') this.setCardState('hover');
    });
    this.on('pointerout', () => {
      if (this.isActive && (this.cardState === 'hover' || this.cardState === 'pressed')) {
        this.setCardState('idle');
        this.scene.tweens.add({
          targets: this,
          scale: 1,
          duration: 80,
          ease: 'Quad.easeOut',
        });
      }
    });
    this.on('pointerdown', () => {
      if (!this.isActive) return;
      this.setCardState('pressed');
      this.scene.tweens.add({
        targets: this,
        scale: 0.95,
        duration: 80,
        ease: 'Quad.easeOut',
      });
    });
    this.on('pointerup', () => {
      if (!this.isActive) return;
      this.scene.tweens.add({
        targets: this,
        scale: 1,
        duration: 80,
        ease: 'Quad.easeOut',
      });
      this.setCardState('hover');
      if (this.onClickCb) this.onClickCb(this.word);
    });

    this.layout();
    this.setCardState('idle');

    opts.scene.add.existing(this as Phaser.GameObjects.Container);
  }

  private layout(): void {
    const badgeW = 44;
    const badgeH = 18;
    const badgeX = -this.cardW / 2 + 10 + badgeW / 2;
    const badgeY = -this.cardH / 2 + 10 + badgeH / 2;
    this.badgeText.setPosition(badgeX, badgeY);
    this.wordText.setPosition(0, 10);
  }

  setCardState(state: CardState): void {
    this.cardState = state;
    this.redraw();
  }

  setEnabled(enabled: boolean): void {
    this.isActive = enabled;
    if (enabled) {
      this.setCardState('idle');
    }
  }

  /**
   * Snappy correct feedback: state flip + zoom-out + fade. Caller advances round.
   */
  flashCorrect(): void {
    this.setCardState('correct');
    this.scene.tweens.add({
      targets: this,
      scale: 1.15,
      alpha: 0.0,
      duration: 320,
      ease: 'Quad.easeOut',
    });
  }

  /**
   * Wrong feedback: red state + horizontal shake (~200ms).
   */
  flashWrong(): void {
    this.setCardState('wrong');
    const amp = 8;
    const dur = 40;
    this.scene.tweens.chain({
      targets: this,
      tweens: [
        { x: this.homeX - amp, duration: dur, ease: 'Sine.easeInOut' },
        { x: this.homeX + amp, duration: dur, ease: 'Sine.easeInOut' },
        { x: this.homeX - amp * 0.6, duration: dur, ease: 'Sine.easeInOut' },
        { x: this.homeX + amp * 0.6, duration: dur, ease: 'Sine.easeInOut' },
        { x: this.homeX, duration: dur, ease: 'Sine.easeInOut' },
      ],
    });
  }

  /**
   * Slide-up entrance from below home position; staggered by index.
   */
  playEntrance(delay: number): void {
    const targetY = this.homeY;
    this.y = this.homeY + 60;
    this.alpha = 0;
    this.scene.tweens.add({
      targets: this,
      y: targetY,
      alpha: 1,
      duration: 280,
      delay,
      ease: 'Back.easeOut',
    });
  }

  private redraw(): void {
    const { fill, stroke } = this.colorsForState();
    const hw = this.cardW / 2;
    const hh = this.cardH / 2;

    // Drop shadow (offset down, lighter when pressed).
    const shadowOffset = this.cardState === 'pressed' ? 1 : 4;
    this.shadow.clear();
    this.shadow.fillStyle(COLORS.shadow, 0.55);
    this.shadow.fillRoundedRect(-hw, -hh + shadowOffset, this.cardW, this.cardH, RADIUS);

    this.bg.clear();
    this.bg.fillStyle(fill, 1);
    this.bg.lineStyle(2, stroke, 1);
    this.bg.fillRoundedRect(-hw, -hh, this.cardW, this.cardH, RADIUS);
    this.bg.strokeRoundedRect(-hw, -hh, this.cardW, this.cardH, RADIUS);

    // Badge background — soft warm pill.
    this.badge.clear();
    const badgeW = 44;
    const badgeH = 18;
    const badgeX = -hw + 10;
    const badgeY = -hh + 10;
    this.badge.fillStyle(COLORS.badgeBg, 1);
    this.badge.fillRoundedRect(badgeX, badgeY, badgeW, badgeH, 9);
  }

  private colorsForState(): { fill: number; stroke: number } {
    switch (this.cardState) {
      case 'hover':
        return { fill: COLORS.hoverFill, stroke: COLORS.hoverStroke };
      case 'pressed':
        return { fill: COLORS.pressedFill, stroke: COLORS.pressedStroke };
      case 'correct':
        return { fill: COLORS.correctFill, stroke: COLORS.correctStroke };
      case 'wrong':
        return { fill: COLORS.wrongFill, stroke: COLORS.wrongStroke };
      case 'idle':
      default:
        return { fill: COLORS.idleFill, stroke: COLORS.idleStroke };
    }
  }
}
