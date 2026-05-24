/**
 * LevelMenu — DOM overlay for level selection.
 *
 * 6 cards: A1 / A2 / B1 / B2 / C1 / C2. Only A2 is unlocked for v0.
 * Selection persists via runStore.setLevel (which writes localStorage).
 * Includes a dismissable intro paragraph for first-time players.
 */

import type { ClozeLevel } from '../data/sentences';
import { applyStyle } from './domUtil';

const LS_INTRO_DISMISSED = 'wordwar.introDismissed';
const A2_QUESTION_COUNT = 80;

export interface LevelMenuHandlers {
  onSelect: (level: ClozeLevel) => void;
}

interface LevelRow {
  level: ClozeLevel;
  unlocked: boolean;
  subtitle: string;
}

const LEVELS: LevelRow[] = [
  { level: 'A1', unlocked: false, subtitle: 'Coming soon' },
  { level: 'A2', unlocked: true, subtitle: `Start (${A2_QUESTION_COUNT} questions)` },
  { level: 'B1', unlocked: false, subtitle: 'Coming soon' },
  { level: 'B2', unlocked: false, subtitle: 'Coming soon' },
  { level: 'C1', unlocked: false, subtitle: 'Coming soon' },
  { level: 'C2', unlocked: false, subtitle: 'Coming soon' },
];

export class LevelMenu {
  private root: HTMLDivElement;
  private handlers: LevelMenuHandlers;

  constructor(handlers: LevelMenuHandlers) {
    this.handlers = handlers;

    this.root = document.createElement('div');
    this.root.id = 'level-menu';
    applyStyle(this.root, {
      position: 'fixed',
      inset: '0',
      background: 'rgba(253, 250, 242, 0.98)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 'max(40px, env(safe-area-inset-top))',
      paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
      overflowY: 'auto',
      zIndex: '20',
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      color: '#2a2730',
    });

    const title = document.createElement('div');
    title.textContent = 'Choose your level';
    applyStyle(title, {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '8px',
    });
    this.root.appendChild(title);

    const subtitle = document.createElement('div');
    subtitle.textContent = 'CEFR cloze · 填空挑戰';
    applyStyle(subtitle, {
      fontSize: '14px',
      color: '#6b6375',
      marginBottom: '20px',
    });
    this.root.appendChild(subtitle);

    // First-time intro — dismissable.
    if (!this.introDismissed()) {
      const intro = document.createElement('div');
      intro.textContent =
        '選句子中空格最適合的單字。答對加分,答錯扣血。15 秒倒數計時,慢了會自動算錯。';
      applyStyle(intro, {
        width: 'min(560px, calc(100vw - 32px))',
        padding: '14px 18px',
        marginBottom: '20px',
        background: '#fff8e8',
        border: '1px solid #f0e3bf',
        borderRadius: '12px',
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#3d3328',
        position: 'relative',
      });

      const dismiss = document.createElement('button');
      dismiss.type = 'button';
      dismiss.textContent = '×';
      dismiss.setAttribute('aria-label', 'Dismiss intro');
      applyStyle(dismiss, {
        position: 'absolute',
        top: '6px',
        right: '8px',
        background: 'transparent',
        border: 'none',
        color: '#a8a2b3',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '4px 8px',
        lineHeight: '1',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      });
      dismiss.addEventListener('click', (e) => {
        e.preventDefault();
        try {
          localStorage.setItem(LS_INTRO_DISMISSED, '1');
        } catch {
          // ignore
        }
        intro.remove();
      });
      intro.appendChild(dismiss);
      this.root.appendChild(intro);
    }

    const list = document.createElement('div');
    applyStyle(list, {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: 'min(420px, calc(100vw - 32px))',
    });

    for (const row of LEVELS) {
      const card = document.createElement('button');
      card.type = 'button';
      card.disabled = !row.unlocked;
      applyStyle(card, {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderRadius: '12px',
        border: row.unlocked ? '2px solid #ff7a59' : '1px solid #e7e2d4',
        background: row.unlocked ? '#ff7a59' : '#f6f3ea',
        color: row.unlocked ? '#ffffff' : '#a8a2b3',
        cursor: row.unlocked ? 'pointer' : 'not-allowed',
        textAlign: 'left',
        fontFamily: 'inherit',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        boxShadow: row.unlocked ? '0 4px 14px rgba(255, 122, 89, 0.25)' : 'none',
      });

      const left = document.createElement('div');
      applyStyle(left, {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      });
      const lvl = document.createElement('div');
      lvl.textContent = row.level;
      applyStyle(lvl, {
        fontSize: '22px',
        fontWeight: '700',
      });
      const sub = document.createElement('div');
      sub.textContent = row.subtitle;
      applyStyle(sub, {
        fontSize: '13px',
        opacity: row.unlocked ? '0.85' : '1',
      });
      left.appendChild(lvl);
      left.appendChild(sub);
      card.appendChild(left);

      const arrow = document.createElement('div');
      arrow.textContent = row.unlocked ? '→' : '\u{1F512}';
      applyStyle(arrow, {
        fontSize: '20px',
      });
      card.appendChild(arrow);

      if (row.unlocked) {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          this.handlers.onSelect(row.level);
        });
      }
      list.appendChild(card);
    }

    this.root.appendChild(list);

    const footer = document.createElement('div');
    footer.textContent = 'v0.1.0 · cloze';
    applyStyle(footer, {
      marginTop: '24px',
      fontSize: '11px',
      color: '#a8a2b3',
      fontFamily: 'ui-monospace, Consolas, monospace',
    });
    this.root.appendChild(footer);

    document.body.appendChild(this.root);
  }

  destroy(): void {
    this.root.remove();
  }

  private introDismissed(): boolean {
    if (typeof localStorage === 'undefined') return false;
    try {
      return localStorage.getItem(LS_INTRO_DISMISSED) === '1';
    } catch {
      return false;
    }
  }
}
