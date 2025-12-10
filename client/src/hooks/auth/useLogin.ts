import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { message } from "antd";

import { handleLogin } from "@/api/auth/auth";
import { QUERY_KEYS } from "@/utils/queryKeys";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [, setCookie] = useCookies(["token", "refreshToken"]);

    const { mutateAsync: login, isPending: isLoggingin } = useMutation({
        mutationFn: handleLogin,
        onSuccess: (data) => {
            //! DOESN'T WORK
            navigate("/", { replace: true });
            setCookie("token", data.token, { path: "/" });
            setCookie("refreshToken", data.refreshToken, { path: "/" });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.USER_PROFILE],
            });
        },
        onError: (error) => message.error(error.message),
    });

    return { login, isLoggingin };
}
