import type { MenuProps } from "antd";

export interface INavigationMenuItem {
    key: string;
    label: string;
}

export interface INavigationMenuProps {
    items: INavigationMenuItem[];
    mode?: "vertical" | "horizontal" | "inline";
    onClick?: MenuProps["onClick"];
}
