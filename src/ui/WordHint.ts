/**
 * WordHint — Duolingo-style tap-to-translate tooltip.
 *
 * Cloze sentences in 拾光 are English; A2-B1 learners often want to know
 * the Chinese for an unfamiliar word INSIDE the sentence (not just the
 * answer choices). This module loads a flat dictionary once
 * (`/word-hints.json`) and wires up a single floating tooltip that
 * follows whichever .word span the user just tapped.
 *
 * Public surface:
 *   - preloadHints()    — kick off the fetch (idempotent, safe to call anywhere).
 *   - lookupHint(word)  — synchronous lookup (returns null if not loaded yet
 *                         or word missing). Strips punctuation + lowercases.
 *   - wireSentenceHints(container) — bind tap handlers on .word descendants.
 *
 * Design intent:
 *   - One global tooltip instance (mounted lazily to document.body).
 *   - Tap-anywhere-else dismisses; tap same word again dismisses; tap a
 *     different word moves the tooltip; 3 s auto-dismiss timer.
 *   - Position above the word; flip below if no room.
 *   - prefers-reduced-motion: skip fade animation (CSS handles this).
 *   - Touch + mouse parity via `pointerdown` (single event captures both).
 *   - Never throws — failed fetch / missing word is silent (no popup).
 *   - Does NOT interfere with answer buttons: word spans live inside the
 *     sentence card, NOT inside any <button>. Tooltip is `pointer-events:
 *     none` so it can't accidentally swallow taps either.
 */

// ─── Dictionary loader (module-cached, async-safe) ──────────────────────────

type Dict = Record<string, string>;

let dict: Dict | null = null;
let dictPromise: Promise<Dict> | null = null;

/**
 * Begin (or reuse) the word-hints.json fetch. Idempotent: multiple calls
 * coalesce onto a single in-flight request. Safe to call from anywhere —
 * the actual lookup is sync (lookupHint), so callers don't have to await
 * this for the feature to "soft-on" once the dict arrives.
 */
export function preloadHints(): Promise<Dict> {
  if (dict) return Promise.resolve(dict);
  if (dictPromise) return dictPromise;
  dictPromise = fetch('/word-hints.json')
    .then((res) => {
      if (!res.ok) throw new Error(`word-hints.json ${res.status}`);
      return res.json() as Promise<Dict>;
    })
    .then((raw) => {
      // Normalize all keys to lowercase once at load time so lookups are
      // a single hash hit (no per-call casing variants).
      const out: Dict = {};
      for (const k of Object.keys(raw)) {
        out[k.toLowerCase()] = raw[k];
      }
      dict = out;
      return out;
    })
    .catch((err) => {
      // Silent failure — feature degrades gracefully (no tooltips appear).
      // eslint-disable-next-line no-console
      console.warn('[WordHint] preload failed:', err);
      dict = {};
      return dict;
    });
  return dictPromise;
}

/**
 * Synchronous lookup. Returns the Chinese gloss, or null if:
 *   - the dictionary hasn't loaded yet, OR
 *   - the word isn't in the dictionary (in either raw or
 *     punctuation-stripped form).
 *
 * `word` may include trailing punctuation (`rain.`); we strip it.
 */
export function lookupHint(word: string): string | null {
  if (!dict) return null;
  const cleaned = word
    .toLowerCase()
    .replace(/^[^a-z']+|[^a-z']+$/g, ''); // trim non-letter/non-apostrophe edges
  if (!cleaned) return null;
  if (cleaned in dict) return dict[cleaned];
  // Try without trailing apostrophe-suffix-only edge cases
  const noEdgeApos = cleaned.replace(/^'+|'+$/g, '');
  if (noEdgeApos && noEdgeApos in dict) return dict[noEdgeApos];
  return null;
}

// ─── Singleton tooltip controller ───────────────────────────────────────────

interface TooltipState {
  el: HTMLDivElement;
  /** Currently-highlighted word span (so re-tapping it dismisses). */
  anchor: HTMLElement | null;
  /** Auto-dismiss timer handle. */
  timer: number | null;
  /** Bound outside-tap dismiss handler (so we can remove it). */
  outsideHandler: ((e: PointerEvent) => void) | null;
  /** Bound scroll/resize reposition handler. */
  repositionHandler: (() => void) | null;
}

let tooltip: TooltipState | null = null;

const AUTO_DISMISS_MS = 3000;

function ensureTooltip(): TooltipState {
  if (tooltip) return tooltip;
  const el = document.createElement('div');
  el.className = 'pickup-word-tooltip';
  el.setAttribute('role', 'tooltip');
  el.setAttribute('aria-live', 'polite');
  // Mount hidden until first show — avoids a flash of empty bubble.
  el.style.display = 'none';
  document.body.appendChild(el);
  tooltip = {
    el,
    anchor: null,
    timer: null,
    outsideHandler: null,
    repositionHandler: null,
  };
  return tooltip;
}

function clearTimer(t: TooltipState): void {
  if (t.timer !== null) {
    window.clearTimeout(t.timer);
    t.timer = null;
  }
}

function detachListeners(t: TooltipState): void {
  if (t.outsideHandler) {
    document.removeEventListener('pointerdown', t.outsideHandler, true);
    t.outsideHandler = null;
  }
  if (t.repositionHandler) {
    window.removeEventListener('scroll', t.repositionHandler, true);
    window.removeEventListener('resize', t.repositionHandler);
    t.repositionHandler = null;
  }
}

/** Compute viewport rect of the anchor and place the tooltip. */
function position(t: TooltipState): void {
  if (!t.anchor) return;
  const r = t.anchor.getBoundingClientRect();
  const tipR = t.el.getBoundingClientRect();
  const margin = 8;

  // Center over anchor horizontally, clamped to viewport.
  let left = r.left + r.width / 2 - tipR.width / 2;
  left = Math.max(8, Math.min(window.innerWidth - tipR.width - 8, left));

  // Prefer above; flip below if no room.
  const wantTop = r.top - tipR.height - margin;
  let top: number;
  let below = false;
  if (wantTop >= 8) {
    top = wantTop;
  } else {
    top = r.bottom + margin;
    below = true;
  }

  t.el.style.left = `${Math.round(left)}px`;
  t.el.style.top = `${Math.round(top)}px`;
  t.el.classList.toggle('below', below);

  // Position the little arrow under the anchor center (relative to tooltip).
  const anchorCenterX = r.left + r.width / 2;
  const arrowX = anchorCenterX - left; // px from tooltip's left edge
  t.el.style.setProperty('--pickup-tip-arrow', `${Math.round(arrowX)}px`);
}

function hideTooltip(): void {
  if (!tooltip) return;
  const t = tooltip;
  clearTimer(t);
  detachListeners(t);
  if (t.anchor) {
    t.anchor.classList.remove('is-hinted');
    t.anchor = null;
  }
  t.el.style.display = 'none';
  t.el.textContent = '';
}

function showTooltipFor(anchor: HTMLElement, word: string, gloss: string): void {
  const t = ensureTooltip();

  // Tapped the same word we're already showing → dismiss (toggle).
  if (t.anchor === anchor && t.el.style.display !== 'none') {
    hideTooltip();
    return;
  }

  // Clear any previous anchor highlight.
  if (t.anchor && t.anchor !== anchor) {
    t.anchor.classList.remove('is-hinted');
  }

  t.anchor = anchor;
  anchor.classList.add('is-hinted');

  // Two-line layout: English word (small, dimmer) above Chinese gloss.
  t.el.innerHTML = '';
  const w = document.createElement('span');
  w.className = 'pickup-word-tooltip-en';
  w.textContent = word;
  const g = document.createElement('span');
  g.className = 'pickup-word-tooltip-zh';
  g.textContent = gloss;
  t.el.appendChild(w);
  t.el.appendChild(g);

  // Make visible BEFORE measuring, so getBoundingClientRect has real
  // dimensions. CSS animation handles the fade-in.
  t.el.style.display = 'flex';
  // Force a layout flush so we can measure, then position.
  // (display:flex + measure is enough; no need for offsetHeight tricks.)
  position(t);

  // Re-trigger the fade-up animation on every show.
  t.el.classList.remove('pickup-word-tooltip-show');
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  void t.el.offsetWidth;
  t.el.classList.add('pickup-word-tooltip-show');

  // 3 s auto-dismiss.
  clearTimer(t);
  t.timer = window.setTimeout(() => hideTooltip(), AUTO_DISMISS_MS);

  // Detach previous listeners then re-attach (idempotent).
  detachListeners(t);

  t.outsideHandler = (e: PointerEvent) => {
    const target = e.target as Node | null;
    if (!target) return;
    // Tapping ANOTHER .word span is handled by the span's own handler —
    // we only dismiss when the tap is genuinely outside any word.
    if (target instanceof Element) {
      if (target.closest('.word')) return;
      if (target.closest('.pickup-word-tooltip')) return;
    }
    hideTooltip();
  };
  // Capture phase so we see the tap before any other handler can stop it.
  document.addEventListener('pointerdown', t.outsideHandler, true);

  t.repositionHandler = () => position(t);
  window.addEventListener('scroll', t.repositionHandler, true);
  window.addEventListener('resize', t.repositionHandler);
}

// ─── Public: wire up a sentence container ───────────────────────────────────

/**
 * Bind a single delegated pointerdown handler to `container`. Every
 * descendant `<span class="word" data-word="...">` becomes tappable; the
 * handler shows / moves / dismisses the singleton tooltip.
 *
 * Idempotent — calling it twice on the same container is harmless (we
 * tag the container with a marker attribute and bail on re-bind).
 */
export function wireSentenceHints(container: HTMLElement): void {
  if (container.dataset.pickupWordHints === '1') return;
  container.dataset.pickupWordHints = '1';

  container.addEventListener('pointerdown', (e) => {
    const target = e.target as Element | null;
    if (!target) return;
    const span = target.closest('.word') as HTMLElement | null;
    if (!span || !container.contains(span)) return;

    const word = span.dataset.word ?? span.textContent ?? '';
    if (!word) return;
    const gloss = lookupHint(word);
    if (!gloss) {
      // No translation available — silently do nothing (per spec: failed
      // lookups shouldn't break anything; no annoying "[no translation]").
      return;
    }
    // Don't let this tap also trigger anything else upstream.
    e.stopPropagation();
    showTooltipFor(span, word, gloss);
  });
}

/**
 * Force-dismiss the tooltip (e.g. when the sentence changes round).
 * Safe to call at any time.
 */
export function dismissWordHint(): void {
  hideTooltip();
}
