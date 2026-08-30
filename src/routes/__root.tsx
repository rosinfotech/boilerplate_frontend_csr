import type { ReactNode } from "react";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import { LayoutContent } from "@/layout";
import { IS_MOBILE } from "@/shared/config";
import { seo } from "@/shared/lib/seo";
import "@/styles/index.css";

export const Route = createRootRoute({
    errorComponent: DefaultCatchBoundary,
    head: () => ({
        links: [
            {
                href: "/fonts/mont/index.css",
                rel: "stylesheet",
            },
            {
                href: "https://fonts.googleapis.com",
                rel: "preconnect",
            },
            {
                crossOrigin: "",
                href: "https://fonts.gstatic.com",
                rel: "preconnect",
            },
            {
                href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
                rel: "stylesheet",
            },
            {
                href: "/favicons/favicon.svg",
                rel: "apple-touch-icon",
            },
            {
                href: "/favicons/favicon.svg",
                rel: "icon",
                sizes: "16x16",
                type: "image/svg+xml",
            },
            {
                href: "/favicons/favicon.svg",
                rel: "icon",
                sizes: "32x32",
                type: "image/svg+xml",
            },
            {
                href: "/site.webmanifest",
                rel: "manifest",
            },
        ],
        meta: [
            {
                charSet: "utf-8",
            },
            {
                content: IS_MOBILE
                    ? "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
                    : "width=device-width, initial-scale=1",
                name: "viewport",
            },
            {
                content: "#000000",
                name: "theme-color",
            },
            {
                content: "#000000",
                name: "msapplication-TileColor",
            },
            ...seo({
                description:
                    "Rosinfotech Boilerplate Frontend TanStack Router — web SSR and mobile SPA-shell from a single codebase",
                title: "Rosinfotech Boilerplate Frontend TanStack Router",
            }),
        ],
    }),
    notFoundComponent: () => <NotFound />,
    shellComponent: RootDocument,
});

function RootDocument(props: Readonly<{ children: ReactNode }>) {
    const { children } = props;

    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                <LayoutContent>{children}</LayoutContent>
                {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
                <Scripts />
            </body>
        </html>
    );
}
