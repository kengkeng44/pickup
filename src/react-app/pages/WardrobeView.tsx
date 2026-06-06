/**
 * v2.0.B.234 招 3 — Mascot Customization wardrobe modal.
 *
 * Entered from Profile tab "衣櫥 · Wardrobe" button. Renders a grid of
 * all 11 outfits. Tap an unlocked outfit → preview Mochi wearing it →
 * confirm via 套用 button. Locked outfits show grayscale + warm hint
 * (per CLAUDE.md microcopy rule: no shame language).
 *
 * Image strategy: outfit WebPs are placeholder paths until user generates
 * art. Preview always renders /mascots/calico-anchor.webp as base + the
 * outfit's emoji as a small badge overlay (bottom-right). When real art
 * lands, swap `imageSrc` in mascotOutfits.ts and the UI keeps working.
 */
import { useState, useMemo } from 'react';
import {
  getAllOutfits,
  readUnlockedOutfits,
  readOutfit,
  setOutfit,
  type MascotOutfit,
} from '../../data/mascotOutfits';

interface Props {
  onClose: () => void;
  /** Optional callback after user confirms a new outfit. */
  onApplied?: (outfitId: string) => void;
}

export default function WardrobeView({ onClose, onApplied }: Props) {
  const outfits = useMemo(() => getAllOutfits(), []);
  const [unlocked, setUnlockedState] = useState<Set<string>>(() => readUnlockedOutfits());
  const [currentId, setCurrentId] = useState<string>(() => readOutfit());
  const [previewId, setPreviewId] = useState<string>(() => readOutfit());

  const preview = outfits.find(o => o.id === previewId) ?? outfits[0];
  const isPreviewUnlocked = unlocked.has(preview.id);
  const isPreviewCurrent = preview.id === currentId;

  const handleApply = () => {
    if (!isPreviewUnlocked) return;
    const ok = setOutfit(preview.id);
    if (ok) {
      setCurrentId(preview.id);
      // Refresh unlocked set in case anything changed under us.
      setUnlockedState(readUnlockedOutfits());
      try { onApplied?.(preview.id); } catch {}
    }
  };

  const unlockedCount = outfits.filter(o => unlocked.has(o.id)).length;
  const total = outfits.length;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(60,42,28,0.55)',
        zIndex: 200,
        display: 'flex', alignItems: 'stretch', justifyContent: 'center',
        padding: 0,
      }}
      role="dialog"
      aria-label="Mascot wardrobe"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pickup-fade-up"
        style={{
          background: '#fef8ed',
          width: '100%', maxWidth: 460,
          margin: 'auto', borderRadius: 18,
          maxHeight: '92dvh',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          border: '2px solid #e7a44a',
          borderBottom: '4px solid #b07a2a',
          fontFamily: '"Nunito", "Noto Sans TC", system-ui, sans-serif',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 18px 12px',
          borderBottom: '1px solid #e0d0b8',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: '#3c2a1c', margin: 0 }}>
              衣櫥 · Wardrobe
            </h2>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#8b6f4a', marginTop: 2 }}>
              {unlockedCount} / {total} 套裝扮 · {unlockedCount} / {total} outfits
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'transparent', border: 'none',
              fontSize: 22, color: '#8b6f4a', cursor: 'pointer',
              width: 44, height: 44, padding: 0,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 8,
              WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
            }}
          >
            ✕
          </button>
        </div>

        {/* Preview pane */}
        <div style={{
          padding: '18px 18px 14px',
          background: '#fff7e8',
          borderBottom: '1px solid #e0d0b8',
          display: 'flex', gap: 14, alignItems: 'center',
        }}>
          <OutfitPreview outfit={preview} unlocked={isPreviewUnlocked} large />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#3c2a1c', lineHeight: 1.2 }}>
              {preview.name.zh}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#8b6f4a', marginTop: 2 }}>
              {preview.name.en}
            </div>
            <div style={{
              marginTop: 8, fontSize: 12, color: '#5a4530',
              fontWeight: 600, lineHeight: 1.45,
            }}>
              {isPreviewUnlocked ? preview.bio.zh : preview.unlockHint.zh}
            </div>
            <div style={{
              marginTop: 3, fontSize: 11, color: '#8b6f4a',
              fontWeight: 600, fontStyle: 'italic', lineHeight: 1.4,
            }}>
              {isPreviewUnlocked ? preview.bio.en : preview.unlockHint.en}
            </div>
          </div>
        </div>

        {/* Apply button */}
        <div style={{ padding: '12px 18px', borderBottom: '1px solid #e0d0b8' }}>
          <button
            onClick={handleApply}
            disabled={!isPreviewUnlocked || isPreviewCurrent}
            style={{
              width: '100%', padding: '12px 18px',
              background: isPreviewUnlocked
                ? (isPreviewCurrent ? '#c8a878' : '#7ac74a')
                : '#c4b89c',
              color: '#fff', border: 'none',
              borderBottom: `4px solid ${
                isPreviewUnlocked
                  ? (isPreviewCurrent ? '#8b6f4a' : '#5d9a35')
                  : '#a89c80'
              }`,
              borderRadius: 12,
              fontSize: 15, fontWeight: 900,
              cursor: isPreviewUnlocked && !isPreviewCurrent ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
              touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
              opacity: isPreviewUnlocked ? 1 : 0.85,
            }}
          >
            {isPreviewCurrent
              ? '目前裝扮 · Currently worn'
              : isPreviewUnlocked
                ? '套用 · Apply'
                : '尚未解鎖 · Not unlocked yet'}
          </button>
        </div>

        {/* Grid of all outfits */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px 18px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
          }}>
            {outfits.map(o => {
              const isUnlocked = unlocked.has(o.id);
              const isWorn = o.id === currentId;
              const isSelected = o.id === previewId;
              return (
                <button
                  key={o.id}
                  onClick={() => setPreviewId(o.id)}
                  aria-label={`${o.name.zh} · ${o.name.en}${isUnlocked ? '' : ' (locked)'}`}
                  style={{
                    background: isSelected ? '#fff7e8' : '#fff',
                    border: `2px solid ${isSelected ? '#e7a44a' : isUnlocked ? '#c8a878' : '#c4b89c'}`,
                    borderBottom: `4px solid ${isSelected ? '#b07a2a' : isUnlocked ? '#8b6f4a' : '#a89c80'}`,
                    borderRadius: 12,
                    padding: '10px 6px 8px',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 4,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    position: 'relative',
                  }}
                >
                  <OutfitPreview outfit={o} unlocked={isUnlocked} />
                  <div style={{
                    fontSize: 11, fontWeight: 900,
                    color: isUnlocked ? '#3c2a1c' : '#8b6f4a',
                    textAlign: 'center', lineHeight: 1.2, marginTop: 2,
                  }}>
                    {isUnlocked ? o.name.zh : '???'}
                  </div>
                  {isWorn && (
                    <div style={{
                      position: 'absolute',
                      top: 4, right: 4,
                      background: '#7ac74a', color: '#fff',
                      fontSize: 9, fontWeight: 900,
                      padding: '2px 6px', borderRadius: 999,
                      letterSpacing: 0.5,
                    }}>
                      WORN
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Tile preview — base Mochi + emoji badge overlay. Grayscale if locked. */
function OutfitPreview({ outfit, unlocked, large = false }: {
  outfit: MascotOutfit; unlocked: boolean; large?: boolean;
}) {
  const size = large ? 88 : 56;
  const badgeSize = large ? 30 : 22;
  return (
    <div style={{
      width: size, height: size, position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <img
        src="/mascots/calico-anchor.webp"
        alt=""
        width={size} height={size}
        style={{
          display: 'block', borderRadius: '50%',
          filter: unlocked ? 'none' : 'grayscale(1) opacity(0.45)',
        }}
      />
      {outfit.emojiBadge && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: -2, right: -2,
            fontSize: badgeSize, lineHeight: 1,
            filter: unlocked ? 'none' : 'grayscale(1) opacity(0.5)',
            // soft halo so emoji reads on the cat
            textShadow: '0 1px 2px rgba(255,255,255,0.9)',
          }}
        >
          {outfit.emojiBadge}
        </span>
      )}
      {!unlocked && (
        <span aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: large ? 28 : 20, lineHeight: 1,
          opacity: 0.7,
        }}>
          🔒
        </span>
      )}
    </div>
  );
}
