import Phaser from 'phaser';
import type { POS } from '../data/vocab';
import { audio } from '../audio/AudioManager';
import { sfxCardPress } from '../audio/sfx';

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
// Mobile tap target padding: the *visible* card is cardW×cardH, but the
// hit area extends a few pixels beyond every edge so fat fingers near a
// card edge still register. WCAG 2.5.5 recommends ≥44×44 CSS px tap targets;
// adding 12px padding lifts most card sizes over that minimum after FIT scaling.
const HIT_PADDING = 12;

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
 * Clickable word-card.
 *
 * Tap-bug v2 fixes:
 *   1. Hit area extends `HIT_PADDING` beyond visible bounds so a finger near
 *      the edge still registers.
 *   2. `pointerup` AND `pointerupoutside` both trigger the click — touch
 *      release often fires `pointerupoutside` if the finger drifts even a
 *      pixel after press. We gate on `wasPressed` instead of "released over".
 *   3. Cards are NOT interactive until their entrance tween completes — we
 *      explicitly call `setInteractive` at the end of `playEntrance` rather
 *      than in the constructor, eliminating the "tap during slide-in" race.
 *   4. We do NOT mutate state on `pointerout` — touch always fires `pointerout`
 *      on release, which was wiping the pressed state before `pointerup`
 *      could read it.
 *   5. Scale tween targets only the container's scale property; the hit area
 *      stays at the original visual bounds.
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
  private isActive = false; // false until entrance finishes
  private wasPressed = false;
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

    // Hit area is set later in `enableInput()` — after entrance animation.
    this.setSize(this.cardW + HIT_PADDING * 2, this.cardH + HIT_PADDING * 2);

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
    } else {
      this.wasPressed = false;
    }
  }

  flashCorrect(): void {
    this.setCardState('correct');
    this.scene.tweens.add({
      targets: this,
      scale: 1.18,
      alpha: 0.0,
      duration: 280,
      ease: 'Back.easeOut',
    });
  }

  flashWrong(): void {
    this.setCardState('wrong');
    const amp = 8;
    const dur = 36;
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
   * Input is enabled once the entrance completes (no taps mid-slide).
   */
  playEntrance(delay: number): void {
    const targetY = this.homeY;
    this.y = this.homeY + 60;
    this.alpha = 0;
    this.setScale(0.92);
    this.scene.tweens.add({
      targets: this,
      y: targetY,
      alpha: 1,
      scale: 1,
      duration: 220,
      delay,
      ease: 'Back.easeOut',
      onComplete: () => this.enableInput(),
    });
  }

  /**
   * Make the card interactive. Idempotent. Called when entrance settles.
   */
  private enableInput(): void {
    const hw = this.cardW / 2 + HIT_PADDING;
    const hh = this.cardH / 2 + HIT_PADDING;
    if (!this.input) {
      this.setInteractive(
        new Phaser.Geom.Rectangle(-hw, -hh, hw * 2, hh * 2),
        Phaser.Geom.Rectangle.Contains
      );

      // Hover (desktop only — touch devices fire this on tap-down which we
      // already handle via pointerdown).
      this.on('pointerover', () => {
        if (this.isActive && this.cardState === 'idle') this.setCardState('hover');
      });

      // Pointerout: ONLY reset visual state when not pressed. Do NOT touch
      // wasPressed — we want to treat "press then drift then release outside"
      // as still a valid tap.
      this.on('pointerout', () => {
        if (!this.isActive) return;
        if (this.cardState === 'hover') {
          this.setCardState('idle');
        }
      });

      this.on('pointerdown', () => {
        if (!this.isActive) return;
        this.wasPressed = true;
        this.setCardState('pressed');
        // SFX: card press — also serves as the gesture that unlocks the
        // AudioContext on iOS Safari.
        sfxCardPress();
        // Light haptic tap.
        audio.vibrate(10);
        this.scene.tweens.add({
          targets: this,
          scale: 0.94,
          duration: 70,
          ease: 'Quad.easeOut',
        });
      });

      // Both pointerup and pointerupoutside register the tap. Phaser fires
      // pointerupoutside when a touch ends with the pointer position outside
      // the hit area — common on mobile because the finger releases off-pad
      // by a pixel or two.
      this.on('pointerup', () => this.handleRelease());
      this.on('pointerupoutside', () => this.handleRelease());
    }
    this.isActive = true;
  }

  private handleRelease(): void {
    if (!this.isActive) return;
    if (!this.wasPressed) return; // ignore stray ups (e.g., touch resumed after lock)
    this.wasPressed = false;
    this.scene.tweens.add({
      targets: this,
      scale: 1,
      duration: 70,
      ease: 'Quad.easeOut',
    });
    // We don't flip back to hover on touch — leave at idle until decision FX.
    this.setCardState('idle');
    if (this.onClickCb) this.onClickCb(this.word);
  }

  private redraw(): void {
    const { fill, stroke } = this.colorsForState();
    const hw = this.cardW / 2;
    const hh = this.cardH / 2;

    const shadowOffset = this.cardState === 'pressed' ? 1 : 4;
    this.shadow.clear();
    this.shadow.fillStyle(COLORS.shadow, 0.55);
    this.shadow.fillRoundedRect(-hw, -hh + shadowOffset, this.cardW, this.cardH, RADIUS);

    this.bg.clear();
    this.bg.fillStyle(fill, 1);
    this.bg.lineStyle(2, stroke, 1);
    this.bg.fillRoundedRect(-hw, -hh, this.cardW, this.cardH, RADIUS);
    this.bg.strokeRoundedRect(-hw, -hh, this.cardW, this.cardH, RADIUS);

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
