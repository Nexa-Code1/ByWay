import { Button, Form, Upload } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { fileToBase64, imageValidation } from "@/utils/helper";

import placeholderImg from "@/assets/images/placeholder_view.svg";
import type { ICourseDataBasicInfo } from "@/types";

type CourseImageUploadProps = {
    onSetFile: (file: File | null) => void;
    previewUrl: string | null;
    onSetPreviewUrl: (preview: string | null) => void;
};

function CourseImageUpload({
    onSetFile,
    previewUrl,
    onSetPreviewUrl,
}: CourseImageUploadProps) {
    // Get form instance from context
    const formInstance = Form.useFormInstance();
    const handleBeforeUpload = async (file: File) => {
        try {
            // image validation - this will throw an error if validation fails
            imageValidation({ file });

            // hold file for later upload
            onSetFile(file);

            // convert to base64 for preview
            const base64 = await fileToBase64(file);
            onSetPreviewUrl(base64);

            // Set the form field value to ensure proper validation
            formInstance.setFieldValue("image", file);

            // stop uploading (default behaviour of Ant Design Upload component)
            return false;
        } catch {
            // If validation fails, don't process the file
            return false;
        }
    };

    const handleDelete = () => {
        onSetFile(null);
        onSetPreviewUrl(null);
        // Clear the form field value
        formInstance.setFieldValue("image", null);
    };

    return (
        <Form.Item<ICourseDataBasicInfo>
            name="image"
            label={
                <p>
                    <span className="text-red-500">* </span>
                    <span>Thumbnail</span>
                </p>
            }
            rules={[
                {
                    validator: (_, value) => {
                        // Check if we have either a preview URL (for display) or a file object
                        if (previewUrl || value instanceof File) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            new Error("Please add course thumbnail!"),
                        );
                    },
                },
            ]}
            className="my-6"
        >
            <div className="flex gap-4">
                <div className="relative max-w-50 group">
                    <img
                        draggable={false}
                        src={previewUrl || placeholderImg}
                        alt="user profile image"
                        className="w-full h-full aspect-video object-cover object-center"
                    />

                    {/* Hover Overlay */}
                    {previewUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                            <Button
                                icon={<DeleteOutlined />}
                                onClick={handleDelete}
                                className="bg-transparent! text-white! border-0! text-2xl! hover:text-error-800!"
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-gray-500 font-medium">
                        Upload your course Thumbnail here.
                        <br />
                        <span className="text-primary-700">
                            Important guidelines:
                        </span>
                        <br />
                        1200x800 pixels or 12:8 Ratio. Supported format:
                        <br />
                        <span className="text-primary-700">
                            .jpg, .jpeg, or .png
                        </span>
                    </p>

                    <Upload
                        name="image"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={handleBeforeUpload}
                        className="[&_.ant-upload]:w-fit! [&_.ant-upload]:h-fit! [&_.ant-upload]:flex-col [&_.ant-upload]:border-0! [&_.ant-upload]:bg-transparent!"
                    >
                        <Button
                            type="text"
                            className="text-orange-100! bg-amber-50!"
                        >
                            <UploadOutlined className="relative z-10" />
                            <p className="relative z-10">Upload Photo</p>
                        </Button>
                    </Upload>
                </div>
            </div>
        </Form.Item>
    );
}

export default CourseImageUpload;
