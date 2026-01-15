import { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from './Card.types';

/**
 * Card - Base container component with subtle elevation
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = 'default', padding = 'md' }, ref) => {
    const variantStyles = {
      default: 'bg-white border border-slate-200 shadow-xs',
      elevated: 'bg-white border border-slate-200 shadow-sm',
      outlined: 'bg-white border border-slate-300',
      interactive:
        'bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-normal cursor-pointer',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-space-2',
      md: 'p-space-3',
      lg: 'p-space-4',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-md',
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader - Header section with optional border
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, bordered = true }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'p-space-3',
          bordered && 'border-b border-slate-100',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle - Title text with proper typography
 */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-lg font-bold text-slate-800', className)}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription - Subtitle or description text
 */
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-slate-500 mt-1', className)}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

/**
 * CardContent - Main content area
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn('p-space-3', className)}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

/**
 * CardFooter - Footer section with optional border
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, bordered = true }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'p-space-3',
          bordered && 'border-t border-slate-100',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
