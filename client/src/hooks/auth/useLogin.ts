import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

import { handleLogin } from "../../api/auth/auth";
import { useCookies } from "react-cookie";

export function useLogin() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [, setCookie] = useCookies(["token"]);

    const { mutate: login, isPending: isLoggingin } = useMutation({
        mutationFn: handleLogin,
        onSuccess: (data) => {
            setCookie("token", data.token);
            navigate("/", { replace: true });
        },
        onError: (error) => messageApi.error(error.message),
    });

    return { login, isLoggingin, contextHolder };
}
