"use client";

import { getCssPropertyValue, hexToRgba } from "@/utils/common";
import { useWatchhCssVariables } from "@/utils/hooks/useWatchCssVariables";
import { ForwardRefComponent, HTMLMotionProps } from "motion/react";
import * as motion from "motion/react-client";
import { ReactNode, useState } from "react";

export const Button = (props: HTMLMotionProps<"div">) => {
  const { className, children, whileHover, whileTap } = props;

  const [beingTapped, setBeingTapped] = useState(false);

  const foregroundColor = useWatchhCssVariables("--foreground");
  const backgroundColor = useWatchhCssVariables("--background");

  const foregroundColorOpaque = hexToRgba(foregroundColor, "1");
  const foregroundColorTransparent = hexToRgba(foregroundColor, ".25");

  const backgroundColorOpaque = hexToRgba(backgroundColor, "1");

  // console.log(foregroundColorOpaque, backgroundColor, backgroundColorOpaque);
  console.log(beingTapped);

  return (
    <motion.div
      {...props}
      whileHover={whileHover ? whileHover : { scale: 1.2 }}
      whileTap={
        whileTap
          ? whileTap
          : {
              scale: 0.8,
              // backgroundColor: foregroundColor,
              // color: backgroundColorOpaque,
            }
      }
      // onMouseDown={() => {
      //   console.log("mousedown");
      // }}
      // onMouseUp={() => {
      //   console.log("mouseup");
      // }}
      onTapStart={() => {
        setBeingTapped(true);
      }}
      onTap={() => {
        if (beingTapped) {
          setBeingTapped(false);
        }
      }}
      onTapCancel={() => {
        if (beingTapped) {
          setBeingTapped(false);
        }
      }}
      // onMouseLeave={() => {
      //   console.log("mouseleave");
      // }}
      // onClick={() => {
      //   console.log("onclick");
      // }}
      style={{
        color: beingTapped ? backgroundColor : foregroundColor,
        backgroundColor: beingTapped ? foregroundColor : backgroundColor,
        transition:
          "color 300ms ease-in-out, backgroundColor 300ms ease-in-out",
      }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
};
