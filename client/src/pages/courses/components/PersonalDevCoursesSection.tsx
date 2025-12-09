import CourseCard from "@/components/shared/CourseCard";
import SectionLayout from "../../../components/shared/SectionLayout";
// import { useGetAllCourses } from "@/hooks/courses/useGetAllCourses";

function PersonalDevCoursesSection() {
    // const { courses, isLoading, error } = useGetAllCourses({
    //     category: "personal-development",
    // });

    return (
        <SectionLayout
            title="The course in personal development"
            linkPath="/courses?category=personal-development"
        >
            PERSONAL DEVELOPMENT COURSES
        </SectionLayout>
    );
}

export default PersonalDevCoursesSection;
