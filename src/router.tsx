import { createRouter } from "@tanstack/react-router";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import { RoutePending } from "@/components/RoutePending";
import { routeTree } from "@/route-tree";

export function getRouter() {
    const router = createRouter({
        defaultErrorComponent: DefaultCatchBoundary,
        defaultNotFoundComponent: () => <NotFound />,
        defaultPendingComponent: RoutePending,
        routeTree,
        scrollRestoration: true,
    });

    return router;
}

declare module "@tanstack/react-router" {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Register {
        router: ReturnType<typeof getRouter>;
    }
}
