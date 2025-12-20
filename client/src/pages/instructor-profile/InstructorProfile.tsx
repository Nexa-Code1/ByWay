import { useParams } from "react-router";

import { useGetProfileById } from "@/hooks/user/useGetProfileById";
import SectionContainer from "@/components/shared/SectionContainer";
import Spinner from "@/components/shared/Spinner";
import Error from "@/components/shared/Error";
import ProfileHeader from "./components/ProfileHeader";
import ProfileBio from "./components/ProfileBio";
import InstructorCourses from "./components/InstructorCourses";

function InstructorProfile() {
    const params = useParams();
    const { instructorId } = params;

    const { profile, isLoading, error } = useGetProfileById(instructorId);

    if (isLoading)
        return <Spinner size="large" className="text-primary-700! mt-60!" />;
    if (!isLoading && (error || !profile)) return <Error />;

    const { user } = profile;

    return (
        <div className="relative">
            <div className="absolute h-30 top-0 left-0 right-0 bg-primary-100 -z-10" />
            <SectionContainer className="grid grid-cols-3 items-start mt-0! gap-6">
                <ProfileHeader user={user} />
                <ProfileBio bio={user.bio} />
                <InstructorCourses instructorId={user._id} />
            </SectionContainer>
        </div>
    );
}

export default InstructorProfile;
