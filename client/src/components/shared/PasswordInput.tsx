import { Form, Input } from "antd";

function PasswordInput() {
    return (
        <Form.Item
            name="password"
            rules={[
                { required: true, message: "Please input your password!" },
                {
                    min: 8,
                    message: "Password must be at least 8 characters long",
                },
            ]}
            className="mb-4!"
        >
            <Input.Password
                placeholder="Password"
                className="bg-gray-100! border-0!"
            />
        </Form.Item>
    );
}

export default PasswordInput;
