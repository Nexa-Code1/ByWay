import { Form, InputNumber } from "antd";

import type { ICourseDataBasicInfo } from "@/types";

function PriceInput() {
    return (
        <Form.Item<ICourseDataBasicInfo>
            name="price"
            rules={[
                {
                    required: true,
                    message: "Please input course price!",
                },
            ]}
            label="Price"
            className="col-span-2"
        >
            <InputNumber className="w-full!" placeholder="Enter price" />
        </Form.Item>
    );
}

export default PriceInput;
