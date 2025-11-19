import { useSearchParams } from "react-router";
import { Button, Form, type FormProps } from "antd";
import PasswordInput from "../shared/PasswordInput";
import EmailInput from "../shared/EmailInput";

type FieldType = {
    email: string;
    password: string;
};

function LoginForm() {
    const [, setSearchParams] = useSearchParams();

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log(values);
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            name="loginForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <EmailInput />
            <PasswordInput />

            <Button
                className="capitalize hover:bg-transparent! p-0! -mt-4! w-full justify-end! text-gray-900! hover:text-error-800! text-sm!"
                type="text"
                onClick={() => setSearchParams({ auth: "forget-password" })}
            >
                forget password
            </Button>

            <Button
                type="primary"
                className="w-full bg-primary-600! hover:bg-primary-500! capitalize"
            >
                log in
            </Button>
        </Form>
    );
}

export default LoginForm;
