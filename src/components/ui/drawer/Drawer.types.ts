import type { ReactNode } from 'react';

export interface DrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Drawer content */
  children: ReactNode;
  /** Drawer title */
  title?: string;
  /** Additional className for the drawer container */
  className?: string;
}
