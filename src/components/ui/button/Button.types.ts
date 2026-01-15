import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

/**
 * Button sizes
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component props
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content (optional if using only icons) */
  children?: ReactNode;
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Icon to display before the text */
  iconLeft?: LucideIcon;
  /** Icon to display after the text */
  iconRight?: LucideIcon;
  /** Loading state */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}
