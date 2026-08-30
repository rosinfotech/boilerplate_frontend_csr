import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function NotFound(props: Readonly<{ children?: ReactNode }>) {
    const { children } = props;

    return (
        <div className="p-2 space-y-2">
            <div className="text-gray-600 dark:text-gray-400">
                {children ?? <p>The page you are looking for does not exist.</p>}
            </div>
            <p className="flex flex-wrap gap-2 items-center">
                <button
                    className="px-1 py-2 bg-cyan-600 rounded-sm text-sm text-white font-black uppercase"
                    onClick={() => window.history.back()}
                    type="button"
                >
                    Go back
                </button>
                <Link
                    className="px-1 py-2 bg-cyan-600 rounded-sm text-sm text-white font-black uppercase"
                    to="/"
                >
                    Start Over
                </Link>
            </p>
        </div>
    );
}
