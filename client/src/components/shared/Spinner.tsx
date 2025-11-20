import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type SpinnerProps = { size?: "default" | "small" | "large" };

function Spinner({ size = "default" }: SpinnerProps) {
    return (
        <Spin
            indicator={<LoadingOutlined spin />}
            size={size}
            className="text-white!"
        />
    );
}

export default Spinner;
