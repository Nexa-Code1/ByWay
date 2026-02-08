import SectionLayout from "@/components/shared/SectionLayout";

function RecommendedSection() {
    return (
        <SectionLayout
            title="Recommended for you"
            linkPath="/search?type=courses"
        >
            RECOMMENDED COURSES
        </SectionLayout>
    );
}

export default RecommendedSection;
