import CourseCard from "@/components/shared/CourseCard";
import SectionLayout from "@/components/shared/SectionLayout";
import Spinner from "@/components/shared/Spinner";
import { useGetAllCourses } from "@/hooks/courses/useGetAllCourses";
import type { ICourseDetails } from "@/types";

function PersonalDevCoursesSection() {
    const { courses, isLoading, error } = useGetAllCourses({
        category: "personal-development",
    });

    if (isLoading)
        return <Spinner className="text-primary-700! mt-20!" size="large" />;
    if (!isLoading && (error || !courses)) return null;

    if (!courses.courses.length) return null;

    return (
        <SectionLayout
            title="The course in personal development"
            linkPath="/courses?category=personal-development"
        >
            {courses.courses.map((course: ICourseDetails) => (
                <CourseCard course={course} />
            ))}
        </SectionLayout>
    );
}

export default PersonalDevCoursesSection;
