import type { NavigateOptions } from "@tanstack/react-router";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useRef } from "react";

export function useNavigateTo(options: NavigateOptions): () => void {
    const navigate = useNavigate();
    const pathname = useRouterState({
        select: state => state.location.pathname,
    });
    const isNavigating = useRef(false);

    useEffect(() => {
        isNavigating.current = false;
    }, [pathname]);

    return useCallback(() => {
        if (isNavigating.current) return;
        isNavigating.current = true;
        void navigate(options);
    }, [navigate, options]);
}
