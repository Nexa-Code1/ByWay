import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

import { handleSignup } from "../../api/auth/auth";

export function useSignup() {
    const [messageApi, contextHolder] = message.useMessage();

    const { mutateAsync: signup, isPending: isCreatingAccount } = useMutation({
        mutationFn: handleSignup,
        onSuccess: (data) => messageApi.success(data.message),
        onError: (error) => messageApi.error(error.message),
    });

    return { signup, isCreatingAccount, contextHolder };
}
