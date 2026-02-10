import { Button } from "antd";
import type { ReactNode } from "react";
import type { BaseButtonProps } from "antd/es/button/button";

import Spinner from "./Spinner";

type AppSubmitBtnProps = {
    isLoading: boolean;
    className?: string;
    type?: BaseButtonProps["type"];
    children: ReactNode;
    disabled?: boolean;
};

function AppSubmitBtn({
    isLoading,
    className = "bg-primary-600! text-gray-100!",
    type = "default",
    children,
    disabled = false,
}: AppSubmitBtnProps) {
    return (
        <Button
            type={type}
            htmlType="submit"
            className={`w-full hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:text-white! capitalize ${className}`}
            disabled={isLoading || disabled}
        >
            {isLoading ? <Spinner size="small" /> : children}
        </Button>
    );
}

export default AppSubmitBtn;
