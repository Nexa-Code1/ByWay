import { Form, Input, type FormProps } from "antd";
import { MailOutlined } from "@ant-design/icons";

import type { IContactUs } from "@/types";
import EmailInput from "@/components/shared/EmailInput";
import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import TextArea from "antd/es/input/TextArea";

const initialValues: IContactUs = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
};

function ContactForm() {
    const [form] = Form.useForm();

    const onFinish: FormProps<IContactUs>["onFinish"] = async (values) => {
        console.log(values);
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name="contactUsForm"
            onFinish={onFinish}
            autoComplete="off"
            initialValues={initialValues}
        >
            <div className="mb-6 flex items-center justify-between">
                <h2 className="font-medium">Send a message</h2>
                <MailOutlined className="text-gray-500!" />
            </div>

            <div className="w-full flex gap-4">
                <Form.Item<IContactUs>
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

                <Form.Item<IContactUs>
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

            <Form.Item<IContactUs>
                name="message"
                rules={[
                    {
                        required: true,
                        message: "Please input your message!",
                    },
                ]}
                className="w-full mb-4!"
            >
                <TextArea
                    placeholder="Your message"
                    className="bg-gray-100! border-0! min-h-40!"
                />
            </Form.Item>

            <AppSubmitBtn
                isLoading={false}
                className="bg-orange-100! text-gray-100! border-0! hover:border-0!"
            >
                Send Message
            </AppSubmitBtn>
        </Form>
    );
}

export default ContactForm;
