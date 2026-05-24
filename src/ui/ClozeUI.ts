/**
 * ClozeUI — DOM overlay rendering the 4 cloze answer buttons + reveal
 * panel, positioned in the bottom half of the portrait phone layout.
 *
 * v0.3 changes vs M4:
 *   - Buttons are vertical-stacked, not 2×2 — thumb-friendly on phone.
 *   - Buttons span ~max-width 400px to stay inside the phone container.
 *   - Optional scenario accent color (passed in via constructor opts)
 *     tints the "Continue" CTA + the reveal panel border.
 */

import { useRunStore } from '../store/runStore';
import type { ClozeQuestion } from '../data/sentences';
import { applyStyle } from './domUtil';

export interface ClozeUIHandlers {
  onAnswer: (selectedIndex: number) => void;
  onContinue: () => void;
}

export interface ClozeUIOptions {
  /** Hex accent color used for the Continue button + reveal panel border. */
  accent: string;
}

interface BtnRefs {
  el: HTMLButtonElement;
  label: HTMLSpanElement;
  letter: HTMLSpanElement;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export class ClozeUI {
  private root: HTMLDivElement;
  private btnCol: HTMLDivElement;
  private buttons: BtnRefs[] = [];
  private revealPanel: HTMLDivElement;
  private revealText: HTMLDivElement;
  private revealContinue: HTMLButtonElement;
  private unsub?: () => void;
  private handlers: ClozeUIHandlers;
  private accent: string;
  private currentQuestion: ClozeQuestion | null = null;
  private locked = false;

  constructor(handlers: ClozeUIHandlers, opts: ClozeUIOptions) {
    this.handlers = handlers;
    this.accent = opts.accent;

    this.root = document.createElement('div');
    this.root.id = 'cloze-overlay';
    applyStyle(this.root, {
      position: 'fixed',
      inset: '0',
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
      zIndex: '10',
    });

    // Vertical button column.
    this.btnCol = document.createElement('div');
    applyStyle(this.btnCol, {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: 'min(400px, calc(100vw - 32px))',
      pointerEvents: 'none',
    });

    for (let i = 0; i < 4; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-cloze-idx', String(i));
      applyStyle(btn, {
        pointerEvents: 'auto',
        minHeight: '54px',
        padding: '10px 16px',
        borderRadius: '14px',
        border: '2px solid #e7e2d4',
        background: '#ffffff',
        color: '#2a2730',
        fontSize: '17px',
        fontWeight: '600',
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
        transition:
          'transform 80ms ease-out, background 160ms ease-out, border-color 160ms ease-out, color 160ms ease-out',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textAlign: 'left',
      });

      const letter = document.createElement('span');
      letter.textContent = LETTERS[i];
      applyStyle(letter, {
        width: '26px',
        height: '26px',
        borderRadius: '8px',
        background: '#f0eadc',
        color: '#6b6375',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: '700',
        flex: '0 0 auto',
      });
      btn.appendChild(letter);

      const label = document.createElement('span');
      applyStyle(label, { flex: '1 1 auto' });
      btn.appendChild(label);

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.locked) return;
        const idx = Number(btn.getAttribute('data-cloze-idx'));
        this.handlers.onAnswer(idx);
      });
      btn.addEventListener('pointerdown', () => {
        if (this.locked) return;
        btn.style.transform = 'scale(0.97)';
      });
      const releasePress = () => {
        btn.style.transform = '';
      };
      btn.addEventListener('pointerup', releasePress);
      btn.addEventListener('pointerleave', releasePress);
      btn.addEventListener('pointercancel', releasePress);

      this.buttons.push({ el: btn, label, letter });
      this.btnCol.appendChild(btn);
    }
    this.root.appendChild(this.btnCol);

    // Reveal panel
    this.revealPanel = document.createElement('div');
    applyStyle(this.revealPanel, {
      pointerEvents: 'auto',
      width: 'min(400px, calc(100vw - 32px))',
      marginTop: '12px',
      padding: '14px 16px',
      borderRadius: '14px',
      background: '#fff8e8',
      border: `1px solid ${this.accent}55`,
      color: '#3d3328',
      fontSize: '14px',
      lineHeight: '1.55',
      fontFamily:
        'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
      transform: 'translateY(20px)',
      opacity: '0',
      transition: 'transform 220ms ease-out, opacity 220ms ease-out',
      display: 'none',
    });

    this.revealText = document.createElement('div');
    this.revealPanel.appendChild(this.revealText);

    this.revealContinue = document.createElement('button');
    this.revealContinue.type = 'button';
    this.revealContinue.textContent = 'Continue →';
    applyStyle(this.revealContinue, {
      marginTop: '12px',
      padding: '10px 22px',
      borderRadius: '10px',
      border: 'none',
      background: this.accent,
      color: '#ffffff',
      fontSize: '15px',
      fontWeight: '700',
      fontFamily: 'inherit',
      cursor: 'pointer',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
      width: '100%',
    });
    this.revealContinue.addEventListener('click', (e) => {
      e.preventDefault();
      this.handlers.onContinue();
    });
    this.revealPanel.appendChild(this.revealContinue);

    this.root.appendChild(this.revealPanel);

    document.body.appendChild(this.root);

    this.unsub = useRunStore.subscribe((state) => {
      this.syncFromState(state.round);
    });
    const init = useRunStore.getState();
    this.syncFromState(init.round);
  }

  show(): void {
    this.root.style.display = 'flex';
  }

  hide(): void {
    this.root.style.display = 'none';
  }

  destroy(): void {
    this.unsub?.();
    this.root.remove();
  }

  resetForRound(): void {
    this.locked = false;
    for (const { el, letter } of this.buttons) {
      el.disabled = false;
      el.style.background = '#ffffff';
      el.style.borderColor = '#e7e2d4';
      el.style.color = '#2a2730';
      el.style.transform = '';
      el.style.cursor = 'pointer';
      el.style.opacity = '1';
      letter.style.background = '#f0eadc';
      letter.style.color = '#6b6375';
    }
    this.revealPanel.style.display = 'none';
    this.revealPanel.style.opacity = '0';
    this.revealPanel.style.transform = 'translateY(20px)';
  }

  revealAnswer(
    selectedIndex: number,
    correctIndex: number,
    explanationZh: string
  ): void {
    this.locked = true;
    for (let i = 0; i < this.buttons.length; i++) {
      const { el, letter } = this.buttons[i];
      el.disabled = true;
      el.style.cursor = 'default';
      if (i === correctIndex) {
        el.style.background = '#d6f3e0';
        el.style.borderColor = '#2fb380';
        el.style.color = '#1f7d57';
        letter.style.background = '#2fb380';
        letter.style.color = '#ffffff';
      } else if (i === selectedIndex && selectedIndex !== correctIndex) {
        el.style.background = '#fbdcd8';
        el.style.borderColor = '#e25c4d';
        el.style.color = '#a73a2e';
        letter.style.background = '#e25c4d';
        letter.style.color = '#ffffff';
      } else {
        el.style.opacity = '0.55';
      }
    }
    this.revealText.textContent = explanationZh;
    this.revealPanel.style.display = 'block';
    void this.revealPanel.offsetHeight;
    this.revealPanel.style.opacity = '1';
    this.revealPanel.style.transform = 'translateY(0)';
  }

  revealTimeout(correctIndex: number, explanationZh: string): void {
    this.revealAnswer(-1, correctIndex, explanationZh);
  }

  private syncFromState(round: ClozeQuestion | null): void {
    if (round !== this.currentQuestion) {
      this.currentQuestion = round;
      if (round) {
        for (let i = 0; i < this.buttons.length; i++) {
          this.buttons[i].label.textContent = round.options[i];
        }
        this.resetForRound();
      }
    }
  }
}
