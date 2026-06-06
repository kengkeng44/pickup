/**
 * v2.0.B.234 招 3 — shared Mochi avatar with the player's chosen outfit.
 *
 * Reads the active outfit from localStorage on render. UI = base calico
 * anchor image + emoji badge overlay (bottom-right) representing the
 * outfit (kimono → 👘 etc). Real outfit art will replace the emoji badge
 * once user-generated WebPs land in /mascots/outfits/.
 *
 * Used by:
 *  - MapPage (small Mochi next to the grandma+shiba anchor)
 *  - ChapterIntroPage (small Mochi in the trio composition)
 *  - LessonPage CompletePanel (celebrate w/ Mochi in her outfit)
 *
 * Defaults: if outfit is 'default' (or unset), the badge is empty and only
 * the base cat shows — visually identical to legacy rendering. Zero risk
 * for new users.
 */
import { readOutfit, getOutfitById } from '../../data/mascotOutfits';

interface Props {
  /** Pixel size of the cat image (square). Badge auto-scales to 0.36 × size. */
  size?: number;
  /** Optional override — if omitted, reads from localStorage. */
  outfitId?: string;
  /** Optional aria label override. Defaults to `Mochi`. */
  ariaLabel?: string;
  /** Optional inline style passthrough on the wrapping span. */
  style?: React.CSSProperties;
  /** Optional className passthrough. */
  className?: string;
}

export default function MochiOutfitAvatar({
  size = 64,
  outfitId,
  ariaLabel = 'Mochi',
  style,
  className,
}: Props) {
  const id = outfitId ?? readOutfit();
  const outfit = getOutfitById(id);
  const badge = outfit?.emojiBadge ?? '';
  const badgeSize = Math.max(16, Math.round(size * 0.36));
  return (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: size, height: size,
        lineHeight: 0,
        ...(style ?? {}),
      }}
    >
      <img
        src="/mascots/calico-anchor.webp"
        alt={ariaLabel}
        width={size} height={size}
        style={{ display: 'block' }}
      />
      {badge && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: -Math.round(size * 0.06),
            right: -Math.round(size * 0.06),
            fontSize: badgeSize,
            lineHeight: 1,
            textShadow: '0 1px 2px rgba(255,255,255,0.9)',
          }}
        >
          {badge}
        </span>
      )}
    </span>
  );
}
