import { useState } from "react";
import {
    DeleteOutlined,
    EditOutlined,
    MenuOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import LessonElement from "./LessonElement";
import InputModal from "./InputModal";
import IconBtn from "@/components/shared/IconBtn";
import type { ICourseContent } from "@/types";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { generateObjectId } from "@/utils/helper";
import { useNewCourseContext } from "@/instructor/context/NewCourseContext";

type CourseSectionProps = {
    index: number;
    item: ICourseContent;
};

function CourseSection({ item, index }: CourseSectionProps) {
    const { deleteSection, updateSection, addLesson } = useNewCourseContext();

    const [newSectionName, setNewSectionName] = useState("");

    function handleOk() {
        updateSection(item._id, newSectionName);
        setNewSectionName("");
    }

    async function handleAddNewLesson() {
        addLesson(item._id, {
            _id: generateObjectId(),
            section_ID: item._id,
            title: "New Lesson",
            description: "",
            isCompleted: false,
            link: "",
            duration: 0,
        });
    }

    return (
        <div className="mb-4 bg-gray-100 p-4 text-sm">
            <div className="flex items-center gap-2">
                <MenuOutlined />
                <h3 className="flex-1 flex items-center gap-2">
                    <span className="font-medium">
                        Section {(index + 1).toString().padStart(2, "0")}:
                    </span>
                    <span>{item.section}</span>
                </h3>
                <div className="flex items-center">
                    <IconBtn onClick={handleAddNewLesson}>
                        <PlusOutlined />
                    </IconBtn>

                    <InputModal
                        onOk={handleOk}
                        icon={<EditOutlined />}
                        modalTitle="Edit Section Name"
                    >
                        <p className="mb-2 pt-4 border-t border-t-gray-200">
                            Section
                        </p>
                        <Input
                            placeholder="Write Your Section Name Here..."
                            onChange={(e) => setNewSectionName(e.target.value)}
                        />
                    </InputModal>

                    <ConfirmationModal
                        triggerBtnType="text"
                        triggerBtnStyles="bg-transparent! border-0! shadow-none! hover:text-orange-100! text-base!"
                        triggerBtnLabel={<DeleteOutlined />}
                        onConfirm={() => deleteSection(item._id)}
                    />
                </div>
            </div>

            {item.lessons.length > 0 && (
                <ol className="flex flex-col gap-3 mt-4">
                    {item.lessons.map((lesson) => (
                        <LessonElement
                            key={lesson._id}
                            lesson={lesson}
                            sectionId={item._id}
                        />
                    ))}
                </ol>
            )}
        </div>
    );
}

export default CourseSection;
