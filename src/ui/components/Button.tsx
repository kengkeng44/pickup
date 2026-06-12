/**
 * 拾光 (Pickup) — Button primitive (v2.0.B.279, design-system foundation).
 *
 * First component on the new token system. Class-based styling (see
 * .t-btn in src/ui/theme/tokens.css) — no inline magic numbers — so a
 * single edit reskins every Button app-wide, and dark theme is automatic.
 *
 *   <Button variant="primary" size="lg" full>開始</Button>
 *   <Button variant="ghost" size="md" iconOnly aria-label="Close">✕</Button>
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** stretch to container width */
  full?: boolean;
  /** square icon button (1:1) */
  iconOnly?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  iconOnly = false,
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    't-btn',
    `t-btn--${variant}`,
    `t-btn--${size}`,
    full && 't-btn--full',
    iconOnly && 't-btn--icon',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
