import { createContext } from "react";

interface ThemeContextValue {
  darkTheme: boolean;
  toggleTheme: () => void;
}

const defaultValue = {
  darkTheme: false,
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextValue>(defaultValue);

export default ThemeContext;
