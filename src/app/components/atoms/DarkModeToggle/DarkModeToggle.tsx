"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "../Button/Button";

export const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const icons = [Sun, Moon];

  const isDarkTheme = theme === "dark";

  return (
    <Button
      onClick={() => {
        setTheme(isDarkTheme ? "light" : "dark");
      }}
      className="cursor-pointer border border-foreground pointer-events-auto p-2 rounded-md"
    >
      {isDarkTheme ? <Moon /> : <Sun />}
    </Button>
  );
};
