import { useMemo, type ReactNode } from "react";
import { Navigate } from "react-router";

import { useUserProfile } from "@/hooks/user/useUserProfile";
import defaultRoutes from "@/utils/defaultRoutes";
import PageSpinner from "@/components/shared/PageSpinner";

type ProtectedRouteProps = {
    children: ReactNode;
    roles: string[];
};

function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
    const { userProfile, isLoading, error } = useUserProfile();

    const userRole = useMemo(
        () => (!isLoading && !error && userProfile?.user.role) || "guest",
        [userProfile, isLoading, error]
    );

    if (isLoading) return <PageSpinner />;

    return !roles.includes(userRole) ? (
        <Navigate to={defaultRoutes[userRole]} replace />
    ) : (
        <>{children}</>
    );
}

export default ProtectedRoute;
