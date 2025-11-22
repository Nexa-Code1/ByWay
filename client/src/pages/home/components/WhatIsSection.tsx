import SectionContainer from "../../../components/shared/SectionContainer";
import instructorImg from "../../../assets/images/what-is-byway-img-1.jpg";
import studentImg from "../../../assets/images/what-is-byway-img-2.jpg";
import WhatIsCard from "./WhatIsCard";
import { whatIsByway } from "../../../utils/homePageData";
import TextDescription from "../../../components/shared/TextDescription";
import { useUserProfile } from "../../../hooks/user/useUserProfile";

function WhatIsSection() {
    const { userProfile, isLoading, error } = useUserProfile();
    const isUserExist = !isLoading && !error && userProfile;
    const lang = "en";

    return (
        <SectionContainer className="flex flex-col items-center justify-between text-center gap-4 text-gray-800">
            <h2 className="font-bold text-2xl">What is Byway</h2>
            <TextDescription>{whatIsByway[lang]}</TextDescription>
            <div className="w-full flex flex-col md:flex-row gap-10 items-center justify-center">
                <WhatIsCard
                    img={instructorImg}
                    title="for instructors"
                    buttonLabel="Start a class today"
                    pagePath={
                        isUserExist && userProfile?.role === "instructor"
                            ? "/instructor"
                            : "/become-instructor"
                    }
                />
                <WhatIsCard
                    img={studentImg}
                    title="for students"
                    buttonLabel="Start learning"
                    pagePath={
                        isUserExist && userProfile?.role === "student"
                            ? "/profile/student-courses"
                            : "/courses"
                    }
                />
            </div>
        </SectionContainer>
    );
}

export default WhatIsSection;
