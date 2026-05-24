/**
 * Mascot — DOM overlay that renders the current NPC SVG and switches
 * between idle / happy / sad animation states via CSS classes.
 *
 * Lives above the cloze button row but below the reveal panel — its DOM
 * is mounted on the same overlay layer as ClozeUI. We use a dedicated
 * wrapper div positioned in the "mascot area" of the portrait layout
 * (top-third of the screen, below the header strip).
 *
 * CSS animations only — no requestAnimationFrame loops. Idle bobs
 * continuously, happy/sad are one-shot 600ms then auto-revert to idle.
 */

import { applyStyle } from './domUtil';
import { getMascotSvg, type MascotAnim } from './mascots';

const ONE_SHOT_MS = 700;

export class Mascot {
  private root: HTMLDivElement;
  private inner: HTMLDivElement;
  private currentMascot = '';
  private oneShotTimer?: number;

  constructor() {
    this.root = document.createElement('div');
    this.root.id = 'wordwar-mascot';
    applyStyle(this.root, {
      position: 'fixed',
      top: 'calc(60px + 40px + max(0px, env(safe-area-inset-top)))',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '160px',
      height: '180px',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '8',
    });

    this.inner = document.createElement('div');
    this.inner.className = 'mascot-wrap mascot-idle';
    applyStyle(this.inner, {
      width: '140px',
      height: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
    this.root.appendChild(this.inner);

    document.body.appendChild(this.root);
  }

  setScenarioStripVisible(visible: boolean): void {
    // When scenario strip is present, push mascot down a bit.
    this.root.style.top = visible
      ? 'calc(60px + 40px + max(0px, env(safe-area-inset-top)))'
      : 'calc(60px + max(0px, env(safe-area-inset-top)))';
  }

  setMascot(mascotId: string): void {
    if (mascotId === this.currentMascot) return;
    this.currentMascot = mascotId;
    this.inner.innerHTML = getMascotSvg(mascotId);
  }

  setAnim(anim: MascotAnim): void {
    this.clearOneShot();
    this.inner.classList.remove('mascot-idle', 'mascot-happy', 'mascot-sad');
    this.inner.classList.add(`mascot-${anim}`);
    if (anim !== 'idle') {
      this.oneShotTimer = window.setTimeout(() => {
        this.setAnim('idle');
      }, ONE_SHOT_MS);
    }
  }

  destroy(): void {
    this.clearOneShot();
    this.root.remove();
  }

  show(): void {
    this.root.style.display = 'flex';
  }

  hide(): void {
    this.root.style.display = 'none';
  }

  private clearOneShot(): void {
    if (this.oneShotTimer !== undefined) {
      window.clearTimeout(this.oneShotTimer);
      this.oneShotTimer = undefined;
    }
  }
}
