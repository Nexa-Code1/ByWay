import { useSearchParams } from "react-router";

import { useGetInstructorCourses } from "@/hooks/courses/useGetInstructorCourses";
import type { ICourseDetails } from "@/types";
import InstructorCourseItem from "./InstructorCourseItem";
import CoursesBlogsLayout from "./CoursesBlogsLayout";
import ItemsPagination from "@/components/shared/ItemsPagination";

type InstructorCoursesProps = {
    instructorId: string;
};

function InstructorCourses({ instructorId }: InstructorCoursesProps) {
    const [searchParams] = useSearchParams();

    const { instructorCourses, isLoading, error } = useGetInstructorCourses({
        status: "",
        page: Number(searchParams.get("page")) || 1,
        instructorId,
    });

    return (
        <CoursesBlogsLayout
            isLoading={isLoading}
            isError={Boolean(!isLoading && (error || !instructorCourses))}
            count={instructorCourses?.pagination?.total}
            title="Courses"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {instructorCourses?.courses?.map((course: ICourseDetails) => (
                    <InstructorCourseItem course={course} key={course._id} />
                ))}
            </div>
            <ItemsPagination pagination={instructorCourses?.pagination} />
        </CoursesBlogsLayout>
    );
}

export default InstructorCourses;
