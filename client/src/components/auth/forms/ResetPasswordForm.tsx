import { Form, type FormProps } from "antd";

import AppSubmitBtn from "../../shared/AppSubmitBtn";
import type { IResetPassword } from "../../../types";
import PasswordInput from "../../shared/PasswordInput";
import { useResetPassword } from "../../../hooks/auth/useForgetPassword";

const initialValues: IResetPassword = {
    email: "",
    newPassword: "",
    confirmNewPassword: "",
};

function ResetPasswordForm() {
    const [form] = Form.useForm();

    const { forgetPassword, isResettingPassword, contextHolder } =
        useResetPassword();

    const onFinish: FormProps<IResetPassword>["onFinish"] = async (values) => {
        await forgetPassword(values);
        form.resetFields();
    };

    return (
        <>
            {contextHolder}
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
                />
                <AppSubmitBtn isLoading={isResettingPassword}>
                    reset password
                </AppSubmitBtn>
            </Form>
        </>
    );
}

export default ResetPasswordForm;
