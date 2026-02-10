import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeleteOutlined, DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space, type MenuProps } from "antd";

import type { ICourseLessonUpdatedData, ICourseSectionLesson } from "@/types";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import UploadLessonVideo from "./UploadLessonVideo";
import UpdateLessonDescription from "./UpdateLessonDescription";
import UpdateLessonTitle from "./UpdateLessonTitle";
import { useNewCourseContext } from "@/instructor/context/NewCourseContext";

type SortableLessonElementProps = {
    lesson: ICourseSectionLesson;
    sectionId: string;
};

function SortableLessonElement({ lesson, sectionId }: SortableLessonElementProps) {
    const { deleteLesson, updateLesson } = useNewCourseContext();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: lesson._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    function handleOk(updatedProp: ICourseLessonUpdatedData) {
        updateLesson(sectionId, lesson._id, updatedProp);
    }

    const items: MenuProps["items"] = [
        {
            label: <UploadLessonVideo onOk={handleOk} />,
            key: "0",
        },
        {
            label: <UpdateLessonDescription onOk={handleOk} />,
            key: "1",
        },
    ];

    return (
        <li
            ref={setNodeRef}
            style={style}
            className="bg-white p-4 flex items-center gap-2"
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing"
            >
                <MenuOutlined />
            </div>
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

            <UpdateLessonTitle onOk={handleOk} />

            <ConfirmationModal
                triggerBtnType="text"
                triggerBtnStyles="bg-transparent! border-0! shadow-none! p-2! hover:text-orange-100! text-base!"
                triggerBtnLabel={<DeleteOutlined />}
                onConfirm={() => deleteLesson(sectionId, lesson._id)}
            />
        </li>
    );
}

export default SortableLessonElement;
