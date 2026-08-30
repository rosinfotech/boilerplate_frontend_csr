import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/pages/NotificationsPage/NotificationsPage";

export const Route = createFileRoute("/_mobile/notifications")({
    component: NotificationsPage,
    head: () => ({
        meta: [
            {
                title: "Mobile Notifications — Rosinfotech Boilerplate",
            },
        ],
    }),
});
