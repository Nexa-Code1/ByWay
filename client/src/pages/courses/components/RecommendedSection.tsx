import CourseCard from "@/components/shared/CourseCard";
import SectionLayout from "./SectionLayout";

function RecommendedSection() {
    return (
        <SectionLayout title="Recommended for you" linkPath="/recommended">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
        </SectionLayout>
    );
}

export default RecommendedSection;
