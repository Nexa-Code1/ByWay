import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "antd";

import VerificationResult from "./VerificationResult";
import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";
import PageSpinner from "@/components/shared/PageSpinner";
import RegisterBtns from "@/components/layout/navbar/RegisterBtns";
import emailVerifiedImg from "@/assets/images/email-verified.png";
import emailUnverifiedImg from "@/assets/images/email-unverified.png";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import defaultRoutes from "@/utils/defaultRoutes";

function AuthVerification() {
    const navigate = useNavigate();
    const params = useParams();
    const { verifyEmailToken } = params;
    const { verifyEmail, isVerifyingEmail, data, error } = useVerifyEmail();
    const {
        userProfile,
        isLoading: isLoadingUser,
        error: userProfileError,
    } = useUserProfile();

    useEffect(() => {
        if (!verifyEmailToken) return;
        verifyEmail(verifyEmailToken);
    }, [verifyEmail, verifyEmailToken]);

    useEffect(() => {
        if ((!isLoadingUser && userProfile) || userProfileError)
            navigate(defaultRoutes[userProfile.user.role]);
    }, [isLoadingUser, userProfile, userProfileError]);

    if (isVerifyingEmail || isLoadingUser) return <PageSpinner />;

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            {data ? (
                <VerificationResult
                    img={emailVerifiedImg}
                    alt="Email verified successfully"
                    title={data.message}
                    subTitle="Your account was successfully verified. please login to your account."
                >
                    <RegisterBtns displaySignupBtn={false} />
                </VerificationResult>
            ) : (
                <VerificationResult
                    img={emailUnverifiedImg}
                    alt="Email verification failed"
                    title={error?.message || "Email verification failed"}
                    subTitle="We are sorry your account verification was failed. please try again and check your email."
                >
                    <Button
                        className="capitalize mt-2 bg-orange-100! hover:scale-105 shadow-md"
                        type="primary"
                        onClick={() => location.reload()}
                    >
                        try again
                    </Button>
                </VerificationResult>
            )}
        </div>
    );
}

export default AuthVerification;
