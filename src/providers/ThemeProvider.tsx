"use client";
import React from "react";
import ThemeContext from "@/contexts/ThemeContext";
import { useDarkTheme } from "@/hooks/useDarkTheme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkTheme, toggleTheme] = useDarkTheme();

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
