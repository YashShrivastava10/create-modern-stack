"use client";

import {
  applyTheme,
  setResolvedTheme,
  setTheme,
} from "@/store/slice/themeSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function ThemeInitializer() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Read from localStorage only on client
    const saved =
      (localStorage.getItem("theme") as "light" | "dark" | "system") ||
      "system";

    applyTheme(saved);

    dispatch(setTheme(saved));

    // Listen for system theme changes if using "system"
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (saved === "system") {
        const newResolved = e.matches ? "dark" : "light";
        applyTheme("system");
        dispatch(setResolvedTheme(newResolved));
      }
    };

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [dispatch]);

  return null; // no UI, just side effects
}
