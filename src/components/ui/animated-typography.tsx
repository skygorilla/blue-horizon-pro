import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, Variants } from 'framer-motion';

/**
 * Animation variants for text animations
 */
const textAnimationVariants: Record<string, Variants> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  reveal: {
    initial: { clipPath: 'inset(0 100% 0 0)' },
    animate: { clipPath: 'inset(0 0% 0 0)' },
    exit: { clipPath: 'inset(0 0 0 100%)' },
  },
};

type AnimatedTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  animation?: keyof typeof textAnimationVariants;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  stagger?: boolean;
  once?: boolean;
  visible?: boolean;
  onAnimationComplete?: () => void;
  textClassName?: string;
};

/**
 * Component to animate text with a variety of animation types
 */
export function AnimatedText({
  children,
  className,
  as: Component = 'div',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.05,
  stagger = false,
  once = true,
  visible = true,
  onAnimationComplete,
  textClassName,
}: AnimatedTextProps) {
  const [isClient, setIsClient] = useState(false);

  // Only animate on client-side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Server-side or during hydration, render without animations
    return (
      <Component className={className}>
        <div className={textClassName}>{children}</div>
      </Component>
    );
  }

  const variants = textAnimationVariants[animation] || textAnimationVariants.fadeIn;

  if (stagger) {
    if (typeof children !== 'string') {
      console.warn('AnimatedText with stagger can only be used with string children');
      return <Component className={className}>{children}</Component>;
    }

    // Split the text into words or characters for staggered animations
    const words = children.split(' ');

    return (
      <Component className={cn('flex flex-wrap', className)}>
        <AnimatePresence>
          {visible &&
            words.map((word, i) => (
              <div key={`${word}-${i}`} className="mr-1 mb-1 overflow-hidden">
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ 
                    duration, 
                    delay: delay + i * staggerChildren,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  onAnimationComplete={i === words.length - 1 ? onAnimationComplete : undefined}
                  className={textClassName}
                >
                  {word}
                </motion.div>
              </div>
            ))}
        </AnimatePresence>
      </Component>
    );
  }

  return (
    <Component className={className}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ 
              duration, 
              delay,
              ease: [0.22, 1, 0.36, 1]
            }}
            onAnimationComplete={onAnimationComplete}
            className={textClassName}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Component>
  );
}

/**
 * Component for animated typography that combines animation with typography classes
 */
export function AnimatedTypography({
  children,
  className,
  variant,
  animation = 'fadeIn',
  delay = 0,
  stagger = false,
  as: Component = 'div',
  align,
}: AnimatedTextProps & {
  variant?: 
    | 'display-large' 
    | 'display-medium' 
    | 'title-large' 
    | 'title-medium' 
    | 'body-large' 
    | 'body-medium' 
    | 'caption';
  align?: 'left' | 'center' | 'right';
}) {
  // Map typography variants to appropriate classes
  const variantClasses = {
    'display-large': 'display-large', 
    'display-medium': 'display-medium',
    'title-large': 'title-large',
    'title-medium': 'title-medium',
    'body-large': 'body-large',
    'body-medium': 'body-medium',
    'caption': 'caption',
  };

  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <AnimatedText
      as={Component}
      className={className}
      animation={animation}
      delay={delay}
      stagger={stagger}
      textClassName={cn(
        variant && variantClasses[variant],
        align && alignClasses[align]
      )}
    >
      {children}
    </AnimatedText>
  );
}

/**
 * Component for animating text character by character (typewriter effect)
 */
export function TypewriterText({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    setDisplayedText('');
    setIsComplete(false);
    
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, speed);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete, isClient]);

  if (!isClient) {
    // Server-side or during hydration, render without animations
    return <div className={className}>{text}</div>;
  }

  return (
    <div className={className}>
      {displayedText}
      {!isComplete && cursor && (
        <span className="inline-block w-[2px] h-[1em] bg-current animate-pulse ml-[1px]" />
      )}
    </div>
  );
}