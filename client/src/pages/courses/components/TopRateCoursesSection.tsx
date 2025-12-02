import CourseCard from "@/components/shared/CourseCard";
import SectionLayout from "./SectionLayout";

function TopRateCoursesSection() {
    return (
        <SectionLayout title="Top rate" linkPath="/top-rate">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
        </SectionLayout>
    );
}

export default TopRateCoursesSection;
