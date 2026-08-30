import { createFileRoute } from "@tanstack/react-router";
import { NextPage } from "@/pages/NextPage/NextPage";
import { nextPageSearchSchema } from "@/pages/NextPage/search-schema";
import { seo } from "@/shared/lib/seo";

export const Route = createFileRoute("/next")({
    component: NextPage,
    head: () => ({
        meta: [
            ...seo({
                description:
                    "Next page demonstrates typed search params on TanStack Router: /next?page=2 is parsed and validated by a zod schema.",
                title: "Next (Search Params) — Rosinfotech Boilerplate TanStack Router",
            }),
            {
                content: "/next",
                property: "og:url",
            },
        ],
    }),
    validateSearch: search => nextPageSearchSchema.parse(search),
});
