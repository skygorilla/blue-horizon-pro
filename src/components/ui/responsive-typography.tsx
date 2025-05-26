import { cn } from '@/lib/utils';

interface ResponsiveTypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  variant?: 
    | 'display-large' 
    | 'display-medium' 
    | 'title-large' 
    | 'title-medium' 
    | 'body-large' 
    | 'body-medium' 
    | 'caption';
  color?: string;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  responsive?: boolean;
}

/**
 * A responsive typography component that adjusts text size based on screen size
 */
export function ResponsiveText({
  children,
  className,
  as: Component = 'p',
  variant = 'body-medium',
  color,
  align,
  truncate = false,
  responsive = true,
}: ResponsiveTypographyProps) {
  // Base typography classes from our system
  const baseClasses = {
    'display-large': 'display-large', 
    'display-medium': 'display-medium',
    'title-large': 'title-large',
    'title-medium': 'title-medium',
    'body-large': 'body-large',
    'body-medium': 'body-medium',
    'caption': 'caption',
  };
  
  // Responsive adjustments for each variant
  const responsiveClasses = responsive ? {
    'display-large': 'sm:text-4xl text-3xl',
    'display-medium': 'sm:text-3xl text-2xl',
    'title-large': 'sm:text-2xl text-xl',
    'title-medium': 'sm:text-xl text-lg',
    'body-large': 'sm:text-base text-sm',
    'body-medium': 'sm:text-sm text-xs',
    'caption': 'text-xs',
  } : {};
  
  // Text alignment
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  // Text truncation
  const truncateClasses = truncate 
    ? 'truncate overflow-hidden overflow-ellipsis whitespace-nowrap' 
    : '';
  
  return (
    <Component
      className={cn(
        baseClasses[variant],
        responsive && responsiveClasses[variant],
        align && alignClasses[align],
        truncateClasses,
        color,
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * A component to ensure a max line count for text, useful for descriptions
 */
export function LineClamp({
  children,
  lines = 2,
  className,
  as: Component = 'p',
}: {
  children: React.ReactNode;
  lines?: number;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Component
      className={cn(
        `line-clamp-${lines} overflow-hidden`,
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Header component with responsive behavior
 */
export function ResponsiveHeader({
  children,
  className,
  level = 2,
  responsive = true,
}: {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  responsive?: boolean;
}) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  // Map heading levels to variants
  const variantMap: Record<number, ResponsiveTypographyProps['variant']> = {
    1: 'display-large',
    2: 'display-medium',
    3: 'title-large',
    4: 'title-medium',
    5: 'body-large',
    6: 'body-medium',
  };
  
  return (
    <ResponsiveText
      as={Component}
      // Cast the looked-up variant to the expected type
      variant={variantMap[level] as ResponsiveTypographyProps['variant']}
      responsive={responsive}
      className={className}
    >
      {children}
    </ResponsiveText>
  );
}