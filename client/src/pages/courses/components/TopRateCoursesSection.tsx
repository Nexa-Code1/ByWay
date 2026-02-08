import CourseCard from "@/components/shared/CourseCard";
import Error from "@/components/shared/Error";
import SectionLayout from "@/components/shared/SectionLayout";
import Spinner from "@/components/shared/Spinner";
import { useGetAllCourses } from "@/hooks/courses/useGetAllCourses";
import type { ICourseDetails } from "@/types";

function TopRateCoursesSection() {
    const { courses, isLoading, error } = useGetAllCourses({
        sort: "rate-desc",
        limit: 4,
    });

    if (isLoading) return <Spinner />;
    if (!isLoading && (error || !courses)) return <Error />;

    return (
        <SectionLayout
            title="Top rate"
            linkPath="/search?type=courses&sort=rate-desc"
        >
            {courses.courses.map((course: ICourseDetails) => (
                <CourseCard key={course._id} course={course} />
            ))}
        </SectionLayout>
    );
}

export default TopRateCoursesSection;
