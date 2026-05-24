/**
 * ClozeUI — DOM overlay that renders the 4 cloze answer buttons + reveal
 * panel on top of the Phaser canvas.
 *
 * Why DOM, not Phaser? Phaser's hit-detection on touch has been the source
 * of repeated tap-drop bugs (M3 polish attempts didn't conclusively fix it).
 * HTML <button> elements get rock-solid mobile touch handling for free — no
 * hitbox math, no pointer routing through the Phaser input plugin.
 *
 * Mount model:
 *   - One root <div id="cloze-overlay"> created as a sibling to #app.
 *   - Positioned fixed, inset:0, pointer-events:none — so canvas drag/
 *     input below still works.
 *   - The button row inside gets pointer-events:auto.
 *   - Subscribes to runStore + a couple of imperative show/hide methods
 *     called from PlayScene.
 */

import { useRunStore } from '../store/runStore';
import type { ClozeQuestion } from '../data/sentences';
import { applyStyle } from './domUtil';

export interface ClozeUIHandlers {
  onAnswer: (selectedIndex: number) => void;
  onContinue: () => void;
}

interface BtnRefs {
  el: HTMLButtonElement;
  label: HTMLSpanElement;
}

export class ClozeUI {
  private root: HTMLDivElement;
  private btnRow: HTMLDivElement;
  private buttons: BtnRefs[] = [];
  private revealPanel: HTMLDivElement;
  private revealText: HTMLDivElement;
  private revealContinue: HTMLButtonElement;
  private unsub?: () => void;
  private handlers: ClozeUIHandlers;
  private currentQuestion: ClozeQuestion | null = null;
  private locked = false;

  constructor(handlers: ClozeUIHandlers) {
    this.handlers = handlers;

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

    // Button row.
    this.btnRow = document.createElement('div');
    applyStyle(this.btnRow, {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      width: 'min(560px, calc(100vw - 32px))',
      pointerEvents: 'none',
    });

    for (let i = 0; i < 4; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-cloze-idx', String(i));
      applyStyle(btn, {
        pointerEvents: 'auto',
        minHeight: '64px',
        padding: '14px 18px',
        borderRadius: '12px',
        border: '2px solid #e7e2d4',
        background: '#ffffff',
        color: '#2a2730',
        fontSize: '18px',
        fontWeight: '600',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
        transition:
          'transform 80ms ease-out, background 160ms ease-out, border-color 160ms ease-out, color 160ms ease-out',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
      });
      const label = document.createElement('span');
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
      this.buttons.push({ el: btn, label });
      this.btnRow.appendChild(btn);
    }
    this.root.appendChild(this.btnRow);

    // Reveal panel.
    this.revealPanel = document.createElement('div');
    applyStyle(this.revealPanel, {
      pointerEvents: 'auto',
      width: 'min(560px, calc(100vw - 32px))',
      marginTop: '14px',
      padding: '16px 18px',
      borderRadius: '14px',
      background: '#fff8e8',
      border: '1px solid #f0e3bf',
      color: '#3d3328',
      fontSize: '15px',
      lineHeight: '1.55',
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
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
    this.revealContinue.textContent = 'Continue';
    applyStyle(this.revealContinue, {
      marginTop: '12px',
      padding: '10px 22px',
      borderRadius: '10px',
      border: 'none',
      background: '#ff7a59',
      color: '#ffffff',
      fontSize: '15px',
      fontWeight: '700',
      fontFamily: 'inherit',
      cursor: 'pointer',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
    });
    this.revealContinue.addEventListener('click', (e) => {
      e.preventDefault();
      this.handlers.onContinue();
    });
    this.revealPanel.appendChild(this.revealContinue);

    this.root.appendChild(this.revealPanel);

    document.body.appendChild(this.root);

    // Subscribe to store — re-render whenever round/lastResult changes.
    this.unsub = useRunStore.subscribe((state) => {
      this.syncFromState(state.round);
    });
    // Prime from current state.
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

  /** Imperative reset — called by PlayScene at the start of each round. */
  resetForRound(): void {
    this.locked = false;
    for (const { el } of this.buttons) {
      el.disabled = false;
      el.style.background = '#ffffff';
      el.style.borderColor = '#e7e2d4';
      el.style.color = '#2a2730';
      el.style.transform = '';
      el.style.cursor = 'pointer';
      el.style.opacity = '1';
    }
    this.revealPanel.style.display = 'none';
    this.revealPanel.style.opacity = '0';
    this.revealPanel.style.transform = 'translateY(20px)';
  }

  /** Render buttons disabled + colored after answer. */
  revealAnswer(
    selectedIndex: number,
    correctIndex: number,
    explanationZh: string
  ): void {
    this.locked = true;
    for (let i = 0; i < this.buttons.length; i++) {
      const { el } = this.buttons[i];
      el.disabled = true;
      el.style.cursor = 'default';
      if (i === correctIndex) {
        el.style.background = '#d6f3e0';
        el.style.borderColor = '#2fb380';
        el.style.color = '#1f7d57';
      } else if (i === selectedIndex && selectedIndex !== correctIndex) {
        el.style.background = '#fbdcd8';
        el.style.borderColor = '#e25c4d';
        el.style.color = '#a73a2e';
      } else {
        el.style.opacity = '0.55';
      }
    }
    this.revealText.textContent = explanationZh;
    this.revealPanel.style.display = 'block';
    // Force layout, then transition in.
    void this.revealPanel.offsetHeight;
    this.revealPanel.style.opacity = '1';
    this.revealPanel.style.transform = 'translateY(0)';
  }

  /** For timeout: no selection, just show correct + explanation. */
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
