/**
 * StoryMapView — v1.7.3 Duolingo-style learning map.
 *
 * Vertical scrollable column with zig-zag positioned node buttons. The
 * calico cat sits on the "current" (next-to-do) node and slides with a
 * smooth CSS transition when the current node changes (i.e. after the
 * player completes a question and returns to the map).
 *
 * v1.7.3 scope:
 *   - Ch1 only (per current data; Ch2-8 are on backup/v1.5.1-eight-chapters).
 *   - 6 nodes for Ch1's 6 questions.
 *   - 2 "Coming soon" placeholder nodes hinting Ch2+ existence.
 *   - Click an unlocked node → fires `onPlayChapter(1)`; the caller
 *     wires that to the existing ChapterIntroScene flow. (We don't yet
 *     support per-question jump-in — q-level granularity would need
 *     PlayScene + runStore work.)
 *
 * Why coffee-brown buttons (per user): warm, story-tinted, distinct from
 * Duolingo green so we own our own aesthetic.
 */

import { applyStyle } from './domUtil';
import {
  readChapterProgress,
  isChapterUnlocked,
  isChapterCompleted,
  CHAPTER_META,
  type ChapterId,
} from '../data/storyKitten';

export interface StoryMapHandlers {
  onPlayChapter: (chapter: ChapterId) => void;
}

const COLOR_BG = '#fef8ed';
const COLOR_NODE = '#a47148';        // coffee brown
const COLOR_NODE_DARK = '#7a5b3a';   // shadow side
const COLOR_NODE_DONE = '#7d9a4f';   // muted green for completed
const COLOR_NODE_DONE_DARK = '#5e7a36';
const COLOR_NODE_LOCKED = '#c4b89c'; // dim taupe
const COLOR_NODE_LOCKED_DARK = '#a89c80';
const COLOR_TEXT_DARK = '#3c2a1c';
const COLOR_TEXT_MUTED = '#7a6850';

// v1.7.9: nodes are now flattened ovals (Duolingo "tilted coin" look)
// rather than circles. Width > height for the isometric foreshortening.
const NODE_SIZE = 82;   // width
const NODE_HEIGHT = 64; // visual height — gives the 5:4 ratio
const ROW_HEIGHT = 108;
const CONTAINER_W = 320;
const ZIG_OFFSET = 64; // horizontal swing of each node from container center

// Ch1 narrative beats — short label per question, used as tooltip / aria.
const CH1_BEAT_LABELS = [
  'Rainy start',
  'Wet and cold',
  'Hungry alley',
  'A big shadow',
  'A kind face',
  'Sheltered',
];

const LS_LAST_CAT_NODE = 'pickup.map.cat-node';

/**
 * v1.7.10: derive a darker shade of a hex color for matching-family
 * shadows. amount=0.35 means 35% darker. Replaces hard-coded
 * COLOR_NODE_DARK on the banner so the banner depth-shadow matches the
 * banner's body color family, not coffee brown.
 */
function darken(hex: string, amount = 0.35): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r * (1 - amount))}, ${Math.round(g * (1 - amount))}, ${Math.round(b * (1 - amount))})`;
}

interface NodeRef {
  idx: number;          // 0..N
  el: HTMLButtonElement;
  unlocked: boolean;
  completed: boolean;
  isCurrent: boolean;
}

export class StoryMapView {
  private root: HTMLDivElement;
  private scrollArea: HTMLDivElement;
  private nodes: NodeRef[] = [];
  private cat: HTMLDivElement;
  private handlers: StoryMapHandlers;

  constructor(handlers: StoryMapHandlers) {
    this.handlers = handlers;
    this.root = document.createElement('div');
    this.root.id = 'pickup-story-map';
    applyStyle(this.root, {
      position: 'fixed',
      inset: '0',
      background: COLOR_BG,
      zIndex: '20',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Nunito", "Noto Sans TC", system-ui, sans-serif',
      color: COLOR_TEXT_DARK,
    });

    // Header — section banner (Duolingo-style filled card at top)
    const header = this.buildHeader();
    this.root.appendChild(header);

    // Scroll area — contains the zig-zag map + leaves room for bottom nav
    this.scrollArea = document.createElement('div');
    applyStyle(this.scrollArea, {
      flex: '1 1 auto',
      overflowY: 'auto',
      overflowX: 'hidden',
      // v1.7.10: extra top padding so the banner's depth shadow plus
      // any drift can't reach the first node / cat position.
      paddingTop: '34px',
      paddingBottom: '110px', // leave space for BottomNav
      position: 'relative',
      WebkitOverflowScrolling: 'touch',
    });

    // Inner column where nodes live (centered)
    const column = document.createElement('div');
    applyStyle(column, {
      width: `${CONTAINER_W}px`,
      margin: '0 auto',
      position: 'relative',
    });

    // Cat sprite — absolute-positioned inside the column. Sits ABOVE
    // the current node, breathing/swaying when idle, transitions
    // smoothly when its transform changes (i.e. when the current
    // node moves after a question is completed).
    this.cat = this.buildCat();
    column.appendChild(this.cat);

    // Build nodes — Ch1's 6 questions
    const progress = readChapterProgress();
    const ch1Unlocked = isChapterUnlocked(1);
    const ch1Completed = isChapterCompleted(1);
    const currentNodeIdx = this.deriveCurrentNodeIdx(progress.highestCompleted);
    for (let i = 0; i < 6; i++) {
      const beat = CH1_BEAT_LABELS[i];
      const node = this.buildNode({
        idx: i,
        label: beat,
        unlocked: ch1Unlocked,
        completed: ch1Completed,
        chapter: 1,
      });
      // v1.7.12: mark the user's current node so CSS pulse animation
      // can highlight where they are (replaces the visual role the cat
      // sprite used to play).
      if (i === currentNodeIdx) {
        node.el.classList.add('pickup-map-node-current');
      }
      column.appendChild(node.el);
      this.nodes.push(node);
    }

    // Sub-section divider hint — "Chapter 2 coming"
    column.appendChild(this.buildDivider('Chapter 2 — coming soon'));

    // 2 locked placeholder nodes — visual continuity, hints "more is coming"
    for (let i = 0; i < 2; i++) {
      const node = this.buildNode({
        idx: 6 + i,
        label: 'Locked',
        unlocked: false,
        completed: false,
        chapter: null,
      });
      column.appendChild(node.el);
      this.nodes.push(node);
    }

    this.scrollArea.appendChild(column);
    this.root.appendChild(this.scrollArea);
    document.body.appendChild(this.root);

    // Position cat on the current node. Done in rAF so layout is settled.
    const currentIdx = this.deriveCurrentNodeIdx(progress.highestCompleted);
    requestAnimationFrame(() => this.positionCat(currentIdx, /* animate */ false));

    // If we re-entered the map after progress advanced, animate from
    // the last-seen position to the new one. This is the "cat jumps to
    // next node" effect the user asked for.
    const lastIdx = this.readLastCatIdx();
    if (lastIdx !== null && lastIdx !== currentIdx) {
      // Snap to last position, then schedule a transition to current.
      requestAnimationFrame(() => {
        this.positionCat(lastIdx, /* animate */ false);
        // Two frames later, animate to current — gives the browser a
        // chance to commit the snap before the transition kicks in.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => this.positionCat(currentIdx, /* animate */ true))
        );
      });
    }
    this.writeLastCatIdx(currentIdx);

    // Scroll the current node into view if it would otherwise be off-screen.
    requestAnimationFrame(() => {
      const target = this.nodes[currentIdx]?.el;
      if (target) {
        const rect = target.getBoundingClientRect();
        if (rect.top < 80 || rect.bottom > window.innerHeight - 130) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  destroy(): void {
    this.root.remove();
  }

  // ───────────────────────────────────────────────────────────────────

  private buildHeader(): HTMLElement {
    const meta = CHAPTER_META[1];
    const wrap = document.createElement('div');
    applyStyle(wrap, {
      padding: 'max(16px, env(safe-area-inset-top)) 14px 0 14px',
      flex: '0 0 auto',
    });

    const card = document.createElement('div');
    applyStyle(card, {
      background: meta.accent,
      borderRadius: '14px',
      padding: '12px 16px',
      color: '#ffffff',
      // v1.7.10:
      //  - 3D depth color now derived from meta.accent (same color
      //    family as banner body, not unrelated coffee brown)
      //  - Cast "ground" shadow removed because it was bleeding into
      //    the scroll area below and visually overlapping the first
      //    node + cat. Banner only has its solid 3D depth now.
      boxShadow: `0 4px 0 ${darken(meta.accent, 0.32)}`,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    });
    // Cat paw-pad SVG — decorative brand icon replacing the old restart
    // button. Restart still available via Profile tab → Danger Zone.
    card.innerHTML = `
      <div style="flex:1;">
        <div style="font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;opacity:0.85;">
          Section 1
        </div>
        <div style="font-size:17px;font-weight:900;line-height:1.2;margin-top:2px;">
          ${meta.titleEn}
        </div>
      </div>
      <div aria-hidden="true" style="
        width: 36px; height: 36px; border-radius: 10px;
        background: rgba(255,255,255,0.2);
        display: flex; align-items: center; justify-content: center;
        flex: 0 0 auto;
      ">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff" aria-hidden="true">
          <!-- palm pad -->
          <ellipse cx="12" cy="16" rx="5.6" ry="4.6"/>
          <!-- 4 toe beans, slight arc -->
          <ellipse cx="6" cy="10" rx="2.2" ry="2.6" transform="rotate(-25 6 10)"/>
          <ellipse cx="9.7" cy="6.6" rx="2.1" ry="2.6"/>
          <ellipse cx="14.3" cy="6.6" rx="2.1" ry="2.6"/>
          <ellipse cx="18" cy="10" rx="2.2" ry="2.6" transform="rotate(25 18 10)"/>
        </svg>
      </div>
    `;
    wrap.appendChild(card);
    return wrap;
  }

  private buildNode(opts: {
    idx: number;
    label: string;
    unlocked: boolean;
    completed: boolean;
    chapter: ChapterId | null;
  }): NodeRef {
    const row = document.createElement('button');
    row.type = 'button';
    row.disabled = !opts.unlocked;
    row.setAttribute('aria-label', `${opts.label}${opts.unlocked ? '' : ' (locked)'}`);
    row.dataset.nodeIdx = String(opts.idx);

    // Zig-zag horizontal offset
    const isLeft = opts.idx % 2 === 0;
    const leftPx = isLeft
      ? CONTAINER_W / 2 - NODE_SIZE / 2 - ZIG_OFFSET
      : CONTAINER_W / 2 - NODE_SIZE / 2 + ZIG_OFFSET;

    const baseColor = opts.completed
      ? COLOR_NODE_DONE
      : opts.unlocked
        ? COLOR_NODE
        : COLOR_NODE_LOCKED;
    const shadowColor = opts.completed
      ? COLOR_NODE_DONE_DARK
      : opts.unlocked
        ? COLOR_NODE_DARK
        : COLOR_NODE_LOCKED_DARK;

    applyStyle(row, {
      position: 'absolute',
      left: `${leftPx}px`,
      top: `${opts.idx * ROW_HEIGHT + 16}px`,
      width: `${NODE_SIZE}px`,
      height: `${NODE_HEIGHT}px`,
      borderRadius: '50%', // ellipse since W != H
      border: 'none',
      // v1.7.8: soft white gloss highlight at upper-left over base color
      background: `radial-gradient(ellipse at 30% 22%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0) 55%), ${baseColor}`,
      // v1.7.9: thicker 3D depth (11px vs 5px) — Duolingo's tilted coin look
      boxShadow: `0 11px 0 ${shadowColor}, 0 20px 14px -4px rgba(60, 42, 28, 0.32)`,
      color: '#ffffff',
      fontSize: '26px',
      fontWeight: '900',
      fontFamily: 'inherit',
      cursor: opts.unlocked ? 'pointer' : 'not-allowed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 100ms ease-out',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
      opacity: opts.unlocked ? '1' : '0.7',
    });

    // v1.7.9: icon system —
    //   completed → ★ emoji (golden star feel)
    //   unlocked  → white paw-pad SVG (brand fingerprint)
    //   locked    → 🔒 emoji
    if (opts.completed) {
      row.textContent = '★';
    } else if (opts.unlocked) {
      row.innerHTML = `<svg viewBox="0 0 24 24" width="34" height="34" fill="#ffffff" aria-hidden="true" style="display:block;">
        <ellipse cx="12" cy="16" rx="5.6" ry="4.6"/>
        <ellipse cx="6" cy="10" rx="2.2" ry="2.6" transform="rotate(-25 6 10)"/>
        <ellipse cx="9.7" cy="6.6" rx="2.1" ry="2.6"/>
        <ellipse cx="14.3" cy="6.6" rx="2.1" ry="2.6"/>
        <ellipse cx="18" cy="10" rx="2.2" ry="2.6" transform="rotate(25 18 10)"/>
      </svg>`;
    } else {
      row.textContent = '🔒';
    }

    if (opts.unlocked) {
      // v1.7.11: real press-down feedback — node visibly depresses,
      // 3D depth shrinks, cast shadow tightens. Released = back to rest.
      const restShadow = `0 11px 0 ${shadowColor}, 0 20px 14px -3px rgba(60, 42, 28, 0.32)`;
      const pressShadow = `0 3px 0 ${shadowColor}, 0 8px 6px -2px rgba(60, 42, 28, 0.22)`;
      const press = () => {
        row.style.transform = 'translateY(8px)';
        row.style.boxShadow = pressShadow;
      };
      const release = () => {
        row.style.transform = '';
        row.style.boxShadow = restShadow;
      };
      row.addEventListener('mousedown', press);
      row.addEventListener('mouseup', release);
      row.addEventListener('mouseleave', release);
      row.addEventListener('touchstart', press, { passive: true });
      row.addEventListener('touchend', release);
      row.addEventListener('touchcancel', release);
      row.addEventListener('click', (e) => {
        e.preventDefault();
        if (opts.chapter !== null) {
          this.handlers.onPlayChapter(opts.chapter);
        }
      });
    }

    return {
      idx: opts.idx,
      el: row,
      unlocked: opts.unlocked,
      completed: opts.completed,
      isCurrent: false,
    };
  }

  private buildDivider(text: string): HTMLElement {
    const div = document.createElement('div');
    applyStyle(div, {
      position: 'absolute',
      left: '0',
      right: '0',
      top: `${6 * ROW_HEIGHT + 8}px`,
      textAlign: 'center',
      fontSize: '11px',
      fontWeight: '800',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      color: COLOR_TEXT_MUTED,
      padding: '14px 0',
    });
    div.textContent = text;
    return div;
  }

  private buildCat(): HTMLDivElement {
    const cat = document.createElement('div');
    cat.className = 'pickup-map-cat';
    applyStyle(cat, {
      position: 'absolute',
      width: '88px',
      height: '110px',
      pointerEvents: 'none',
      zIndex: '5',
      // v1.7.12: cat sprite hidden until replacement art lands (grandma /
      // Shiba etc.). Code path kept intact so we can swap inner SVG and
      // toggle display when new PNGs arrive.
      display: 'none',
      transition: 'transform 700ms cubic-bezier(0.4, -0.3, 0.55, 1.5)',
      transformOrigin: '50% 100%',
      willChange: 'transform',
    });
    // Same calico SVG as the tear-intro / loader, no rotation
    cat.innerHTML = `
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style="width:100%;height:100%;display:block;filter:drop-shadow(0 6px 8px rgba(60,42,28,0.28));">
        <path d="M 110 195 L 145 100 L 180 195 Z" fill="#9d3e1c"/>
        <path d="M 290 195 L 255 100 L 220 195 Z" fill="#9d3e1c"/>
        <path d="M 134 188 L 154 138 L 174 188 Z" fill="#e89887"/>
        <path d="M 266 188 L 246 138 L 226 188 Z" fill="#e89887"/>
        <ellipse cx="200" cy="295" rx="138" ry="128" fill="#fdf0d6"/>
        <ellipse cx="158" cy="220" rx="38" ry="24" fill="#e89c5e" transform="rotate(-22 158 220)"/>
        <ellipse cx="270" cy="250" rx="32" ry="38" fill="#3a2a1f" transform="rotate(18 270 250)"/>
        <path d="M 80 330 L 130 335" stroke="#3a2a1f" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
        <path d="M 80 352 L 130 350" stroke="#3a2a1f" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
        <path d="M 270 335 L 320 330" stroke="#3a2a1f" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
        <path d="M 270 350 L 320 352" stroke="#3a2a1f" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
        <ellipse cx="160" cy="295" rx="22" ry="36" fill="#1a1208"/>
        <ellipse cx="240" cy="295" rx="22" ry="36" fill="#1a1208"/>
        <circle cx="168" cy="282" r="6.5" fill="#ffffff"/>
        <circle cx="248" cy="282" r="6.5" fill="#ffffff"/>
        <path d="M 190 340 L 210 340 L 200 350 Z" fill="#d48474"/>
        <path d="M 178 372 Q 200 384 222 372" stroke="#1a1208" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      </svg>
    `;
    return cat;
  }

  /**
   * Pick which node the cat should "stand on" given chapter progress.
   * For v1.7.3 (Ch1 only): if Ch1 not yet completed → cat at q1 (node 0).
   * If Ch1 completed → cat parks at q6 (node 5) showing the journey
   * is done. Once Ch2 unlocks, it'll move to node 6.
   */
  private deriveCurrentNodeIdx(highestCompleted: number): number {
    if (highestCompleted >= 1) {
      // Ch1 done — cat parks at last Ch1 node (will hop to ch2 placeholder later)
      return 5;
    }
    return 0;
  }

  /**
   * Position the cat above the target node. When `animate` is true the
   * existing CSS transition handles the smooth slide; when false we
   * temporarily kill the transition so the cat snaps without an arc.
   */
  private positionCat(nodeIdx: number, animate: boolean): void {
    const node = this.nodes[nodeIdx];
    if (!node) return;

    // Translate-to coordinates: place cat top-left such that its bottom
    // overlaps the node center. Cat is 88x110, node is 76x76, node top
    // is at row*ROW_HEIGHT + 16.
    const rowTop = nodeIdx * ROW_HEIGHT + 16;
    const isLeft = nodeIdx % 2 === 0;
    const nodeLeft = isLeft
      ? CONTAINER_W / 2 - NODE_SIZE / 2 - ZIG_OFFSET
      : CONTAINER_W / 2 - NODE_SIZE / 2 + ZIG_OFFSET;
    const catX = nodeLeft + NODE_SIZE / 2 - 88 / 2;  // center horizontally on node
    // v1.7.9: node is shorter (64px tall) — push cat up so its bottom
    // overlaps the top ~12px of the node, like sitting on it not in it.
    const catY = rowTop - 98;

    if (!animate) {
      this.cat.style.transition = 'none';
      this.cat.style.transform = `translate(${catX}px, ${catY}px)`;
      // Force layout flush then restore transition
      void this.cat.offsetHeight;
      this.cat.style.transition = '';
    } else {
      this.cat.style.transform = `translate(${catX}px, ${catY}px)`;
    }
  }

  private readLastCatIdx(): number | null {
    try {
      const v = localStorage.getItem(LS_LAST_CAT_NODE);
      if (!v) return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    } catch {
      return null;
    }
  }
  private writeLastCatIdx(idx: number): void {
    try {
      localStorage.setItem(LS_LAST_CAT_NODE, String(idx));
    } catch { /* ignore */ }
  }
}
