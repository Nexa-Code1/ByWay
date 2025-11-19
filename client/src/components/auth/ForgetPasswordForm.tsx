import { Form, Input, type FormProps } from "antd";
import type { ReactNode } from "react";

type FieldType = {
    email?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

type ForgetPasswordFormProps = {
    children: ReactNode;
};

function ForgetPasswordForm({ children }: ForgetPasswordFormProps) {
    return (
        <Form
            name="forgetPasswordForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                name="email"
                rules={[
                    { required: true, message: "Please input your email!" },
                ]}
                className="mb-4!"
            >
                <Input placeholder="Email" className="bg-gray-100! border-0!" />
            </Form.Item>

            {children}
        </Form>
    );
}

export default ForgetPasswordForm;
