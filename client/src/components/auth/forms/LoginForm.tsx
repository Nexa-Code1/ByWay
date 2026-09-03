import { useSearchParams } from "react-router";
import { Button, Form, type FormProps } from "antd";

import PasswordInput from "@/components/shared/PasswordInput";
import EmailInput from "@/components/shared/EmailInput";
import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import { useLogin } from "@/hooks/auth/useLogin";
import type { ILogin } from "@/types";

const initialValues: ILogin = {
    email: "tawin78709@meikeya.com",
    password: "12345678",
};

type LoginFormProps = {
    handleClose: () => void;
};

function LoginForm({ handleClose }: LoginFormProps) {
    const [form] = Form.useForm();
    const [, setSearchParams] = useSearchParams();
    const { login, isLoggingin } = useLogin();

    const onFinish: FormProps<ILogin>["onFinish"] = async (values) => {
        await login(values);
        handleClose();
        form.resetFields();
    };

    return (
        <Form
            name="loginForm"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={initialValues}
        >
            <EmailInput />
            <PasswordInput className="bg-gray-100! border-0!" />

            <Button
                className="capitalize hover:bg-transparent! p-0! -mt-4! w-full justify-end! text-gray-900! hover:text-error-800! text-sm!"
                type="text"
                onClick={() => setSearchParams({ auth: "send-otp" })}
                disabled={isLoggingin}
            >
                forget password
            </Button>

            <AppSubmitBtn isLoading={isLoggingin}>log in</AppSubmitBtn>
        </Form>
    );
}

export default LoginForm;
