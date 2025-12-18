import { useState } from "react";
import { Button, message, Upload } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

import Spinner from "@/components/shared/Spinner";
import InputModal from "./InputModal";
import IconBtn from "@/components/shared/IconBtn";
import type { ICourseLessonUpdatedData } from "@/types";

type UploadLessonVideoProps = {
    onOk(updatedProp: ICourseLessonUpdatedData): void;
    isUpdatingLesson: boolean;
};

function UploadLessonVideo({ onOk, isUpdatingLesson }: UploadLessonVideoProps) {
    const [file, setFile] = useState<File | null>(null);

    async function handleBeforeUpload(file: File) {
        // validate type => jpg or png only
        const valid = file.type === "video/mp4";
        if (!valid) {
            message.error("Only mp4 video is allowed.");
            return;
        }

        // validate size max 2MB
        const isUnder4GB = file.size && file.size / 1024 ** 3 < 4;
        if (!isUnder4GB) {
            message.error("Image must be smaller than 4GB.");
            return;
        }

        // hold file for later upload
        setFile(file);

        // stop uploading (default behaviour of Ant Design Upload component)
        return false;
    }

    return (
        <InputModal
            onOk={() => file !== null && onOk({ link: file })}
            icon={
                isUpdatingLesson ? (
                    <Spinner size="small" className="text-black!" />
                ) : (
                    <p className="text-sm p-0">Upload Video</p>
                )
            }
            modalTitle="Edit Lecture Video"
        >
            <div className="flex gap-2">
                <Upload
                    name="image"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={handleBeforeUpload}
                    className="[&_.ant-upload]:w-fit! [&_.ant-upload]:h-fit! [&_.ant-upload]:border-0! [&_.ant-upload]:bg-transparent!"
                >
                    <Button type="text" className="bg-gray-100!">
                        <UploadOutlined />
                        <p>{file ? "Change Video" : "Upload Video"}</p>
                    </Button>
                </Upload>
                {file && (
                    <div className="flex items-center gap-2">
                        <p>{file.name}</p>
                        <IconBtn onClick={() => setFile(null)}>
                            <DeleteOutlined />
                        </IconBtn>
                    </div>
                )}
            </div>
            <p className="mb-2 pt-4 text-sm">
                <span className="font-medium">Note:</span> All files should be
                less than 4.0 GB.
            </p>
        </InputModal>
    );
}

export default UploadLessonVideo;
