import { useState } from "react";

import StarsRate from "@/components/shared/StarsRate";
import type { ICourseCart } from "@/types";
import placeholderView from "@/assets/images/placeholder_view.svg";
import CourseCartItemsActions from "./CourseCartItemsActions";

type CourseCartItemProps = {
    course: ICourseCart;
};

function CourseCartItem({ course }: CourseCartItemProps) {
    const [prevImg, setPrevImg] = useState(
        course.previewImg || placeholderView
    );

    return (
        <li key={course._id} className="flex items-start gap-4">
            <div className="w-50 h-30 rounded-lg overflow-hidden">
                <img
                    src={prevImg}
                    alt={course.title}
                    onError={() => setPrevImg(placeholderView)}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="flex-1 flex flex-col gap-2">
                <h2 className="font-semibold">{course.title}</h2>
                <p className="text-sm">
                    By {course.instructor.firstName}{" "}
                    {course.instructor.lastName}
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-warning-500 text-sm">
                        {course.rate.toFixed(1)}
                    </span>
                    <StarsRate rate={course.rate} />
                </div>
                <CourseCartItemsActions course={course} />
            </div>

            <p className="font-semibold text-primary-500 text-xl">
                {course.price.toFixed(2)} EGP
            </p>
        </li>
    );
}

export default CourseCartItem;
