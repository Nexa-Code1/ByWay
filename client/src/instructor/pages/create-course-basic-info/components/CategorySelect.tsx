import { Form, Select } from "antd";

import type { ICourseDataBasicInfo, ICategory } from "@/types";
import { useGetAllCategories } from "@/hooks/categories/useGetAllCategories";

function CategorySelect() {
    const { categories, isLoading, error } = useGetAllCategories();

    return (
        <Form.Item<ICourseDataBasicInfo>
            name="category"
            rules={[
                {
                    required: true,
                    message: "Please select course category!",
                },
            ]}
            label="Category"
            className="col-span-2"
        >
            <Select
                placeholder="Select Course Category"
                options={
                    isLoading || error || !categories
                        ? []
                        : categories.categories.map((c: ICategory) => ({
                              label: c.name.en,
                              value: c._id,
                          }))
                }
            />
        </Form.Item>
    );
}

export default CategorySelect;
