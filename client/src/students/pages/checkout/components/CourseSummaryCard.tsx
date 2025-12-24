import { useState } from "react";

import type { ICourseCart } from "@/types";
import imagePlaceholder from "@/assets/images/placeholder_view.svg";

type CourseSummaryCardProps = {
    course: ICourseCart;
};

function CourseSummaryCard({ course }: CourseSummaryCardProps) {
    const [image, setImage] = useState(course.image || imagePlaceholder);

    return (
        <div className="flex gap-4">
            <div className="w-30">
                <img
                    src={image}
                    alt={course.title}
                    onError={() => setImage(imagePlaceholder)}
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className="max-w-50 text-sm">
                <h3 className="truncate-line">{course.title}</h3>
                <p className="truncate-line text-gray-600 my-1">
                    {course.subTitle}
                </p>
                <p className="font-medium text-lg">{course.price} EGP</p>
            </div>
        </div>
    );
}

export default CourseSummaryCard;
