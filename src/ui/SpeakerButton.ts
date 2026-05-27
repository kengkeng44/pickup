/**
 * SpeakerButton — v1.9.25 (audit #5).
 *
 * Single SVG-based speaker button used wherever the UI needs a
 * "listen to this audio" affordance. Before v1.9.25 the codebase had
 * 5 separate implementations (different sizes, mixed SVG / emoji,
 * inconsistent affordance). This component is the single source.
 *
 * Sizes:
 *   - sm:  22px icon (in-text, story narration, key sentences)
 *   - md:  44px circle button (lesson sentence card, sticky)
 *   - lg:  72px circle button (tap-tiles big listener)
 *
 * Variants:
 *   - ghost:    transparent bg, just the icon (default for sm)
 *   - primary:  blue filled circle (default for md/lg) — pulse animation
 *
 * Standard Material-style speaker SVG path used across all sizes.
 */

import { applyStyle, attachPressFeedback } from './domUtil';
import { speak } from '../audio/tts';

export type SpeakerSize = 'sm' | 'md' | 'lg';
export type SpeakerVariant = 'ghost' | 'primary';

export interface SpeakerButtonOptions {
  /** Text spoken when pressed. */
  text: string;
  /** Visual size (defaults to 'sm'). */
  size?: SpeakerSize;
  /** Visual style (defaults to 'ghost' for sm, 'primary' for md/lg). */
  variant?: SpeakerVariant;
  /** Accessible label. */
  ariaLabel?: string;
  /** If true, attach the subtle "tap me" pulse animation. */
  pulse?: boolean;
  /** Optional click handler — defaults to speak(text). */
  onClick?: () => void;
}

// v1.9.41 Duo-flat icon collage replaces the prior Material SVG path.
// The WebP already has its own teal-blue body + orange sound waves +
// brown depth shape baked in, so we render it on a transparent button
// background (variant just changes outer sizing now, not color tint).
const SPEAKER_SRC = '/mascots/icon-speaker.webp';

const SIZE_PX: Record<SpeakerSize, { box: number; icon: number }> = {
  sm: { box: 28, icon: 26 },
  md: { box: 56, icon: 52 },
  lg: { box: 96, icon: 88 },
};

export function createSpeakerButton(opts: SpeakerButtonOptions): HTMLButtonElement {
  const size: SpeakerSize = opts.size ?? 'sm';
  const variant: SpeakerVariant = opts.variant ?? (size === 'sm' ? 'ghost' : 'primary');
  void variant; // retained in API; rendering no longer branches on it.
  const { box, icon } = SIZE_PX[size];

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', opts.ariaLabel ?? 'Play audio');
  btn.innerHTML = `<img src="${SPEAKER_SRC}" alt="" aria-hidden="true" style="width:${icon}px;height:${icon}px;display:block;pointer-events:none;" />`;

  applyStyle(btn, {
    flex: '0 0 auto',
    width: `${box}px`,
    height: `${box}px`,
    background: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    transition: 'transform 80ms ease',
  });

  if (opts.pulse) {
    btn.classList.add('pickup-speaker-pulse');
  }

  attachPressFeedback(btn, 1);
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (opts.onClick) opts.onClick();
    else speak(opts.text);
  });

  return btn;
}
