import React from 'react';
import { cn } from '@/lib/utils';

type DataLabelProps = {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
};

export function DataLabel({
  label,
  value,
  icon,
  className,
  valueClassName,
  labelClassName,
  orientation = 'vertical',
  size = 'md',
}: DataLabelProps) {
  const sizeClasses = {
    sm: {
      label: 'text-xs',
      value: 'text-sm font-medium',
      container: 'gap-0.5',
    },
    md: {
      label: 'text-sm',
      value: 'text-base font-medium',
      container: 'gap-1',
    },
    lg: {
      label: 'text-base',
      value: 'text-lg font-medium',
      container: 'gap-1.5',
    },
  };

  return (
    <div 
      className={cn(
        orientation === 'vertical' ? 'flex flex-col' : 'flex items-center', 
        sizeClasses[size].container,
        className
      )}
    >
      <div className={cn(
        'text-muted-foreground flex items-center gap-1',
        sizeClasses[size].label,
        labelClassName
      )}>
        {icon && <span className="text-muted-foreground">{icon}</span>}
        {label}
      </div>
      <div className={cn(
        sizeClasses[size].value,
        orientation === 'horizontal' && 'ml-2',
        valueClassName
      )}>
        {value}
      </div>
    </div>
  );
}

type DataCardProps = {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    label?: string;
  };
  className?: string;
  valueClassName?: string;
  onClick?: () => void;
};

export function DataCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
  valueClassName,
  onClick,
}: DataCardProps) {
  return (
    <div 
      className={cn(
        'p-5 bg-white rounded-lg border border-border shadow-sm',
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      
      <div className={cn(
        'text-2xl font-semibold tracking-tight',
        valueClassName
      )}>
        {value}
      </div>
      
      {(subtitle || trend) && (
        <div className="mt-2 flex items-center justify-between">
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          
          {trend && (
            <div className={cn(
              'flex items-center text-xs font-medium',
              trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
            )}>
              <span className="mr-1">
                {trend.direction === 'up' ? '↑' : '↓'}
              </span>
              {trend.value}%
              {trend.label && <span className="ml-1 text-muted-foreground">{trend.label}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type DataTableProps = {
  children: React.ReactNode;
  className?: string;
};

export function DataTable({ children, className }: DataTableProps) {
  return (
    <div className={cn('overflow-auto rounded-md border', className)}>
      <table className="w-full caption-bottom text-sm">
        {children}
      </table>
    </div>
  );
}

export const DataTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('bg-muted/50', className)} {...props} />
));
DataTableHeader.displayName = "DataTableHeader";

export const DataTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr 
    ref={ref} 
    className={cn(
      'border-b transition-colors hover:bg-muted/20 data-[state=selected]:bg-muted', 
      className
    )} 
    {...props} 
  />
));
DataTableRow.displayName = "DataTableRow";

export const DataTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
DataTableHead.displayName = "DataTableHead";

export const DataTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('', className)}
    {...props}
  />
));
DataTableBody.displayName = "DataTableBody";

export const DataTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
DataTableCell.displayName = "DataTableCell";

export const DataTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
DataTableCaption.displayName = "DataTableCaption";