import { Collapse } from "antd";
import { PlaySquareOutlined } from "@ant-design/icons";

import CourseDetailWrapper from "./CourseDetailWrapper";

const DUMMY_CONTENT = [
    {
        _id: "1",
        section: "The internals of node",
        lectures: 22,
        duration: 350,
        lessons: [
            { _id: "1", name: "How to Get Help", duration: "02:10" },
            {
                _id: "2",
                name: "Starting With Node Internals",
                duration: "02:10",
            },
            { _id: "3", name: "Module Implementations", duration: "02:10" },
        ],
    },
    {
        _id: "2",
        section: "Enchancing node performance",
        lectures: 15,
        duration: 210,
        lessons: [
            { _id: "1", name: "How to Get Help", duration: "02:10" },
            {
                _id: "2",
                name: "Starting With Node Internals",
                duration: "02:10",
            },
            { _id: "3", name: "Module Implementations", duration: "02:10" },
        ],
    },
    {
        _id: "3",
        section: "Project setup",
        lectures: 26,
        duration: 370,
        lessons: [
            { _id: "1", name: "How to Get Help", duration: "02:10" },
            {
                _id: "2",
                name: "Starting With Node Internals",
                duration: "02:10",
            },
            { _id: "3", name: "Module Implementations", duration: "02:10" },
        ],
    },
    {
        _id: "4",
        section: "Data caching",
        lectures: 19,
        duration: 260,
        lessons: [
            { _id: "1", name: "How to Get Help", duration: "02:10" },
            {
                _id: "2",
                name: "Starting With Node Internals",
                duration: "02:10",
            },
            { _id: "3", name: "Module Implementations", duration: "02:10" },
        ],
    },
];

function CourseContent({ content }) {
    const items = DUMMY_CONTENT.map((el) => ({
        key: el._id,
        label: (
            <div className="flex items-center justify-between">
                <p className="font-semibold text-base">{el.section}</p>
                <p className="text-gray-600">
                    {el.lectures} lectures - {el.duration} min
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
                        <p className="flex-1">{lesson.name}</p>
                        <p>{lesson.duration}</p>
                    </li>
                ))}
            </ol>
        ),
    }));

    return (
        <CourseDetailWrapper title="Course content">
            <Collapse items={items} />
        </CourseDetailWrapper>
    );
}

export default CourseContent;
