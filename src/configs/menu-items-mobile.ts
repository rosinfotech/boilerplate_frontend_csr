import type { INavigationMenuItem } from "@/components/NavigationMenu";
import { MENU_ITEMS } from "./menu-items";

export const MENU_ITEMS_MOBILE: INavigationMenuItem[] = [
    ...MENU_ITEMS,
    {
        key: "/notifications",
        label: "Mobile Notifications",
    },
    {
        key: "/plugins",
        label: "Plugins Debug",
    },
];
