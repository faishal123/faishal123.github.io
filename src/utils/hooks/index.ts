"use client";

import { frame, useSpring } from "motion/react";
import { useRef, useCallback, useEffect, RefObject } from "react";

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

const spring = { damping: 3, stiffness: 50, restDelta: 0.001 };

export const useFollowCursor = (ref: RefObject<HTMLDivElement | null>) => {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = (event: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = event;
      const element = ref.current;

      frame.read(() => {
        x.set(clientX - element?.offsetLeft - element?.offsetWidth / 2);
        y.set(clientY - element?.offsetTop - element?.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return { x, y };
};
