import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    DeleteOutlined,
    EditOutlined,
    MenuOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import Input from "antd/es/input/Input";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableLessonElement from "./SortableLessonElement";
import InputModal from "./InputModal";
import IconBtn from "@/components/shared/IconBtn";
import type { ICourseContent } from "@/types";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import placeholderVideo from "@/assets/videos/placeholder-video.mp4";
import { generateObjectId, videoUrlToFile } from "@/utils/helper";
import { useNewCourseContext } from "@/instructor/context/NewCourseContext";

type SortableCourseSectionProps = {
    index: number;
    item: ICourseContent;
};

function SortableCourseSection({ item, index }: SortableCourseSectionProps) {
    const { deleteSection, updateSection, addLesson, reorderLessons } =
        useNewCourseContext();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    // Setup sensors for lesson drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    // Handle lesson drag end event
    function handleLessonDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = item.lessons.findIndex(
                (lesson) => lesson._id === active.id,
            );
            const newIndex = item.lessons.findIndex(
                (lesson) => lesson._id === over?.id,
            );

            if (oldIndex !== -1 && newIndex !== -1) {
                const reorderedLessons = arrayMove(
                    item.lessons,
                    oldIndex,
                    newIndex,
                );
                reorderLessons(item._id, reorderedLessons);
            }
        }
    }

    const [newSectionName, setNewSectionName] = useState("");

    function handleOk() {
        updateSection(item._id, newSectionName);
        setNewSectionName("");
    }

    async function handleAddNewLesson() {
        const videoFile = await videoUrlToFile(placeholderVideo);
        addLesson(item._id, {
            _id: generateObjectId(),
            section_ID: item._id,
            title: "New Lesson",
            description: "",
            isCompleted: false,
            link: videoFile,
            duration: 0,
        });
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="mb-4 bg-gray-100 p-4 text-sm"
        >
            <div className="flex items-center gap-2">
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing"
                >
                    <MenuOutlined />
                </div>
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
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleLessonDragEnd}
                >
                    <SortableContext
                        items={item.lessons.map((lesson) => lesson._id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <ol className="flex flex-col gap-3 mt-4">
                            {item.lessons.map((lesson) => (
                                <SortableLessonElement
                                    key={lesson._id}
                                    lesson={lesson}
                                    sectionId={item._id}
                                />
                            ))}
                        </ol>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    );
}

export default SortableCourseSection;
