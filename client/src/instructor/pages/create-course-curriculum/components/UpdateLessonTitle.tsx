import { useState, useEffect } from "react";
import Input from "antd/es/input/Input";
import { EditOutlined } from "@ant-design/icons";

import InputModal from "./InputModal";
import type { ICourseLessonUpdatedData } from "@/types";

type UpdateLessonTitleProps = {
    onOk(updatedProp: ICourseLessonUpdatedData): void;
    lessonTitle: string;
};

function UpdateLessonTitle({ onOk, lessonTitle }: UpdateLessonTitleProps) {
    const [newLessonName, setNewLessonName] = useState(lessonTitle);

    useEffect(() => {
        setNewLessonName(lessonTitle);
    }, [lessonTitle]);

    return (
        <InputModal
            onOk={() => onOk({ title: newLessonName })}
            icon={<EditOutlined />}
            modalTitle="Edit Lesson Name"
        >
            <p className="mb-2 pt-4 border-t border-t-gray-200">Lesson</p>
            <Input
                placeholder="Write Your Lesson Name Here..."
                onChange={(e) => setNewLessonName(e.target.value)}
                value={newLessonName}
            />
        </InputModal>
    );
}

export default UpdateLessonTitle;
