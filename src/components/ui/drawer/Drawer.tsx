import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { DrawerProps } from './Drawer.types';

/**
 * Drawer - Slide-over panel component for detailed views
 *
 * Features:
 * - Slides in from right with smooth animation
 * - Click backdrop to close
 * - ESC key to close
 * - Focus trap when open
 * - Accessible with proper ARIA attributes
 */
export function Drawer({ isOpen, onClose, children, title, className }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Save current focus
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus drawer
      drawerRef.current?.focus();

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus
      previousActiveElement.current?.focus();

      // Restore body scroll
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusableElements = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          event.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-normal"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        tabIndex={-1}
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] lg:w-[600px]',
          'bg-white shadow-2xl',
          'flex flex-col',
          'transform transition-transform duration-normal ease-in-out',
          'focus:outline-none',
          className
        )}
        style={{
          animation: isOpen ? 'slideInFromRight 200ms ease-out' : undefined,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-space-4 py-space-3 border-b border-slate-200 bg-slate-50">
          {title && (
            <h2
              id="drawer-title"
              className="text-lg font-semibold text-slate-900"
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className={cn(
              'inline-flex items-center justify-center',
              'w-8 h-8 rounded',
              'text-slate-400 hover:text-slate-600 hover:bg-slate-100',
              'transition-colors duration-fast',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              !title && 'ml-auto'
            )}
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-space-4 py-space-4 scrollbar-thin">
          {children}
        </div>
      </div>

      <style>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

Drawer.displayName = 'Drawer';
