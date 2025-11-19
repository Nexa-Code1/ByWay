import { useMutation } from "@tanstack/react-query";
import { handleSignup } from "../../api/auth/auth";
import { message } from "antd";

export function useSignup() {
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate: signup, isPending: isCreatingAccount } = useMutation({
        mutationFn: handleSignup,
        onSuccess: (data) => messageApi.success(data.message),
        onError: (error) => messageApi.error(error.message),
    });

    return { signup, isCreatingAccount, contextHolder };
}
