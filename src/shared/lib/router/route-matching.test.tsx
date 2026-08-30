import {
    createMemoryHistory,
    createRootRoute,
    createRoute,
    createRouter,
    Outlet,
} from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { nextPageSearchSchema } from "@/pages/NextPage/search-schema";

const rootRoute = createRootRoute({
    component: () => <Outlet />,
});

const indexRoute = createRoute({
    component: () => null,
    getParentRoute: () => rootRoute,
    path: "/",
});

const nextRoute = createRoute({
    component: () => null,
    getParentRoute: () => rootRoute,
    path: "/next",
    validateSearch: search => nextPageSearchSchema.parse(search),
});

const userRoute = createRoute({
    component: () => null,
    getParentRoute: () => rootRoute,
    path: "/user/$id",
});

const routeTree = rootRoute.addChildren([indexRoute, nextRoute, userRoute]);

describe("router matching (memory history)", () => {
    it("matches dynamic user.$id route and extracts params", async () => {
        const router = createRouter({
            history: createMemoryHistory({ initialEntries: ["/"] }),
            routeTree,
        });

        await router.navigate({ params: { id: "42" }, to: "/user/$id" });

        const lastMatch = router.state.matches.at(-1);
        expect(lastMatch?.params).toEqual({ id: "42" });
        expect(router.state.location.pathname).toBe("/user/42");
    });

    it("validates typed search params through validateSearch", async () => {
        const router = createRouter({
            history: createMemoryHistory({ initialEntries: ["/"] }),
            routeTree,
        });

        await router.navigate({ search: { page: 2 }, to: "/next" });

        expect(router.state.location.pathname).toBe("/next");
        expect(router.state.location.search).toEqual({ page: 2 });
    });
});
