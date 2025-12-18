import type { Path } from "history";
import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export function useNavigateTo<GState = unknown>(
    path: string | Partial<Path>,
    replace = false,
    state?: GState
): () => void {
    const navigate = useNavigate();
    const location = useLocation();
    const isNavigating = useRef(false);

    useEffect(() => {
        isNavigating.current = false;
    }, [location.pathname]);

    const navigateTo = useCallback(() => {
        if (!path) return;
        const targetPath = typeof path === "string" ? path : path.pathname;
        if (location.pathname === targetPath || isNavigating.current) return;
        isNavigating.current = true;
        navigate(path, { replace, state });
    }, [location.pathname, navigate, path, replace, state]);

    return navigateTo;
}
