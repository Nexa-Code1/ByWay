import { Form, InputNumber } from "antd";

import type { ICourseDataBasicInfo } from "@/types";

function PriceInput() {
    return (
        <Form.Item<ICourseDataBasicInfo>
            name="price"
            rules={[
                {
                    required: true,
                    message: "Please input your course price in EGP!",
                },
            ]}
            label="Price"
        >
            <InputNumber<number> className="w-full!" />
        </Form.Item>
    );
}

export default PriceInput;
