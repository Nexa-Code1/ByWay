import { Collapse } from "antd";

import CourseDetailWrapper from "./CourseDetailWrapper";
import type { ICourseContent } from "@/types";
import LessonItem from "./LessonItem";

type CourseContentProps = {
    content: ICourseContent[];
};

function CourseContent({ content }: CourseContentProps) {
    const items = content.map((el) => {
        const totalDuration = Math.round(
            el.lessons.reduce(
                (totalDuration, lesson) => (totalDuration += lesson.duration),
                0,
            ) / 60,
        );

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
                    {el.lessons.map((lesson, index) => (
                        <LessonItem
                            key={lesson._id}
                            lesson={lesson}
                            index={index}
                        />
                    ))}
                </ol>
            ),
        };
    });

    return (
        <CourseDetailWrapper title="Course content">
            <Collapse items={items} />
        </CourseDetailWrapper>
    );
}

export default CourseContent;
