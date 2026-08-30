import { useEffect } from "react";
import { selectSetHydrated, selectSetTheme, useStore } from "@/shared/lib/store";
import { getInitialTheme } from "@/shared/lib/theme";

export const useHydrateStore = (): void => {
    const setHydrated = useStore(selectSetHydrated);
    const setTheme = useStore(selectSetTheme);

    useEffect(() => {
        const initialTheme = getInitialTheme();
        setTheme(initialTheme);
        setHydrated();
    }, [setHydrated, setTheme]);
};
