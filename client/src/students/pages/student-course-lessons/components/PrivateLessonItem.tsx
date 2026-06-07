import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { Button, Checkbox } from "antd";

import type { ICourseSectionLesson } from "@/types";
import { formatDuration } from "@/utils/helper";
import { useUpdateLesson } from "@/hooks/courseSectionLessons/useUpdateLesson";

type PrivateLessonItemProps = {
    courseId: string;
    lesson: ICourseSectionLesson;
};

function PrivateLessonItem({ courseId, lesson }: PrivateLessonItemProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { updateLesson, isUpdatingLesson } = useUpdateLesson();

    const currentLessonId = searchParams.get("lessonId");

    const [optimisticIsCompleted, setOptimisticIsCompleted] = useState(
        lesson.isCompleted,
    );

    useEffect(() => {
        setOptimisticIsCompleted(lesson.isCompleted);
    }, [lesson.isCompleted]);

    const handleCheckboxChange = () => {
        const newIsCompleted = !lesson.isCompleted;
        setOptimisticIsCompleted(newIsCompleted);
        updateLesson({
            courseId,
            sectionId: lesson.section_ID,
            lessonId: lesson._id,
            updatedLesson: {
                isCompleted: newIsCompleted,
            },
        });
    };

    return (
        <li key={lesson._id}>
            <Checkbox
                onChange={handleCheckboxChange}
                checked={optimisticIsCompleted}
                className="w-full flex items-center [&_.ant-checkbox-checked]:[&_.ant-checkbox-inner]:bg-orange-100! gap-2 [&_.ant-checkbox-label]:px-0! [&_.ant-checkbox-label]:w-full!"
            >
                <Button
                    type="text"
                    className={`w-full! flex! flex-col! items-start! gap-1! hover:bg-transparent! px-0! ${lesson._id === currentLessonId ? "text-orange-100!" : ""}`}
                    onClick={() => setSearchParams({ lessonId: lesson._id })}
                    disabled={isUpdatingLesson}
                >
                    <span className="hover:text-primary-600">
                        {lesson.title}
                    </span>
                    <span className="text-xs!">
                        {formatDuration(lesson.duration || 0)}
                    </span>
                </Button>
            </Checkbox>
        </li>
    );
}

export default PrivateLessonItem;
