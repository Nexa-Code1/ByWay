import { Form, Input, Select } from "antd";
import Editor from "react-simple-wysiwyg";

import type { ICategory } from "@/types";

type BlogBasicInfoProps = {
    categories: ICategory[] | undefined;
    categoriesLoading: boolean;
};

function BlogBasicInfo({ categories, categoriesLoading }: BlogBasicInfoProps) {
    return (
        <div className="space-y-4">
            {/* Blog Title */}
            <Form.Item
                name="title"
                label="Blog Title"
                rules={[
                    { required: true, message: "Please enter blog title!" },
                    { min: 5, message: "Title must be at least 5 characters" },
                    { max: 100, message: "Title cannot exceed 100 characters" },
                ]}
            >
                <Input
                    placeholder="Enter an engaging title for your blog"
                    size="large"
                />
            </Form.Item>

            {/* Blog Description */}
            <Form.Item
                name="description"
                label="Blog Description"
                rules={[
                    {
                        required: true,
                        message: "Please enter blog description!",
                    },
                    {
                        min: 10,
                        message: "Description must be at least 10 characters",
                    },
                    {
                        max: 500,
                        message: "Description cannot exceed 500 characters",
                    },
                ]}
            >
                <Input.TextArea
                    placeholder="Write a brief description of your blog content"
                    rows={4}
                    showCount
                    maxLength={500}
                />
            </Form.Item>

            {/* Category Selection */}
            <Form.Item
                name="category"
                label="Category"
                rules={[
                    { required: true, message: "Please select a category!" },
                ]}
            >
                <Select
                    placeholder="Select blog category"
                    loading={categoriesLoading}
                    size="large"
                >
                    {categories?.map((category: ICategory) => (
                        <Select.Option key={category._id} value={category._id}>
                            {category.name.en}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            {/* Blog Content */}
            <Form.Item
                name="content"
                label="Blog Content"
                rules={[
                    { required: true, message: "Please enter blog content!" },
                ]}
            >
                <Editor
                    placeholder="Add your blog content here..."
                    className="h-96"
                />
            </Form.Item>
        </div>
    );
}

export default BlogBasicInfo;
