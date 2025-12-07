import { Button } from "antd";
import type { ReactNode } from "react";
import type { BaseButtonProps } from "antd/es/button/button";

import Spinner from "./Spinner";

type AppSubmitBtnProps = {
    isLoading: boolean;
    className?: string;
    type?: BaseButtonProps["type"];
    children: ReactNode;
};

function AppSubmitBtn({
    isLoading,
    className,
    type = "default",
    children,
}: AppSubmitBtnProps) {
    return (
        <Button
            type={type}
            htmlType="submit"
            className={`w-full bg-primary-600! text-gray-100! hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:text-white! capitalize ${className}`}
            disabled={isLoading}
        >
            {isLoading ? <Spinner size="small" /> : children}
        </Button>
    );
}

export default AppSubmitBtn;
