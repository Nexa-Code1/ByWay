import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import { handleLogin } from "@/api/auth/auth";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { setTokens } from "@/utils/tokenService";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutateAsync: login, isPending: isLoggingin } = useMutation({
        mutationFn: handleLogin,
        onSuccess: (data) => {
            setTokens({
                accessToken: data.token,
                refreshToken: data.refreshToken,
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.USER_PROFILE],
            });
            //! DOESN'T WORK
            navigate("/", { replace: true });
        },
        onError: (error) => message.error(error.message),
    });

    return { login, isLoggingin };
}
