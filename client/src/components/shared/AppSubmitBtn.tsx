import { Button } from "antd";
import Spinner from "./Spinner";

type AppSubmitBtnProps = {
    isLoading: boolean;
    children: string;
};

function AppSubmitBtn({ isLoading, children }: AppSubmitBtnProps) {
    return (
        <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-primary-600! hover:bg-primary-500! disabled:cursor-not-allowed disabled:text-white! capitalize"
            disabled={isLoading}
        >
            {isLoading ? <Spinner size="small" /> : children}
        </Button>
    );
}

export default AppSubmitBtn;
