/**
 * TapInputUI — v1.8.3 Duolingo-style alternative question UIs.
 *
 * Exposes two factories that mount into a parent slot:
 *   - mountTapTiles : "Tap what you hear" — pick word tiles in order
 *   - mountTapPairs : "Tap the pairs" — match 4 EN ↔ ZH pairs
 *
 * Each returns a handle with `destroy()` so PlayScene can swap UIs
 * between rounds. The factory calls `onComplete(correct)` when the
 * player finishes — PlayScene routes that into the existing
 * handleAnswer / reveal / advance flow.
 */

const COLOR_BORDER = '#ead9bb';
const COLOR_BORDER_DARK = '#d4c098';
const COLOR_TEXT_DARK = '#3c2a1c';
const COLOR_TEXT_MUTED = '#7a6850';
const COLOR_AMBER = '#e7a44a';
const COLOR_AMBER_DARK = '#b07a2a';
const COLOR_BLUE = '#3d8aae';
const COLOR_BLUE_DARK = '#2c6986';
const COLOR_SUCCESS = '#7d9a4f';
const COLOR_ERROR = '#c84a3a';

export interface TapHandle {
  destroy(): void;
}

// ─── Tap what you hear ─────────────────────────────────────────────────

export function mountTapTiles(opts: {
  slot: HTMLElement;
  tiles: string[];
  correctOrder: number[];      // indices into `tiles`
  prompt?: string;             // e.g. "Tap what you hear"
  onSpeak: () => void;
  onComplete: (correct: boolean) => void;
}): TapHandle {
  const { slot, tiles, correctOrder, prompt = 'Tap what you hear' } = opts;
  const slotsNeeded = correctOrder.length;

  const root = document.createElement('div');
  root.className = 'pickup-tap-tiles';
  Object.assign(root.style, {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    padding: '6px 4px',
    fontFamily: 'inherit',
  });

  // Big 🔊 replay button at top
  const speaker = document.createElement('button');
  speaker.type = 'button';
  speaker.setAttribute('aria-label', 'Replay audio');
  speaker.innerHTML = '🔊 Tap to listen';
  Object.assign(speaker.style, {
    alignSelf: 'center',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 22px',
    background: COLOR_BLUE,
    color: '#fff',
    border: 'none',
    borderBottom: `4px solid ${COLOR_BLUE_DARK}`,
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '900',
    cursor: 'pointer',
    fontFamily: 'inherit',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
  });
  speaker.addEventListener('click', (e) => { e.preventDefault(); opts.onSpeak(); });
  root.appendChild(speaker);

  // Prompt label
  const promptEl = document.createElement('div');
  promptEl.textContent = prompt;
  Object.assign(promptEl.style, {
    fontSize: '13px',
    fontWeight: '800',
    color: COLOR_TEXT_MUTED,
    letterSpacing: '1px',
    textAlign: 'center',
    textTransform: 'uppercase',
  });
  root.appendChild(promptEl);

  // Answer row — clickable slots showing selected words in order
  const answerRow = document.createElement('div');
  Object.assign(answerRow.style, {
    minHeight: '50px',
    padding: '6px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    justifyContent: 'center',
    borderBottom: `2px dashed ${COLOR_BORDER_DARK}`,
    paddingBottom: '12px',
  });
  root.appendChild(answerRow);

  // Tile bank
  const bank = document.createElement('div');
  Object.assign(bank.style, {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
    paddingTop: '6px',
  });
  root.appendChild(bank);

  const tileButtons: HTMLButtonElement[] = [];
  const selectedOrder: number[] = []; // indices into `tiles` that user has tapped

  const tileStyle = (used: boolean): Partial<CSSStyleDeclaration> => ({
    padding: '10px 16px',
    background: used ? '#f1e6cf' : '#ffffff',
    color: used ? '#bba892' : COLOR_TEXT_DARK,
    border: `2px solid ${COLOR_BORDER}`,
    borderBottom: used ? `2px solid ${COLOR_BORDER}` : `4px solid ${COLOR_BORDER_DARK}`,
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '800',
    cursor: used ? 'default' : 'pointer',
    fontFamily: 'inherit',
    touchAction: 'manipulation',
    minHeight: '40px',
    transition: 'background 120ms ease',
  });

  const renderAnswer = () => {
    answerRow.innerHTML = '';
    selectedOrder.forEach((tIdx, i) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.textContent = tiles[tIdx];
      Object.assign(chip.style, {
        padding: '8px 14px',
        background: COLOR_AMBER,
        color: '#ffffff',
        border: 'none',
        borderBottom: `3px solid ${COLOR_AMBER_DARK}`,
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '800',
        cursor: 'pointer',
        fontFamily: 'inherit',
      });
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        selectedOrder.splice(i, 1);
        Object.assign(tileButtons[tIdx].style, tileStyle(false));
        renderAnswer();
      });
      answerRow.appendChild(chip);
    });
    // Empty placeholder slots
    for (let i = selectedOrder.length; i < slotsNeeded; i++) {
      const empty = document.createElement('div');
      Object.assign(empty.style, {
        minWidth: '32px',
        minHeight: '32px',
        border: `2px dashed ${COLOR_BORDER}`,
        borderRadius: '8px',
        opacity: '0.5',
      });
      answerRow.appendChild(empty);
    }

    if (selectedOrder.length === slotsNeeded) {
      // Auto-check
      const correct = selectedOrder.every((v, idx) => v === correctOrder[idx]);
      // Brief reveal style on the answer row
      answerRow.style.background = correct ? 'rgba(125, 154, 79, 0.12)' : 'rgba(200, 74, 58, 0.12)';
      window.setTimeout(() => opts.onComplete(correct), 450);
    } else {
      answerRow.style.background = 'transparent';
    }
  };

  tiles.forEach((word, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = word;
    Object.assign(btn.style, tileStyle(false));
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (selectedOrder.includes(idx)) return;
      if (selectedOrder.length >= slotsNeeded) return;
      selectedOrder.push(idx);
      Object.assign(btn.style, tileStyle(true));
      renderAnswer();
    });
    tileButtons.push(btn);
    bank.appendChild(btn);
  });

  renderAnswer();
  slot.appendChild(root);
  return { destroy: () => root.remove() };
}

// ─── Tap the pairs ─────────────────────────────────────────────────────

export function mountTapPairs(opts: {
  slot: HTMLElement;
  pairs: Array<{ left: string; right: string }>;
  prompt?: string;
  onComplete: (correct: boolean) => void;
}): TapHandle {
  const { slot, pairs, prompt = 'Tap the pairs' } = opts;

  const root = document.createElement('div');
  root.className = 'pickup-tap-pairs';
  Object.assign(root.style, {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '8px 4px',
    fontFamily: 'inherit',
  });

  const promptEl = document.createElement('div');
  promptEl.textContent = prompt;
  Object.assign(promptEl.style, {
    fontSize: '13px',
    fontWeight: '800',
    color: COLOR_TEXT_MUTED,
    letterSpacing: '1px',
    textAlign: 'center',
    textTransform: 'uppercase',
  });
  root.appendChild(promptEl);

  // Build 8 tiles — 4 left (en) + 4 right (zh). Shuffle each column.
  type TileData = { pairIdx: number; side: 'L' | 'R'; text: string };
  const allTiles: TileData[] = [];
  pairs.forEach((p, i) => {
    allTiles.push({ pairIdx: i, side: 'L', text: p.left });
    allTiles.push({ pairIdx: i, side: 'R', text: p.right });
  });
  // Shuffle (Fisher-Yates)
  const lefts = allTiles.filter(t => t.side === 'L').sort(() => Math.random() - 0.5);
  const rights = allTiles.filter(t => t.side === 'R').sort(() => Math.random() - 0.5);

  const grid = document.createElement('div');
  Object.assign(grid.style, {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  });
  root.appendChild(grid);

  let selected: { el: HTMLButtonElement; data: TileData } | null = null;
  let mismatches = 0;
  let matched = 0;

  const baseStyle = (): Partial<CSSStyleDeclaration> => ({
    padding: '14px 12px',
    background: '#ffffff',
    color: COLOR_TEXT_DARK,
    border: `2px solid ${COLOR_BORDER}`,
    borderBottom: `4px solid ${COLOR_BORDER_DARK}`,
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: '800',
    cursor: 'pointer',
    fontFamily: 'inherit',
    touchAction: 'manipulation',
    transition: 'background 160ms ease, transform 100ms ease',
  });

  const makeTile = (data: TileData) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = data.text;
    Object.assign(btn.style, baseStyle());
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (btn.dataset.matched === '1') return;

      if (!selected) {
        selected = { el: btn, data };
        Object.assign(btn.style, { background: COLOR_AMBER, color: '#fff', borderColor: COLOR_AMBER_DARK });
        return;
      }
      if (selected.el === btn) {
        // Deselect
        Object.assign(btn.style, baseStyle());
        selected = null;
        return;
      }

      // Check pair
      if (selected.data.pairIdx === data.pairIdx && selected.data.side !== data.side) {
        // Match
        [selected.el, btn].forEach(el => {
          el.dataset.matched = '1';
          Object.assign(el.style, {
            background: 'rgba(125, 154, 79, 0.18)',
            color: COLOR_SUCCESS,
            borderColor: COLOR_SUCCESS,
            opacity: '0.55',
            cursor: 'default',
          });
        });
        selected = null;
        matched++;
        if (matched === pairs.length) {
          window.setTimeout(() => opts.onComplete(mismatches < 3), 420);
        }
      } else {
        // Mismatch
        mismatches++;
        const wrongStyle = { background: 'rgba(200, 74, 58, 0.15)', color: COLOR_ERROR, borderColor: COLOR_ERROR };
        Object.assign(selected.el.style, wrongStyle);
        Object.assign(btn.style, wrongStyle);
        const a = selected.el, b = btn;
        selected = null;
        window.setTimeout(() => {
          if (a.dataset.matched !== '1') Object.assign(a.style, baseStyle());
          if (b.dataset.matched !== '1') Object.assign(b.style, baseStyle());
        }, 600);
      }
    });
    return btn;
  };

  // Layout: 4 rows, left col = lefts[i], right col = rights[i]
  for (let i = 0; i < pairs.length; i++) {
    grid.appendChild(makeTile(lefts[i]));
    grid.appendChild(makeTile(rights[i]));
  }

  slot.appendChild(root);
  return { destroy: () => root.remove() };
}
