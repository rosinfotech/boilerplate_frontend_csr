import type { MenuProps } from "antd";
import type { FC } from "react";
import type { INavigationMenuProps } from "./types";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "antd";

export const NavigationMenu: FC<INavigationMenuProps> = props => {
    const { items, mode = "inline", onClick } = props;

    const pathname = useRouterState({
        select: state => state.location.pathname,
    });

    const menuItems: MenuProps["items"] = items.map(item => ({
        key: item.key,
        label: <Link to={item.key as never}>{item.label}</Link>,
    }));

    return (
        <Menu
            className="bg-transparent! h-full"
            items={menuItems}
            mode={mode}
            onClick={onClick}
            selectedKeys={[pathname]}
        />
    );
};
