import CourseCard from "@/components/shared/CourseCard";
import SectionLayout from "../../../components/shared/SectionLayout";

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
