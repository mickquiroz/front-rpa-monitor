import type { ReactNode } from 'react';

/**
 * Badge variants for different status types
 */
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

/**
 * Badge sizes
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge component props
 */
export interface BadgeProps {
  /** Content to display in the badge */
  children: ReactNode;
  /** Visual variant of the badge */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Show a dot indicator */
  dot?: boolean;
  /** Additional CSS classes */
  className?: string;
}
