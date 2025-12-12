import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import { handleLogout } from "@/api/auth/auth";
import { QUERY_KEYS } from "@/utils/queryKeys";
import {
    getAccessToken,
    getRefreshToken,
    removeTokens,
} from "@/utils/tokenService";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    const { mutate: logout, isPending: isLoggingout } = useMutation({
        mutationFn: () => handleLogout(accessToken, refreshToken),
        onSuccess: () => {
            removeTokens();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.USER_PROFILE],
            });
            navigate("/", { replace: true });
        },
        onError: (error) => message.error(error.message),
    });

    return { logout, isLoggingout };
}
