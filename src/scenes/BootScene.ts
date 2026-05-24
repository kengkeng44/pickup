import Phaser from 'phaser';
import { getMascotSvg } from '../ui/mascots';

/**
 * BootScene — v0.7 splash / cover page.
 *
 * Duolingo-style intro: white canvas, tagline, BIG mascot, bold green
 * wordmark, full-width 3D CTA button, fine-print meta. No auto-advance —
 * the user taps the green button (or anywhere on the splash, for
 * backward compatibility) to enter the menu.
 */
export class BootScene extends Phaser.Scene {
  private overlay?: HTMLDivElement;

  constructor() {
    super({ key: 'BootScene' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#ffffff');
    this.mountOverlay();

    let advanced = false;
    const advance = () => {
      if (advanced) return;
      advanced = true;
      this.overlay?.remove();
      this.overlay = undefined;
      this.scene.start('MenuScene');
    };

    // Wire up the CTA button + anywhere-tap fallback.
    const cta = this.overlay?.querySelector<HTMLButtonElement>(
      '.wordwar-splash-cta'
    );
    cta?.addEventListener('click', (e) => {
      e.preventDefault();
      advance();
    });
    this.overlay?.addEventListener(
      'pointerdown',
      (e) => {
        // Don't fire the anywhere-tap if the CTA's own handler will run.
        const t = e.target as HTMLElement | null;
        if (t && t.closest('.wordwar-splash-cta')) return;
        advance();
      },
      { once: false }
    );

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.overlay?.remove();
      this.overlay = undefined;
    });
  }

  private mountOverlay(): void {
    const root = document.createElement('div');
    root.id = 'wordwar-splash';

    // Tagline (top)
    const tagline = document.createElement('div');
    tagline.className = 'wordwar-splash-tagline';
    tagline.textContent = '學英文,贏對戰';
    root.appendChild(tagline);

    // Mascot (middle, big)
    const mascot = document.createElement('div');
    mascot.className = 'wordwar-splash-mascot';
    mascot.innerHTML = getMascotSvg('owl');
    root.appendChild(mascot);

    // Title (big bold green)
    const title = document.createElement('div');
    title.className = 'wordwar-splash-title';
    title.textContent = 'WORDWAR';
    root.appendChild(title);

    // CTA
    const cta = document.createElement('button');
    cta.type = 'button';
    cta.className = 'wordwar-splash-cta';
    cta.textContent = '開始';
    root.appendChild(cta);

    // Meta
    const meta = document.createElement('div');
    meta.className = 'wordwar-splash-meta';
    meta.textContent = '1361 個 A2 單字 · 5 個情境模式';
    root.appendChild(meta);

    // Tiny version footer
    const footer = document.createElement('div');
    footer.textContent = `v0.7.0 · Phaser ${Phaser.VERSION}`;
    Object.assign(footer.style, {
      position: 'absolute',
      bottom: 'max(20px, env(safe-area-inset-bottom))',
      fontSize: '11px',
      color: '#a8a2b3',
      fontFamily:
        'ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace',
    } as CSSStyleDeclaration);
    root.appendChild(footer);

    document.body.appendChild(root);
    this.overlay = root;
  }
}
