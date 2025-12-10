import { Form, type FormProps } from "antd";

import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import PasswordInput from "@/components/shared/PasswordInput";
import type { IResetPassword } from "@/types";
import { useResetPassword } from "@/hooks/auth/useForgetPassword";

const initialValues: IResetPassword = {
    email: "",
    newPassword: "",
    confirmNewPassword: "",
};

function ResetPasswordForm() {
    const [form] = Form.useForm();

    const { forgetPassword, isResettingPassword } =
        useResetPassword();

    const onFinish: FormProps<IResetPassword>["onFinish"] = async (values) => {
        await forgetPassword(values);
        form.resetFields();
    };

    return (
        <Form
            name="resetPasswordForm"
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            initialValues={initialValues}
        >
            <PasswordInput name="newPassword" placeholder="new password" />
            <PasswordInput
                name="confirmNewPassword"
                placeholder="re-write password"
                className="bg-gray-100! border-0!"
            />
            <AppSubmitBtn isLoading={isResettingPassword}>
                reset password
            </AppSubmitBtn>
        </Form>
    );
}

export default ResetPasswordForm;
