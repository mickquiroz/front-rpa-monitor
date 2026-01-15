import { forwardRef, useId } from 'react';
import { cn } from '../../../lib/utils';
import type { InputProps } from './Input.types';

/**
 * Input - Form input component with optional icons and states
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      iconLeft: IconLeft,
      iconRight: IconRight,
      error = false,
      helperText,
      label,
      className,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = props.id || generatedId;

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {IconLeft && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <IconLeft size={16} aria-hidden="true" />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded bg-white border shadow-xs',
              'px-space-2 py-2 text-sm text-slate-900',
              'placeholder:text-slate-400',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed',
              'transition-all duration-fast',
              error
                ? 'border-error focus:ring-error'
                : 'border-slate-300',
              IconLeft && 'pl-10',
              IconRight && 'pr-10',
              className
            )}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {IconRight && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <IconRight size={16} aria-hidden="true" />
            </div>
          )}
        </div>
        {helperText && (
          <p
            id={`${inputId}-helper`}
            className={cn(
              'text-xs',
              error ? 'text-error-dark' : 'text-slate-500'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
