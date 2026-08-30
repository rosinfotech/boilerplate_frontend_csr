import { Link } from "@tanstack/react-router";
import { Button as AntButton } from "antd";
import { selectTheme, selectToggleTheme, useStore } from "@/shared/lib/store";
import { Button } from "@/shared/ui/Button";

export const IndexPage = () => {
    const theme = useStore(selectTheme);
    const toggleTheme = useStore(selectToggleTheme);

    return (
        <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
            <h1 className="font-bold text-3xl">Index Page</h1>
            <p className="max-w-2xl text-center">
                Rosinfotech Boilerplate on TanStack Start: one codebase builds a web application
                with Server Side Rendering and a mobile SPA shell packed into native apps via
                Capacitor.
            </p>
            <div className="flex flex-col gap-2">
                <Link search={{ page: 2 }} to="/next">
                    <Button>Go to NextPage (page=2, typed search)</Button>
                </Link>
                <Link params={{ id: "1" }} to="/user/$id">
                    <Button>Go to User 1 (dynamic route)</Button>
                </Link>
                <AntButton onClick={toggleTheme} size="large" type="primary">
                    Toggle Theme (Current: {theme})
                </AntButton>
            </div>
        </div>
    );
};
