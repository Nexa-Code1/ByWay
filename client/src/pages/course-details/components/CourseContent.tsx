import { Collapse } from "antd";
import { PlaySquareOutlined } from "@ant-design/icons";

import CourseDetailWrapper from "./CourseDetailWrapper";
import type { ICourseContent } from "@/types";
import { formatDuration } from "@/utils/helper";

type CourseContentProps = {
    content: ICourseContent[];
};

function CourseContent({ content }: CourseContentProps) {
    const items = content.map((el) => {
        const totalDuration = (
            el.lessons.reduce(
                (totalDuration, lesson) => (totalDuration += lesson.duration),
                0
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
                    {el.lessons.map((lesson) => (
                        <li
                            key={lesson._id}
                            className="flex items-center justify-between gap-2"
                        >
                            <PlaySquareOutlined />
                            <p className="flex-1">{lesson.title}</p>
                            <p>{formatDuration(lesson.duration)}</p>
                        </li>
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
