/**
 * MapNode — single lesson node button on the map.
 *
 * v2.0.B.275: Extracted from MapPage inline render. Wrapped in React.memo so
 * scroll-triggered parent re-renders (260 nodes) only commit the ones whose
 * props actually changed (typically just the pressed node + previous current
 * node when currentNodeIdx flips). Default shallow compare works because all
 * props are primitives or stable refs (callbacks via useCallback in parent).
 *
 * Architecture note: keeping the inline style object inside the memoized
 * component is fine — memo compares INCOMING props, not internal style
 * literals. As long as primitive props are equal, React skips the render.
 */
import { memo, type Ref, type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent } from 'react';

interface MapNodeProps {
  lessonId: string;
  chapter: number;
  ariaLabel: string;
  leftPx: number;
  top: number;
  size: number;
  height: number;
  done: boolean;
  /** v2.0.B.286: started (has saved resume idx) but not yet completed. */
  inProgress?: boolean;
  unlocked: boolean;
  isCurrent: boolean;
  isPressed: boolean;
  baseColor: string;
  iconSrc: string;
  iconFilter: string;
  iconOpacity: number;
  restShadow: string;
  pressShadow: string;
  onTap: (chapter: number, lessonId: string, rect: DOMRect) => void;
  /** v2.0.B.492: 點未解鎖節點 → 彈「尚未解鎖」(節點不再 disabled, 改路由到這)。 */
  onLockedTap?: () => void;
  onPressDown: (lessonId: string) => void;
  onPressEnd: () => void;
  innerRef?: Ref<HTMLButtonElement>;
}

function MapNodeImpl({
  lessonId, chapter, ariaLabel, leftPx, top, size, height,
  done: _done, inProgress, unlocked, isCurrent, isPressed,
  baseColor, iconSrc, iconFilter, iconOpacity,
  restShadow, pressShadow,
  onTap, onLockedTap, onPressDown, onPressEnd, innerRef,
}: MapNodeProps) {
  const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (unlocked) onTap(chapter, lessonId, e.currentTarget.getBoundingClientRect());
    else onLockedTap?.();
  };
  const handleDown = (_e: ReactPointerEvent<HTMLButtonElement>) => { if (unlocked) onPressDown(lessonId); };
  return (
    <button
      ref={innerRef}
      data-lesson-id={lessonId}
      className={isCurrent ? 'pickup-map-node-current' : undefined}
      type="button"
      aria-disabled={!unlocked}
      aria-label={ariaLabel}
      onClick={handleClick}
      onPointerDown={handleDown}
      onPointerUp={onPressEnd}
      onPointerLeave={onPressEnd}
      onPointerCancel={onPressEnd}
      style={{
        position: 'absolute',
        left: leftPx, top,
        width: size, height,
        borderRadius: '50% / 60%',
        border: 'none',
        background: baseColor,
        boxShadow: isPressed ? pressShadow : restShadow,
        transform: isPressed ? 'translateY(8px)' : 'none',
        cursor: 'pointer', // locked 也可點 (彈「尚未解鎖」)
        opacity: unlocked ? 1 : 0.7,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 0, fontFamily: 'inherit',
        touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
        transition: 'transform 80ms ease, box-shadow 80ms ease',
        zIndex: 2,
        /* v2.0.B.293 REVERT B.291: scroll-snap-align 砍, 在 260 dense target 上 = 閃動源 */
      }}
    >
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        width={36} height={36}
        style={{ display: 'block', filter: iconFilter, opacity: iconOpacity }}
      />
      {/* v2.0.B.286: 進行中徽章 — 已開始未完成 (distinct from done star / locked grey).
          Flat amber dot, zero blur. Hidden once done. */}
      {inProgress && unlocked && !_done && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', top: 4, right: 6,
            width: 14, height: 14, borderRadius: '50%',
            background: 'var(--t-brand)',
            border: '2px solid var(--t-surface)',
          }}
        />
      )}
    </button>
  );
}

export const MapNode = memo(MapNodeImpl);
