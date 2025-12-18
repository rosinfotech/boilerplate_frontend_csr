import "@/styles/index.css";
import type { FC } from "react";
import { RouterProvider } from "react-router";
import { routers } from "@/app/routes";


export const App: FC = () => {
    return (
        <>
            <RouterProvider router={routers} />
        </>
    );
};
