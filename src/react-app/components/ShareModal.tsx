/**
 * v2.0.B.235 — Share Modal surfaced from CompletePanel after lesson finish.
 *
 * UX:
 *   1. Top — Pickup-branded preview card (renders genShareCardSVG inline).
 *   2. Below — 4 share targets:
 *        - 📲 系統分享 · Share (Web Share API; iOS / Android browser)
 *        - 💚 LINE deep link
 *        - 📷 Instagram (deep link if installed, fallback open)
 *        - 💬 WhatsApp deep link
 *        - 💾 保存圖片 · Save (SVG → canvas → PNG download)
 *
 * Web Share API gracefully degrades: if `navigator.share` is missing, the
 * system-share button hides and only deep-link options + save remain.
 *
 * NO npm deps. Pure DOM + canvas.
 *
 * USED BY
 *   - src/react-app/pages/LessonPage.tsx CompletePanel
 */

import { useEffect, useMemo, useState } from 'react';
import type { KeySentence } from '../../data/keySentences';
import { genShareCardSVG, SHARE_CARD_W, SHARE_CARD_H, svgToDataUri } from '../../data/shareCard';

const SITE_URL = 'https://pickupwords.pages.dev';

interface Props {
  sentence: KeySentence;
  chapter: number;
  onClose: () => void;
}

export default function ShareModal({ sentence, chapter, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [hasWebShare, setHasWebShare] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedHint, setSavedHint] = useState<string | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    try {
      setHasWebShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
    } catch {
      setHasWebShare(false);
    }
  }, []);

  // Memoize the SVG so re-renders don't churn the data URI.
  const svg = useMemo(() => genShareCardSVG(sentence), [sentence]);
  const previewUri = useMemo(() => svgToDataUri(svg), [svg]);

  // The text that goes into share sheets / deep links.
  const shareText = useMemo(() => {
    return `📖 拾光 Pickup · 第 ${chapter} 章金句\n\n"${sentence.en}"\n${sentence.zh}\n— ${sentence.source}\n\n${SITE_URL}`;
  }, [sentence, chapter]);

  const onSystemShare = async () => {
    try {
      await navigator.share({
        title: '拾光 Pickup · 金句',
        text: shareText,
        url: SITE_URL,
      });
    } catch {
      /* user cancelled or share failed — silent */
    }
  };

  const onLineShare = () => {
    // LINE share URL — opens LINE app or web LINE share.
    const url = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const onWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const onInstagramShare = () => {
    // Instagram has no direct text-share web deep link. Best we can do is
    // open the app (mobile) — user pastes from clipboard. Copy to clipboard
    // first so the paste-into-IG flow is one tap.
    try { navigator.clipboard?.writeText(shareText); } catch {}
    // instagram:// scheme opens app on mobile; falls through to nothing on desktop.
    // We still surface a hint.
    window.open('instagram://app', '_blank');
    setSavedHint('已複製到剪貼簿,可貼到 IG · Copied to clipboard');
    setTimeout(() => setSavedHint(null), 3000);
  };

  const onSaveImage = async () => {
    setSaving(true);
    try {
      const dataUrl = await rasterizeSvgToPng(svg);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `pickup-ch${chapter}-quote.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setSavedHint('已下載 · Saved');
      setTimeout(() => setSavedHint(null), 2500);
    } catch {
      setSavedHint('儲存失敗,試系統分享 · Save failed');
      setTimeout(() => setSavedHint(null), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share quote"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(60, 42, 28, 0.55)',
        zIndex: 90,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 200ms ease',
      }}
    >
      <div style={{
        background: '#fef8ed',
        borderRadius: 18,
        border: '2px solid #c8a878',
        borderBottom: '5px solid #8b6f4a',
        padding: 18,
        width: '100%',
        maxWidth: 420,
        maxHeight: '92dvh',
        overflowY: 'auto',
        boxSizing: 'border-box',
        fontFamily: '"Nunito", "Noto Sans TC", system-ui, sans-serif',
        color: '#3c2a1c',
      }}>
        {/* v2.0.B.536 (per user 極簡): 移除 ✕, 點背景即關閉 */}
        <div style={{ fontSize: 18, fontWeight: 900, color: '#3c2a1c', marginBottom: 12 }}>分享金句</div>

        {/* Preview card */}
        <div style={{
          background: '#fff7e8',
          border: '2px solid #e7a44a',
          borderRadius: 'var(--t-radius-md)',
          padding: 6,
          marginBottom: 14,
        }}>
          <img
            src={previewUri}
            alt={`Quote card: ${sentence.en}`}
            width={SHARE_CARD_W}
            height={SHARE_CARD_H}
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
          />
        </div>

        {/* Source attribution (text — accessible fallback) */}
        <div style={{ fontSize: 12, color: '#8b6f4a', textAlign: 'center', marginBottom: 14, lineHeight: 1.5 }}>
          {sentence.source}
        </div>

        {/* Share targets */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          {hasWebShare && (
            <ShareButton
              label="系統分享 · Share"
              emoji="📲"
              bg="#7ac74a"
              borderDark="#5d9a35"
              onClick={onSystemShare}
            />
          )}
          <ShareButton
            label="LINE"
            emoji="💚"
            bg="#06c755"
            borderDark="#048a3b"
            onClick={onLineShare}
          />
          <ShareButton
            label="WhatsApp"
            emoji="💬"
            bg="#25d366"
            borderDark="#1aa64b"
            onClick={onWhatsAppShare}
          />
          <ShareButton
            label="Instagram"
            emoji="📷"
            bg="#e4406f"
            borderDark="#a82b50"
            onClick={onInstagramShare}
          />
          <ShareButton
            label={saving ? '處理中…' : '保存圖片 · Save'}
            emoji="💾"
            bg="#e7a44a"
            borderDark="#b07a2a"
            onClick={onSaveImage}
            disabled={saving}
          />
        </div>

        {savedHint && (
          <div style={{
            marginTop: 8, padding: '10px 12px',
            background: '#fef3c7', border: '1.5px solid #c8a878',
            borderRadius: 10, color: '#7a5e25',
            fontSize: 13, fontWeight: 700, textAlign: 'center',
          }}>{savedHint}</div>
        )}
      </div>
    </div>
  );
}

function ShareButton({ label, emoji, bg, borderDark, onClick, disabled }: {
  label: string;
  emoji: string;
  bg: string;
  borderDark: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '12px 10px',
        background: bg,
        color: '#fff',
        border: 'none',
        borderBottom: `4px solid ${borderDark}`,
        borderRadius: 'var(--t-radius-md)',
        fontSize: 14,
        fontWeight: 900,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontFamily: 'inherit',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 6,
        minHeight: 48,
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 18 }}>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}

/**
 * Rasterize a SVG string into a PNG data URL by drawing it onto a canvas.
 * Used only by the "Save" button. Returns a data:image/png;base64,... URL.
 *
 * Resolves once the off-screen <img> has fully loaded; rejects otherwise.
 */
function rasterizeSvgToPng(svg: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = SHARE_CARD_W;
        canvas.height = SHARE_CARD_H;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error('no 2d context'));
          return;
        }
        ctx.drawImage(img, 0, 0, SHARE_CARD_W, SHARE_CARD_H);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(err as Error);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('svg image load failed'));
    };
    img.src = url;
  });
}
