import SectionLayout from "./SectionLayout";
import ContinueCourseCard from "./ContinueCourseCard";

function ContinueLearningSection() {
    return (
        <SectionLayout
            cols="sm:grid-cols-2 md:grid-cols-3"
            title="Welcome back, ready for your next lesson?"
        >
            <ContinueCourseCard />
            <ContinueCourseCard />
            <ContinueCourseCard />
        </SectionLayout>
    );
}

export default ContinueLearningSection;
