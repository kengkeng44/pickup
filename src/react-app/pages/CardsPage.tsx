/**
 * v2.0.B.232 招 2 — Collectible Card 圖鑑 page.
 *
 * Grid layout grouped by chapter. Unlocked cards show full color +
 * bilingual bio. Locked cards show grayscale silhouette + a warm
 * "completing X will unlock" hint (no shame language).
 *
 * Tapping a card opens a simple modal-style detail overlay.
 */
import { useState, useMemo } from 'react';
import { getAllCards, readUnlockedCardIds, type CharacterCard } from '../../data/cards';

export default function CardsPage() {
  const [selected, setSelected] = useState<CharacterCard | null>(null);
  const unlocked = useMemo(() => readUnlockedCardIds(), []);
  const cards = getAllCards();
  const total = cards.length;
  const unlockedCount = cards.filter(c => unlocked.has(c.id)).length;

  // Group by chapter
  const byChapter = useMemo(() => {
    const groups: Record<number, CharacterCard[]> = {};
    for (const c of cards) {
      (groups[c.chapter] ||= []).push(c);
    }
    return groups;
  }, [cards]);

  const chapterNums = Object.keys(byChapter).map(Number).sort((a, b) => a - b);

  return (
    <div style={{
      padding: '16px 14px 24px',
      background: 'var(--t-bg)',
      minHeight: '100dvh',
      fontFamily: '"Nunito", "Noto Sans TC", system-ui, sans-serif',
    }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--t-text)', margin: '0 0 6px' }}>
          圖鑑 · Collection
        </h1>
        <div style={{ fontSize: 13, color: 'var(--t-text-muted)', fontWeight: 700 }}>
          {unlockedCount} / {total} 張卡片 · {unlockedCount} / {total} cards
        </div>
        {/* progress bar */}
        <div style={{
          marginTop: 8, height: 6, background: 'rgba(122,104,80,0.18)',
          borderRadius: 4, overflow: 'hidden',
        }}>
          <div style={{
            width: `${total === 0 ? 0 : Math.round((unlockedCount / total) * 100)}%`,
            height: '100%', background: 'var(--t-brand)', borderRadius: 4,
            transition: 'width 0.3s',
          }} />
        </div>
      </header>

      {chapterNums.map(ch => {
        const chCards = byChapter[ch];
        const chTitle = chCards[0]?.chapterTitleZh ?? `Ch${ch}`;
        return (
          <section key={ch} style={{ marginBottom: 22 }}>
            <h2 style={{
              fontSize: 14, fontWeight: 800, color: 'var(--t-text-muted)',
              letterSpacing: 0.5, margin: '0 0 10px',
              textTransform: 'uppercase',
            }}>
              Ch{ch} · {chTitle}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
            }}>
              {chCards.map(c => (
                <CardTile
                  key={c.id}
                  card={c}
                  unlocked={unlocked.has(c.id)}
                  onClick={() => setSelected(c)}
                />
              ))}
            </div>
          </section>
        );
      })}

      {selected && (
        <CardDetail
          card={selected}
          unlocked={unlocked.has(selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function CardTile({ card, unlocked, onClick }: {
  card: CharacterCard; unlocked: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`${card.nameZh} · ${card.nameEn}${unlocked ? '' : ' (locked)'}`}
      style={{
        background: unlocked ? 'var(--t-surface)' : '#f1ebe1',
        border: `2px solid ${unlocked ? 'var(--t-brand)' : '#c4b89c'}`,
        borderBottom: `4px solid ${unlocked ? 'var(--t-brand-dark)' : '#a89c80'}`,
        borderRadius: 14,
        padding: '14px 8px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        cursor: 'pointer',
        fontFamily: 'inherit',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {card.iconSrc ? (
        <img
          src={card.iconSrc}
          width={72} height={72}
          alt=""
          style={{
            display: 'block',
            borderRadius: '50%',
            filter: unlocked ? 'none' : 'grayscale(1) opacity(0.45)',
          }}
        />
      ) : (
        <span style={{
          fontSize: 56, lineHeight: 1,
          filter: unlocked ? 'none' : 'grayscale(1) opacity(0.45)',
        }}>{card.emoji}</span>
      )}
      <div style={{
        fontSize: 14, fontWeight: 900, color: unlocked ? 'var(--t-text)' : 'var(--t-text-muted)',
        textAlign: 'center', lineHeight: 1.2,
      }}>
        {unlocked ? card.nameZh : '???'}
      </div>
      <div style={{
        fontSize: 11, fontWeight: 700, color: unlocked ? 'var(--t-text-muted)' : '#a89c80',
        textAlign: 'center', lineHeight: 1.2,
      }}>
        {unlocked ? card.nameEn : '???'}
      </div>
    </button>
  );
}

function CardDetail({ card, unlocked, onClose }: {
  card: CharacterCard; unlocked: boolean; onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(60,42,28,0.45)',
        zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pickup-fade-up"
        style={{
          background: 'var(--t-surface)', borderRadius: 18,
          maxWidth: 380, width: '100%',
          padding: '24px 22px',
          border: '2px solid var(--t-brand)',
          borderBottom: '4px solid var(--t-brand-dark)',
          textAlign: 'center',
        }}
      >
        {card.iconSrc ? (
          <img
            src={card.iconSrc}
            width={120} height={120}
            alt=""
            style={{
              display: 'block', margin: '0 auto 14px',
              borderRadius: '50%',
              filter: unlocked ? 'none' : 'grayscale(1) opacity(0.45)',
            }}
          />
        ) : (
          <div style={{
            fontSize: 96, lineHeight: 1, margin: '0 0 14px',
            filter: unlocked ? 'none' : 'grayscale(1) opacity(0.45)',
          }}>{card.emoji}</div>
        )}
        <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--t-text)' }}>
          {unlocked ? card.nameZh : '???'}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t-text-muted)', marginTop: 2 }}>
          {unlocked ? card.nameEn : 'Locked'}
        </div>
        <div style={{
          fontSize: 11, fontWeight: 800, color: 'var(--t-brand-dark)',
          letterSpacing: 1, marginTop: 12,
          textTransform: 'uppercase',
        }}>
          Ch{card.chapter} · {card.chapterTitleZh}
        </div>

        {unlocked ? (
          <>
            <div style={{
              marginTop: 14, padding: '12px 14px',
              background: 'var(--t-surface-alt)', borderRadius: 10,
              fontSize: 14, fontWeight: 700, color: 'var(--t-text)', lineHeight: 1.5,
              textAlign: 'left',
            }}>
              {card.bioZh}
            </div>
            <div style={{
              marginTop: 8, padding: '12px 14px',
              background: 'var(--t-bg)', borderRadius: 10,
              fontSize: 13, fontWeight: 600, color: '#5a4530', lineHeight: 1.5,
              textAlign: 'left', fontStyle: 'italic',
            }}>
              {card.bioEn}
            </div>
          </>
        ) : (
          <div style={{
            marginTop: 14, padding: '12px 14px',
            background: 'var(--t-bg)', borderRadius: 10,
            fontSize: 13, fontWeight: 700, color: 'var(--t-text-muted)', lineHeight: 1.5,
          }}>
            <div>{card.unlockHintZh}</div>
            <div style={{ marginTop: 4, fontSize: 12, fontWeight: 600, fontStyle: 'italic' }}>
              {card.unlockHintEn}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: 18, width: '100%', padding: '12px 18px',
            background: 'var(--t-success)', color: 'var(--t-surface)', border: 'none',
            borderBottom: '4px solid var(--t-success)', borderRadius: 12,
            fontSize: 15, fontWeight: 900, cursor: 'pointer',
            fontFamily: 'inherit',
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
          }}
        >
          關閉 · Close
        </button>
      </div>
    </div>
  );
}
