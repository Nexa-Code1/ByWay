import { Form } from "antd";
import { type FormProps } from "antd/es/form/Form";

import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import PasswordInput from "@/components/shared/PasswordInput";
import { useUpdatePassword } from "@/hooks/user/useUpdatePassword";
import type { IUpdatePassword } from "@/types";
import { useLogout } from "@/hooks/auth/useLogout";

const INIT_VALUES = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
};

function UpdatePasswordForm() {
    const { updatePassword, isPending } = useUpdatePassword();
    const { logout, isLoggingout } = useLogout();
    const [form] = Form.useForm();

    const onFinish: FormProps<IUpdatePassword>["onFinish"] = async (values) => {
        await updatePassword({ values });
        logout();
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name="updatePasswordForm"
            initialValues={INIT_VALUES}
            onFinish={onFinish}
            autoComplete="off"
        >
            <PasswordInput
                name="currentPassword"
                placeholder="Current Password"
            />
            <PasswordInput name="newPassword" placeholder="New Password" />
            <PasswordInput
                name="confirmPassword"
                placeholder="Confirm New Password"
            />

            <AppSubmitBtn
                isLoading={isPending || isLoggingout}
                className="bg-orange-100! text-gray-100! max-w-36!"
            >
                change password
            </AppSubmitBtn>
        </Form>
    );
}

export default UpdatePasswordForm;
