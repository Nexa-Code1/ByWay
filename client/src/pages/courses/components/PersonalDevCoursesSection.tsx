import CourseCard from "@/components/shared/CourseCard";
import SectionLayout from "./SectionLayout";
import { useGetAllCourses } from "@/hooks/courses/useGetAllCourses";

function PersonalDevCoursesSection() {
    const { courses, isLoading, error } = useGetAllCourses({
        category: "personal-development",
    });

    return (
        <SectionLayout
            title="The course in personal development"
            linkPath="/courses?category=personal-development"
        >
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
        </SectionLayout>
    );
}

export default PersonalDevCoursesSection;
