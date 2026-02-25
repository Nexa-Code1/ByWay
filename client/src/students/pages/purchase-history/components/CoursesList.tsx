import type { IPurchaseItemCourse } from "@/types";
import CourseItem from "./CourseItem";

type CoursesListProps = {
    courses: IPurchaseItemCourse[];
};

function CoursesList({ courses }: CoursesListProps) {
    return (
        <div className="space-y-4">
            {courses.map((course: IPurchaseItemCourse) => (
                <CourseItem key={course._id} course={course} />
            ))}
        </div>
    );
}

export default CoursesList;
