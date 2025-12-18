import { useState } from "react";
import Input from "antd/es/input/Input";
import { EditOutlined } from "@ant-design/icons";

import Spinner from "@/components/shared/Spinner";
import InputModal from "./InputModal";
import type { ICourseLessonUpdatedData } from "@/types";

type UpdateLessonTitleProps = {
    onOk(updatedProp: ICourseLessonUpdatedData): void;
    isUpdatingLesson: boolean;
};

function UpdateLessonTitle({ onOk, isUpdatingLesson }: UpdateLessonTitleProps) {
    const [newLessonName, setNewLessonName] = useState("");

    return (
        <InputModal
            onOk={() => onOk({ title: newLessonName })}
            icon={
                isUpdatingLesson ? (
                    <Spinner size="small" className="text-black!" />
                ) : (
                    <EditOutlined />
                )
            }
            modalTitle="Edit Lesson Name"
        >
            <p className="mb-2 pt-4 border-t border-t-gray-200">Lesson</p>
            <Input
                placeholder="Write Your Lesson Name Here..."
                onChange={(e) => setNewLessonName(e.target.value)}
            />
        </InputModal>
    );
}

export default UpdateLessonTitle;
