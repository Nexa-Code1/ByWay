import { Link } from "react-router";
import { useState } from "react";
import { StarFilled } from "@ant-design/icons";

import courseImgPlaceholder from "@/assets/images/placeholder_view.svg";
import type { IPurchaseItemCourse } from "@/types";

type CourseItemProps = {
    course: IPurchaseItemCourse;
};

function CourseItem({ course }: CourseItemProps) {
    const [image, setImage] = useState(course.image);

    return (
        <div className="flex gap-4">
            <Link to={`/courses/${course._id}`} className="w-60 h-40">
                <img
                    src={image}
                    onError={() => setImage(courseImgPlaceholder)}
                    alt="course image"
                    className="w-full h-full object-cover object-center"
                />
            </Link>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <StarFilled className="text-warning-500!" />
                    <span>{course.rate}</span>
                </div>
                <Link
                    to={`/courses/${course._id}`}
                    className="font-semibold text-gray-800! flex-1"
                >
                    {course.title}
                </Link>
                <p className="text-sm text-gray-500">
                    Course by:{" "}
                    <span className="text-gray-600 font-medium">
                        {course.instructor.firstName}{" "}
                        {course.instructor.lastName}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default CourseItem;
