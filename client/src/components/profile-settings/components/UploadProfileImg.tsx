import { useState, type Dispatch, type SetStateAction } from "react";
import { Button, message, Upload } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

import { fileToBase64 } from "@/utils/helper";
import userPlaceholderImg from "@/assets/images/user-placeholder.png";
import { useDeleteProfileImg } from "@/hooks/user/useDeleteProfileImg";
import Spinner from "@/components/shared/Spinner";
import ConfirmationModal from "@/components/shared/ConfirmationModal";

type UploadProfileImgProps = {
    userImage: string;
    onSetFile: Dispatch<SetStateAction<File | null>>;
};

function UploadProfileImg({ userImage, onSetFile }: UploadProfileImgProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // for UI preview
    const { deleteProfileImg, isPending: isDeletingImg } =
        useDeleteProfileImg();

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
        setPreviewUrl(base64);

        // stop uploading (default behaviour of Ant Design Upload component)
        return false;
    };

    function handleDeleteImage() {
        onSetFile(null);
        setPreviewUrl(null);
        deleteProfileImg();
    }

    return (
        <div className="max-w-52 sm:max-w-40 md:max-w-52 p-4 md:p-6 box-content border text-white self-center sm:self-start relative">
            {userImage && (
                <ConfirmationModal
                    triggerBtnType="text"
                    triggerBtnStyles="absolute! z-30! left-8! hover:text-error-800! text-lg! text-gray-100! p-2! mt-2 shadow-lg! before:w-full before:h-full before:absolute before:bottom-0 before:bg-black before:opacity-30 before:-z-10"
                    triggerBtnLabel={
                        isDeletingImg ? (
                            <Spinner
                                className="text-primary-700"
                                size="small"
                            />
                        ) : (
                            <DeleteOutlined />
                        )
                    }
                    onConfirm={handleDeleteImage}
                />
            )}
            <Upload
                name="image"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={handleBeforeUpload}
                className="[&_.ant-upload]:w-fit! [&_.ant-upload]:h-fit! [&_.ant-upload]:flex-col [&_.ant-upload]:border-0! [&_.ant-upload]:bg-transparent!"
            >
                <div className="relative w-full aspect-square">
                    <img
                        draggable={false}
                        src={previewUrl || userImage || userPlaceholderImg}
                        alt="user profile image"
                        className="w-full h-full aspect-square object-cover object-center"
                    />
                    <Button
                        type="text"
                        className="absolute! bottom-0! left-0! right-0 bg-transparent! text-gray-100! before:w-full before:h-10 before:absolute before:bottom-0 before:bg-black before:opacity-30"
                    >
                        <UploadOutlined className="relative z-10" />
                        <p className="relative z-10">Upload Photo</p>
                    </Button>
                </div>
            </Upload>
            <p className="text-sm text-gray-400 mt-6 text-center">
                Image size should be under 2MB and image ration needs to be 1:1
            </p>
        </div>
    );
}

export default UploadProfileImg;
