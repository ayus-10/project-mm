import { createContext } from "react";

interface ThemeContextValue {
  darkTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  darkTheme: false,
  toggleTheme: () => {},
});
