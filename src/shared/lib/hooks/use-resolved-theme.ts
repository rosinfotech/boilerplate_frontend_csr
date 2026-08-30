import { useSyncExternalStore } from "react";
import { selectTheme, useStore } from "@/shared/lib/store";

const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") {
        return "light";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const useResolvedTheme = (): "light" | "dark" => {
    const theme = useStore(selectTheme);

    const systemTheme = useSyncExternalStore<"light" | "dark">(
        callback => {
            if (typeof window === "undefined") {
                return () => {};
            }
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            mediaQuery.addEventListener("change", callback);
            return () => {
                mediaQuery.removeEventListener("change", callback);
            };
        },
        getSystemTheme,
        () => "light" as const
    );

    if (theme === "system") {
        return systemTheme;
    }

    if (theme === "dark") {
        return "dark";
    }

    return "light";
};
