/**
 * 拾光 (Pickup) — Sheet primitive (design-system v1, v2.0.B.280).
 *
 * Fixed backdrop + bottom slide-up panel. Matches the pattern in
 * WardrobeView / KeySentencesSheet / ShareModal.
 *
 * Features:
 *   - Warm semi-opaque backdrop (--t-text @ 55% opacity, zero blur)
 *   - Panel slides up from bottom (CSS class animation)
 *   - ESC key + backdrop-click to close
 *   - Optional title in panel header
 *   - Focus stays in panel (no full focus-trap lib — uses autoFocus on close btn)
 *   - Safe-area padding bottom (iOS home bar)
 *   - z-index via var(--t-z-overlay)
 *
 *   <Sheet open={open} onClose={() => setOpen(false)} title="Key Sentences">
 *     ...content...
 *   </Sheet>
 */
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  /** Optional header title string. */
  title?: string;
  /** aria-label for the dialog (defaults to title or "Sheet"). */
  ariaLabel?: string;
  children: ReactNode;
}

export default function Sheet({ open, onClose, title, ariaLabel, children }: SheetProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus the close button when sheet opens for keyboard / a11y.
  useEffect(() => {
    if (open) {
      // requestAnimationFrame so panel CSS transition has started before focus.
      const id = requestAnimationFrame(() => closeBtnRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  // ESC to close.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const label = ariaLabel ?? title ?? 'Sheet';

  return (
    /* Backdrop */
    <div
      className="t-sheet__backdrop"
      onClick={onClose}
      aria-hidden="true"
    >
      {/* Panel — stopPropagation so clicks inside don't close. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="t-sheet__panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="t-sheet__header">
          {title && <span className="t-sheet__title">{title}</span>}
          <button
            ref={closeBtnRef}
            type="button"
            aria-label="Close"
            className="t-sheet__close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="t-sheet__body">
          {children}
        </div>
      </div>
    </div>
  );
}
