/**
 * FirstVisitTip (v2.0.B.579 per user「一次性教學應該是首次進頁跳彈窗, 不要在頁面上加東西」)。
 *
 * 首次進入某頁時彈一張小卡教學, 點背景即關 (tap-outside dismiss, 設計原則),
 * 關閉後寫 localStorage `pickup.tip.<id>`, 永不再出現。
 * FTUE 業界規則 (Appcues / NN·G coach marks): 一次一則、可關閉、情境化、每畫面 ≤1。
 */
import { useState } from 'react';

const KEY = (id: string) => `pickup.tip.${id}`;

export default function FirstVisitTip({ id, emoji, text }: { id: string; emoji: string; text: string }) {
  const [open, setOpen] = useState(() => {
    try { return localStorage.getItem(KEY(id)) !== '1'; } catch { return false; }
  });
  const dismiss = () => {
    try { localStorage.setItem(KEY(id), '1'); } catch {}
    setOpen(false);
  };
  if (!open) return null;
  return (
    <div
      onClick={dismiss}
      role="dialog"
      aria-label={text}
      style={{
        position: 'fixed', inset: 0, zIndex: 'var(--t-z-toast)' as unknown as number,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28,
      }}
    >
      <div className="pickup-streak-pop" style={{
        background: 'var(--t-surface-raised)', borderRadius: 'var(--t-radius-lg)',
        border: '2px solid var(--t-brand)', padding: '22px 20px',
        maxWidth: 300, textAlign: 'center',
      }}>
        <div style={{ fontSize: 44, lineHeight: 1, marginBottom: 10 }} aria-hidden="true">{emoji}</div>
        <div style={{ fontSize: 'var(--t-text-body)', fontWeight: 800, color: 'var(--t-text)', lineHeight: 1.6 }}>
          {text}
        </div>
      </div>
    </div>
  );
}
