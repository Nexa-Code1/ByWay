import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

import { handleLogout } from "@/api/auth/auth";
import {
    getAccessToken,
    getRefreshToken,
    removeTokens,
} from "@/utils/tokenService";
import { useUserProfile } from "../user/useUserProfile";

export function useLogout() {
    const { refetch } = useUserProfile();

    const navigate = useNavigate();

    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    const { mutate: logout, isPending: isLoggingout } = useMutation({
        mutationFn: () => handleLogout(accessToken, refreshToken),
        onSuccess: async () => {
            removeTokens();
            await refetch();
            navigate("/", { replace: true });
        },
        onError: (error) => message.error(error.message),
    });

    return { logout, isLoggingout };
}
