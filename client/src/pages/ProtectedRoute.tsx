import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useCookies } from "react-cookie";

import { useUserProfile } from "@/hooks/user/useUserProfile";
import PageSpinner from "@/components/shared/PageSpinner";

type ProtectedRouteProps = {
    children: ReactNode;
    role: "student" | "instructor";
};

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    const { userProfile, isLoading } = useUserProfile();

    if (isLoading) return <PageSpinner />;

    return !token || userProfile?.role !== role ? (
        <Navigate to="/" replace />
    ) : (
        children
    );
}

export default ProtectedRoute;
