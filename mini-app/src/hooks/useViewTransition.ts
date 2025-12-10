import { useCallback, useState, useEffect } from 'react';

export type NavigationDirection = 'forward' | 'backward';

export const useViewTransition = () => {
  const supportsViewTransition = 'startViewTransition' in document;
  const [direction, setDirection] = useState<NavigationDirection>('forward');

  const startTransition = useCallback((callback: () => void, navDirection: NavigationDirection = 'forward') => {
    // Set direction class on document for CSS animations
    document.documentElement.classList.remove('slide-forward', 'slide-backward');
    document.documentElement.classList.add(`slide-${navDirection}`);
    setDirection(navDirection);

    if (supportsViewTransition) {
      const transition = document.startViewTransition(() => {
        callback();
      });

      // Clean up direction class after animation finishes
      transition.finished.then(() => {
        setTimeout(() => {
          document.documentElement.classList.remove(`slide-${navDirection}`);
        }, 50);
      });
    } else {
      // Fallback for browsers without View Transition API support
      callback();
      setTimeout(() => {
        document.documentElement.classList.remove(`slide-${navDirection}`);
      }, 300);
    }
  }, [supportsViewTransition]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('slide-forward', 'slide-backward');
    };
  }, []);

  return {
    startTransition,
    supportsViewTransition,
    direction
  };
};