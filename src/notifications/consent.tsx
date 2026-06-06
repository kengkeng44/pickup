/**
 * v2.0.B.232 (2026-06-06) — Notification consent UX.
 *
 * Source-of-truth: docs/research/notification-design.md § B3 "Consent UX".
 *
 * Rules:
 *   - DO NOT call Notification.requestPermission() on Day 1 / app boot.
 *     iOS Safari + Chrome treat that as dark pattern → >70% denial
 *     rate, and denial is irrevocable.
 *   - Trigger AFTER user finishes 3rd lesson (caller's responsibility).
 *   - Soft prompt (custom modal, bilingual) before native prompt.
 *   - If user denies soft prompt: re-ask in 7d, lifetime cap 2.
 *
 * Consent state is dual-layer:
 *   1. Browser permission (Notification.permission)
 *   2. App-level opt-in (localStorage `pickup.notifs.consent`)
 *
 * Both must be true for scheduler to fire.
 */
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'pickup.notifs.consent';
const PROMPT_HISTORY_KEY = 'pickup.notifs.prompt-history';

type ConsentState = 'granted' | 'denied' | null;

// ──────────────────────────────────────────────────────────────────────
// Storage helpers
// ──────────────────────────────────────────────────────────────────────

function readConsent(): ConsentState {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === 'granted' || v === 'denied') return v;
  } catch {}
  return null;
}

function writeConsent(state: 'granted' | 'denied'): void {
  try { localStorage.setItem(CONSENT_KEY, state); } catch {}
}

interface PromptEvent {
  shownAtIso: string;
  result: 'accepted' | 'declined' | 'dismissed';
}

function readPromptHistory(): PromptEvent[] {
  try {
    const raw = localStorage.getItem(PROMPT_HISTORY_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return [];
    return arr.filter((v): v is PromptEvent => {
      if (!v || typeof v !== 'object') return false;
      const o = v as Record<string, unknown>;
      return typeof o.shownAtIso === 'string' && typeof o.result === 'string';
    });
  } catch { return []; }
}

function appendPromptHistory(result: PromptEvent['result']): void {
  try {
    const list = readPromptHistory();
    list.push({ shownAtIso: new Date().toISOString(), result });
    localStorage.setItem(PROMPT_HISTORY_KEY, JSON.stringify(list.slice(-5)));
  } catch {}
}

// ──────────────────────────────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────────────────────────────

/**
 * App-level opt-in state. Browser permission checked separately.
 */
export function hasNotificationConsent(): boolean {
  return readConsent() === 'granted';
}

/**
 * Set app-level consent. If granted AND browser permission is 'default',
 * also triggers the native prompt.
 */
export async function setNotificationConsent(granted: boolean): Promise<void> {
  writeConsent(granted ? 'granted' : 'denied');
  if (granted && typeof Notification !== 'undefined' && Notification.permission === 'default') {
    try {
      await Notification.requestPermission();
    } catch {}
  }
}

/**
 * Should we show the soft prompt right now?
 *   - User has not granted yet
 *   - Lifetime cap (2) not hit
 *   - Last prompt > 7d ago (if any)
 */
export function shouldShowSoftPrompt(): boolean {
  if (readConsent() === 'granted') return false;
  if (typeof Notification === 'undefined') return false;
  if (Notification.permission === 'denied') return false; // can't re-ask anyway

  const history = readPromptHistory();
  if (history.length >= 2) return false;

  if (history.length > 0) {
    const last = history[history.length - 1]!;
    const elapsedDays = (Date.now() - new Date(last.shownAtIso).getTime()) / (24 * 60 * 60 * 1000);
    if (elapsedDays < 7) return false;
  }

  return true;
}

// ──────────────────────────────────────────────────────────────────────
// React component
// ──────────────────────────────────────────────────────────────────────

export interface NotifConsentPromptProps {
  /** Called when user accepts. Caller may then bootScheduler(). */
  onAccept?: () => void;
  /** Called when user declines (soft) or dismisses overlay. */
  onDecline?: () => void;
}

/**
 * Soft prompt modal. Bilingual, Mochi-voiced, autonomy-respecting.
 *
 * Usage (per research § B3): caller renders this AFTER L3 complete + check
 * shouldShowSoftPrompt() === true. NOT auto-rendered anywhere.
 */
export function NotifConsentPrompt({ onAccept, onDecline }: NotifConsentPromptProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mount animation — gentle fade-in 200ms after mount
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleAccept = async () => {
    appendPromptHistory('accepted');
    await setNotificationConsent(true);
    onAccept?.();
  };

  const handleDecline = () => {
    appendPromptHistory('declined');
    writeConsent('denied');
    onDecline?.();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notif-consent-title"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(48, 32, 16, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 200ms ease-out',
        padding: 24,
      }}
    >
      <div
        style={{
          background: '#fef8ed',
          borderRadius: 20,
          padding: '28px 24px',
          maxWidth: 360,
          width: '100%',
          boxShadow: '0 8px 24px rgba(60, 42, 28, 0.18)',
          border: '1px solid rgba(231, 164, 74, 0.35)',
        }}
      >
        <img
          src="/mascots/calico-anchor.webp"
          alt=""
          aria-hidden="true"
          width={96}
          height={96}
          style={{ display: 'block', margin: '0 auto 12px', borderRadius: 12 }}
        />
        <h2
          id="notif-consent-title"
          style={{
            margin: '0 0 8px',
            fontSize: 18,
            fontWeight: 700,
            textAlign: 'center',
            color: '#3c2a1c',
          }}
        >
          Mochi 想偶爾捎信給你
        </h2>
        <p
          style={{
            margin: '0 0 6px',
            fontSize: 14,
            textAlign: 'center',
            color: '#6b5641',
            lineHeight: 1.5,
          }}
        >
          奶奶睡前要翻書的時候,Mochi 可以提醒你一聲嗎?
        </p>
        <p
          style={{
            margin: '0 0 20px',
            fontSize: 13,
            textAlign: 'center',
            color: '#8a7257',
            fontStyle: 'italic',
            lineHeight: 1.5,
          }}
        >
          Mochi would like to message you sometimes — only when grandma opens the book.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            type="button"
            onClick={handleAccept}
            style={{
              padding: '12px 16px',
              borderRadius: 12,
              border: 'none',
              background: '#7d9a4f',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            好啊,可以 · Yes, sometimes
          </button>
          <button
            type="button"
            onClick={handleDecline}
            style={{
              padding: '10px 16px',
              borderRadius: 12,
              border: '1px solid rgba(60, 42, 28, 0.18)',
              background: 'transparent',
              color: '#6b5641',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            現在先不要 · Not now
          </button>
        </div>

        <p
          style={{
            margin: '12px 0 0',
            fontSize: 11,
            textAlign: 'center',
            color: '#a08e75',
            lineHeight: 1.4,
          }}
        >
          可以隨時在 Profile 關掉 · Toggle off anytime in Profile
        </p>
      </div>
    </div>
  );
}
