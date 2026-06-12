/**
 * 拾光 (Pickup) — Card primitive (design-system v1, v2.0.B.280).
 *
 * Surface card with optional amber inset top-stripe.
 * Two depth variants:
 *   - flat   → border only, no offset shadow (info banners, stat tiles)
 *   - raised  → solid 4px bottom offset (interactive cards, lesson tiles)
 *
 * All colours via CSS token classes (.t-card, .t-card--*).
 * Only dynamic prop is className passthrough.
 *
 *   <Card>content</Card>
 *   <Card variant="raised" topStripe>chapter card</Card>
 */
import type { HTMLAttributes, ReactNode } from 'react';

type Variant = 'flat' | 'raised';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  /** Show amber inset top-stripe highlight (Duolingo flat highlight band). */
  topStripe?: boolean;
  children: ReactNode;
}

export default function Card({
  variant = 'flat',
  topStripe = false,
  className = '',
  children,
  ...rest
}: CardProps) {
  const cls = [
    't-card',
    `t-card--${variant}`,
    topStripe && 't-card--top-stripe',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}
