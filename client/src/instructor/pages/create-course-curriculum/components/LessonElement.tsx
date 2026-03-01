import { DeleteOutlined, DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space, type MenuProps } from "antd";

import type { ICourseLessonUpdatedData, ICourseSectionLesson } from "@/types";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import UploadLessonVideo from "./UploadLessonVideo";
import UpdateLessonDescription from "./UpdateLessonDescription";
import UpdateLessonTitle from "./UpdateLessonTitle";
import { useNewCourseContext } from "@/instructor/context/NewCourseContext";

type LessonElementProps = {
    lesson: ICourseSectionLesson;
    sectionId: string;
};

function LessonElement({ lesson, sectionId }: LessonElementProps) {
    const { deleteLesson, updateLesson } = useNewCourseContext();

    function handleOk(updatedProp: ICourseLessonUpdatedData) {
        updateLesson(sectionId, lesson._id, updatedProp);
    }

    const items: MenuProps["items"] = [
        {
            label: (
                <UploadLessonVideo
                    onOk={handleOk}
                    sectionId={sectionId}
                    lessonId={lesson._id}
                />
            ),
            key: "0",
        },
        {
            label: <UpdateLessonDescription onOk={handleOk} />,
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

            <UpdateLessonTitle onOk={handleOk} lessonTitle={lesson.title} />

            <ConfirmationModal
                triggerBtnType="text"
                triggerBtnStyles="bg-transparent! border-0! shadow-none! p-2! hover:text-orange-100! text-base!"
                triggerBtnLabel={<DeleteOutlined />}
                onConfirm={() => deleteLesson(sectionId, lesson._id)}
            />
        </li>
    );
}

export default LessonElement;
