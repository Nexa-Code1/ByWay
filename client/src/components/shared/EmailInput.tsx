import { Form, Input } from "antd";

function EmailInput() {
    return (
        <Form.Item
            name="email"
            rules={[
                { required: true, message: "Please input your email!" },
                {
                    type: "email",
                    message: "Please enter a valid email address!",
                },
            ]}
            className="mb-4!"
        >
            <Input placeholder="Email" className="bg-gray-100! border-0!" />
        </Form.Item>
    );
}

export default EmailInput;
