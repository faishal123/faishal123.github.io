"use client";

import { ReactNode, useEffect } from "react";

export const SquareAnimationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.addEventListener("mouseleave", () => {
        const animatedSquares = document.querySelectorAll(
          "[data-animatedSquare='true']",
        );
        if (animatedSquares.length) {
          animatedSquares.forEach((square) => {
            square.classList.add("transition-all");
            square.style.transform = `scale(1)`;
            setTimeout(() => {
              square.classList.remove("transition-all");
            }, 300);
          });
        }
      });
      body.addEventListener("mousemove", (e) => {
        const animatedSquares = document.querySelectorAll(
          "[data-animatedSquare='true']",
        );
        const mousePosition = {
          x: e.clientX,
          y: e.clientY,
        };
        console.log(animatedSquares.length);
        if (animatedSquares.length) {
          animatedSquares.forEach((square) => {
            const squarePosition = square.getBoundingClientRect();
            const squareCenter = {
              x: squarePosition.left + squarePosition.width / 2,
              y: squarePosition.top + squarePosition.height / 2,
            };

            const deltaX = mousePosition.x - squareCenter.x;
            const deltaY = mousePosition.y - squareCenter.y;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            const maxDistance = 100;
            const clampedDistance = Math.min(distance, maxDistance);
            const scaleFactor =
              1 + (maxDistance - clampedDistance) / maxDistance;

            square.style.transform = `scale(${scaleFactor})`;
          });
        }
      });
    }
  }, []);

  return <>{children}</>;
};
