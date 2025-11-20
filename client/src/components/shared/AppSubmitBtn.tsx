import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
            {isLoading ? (
                <Spin
                    indicator={<LoadingOutlined spin />}
                    size="small"
                    className="text-white!"
                />
            ) : (
                children
            )}
        </Button>
    );
}

export default AppSubmitBtn;
