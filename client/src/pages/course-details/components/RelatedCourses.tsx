import CourseCard from "@/components/shared/CourseCard";
import SectionLayout from "@/components/shared/SectionLayout";
import Spinner from "@/components/shared/Spinner";
import { useGetAllCourses } from "@/hooks/courses/useGetAllCourses";
import type { ICourseDetails } from "@/types";

type RelatedCoursesProps = {
    categorySlug: string;
    courseId: string;
};

function RelatedCourses({ categorySlug, courseId }: RelatedCoursesProps) {
    const { courses, isLoading, error } = useGetAllCourses({
        category: categorySlug,
    });

    if (isLoading)
        return <Spinner size="large" className="w-full! text-primary-700!" />;
    if (!isLoading && (error || !courses || courses?.courses.length <= 1))
        return;

    return (
        <SectionLayout
            title="Related courses"
            linkPath={`/courses?category=${categorySlug}`}
        >
            {courses.courses
                .slice(0, 4)
                .filter((course: ICourseDetails) => course._id !== courseId)
                .map((course: ICourseDetails) => (
                    <CourseCard course={course} key={course._id} />
                ))}
        </SectionLayout>
    );
}

export default RelatedCourses;
