import type { IUserData } from "@/routes/user.$id";
import { Link, useLoaderData, useParams } from "@tanstack/react-router";
import { Descriptions } from "antd";
import { RoutePending } from "@/components/RoutePending";
import { Button } from "@/shared/ui/Button";

export const UserPage = () => {
    const { id } = useParams({ from: "/user/$id" });
    const user = useLoaderData({ from: "/user/$id" }) as IUserData | undefined;

    if (!user) {
        return <RoutePending />;
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full h-full">
            <h1 className="font-bold text-3xl">User {id}</h1>
            <p className="max-w-2xl text-center">
                Dynamic route (user.$id) with a loader that fetches an external API. The loader runs
                on the server during SSR and on the client inside the mobile SPA shell — the code is
                the same.
            </p>
            <Descriptions
                bordered
                column={1}
                items={[
                    { children: user.id, key: "id", label: "ID" },
                    { children: user.name, key: "name", label: "Name" },
                    { children: user.username, key: "username", label: "Username" },
                    { children: user.email, key: "email", label: "Email" },
                    { children: user.phone, key: "phone", label: "Phone" },
                    { children: user.website, key: "website", label: "Website" },
                ]}
                size="small"
                title="User"
            />
            <div className="flex flex-col gap-2">
                <Link params={{ id: String(Number(id) + 1) }} to="/user/$id">
                    <Button>Go to User {Number(id) + 1}</Button>
                </Link>
                <Link to="/">
                    <Button>Go to IndexPage</Button>
                </Link>
            </div>
        </div>
    );
};
