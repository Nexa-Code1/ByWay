import { Form, Input } from "antd";

type PasswordInputProps = {
    name?: string;
    placeholder?: string;
};

function PasswordInput({
    name = "password",
    placeholder = "Password",
}: PasswordInputProps) {
    return (
        <Form.Item
            name={name}
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
                placeholder={placeholder}
                className="bg-gray-100! border-0!"
            />
        </Form.Item>
    );
}

export default PasswordInput;
