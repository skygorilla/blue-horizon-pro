declare module 'sonner' {
  export const toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    warning: (message: string) => void;
  };
  
  export interface ToasterProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    expand?: boolean;
    visibleToasts?: number;
    closeButton?: boolean;
    richColors?: boolean;
    duration?: number;
  }
  
  export function Toaster(props?: ToasterProps): JSX.Element;
}