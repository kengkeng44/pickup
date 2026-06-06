/**
 * v2.0.B.235 — Share card SVG renderer for the "📤 分享金句" feature.
 *
 * Generates a 1200×630 SVG (matches OG dimensions in tools/og-image.cjs)
 * given a KeySentence. Idempotent: same input ⇒ identical output bytes.
 *
 * SVG is the lingua franca — the share modal can:
 *   1. Render the SVG inline as a <img src="data:image/svg+xml...">
 *   2. Convert to PNG via <canvas> for save-to-photos.
 *
 * NO npm deps. Pure string template.
 *
 * USED BY
 *   - src/react-app/components/ShareModal.tsx
 *
 * MIRRORS brand tokens from tools/og-image.cjs.
 */

import type { KeySentence } from './keySentences';

export const SHARE_CARD_W = 1200;
export const SHARE_CARD_H = 630;

// Brand tokens — mirror of tools/og-image.cjs.
const BG = '#fef8ed';
const TEXT_DARK = '#3a2a18';
const ACCENT = '#e7a44a';
const TERRACOTTA = '#c84a3a';
const OLIVE = '#7d9a4f';
const BROWN_SOFT = '#8b6f4a';

const SITE_URL = 'pickupwords.pages.dev';

/** XML-escape one string for safe SVG text node embedding. */
function xe(s: string): string {
  return String(s).replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

/**
 * Render a 1200×630 share card SVG for a given key sentence.
 * Pure function — same KeySentence always yields the same bytes.
 */
export function genShareCardSVG(sentence: KeySentence): string {
  const W = SHARE_CARD_W;
  const H = SHARE_CARD_H;

  const en = xe(sentence.en);
  const zh = xe(sentence.zh);
  const source = xe(sentence.source);

  // Soft warm accent dots (vignette).
  const dots = [
    { cx: 60,    cy: 60,    r: 14, fill: ACCENT,     opacity: 0.20 },
    { cx: W-60,  cy: 60,    r: 20, fill: TERRACOTTA, opacity: 0.14 },
    { cx: 60,    cy: H-60,  r: 18, fill: OLIVE,      opacity: 0.20 },
    { cx: W-60,  cy: H-60,  r: 24, fill: ACCENT,     opacity: 0.24 },
  ];

  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`);
  lines.push(`  <!-- Pickup 拾光 Share Card -->`);

  // Background.
  lines.push(`  <rect width="${W}" height="${H}" fill="${BG}"/>`);

  // Top accent stripe.
  lines.push(`  <rect x="0" y="0" width="${W}" height="6" fill="${ACCENT}" opacity="0.55"/>`);

  // Decorative dots.
  for (const d of dots) {
    lines.push(`  <circle cx="${d.cx}" cy="${d.cy}" r="${d.r}" fill="${d.fill}" opacity="${d.opacity}"/>`);
  }

  // Top-left brand wordmark.
  lines.push(`  <text x="80" y="92" font-family="'Noto Sans TC','PingFang TC','Microsoft JhengHei',sans-serif" font-size="38" font-weight="800" fill="${TEXT_DARK}">拾光 · Pickup</text>`);

  // Top-right "金句" badge.
  const badgeW = 160, badgeH = 56;
  const badgeX = W - 80 - badgeW, badgeY = 56;
  lines.push(`  <rect x="${badgeX}" y="${badgeY}" width="${badgeW}" height="${badgeH}" rx="14" fill="${ACCENT}"/>`);
  lines.push(`  <text x="${badgeX + badgeW / 2}" y="${badgeY + badgeH / 2 + 11}" font-family="'Noto Sans TC',sans-serif" font-size="30" font-weight="800" fill="#fff" text-anchor="middle">金句 · Quote</text>`);

  // Mochi emoji as avatar placeholder (svg-safe — emoji fallback if no font).
  lines.push(`  <text x="${W/2}" y="220" font-size="120" text-anchor="middle" dominant-baseline="middle">🐈</text>`);

  // Soft underline beneath the avatar to anchor it.
  lines.push(`  <rect x="${W/2 - 60}" y="262" width="120" height="3" rx="2" fill="${ACCENT}" opacity="0.45"/>`);

  // English sentence — large serif italic, terracotta.
  lines.push(`  <text x="${W/2}" y="340" font-family="'Georgia',serif" font-size="56" font-weight="600" font-style="italic" fill="${TERRACOTTA}" text-anchor="middle">${en}</text>`);

  // Chinese translation — clean sans, dark warm.
  lines.push(`  <text x="${W/2}" y="410" font-family="'Noto Sans TC','PingFang TC','Microsoft JhengHei',sans-serif" font-size="44" font-weight="700" fill="${TEXT_DARK}" text-anchor="middle">${zh}</text>`);

  // Source attribution — small brown.
  lines.push(`  <text x="${W/2}" y="468" font-family="'Noto Sans TC',sans-serif" font-size="24" font-weight="500" fill="${BROWN_SOFT}" text-anchor="middle" opacity="0.85">— ${source}</text>`);

  // Bottom-left logo + tagline.
  lines.push(`  <text x="80" y="${H - 60}" font-family="'Noto Sans TC',sans-serif" font-size="24" font-weight="600" fill="${TEXT_DARK}" opacity="0.85">奶奶的睡前英文小故事</text>`);

  // Bottom-right URL.
  lines.push(`  <text x="${W - 80}" y="${H - 60}" font-family="'Georgia',serif" font-size="26" font-weight="700" fill="${OLIVE}" text-anchor="end">${SITE_URL}</text>`);

  lines.push(`</svg>`);
  return lines.join('\n') + '\n';
}

/**
 * Convert SVG text to a data URI (base64) suitable for <img src="...">.
 * Browser-safe; uses btoa with a utf-8 → binary string round-trip.
 */
export function svgToDataUri(svg: string): string {
  // utf-8 → percent-encoded → binary string for btoa
  // (btoa choke on non-latin1, so we route through encodeURIComponent.)
  const utf8 = unescape(encodeURIComponent(svg));
  return `data:image/svg+xml;base64,${btoa(utf8)}`;
}
