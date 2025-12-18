import type { StateCreator } from "zustand";
import type { Theme } from "@/shared/types/theme";
import { applyTheme, getInitialTheme } from "@/shared/lib/theme";
import { THEME_STORAGE_KEY } from "@/shared/types/theme";


export interface IThemeSlice {
    setTheme: (theme: Theme) => void;
    theme: Theme;
    toggleTheme: () => void;
}

export const createThemeSlice: StateCreator<IThemeSlice> = (set, get) => {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);

    if (typeof window !== "undefined") {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            const currentTheme = get().theme;
            if (currentTheme === "system") {
                applyTheme("system");
            }
        });
    }

    return {
        theme: initialTheme,

        setTheme(theme: Theme) {
            if (typeof window !== "undefined") {
                localStorage.setItem(THEME_STORAGE_KEY, theme);
            }
            applyTheme(theme);
            set({ theme });
        },

        toggleTheme() {
            const currentTheme = get().theme;
            const newTheme = currentTheme === "light" ? "dark" : "light";
            if (typeof window !== "undefined") {
                localStorage.setItem(THEME_STORAGE_KEY, newTheme);
            }
            applyTheme(newTheme);
            set({ theme: newTheme });
        },
    };
};
