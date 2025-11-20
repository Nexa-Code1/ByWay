import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { message } from "antd";

import { handleLogout } from "../../api/auth/auth";
import { QUERY_KEYS } from "../../utils/queryKeys";

export function useLogout() {
    const queryClient = useQueryClient();

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies(["token", "refreshToken"]);

    const { mutate: logout, isPending: isLoggingout } = useMutation({
        mutationFn: () => handleLogout(cookies.token, cookies.refreshToken),
        onSuccess: () => {
            removeCookie("token", { path: "/" });
            removeCookie("refreshToken", { path: "/" });
            navigate("/", { replace: true });
            queryClient.removeQueries({
                queryKey: [QUERY_KEYS.USER_PROFILE],
            });
        },
        onError: (error) => messageApi.error(error.message),
    });

    return { logout, isLoggingout, contextHolder };
}
