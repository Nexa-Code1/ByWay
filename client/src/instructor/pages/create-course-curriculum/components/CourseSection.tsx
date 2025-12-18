import { useState } from "react";
import {
    DeleteOutlined,
    EditOutlined,
    MenuOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import Input from "antd/es/input/Input";

import LessonElement from "./LessonElement";
import InputModal from "./InputModal";
import IconBtn from "@/components/shared/IconBtn";
import type { ICourseContent } from "@/types";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { useDeleteCourseSection } from "@/hooks/courseSections/useDeleteCourseSection";
import { useUpdateCourseSection } from "@/hooks/courseSections/useUpdateCourseSection";
import Spinner from "@/components/shared/Spinner";
import { useCreateLesson } from "@/hooks/courseSectionLessons/useCreateLesson";
import placeholderVideo from "@/assets/videos/placeholder-video.mp4";
import { videoUrlToFile } from "@/utils/helper";

type CourseSectionProps = {
    index: number;
    item: ICourseContent;
    courseId: string;
};

function CourseSection({ item, index, courseId }: CourseSectionProps) {
    const { deleteCourseSection, isDeletingCourseSection } =
        useDeleteCourseSection();
    const { updateCourseSection, isUpdatingCourseSection } =
        useUpdateCourseSection();
    const { createLesson, isCreatingLesson } = useCreateLesson();

    const [newSectionName, setNewSectionName] = useState("");

    function handleOk() {
        updateCourseSection({
            courseId,
            sectionId: item._id,
            section: newSectionName,
        });
        setNewSectionName("");
    }

    function handleDeleteCourseSection() {
        deleteCourseSection({ sectionId: item._id, courseId });
    }

    async function handleAddNewLesson() {
        const videoFile = await videoUrlToFile(placeholderVideo);
        createLesson({
            courseId,
            sectionId: item._id,
            lessonData: {
                link: videoFile,
                title: "New Lesson",
                description: "",
            },
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
                        {isCreatingLesson ? (
                            <Spinner size="small" className="text-black!" />
                        ) : (
                            <PlusOutlined />
                        )}
                    </IconBtn>

                    <InputModal
                        onOk={handleOk}
                        icon={
                            isUpdatingCourseSection ? (
                                <Spinner size="small" className="text-black!" />
                            ) : (
                                <EditOutlined />
                            )
                        }
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
                        triggerBtnLabel={
                            isDeletingCourseSection ? (
                                <Spinner size="small" className="text-black!" />
                            ) : (
                                <DeleteOutlined />
                            )
                        }
                        onConfirm={handleDeleteCourseSection}
                    />
                </div>
            </div>

            {item.lessons.length > 0 && (
                <ol className="flex flex-col gap-3 mt-4">
                    {item.lessons.map((lesson) => (
                        <LessonElement
                            key={lesson._id}
                            lesson={lesson}
                            courseId={courseId}
                            sectionId={item._id}
                        />
                    ))}
                </ol>
            )}
        </div>
    );
}

export default CourseSection;
