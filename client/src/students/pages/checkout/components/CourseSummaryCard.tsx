import { useState } from "react";

import type { ICourseCart } from "@/types";
import imagePlaceholder from "@/assets/images/placeholder_view.svg";
import { calcPriceAfterDiscount } from "@/utils/helper";

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
                <div className="flex items-center gap-2">
                    <p className="font-medium text-lg">
                        {calcPriceAfterDiscount(course.price, course.discount)}{" "}
                        EGP
                    </p>
                    {course.discount !== 0 && (
                        <p className="text-sm line-through text-gray-500">
                            {course.price} EGP
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseSummaryCard;
