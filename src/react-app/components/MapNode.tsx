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
import { memo, type Ref, type PointerEvent as ReactPointerEvent } from 'react';

interface MapNodeProps {
  lessonId: string;
  chapter: number;
  ariaLabel: string;
  leftPx: number;
  top: number;
  size: number;
  height: number;
  done: boolean;
  unlocked: boolean;
  isCurrent: boolean;
  isPressed: boolean;
  baseColor: string;
  iconSrc: string;
  iconFilter: string;
  iconOpacity: number;
  restShadow: string;
  pressShadow: string;
  onTap: (chapter: number, lessonId: string) => void;
  onPressDown: (lessonId: string) => void;
  onPressEnd: () => void;
  innerRef?: Ref<HTMLButtonElement>;
}

function MapNodeImpl({
  lessonId, chapter, ariaLabel, leftPx, top, size, height,
  done: _done, unlocked, isCurrent, isPressed,
  baseColor, iconSrc, iconFilter, iconOpacity,
  restShadow, pressShadow,
  onTap, onPressDown, onPressEnd, innerRef,
}: MapNodeProps) {
  const handleClick = () => { if (unlocked) onTap(chapter, lessonId); };
  const handleDown = (_e: ReactPointerEvent<HTMLButtonElement>) => { if (unlocked) onPressDown(lessonId); };
  return (
    <button
      ref={innerRef}
      className={isCurrent ? 'pickup-map-node-current' : undefined}
      type="button"
      disabled={!unlocked}
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
        cursor: unlocked ? 'pointer' : 'not-allowed',
        opacity: unlocked ? 1 : 0.7,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 0, fontFamily: 'inherit',
        touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
        transition: 'transform 80ms ease, box-shadow 80ms ease',
        zIndex: 2,
        // v2.0.B.291: scroll-snap target — 配 html `scroll-snap-type: y proximity`
        // 用戶滑動 + 停下時若離某 node 近, browser 軟 snap 該 node 到 viewport 中央
        scrollSnapAlign: 'center',
      }}
    >
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        width={36} height={36}
        style={{ display: 'block', filter: iconFilter, opacity: iconOpacity }}
      />
    </button>
  );
}

export const MapNode = memo(MapNodeImpl);
