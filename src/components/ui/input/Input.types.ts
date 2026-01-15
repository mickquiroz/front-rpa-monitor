import type { InputHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * Input component props
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Icon to display on the left side */
  iconLeft?: LucideIcon;
  /** Icon to display on the right side */
  iconRight?: LucideIcon;
  /** Error state */
  error?: boolean;
  /** Helper text or error message */
  helperText?: ReactNode;
  /** Label for the input */
  label?: string;
  /** Additional CSS classes */
  className?: string;
  /** Full width input */
  fullWidth?: boolean;
}
