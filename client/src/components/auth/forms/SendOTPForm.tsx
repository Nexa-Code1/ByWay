import { Form, type FormProps } from "antd";

import EmailInput from "@/components/shared/EmailInput";
import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import { useSendOTP } from "@/hooks/auth/useSendOTP";
import type { ISendOTP } from "@/types";

const initialValues: ISendOTP = { email: "" };

function SendOTPForm() {
    const [form] = Form.useForm();
    const { sendOTP, isSendingOTP } = useSendOTP();

    const onFinish: FormProps<ISendOTP>["onFinish"] = async (values) => {
        await sendOTP(values);
        form.resetFields();
    };

    return (
        <Form
            name="sendOTPForm"
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            initialValues={initialValues}
        >
            <EmailInput />
            <AppSubmitBtn isLoading={isSendingOTP}>send code</AppSubmitBtn>
        </Form>
    );
}

export default SendOTPForm;
