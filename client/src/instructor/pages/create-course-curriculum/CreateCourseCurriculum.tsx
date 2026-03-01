import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "antd";
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

import SortableCourseSection from "./components/SortableCourseSection";
import type { ICourseContent, ICourseSectionLesson } from "@/types";
import { useNewCourseContext } from "@/instructor/context/NewCourseContext";
import FormActions from "@/instructor/components/common/FormActions";
import { useCreateNewCourse } from "@/hooks/courses/useCreateNewCourse";
import { useUpdateCourse } from "@/hooks/courses/useUpdateCourse";

function CreateCourseCurriculum() {
    const navigate = useNavigate();
    const {
        state,
        addSection,
        hasBasicInfo,
        reorderCourseContent,
        setEditMode,
        resetCourse,
    } = useNewCourseContext();

    const { createNewCourse, isCreatingNewCourse } = useCreateNewCourse();
    const { updateCourse, isUpdatingCourse } = useUpdateCourse();

    // Setup sensors for drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    useEffect(() => {
        if (!hasBasicInfo) {
            navigate("/instructor/create-course/basic-information");
            return;
        }
    }, [hasBasicInfo]);

    // Handle drag end event
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = state.courseContent.findIndex(
                (item) => item._id === active.id,
            );
            const newIndex = state.courseContent.findIndex(
                (item) => item._id === over?.id,
            );

            if (oldIndex !== -1 && newIndex !== -1) {
                const reorderedContent = arrayMove(
                    state.courseContent,
                    oldIndex,
                    newIndex,
                );
                reorderCourseContent(reorderedContent);
            }
        }
    }

    // Function to process lesson data
    function processLesson(lesson: ICourseSectionLesson, sectionId: string) {
        return {
            _id: lesson._id || "",
            section_ID: sectionId,
            title: lesson.title,
            description: lesson.description || "",
            videoUrl: lesson.videoFile
                ? lesson.videoFile.name
                : lesson.link || "",
            duration: lesson.duration || 0,
            isCompleted: false,
        };
    }

    // Process course content to match expected structure
    function processCourseContent(content: ICourseContent[]) {
        return content.map((section) => ({
            section: section.section,
            _id: section._id,
            lessons:
                section.lessons?.length > 0
                    ? section.lessons.map((lesson) =>
                          processLesson(lesson, section._id),
                      )
                    : [],
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const processedContent = processCourseContent(state.courseContent);

        // Collect all video files
        const videoFiles: File[] = [];
        state.courseContent.forEach((section) => {
            if (section.lessons) {
                section.lessons.forEach((lesson) => {
                    if (lesson.videoFile) {
                        videoFiles.push(lesson.videoFile);
                    }
                });
            }
        });

        // Course Data
        const data = new FormData();
        data.append("title", state.title);
        data.append("subTitle", state.subTitle);
        data.append("courseContent", JSON.stringify(processedContent));
        data.append("price", state.price.toString());
        data.append("description", state.description);
        data.append("requirements", JSON.stringify(state.requirements));
        data.append("category", state.category);
        if (state.image) {
            data.append("image", state.image);
        }

        // Add all video files to FormData
        videoFiles.forEach((file) => {
            data.append("videos", file);
        });

        if (state.isEditMode && state.draftCourseId) {
            await updateCourse({
                courseId: state.draftCourseId,
                updatedCourseData: data,
            });
        } else {
            const result = await createNewCourse(data);
            setEditMode(true, result.course._id);
        }

        navigate("/instructor/create-course/publish");
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={state.courseContent.map((item) => item._id)}
                strategy={verticalListSortingStrategy}
            >
                <form onSubmit={handleSubmit} className="mb-8">
                    {state.courseContent?.map(
                        (item: ICourseContent, index: number) => (
                            <SortableCourseSection
                                key={item._id}
                                item={item}
                                index={index}
                            />
                        ),
                    )}

                    <Button
                        className="w-full! bg-amber-50! text-orange-100! font-medium! border-0! mb-6 hover:bg-amber-100! hover:translate-y-0"
                        onClick={addSection}
                        disabled={isCreatingNewCourse || isUpdatingCourse}
                    >
                        Add Sections
                    </Button>

                    {/* Action buttons */}
                    <FormActions
                        isLoading={
                            state.isEditMode
                                ? isUpdatingCourse
                                : isCreatingNewCourse
                        }
                        onCancel={resetCourse}
                        submitLabel={
                            state.isEditMode
                                ? "Update & Continue"
                                : "Save & Continue"
                        }
                    />
                </form>
            </SortableContext>
        </DndContext>
    );
}

export default CreateCourseCurriculum;
