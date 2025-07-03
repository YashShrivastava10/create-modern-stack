import { create } from "zustand";

export type Theme = "light" | "dark";

type useThemeStoreProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<useThemeStoreProps>((set) => ({
  theme: (localStorage.getItem("theme") as Theme) || "light",
  setTheme: (theme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
