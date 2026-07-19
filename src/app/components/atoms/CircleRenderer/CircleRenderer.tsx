"use client";

import { useEffect } from "react";
import { Circle } from "../Circle/Circle";
import { createRoot } from "react-dom/client";
import { useSetupInterval } from "@/utils/hooks";

const Child = () => {
  const interval = 250;
  const minSize = 4;
  const maxSize = 10;

  const { startInterval } = useSetupInterval();

  useEffect(() => {
    startInterval(() => {
      const containerElement = document
        ? document.getElementById("container")
        : null;
      if (containerElement) {
        // const randomHorizontalPoint = 100;
        const randomHorizontalPoint = Math.floor(
          Math.random() * (containerElement.clientWidth * 0.8),
        );
        // const randomVerticalPoint = 100;
        const randomVerticalPoint = Math.floor(
          Math.random() * containerElement.clientHeight,
        );
        // const randomSize = 30;

        const randomSize = Math.floor(
          Math.random() * (maxSize - minSize + 1) + minSize,
        );

        const tempDiv = document.createElement("div");
        const root = createRoot(tempDiv);
        root.render(
          <Circle
            size={randomSize}
            startPosition={{
              x: randomHorizontalPoint,
              y: randomVerticalPoint,
            }}
            removeNodeFunction={() => {
              root.unmount();

              if (containerElement.contains(tempDiv)) {
                containerElement.removeChild(tempDiv);
              }
            }}
          />,
        );

        containerElement.appendChild(tempDiv);
      }
    }, interval);
  }, [startInterval]);

  return null;
};

const Container = () => {
  return <div id="container" className="h-screen w-full"></div>;
};

export const CircleRenderer = () => {
  return (
    <>
      <Container />
      <Child />
    </>
  );
};
