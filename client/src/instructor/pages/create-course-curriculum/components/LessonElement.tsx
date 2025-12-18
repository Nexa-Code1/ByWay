import { DeleteOutlined, DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space, type MenuProps } from "antd";

import type { ICourseLessonUpdatedData, ICourseSectionLesson } from "@/types";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { useUpdateLesson } from "@/hooks/courseSectionLessons/useUpdateLesson";
import { useDeleteLesson } from "@/hooks/courseSectionLessons/useDeleteLesson";
import Spinner from "@/components/shared/Spinner";
import UploadLessonVideo from "./UploadLessonVideo";
import UpdateLessonDescription from "./UpdateLessonDescription";
import UpdateLessonTitle from "./UpdateLessonTitle";

type LessonElementProps = {
    lesson: ICourseSectionLesson;
    courseId: string;
    sectionId: string;
};

function LessonElement({ lesson, courseId, sectionId }: LessonElementProps) {
    const { updateLesson, isUpdatingLesson } = useUpdateLesson();
    const { deleteLesson, isDeletingLesson } = useDeleteLesson();

    function handleOk(updatedProp: ICourseLessonUpdatedData) {
        updateLesson({
            courseId,
            sectionId,
            lessonId: lesson._id,
            updatedLesson: { ...lesson, ...updatedProp },
        });
    }

    const items: MenuProps["items"] = [
        {
            label: (
                <UploadLessonVideo
                    onOk={handleOk}
                    isUpdatingLesson={isUpdatingLesson}
                />
            ),
            key: "0",
        },
        {
            label: (
                <UpdateLessonDescription
                    onOk={handleOk}
                    isUpdatingLesson={isUpdatingLesson}
                />
            ),
            key: "1",
        },
    ];

    return (
        <li className="bg-white p-4 flex items-center gap-2">
            <MenuOutlined />
            <span className="flex-1">{lesson.title}</span>

            <Dropdown menu={{ items }} trigger={["click"]}>
                <a
                    onClick={(e) => e.preventDefault()}
                    className="cursor-pointer bg-amber-50 px-3 py-2 text-orange-100 font-medium hover:bg-amber-100"
                >
                    <Space>
                        Contents
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>

            <UpdateLessonTitle
                onOk={handleOk}
                isUpdatingLesson={isUpdatingLesson}
            />

            <ConfirmationModal
                triggerBtnType="text"
                triggerBtnStyles="bg-transparent! border-0! shadow-none! p-2! hover:text-orange-100! text-base!"
                triggerBtnLabel={
                    isDeletingLesson ? (
                        <Spinner size="small" className="text-black!" />
                    ) : (
                        <DeleteOutlined />
                    )
                }
                onConfirm={() => deleteLesson({ lessonId: lesson._id })}
            />
        </li>
    );
}

export default LessonElement;
