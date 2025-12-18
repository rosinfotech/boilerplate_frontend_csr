import type { Theme } from "@/shared/types/theme";


export const applyTheme = (theme: Theme): void => {
    if (typeof window === "undefined") {
        return;
    }

    const root = document.documentElement;

    if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        root.classList.toggle("dark", systemTheme === "dark");
    } else {
        root.classList.toggle("dark", theme === "dark");
    }
};
