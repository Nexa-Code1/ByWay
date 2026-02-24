import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

import { handleLogin } from "@/api/auth/auth";
import { setTokens } from "@/utils/tokenService";
import defaultRoutes from "@/utils/defaultRoutes";
import { useUserProfile } from "../user/useUserProfile";

export function useLogin() {
    const navigate = useNavigate();
    const { refetch } = useUserProfile();

    const { mutateAsync: login, isPending: isLoggingin } = useMutation({
        mutationFn: handleLogin,
        onSuccess: async (data) => {
            setTokens({
                accessToken: data.token,
                refreshToken: data.refreshToken,
            });
            await refetch();

            navigate(defaultRoutes[data.user.role], {
                replace: true,
            });
        },
        onError: (error) => message.error(error.message),
    });

    return { login, isLoggingin };
}
