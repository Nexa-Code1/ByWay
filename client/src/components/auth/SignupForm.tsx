import { Button, Form, Input, Spin, type FormProps } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import { LoadingOutlined } from "@ant-design/icons";

import { useSignup } from "../../hooks/auth/useSignup";
import type { INewAccount } from "../../types";
import PasswordInput from "../shared/PasswordInput";
import EmailInput from "../shared/EmailInput";

type SignupFormProps = {
    handleOk: () => void;
};

function SignupForm({ handleOk }: SignupFormProps) {
    const { signup, isCreatingAccount, contextHolder } = useSignup();

    const onFinish: FormProps<INewAccount>["onFinish"] = (values) => {
        const formValues: INewAccount = {
            ...values,
            role: values.role ? "instructor" : "student",
        };
        signup(formValues);
        handleOk();
    };

    return (
        <>
            {contextHolder}
            <Form name="signupForm" onFinish={onFinish} autoComplete="off">
                <div className="w-full flex gap-4">
                    <Form.Item<INewAccount>
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: "Please input your first name!",
                            },
                        ]}
                        className="w-full mb-4!"
                    >
                        <Input
                            placeholder="First Name"
                            className="bg-gray-100! border-0!"
                        />
                    </Form.Item>

                    <Form.Item<INewAccount>
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: "Please input your last name!",
                            },
                        ]}
                        className="w-full mb-4!"
                    >
                        <Input
                            placeholder="Last Name"
                            className="bg-gray-100! border-0!"
                        />
                    </Form.Item>
                </div>

                <EmailInput />
                <PasswordInput />

                <Form.Item<INewAccount>
                    name="role"
                    valuePropName="checked"
                    label={null}
                >
                    <Checkbox className="capitalize">
                        join us as an instructor
                    </Checkbox>
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full bg-primary-600! hover:bg-primary-500! disabled:cursor-not-allowed disabled:text-white! capitalize"
                    disabled={isCreatingAccount}
                >
                    {isCreatingAccount ? (
                        <Spin
                            indicator={<LoadingOutlined spin />}
                            size="small"
                            className="text-white!"
                        />
                    ) : (
                        "create account"
                    )}
                </Button>
            </Form>
        </>
    );
}

export default SignupForm;
