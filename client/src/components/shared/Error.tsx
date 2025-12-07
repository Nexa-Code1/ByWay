import { Button, Result } from "antd";

function Error() {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={
                <Button type="primary" className="bg-primary-700!">
                    Back Home
                </Button>
            }
        />
    );
}

export default Error;
