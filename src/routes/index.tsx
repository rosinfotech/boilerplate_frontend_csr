import { createFileRoute } from "@tanstack/react-router";
import { IndexPage } from "@/page-index";
import { seo } from "@/shared/lib/seo";

export const Route = createFileRoute("/")({
    component: IndexPage,
    head: () => ({
        meta: [
            ...seo({
                description:
                    "Index page of the Rosinfotech Boilerplate Frontend on TanStack Start with full SSR document and streaming.",
                title: "Index — Rosinfotech Boilerplate TanStack Router",
            }),
            {
                content: "/",
                property: "og:url",
            },
        ],
    }),
});
