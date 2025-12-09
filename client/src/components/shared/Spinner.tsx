import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type SpinnerProps = {
    size?: "default" | "small" | "large";
    className?: string;
};

function Spinner({
    size = "default",
    className = "text-white!",
}: SpinnerProps) {
    return (
        <Spin
            indicator={<LoadingOutlined spin />}
            size={size}
            className={`w-full ${className}`}
        />
    );
}

export default Spinner;
