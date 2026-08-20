import { useRef, useCallback, useEffect } from "react";

export const useSetupInterval = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<(() => void) | null>(null);

  const startInterval = useCallback((cb: () => void, interval: number) => {
    callbackRef.current = cb;
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (callbackRef.current) {
          callbackRef.current();
        }
      }, interval);
    }
  }, []);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopInterval();
    };
  }, [stopInterval]);

  return { stopInterval, startInterval };
};
