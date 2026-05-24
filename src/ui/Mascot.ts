/**
 * Mascot — DOM element that renders the current NPC SVG and switches
 * between idle / happy / sad animation states via CSS classes.
 *
 * v0.6: now a normal in-flow DOM element. The caller passes the parent
 * container (a flex-flow slot inside #app). No more `position: fixed`
 * stacked on top of other UI — the parent layout decides where the
 * mascot sits, and the mascot just fills its slot at the responsive
 * scale.
 *
 * Responsive scale (CSS variable `--mascot-scale` on each instance's
 * root) still applies. A shared ResizeObserver watches the viewport:
 *
 *   innerHeight >= 720   → scale 1.00 (160 × 180)
 *   innerHeight >= 620   → scale 0.75 (120 × 135)
 *   innerHeight <  620   → scale 0.60 ( 96 × 108)
 *
 * CSS animations only — no requestAnimationFrame loops. Idle bobs
 * continuously, happy/sad are one-shot then auto-revert to idle.
 */

import { applyStyle } from './domUtil';
import { getMascotSvg, type MascotAnim } from './mascots';

const ONE_SHOT_MS = 700;

// ─── Shared responsive scale watcher ─────────────────────────────────────────
// One observer for the whole app. Instances subscribe; observer disconnects
// itself when the last subscriber leaves. Re-attaches on next subscription.

type ScaleListener = (scale: number) => void;

let scaleObserver: ResizeObserver | null = null;
let scaleWindowListener: (() => void) | null = null;
const scaleListeners = new Set<ScaleListener>();
let currentScale = computeScale();

function computeScale(): number {
  if (typeof window === 'undefined') return 1;
  const h = window.innerHeight;
  if (h < 620) return 0.6;
  if (h < 720) return 0.75;
  return 1;
}

function recomputeAndBroadcast(): void {
  const next = computeScale();
  if (next === currentScale) return;
  currentScale = next;
  scaleListeners.forEach((cb) => cb(next));
}

function subscribeScale(cb: ScaleListener): () => void {
  scaleListeners.add(cb);
  cb(currentScale);
  if (scaleListeners.size === 1 && typeof window !== 'undefined') {
    if (typeof ResizeObserver !== 'undefined') {
      scaleObserver = new ResizeObserver(() => recomputeAndBroadcast());
      scaleObserver.observe(document.documentElement);
    }
    scaleWindowListener = () => recomputeAndBroadcast();
    window.addEventListener('resize', scaleWindowListener);
    window.addEventListener('orientationchange', scaleWindowListener);
  }
  return () => {
    scaleListeners.delete(cb);
    if (scaleListeners.size === 0) {
      if (scaleObserver) {
        scaleObserver.disconnect();
        scaleObserver = null;
      }
      if (scaleWindowListener && typeof window !== 'undefined') {
        window.removeEventListener('resize', scaleWindowListener);
        window.removeEventListener('orientationchange', scaleWindowListener);
        scaleWindowListener = null;
      }
    }
  };
}

// ─── Mascot ─────────────────────────────────────────────────────────────────

export interface MascotOptions {
  /** Parent container the mascot is appended into. Defaults to <body>
   *  (legacy behaviour) but real usage passes a flex slot in #app. */
  parent?: HTMLElement;
}

export class Mascot {
  private root: HTMLDivElement;
  private inner: HTMLDivElement;
  private currentMascot = '';
  private oneShotTimer?: number;
  private unsubScale?: () => void;
  /** Optional multiplier on top of the responsive viewport scale. */
  private extraScale = 1;
  /** Last responsive scale seen (cached for re-application on extraScale changes). */
  private viewportScale = currentScale;

  constructor(opts: MascotOptions = {}) {
    this.root = document.createElement('div');
    this.root.id = 'wordwar-mascot';
    // In-flow flex child. Width/height inherit from CSS var so changes
    // flow through; `margin: 0 auto` centers within the parent slot.
    applyStyle(this.root, {
      width: 'calc(160px * var(--mascot-scale, 1))',
      height: 'calc(180px * var(--mascot-scale, 1))',
      margin: '0 auto',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto',
      transition: 'width 200ms ease-out, height 200ms ease-out',
    });

    this.inner = document.createElement('div');
    this.inner.className = 'mascot-wrap mascot-idle';
    applyStyle(this.inner, {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
    this.root.appendChild(this.inner);

    (opts.parent ?? document.body).appendChild(this.root);

    this.unsubScale = subscribeScale((s) => {
      this.viewportScale = s;
      this.applyScale();
    });
  }

  /**
   * v0.5 API kept for compatibility — in the v0.6 flex layout the
   * scenario chip is a sibling, so the mascot doesn't need to offset
   * itself any more. No-op.
   */
  setScenarioStripVisible(_visible: boolean): void {
    // No-op in v0.6: flex layout handles spacing.
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

  /**
   * Apply an additional scale multiplier on top of the responsive viewport
   * scale — used by EndOverlay to render a larger celebration mascot.
   */
  setExtraScale(s: number): void {
    this.extraScale = s;
    this.applyScale();
  }

  destroy(): void {
    this.clearOneShot();
    this.unsubScale?.();
    this.unsubScale = undefined;
    this.root.remove();
  }

  show(): void {
    this.root.style.display = 'flex';
  }

  hide(): void {
    this.root.style.display = 'none';
  }

  private applyScale(): void {
    const total = this.viewportScale * this.extraScale;
    this.root.style.setProperty('--mascot-scale', String(total));
  }

  private clearOneShot(): void {
    if (this.oneShotTimer !== undefined) {
      window.clearTimeout(this.oneShotTimer);
      this.oneShotTimer = undefined;
    }
  }
}
