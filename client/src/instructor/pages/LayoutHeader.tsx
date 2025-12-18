import { useLocation } from "react-router";

import UserAvatar from "@/components/layout/navbar/UserAvatar";
import Spinner from "@/components/shared/Spinner";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import { instructorNavLinks } from "@/utils/navLinks";

function LayoutHeader() {
    const { userProfile, isLoading, error } = useUserProfile();
    const { pathname } = useLocation();

    const activeLink = instructorNavLinks.find((link) =>
        pathname.startsWith(link.path)
    );

    return (
        <header className="flex items-center justify-between pt-4 pb-6">
            <div>
                <p className="text-sm text-gray-600">Good Morning</p>
                <h1 className="font-bold md:text-lg text-primary-700">
                    {activeLink && activeLink.label.en}
                </h1>
            </div>
            {isLoading ? (
                <Spinner className="text-primary-700" />
            ) : !isLoading && !error && userProfile ? (
                <div className="flex items-center gap-2">
                    <UserAvatar
                        avatar={userProfile.user.image}
                        userName={`${userProfile.user.firstName} ${userProfile.user.lastName}`}
                    />
                    <p className="text-sm font-semibold">
                        {userProfile.user.firstName}
                    </p>
                </div>
            ) : (
                <></>
            )}
        </header>
    );
}

export default LayoutHeader;
