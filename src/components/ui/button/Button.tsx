import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { ButtonProps } from './Button.types';

/**
 * Button - Interactive button component with multiple variants and states
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      iconLeft: IconLeft,
      iconRight: IconRight,
      loading = false,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        'bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-500',
      secondary:
        'bg-white text-slate-700 border border-slate-300 shadow-xs hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 focus:ring-primary-500',
      ghost:
        'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 focus:ring-slate-500',
      destructive:
        'bg-error text-white shadow-sm hover:bg-error-dark active:bg-red-700 focus:ring-error',
    };

    const sizeStyles = {
      sm: 'px-space-2 py-1.5 text-xs',
      md: 'px-space-2 py-2 text-sm',
      lg: 'px-space-3 py-2.5 text-base',
    };

    const iconSizeMap = {
      sm: 14,
      md: 16,
      lg: 18,
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded font-medium',
          'transition-all duration-normal',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <Loader2
            size={iconSizeMap[size]}
            className="animate-spin"
            aria-hidden="true"
          />
        ) : (
          IconLeft && <IconLeft size={iconSizeMap[size]} aria-hidden="true" />
        )}
        {children}
        {!loading && IconRight && (
          <IconRight size={iconSizeMap[size]} aria-hidden="true" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
