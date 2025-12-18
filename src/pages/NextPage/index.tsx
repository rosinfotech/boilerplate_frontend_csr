import { Button as AntButton } from "antd";
import { useStore } from "@/app/store";
import { useNavigateTo } from "@/shared/lib/hooks/useNavigateTo";
import { Button } from "@/shared/ui/Button";


export const NextPage = () => {
    const navigateToIndex = useNavigateTo("/", true);
    const { theme, toggleTheme } = useStore();

    return (
        <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
            Next Page
            <Button onClick={navigateToIndex}>Go to IndexPage</Button>
            <AntButton onClick={toggleTheme} size="large" type="primary">
                Toggle Theme (Current: {theme})
            </AntButton>
        </div>
    );
};
