import type { ReactNode } from 'react';

/**
 * Card component props
 */
export interface CardProps {
  /** Content to render inside the card */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Card variant style */
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive';
  /** Custom padding override */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * CardHeader component props
 */
export interface CardHeaderProps {
  /** Content to render inside the card header */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show border below header */
  bordered?: boolean;
}

/**
 * CardTitle component props
 */
export interface CardTitleProps {
  /** Title text or content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * CardDescription component props
 */
export interface CardDescriptionProps {
  /** Description text or content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * CardContent component props
 */
export interface CardContentProps {
  /** Content to render inside the card body */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * CardFooter component props
 */
export interface CardFooterProps {
  /** Content to render inside the card footer */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show border above footer */
  bordered?: boolean;
}
