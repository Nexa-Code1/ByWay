import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

import { handleSignup } from "../../api/auth/auth";

export function useSignup() {
    const { mutateAsync: signup, isPending: isCreatingAccount } = useMutation({
        mutationFn: handleSignup,
        onSuccess: (data) => message.success(data.message),
        onError: (error) => message.error(error.message),
    });

    return { signup, isCreatingAccount };
}
