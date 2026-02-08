import { Upload, message, Button, Form } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { fileToBase64, imageValidation } from "@/utils/helper";

type BlogImageUploadProps = {
    previewUrl: string | null;
    setPreviewUrl: (url: string | null) => void;
    setImageFile: (file: File | null) => void;
};

function BlogImageUpload({
    previewUrl,
    setPreviewUrl,
    setImageFile,
}: BlogImageUploadProps) {
    const handleBeforeUpload = async (file: File) => {
        // Validate file
        imageValidation({ file, fileSize: "5MB" });

        // Hold file for later upload
        setImageFile(file);

        // Convert to base64 for preview
        try {
            const base64 = await fileToBase64(file);
            setPreviewUrl(base64);
        } catch {
            message.error("Failed to process image");
            return false;
        }

        // Prevent automatic upload
        return false;
    };

    const handleDelete = () => {
        setImageFile(null);
        setPreviewUrl(null);
    };

    const uploadProps = {
        name: "image",
        multiple: false,
        accept: "image/*",
        beforeUpload: handleBeforeUpload,
        showUploadList: false,
    };

    return (
        <Form.Item
            name="blogImage"
            label={
                <p>
                    <span className="text-red-500">* </span>
                    <span>Blog Image</span>
                </p>
            }
            rules={[
                {
                    validator: () => {
                        if (previewUrl) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            new Error("Please enter blog image!"),
                        );
                    },
                },
            ]}
            className="space-y-2"
        >
            <div className="w-full h-90">
                {previewUrl ? (
                    <div className="w-full h-full relative group">
                        <img
                            draggable={false}
                            src={previewUrl}
                            alt="Blog preview"
                            className="w-full h-full object-cover rounded-lg border"
                        />

                        {/* Delete button overlay */}
                        {previewUrl && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                <Button
                                    icon={<DeleteOutlined />}
                                    onClick={handleDelete}
                                    className="bg-transparent text-white border-0 hover:text-red-400"
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-full">
                        <Upload.Dragger {...uploadProps} className="p-6">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined className="text-orange-100! text-3xl" />
                            </p>
                            <p className="ant-upload-text text-base">
                                Click or drag image file to this area to upload
                            </p>
                            <p className="ant-upload-hint text-sm">
                                Support for single image upload. JPG, PNG, GIF
                                files recommended. Maximum file size: 5MB
                            </p>
                        </Upload.Dragger>
                    </div>
                )}
            </div>
        </Form.Item>
    );
}

export default BlogImageUpload;
