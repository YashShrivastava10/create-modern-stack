"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const setTheme = (theme: Theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      const actual = theme === "system" ? getSystemTheme() : theme;
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(actual);
    }
    setThemeState(theme);
    setResolvedTheme(theme === "system" ? getSystemTheme() : theme);
  };

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme) || "system";
    const actual = saved === "system" ? getSystemTheme() : saved;

    document.documentElement.classList.add(actual);
    setThemeState(saved);
    setResolvedTheme(actual);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        const newTheme = e.matches ? "dark" : "light";
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);
        setResolvedTheme(newTheme);
      }
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
