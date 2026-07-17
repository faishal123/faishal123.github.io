"use client";

import { useEffect, useRef, useState } from "react";
import { Square } from "./square";

export const SquareRenderer = ({
  dimension = 8,
  gap = 32,
}: {
  dimension?: number;
  gap?: number;
}) => {
  const squareContainerRef = useRef<HTMLDivElement>(null);

  const [squareMatrix, setSquareMatric] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    console.log(
      squareContainerRef.current,
      squareContainerRef.current?.clientWidth,
      squareContainerRef.current?.clientHeight,
    );
    const maxSquareX = Math.floor(
      ((squareContainerRef?.current?.clientWidth || 0) - 200) /
        (dimension + gap),
    );
    const maxSquareY = Math.floor(
      ((squareContainerRef?.current?.clientHeight || 0) - 200) /
        (dimension + gap),
    );

    setSquareMatric([maxSquareX, maxSquareY]);
  }, []);

  return (
    <div
      className="h-full w-full flex flex-col p-[100]"
      style={{ gap }}
      ref={squareContainerRef}
    >
      {Array.from(Array(squareMatrix[1])).map((_, i1) => {
        return (
          <div key={i1} className="flex" style={{ gap }}>
            {Array.from(Array(squareMatrix[0])).map((_, i2) => {
              return <Square key={i2} dimension={dimension} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
