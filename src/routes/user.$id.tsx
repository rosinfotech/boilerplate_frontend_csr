import { createFileRoute } from "@tanstack/react-router";
import { UserPage } from "@/pages/UserPage/UserPage";
import { seo } from "@/shared/lib/seo";
import { sleep } from "@/shared/lib/time/sleep";

export interface IUserData {
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
}

export const Route = createFileRoute("/user/$id")({
    component: UserPage,
    head: ({ params }) => ({
        meta: [
            ...seo({
                description:
                    "Dynamic user route (user.$id) with a server-side loader during SSR and a client-side loader inside the mobile SPA shell.",
                title: `User ${params.id} — Rosinfotech Boilerplate TanStack Router`,
            }),
            {
                content: `/user/${params.id}`,
                property: "og:url",
            },
        ],
    }),
    async loader({ params }) {
        await sleep(300);
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch user ${params.id}`);
        }
        return (await response.json()) as IUserData;
    },
});
