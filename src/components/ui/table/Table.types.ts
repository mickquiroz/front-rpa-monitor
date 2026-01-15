import type { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';

/**
 * Table component props
 */
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * TableHeader component props
 */
export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Additional CSS classes */
  className?: string;
  /** Sticky header */
  sticky?: boolean;
}

/**
 * TableBody component props
 */
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * TableRow component props
 */
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Additional CSS classes */
  className?: string;
  /** Hover effect */
  hoverable?: boolean;
}

/**
 * TableHead component props
 */
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * TableCell component props
 */
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Additional CSS classes */
  className?: string;
}
