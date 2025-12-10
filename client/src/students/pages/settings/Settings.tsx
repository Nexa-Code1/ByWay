import { useState } from "react";

import Error from "@/components/shared/Error";
import OutletHeader from "../profile/components/OutletHeader";
import UploadProfileImg from "./components/UploadProfileImg";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import Spinner from "@/components/shared/Spinner";
import UpdateProfileForm from "./components/UpdateProfileForm";
import UpdatePasswordForm from "./components/UpdatePasswordForm";

function Settings() {
    // Coming from UploadProfileImg component for upload-profile-image backend request
    // Will be sent once user clicks save changes in UpdateProfileForm
    const [file, setFile] = useState<File | null>(null);
    const { userProfile, isLoading, error } = useUserProfile();

    if (isLoading)
        return <Spinner className="text-primary-700! mt-20!" size="large" />;
    if (!isLoading && (error || !userProfile)) return <Error />;

    return (
        <div>
            <OutletHeader>Account Settings</OutletHeader>

            <div className="flex flex-col sm:flex-row items-start gap-12">
                {/* Upload profile image */}
                <UploadProfileImg
                    userImage={userProfile.user.image}
                    onSetFile={setFile}
                />

                {/* Profile form */}
                <UpdateProfileForm
                    userInfo={userProfile.user}
                    profileImgFile={file}
                />
            </div>

            <hr className="my-8" />
            <OutletHeader>Change password</OutletHeader>
            <UpdatePasswordForm />
        </div>
    );
}

export default Settings;
