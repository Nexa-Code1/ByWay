import { Button, Result } from "antd";
import { useNavigate } from "react-router";

function Error() {
    const navigate = useNavigate();

    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={
                <Button
                    type="primary"
                    className="bg-primary-700!"
                    onClick={() => navigate("/")}
                >
                    Back Home
                </Button>
            }
        />
    );
}

export default Error;
