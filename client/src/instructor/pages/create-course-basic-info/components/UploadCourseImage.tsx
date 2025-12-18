import { type Dispatch, type SetStateAction } from "react";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fileToBase64 } from "@/utils/helper";

import placeholderImg from "@/assets/images/placeholder_view.svg";

type UploadCourseImageProps = {
    onSetFile: Dispatch<SetStateAction<File | null>>;
    previewUrl: string | null;
    onSetPreviewUrl: Dispatch<SetStateAction<string | null>>;
};

function UploadCourseImage({
    onSetFile,
    previewUrl,
    onSetPreviewUrl,
}: UploadCourseImageProps) {
    const handleBeforeUpload = async (file: File) => {
        // validate type => jpg or png only
        const valid = file.type === "image/jpeg" || file.type === "image/png";
        if (!valid) {
            message.error("Only JPG/PNG images are allowed.");
            return;
        }

        // validate size max 2MB
        const isUnder2MB = file.size && file.size / 1024 / 1024 < 2;
        if (!isUnder2MB) {
            message.error("Image must be smaller than 2MB.");
            return;
        }

        // hold file for later upload
        onSetFile(file);

        // convert to base64 for preview
        const base64 = await fileToBase64(file);
        onSetPreviewUrl(base64);

        // stop uploading (default behaviour of Ant Design Upload component)
        return false;
    };

    return (
        <div className="my-6">
            <h2 className="mb-2">Course Thumbnail:</h2>
            <div className="flex items-center gap-4">
                <div className="max-w-50">
                    <img
                        draggable={false}
                        src={previewUrl || placeholderImg}
                        alt="user profile image"
                        className="w-full h-full aspect-video object-cover object-center"
                    />
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
        </div>
    );
}

export default UploadCourseImage;
