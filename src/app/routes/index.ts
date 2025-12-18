import { createBrowserRouter } from "react-router";
import { IndexPage } from "@/pages/IndexPage";
import { NextPage } from "@/pages/NextPage";


export const routers = createBrowserRouter([
    {
        Component: IndexPage,
        path: "/",
    },
    {
        Component: NextPage,
        path: "/next",
    },
]);
