import { useNavigate } from "react-router";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import UserAvatar from "@/components/layout/navbar/UserAvatar";
import PageSpinner from "@/components/shared/PageSpinner";
import { useUserProfile } from "@/hooks/user/useUserProfile";

function ProfileHeader() {
    const { userProfile, isLoading, error } = useUserProfile();
    const navigate = useNavigate();

    if (isLoading) return <PageSpinner />;
    if (!isLoading && error) return;

    const fullUserName = `${userProfile.firstName} ${userProfile.lastName}`;

    return (
        <header className="flex items-center justify-between gap-2 p-4 md:px-8 border-b border-b-inherit">
            <div className="flex items-center gap-4">
                <UserAvatar
                    avatar={userProfile.image}
                    userName={fullUserName}
                    size={70}
                />
                <div>
                    <p className="font-semibold">{fullUserName}</p>
                    <p className="text-gray-500">bio test</p>
                </div>
            </div>
            <Button
                className="bg-orange-100! text-gray-100! h-10!"
                onClick={() => navigate("/become-instructor")}
            >
                <span>Become instructor</span>
                <ArrowRightOutlined />
            </Button>
        </header>
    );
}

export default ProfileHeader;
