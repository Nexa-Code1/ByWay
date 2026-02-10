import { useState } from "react";
import TextArea from "antd/es/input/TextArea";

import InputModal from "./InputModal";
import type { ICourseLessonUpdatedData } from "@/types";

type UpdateLessonDescriptionProps = {
    onOk(updatedProp: ICourseLessonUpdatedData): void;
};

function UpdateLessonDescription({ onOk }: UpdateLessonDescriptionProps) {
    const [newLessonDescription, setNewLessonDescription] = useState("");

    return (
        <InputModal
            onOk={() => onOk({ description: newLessonDescription })}
            icon={<p className="text-sm p-0">Description</p>}
            modalTitle="Add Lecture Description"
        >
            <p className="mb-2 pt-4 border-t border-t-gray-200">Description</p>
            <TextArea
                className="min-h-30!"
                placeholder="Write your lecture description here..."
                onChange={(e) => setNewLessonDescription(e.target.value)}
            />
        </InputModal>
    );
}

export default UpdateLessonDescription;
