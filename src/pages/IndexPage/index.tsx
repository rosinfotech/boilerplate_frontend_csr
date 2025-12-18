import { Button as AntButton } from "antd";
import { useStore } from "@/app/store";
import { useNavigateTo } from "@/shared/lib/hooks/useNavigateTo";
import { Button } from "@/shared/ui/Button";


export const IndexPage = () => {
    const navigateToNext = useNavigateTo("/next", true);
    const { theme, toggleTheme } = useStore();

    return (
        <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
            Index Page
            <div className="flex flex-col gap-2">
                <Button onClick={navigateToNext}>Go to NextPage</Button>
                <AntButton onClick={toggleTheme} size="large" type="primary">
                    Toggle Theme (Current: {theme})
                </AntButton>
            </div>
        </div>
    );
};
