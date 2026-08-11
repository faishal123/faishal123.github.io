"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Circle.module.css";
import * as motion from "motion/react-client";
import { useSetupTimeout } from "@/utils/hooks";

export const Circle = ({
  startPosition,
  size,
  removeNodeFunction,
}: {
  startPosition: { x: number; y: number };
  size: number;
  removeNodeFunction: () => void;
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ ...startPosition, duration: 0 });

  const { startTimeout: startIncreaseOpacityTimeout } = useSetupTimeout();
  const {
    startTimeout: startDecreaseOpacityTimeout,
    stopTimeout: stopDecreaseOpacityTimeout,
  } = useSetupTimeout();
  const {
    startTimeout: startRemoveNodeTimeout,
    stopTimeout: stopRemoveNodeTimeout,
  } = useSetupTimeout();

  const removeCurrentCircle = useCallback(() => {
    setOpacity(0);
    startRemoveNodeTimeout(() => {
      removeNodeFunction();
    }, 1500);
  }, []);

  useEffect(() => {
    if (!opacity) {
      let randomOpacity = Math.random();
      if (randomOpacity < 0.5) {
        randomOpacity = 0.5;
      }
      startIncreaseOpacityTimeout(() => {
        setOpacity(randomOpacity);
      }, 1000);
    }

    let randomDuration = Math.random() * 7500;
    if (randomDuration < 2000) {
      randomDuration = 2000;
    }

    const distanceInPx = Math.floor(randomDuration / 10);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosition((prev) => {
      return {
        ...prev,
        x: prev.x + distanceInPx,
        duration: (randomDuration + 1500) / 1000,
      };
    });

    startDecreaseOpacityTimeout(() => {
      removeCurrentCircle();
    }, randomDuration);
  }, []);

  return (
    <motion.div
      ref={circleRef}
      className={`border-[0.5px] border-foreground rounded-full fixed ${styles.circle}`}
      style={{
        transition:
          "left 500ms ease-in-out, opacity 1000ms ease-in-out, width 300ms ease-in-out, height 300ms ease-in-out",
        width: size,
        height: size,
        opacity,
      }}
      animate={{
        x: position.x,
        y: position.y,
        transition: {
          duration: position.duration,
          x: {
            ease: "linear",
            duration: position.duration,
          },
          y: {
            ease: "linear",
            duration: position.duration,
          },
        },
      }}
      whileHover={{
        scale: 1.5,
      }}
      whileTap={{
        scale: 0.8,
      }}
      drag={!!opacity}
      onDragStart={() => {
        if (opacity) {
          stopDecreaseOpacityTimeout();
          stopRemoveNodeTimeout();
        }
      }}
      onDragEnd={() => {
        removeCurrentCircle();
      }}
    ></motion.div>
  );
};
