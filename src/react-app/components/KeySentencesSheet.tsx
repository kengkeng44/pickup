/**
 * v2.0.B.176 — Key Sentences overlay strict port from StoryMapView.openKeySentences.
 * Shows chapter's narration sentences with speaker icon (Duolingo Stories style).
 */
import { useEffect, useState } from 'react';
import { speak } from '../../audio/tts';

interface NarrationQ {
  type: string;
  id: string;
  sentence?: string;
  explanationZh?: string;
}

interface Lesson {
  id: string;
  chapter: number;
  questions: NarrationQ[];
}

interface Props {
  chapter: number;
  titleEn: string;
  onClose: () => void;
}

export default function KeySentencesSheet({ chapter, titleEn, onClose }: Props) {
  const [narrations, setNarrations] = useState<NarrationQ[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch(`/lessons-ch${chapter}.json`)
      .then(r => r.json())
      .then((lessons: Lesson[]) => {
        const ns: NarrationQ[] = [];
        for (const l of lessons) {
          for (const q of l.questions || []) {
            if (q.type === 'narration' && q.sentence) ns.push(q);
          }
        }
        setNarrations(ns);
        requestAnimationFrame(() => setVisible(true));
      })
      .catch(() => {});
  }, [chapter]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(60,42,28,0.55)', zIndex: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        fontFamily: '"Nunito", "Noto Sans TC", system-ui, sans-serif',
        color: 'var(--t-text)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 240ms ease-out',
      }}
    >
      {/* v2.0.B.536 (per user 極簡): 改置中面板 + 遮罩, 移除 ×, 點背景即關閉 */}
      <div style={{
        width: 'min(420px, calc(100vw - 32px))', maxHeight: '88dvh', overflowY: 'auto',
        background: 'var(--t-surface-raised)', borderRadius: 18,
        border: '2px solid var(--t-border)', borderBottom: '4px solid var(--t-border-strong)',
        padding: '20px 18px calc(18px + env(safe-area-inset-bottom))',
        display: 'flex', flexDirection: 'column', gap: 14,
        WebkitOverflowScrolling: 'touch' as const,
      }}>
        {/* Title */}
        <div>
          <div style={{ fontSize: 'var(--t-text-label)', fontWeight: 800, letterSpacing: 1.5, color: 'var(--t-text-muted)', textTransform: 'uppercase', textAlign: 'center' }}>
            {titleEn}
          </div>
          <div style={{ fontSize: 'var(--t-text-title)', fontWeight: 900, color: 'var(--t-text)', textAlign: 'center', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <img src="/mascots/icon-paw.webp" alt="" aria-hidden="true" width={28} height={28} style={{ display: 'inline-block' }} />
            Key Sentences
          </div>
        </div>

        {/* v2.0.B.286: 砍中文 section header「重點語句」— 上方 Key Sentences title 已 self-evident
            user: 「書封點進去有一個重要金句 要改成英文」 */}

        {/* Sentence bubbles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {narrations.length === 0 ? (
            <div style={{ padding: 20, textAlign: 'center', color: 'var(--t-text-muted)', fontSize: 'var(--t-text-label)' }}>No key sentences yet</div>
          ) : narrations.map(q => (
            <div
              key={q.id}
              style={{
                background: 'var(--t-surface)',
                border: '2px solid var(--t-border)',
                borderRadius: 'var(--t-radius-card)',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
              }}
            >
              <button
                type="button"
                aria-label="Speak"
                onClick={() => { try { speak(q.sentence ?? ''); } catch {} }}
                style={{
                  flex: '0 0 auto', width: 32, height: 32, padding: 0,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
                }}
              >
                <img src="/mascots/icon-speaker.webp" width={26} height={26} alt="" style={{ display: 'block' }} />
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--t-text-body)', fontWeight: 700, color: 'var(--t-text)', lineHeight: 1.5 }}>
                  {q.sentence}
                </div>
                {q.explanationZh && (
                  <div style={{ fontSize: 'var(--t-text-label)', color: 'var(--t-text-muted)', marginTop: 4, lineHeight: 1.4 }}>
                    {q.explanationZh}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
