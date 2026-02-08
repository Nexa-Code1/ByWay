import imgPlaceholder from "@/assets/images/placeholder_view.svg";
import type { ICourse } from "@/types";
import { StarFilled, UserOutlined } from "@ant-design/icons";
import CourseControlMenu from "./CourseControlMenu";

type InstructorCourseCardProps = {
    course: ICourse;
};

function InstructorCourseCard({ course }: InstructorCourseCardProps) {
    return (
        <div className="flex flex-col shadow-lg overflow-hidden">
            <div className="w-full h-30 overflow-hidden">
                <img
                    src={course.image || imgPlaceholder}
                    alt={course.title}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="p-4 flex-1">
                <p className="w-fit p-1 font-medium text-xs bg-primary-100 text-primary-700">
                    {course.category.name.en}
                </p>
                <p className="mt-2 font-medium">{course.title}</p>
            </div>

            <div className="flex items-center gap-1 p-4 border-y border-gray-200 text-gray-600 text-sm font-medium">
                <StarFilled className="text-yellow-500!" />
                <span className="flex-1">{course.rate.toFixed(1)}</span>
                <UserOutlined className="text-primary-500!" />
                <span>{course.students.length}</span>
                <span className="text-gray-400 font-light text-xs">
                    Students
                </span>
            </div>

            <div className="p-4 flex items-center justify-between gap-2">
                <div className="flex gap-2 items-center">
                    <span className="font-semibold text-orange-100">
                        {course.price - course.discount}EGP
                    </span>

                    {course.discount !== 0 && (
                        <span className="line-through text-gray-300 text-sm">
                            {course.price}EGP
                        </span>
                    )}
                </div>

                <CourseControlMenu courseId={course._id} />
            </div>
        </div>
    );
}

export default InstructorCourseCard;
