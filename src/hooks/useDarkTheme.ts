import { useState, useEffect } from "react";

export const useDarkTheme = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const dark_theme = localStorage.getItem("dark_theme");
    if (dark_theme) {
      setDarkTheme(JSON.parse(dark_theme));
    }
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    localStorage.setItem("dark_theme", JSON.stringify(!darkTheme)); // Saving !darkTheme because the state will only be updated on next re-render
  };

  return [darkTheme, toggleTheme] as const;
};
