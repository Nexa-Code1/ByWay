import type { ReactNode } from "react";
import { Navigate } from "react-router";

import { useUserProfile } from "@/hooks/user/useUserProfile";
import PageSpinner from "@/components/shared/PageSpinner";
import { getAccessToken } from "@/utils/tokenService";

type ProtectedRouteProps = {
    children: ReactNode;
    role: "student" | "instructor";
};

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
    const accessToken = getAccessToken();

    const { userProfile, isLoading } = useUserProfile();

    if (isLoading) return <PageSpinner />;

    return !accessToken || userProfile?.user?.role !== role ? (
        <Navigate to="/" replace />
    ) : (
        children
    );
}

export default ProtectedRoute;
