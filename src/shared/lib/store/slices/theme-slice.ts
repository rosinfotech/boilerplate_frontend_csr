import type { StateCreator } from "zustand";
import type { Theme } from "@/shared/types/theme";
import { applyTheme } from "@/shared/lib/theme";
import { THEME_STORAGE_KEY } from "@/shared/types/theme";

export interface IThemeSlice {
    hydrated: boolean;
    setHydrated: () => void;
    setTheme: (theme: Theme) => void;
    theme: Theme;
    toggleTheme: () => void;
}

const updateTheme = (theme: Theme): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
    applyTheme(theme);
};

export const createThemeSlice: StateCreator<IThemeSlice> = (set, get) => {
    return {
        hydrated: false,

        setHydrated() {
            set({ hydrated: true });
        },

        setTheme(theme: Theme) {
            updateTheme(theme);
            set({ theme });
        },

        theme: "system",

        toggleTheme() {
            const params = get();
            const { theme } = params;
            const newTheme = theme === "light" ? "dark" : "light";
            updateTheme(newTheme);
            set({ theme: newTheme });
        },
    };
};
