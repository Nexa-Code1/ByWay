import SectionContainer from "@/components/shared/SectionContainer";
import { Outlet } from "react-router";
import ProfileHeader from "./components/ProfileHeader";
import ProfileNav from "./components/ProfileNav";

function Profile() {
    return (
        <SectionContainer className="mt-4!">
            <div className="border border-gray-300">
                <ProfileHeader />
                <ProfileNav />
            </div>
            <Outlet />
        </SectionContainer>
    );
}

export default Profile;
