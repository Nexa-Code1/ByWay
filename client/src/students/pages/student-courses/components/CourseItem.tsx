import { useNavigate } from "react-router";
import { useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { Button, Progress } from "antd";

import type { IStudentCourseItem } from "@/types";
import courseImgPlaceholder from "@/assets/images/placeholder_view.svg";

type CourseItemProps = {
    course: IStudentCourseItem;
};

function CourseItem({ course }: CourseItemProps) {
    const lang = "en";
    const [image, setImage] = useState(course.image);

    const navigate = useNavigate();

    return (
        <div className="border border-gray-300 flex flex-col">
            <img
                src={image}
                alt={course.title}
                onError={() => setImage(courseImgPlaceholder)}
                className="w-full h-40 object-cover object-center mb-2"
            />
            <div className="p-2 text-sm space-y-2 flex-1">
                <p className="space-x-1 text-gray-400">
                    <AppstoreOutlined />
                    <span>{course.category.name[lang]}</span>
                </p>
                <h3 className="font-medium">{course.title}</h3>
            </div>
            <hr className="border-0.5 border-gray-300" />
            <div className="px-2 py-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <Button
                        type="primary"
                        className="p-2! text-xs! bg-orange-100!"
                        onClick={() =>
                            navigate(`/continue-learning/${course._id}`)
                        }
                    >
                        Continue Learning
                    </Button>
                    <p className="text-xs!">{course.progress}% Completed</p>
                </div>
                <Progress
                    percent={course.progress}
                    strokeColor="#52c41a"
                    size="small"
                />
            </div>
        </div>
    );
}

export default CourseItem;
