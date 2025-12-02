import { Form, Input, type FormProps } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";

import { useSignup } from "@/hooks/auth/useSignup";
import type { INewAccount } from "@/types";
import PasswordInput from "@/components/shared/PasswordInput";
import EmailInput from "@/components/shared/EmailInput";
import AppSubmitBtn from "@/components/shared/AppSubmitBtn";

const initialValues: INewAccount = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: false,
};

type SignupFormProps = {
    handleClose: () => void;
};

function SignupForm({ handleClose }: SignupFormProps) {
    const [form] = Form.useForm();
    const { signup, isCreatingAccount, contextHolder } = useSignup();

    const onFinish: FormProps<INewAccount>["onFinish"] = async (values) => {
        await signup(values);
        handleClose();
        form.resetFields();
    };

    return (
        <>
            {contextHolder}
            <Form
                form={form}
                name="signupForm"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={initialValues}
            >
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

                <AppSubmitBtn isLoading={isCreatingAccount}>
                    create account
                </AppSubmitBtn>
            </Form>
        </>
    );
}

export default SignupForm;
