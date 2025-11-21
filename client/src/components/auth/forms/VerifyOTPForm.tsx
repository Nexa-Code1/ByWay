import { Form, Input, type FormProps } from "antd";

import AppSubmitBtn from "../../shared/AppSubmitBtn";
import { useVerifyOTP } from "../../../hooks/auth/useVerifyOTP";
import type { IVerifyOTP } from "../../../types";

const initialValues: IVerifyOTP = {
    email: "",
    otp: "",
};

function VerifyOTPForm() {
    const [form] = Form.useForm();

    const { verifyOTP, isVerifyingOTP, contextHolder } = useVerifyOTP();

    const onFinish: FormProps<IVerifyOTP>["onFinish"] = async (values) => {
        await verifyOTP(values);
        form.resetFields();
    };

    return (
        <>
            {contextHolder}
            <Form
                name="verifyOTPForm"
                onFinish={onFinish}
                autoComplete="off"
                form={form}
                initialValues={initialValues}
            >
                <Form.Item<IVerifyOTP>
                    name="otp"
                    rules={[{ required: true, message: "Please input code!" }]}
                    className="mb-4!"
                >
                    <Input.OTP className="bg-gray-100! border-0!" />
                </Form.Item>
                <AppSubmitBtn isLoading={isVerifyingOTP}>
                    verify code
                </AppSubmitBtn>
            </Form>
        </>
    );
}

export default VerifyOTPForm;
