import { Collapse, Progress } from "antd";

import CourseDetailWrapper from "@/pages/course-details/components/CourseDetailWrapper";
import type { ICourseContent } from "@/types";
import PrivateLessonItem from "@/students/pages/student-course-lessons/components/PrivateLessonItem";
import PublicLessonItem from "@/pages/course-details/components/PublicLessonItem";

type CourseContentProps = {
    courseId: string;
    content: ICourseContent[];
    isPublic: boolean;
    progress?: number;
};

function CourseContent({
    courseId,
    content,
    isPublic,
    progress,
}: CourseContentProps) {
    const items = content.map((el) => {
        const totalDuration = (
            el.lessons.reduce(
                (totalDuration, lesson) => (totalDuration += lesson.duration),
                0,
            ) / 60
        ).toFixed(1);

        return {
            key: el._id,
            label: (
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-base">{el.section}</p>
                    <p className="text-gray-600">
                        {el.lessons.length} lectures - {totalDuration} min
                    </p>
                </div>
            ),
            children: (
                <ol className="flex flex-col gap-4 text-gray-600">
                    {el.lessons.map((lesson, index) =>
                        isPublic ? (
                            <PublicLessonItem
                                key={lesson._id}
                                lesson={lesson}
                                index={index}
                            />
                        ) : (
                            <PrivateLessonItem
                                courseId={courseId}
                                key={lesson._id}
                                lesson={lesson}
                            />
                        ),
                    )}
                </ol>
            ),
        };
    });

    return (
        <CourseDetailWrapper title="Course content">
            {!isPublic && progress !== undefined && (
                <div className="mb-4">
                    <p className="mb-2 text-sm font-medium">Your progress</p>
                    <Progress
                        percent={progress}
                        strokeColor="var(--orange-100)"
                    />
                </div>
            )}
            <Collapse items={items} />
        </CourseDetailWrapper>
    );
}

export default CourseContent;
