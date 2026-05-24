/**
 * ModeMenu — top-level menu for v0.3.
 *
 * UX flow:
 *   1. Mode card (1 screen): two large tappable cards
 *      🎯 自由練習 (Free Practice)   — 10 random A2 questions
 *      🎬 情境模式 (Scenario Mode)   — pick a scenario
 *
 *   2a. If user picks Free Practice → confirm starts immediately
 *      (we hardcode A2 since it's the only unlocked level for v0.3).
 *
 *   2b. If user picks Scenario → second screen with 5 scenario cards
 *      in a vertical list, each showing emoji + scenario name + best
 *      score (from localStorage) + completion check.
 *
 * Portrait-sized: max-width 420px, vertically stacked, scrollable on
 * short screens.
 */

import { applyStyle } from './domUtil';
import {
  SCENARIO_META,
  SCENARIOS_IN_ORDER,
  readBestScore,
  isScenarioCompleted,
  type ScenarioId,
} from '../data/scenarios';

export interface ModeMenuHandlers {
  onStartFree: () => void;
  onStartScenario: (id: ScenarioId) => void;
}

const LS_INTRO_DISMISSED = 'wordwar.introDismissed';

export class ModeMenu {
  private root: HTMLDivElement;
  private content: HTMLDivElement;
  private handlers: ModeMenuHandlers;

  constructor(handlers: ModeMenuHandlers) {
    this.handlers = handlers;

    this.root = document.createElement('div');
    this.root.id = 'mode-menu';
    applyStyle(this.root, {
      position: 'fixed',
      inset: '0',
      background: 'rgba(253, 250, 242, 0.98)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 'max(28px, env(safe-area-inset-top))',
      paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
      overflowY: 'auto',
      zIndex: '20',
      fontFamily:
        'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      color: '#2a2730',
    });

    this.content = document.createElement('div');
    applyStyle(this.content, {
      width: 'min(420px, calc(100vw - 32px))',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    });
    this.root.appendChild(this.content);

    document.body.appendChild(this.root);
    this.renderModeView();
  }

  destroy(): void {
    this.root.remove();
  }

  // ─── Mode view ────────────────────────────────────────────────────────────

  private renderModeView(): void {
    this.content.innerHTML = '';

    const title = document.createElement('div');
    title.textContent = 'WordWar';
    applyStyle(title, {
      fontSize: '34px',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '4px',
    });
    this.content.appendChild(title);

    const subtitle = document.createElement('div');
    subtitle.textContent = 'CEFR cloze · 填空挑戰';
    applyStyle(subtitle, {
      fontSize: '13px',
      color: '#6b6375',
      textAlign: 'center',
      marginBottom: '20px',
    });
    this.content.appendChild(subtitle);

    if (!this.introDismissed()) {
      this.content.appendChild(this.makeIntroCard());
    }

    const chooseLabel = document.createElement('div');
    chooseLabel.textContent = '選擇模式';
    applyStyle(chooseLabel, {
      fontSize: '14px',
      color: '#6b6375',
      fontWeight: '600',
      marginBottom: '10px',
      paddingLeft: '4px',
    });
    this.content.appendChild(chooseLabel);

    this.content.appendChild(
      this.makeModeCard({
        emoji: '🎯',
        title: '自由練習',
        sub: '10 題隨機 A2 題目',
        accent: '#ff7a59',
        onClick: () => this.handlers.onStartFree(),
      })
    );

    this.content.appendChild(
      this.makeModeCard({
        emoji: '🎬',
        title: '情境模式',
        sub: '5 個主題,每題 10 句',
        accent: '#6a6dd3',
        onClick: () => this.renderScenarioView(),
      })
    );

    const footer = document.createElement('div');
    footer.textContent = 'v0.3.0 · scenario';
    applyStyle(footer, {
      marginTop: '20px',
      fontSize: '11px',
      color: '#a8a2b3',
      textAlign: 'center',
      fontFamily: 'ui-monospace, Consolas, monospace',
    });
    this.content.appendChild(footer);
  }

  private makeModeCard(opts: {
    emoji: string;
    title: string;
    sub: string;
    accent: string;
    onClick: () => void;
  }): HTMLButtonElement {
    const card = document.createElement('button');
    card.type = 'button';
    applyStyle(card, {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '18px 18px',
      marginBottom: '12px',
      borderRadius: '16px',
      border: `2px solid ${opts.accent}`,
      background: opts.accent,
      color: '#ffffff',
      cursor: 'pointer',
      textAlign: 'left',
      fontFamily: 'inherit',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
      boxShadow: `0 6px 18px ${opts.accent}40`,
      transition: 'transform 80ms ease-out',
    });

    const iconBox = document.createElement('div');
    iconBox.textContent = opts.emoji;
    applyStyle(iconBox, {
      fontSize: '32px',
      flex: '0 0 auto',
    });
    card.appendChild(iconBox);

    const text = document.createElement('div');
    applyStyle(text, {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      flex: '1 1 auto',
    });
    const titleEl = document.createElement('div');
    titleEl.textContent = opts.title;
    applyStyle(titleEl, { fontSize: '20px', fontWeight: '700' });
    const subEl = document.createElement('div');
    subEl.textContent = opts.sub;
    applyStyle(subEl, { fontSize: '13px', opacity: '0.9' });
    text.appendChild(titleEl);
    text.appendChild(subEl);
    card.appendChild(text);

    const arrow = document.createElement('div');
    arrow.textContent = '→';
    applyStyle(arrow, { fontSize: '20px', opacity: '0.85' });
    card.appendChild(arrow);

    card.addEventListener('pointerdown', () => {
      card.style.transform = 'scale(0.98)';
    });
    const release = () => {
      card.style.transform = '';
    };
    card.addEventListener('pointerup', release);
    card.addEventListener('pointerleave', release);
    card.addEventListener('pointercancel', release);
    card.addEventListener('click', (e) => {
      e.preventDefault();
      opts.onClick();
    });
    return card;
  }

  private makeIntroCard(): HTMLElement {
    const intro = document.createElement('div');
    applyStyle(intro, {
      padding: '12px 16px 12px 14px',
      marginBottom: '16px',
      background: '#fff8e8',
      border: '1px solid #f0e3bf',
      borderRadius: '12px',
      fontSize: '13px',
      lineHeight: '1.55',
      color: '#3d3328',
      position: 'relative',
    });
    intro.textContent =
      '選句子中空格最適合的單字。答對加分,答錯扣血。每回合 15 秒,慢了會自動算錯。';

    const dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.textContent = '×';
    dismiss.setAttribute('aria-label', 'Dismiss intro');
    applyStyle(dismiss, {
      position: 'absolute',
      top: '4px',
      right: '6px',
      background: 'transparent',
      border: 'none',
      color: '#a8a2b3',
      fontSize: '18px',
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
    return intro;
  }

  // ─── Scenario view ────────────────────────────────────────────────────────

  private renderScenarioView(): void {
    this.content.innerHTML = '';

    // Header row: back button + title
    const headerRow = document.createElement('div');
    applyStyle(headerRow, {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
    });

    const back = document.createElement('button');
    back.type = 'button';
    back.textContent = '← 返回';
    applyStyle(back, {
      background: 'transparent',
      border: '1px solid #e7e2d4',
      borderRadius: '10px',
      padding: '8px 14px',
      fontSize: '13px',
      color: '#6b6375',
      cursor: 'pointer',
      fontFamily: 'inherit',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
    });
    back.addEventListener('click', (e) => {
      e.preventDefault();
      this.renderModeView();
    });
    headerRow.appendChild(back);

    const title = document.createElement('div');
    title.textContent = '🎬 選擇情境';
    applyStyle(title, {
      fontSize: '20px',
      fontWeight: '700',
      flex: '1 1 auto',
      textAlign: 'center',
      marginRight: '64px',
    });
    headerRow.appendChild(title);

    this.content.appendChild(headerRow);

    for (const id of SCENARIOS_IN_ORDER) {
      this.content.appendChild(this.makeScenarioCard(id));
    }
  }

  private makeScenarioCard(id: ScenarioId): HTMLButtonElement {
    const meta = SCENARIO_META[id];
    const best = readBestScore(id);
    const completed = isScenarioCompleted(id);

    const card = document.createElement('button');
    card.type = 'button';
    applyStyle(card, {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 16px',
      marginBottom: '10px',
      borderRadius: '14px',
      border: `2px solid ${meta.accent}`,
      background: meta.tint,
      color: '#2a2730',
      cursor: 'pointer',
      textAlign: 'left',
      fontFamily: 'inherit',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
      boxShadow: `0 4px 12px ${meta.accent}25`,
      transition: 'transform 80ms ease-out',
    });

    const iconBox = document.createElement('div');
    iconBox.textContent = meta.emoji;
    applyStyle(iconBox, { fontSize: '28px', flex: '0 0 auto' });
    card.appendChild(iconBox);

    const text = document.createElement('div');
    applyStyle(text, {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      flex: '1 1 auto',
    });
    const titleEl = document.createElement('div');
    titleEl.textContent = `${meta.labelZh} (${meta.labelEn})`;
    applyStyle(titleEl, { fontSize: '17px', fontWeight: '700' });
    const subEl = document.createElement('div');
    const bestText = best > 0 ? `最佳 ${best} 分` : '尚未挑戰';
    subEl.textContent = completed ? `${bestText} · ✓ 已通關` : bestText;
    applyStyle(subEl, {
      fontSize: '12px',
      color: completed ? meta.accent : '#6b6375',
      fontWeight: completed ? '600' : '400',
    });
    text.appendChild(titleEl);
    text.appendChild(subEl);
    card.appendChild(text);

    const arrow = document.createElement('div');
    arrow.textContent = '→';
    applyStyle(arrow, { fontSize: '18px', color: meta.accent });
    card.appendChild(arrow);

    card.addEventListener('pointerdown', () => {
      card.style.transform = 'scale(0.98)';
    });
    const release = () => {
      card.style.transform = '';
    };
    card.addEventListener('pointerup', release);
    card.addEventListener('pointerleave', release);
    card.addEventListener('pointercancel', release);
    card.addEventListener('click', (e) => {
      e.preventDefault();
      this.handlers.onStartScenario(id);
    });
    return card;
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
