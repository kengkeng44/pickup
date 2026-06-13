/**
 * 拾光 (Pickup) — MochiGreeting card (v2.0.B.283).
 *
 * Home card shown at the top of MapPage. Displays:
 *   - Mochi mascot image
 *   - Current greeting line (zh primary, en muted sub)
 *   - Stage name (zh · en)
 *   - Progress bar toward next stage (or desc text at max stage "family")
 *
 * All styling via design tokens (t.* / CSS token classes) + existing primitives.
 * No hardcoded hex or magic px.
 * Subscribes to bond-change events so it refreshes after lesson completion.
 */
import { useEffect, useState } from 'react';
import Card from '../../ui/components/Card';
import MascotSlot from '../../ui/components/MascotSlot';
import ProgressBar from '../../ui/components/ProgressBar';
import {
  getBondPoints,
  getStage,
  nextStage,
  getGreeting,
  subscribeBondChange,
} from '../../data/bond';
import type { AddLessonBondResult } from '../../data/bond';

interface MochiGreetingProps {
  /** Pass a leveledUpTo value (from addLessonBond) to trigger stage-up toast. */
  onStageUp?: (result: AddLessonBondResult) => void;
}

export default function MochiGreeting({ onStageUp: _onStageUp }: MochiGreetingProps = {}) {
  // Re-read bond state whenever it changes.
  const [points, setPoints] = useState(() => getBondPoints());

  useEffect(() => {
    const unsub = subscribeBondChange(() => setPoints(getBondPoints()));
    return unsub;
  }, []);

  const stage = getStage(points);
  const next = nextStage(points);
  const greeting = getGreeting();

  // Progress toward next stage: points within current stage window.
  const stageFloor = stage.threshold;
  const nextThreshold = next?.threshold ?? stageFloor;
  const progressValue = next ? points - stageFloor : 0;
  const progressMax = next ? nextThreshold - stageFloor : 1;

  return (
    <Card
      variant="flat"
      topStripe
      style={{
        margin: '0 14px 10px',
        padding: '14px 14px 12px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
      }}
    >
      {/* Mascot avatar */}
      <MascotSlot char="mochi" size={56} floor aria-hidden="true" />

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Stage chip */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 6,
        }}>
          <span style={{
            fontSize: 'var(--t-text-micro)',
            fontWeight: 800,
            color: 'var(--t-brand)',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            {stage.name_zh} · {stage.name_en}
          </span>
        </div>

        {/* Greeting lines */}
        <div style={{
          fontSize: 'var(--t-text-body)',
          fontWeight: 700,
          color: 'var(--t-text)',
          lineHeight: 1.4,
          marginBottom: 2,
        }}>
          {greeting.zh}
        </div>
        <div style={{
          fontSize: 'var(--t-text-micro)',
          fontWeight: 600,
          color: 'var(--t-text-muted)',
          lineHeight: 1.4,
          fontStyle: 'italic',
          marginBottom: 10,
        }}>
          {greeting.en}
        </div>

        {/* Progress toward next stage, or desc at max */}
        {next ? (
          <div>
            <ProgressBar
              value={progressValue}
              max={progressMax}
              minPercent={2}
              aria-label={`Bond progress toward ${next.name_en}: ${points - stageFloor} / ${progressMax}`}
            />
            <div style={{
              fontSize: 'var(--t-text-micro)',
              color: 'var(--t-text-muted)',
              fontWeight: 600,
              marginTop: 4,
            }}>
              {points - stageFloor} / {progressMax} → {next.name_zh}
            </div>
          </div>
        ) : (
          <div style={{
            fontSize: 'var(--t-text-micro)',
            color: 'var(--t-brand)',
            fontWeight: 700,
            fontStyle: 'italic',
          }}>
            {stage.desc_zh}
          </div>
        )}
      </div>
    </Card>
  );
}
