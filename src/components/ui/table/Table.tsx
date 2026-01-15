import { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
} from './Table.types';

/**
 * Table - Base table component
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => {
    return (
      <table
        ref={ref}
        className={cn('w-full text-left border-collapse', className)}
        {...props}
      />
    );
  }
);

Table.displayName = 'Table';

/**
 * TableHeader - Table header section
 */
export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, sticky = false, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          'bg-slate-50 border-b border-slate-200',
          sticky && 'sticky top-0 z-10',
          className
        )}
        {...props}
      />
    );
  }
);

TableHeader.displayName = 'TableHeader';

/**
 * TableBody - Table body section
 */
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn('divide-y divide-slate-100', className)}
        {...props}
      />
    );
  }
);

TableBody.displayName = 'TableBody';

/**
 * TableRow - Table row
 */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hoverable = true, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          hoverable && 'hover:bg-slate-50/50 transition-colors',
          className
        )}
        {...props}
      />
    );
  }
);

TableRow.displayName = 'TableRow';

/**
 * TableHead - Table header cell
 */
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          'py-3 px-space-3',
          'text-xs font-semibold text-slate-500 uppercase tracking-wider',
          className
        )}
        {...props}
      />
    );
  }
);

TableHead.displayName = 'TableHead';

/**
 * TableCell - Table data cell
 */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn('py-3 px-space-3 text-sm', className)}
        {...props}
      />
    );
  }
);

TableCell.displayName = 'TableCell';
