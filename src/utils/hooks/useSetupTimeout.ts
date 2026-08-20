import { useRef, useCallback, useEffect } from "react";

export const useSetupTimeout = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<(() => void) | null>(null);

  const startTimeout = useCallback((cb: () => void, timeout: number) => {
    callbackRef.current = cb;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (callbackRef.current) {
        callbackRef.current();
      }

      timeoutRef.current = null;
    }, timeout);
  }, []);

  const stopTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    callbackRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      stopTimeout();
    };
  }, [stopTimeout]);

  return { stopTimeout, startTimeout };
};
