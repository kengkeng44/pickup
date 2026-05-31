/**
 * v2.0.B.161.4: PostHog analytics stub per master matrix § E #5 +
 * docs/product/posthog-event-taxonomy-2026-06.md.
 *
 * Strategy: lazy-load posthog-js only when VITE_POSTHOG_KEY env var
 * is set. Until user signs up + adds key, this module is a no-op + zero
 * bundle cost (posthog-js never imports).
 *
 * Event spec source-of-truth:
 *   docs/product/posthog-event-taxonomy-2026-06.md
 *
 * 8 core event names (use these constants — typos waste tracker budget):
 */
export const EVENT = {
  APP_OPEN: 'app_open',
  LESSON_START: 'lesson_start',
  ANSWER_SUBMIT: 'answer_submit',
  LESSON_COMPLETE: 'lesson_complete',
  LESSON_REVIEW_OPEN: 'lesson_review_open',
  STREAK_UPDATE: 'streak_update',
  PAYWALL_VIEW: 'paywall_view',
  ERROR_CAUGHT: 'error_caught',
} as const;

type AnalyticsClient = {
  init: (key: string, cfg: object) => void;
  capture: (event: string, props?: Record<string, unknown>) => void;
  identify: (id: string, props?: Record<string, unknown>) => void;
  opt_out_capturing: () => void;
};

let client: AnalyticsClient | null = null;
let initialized = false;
let consentGranted = false;

const CONSENT_KEY = 'pickup.analytics-consent';

function readConsent(): 'granted' | 'denied' | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === 'granted' || v === 'denied') return v;
  } catch {}
  return null;
}

export function setConsent(granted: boolean): void {
  consentGranted = granted;
  try { localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied'); } catch {}
  if (!granted && client) {
    try { client.opt_out_capturing(); } catch {}
  }
}

export function getConsent(): 'granted' | 'denied' | null {
  return readConsent();
}

/**
 * Boot analytics. Call once on app startup AFTER consent decision.
 * Returns silently if no VITE_POSTHOG_KEY env (i.e. dev or pre-launch).
 */
export async function initAnalytics(): Promise<void> {
  if (initialized) return;
  const key = (import.meta as ImportMeta & { env?: { VITE_POSTHOG_KEY?: string; DEV?: boolean } }).env?.VITE_POSTHOG_KEY;
  if (!key) return;
  if (readConsent() === 'denied') return;
  consentGranted = readConsent() === 'granted';

  try {
    const mod = await import('posthog-js');
    client = (mod.default ?? mod) as unknown as AnalyticsClient;
    client.init(key, {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: false,
    });
    initialized = true;
  } catch (e) {
    // Silent fail — analytics is optional progressive enhancement
    if (typeof console !== 'undefined') console.warn('[analytics] init failed', e);
  }
}

export function track(event: string, props?: Record<string, unknown>): void {
  if (!client || !consentGranted) return;
  try { client.capture(event, props); } catch {}
}

export function identifyUser(deviceId: string, props?: Record<string, unknown>): void {
  if (!client || !consentGranted) return;
  try { client.identify(deviceId, props); } catch {}
}

/**
 * Lightweight device ID generator. Stored in localStorage so same install
 * = same anonymous user across sessions.
 */
export function getOrCreateDeviceId(): string {
  const KEY = 'pickup.device-id';
  try {
    const existing = localStorage.getItem(KEY);
    if (existing) return existing;
    const fresh = 'pkpd-' + Math.random().toString(36).slice(2, 12) + Date.now().toString(36).slice(-6);
    localStorage.setItem(KEY, fresh);
    return fresh;
  } catch {
    return 'pkpd-fallback-' + Date.now();
  }
}
