import { useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

import { handleForgetPassword } from "../../api/auth/auth";
import type { IResetPassword } from "../../types";

export function useResetPassword() {
    const [messageApi, contextHolder] = message.useMessage();
    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get("email");

    const { mutateAsync: forgetPassword, isPending: isResettingPassword } =
        useMutation({
            mutationFn: async (formValues: IResetPassword) => {
                if (!email) {
                    messageApi.error("Email is required. Please try again.");
                    return;
                }
                return handleForgetPassword({ ...formValues, email });
            },
            onSuccess: (data) => {
                messageApi.success(data.message);
                setSearchParams({ auth: "login" });
            },
            onError: (error) => messageApi.error(error.message),
        });

    return { forgetPassword, isResettingPassword, contextHolder };
}
