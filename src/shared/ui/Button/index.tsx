import type { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";


export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
    const { children, className, ...rest } = props;

    return (
        <button
            {...rest}
            className={clsx(
                "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 py-2 rounded text-white transition-colors cursor-pointer",
                className
            )}
        >
            {children}
        </button>
    );
};
