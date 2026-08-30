import type { ErrorComponentProps } from "@tanstack/react-router";
import { ErrorComponent, Link, useLocation, useRouter } from "@tanstack/react-router";

export function DefaultCatchBoundary(props: Readonly<ErrorComponentProps>) {
    const { error } = props;

    const router = useRouter();
    const isRoot = useLocation({
        select: location => location.pathname === "/",
    });

    console.error("DefaultCatchBoundary Error:", error);

    return (
        <div className="flex flex-col justify-center items-center gap-6 p-4 min-w-0 flex-1">
            <ErrorComponent error={error} />
            <div className="flex flex-wrap gap-2 items-center">
                <button
                    className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm font-extrabold text-white uppercase"
                    onClick={() => {
                        router.invalidate();
                    }}
                    type="button"
                >
                    Try Again
                </button>
                {isRoot ? (
                    <Link
                        className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm font-extrabold text-white uppercase"
                        to="/"
                    >
                        Home
                    </Link>
                ) : (
                    <Link
                        className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm font-extrabold text-white uppercase"
                        onClick={event => {
                            event.preventDefault();
                            window.history.back();
                        }}
                        to="/"
                    >
                        Go Back
                    </Link>
                )}
            </div>
        </div>
    );
}
