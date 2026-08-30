import type { FC } from "react";
import { BulbFilled, BulbOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { selectHydrated, selectTheme, selectToggleTheme, useStore } from "@/shared/lib/store";

export const ThemeToggle: FC = () => {
    const hydrated = useStore(selectHydrated);
    const theme = useStore(selectTheme);
    const toggleTheme = useStore(selectToggleTheme);

    if (!hydrated) {
        return (
            <Switch
                checked={false}
                checkedChildren={<BulbFilled />}
                disabled
                unCheckedChildren={<BulbOutlined />}
            />
        );
    }

    return (
        <Switch
            checked={theme === "dark"}
            checkedChildren={<BulbFilled />}
            onChange={toggleTheme}
            unCheckedChildren={<BulbOutlined />}
        />
    );
};
