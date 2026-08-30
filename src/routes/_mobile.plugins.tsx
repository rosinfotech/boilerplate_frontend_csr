import { createFileRoute } from "@tanstack/react-router";
import { PluginsPage } from "@/pages/PluginsPage/PluginsPage";

export const Route = createFileRoute("/_mobile/plugins")({
    component: PluginsPage,
    head: () => ({
        meta: [
            {
                title: "Capacitor Plugins Debug — Rosinfotech Boilerplate",
            },
        ],
    }),
});
