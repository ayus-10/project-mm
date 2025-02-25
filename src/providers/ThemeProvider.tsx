import { ReactNode } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useDarkTheme } from "@/hooks/useDarkTheme";

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [darkTheme, toggleTheme] = useDarkTheme();

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
