import type { ReactNode } from "react";
import { Navigate } from "react-router";

import { useUserContext } from "../context/user-context";
import { useCookies } from "react-cookie";

type ProtectedRouteProps = {
    children: ReactNode;
    role: "student" | "instructor";
};

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    const { user } = useUserContext();

    return !token || user?.role !== role ? (
        <Navigate to="/" replace />
    ) : (
        children
    );
}

export default ProtectedRoute;
