import { Link, useSearch } from "@tanstack/react-router";
import { Button as AntButton } from "antd";
import { selectTheme, selectToggleTheme, useStore } from "@/shared/lib/store";
import { Button } from "@/shared/ui/Button";

export const NextPage = () => {
    const { page } = useSearch({ from: "/next" });

    const theme = useStore(selectTheme);
    const toggleTheme = useStore(selectToggleTheme);

    return (
        <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
            <h1 className="font-bold text-3xl">Next Page</h1>
            <p className="max-w-2xl text-center">
                This route demonstrates typed search params: the URL query string is parsed and
                validated with a zod schema through validateSearch.
            </p>
            <div className="font-bold text-xl">Current page: {page}</div>
            <div className="flex flex-col gap-2">
                <Link search={{ page: Math.max(1, page - 1) }} to="/next">
                    <Button>Previous page (page={Math.max(1, page - 1)})</Button>
                </Link>
                <Link search={{ page: page + 1 }} to="/next">
                    <Button>Next page (page={page + 1})</Button>
                </Link>
                <Link to="/">
                    <Button>Go to IndexPage</Button>
                </Link>
                <AntButton onClick={toggleTheme} size="large" type="primary">
                    Toggle Theme (Current: {theme})
                </AntButton>
            </div>
        </div>
    );
};
