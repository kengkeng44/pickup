/**
 * SpeakZh — tap-to-hear Mandarin gloss component.
 *
 * Renders Chinese text with a subtle dotted-underline affordance.
 * Tapping calls speakZh(text) via WebSpeech zh-TW.
 *
 * Design rules (per task spec):
 *  - Dotted underline in muted token colour — uncluttered kid UI.
 *  - Optional tiny 🔊 cue kept minimal.
 *  - a11y: role="button", tabIndex=0, aria-label, Enter/Space trigger.
 *  - Tokens only; no hardcoded hex / magic px.
 *  - Active feedback: opacity dip via CSS transition (no animation,
 *    prefers-reduced-motion safe — it's a static style change).
 *  - Does NOT import muteSetting — user-initiated tap always plays.
 */
import { t } from '../../ui/theme/index';
import { speakZh } from '../../audio/tts';
import { toSimplified } from '../../data/zhHans';

interface SpeakZhProps {
  /** The Chinese text to display and speak. */
  text: string;
  /** Optional extra inline style for the wrapper span. */
  style?: React.CSSProperties;
}

const SpeakZh = ({ text, style }: SpeakZhProps) => {
  if (!text) return null;
  const shown = toSimplified(text); // v2.0.B.395 簡中模式自動轉簡 (非簡中原樣)

  const handleActivate = (e: React.MouseEvent | React.KeyboardEvent) => {
    if ('key' in e && e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    speakZh(text);
  };

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={`唸出 ${shown}`}
      onClick={handleActivate as React.MouseEventHandler}
      onKeyDown={handleActivate as React.KeyboardEventHandler}
      style={{
        display: 'inline',
        cursor: 'pointer',
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
        textDecorationColor: t.color.textMuted,
        textUnderlineOffset: '3px',
        // Active feedback: opacity dip via CSS variable-driven transition.
        // No animation — static style, prefers-reduced-motion safe.
        transition: `opacity var(--t-dur-fast, 100ms) ease`,
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        userSelect: 'none',
        ...style,
      }}
      onPointerDown={(e) => {
        // Immediate visual feedback on press (opacity dip)
        (e.currentTarget as HTMLSpanElement).style.opacity = '0.55';
      }}
      onPointerUp={(e) => {
        (e.currentTarget as HTMLSpanElement).style.opacity = '';
      }}
      onPointerLeave={(e) => {
        (e.currentTarget as HTMLSpanElement).style.opacity = '';
      }}
    >
      {shown}
      {/* Tiny 🔊 cue — aria-hidden so screen-readers use aria-label instead */}
      <span aria-hidden="true" style={{ fontSize: '0.7em', marginLeft: 2, opacity: 0.5 }}>🔊</span>
    </span>
  );
};

export default SpeakZh;
