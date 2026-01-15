import { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import type { BadgeProps } from './Badge.types';

/**
 * Badge - Status indicator component with semantic color variants
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', size = 'md', dot = false, className }, ref) => {
    const variantStyles = {
      default: 'bg-slate-100 text-slate-700',
      success: 'bg-success-light text-success-dark',
      warning: 'bg-warning-light text-warning-dark',
      error: 'bg-error-light text-error-dark',
      info: 'bg-info-light text-info-dark',
      neutral: 'bg-slate-100 text-slate-700',
    };

    const sizeStyles = {
      sm: 'px-1.5 py-0.5 text-xs',
      md: 'px-2 py-0.5 text-xs',
      lg: 'px-2.5 py-1 text-sm',
    };

    const dotColor = {
      default: 'bg-slate-500',
      success: 'bg-success-dark',
      warning: 'bg-warning-dark',
      error: 'bg-error-dark',
      info: 'bg-info-dark',
      neutral: 'bg-slate-500',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-sm font-medium',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
      >
        {dot && (
          <span
            className={cn('w-1.5 h-1.5 rounded-full', dotColor[variant])}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
