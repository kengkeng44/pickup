/**
 * 拾光 (Pickup) — BondStageUpToast (v2.0.B.283).
 *
 * Celebratory overlay shown when Mochi's bond stage increases.
 * Displays the stageUp line + memory line + a gentle dismiss button.
 * Implemented as a Sheet-like overlay (zero blur backdrop, slide-up panel)
 * using design-system primitives.
 *
 * Never punishes — copy is warm + celebratory only.
 */
import { useEffect, useRef } from 'react';
import MascotSlot from '../../ui/components/MascotSlot';
import { BOND_COPY } from '../../data/bondCopy';
import { getStage } from '../../data/bond';

export interface BondStageUpToastProps {
  /** New stage id (2–5) that was just reached. */
  newStageId: number;
  onDismiss: () => void;
}

export default function BondStageUpToast({ newStageId, onDismiss }: BondStageUpToastProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus dismiss button on open (a11y).
  useEffect(() => {
    const id = requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, []);

  // ESC to dismiss.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onDismiss]);

  const stage = getStage();
  const stageUpLine = BOND_COPY.stageUp[newStageId as 2 | 3 | 4 | 5];
  const memoryLine = BOND_COPY.memory[newStageId as 2 | 3 | 4 | 5];

  return (
    /* Backdrop — semi-opaque warm overlay, zero blur per brand rule */
    <div
      onClick={onDismiss}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(60,42,28,0.55)',
        zIndex: 'var(--t-z-overlay)' as unknown as number,
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Panel — slide up, stopPropagation */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Mochi 羈絆提升 · Bond stage up: ${stage.name_en}`}
        className="t-sheet__panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          padding: '28px 24px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          paddingBottom: 'calc(40px + env(safe-area-inset-bottom))',
        }}
      >
        {/* Mochi mascot — bouncing celebration */}
        <MascotSlot char="mochi" size={88} floor className="pickup-bounce" aria-label="Mochi celebrating" />

        {/* Stage name pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--t-tint-warn)',
          border: '2px solid var(--t-brand)',
          borderRadius: 'var(--t-radius-pill)',
          padding: '4px 14px',
        }}>
          <span style={{ fontSize: 14, fontWeight: 900, color: 'var(--t-brand)' }}>
            {stage.name_zh} · {stage.name_en}
          </span>
        </div>

        {/* Stage-up headline */}
        {stageUpLine && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 18,
              fontWeight: 900,
              color: 'var(--t-text)',
              lineHeight: 1.4,
              marginBottom: 4,
            }}>
              {stageUpLine.zh}
            </div>
            <div style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--t-text-muted)',
              fontStyle: 'italic',
            }}>
              {stageUpLine.en}
            </div>
          </div>
        )}

        {/* Memory line — poetic moment */}
        {memoryLine && (
          <div style={{
            textAlign: 'center',
            padding: '10px 16px',
            background: 'var(--t-surface-alt)',
            border: '1.5px dashed var(--t-border-card)',
            borderRadius: 'var(--t-radius-md)',
            maxWidth: 320,
          }}>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--t-text)',
              lineHeight: 1.6,
              marginBottom: 2,
            }}>
              {memoryLine.zh}
            </div>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--t-text-muted)',
              fontStyle: 'italic',
            }}>
              {memoryLine.en}
            </div>
          </div>
        )}

        {/* Dismiss — native button so we can attach ref for a11y focus */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onDismiss}
          className="t-btn t-btn--primary t-btn--lg t-btn--full"
          style={{ maxWidth: 360, marginTop: 4 }}
        >
          繼續 →
        </button>
      </div>
    </div>
  );
}
