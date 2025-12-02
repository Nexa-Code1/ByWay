import { useUserProfile } from "@/hooks/user/useUserProfile";
import SectionContainer from "@/components/shared/SectionContainer";
import ContinueLearningSection from "./components/ContinueLearningSection";
import CategoriesSection from "./components/CategoriesSection";
import RecommendedSection from "./components/RecommendedSection";
import PersonalDevCoursesSection from "./components/PersonalDevCoursesSection";
import OnlineCoachingSection from "./components/OnlineCoachingSection";
import TopRatedCoursesSection from "./components/TopRateCoursesSection";

function Courses() {
    const { userProfile, isLoading: isLoadingUser, error } = useUserProfile();

    return (
        <SectionContainer className="mt-4!">
            {!isLoadingUser && !error && userProfile && (
                <ContinueLearningSection />
            )}
            <CategoriesSection />
            <RecommendedSection />
            <OnlineCoachingSection />
            <PersonalDevCoursesSection />
            <TopRatedCoursesSection />
        </SectionContainer>
    );
}

export default Courses;
