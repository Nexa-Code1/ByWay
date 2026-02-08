import { Tabs, type TabsProps } from "antd";
import { useParams, useSearchParams } from "react-router";

import { useGetProfileById } from "@/hooks/user/useGetProfileById";
import SectionContainer from "@/components/shared/SectionContainer";
import Spinner from "@/components/shared/Spinner";
import Error from "@/components/shared/Error";
import ProfileHeader from "./components/ProfileHeader";
import ProfileBio from "./components/ProfileBio";
import InstructorCourses from "./components/InstructorCourses";
import InstructorBlogs from "./components/InstructorBlogs";

function InstructorProfile() {
    const { instructorId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const { profile, isLoading, error } = useGetProfileById(instructorId);

    if (isLoading)
        return <Spinner size="large" className="text-primary-700! mt-60!" />;
    if (!isLoading && (error || !profile)) return <Error />;

    const { user } = profile;

    const items: TabsProps["items"] = [
        {
            key: "courses",
            label: "Courses",
            children: <InstructorCourses instructorId={user._id} />,
        },
        {
            key: "blogs",
            label: "Blogs",
            children: <InstructorBlogs instructorId={user._id} />,
        },
    ];

    return (
        <div className="relative">
            <div className="absolute h-30 top-0 left-0 right-0 bg-primary-100 -z-10" />
            <SectionContainer className="grid grid-cols-3 items-start mt-0! gap-6">
                <ProfileHeader user={user} />
                <ProfileBio bio={user.bio} />
                <Tabs
                    defaultActiveKey={searchParams.get("tab") || "courses"}
                    items={items}
                    className="col-span-3 sm:col-span-2 "
                    onChange={(key) =>
                        setSearchParams((prev) => ({ ...prev, tab: key }))
                    }
                />
            </SectionContainer>
        </div>
    );
}

export default InstructorProfile;
