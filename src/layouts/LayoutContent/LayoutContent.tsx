import type { FC, PropsWithChildren } from "react";
import { ConfigProvider, Layout } from "antd";
import { NavigationMenu } from "@/components/NavigationMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MENU_ITEMS } from "@/configs/menu-items";
import { antDesignThemeDark } from "@/layouts/constants/theme-dark";
import { antDesignThemeLight } from "@/layouts/constants/theme-light";
import { useHydrateStore, useResolvedTheme } from "@/shared/lib/hooks";

const { Content, Sider } = Layout;

export const LayoutContent: FC<PropsWithChildren> = props => {
    const { children } = props;

    useHydrateStore();

    const resolvedTheme = useResolvedTheme();

    return (
        <ConfigProvider theme={resolvedTheme === "dark" ? antDesignThemeDark : antDesignThemeLight}>
            <Layout className="w-dvw h-dvh">
                <Sider breakpoint="md" className="bg-transparent!" collapsedWidth={0} width={250}>
                    <div className="flex flex-col justify-between w-full h-full">
                        <NavigationMenu items={MENU_ITEMS} mode="inline" />
                        <div className="flex justify-center py-2 w-full align-center">
                            <ThemeToggle />
                        </div>
                    </div>
                </Sider>
                <Content className="px-8 py-6">{children}</Content>
            </Layout>
        </ConfigProvider>
    );
};
