"use client";

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
